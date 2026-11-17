package br.com.concursoti.errornotes.entities;

import br.com.concursoti.curriculum.entities.Topic;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "error_notes")
public class ErrorNote {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @ManyToOne(optional = false, fetch = FetchType.EAGER)
  @JoinColumn(name = "topic_id")
  public Topic topic;

  @Column(nullable = false, length = 220)
  public String source;

  @Column(nullable = false, columnDefinition = "text")
  public String trap;

  @Column(nullable = false, columnDefinition = "text")
  public String correctAnswer;

  @Column(nullable = false)
  public Boolean recurring = false;

  @Column(nullable = false)
  public LocalDate createdAt;

  @Column(length = 36)
  public String questionImageId;

  @Column(length = 36)
  public String answerImageId;

  @com.fasterxml.jackson.annotation.JsonIgnore
  @Column(columnDefinition = "text")
  public String flashcardState;

  @com.fasterxml.jackson.annotation.JsonIgnore
  @Column(columnDefinition = "text")
  public String flashcardHistory;

  @Column(nullable = false, columnDefinition = "bigint default 0")
  public long flashcardRevision;
}
