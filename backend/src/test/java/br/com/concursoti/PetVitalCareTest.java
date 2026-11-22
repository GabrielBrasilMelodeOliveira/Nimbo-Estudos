package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;

import br.com.concursoti.companions.entities.PetCompanion;
import br.com.concursoti.companions.services.PetVitalCare;
import java.time.*;
import org.junit.jupiter.api.Test;

class PetVitalCareTest {

  static class MutableClock extends Clock {

    private Instant instant = Instant.parse("2026-11-21T12:00:00Z");

    public ZoneId getZone() {
      return ZoneId.of("America/Fortaleza");
    }

    public Clock withZone(ZoneId zone) {
      return this;
    }

    public Instant instant() {
      return instant;
    }

    void advance(Duration duration) {
      instant = instant.plus(duration);
    }
  }

  final MutableClock clock = new MutableClock();
  final PetVitalCare policy = new PetVitalCare(clock);

  PetCompanion pet() {
    PetCompanion pet = new PetCompanion();
    pet.active = true;
    pet.xp = 850;
    policy.initialize(pet);
    return pet;
  }

  void train(PetCompanion pet) {
    policy.interact(pet, "TRAIN");
    for (int index = 0; index < 120; index++) {
      clock.advance(Duration.ofSeconds(15));
      policy.presence(pet, true);
    }
  }

  @Test
  void trainingRequiresThirtyMinutesOfPresenceAndAwardsExactlyOnceWithoutXp() {
    PetCompanion pet = pet();
    policy.interact(pet, "TRAIN");
    for (int index = 0; index < 119; index++) {
      clock.advance(Duration.ofSeconds(15));
      policy.presence(pet, true);
      policy.presence(pet, true);
    }
    assertEquals(0, pet.carePoints);
    assertNotNull(pet.trainingStartedAt);
    clock.advance(Duration.ofSeconds(15));
    policy.presence(pet, true);
    assertEquals(20, pet.carePoints);
    assertEquals(850, pet.xp);
    assertEquals(100, pet.readiness);
    assertTrue(pet.trainedSinceRest);
    assertNull(pet.trainingStartedAt);
    policy.presence(pet, true);
    policy.view(pet);
    assertEquals(20, pet.carePoints);
    assertThrows(IllegalArgumentException.class, () ->
      policy.interact(pet, "TRAIN")
    );
  }

  @Test
  void hidingOrDisconnectingPausesTrainingAndPollingCannotAwardOfflineTime() {
    PetCompanion pet = pet();
    policy.interact(pet, "TRAIN");
    clock.advance(Duration.ofSeconds(15));
    policy.presence(pet, true);
    policy.presence(pet, false);
    clock.advance(Duration.ofMinutes(40));
    policy.evaluate(pet);
    policy.presence(pet, true);
    assertEquals(15000, pet.trainingElapsedMillis);
    assertEquals(0, pet.carePoints);
    clock.advance(Duration.ofSeconds(15));
    policy.presence(pet, true);
    assertEquals(30000, pet.trainingElapsedMillis);
    clock.advance(Duration.ofMinutes(10));
    policy.presence(pet, true);
    assertEquals(30000, pet.trainingElapsedMillis);
    assertEquals(850, pet.xp);
  }

