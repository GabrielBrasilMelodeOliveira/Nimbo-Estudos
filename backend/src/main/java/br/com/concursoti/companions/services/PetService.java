package br.com.concursoti.companions.services;

import br.com.concursoti.companions.entities.PetCompanion;
import br.com.concursoti.companions.repositories.PetCompanionRepository;
import br.com.concursoti.companions.repositories.PetRepository;
import br.com.concursoti.companions.types.CompanionClass;
import br.com.concursoti.dailygoals.entities.DailyGoalDay;
import br.com.concursoti.dailygoals.services.DailyProgressService;
import java.time.Clock;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PetService {

  private final PetCompanionRepository companions;
  private final PetRepository legacy;
  private final DailyProgressService dailyProgress;
  private final PetCarePolicy carePolicy;
  private final Clock clock;
  private static final List<String> SPECIES = List.of(
    "nori",
    "luma",
    "favo",
    "brisa",
    "mimo",
    "foli",
    "fira",
    "tuca",
    "duna",
    "noa",
    "iris"
  );
  private static final List<String> OLD_SPECIES = List.of(
    "bulbasaur",
    "charmander",
    "squirtle",
    "pikachu",
    "pidgey",
    "abra",
    "gastly",
    "dratini",
    "chikorita",
    "cyndaquil",
    "totodile"
  );

  public PetService(
    PetCompanionRepository companions,
    PetRepository legacy,
    DailyProgressService dailyProgress,
    PetCarePolicy carePolicy,
    Clock clock
  ) {
    this.companions = companions;
    this.legacy = legacy;
    this.dailyProgress = dailyProgress;
    this.carePolicy = carePolicy;
    this.clock = clock;
  }

  /** Preserva XP, energia e coleção existente ao migrar do tema antigo para Nimbo. */
  private void migrate() {
    if (companions.count() == 0) {
      legacy.findById(1L).ifPresent(old -> {
        PetCompanion copy = new PetCompanion();
        copy.species = old.species;
        copy.xp = old.xp;
        copy.energy = old.energy;
        copy.lastActivity = old.lastActivity;
        copy.lastDecay = old.lastDecay;
        copy.active = true;
        companions.save(copy);
      });
    }
    List<PetCompanion> all = new ArrayList<>(companions.findAll());
    Set<String> used = new HashSet<>();
    for (PetCompanion p : all)
      if (SPECIES.contains(p.species)) used.add(p.species);
    for (PetCompanion p : all) {
      if (SPECIES.contains(p.species)) continue;
      int oldIndex = OLD_SPECIES.indexOf(p.species);
      String desired = oldIndex >= 0 ? SPECIES.get(oldIndex) : SPECIES.get(0);
      if (used.contains(desired)) desired = SPECIES.stream()
        .filter(s -> !used.contains(s))
        .findFirst()
        .orElse(null);
      if (desired != null) {
        p.species = desired;
        companions.save(p);
        used.add(desired);
      }
    }
  }

  private PetCompanion active() {
    return companions
      .findFirstByActiveTrue()
      .orElseGet(() -> companions.findAll().stream().findFirst().orElse(null));
  }

  @Transactional
  public Map<String, Object> current() {
    // The shared daily-goal lock serializes care and XP updates before loading pets.
    List<DailyGoalDay> days = dailyProgress.synchronize();
    migrate();
    PetCompanion p = active();
    if (p == null) return null;
    return decorated(p, days);
  }

  private Map<String, Object> decorated(
    PetCompanion p,
    List<DailyGoalDay> days
  ) {
    List<PetCompanion> all = new ArrayList<>(companions.findAll());
    Map<String, Object> view = new LinkedHashMap<>(view(p, days));
    all.sort(Comparator.comparing(a -> a.id));
    view.put(
      "collection",
      all
        .stream()
        .map(member -> view(member, days))
        .toList()
    );
    long mature = all
      .stream()
      .filter(
        a -> a.diedAt == null && CompanionClass.BATTLE_MASTER.isReachedBy(a.xp)
      )
      .count();
    boolean credit = mature >= all.size(); // Mastery keeps the existing level-13 recruitment unlock.
    view.put("canAdopt", credit && all.size() < SPECIES.size());
    view.put(
      "availableSpecies",
      SPECIES.stream()
        .filter(s -> all.stream().noneMatch(a -> a.species.equals(s)))
        .toList()
    );
    view.put("totalCompanions", all.size());
    view.put("classJourney", CompanionClass.journey());
    view.put("collectionComplete", all.size() == SPECIES.size());
    return view;
  }

  @Transactional
  public Map<String, Object> choose(String species) {
    if (
      species == null || !SPECIES.contains(species.toLowerCase(Locale.ROOT))
    ) throw new IllegalArgumentException("Escolha um companheiro disponível.");
    // The shared daily-goal lock serializes care and XP updates before loading pets.
    List<DailyGoalDay> days = dailyProgress.synchronize();
    migrate();
    species = species.toLowerCase(Locale.ROOT);
    if (
      companions.findBySpecies(species).isPresent()
    ) throw new IllegalArgumentException(
      "Este companheiro já está na coleção."
    );
    List<PetCompanion> all = new ArrayList<>(companions.findAll());
    all.forEach(member -> carePolicy.evaluate(member, days));
    if (
      !all.isEmpty() &&
      all
        .stream()
        .filter(
          a ->
            a.diedAt == null && CompanionClass.BATTLE_MASTER.isReachedBy(a.xp)
        )
        .count() < all.size()
    ) throw new IllegalArgumentException(
      "Alcance Mestre de Batalha (nível 13) com todos os companheiros para recrutar outro aventureiro."
    );
    for (PetCompanion member : all) {
      member.active = false;
      companions.save(member);
    }
    PetCompanion p = new PetCompanion();
    p.species = species;
    p.obtainedAt = LocalDate.now(clock);
    p.lastActivity = p.obtainedAt;
    p.lastDecay = p.obtainedAt;
    p.active = true;
    companions.save(p);
    return decorated(p, days);
  }

  @Transactional
  public Map<String, Object> activate(Long id) {
    // The shared daily-goal lock serializes care and XP updates before loading pets.
    List<DailyGoalDay> days = dailyProgress.synchronize();
    migrate();
    PetCompanion chosen = companions
      .findById(id)
      .orElseThrow(() ->
        new IllegalArgumentException("Companheiro não encontrado na coleção.")
      );
    for (PetCompanion other : companions.findAll()) {
      other.active = other.id.equals(id);
      companions.save(other);
    }
    return decorated(chosen, days);
  }

  @Transactional
  public Map<String, Object> restart(Long id) {
    // The shared daily-goal lock serializes care and XP updates before loading pets.
    List<DailyGoalDay> days = dailyProgress.synchronize();
    migrate();
    PetCompanion pet = companions.findById(id).orElseThrow();
    carePolicy.evaluate(pet, days);
    if (pet.diedAt == null) throw new IllegalArgumentException(
      "Esta vida ainda está ativa."
    );
    pet.previousLifeXp = pet.xp;
    pet.xp = 0;
    pet.bond = 20;
    pet.missedDays = 0;
    pet.goalStreak = 0;
    pet.diedAt = null;
    pet.careStartedAt = LocalDate.now(clock);
    pet.lastCareDate = pet.careStartedAt.minusDays(1);
    pet.lastInteraction = null;
    pet.lastRest = null;
    companions.save(pet);
    return decorated(pet, days);
  }

  @Transactional
  public Map<String, Object> interact(String type) {
    // The shared daily-goal lock serializes care and XP updates before loading pets.
    List<DailyGoalDay> days = dailyProgress.synchronize();
    migrate();
    PetCompanion p = active();
    if (p == null) throw new IllegalArgumentException(
      "Escolha primeiro um companheiro."
    );
    if (type == null) throw new IllegalArgumentException(
      "Escolha uma interação."
    );
    String action = type.toUpperCase(Locale.ROOT);
    if (
      !Set.of("PET", "TALK", "PLAY", "REST").contains(action)
    ) throw new IllegalArgumentException("Interação inválida.");
    carePolicy.evaluate(p, days);
    if (p.diedAt != null) throw new IllegalArgumentException(
      "Esta jornada terminou. Recomece uma vida para interagir."
    );
    LocalDateTime now = LocalDateTime.now(clock);
    if (
      p.lastInteraction != null &&
      Duration.between(p.lastInteraction, now).toSeconds() < 15
    ) throw new IllegalArgumentException(
      "Nimbo precisa de alguns segundos antes da próxima interação."
    );
    switch (action) {
      case "PET" -> p.bond = Math.min(100, (p.bond == null ? 20 : p.bond) + 1);
      case "TALK" -> p.bond = Math.min(100, (p.bond == null ? 20 : p.bond) + 2);
      case "PLAY" -> {
        if (p.energy < 4) throw new IllegalArgumentException(
          "Seu companheiro precisa recuperar energia antes de treinar."
        );
        p.bond = Math.min(100, (p.bond == null ? 20 : p.bond) + 3);
      }
      case "REST" -> {
        if (
          p.lastRest != null && Duration.between(p.lastRest, now).toHours() < 4
        ) throw new IllegalArgumentException(
          "Seu companheiro descansou recentemente. Volte depois."
        );
        p.bond = Math.min(100, (p.bond == null ? 20 : p.bond) + 1);
        p.lastRest = now;
      }
    }
    p.lastInteraction = now;
    p.lastActivity = LocalDate.now(clock);
    companions.save(p);
    return decorated(p, days);
  }

  @Transactional
  public void awardExperience(int experiencePoints) {
    // The shared daily-goal lock serializes care and XP updates before loading pets.
    List<DailyGoalDay> days = dailyProgress.synchronize();
    migrate();
    PetCompanion p = active();
    if (p == null) return;
    carePolicy.evaluate(p, days);
    if (p.diedAt != null) return;
    p.xp = Math.max(0, p.xp + experiencePoints);
    p.lastActivity = LocalDate.now(clock);
    p.lastDecay = LocalDate.now(clock);
    companions.save(p);
  }

  private Map<String, Object> view(PetCompanion p, List<DailyGoalDay> days) {
    PetCarePolicy.CareView care = carePolicy.evaluate(p, days);
    CompanionClass.CareerView career = CompanionClass.describe(p.xp);
    Map<String, Object> out = new LinkedHashMap<>();
    out.put("care", care);
    out.put("mood", care.mood());
    out.put("message", care.message());
    out.put("id", p.id);
    out.put("species", p.species);
    out.put("xp", p.xp);
    out.put("energy", p.energy);
    out.put("stage", career.current().rank());
    out.put("career", career);
    out.put("level", 1 + p.xp / 100);
    out.put("xpWithinStage", career.experienceWithinClass());
    out.put("xpToNextStage", career.experienceToNextClass());
    out.put("bond", p.bond == null ? 20 : p.bond);
    out.put("lastInteraction", p.lastInteraction);
    out.put("lastRest", p.lastRest);
    out.put("lastActivity", p.lastActivity);
    out.put("active", p.active);
    out.put("obtainedAt", p.obtainedAt);
    return out;
  }
}
