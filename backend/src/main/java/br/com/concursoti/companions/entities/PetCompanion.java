package br.com.concursoti.companions.entities;

import jakarta.persistence.*;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "pet_companions")
public class PetCompanion {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(nullable = false, length = 25, unique = true)
  public String species;

  @Column(nullable = false)
  public Integer xp = 0;

  @Column(nullable = false)
  public Integer energy = 75;

  @Column(nullable = false)
  public Boolean active = false;

  public LocalDate lastActivity = LocalDate.now();
  public LocalDate lastDecay = LocalDate.now();
  public LocalDate obtainedAt = LocalDate.now();

  // Evolui com interações, mas NÃO concede XP sem estudar.
  @Column
  public Integer bond = 20;

  // Null on upgraded pets: their first daily-care evaluation starts today.
  public LocalDate careStartedAt;
  public LocalDate lastCareDate;
  public LocalDate diedAt;

  @Column(nullable = false, columnDefinition = "integer default 0")
  public int missedDays;

  @Column(nullable = false, columnDefinition = "integer default 0")
  public int goalStreak;

  @Column(nullable = false, columnDefinition = "integer default 0")
  public int bestGoalStreak;

  @Column(nullable = false, columnDefinition = "integer default 0")
  public int deathCount;

  @Column(nullable = false, columnDefinition = "integer default 0")
  public int previousLifeXp;

  // Optional columns keep existing companions compatible with the owl wardrobe.
  @Column(length = 16)
  public String heroPath;

  @Column(length = 7)
  public String featherColor;

  @Column(length = 7)
  public String scarfColor;

  @Column(length = 7)
  public String eyeColor;

  @Column(length = 16)
  public String headAccessory;

  @Column(length = 16)
  public String bodyAccessory;

  // Nullable values initialize existing companions without retroactive penalties.
  public Double satiety;
  public Double stamina;
  public Double readiness;
  public Instant vitalsUpdatedAt;
  public Instant criticalSince;

  @Column(length = 20)
  public String deathCause;

  public Instant trainingStartedAt;
  public Instant trainingHeartbeatAt;

  @Column(nullable = false, columnDefinition = "bigint default 0")
  public long trainingElapsedMillis;

  public Instant trainingCompletedAt;
  public Instant lastFedAt;
  public Instant eatingUntil;
  public Instant sleepStartedAt;
  public Instant sleepUntil;
  public Instant wokeAt;

  @Column(nullable = false, columnDefinition = "boolean default false")
  public boolean trainedSinceRest;

  @Column(nullable = false, columnDefinition = "boolean default false")
  public boolean fedSinceRest;

  @Column(nullable = false, columnDefinition = "integer default 0")
  public int carePoints;

  @Column(nullable = false, columnDefinition = "integer default 0")
  public int completedCareCycles;

  public LocalDateTime lastInteraction;
  public LocalDateTime lastRest;
}
