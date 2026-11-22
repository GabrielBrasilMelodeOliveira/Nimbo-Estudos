package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;

import br.com.concursoti.companions.entities.PetCompanion;
import br.com.concursoti.companions.services.PetCarePolicy;
import br.com.concursoti.dailygoals.entities.DailyGoalDay;
import java.time.*;
import java.util.*;
import org.junit.jupiter.api.Test;

class PetCarePolicyTest {

  final LocalDate today = LocalDate.of(2026, 11, 19);
  final Clock clock = Clock.fixed(
    Instant.parse("2026-11-19T13:00:00Z"),
    ZoneId.of("America/Fortaleza")
  );
  final PetCarePolicy policy = new PetCarePolicy(clock);

  DailyGoalDay day(LocalDate date, String outcome) {
    DailyGoalDay day = new DailyGoalDay();
    day.studyDate = date;
    day.outcome = outcome;
    day.closed = date.isBefore(today);
    return day;
  }

  PetCompanion tracked(int daysAgo) {
    PetCompanion pet = new PetCompanion();
    pet.careStartedAt = today.minusDays(daysAgo);
    pet.lastCareDate = pet.careStartedAt.minusDays(1);
    return pet;
  }

  List<DailyGoalDay> missed(int count) {
    List<DailyGoalDay> days = new ArrayList<>();
    for (int ago = count; ago > 0; ago--) days.add(
      day(today.minusDays(ago), "MISSED")
    );
    days.add(day(today, "PENDING"));
    return days;
  }

  @Test
  void upgradeNeverPunishesDatesBeforeTrackingStarted() {
    PetCompanion pet = new PetCompanion();
    pet.xp = 800;
    var status = policy.evaluate(pet, missed(15));
    assertFalse(status.dead());
    assertEquals("neutral", status.mood());
    assertEquals(today, pet.careStartedAt);
    assertEquals(800, pet.xp);
  }

  @Test
  void zeroProgressTodayDoesNotCauseImmediatePenalty() {
    var status = policy.evaluate(tracked(0), List.of(day(today, "PENDING")));
    assertEquals(0, status.missedDays());
    assertEquals("neutral", status.mood());
  }

  @Test
  void fourthClosedFailureKillsAndRepeatingEvaluationIsIdempotent() {
    PetCompanion pet = tracked(8);
    var status = policy.evaluate(pet, missed(8));
    assertTrue(status.dead());
    assertEquals(today.minusDays(5), pet.diedAt);
    assertEquals(1, pet.deathCount);
    policy.evaluate(pet, missed(8));
    assertEquals(1, pet.deathCount);
    assertEquals(0, pet.energy);
  }

  @Test
  void oneTwoAndThreeFailuresHaveDistinctExpressions() {
    assertEquals("hungry", policy.evaluate(tracked(1), missed(1)).mood());
    assertEquals("tired", policy.evaluate(tracked(2), missed(2)).mood());
    assertEquals("sad", policy.evaluate(tracked(3), missed(3)).mood());
    var afternoon = new PetCarePolicy(
      Clock.fixed(Instant.parse("2026-11-19T20:00:00Z"), clock.getZone())
    );
    assertEquals("angry", afternoon.evaluate(tracked(3), missed(3)).mood());
  }

  @Test
  void partialDayResetsFailureAndSuccessChainsAndRemainsNeutral() {
    PetCompanion pet = tracked(4);
    pet.goalStreak = 5;
    var days = new ArrayList<>(missed(4));
    days.get(3).outcome = "PARTIAL";
    var status = policy.evaluate(pet, days);
    assertFalse(status.dead());
    assertEquals(0, status.missedDays());
    assertEquals(0, status.streak());
    assertEquals("neutral", status.mood());
    PetCompanion hungry = tracked(2);
    var liveDays = missed(2);
    liveDays.getLast().outcome = "PARTIAL";
    assertEquals("neutral", policy.evaluate(hungry, liveDays).mood());
    assertEquals(75, hungry.energy); // Study mood does not refill vital energy.
  }

  @Test
  void progressTodayCannotReviveADeadPet() {
    var days = missed(4);
    days.getLast().outcome = "COMPLETE";
    assertTrue(policy.evaluate(tracked(4), days).dead());
  }

  @Test
  void milestonesIncludeTodayOnceAndRequireCompleteGoals() {
    for (var milestone : Map.of(
      1,
      "happy",
      3,
      "proud",
      7,
      "excited",
      14,
      "radiant",
      30,
      "legendary"
    ).entrySet()) {
      int count = milestone.getKey();
      PetCompanion pet = tracked(count - 1);
      List<DailyGoalDay> days = new ArrayList<>();
      for (int ago = count - 1; ago >= 0; ago--) days.add(
        day(today.minusDays(ago), "COMPLETE")
      );
      var status = policy.evaluate(pet, days);
      assertEquals(count, status.streak());
      assertEquals(milestone.getValue(), status.mood());
      assertEquals(75, pet.energy);
      assertEquals(count, policy.evaluate(pet, days).streak());
    }
  }
}
