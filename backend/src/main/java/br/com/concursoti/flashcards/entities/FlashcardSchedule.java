package br.com.concursoti.flashcards.entities;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;

/** Shared persistence mapping; existing error-note schedule columns stay unchanged. */
@MappedSuperclass
public abstract class FlashcardSchedule {

  @com.fasterxml.jackson.annotation.JsonIgnore
  @Column(columnDefinition = "text")
  public String flashcardState;

  @com.fasterxml.jackson.annotation.JsonIgnore
  @Column(columnDefinition = "text")
  public String flashcardHistory;

  @Column(nullable = false, columnDefinition = "bigint default 0")
  public long flashcardRevision;

  @com.fasterxml.jackson.annotation.JsonIgnore
  @Column(columnDefinition = "text")
  public String flashcardUndoState;
}
