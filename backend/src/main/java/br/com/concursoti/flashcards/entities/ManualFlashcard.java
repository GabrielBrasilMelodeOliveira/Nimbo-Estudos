package br.com.concursoti.flashcards.entities;

import br.com.concursoti.curriculum.entities.Discipline;
import br.com.concursoti.curriculum.entities.Topic;
import jakarta.persistence.*;
import java.time.Instant;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "manual_flashcards")
public class ManualFlashcard extends FlashcardSchedule {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(nullable = false, length = 220)
  public String title;

  @Column(nullable = false, columnDefinition = "text")
  public String question;

  @Column(nullable = false, columnDefinition = "text")
  public String answer;

  @Column(length = 36)
  public String questionImageId;

  @Column(length = 36)
  public String answerImageId;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "discipline_id")
  @OnDelete(action = OnDeleteAction.SET_NULL)
  public Discipline discipline;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "topic_id")
  @OnDelete(action = OnDeleteAction.SET_NULL)
  public Topic topic;

  @Column(nullable = false)
  public Instant createdAt;
}
