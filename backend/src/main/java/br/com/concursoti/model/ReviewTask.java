package br.com.concursoti.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="review_tasks",uniqueConstraints=@UniqueConstraint(columnNames={"topic_id","interval_days","due_date"}),indexes=@Index(name="idx_review_due",columnList="due_date"))
public class ReviewTask {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
  @ManyToOne(optional=false,fetch=FetchType.EAGER) @JoinColumn(name="topic_id") public Topic topic;
  @Column(name="due_date",nullable=false) public LocalDate dueDate;
  @Column(name="interval_days",nullable=false) public Integer intervalDays;
  public LocalDate completedAt;
  /** Último nível escolhido ao criar/concluir esta revisão. */
  @Column public Integer assimilationLevel;
  /** Cancelamento lógico: preserva as revisões legadas, sem agendá-las duas vezes. */
  @Column public LocalDate cancelledAt;
  public ReviewTask() {}
  public ReviewTask(Topic topic, LocalDate dueDate, int intervalDays) { this.topic=topic; this.dueDate=dueDate; this.intervalDays=intervalDays; }
}
