package br.com.concursoti.dailygoals.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "daily_goal_settings")
public class DailyGoalSettings {

  @Id
  public Long id = 1L;

  @Column(nullable = false)
  public LocalDate trackingStart;

  @Column(nullable = false)
  public int targetMinutes;

  @Column(nullable = false)
  public int targetQuestions;

  @Column(nullable = false)
  public int targetTopics;
}
