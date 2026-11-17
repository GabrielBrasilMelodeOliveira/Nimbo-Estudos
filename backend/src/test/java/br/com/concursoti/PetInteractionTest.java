package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import br.com.concursoti.companions.entities.PetCompanion;
import br.com.concursoti.companions.repositories.PetCompanionRepository;
import br.com.concursoti.companions.repositories.PetRepository;
import br.com.concursoti.companions.services.PetService;
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
    PetService service = new PetService(companions, legacy);
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
  void descansarNaoEvoluiNimbo() {
    PetCompanion p = new PetCompanion();
    p.id = 1L;
    p.species = "luma";
    p.active = true;
    p.xp = 100;
    p.energy = 25;
    when(companions.count()).thenReturn(1L);
    when(companions.findFirstByActiveTrue()).thenReturn(Optional.of(p));
    when(companions.findAll()).thenReturn(List.of(p));
    var result = new PetService(companions, legacy).interact("REST");
    assertEquals(100, p.xp);
    assertEquals(35, p.energy);
    assertEquals(35, result.get("energy"));
    assertNotNull(p.lastRest);
  }
}