  @Test
  void sleepRequiresBothActionsAndFinishesOfflineExactlyOnce() {
    PetCompanion pet = pet();
    assertThrows(IllegalArgumentException.class, () ->
      policy.interact(pet, "REST")
    );
    policy.interact(pet, "FEED");
    clock.advance(Duration.ofSeconds(12));
    assertThrows(IllegalArgumentException.class, () ->
      policy.interact(pet, "REST")
    );
    train(pet);
    policy.interact(pet, "REST");
    double food = pet.satiety;
    clock.advance(Duration.ofHours(8).minusSeconds(1));
    policy.evaluate(pet);
    assertNotNull(pet.sleepUntil);
    assertEquals(food, pet.satiety);
    assertEquals(20, pet.carePoints);
    assertThrows(IllegalArgumentException.class, () ->
      policy.interact(pet, "FEED")
    );
    clock.advance(Duration.ofSeconds(1));
    policy.evaluate(pet);
    assertNull(pet.sleepUntil);
    assertEquals(100, pet.stamina);
    assertEquals(30, pet.carePoints);
    assertEquals(1, pet.completedCareCycles);
    policy.evaluate(pet);
    assertEquals(30, pet.carePoints);
    assertEquals(850, pet.xp);
    assertFalse(pet.trainedSinceRest);
    assertFalse(pet.fedSinceRest);
    assertThrows(IllegalArgumentException.class, () ->
      policy.interact(pet, "REST")
    );
  }

  @Test
  void elapsedTimeAfterWakingStillCountsAndCanCauseDeath() {
    PetCompanion pet = pet();
    train(pet);
    policy.interact(pet, "FEED");
    clock.advance(Duration.ofSeconds(12));
    policy.interact(pet, "REST");
    clock.advance(Duration.ofHours(50));
    policy.evaluate(pet);
    assertNotNull(pet.diedAt);
    assertEquals("VITALS", pet.deathCause);
    assertEquals(1, pet.deathCount);
    policy.evaluate(pet);
    assertEquals(1, pet.deathCount);
  }

  @Test
  void neglectUsesExactZeroCrossingEvenWhenNoOneVisitsTheSite() {
    PetCompanion pet = pet();
    clock.advance(Duration.ofHours(20));
    policy.evaluate(pet);
    assertEquals(0, pet.satiety);
    assertNotNull(pet.criticalSince);
    assertNull(pet.diedAt);
    clock.advance(Duration.ofHours(12).minusSeconds(1));
    policy.evaluate(pet);
    assertNull(pet.diedAt);
    clock.advance(Duration.ofSeconds(1));
    policy.evaluate(pet);
    assertNotNull(pet.diedAt);
    assertEquals(0, pet.energy);
    assertEquals(1, pet.deathCount);
    assertThrows(IllegalArgumentException.class, () ->
      policy.interact(pet, "FEED")
    );
  }

  @Test
  void feedingRescuesCriticalVitalsAndCannotBeSpammed() {
    PetCompanion pet = pet();
    clock.advance(Duration.ofHours(21));
    policy.evaluate(pet);
    policy.interact(pet, "FEED");
    assertNull(pet.criticalSince);
    assertEquals(100, pet.satiety);
    assertEquals(42, pet.stamina);
    assertThrows(IllegalArgumentException.class, () ->
      policy.interact(pet, "FEED")
    );
    clock.advance(Duration.ofHours(4));
    policy.interact(pet, "FEED");
    assertEquals(100, pet.satiety);
  }

  @Test
  void reserveFreezesVitalsAndUpgradeStartsWithoutRetroactivePenalties() {
    PetCompanion pet = new PetCompanion();
    pet.xp = 1200;
    pet.lastActivity = LocalDate.of(2025, 1, 1);
    policy.evaluate(pet);
    assertEquals(80, pet.satiety);
    assertNull(pet.diedAt);
    clock.advance(Duration.ofDays(10));
    policy.evaluate(pet);
    assertEquals(80, pet.satiety);
    assertEquals(80, pet.stamina);
    assertNull(pet.diedAt);
    assertEquals(1200, pet.xp);
  }

  @Test
  void restartClearsTimersButKeepsEarnedCareTitles() {
    PetCompanion pet = pet();
    train(pet);
    pet.diedAt = LocalDate.now(clock);
    pet.deathCause = "VITALS";
    pet.diedAt = null;
    policy.restart(pet);
    assertEquals(20, pet.carePoints);
    assertNull(pet.trainingCompletedAt);
    assertNull(pet.sleepUntil);
    assertEquals(80, pet.stamina);
    assertFalse(pet.trainedSinceRest);
    assertFalse(pet.fedSinceRest);
  }
}
