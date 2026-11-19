package br.com.concursoti.planning.entities;

import br.com.concursoti.curriculum.entities.Discipline;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "daily_study_plans")
public class DailyStudyPlan {

  @Id
  public LocalDate studyDate;

  @org.hibernate.annotations.OnDelete(
    action = org.hibernate.annotations.OnDeleteAction.SET_NULL
  )
  @ManyToOne(fetch = FetchType.EAGER)
  public Discipline firstDiscipline;

  @org.hibernate.annotations.OnDelete(
    action = org.hibernate.annotations.OnDeleteAction.SET_NULL
  )
  @ManyToOne(fetch = FetchType.EAGER)
  public Discipline secondDiscipline;
}
