package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import br.com.concursoti.companions.entities.PetCompanion;
import br.com.concursoti.companions.repositories.PetCompanionRepository;
import br.com.concursoti.companions.repositories.PetRepository;
import br.com.concursoti.companions.services.PetCarePolicy;
import br.com.concursoti.companions.services.PetService;
import br.com.concursoti.dailygoals.services.DailyProgressService;
import java.time.Clock;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class PetInteractionTest {

  @Mock
  PetCompanionRepository companions;

  @Mock
  PetRepository legacy;

  @Test
  void conversarFortaleceAmizadeMasNaoConcedeXp() {
    PetCompanion p = new PetCompanion();
    p.id = 1L;
    p.species = "nori";
    p.active = true;
    p.xp = 390;
    p.energy = 70;
    p.lastDecay = LocalDate.now();
    when(companions.count()).thenReturn(1L);
    when(companions.findFirstByActiveTrue()).thenReturn(Optional.of(p));
    when(companions.findAll()).thenReturn(List.of(p));
    PetService service = new PetService(
      companions,
      legacy,
      mock(DailyProgressService.class),
      new PetCarePolicy(Clock.systemUTC()),
      Clock.systemUTC()
    );
    var out = service.interact("TALK");
    assertEquals(390, p.xp);
    assertEquals(22, p.bond);
    assertEquals(22, out.get("bond"));
    assertThrows(IllegalArgumentException.class, () ->
      service.interact("TALK")
    );
    verify(companions).save(p);
  }

  @Test
  void descansarFortaleceVinculoSemSubstituirMetas() {
    PetCompanion p = new PetCompanion();
    p.id = 1L;
    p.species = "luma";
    p.active = true;
    p.xp = 100;
    p.energy = 25;
    when(companions.count()).thenReturn(1L);
    when(companions.findFirstByActiveTrue()).thenReturn(Optional.of(p));
    when(companions.findAll()).thenReturn(List.of(p));
    var result = new PetService(
      companions,
      legacy,
      mock(DailyProgressService.class),
      new PetCarePolicy(Clock.systemUTC()),
      Clock.systemUTC()
    ).interact("REST");
    assertEquals(100, p.xp);
    assertEquals(65, p.energy);
    assertEquals(65, result.get("energy"));
    assertNotNull(p.lastRest);
  }

  @Test
  void morteNaoERevertidaPorXpERecomecoPreservaRecorde() {
    PetCompanion pet = new PetCompanion();
    pet.id = 1L;
    pet.species = "nori";
    pet.active = true;
    pet.xp = 850;
    pet.bond = 80;
    pet.diedAt = LocalDate.now().minusDays(1);
    pet.deathCount = 1;
    pet.bestGoalStreak = 14;
    pet.careStartedAt = LocalDate.now().minusDays(8);
    pet.lastCareDate = pet.diedAt;
    pet.missedDays = 4;
    when(companions.count()).thenReturn(1L);
    when(companions.findFirstByActiveTrue()).thenReturn(Optional.of(pet));
    when(companions.findById(1L)).thenReturn(Optional.of(pet));
    when(companions.findAll()).thenReturn(List.of(pet));
    PetService service = new PetService(
      companions,
      legacy,
      mock(DailyProgressService.class),
      new PetCarePolicy(Clock.systemUTC()),
      Clock.systemUTC()
    );
    service.awardExperience(100);
    assertEquals(850, pet.xp);
    assertNotNull(pet.diedAt);
    assertThrows(IllegalArgumentException.class, () ->
      service.interact("REST")
    );
    service.restart(1L);
    assertNull(pet.diedAt);
    assertEquals(0, pet.xp);
    assertEquals(850, pet.previousLifeXp);
    assertEquals(20, pet.bond);
    assertEquals(14, pet.bestGoalStreak);
    assertEquals(1, pet.deathCount);
    assertEquals(0, pet.missedDays);
    assertThrows(IllegalArgumentException.class, () -> service.restart(1L));
  }
}
