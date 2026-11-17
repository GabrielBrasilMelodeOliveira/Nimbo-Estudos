package br.com.concursoti.planning.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "study_plan")
public class StudyPlan {

  @Id
  public Long id = 1L;

  @Column(nullable = false, length = 140)
  public String name = "Concurso Bancário de TI";

  public LocalDate examDate;

  @Column(nullable = false)
  public Integer weeklyGoalMinutes = 900;

  @Column(nullable = false)
  public Integer weeklyGoalTopics = 5;
}
