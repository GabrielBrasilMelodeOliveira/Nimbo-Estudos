package br.com.concursoti.dailygoals.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "daily_goal_days")
public class DailyGoalDay {

  @Id
  public LocalDate studyDate;

  public int targetMinutes;
  public int targetQuestions;
  public int targetTopics;
  public long studiedSeconds;
  public int answeredQuestions;
  public int studiedTopics;

  @Column(nullable = false, length = 12)
  public String outcome = "PENDING";

  public boolean closed;
}
