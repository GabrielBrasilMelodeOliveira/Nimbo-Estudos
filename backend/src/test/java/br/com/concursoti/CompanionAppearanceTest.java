package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import br.com.concursoti.companions.dto.CompanionAppearance;
import br.com.concursoti.companions.entities.PetCompanion;
import br.com.concursoti.companions.repositories.PetCompanionRepository;
import br.com.concursoti.companions.repositories.PetRepository;
import br.com.concursoti.companions.services.PetCarePolicy;
import br.com.concursoti.companions.services.PetService;
import br.com.concursoti.companions.services.PetVitalCare;
import br.com.concursoti.companions.types.CompanionClass;
import br.com.concursoti.dailygoals.services.DailyProgressService;
import java.time.Clock;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;

class CompanionAppearanceTest {

  @Test
  void oldCompanionsReceiveCompleteOwlDefaultsWithoutChangingTheirHistory() {
    var pet = new PetCompanion();
    pet.species = "luma";
    pet.xp = 1700;
    pet.bond = 82;
    var appearance = CompanionAppearance.from(pet);
    assertEquals("WARRIOR", appearance.path());
    assertEquals("#AB8DD8", appearance.featherColor());
    assertEquals("SATCHEL", appearance.bodyAccessory());
    assertEquals(1700, pet.xp);
    assertEquals(82, pet.bond);
    assertNull(pet.heroPath);
  }

  @Test
  void onlySupportedEquipmentPathsAndHexColorsAreAccepted() {
    var valid = new CompanionAppearance(
      "MAGE",
      "#abcdef",
      "#17475F",
      "#244B62",
      "GOGGLES",
      "CAPE"
    ).validated();
    assertEquals("#ABCDEF", valid.featherColor());
    for (var invalid : List.of(
      new CompanionAppearance(
        "ADMIN",
        "#55BDD5",
        "#17475F",
        "#244B62",
        "AUTO",
        "NONE"
      ),
      new CompanionAppearance(
        null,
        "#55BDD5",
        "#17475F",
        "#244B62",
        "AUTO",
        "NONE"
      ),
      new CompanionAppearance(
        "MAGE",
        "url(x)",
        "#17475F",
        "#244B62",
        "AUTO",
        "NONE"
      ),
      new CompanionAppearance(
        "MAGE",
        "#FFF",
        "#17475F",
        "#244B62",
        "AUTO",
        "NONE"
      ),
      new CompanionAppearance(
        "MAGE",
        "#55BDD5",
        "#17475F",
        "#244B62",
        "UNKNOWN",
        "NONE"
      ),
      new CompanionAppearance(
        "MAGE",
        "#55BDD5",
        "#17475F",
        "#244B62",
        "AUTO",
        "UNKNOWN"
      )
    ))
      assertThrows(IllegalArgumentException.class, invalid::validated);
  }

  @Test
  void everyPathUsesTheSameXpThresholdsWithoutGivingExperienceForChangingClass() {
    for (String path : List.of("WARRIOR", "MAGE", "RANGER")) {
      assertEquals(7, CompanionClass.journey(path).size());
      for (var heroClass : CompanionClass.journey(path)) {
        assertEquals(
          heroClass.rank(),
          CompanionClass.describe(heroClass.minimumExperience(), path)
            .current()
            .rank()
        );
      }
      assertEquals(
        700,
        CompanionClass.describe(1700, path).remainingExperience()
      );
      assertEquals(5, CompanionClass.describe(1700, path).current().rank());
    }
    assertEquals(
      "Mestre Arcano",
      CompanionClass.describe(1700, "MAGE").current().name()
    );
    assertEquals(
      "Mestre Rastreador",
      CompanionClass.describe(1700, "RANGER").current().name()
    );
  }

  @Test
  void savingAnInactiveOwlsAppearancePersistsColorsAndNeverRevivesOrAwardsXp() {
    var companions = mock(PetCompanionRepository.class);
    var pet = new PetCompanion();
    pet.id = 4L;
    pet.species = "nori";
    pet.xp = 1700;
    pet.bond = 82;
    pet.diedAt = LocalDate.now();
    pet.deathCount = 1;
    pet.missedDays = 4;
    when(companions.count()).thenReturn(1L);
    when(companions.findById(4L)).thenReturn(Optional.of(pet));
    when(companions.findAll()).thenReturn(List.of(pet));
    var clock = Clock.systemUTC();
    var service = new PetService(
      companions,
      mock(PetRepository.class),
      mock(DailyProgressService.class),
      new PetCarePolicy(clock),
      new PetVitalCare(clock),
      clock
    );
    var appearance = new CompanionAppearance(
      "MAGE",
      "#aabbcc",
      "#17475F",
      "#244B62",
      "HAT",
      "CAPE"
    );
    var result = service.customize(4L, appearance);
    assertEquals("#AABBCC", pet.featherColor);
    assertEquals("MAGE", pet.heroPath);
    assertEquals("HAT", pet.headAccessory);
    assertEquals("CAPE", pet.bodyAccessory);
    assertEquals(1700, pet.xp);
    assertEquals(82, pet.bond);
    assertFalse(pet.active);
    assertNotNull(pet.diedAt);
    assertEquals("dead", result.get("mood"));
    assertEquals(
      "Mestre Arcano",
      ((CompanionClass.CareerView) result.get("career")).current().name()
    );
    assertEquals(appearance.validated(), CompanionAppearance.from(pet));
    verify(companions).save(pet);
  }
}
