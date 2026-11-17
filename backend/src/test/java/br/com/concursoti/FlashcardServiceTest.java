package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import br.com.concursoti.curriculum.entities.Discipline;
import br.com.concursoti.curriculum.entities.Topic;
import br.com.concursoti.errornotes.entities.ErrorNote;
import br.com.concursoti.errornotes.repositories.ErrorNoteRepository;
import br.com.concursoti.errornotes.services.FlashcardService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.openspacedrepetition.Card;
import io.github.openspacedrepetition.Rating;
import io.github.openspacedrepetition.Scheduler;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

class FlashcardServiceTest {

  ErrorNoteRepository repository;
  FlashcardService service;
  ErrorNote errorNote;

  @BeforeEach
  void prepare() {
    repository = mock(ErrorNoteRepository.class);
    service = new FlashcardService(repository, new ObjectMapper());
    errorNote = new ErrorNote();
    errorNote.id = 42L;
    errorNote.topic = new Topic(
      new Discipline("Java", "#123456", 0),
      "Transações"
    );
    errorNote.source = "Questão 42";
    errorNote.trap = "Quando ocorre rollback?";
    errorNote.correctAnswer = "Conforme as regras da transação.";
    when(repository.findLockedById(42L)).thenReturn(Optional.of(errorNote));
  }

  @Test
  void existingErrorsBecomeDueCardsWithoutChangingTheNotes() {
    when(repository.findAll()).thenReturn(List.of(errorNote));
    var card = service.list().getFirst();
    assertEquals(errorNote.trap, card.question());
    assertEquals(errorNote.correctAnswer, card.answer());
    assertFalse(card.due().isAfter(Instant.now()));
    assertEquals(4, card.nextReviews().size());
    assertNull(errorNote.flashcardState);
    verify(repository, never()).save(any());
  }

  @Test
  void recordsFsrsScheduleAndHistoryAndRejectsRepeatedSubmission() {
    service.review(42L, new FlashcardService.ReviewInput(Rating.GOOD, 0L));
    Card saved = Card.fromJson(errorNote.flashcardState);
    Card expected = Scheduler.builder()
      .desiredRetention(0.9)
      .enableFuzzing(false)
      .build()
      .reviewCard(
        Card.builder().cardId(42).due(saved.getLastReview()).build(),
        Rating.GOOD,
        saved.getLastReview()
      )
      .card();
    assertEquals(expected.getDue(), saved.getDue());
    assertEquals(expected.getStability(), saved.getStability());
    assertEquals(1, errorNote.flashcardRevision);
    assertTrue(errorNote.flashcardHistory.contains("rating"));
    assertThrows(ResponseStatusException.class, () ->
      service.review(42L, new FlashcardService.ReviewInput(Rating.GOOD, 0L))
    );
    verify(repository, times(1)).save(errorNote);
  }

  @Test
  void preventsEarlyReviewAfterReload() {
    service.review(42L, new FlashcardService.ReviewInput(Rating.EASY, 0L));
    var restoredService = new FlashcardService(repository, new ObjectMapper());
    assertThrows(IllegalArgumentException.class, () ->
      restoredService.review(
        42L,
        new FlashcardService.ReviewInput(Rating.AGAIN, 1L)
      )
    );
    assertEquals(1, errorNote.flashcardRevision);
  }
}
