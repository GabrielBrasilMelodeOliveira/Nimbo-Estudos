package br.com.concursoti.planning.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(
  name = "period_goals",
  uniqueConstraints = @UniqueConstraint(
    columnNames = { "period_type", "period_start" }
  )
)
public class PeriodGoal {

  public enum PeriodType {
    WEEK,
    MONTH,
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Enumerated(EnumType.STRING)
  @Column(name = "period_type", nullable = false, length = 12)
  public PeriodType periodType;

  @Column(name = "period_start", nullable = false)
  public LocalDate periodStart;

  @Column(nullable = false)
  public Integer targetMinutes = 0;

  @Column(nullable = false)
  public Integer targetQuestions = 0;

  @Column(nullable = false)
  public Integer targetTopics = 0;
}
