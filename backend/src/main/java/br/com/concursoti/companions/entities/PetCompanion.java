package br.com.concursoti.companions.entities;

import jakarta.persistence.*;
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

  public LocalDateTime lastInteraction;
  public LocalDateTime lastRest;
}
