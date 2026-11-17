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

  public LocalDateTime lastInteraction;
  public LocalDateTime lastRest;
}
