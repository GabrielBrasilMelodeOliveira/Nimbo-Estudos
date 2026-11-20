package br.com.concursoti.companions.types;

import java.util.Arrays;
import java.util.List;

/** Class progression is derived from existing XP; no companion or history is replaced. */
public enum CompanionClass {
  COMMON(
    0,
    "Pessoa Comum",
    "Toda grande jornada começa com um primeiro passo."
  ),
  APPRENTICE(200, "Aprendiz", "O conhecimento é seu primeiro equipamento."),
  SOLDIER(400, "Soldado", "Disciplina para encarar um desafio de cada vez."),
  WATCH_GUARDIAN(
    800,
    "Guardião da Vigília",
    "Constância para proteger o que você aprendeu."
  ),
  BATTLE_MASTER(
    1200,
    "Mestre de Batalha",
    "Experiência para transformar desafios em estratégia."
  ),
  DAWN_COMMANDER(
    2400,
    "Comandante da Aurora",
    "Cada novo dia abre uma nova conquista."
  ),
  CONSTANCY_LEGEND(
    4000,
    "Lenda da Constância",
    "Uma jornada construída estudo após estudo."
  );

  private final int minimumExperience;
  private final String displayName;
  private final String description;

  CompanionClass(
    int minimumExperience,
    String displayName,
    String description
  ) {
    this.minimumExperience = minimumExperience;
    this.displayName = displayName;
    this.description = description;
  }

  public record ClassView(
    int rank,
    String name,
    String description,
    int minimumExperience,
    int minimumLevel
  ) {}

  public record CareerView(
    ClassView current,
    ClassView next,
    int experienceWithinClass,
    int experienceToNextClass,
    int remainingExperience
  ) {}

  public boolean isReachedBy(int experience) {
    return experience >= minimumExperience;
  }

  public ClassView view() {
    return new ClassView(
      ordinal() + 1,
      displayName,
      description,
      minimumExperience,
      1 + minimumExperience / 100
    );
  }

  public static List<ClassView> journey() {
    return Arrays.stream(values()).map(CompanionClass::view).toList();
  }

  public static CareerView describe(int experience) {
    int totalExperience = Math.max(0, experience);
    CompanionClass current = COMMON;
    for (CompanionClass candidate : values()) {
      if (totalExperience >= candidate.minimumExperience) current = candidate;
    }
    CompanionClass next =
      current.ordinal() + 1 < values().length
        ? values()[current.ordinal() + 1]
        : null;
    return new CareerView(
      current.view(),
      next == null ? null : next.view(),
      totalExperience - current.minimumExperience,
      next == null ? 0 : next.minimumExperience - current.minimumExperience,
      next == null ? 0 : next.minimumExperience - totalExperience
    );
  }
}
