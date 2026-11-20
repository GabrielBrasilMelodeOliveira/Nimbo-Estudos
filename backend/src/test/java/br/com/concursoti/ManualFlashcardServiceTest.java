package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import br.com.concursoti.curriculum.entities.Discipline;
import br.com.concursoti.curriculum.entities.Topic;
import br.com.concursoti.curriculum.repositories.DisciplineRepository;
import br.com.concursoti.curriculum.repositories.TopicRepository;
import br.com.concursoti.errornotes.entities.ErrorNote;
import br.com.concursoti.errornotes.repositories.ErrorNoteRepository;
import br.com.concursoti.errornotes.services.FlashcardService;
import br.com.concursoti.flashcards.dto.ManualFlashcardInput;
import br.com.concursoti.flashcards.entities.ManualFlashcard;
import br.com.concursoti.flashcards.repositories.ManualFlashcardRepository;
import br.com.concursoti.flashcards.services.FlashcardSchedulingService;
import br.com.concursoti.flashcards.services.ManualFlashcardService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.openspacedrepetition.Rating;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.web.server.ResponseStatusException;

class ManualFlashcardServiceTest {

  ManualFlashcardRepository repository;
  DisciplineRepository disciplines;
  TopicRepository topics;
  FlashcardSchedulingService scheduling;
  ManualFlashcardService service;
  br.com.concursoti.assets.services.AssetService assets;

  @BeforeEach
  void prepare() {
    repository = mock(ManualFlashcardRepository.class);
    disciplines = mock(DisciplineRepository.class);
    topics = mock(TopicRepository.class);
    scheduling = new FlashcardSchedulingService(new ObjectMapper());
    assets = mock(br.com.concursoti.assets.services.AssetService.class);
    service = new ManualFlashcardService(
      repository,
      disciplines,
      topics,
      scheduling,
      assets
    );
    when(repository.save(any())).thenAnswer(invocation -> {
      ManualFlashcard card = invocation.getArgument(0);
      card.id = 1L;
      return card;
    });
  }

  private ManualFlashcard createCard() {
    var view = service.create(
      new ManualFlashcardInput(
        "",
        " Pergunta própria ",
        " Resposta própria ",
        null,
        null,
        null
      )
    );
    assertEquals("MANUAL", view.origin());
    assertEquals("Cartão pessoal", view.source());
    assertEquals("Pergunta própria", view.question());
    assertEquals("Resposta própria", view.answer());
    assertNull(view.disciplineId());
    assertFalse(view.due().isAfter(Instant.now()));
    assertEquals(4, view.nextReviews().size());
    var captor = ArgumentCaptor.forClass(ManualFlashcard.class);
    verify(repository).save(captor.capture());
    ManualFlashcard card = captor.getValue();
    when(repository.findLockedById(1L)).thenReturn(Optional.of(card));
    return card;
  }

  @Test
  void createsIndependentCardAndRestoresItsReviewAfterReload() {
    ManualFlashcard card = createCard();
    var reviewed = service.review(1L, Rating.GOOD, 0L);
    assertEquals(1, reviewed.revision());
    assertNotNull(card.flashcardState);
    assertNotNull(card.flashcardHistory);
    var reloaded = new ManualFlashcardService(
      repository,
      disciplines,
      topics,
      scheduling,
      assets
    );
    assertThrows(ResponseStatusException.class, () ->
      reloaded.review(1L, Rating.GOOD, 0L)
    );
    assertThrows(IllegalArgumentException.class, () ->
      reloaded.review(1L, Rating.GOOD, 1L)
    );
    var undone = reloaded.undo(1L, 1L);
    assertEquals(2, undone.revision());
    assertNull(card.flashcardState);
    assertNull(card.flashcardHistory);
    assertThrows(ResponseStatusException.class, () -> reloaded.undo(1L, 2L));
  }

  @Test
  void editsContentWithoutResettingScheduleAndRejectsStaleEditors() {
    ManualFlashcard card = createCard();
    service.review(1L, Rating.EASY, 0L);
    String previousState = card.flashcardState;
    var edited = service.update(
      1L,
      new ManualFlashcardInput(
        "Novo título",
        "Nova pergunta",
        "Nova resposta",
        null,
        null,
        1L
      )
    );
    assertEquals("Nova resposta", edited.answer());
    assertEquals(previousState, card.flashcardState);
    assertEquals(2, edited.revision());
    assertNull(card.flashcardUndoState);
    assertThrows(ResponseStatusException.class, () ->
      service.update(
        1L,
        new ManualFlashcardInput(
          "",
          "Outra pergunta",
          "Resposta",
          null,
          null,
          1L
        )
      )
    );
    assertThrows(ResponseStatusException.class, () -> service.undo(1L, 2L));
  }

