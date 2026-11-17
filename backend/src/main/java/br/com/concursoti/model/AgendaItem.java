package br.com.concursoti.model;

import jakarta.persistence.*;
import java.time.*;

@Entity @Table(name="agenda_items",indexes={@Index(name="idx_agenda_date",columnList="scheduled_date")})
public class AgendaItem {
  public enum Category { PERSONAL, ACADEMIC, STUDY, WORK, HEALTH }
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
  @Column(nullable=false,length=180) public String title;
  @Enumerated(EnumType.STRING) @Column(nullable=false,length=20) public Category category=Category.PERSONAL;
  @Column(name="scheduled_date",nullable=false) public LocalDate scheduledDate;
  public LocalTime startTime;
  public Integer durationMinutes=30;
  /** Apenas compromissos STUDY com um assunto são vinculados automaticamente às métricas. */
  @ManyToOne(fetch=FetchType.EAGER) @JoinColumn(name="topic_id") public Topic topic;
  @Enumerated(EnumType.STRING) @Column(name="study_kind",length=16) public StudySession.Kind studyKind;
  public Integer targetQuestions;
  public Integer priority=2;
  @Column(nullable=false) public Boolean completed=false;
  @Column(nullable=false) public Boolean repeatWeekly=false;
  @Column(length=1200) public String notes="";
  @Column(nullable=false,updatable=false) public LocalDateTime createdAt=LocalDateTime.now();
}
