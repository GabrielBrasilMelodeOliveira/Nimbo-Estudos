package br.com.concursoti.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "topics", indexes = @Index(name = "idx_topics_discipline", columnList = "discipline_id"))
public class Topic {
  public enum Status { NOT_STARTED, IN_PROGRESS, COMPLETED }
  public enum Mastery { WEAK, MEDIUM, STRONG }
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) public Long id;
  @ManyToOne(optional = false, fetch = FetchType.EAGER) @JoinColumn(name = "discipline_id") public Discipline discipline;
  @Column(nullable = false, length = 200) public String title;
  @Enumerated(EnumType.STRING) @Column(nullable = false, length = 24) public Status status = Status.NOT_STARTED;
  @Column(nullable = false) public Boolean theoryDone = false;
  @Column(nullable = false) public Boolean summaryDone = false;
  @Enumerated(EnumType.STRING) @Column(nullable = false, length = 16) public Mastery mastery = Mastery.WEAK;
  @Column public Integer importance = 3; // Relevância específica do assunto (1-5)
  public LocalDate theoryCompletedAt;
  /** Última percepção subjetiva de assimilação, de 1 a 4. */
  @Column public Integer assimilationLevel;
  /** Migração de revisões executada uma única vez; evita recriar revisões limpas pelo usuário. */
  @Column public Boolean reviewScheduleInitialized=false;
  public Topic() {}
  public Topic(Discipline discipline, String title) { this.discipline=discipline; this.title=title; }
}