  @Test
  void validatesRequiredContentAndSubjectDiscipline() {
    assertThrows(IllegalArgumentException.class, () ->
      service.create(
        new ManualFlashcardInput("", " ", "Resposta", null, null, null)
      )
    );
    assertThrows(IllegalArgumentException.class, () ->
      service.create(
        new ManualFlashcardInput("", "Pergunta", " ", null, null, null)
      )
    );
    assertThrows(IllegalArgumentException.class, () ->
      service.create(
        new ManualFlashcardInput(
          "",
          "x".repeat(20001),
          "Resposta",
          null,
          null,
          null
        )
      )
    );
    Discipline selected = new Discipline("Java", "#3282B8", 0);
    selected.id = 1L;
    Discipline other = new Discipline("Português", "#3282B8", 1);
    other.id = 2L;
    Topic topic = new Topic(other, "Gramática");
    topic.id = 8L;
    when(disciplines.findById(1L)).thenReturn(Optional.of(selected));
    when(topics.findById(8L)).thenReturn(Optional.of(topic));
    assertThrows(IllegalArgumentException.class, () ->
      service.create(
        new ManualFlashcardInput("", "Pergunta", "Resposta", 1L, 8L, null)
      )
    );
    verify(repository, never()).save(any());
    var view = service.create(
      new ManualFlashcardInput("", "Pergunta", "Resposta", null, 8L, null)
    );
    assertEquals(2L, view.disciplineId());
    assertEquals(8L, view.topicId());
  }

  @Test
  void combinesBothOriginsEvenWhenTheirDatabaseIdsMatch() {
    ManualFlashcard manual = createCard();
    when(repository.findAll()).thenReturn(List.of(manual));
    var errors = mock(ErrorNoteRepository.class);
    ErrorNote note = new ErrorNote();
    note.id = 1L;
    note.source = "Erro da prova";
    note.trap = "Pergunta do erro";
    note.correctAnswer = "Resposta do erro";
    note.topic = new Topic(new Discipline("Java", "#3282B8", 0), "Transações");
    when(errors.findAll()).thenReturn(List.of(note));
    var cards = new FlashcardService(errors, scheduling, service).list();
    assertEquals(2, cards.size());
    assertEquals(
      2,
      cards
        .stream()
        .map(card -> card.origin() + ":" + card.id())
        .distinct()
        .count()
    );
    service.delete(1L);
    verify(repository).delete(manual);
    verify(errors, never()).delete(any());
    verify(errors, never()).save(any());
  }

  @Test
  void storesImagesOnBothSidesAndPreservesSchedulingWhenEditingAttachments() {
    var created = service.create(
      new ManualFlashcardInput(
        "Prints",
        "",
        "",
        null,
        null,
        null,
        "question-image",
        "answer-image"
      )
    );
    assertEquals("question-image", created.questionImageId());
    assertEquals("answer-image", created.answerImageId());
    assertEquals("", created.question());
    verify(assets).ensureImage("question-image");
    verify(assets).ensureImage("answer-image");
    var captor = ArgumentCaptor.forClass(ManualFlashcard.class);
    verify(repository).save(captor.capture());
    ManualFlashcard card = captor.getValue();
    when(repository.findLockedById(1L)).thenReturn(Optional.of(card));
    service.review(1L, Rating.GOOD, 0L);
    String previousSchedule = card.flashcardState;
    var edited = service.update(
      1L,
      new ManualFlashcardInput(
        "Prints",
        "Pergunta digitada",
        "",
        null,
        null,
        1L,
        null,
        "answer-image"
      )
    );
    assertNull(edited.questionImageId());
    assertEquals("answer-image", edited.answerImageId());
    assertEquals(previousSchedule, card.flashcardState);
    assertEquals(2, edited.revision());
    when(repository.findAll()).thenReturn(List.of(card));
    assertEquals(
      "answer-image",
      service.list(Instant.now()).getFirst().answerImageId()
    );
  }

  @Test
  void rejectsNonImageAttachmentsAndEmptySidesBeforeSaving() {
    doThrow(new IllegalArgumentException("Arquivo não é imagem"))
      .when(assets)
      .ensureImage("pdf-file");
    assertThrows(IllegalArgumentException.class, () ->
      service.create(
        new ManualFlashcardInput(
          "",
          "Pergunta",
          "Resposta",
          null,
          null,
          null,
          "pdf-file",
          null
        )
      )
    );
    assertThrows(IllegalArgumentException.class, () ->
      service.create(
        new ManualFlashcardInput(
          "",
          "",
          "Resposta",
          null,
          null,
          null,
          null,
          "answer-image"
        )
      )
    );
    verify(repository, never()).save(any());
  }
}
