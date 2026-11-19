package br.com.concursoti.companions.services;

import br.com.concursoti.companions.entities.PetCompanion;
import br.com.concursoti.dailygoals.entities.DailyGoalDay;
import java.time.*;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class PetCarePolicy {

  private final Clock clock;

  public PetCarePolicy(Clock clock) {
    this.clock = clock;
  }

  public record CareView(
    String mood,
    String moodLabel,
    String message,
    int streak,
    int bestStreak,
    int missedDays,
    int nextMilestone,
    boolean dead,
    LocalDate deathDate,
    LocalDate trackingStart,
    int lifeNumber,
    int previousLifeXp
  ) {}

  public CareView evaluate(PetCompanion pet, List<DailyGoalDay> days) {
    LocalDate today = LocalDate.now(clock);
    if (pet.careStartedAt == null) {
      pet.careStartedAt = today;
      pet.lastCareDate = today.minusDays(1);
    }
    for (DailyGoalDay day : days) {
      if (pet.diedAt != null) break;
      if (
        !day.closed ||
        day.studyDate.isBefore(pet.careStartedAt) ||
        !day.studyDate.isAfter(pet.lastCareDate)
      ) continue;
      switch (day.outcome) {
        case "COMPLETE" -> {
          pet.goalStreak++;
          pet.missedDays = 0;
        }
        case "PARTIAL" -> {
          pet.goalStreak = 0;
          pet.missedDays = 0;
        }
        default -> {
          pet.goalStreak = 0;
          pet.missedDays++;
        }
      }
      pet.bestGoalStreak = Math.max(pet.bestGoalStreak, pet.goalStreak);
      pet.lastCareDate = day.studyDate;
      if (pet.missedDays > 3) {
        pet.diedAt = day.studyDate;
        pet.deathCount++;
      }
    }
    String outcome = days
      .stream()
      .filter(day -> day.studyDate.equals(today))
      .map(day -> day.outcome)
      .findFirst()
      .orElse("PENDING");
    int streak = pet.goalStreak + (outcome.equals("COMPLETE") ? 1 : 0);
    if (outcome.equals("PARTIAL")) streak = 0;
    String mood;
    String label;
    String message;
    if (pet.diedAt != null) {
      mood = "dead";
      label = "Jornada encerrada";
      streak = 0;
      message =
        "Fiquei quatro dias seguidos sem progresso e esta vida terminou. Você pode recomeçar comigo; seus estudos continuam salvos.";
    } else if (outcome.equals("PARTIAL")) {
      mood = "neutral";
      label = "Neutro";
      message =
        "Você já fez parte das metas! Estou bem, sem fome ou cansaço. Complete o restante para celebrarmos juntos.";
    } else if (outcome.equals("COMPLETE")) {
      mood =
        streak >= 30
          ? "legendary"
          : streak >= 14
            ? "radiant"
            : streak >= 7
              ? "excited"
              : streak >= 3
                ? "proud"
                : "happy";
      label =
        streak >= 30
          ? "Lendário"
          : streak >= 14
            ? "Radiante"
            : streak >= 7
              ? "Empolgado"
              : streak >= 3
                ? "Orgulhoso"
                : "Feliz";
      message =
        "Metas de hoje completas! " +
        (streak >= 3
          ? "Já são " +
            streak +
            " dias seguidos. Estou " +
            label.toLowerCase(java.util.Locale.ROOT) +
            " com nossa constância!"
          : "Estou feliz com o que fizemos hoje!");
    } else if (pet.missedDays >= 3) {
      mood = LocalTime.now(clock).getHour() < 12 ? "sad" : "angry";
      label = mood.equals("sad") ? "Triste" : "Irritado";
      message =
        "Estou triste e irritado: três dias terminaram sem progresso. Precisamos estudar hoje; mais um dia vazio encerra esta vida.";
    } else if (pet.missedDays == 2) {
      mood = "tired";
      label = "Cansado";
      message =
        "Estou cansado e com fome depois de dois dias sem progresso. Um começo hoje já me ajuda a ficar neutro.";
    } else if (pet.missedDays == 1) {
      mood = "hungry";
      label = "Com fome";
      message =
        "Ontem terminou sem progresso e estou com fome. Vamos começar uma das metas de hoje?";
    } else {
      mood = "neutral";
      label = "Neutro";
      message =
        "O dia está aberto! Estou esperando nosso primeiro passo. As metas completas me deixam feliz.";
    }
    pet.energy = switch (mood) {
      case "dead" -> 0;
      case "sad", "angry" -> 10;
      case "tired" -> 25;
      case "hungry" -> 45;
      case "neutral" -> 65;
      default -> 100;
    };
    int nextMilestone =
      streak < 3
        ? 3
        : streak < 7
          ? 7
          : streak < 14
            ? 14
            : streak < 30
              ? 30
              : (streak / 30 + 1) * 30;
    return new CareView(
      mood,
      label,
      message,
      streak,
      Math.max(streak, pet.bestGoalStreak),
      pet.missedDays,
      nextMilestone,
      pet.diedAt != null,
      pet.diedAt,
      pet.careStartedAt,
      pet.deathCount + (pet.diedAt == null ? 1 : 0),
      pet.previousLifeXp
    );
  }
}
