package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import br.com.concursoti.companions.entities.PetCompanion;
import br.com.concursoti.companions.repositories.PetCompanionRepository;
import br.com.concursoti.companions.repositories.PetRepository;
import br.com.concursoti.companions.services.PetCarePolicy;
import br.com.concursoti.companions.services.PetService;
import br.com.concursoti.companions.services.PetVitalCare;
import br.com.concursoti.companions.types.CompanionClass;
import br.com.concursoti.dailygoals.services.DailyProgressService;
import java.time.Clock;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;

class CompanionProgressionTest {

  @Test
  void everyPromotionUsesExistingExperienceAndReportsTheNextGoal() {
    int[] thresholds = { 0, 200, 400, 800, 1200, 2400, 4000 };
    for (int index = 0; index < thresholds.length; index++) {
      var career = CompanionClass.describe(thresholds[index]);
      assertEquals(index + 1, career.current().rank());
      assertEquals(0, career.experienceWithinClass());
      assertEquals(
        1 + thresholds[index] / 100,
        career.current().minimumLevel()
      );
      if (index > 0) assertEquals(
        index,
        CompanionClass.describe(thresholds[index] - 1)
          .current()
          .rank()
      );
      if (index < thresholds.length - 1) {
        assertEquals(index + 2, career.next().rank());
        assertEquals(
          thresholds[index + 1] - thresholds[index],
          career.remainingExperience()
        );
      }
    }
  }

  @Test
  void finalClassKeepsAccumulatingExperienceWithoutAnImpossibleNextLevel() {
    var career = CompanionClass.describe(4620);
    assertEquals("Lenda da Constância", career.current().name());
    assertNull(career.next());
    assertEquals(620, career.experienceWithinClass());
    assertEquals(0, career.experienceToNextClass());
    assertEquals(0, career.remainingExperience());
    assertEquals(1, CompanionClass.describe(-1).current().rank());
  }

  @Test
  void upgradedCompanionPreservesIdentityExperienceBondAndRecruitmentUnlock() {
    var companions = mock(PetCompanionRepository.class);
    var dailyProgress = mock(DailyProgressService.class);
    var pet = new PetCompanion();
    pet.id = 12L;
    pet.species = "luma";
    pet.xp = 1700;
    pet.bond = 81;
    pet.active = true;
    when(companions.count()).thenReturn(1L);
    when(companions.findAll()).thenReturn(List.of(pet));
    when(companions.findFirstByActiveTrue()).thenReturn(Optional.of(pet));
    when(dailyProgress.synchronize()).thenReturn(List.of());
    var clock = Clock.systemUTC();
    var service = new PetService(
      companions,
      mock(PetRepository.class),
      dailyProgress,
      new PetCarePolicy(clock),
      new PetVitalCare(clock),
      clock
    );
    var view = service.current();
    assertEquals(12L, view.get("id"));
    assertEquals("luma", view.get("species"));
    assertEquals(1700, view.get("xp"));
    assertEquals(81, view.get("bond"));
    assertEquals(5, view.get("stage"));
    assertEquals(500, view.get("xpWithinStage"));
    assertEquals(1200, view.get("xpToNextStage"));
    assertEquals(true, view.get("canAdopt"));
    assertEquals(7, ((List<?>) view.get("classJourney")).size());
    var career = (CompanionClass.CareerView) view.get("career");
    assertEquals("Mestre de Batalha", career.current().name());
    assertEquals(700, career.remainingExperience());
    pet.xp = 1199;
    assertEquals(false, service.current().get("canAdopt"));
    pet.xp = 1200;
    assertEquals(true, service.current().get("canAdopt"));
    verify(companions, never()).save(any());
  }
}
