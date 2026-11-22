package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import br.com.concursoti.companions.entities.PetCompanion;
import br.com.concursoti.companions.repositories.PetCompanionRepository;
import br.com.concursoti.companions.repositories.PetRepository;
import br.com.concursoti.companions.services.PetCarePolicy;
import br.com.concursoti.companions.services.PetService;
import br.com.concursoti.companions.services.PetVitalCare;
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
  void feedingRestoresVitalsWithoutStudyExperienceAndBlocksRepeatedMeals() {
    PetCompanion pet = new PetCompanion();
    pet.id = 1L;
    pet.species = "nori";
    pet.active = true;
    pet.xp = 390;
    when(companions.count()).thenReturn(1L);
    when(companions.findFirstByActiveTrue()).thenReturn(Optional.of(pet));
    when(companions.findAll()).thenReturn(List.of(pet));
    Clock clock = Clock.systemUTC();
    PetService service = new PetService(
      companions,
      legacy,
      mock(DailyProgressService.class),
      new PetCarePolicy(clock),
      new PetVitalCare(clock),
      clock
    );
    var result = service.interact("FEED");
    assertEquals(390, pet.xp);
    assertEquals(
      100,
      ((PetVitalCare.VitalView) result.get("vitals")).satiety()
    );
    assertTrue(pet.fedSinceRest);
    assertThrows(IllegalArgumentException.class, () ->
      service.interact("FEED")
    );
    assertThrows(IllegalArgumentException.class, () ->
      service.interact("REST")
    );
    assertThrows(IllegalArgumentException.class, () ->
      service.interact("TALK")
    );
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
      new PetVitalCare(Clock.systemUTC()),
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
