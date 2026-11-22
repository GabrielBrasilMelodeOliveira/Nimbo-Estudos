package br.com.concursoti.companions.services;

import br.com.concursoti.companions.entities.PetCompanion;
import java.time.*;
import org.springframework.stereotype.Component;

/** Server-clock lifecycle. Presence can reward care, never study experience. */
@Component
public class PetVitalCare {

  public static final Duration TRAINING_DURATION = Duration.ofMinutes(30);
  public static final Duration SLEEP_DURATION = Duration.ofHours(8);
  public static final Duration CRITICAL_GRACE = Duration.ofHours(12);
  private static final Duration PRESENCE_GAP = Duration.ofSeconds(45);
  private final Clock clock;

  public PetVitalCare(Clock clock) {
    this.clock = clock;
  }

  public record VitalView(
    int satiety,
    int energy,
    int readiness,
    int carePoints,
    int completedCycles,
    String activity,
    long trainingSeconds,
    long trainingRequiredSeconds,
    boolean trainingPresent,
    Instant sleepUntil,
    Instant eatingUntil,
    Instant trainedAt,
    Instant wokeAt,
    Instant criticalUntil,
    boolean canTrain,
    boolean canEat,
    boolean canRest,
    String trainHint,
    String eatHint,
    String restHint,
    String deathCause
  ) {}

  public void initialize(PetCompanion pet) {
    if (pet.vitalsUpdatedAt != null) return;
    pet.satiety = 80.0;
    pet.stamina = 80.0;
    pet.readiness = 80.0;
    pet.vitalsUpdatedAt = clock.instant();
  }

  public void evaluate(PetCompanion pet) {
    initialize(pet);
    Instant now = clock.instant();
    if (pet.diedAt != null) {
      pet.energy = 0;
      return;
    }
    Instant from = pet.vitalsUpdatedAt;
    if (pet.sleepUntil != null) {
      if (now.isBefore(pet.sleepUntil)) {
        pet.vitalsUpdatedAt = now;
        pet.energy = rounded(pet.stamina);
        return;
      }
      from = pet.sleepUntil;
      pet.wokeAt = pet.sleepUntil;
      pet.sleepUntil = null;
      pet.sleepStartedAt = null;
      pet.stamina = 100.0;
      pet.satiety = Math.max(60, pet.satiety);
      pet.readiness = Math.max(70, pet.readiness);
      pet.criticalSince = null;
      pet.carePoints += 10;
      pet.completedCareCycles++;
    }
    if (!Boolean.TRUE.equals(pet.active)) {
      // Reserve companions keep their vital state; daily study rules still apply.
      if (pet.criticalSince != null) pet.criticalSince = pet.criticalSince.plus(
        Duration.between(from, now)
      );
      pet.trainingHeartbeatAt = null;
      pet.vitalsUpdatedAt = now;
      pet.energy = rounded(pet.stamina);
      return;
    }
    double elapsedHours = Math.max(
      0,
      Duration.between(from, now).toMillis() / 3_600_000.0
    );
    double hoursToEmpty = Math.min(
      pet.satiety / 4,
      Math.min(pet.stamina / 3, pet.readiness / 2)
    );
    if (pet.criticalSince == null && elapsedHours >= hoursToEmpty) {
      pet.criticalSince = from.plusMillis((long) (hoursToEmpty * 3_600_000));
    }
    pet.satiety = Math.max(0, pet.satiety - elapsedHours * 4);
    pet.stamina = Math.max(0, pet.stamina - elapsedHours * 3);
    pet.readiness = Math.max(0, pet.readiness - elapsedHours * 2);
    pet.vitalsUpdatedAt = now;
    if (
      pet.criticalSince != null &&
      !now.isBefore(pet.criticalSince.plus(CRITICAL_GRACE))
    ) {
      pet.diedAt = pet.criticalSince
        .plus(CRITICAL_GRACE)
        .atZone(clock.getZone())
        .toLocalDate();
      pet.deathCause = "VITALS";
      pet.deathCount++;
      pet.trainingStartedAt = null;
      pet.trainingHeartbeatAt = null;
    }
    pet.energy = pet.diedAt == null ? rounded(pet.stamina) : 0;
  }

