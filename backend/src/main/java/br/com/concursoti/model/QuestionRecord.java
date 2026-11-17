package br.com.concursoti.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "question_records", indexes = @Index(name="idx_questions_topic", columnList="topic_id"))
public class QuestionRecord {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) public Long id;
  @ManyToOne(optional = false, fetch = FetchType.EAGER) @JoinColumn(name="topic_id") public Topic topic;
  @Column(nullable = false) public Integer total;
  @Column(nullable = false) public Integer correct;
  @Column(nullable = false) public LocalDate date;
  @Column(length = 400) public String notes;
  // Duração do cronômetro vinculada ao registro; o histórico consolidado usa study_sessions.
  @Column(name="focus_duration_seconds") public Long focusDurationSeconds;
}
