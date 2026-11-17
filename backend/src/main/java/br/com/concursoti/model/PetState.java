package br.com.concursoti.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="study_pet")
public class PetState {
  @Id public Long id=1L;
  @Column(nullable=false,length=25) public String species;
  @Column(nullable=false) public Integer xp=0;
  @Column(nullable=false) public Integer energy=75;
  @Column(nullable=false) public LocalDate lastActivity=LocalDate.now();
  @Column(nullable=false) public LocalDate lastDecay=LocalDate.now();
}
