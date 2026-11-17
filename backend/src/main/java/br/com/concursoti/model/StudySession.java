package br.com.concursoti.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="study_sessions", indexes=@Index(name="idx_study_date",columnList="study_date"))
public class StudySession {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
  @ManyToOne(optional=false,fetch=FetchType.EAGER) @JoinColumn(name="discipline_id") public Discipline discipline;
  @ManyToOne(fetch=FetchType.EAGER) @JoinColumn(name="topic_id") public Topic topic;
  public enum Kind { THEORY, QUESTIONS }
  // A coluna pode ser nula para manter compatibilidade com sessões das versões antigas.
  // Sem tipo definido = teoria. Novas sessões sempre persistem a categoria.
  @Enumerated(EnumType.STRING) @Column(name="study_kind", length=16)
  public Kind kind = Kind.THEORY;
  public Kind effectiveKind() { return kind == null ? Kind.THEORY : kind; }
  @Column(nullable=false) public Long durationSeconds;
  @Column(name="study_date",nullable=false) public LocalDate studyDate;
  @Column(nullable=false) public LocalDateTime createdAt;
  @PrePersist public void prePersist() { if (createdAt==null) createdAt=LocalDateTime.now(); }
}
