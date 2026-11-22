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
        pet.deathCause = "STUDY";
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
      message = "VITALS".equals(pet.deathCause)
        ? "As barras zeraram, o resgate não veio e minhas penas pediram demissão. Esta vida acabou; seus estudos continuam salvos."
        : "Quatro dias sem progresso. O conselho das corujas encerrou minha jornada. Recomeçamos? Seus estudos estão intactos.";
    } else if (outcome.equals("PARTIAL")) {
      mood = "neutral";
      label = "Neutro";
      message =
        "Já saiu progresso! Minhas penas aprovaram com ressalvas. Complete as metas e eu libero o escândalo da vitória.";
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
        "ATENÇÃO, BIBLIOTECA: metas completas! " +
        (streak >= 3
          ? "Já são " +
            streak +
            " dias seguidos. Estou " +
            label.toLowerCase(java.util.Locale.ROOT) +
            " com nossa constância!"
          : "Eu sou oficialmente uma coruja insuportavelmente orgulhosa!");
    } else if (pet.missedDays >= 3) {
      mood = LocalTime.now(clock).getHour() < 12 ? "sad" : "angry";
      label = mood.equals("sad") ? "Triste" : "Irritado";
      message =
        "Três dias sem estudo. Estou a UMA página de abrir um sindicato das penas! Estude hoje: outro dia vazio encerra minha vida.";
    } else if (pet.missedDays == 2) {
      mood = "tired";
      label = "Cansado";
      message =
        "Dois dias sem progresso. Meu cérebro virou purê de apostila. Vamos registrar um estudo antes que eu vire decoração.";
    } else if (pet.missedDays == 1) {
      mood = "hungry";
      label = "Com fome";
      message =
        "Ontem o estudo evaporou! Meu estômago está tentando resolver questões sozinho. Faça um pouco hoje e me dê uma pizza.";
    } else {
      mood = "neutral";
      label = "Neutro";
      message =
        "Penas penteadas, drama carregado. Cadê o primeiro estudo do dia? Minha armadura não evolui olhando para ela.";
    }
    if (pet.diedAt != null) pet.energy = 0;
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