  public VitalView view(PetCompanion pet) {
    evaluate(pet);
    Instant now = clock.instant();
    boolean available = pet.diedAt == null && Boolean.TRUE.equals(pet.active);
    boolean sleeping = pet.sleepUntil != null;
    boolean training = pet.trainingStartedAt != null;
    boolean eating = pet.eatingUntil != null && now.isBefore(pet.eatingUntil);
    boolean trainingCooldown =
      pet.trainingCompletedAt != null &&
      now.isBefore(pet.trainingCompletedAt.plus(Duration.ofHours(8)));
    boolean mealCooldown =
      pet.lastFedAt != null &&
      now.isBefore(pet.lastFedAt.plus(Duration.ofHours(4)));
    boolean canTrain =
      available &&
      !sleeping &&
      !eating &&
      !trainingCooldown &&
      pet.stamina >= 20 &&
      pet.satiety >= 20;
    boolean canEat =
      available && !sleeping && !training && !eating && !mealCooldown;
    boolean canRest =
      available &&
      !sleeping &&
      !training &&
      !eating &&
      pet.trainedSinceRest &&
      pet.fedSinceRest;
    String activity =
      pet.diedAt != null
        ? "DEAD"
        : sleeping
          ? "SLEEPING"
          : training
            ? "TRAINING"
            : eating
              ? "EATING"
              : "IDLE";
    String trainHint = sleeping
      ? "Oito horas de sono. Nada de acordar a coruja!"
      : training
        ? "30 minutos com a aba visível; sair pausa o treino."
        : trainingCooldown
          ? "Próximo treino oito horas após o último."
          : pet.stamina < 20 || pet.satiety < 20
            ? "Coma ou descanse: energia e saciedade precisam estar em 20%."
            : "30 min de presença: preparo cheio e +20 pontos de cuidado.";
    String eatHint = sleeping
      ? "A pizza espera a coruja acordar."
      : training
        ? "Termine o treino antes da pizza."
        : mealCooldown
          ? "Uma pizza a cada quatro horas."
          : "Enche a saciedade e recupera 25 de energia.";
    String restHint = sleeping
      ? "O sono termina mesmo com o site fechado."
      : !pet.trainedSinceRest || !pet.fedSinceRest
        ? !pet.trainedSinceRest && !pet.fedSinceRest
          ? "Para dormir: conclua um treino e coma."
          : !pet.trainedSinceRest
            ? "Para dormir: falta concluir um treino."
            : "Para dormir: falta comer após o último descanso."
        : "8 h de sono: energia cheia e +10 pontos de cuidado.";
    return new VitalView(
      rounded(pet.satiety),
      rounded(pet.stamina),
      rounded(pet.readiness),
      pet.carePoints,
      pet.completedCareCycles,
      activity,
      pet.trainingElapsedMillis / 1000,
      TRAINING_DURATION.toSeconds(),
      pet.trainingHeartbeatAt != null &&
        Duration.between(pet.trainingHeartbeatAt, now).compareTo(
          PRESENCE_GAP
        ) <= 0,
      pet.sleepUntil,
      pet.eatingUntil,
      pet.trainingCompletedAt,
      pet.wokeAt,
      pet.criticalSince == null ? null : pet.criticalSince.plus(CRITICAL_GRACE),
      canTrain && !training,
      canEat,
      canRest,
      trainHint,
      eatHint,
      restHint,
      pet.deathCause
    );
  }

  public void interact(PetCompanion pet, String action) {
    VitalView state = view(pet);
    if (pet.diedAt != null) throw new IllegalArgumentException(
      "Esta jornada terminou. Recomece uma vida para cuidar da coruja."
    );
    Instant now = clock.instant();
    switch (action) {
      case "TRAIN" -> {
        if (!state.canTrain()) throw new IllegalArgumentException(
          state.trainHint()
        );
        pet.trainingStartedAt = now;
        pet.trainingHeartbeatAt = now;
        pet.trainingElapsedMillis = 0;
        pet.stamina -= 10;
        pet.satiety -= 10;
      }
      case "FEED" -> {
        if (!state.canEat()) throw new IllegalArgumentException(
          state.eatHint()
        );
        pet.satiety = 100.0;
        pet.stamina = Math.min(100, pet.stamina + 25);
        pet.lastFedAt = now;
        pet.eatingUntil = now.plusSeconds(12);
        pet.fedSinceRest = true;
      }
      case "REST" -> {
        if (!state.canRest()) throw new IllegalArgumentException(
          state.restHint()
        );
        pet.sleepStartedAt = now;
        pet.sleepUntil = now.plus(SLEEP_DURATION);
        pet.trainedSinceRest = false;
        pet.fedSinceRest = false;
        pet.criticalSince = null;
      }
      default -> throw new IllegalArgumentException(
        "Escolha treinar, comer ou descansar."
      );
    }
    clearCriticalWhenRecovered(pet);
    pet.energy = rounded(pet.stamina);
  }

  public void presence(PetCompanion pet, boolean present) {
    evaluate(pet);
    if (
      pet.diedAt != null ||
      !Boolean.TRUE.equals(pet.active) ||
      pet.trainingStartedAt == null
    ) return;
    Instant now = clock.instant();
    if (present && pet.trainingHeartbeatAt != null) {
      Duration elapsed = Duration.between(pet.trainingHeartbeatAt, now);
      if (!elapsed.isNegative() && elapsed.compareTo(PRESENCE_GAP) <= 0) {
        pet.trainingElapsedMillis = Math.min(
          TRAINING_DURATION.toMillis(),
          pet.trainingElapsedMillis + elapsed.toMillis()
        );
      }
    }
    pet.trainingHeartbeatAt = present ? now : null;
    if (pet.trainingElapsedMillis >= TRAINING_DURATION.toMillis()) {
      pet.trainingStartedAt = null;
      pet.trainingHeartbeatAt = null;
      pet.trainingCompletedAt = now;
      pet.trainedSinceRest = true;
      pet.readiness = 100.0;
      pet.carePoints += 20;
      clearCriticalWhenRecovered(pet);
    }
  }

  public void restart(PetCompanion pet) {
    pet.vitalsUpdatedAt = null;
    pet.criticalSince = null;
    pet.deathCause = null;
    pet.trainingStartedAt = null;
    pet.trainingHeartbeatAt = null;
    pet.trainingElapsedMillis = 0;
    pet.trainingCompletedAt = null;
    pet.lastFedAt = null;
    pet.eatingUntil = null;
    pet.sleepStartedAt = null;
    pet.sleepUntil = null;
    pet.wokeAt = null;
    pet.trainedSinceRest = false;
    pet.fedSinceRest = false;
    initialize(pet);
  }

  private void clearCriticalWhenRecovered(PetCompanion pet) {
    if (
      pet.satiety > 0 && pet.stamina > 0 && pet.readiness > 0
    ) pet.criticalSince = null;
  }

  private int rounded(double value) {
    return (int) Math.ceil(Math.max(0, Math.min(100, value)));
  }
}
