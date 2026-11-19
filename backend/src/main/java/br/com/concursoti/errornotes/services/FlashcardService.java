package br.com.concursoti.errornotes.services;

import br.com.concursoti.errornotes.entities.ErrorNote;
import br.com.concursoti.errornotes.repositories.ErrorNoteRepository;
import br.com.concursoti.flashcards.dto.FlashcardView;
import br.com.concursoti.flashcards.services.FlashcardSchedulingService;
import br.com.concursoti.flashcards.services.ManualFlashcardService;
import io.github.openspacedrepetition.Rating;
import jakarta.transaction.Transactional;
import java.time.Instant;
import java.util.*;
import java.util.stream.Stream;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class FlashcardService {

  private final ErrorNoteRepository errorNoteRepository;
  private final FlashcardSchedulingService scheduling;
  private final ManualFlashcardService manualCards;

  public FlashcardService(
    ErrorNoteRepository errorNoteRepository,
    FlashcardSchedulingService scheduling,
    ManualFlashcardService manualCards
  ) {
    this.errorNoteRepository = errorNoteRepository;
    this.scheduling = scheduling;
    this.manualCards = manualCards;
  }

  public record ReviewInput(Rating rating, Long expectedRevision) {}

  public record UndoInput(Long expectedRevision) {}

  public record LinkInput(Boolean enabled) {}

  public List<FlashcardView> list() {
    Instant now = Instant.now();
    var linkedCards = errorNoteRepository
      .findAll()
      .stream()
      .filter(note -> note.flashcardEnabled)
      .map(note -> view(note, now));
    return Stream.concat(linkedCards, manualCards.list(now).stream())
      .sorted(
        Comparator.comparing(FlashcardView::due)
          .thenComparing(FlashcardView::origin)
          .thenComparing(FlashcardView::id)
      )
      .toList();
  }

  @Transactional
  public FlashcardView review(Long id, ReviewInput request) {
    ErrorNote note = findEnabled(id);
    scheduling.review(
      note,
      id,
      request == null ? null : request.rating(),
      request == null ? null : request.expectedRevision()
    );
    errorNoteRepository.save(note);
    return view(note, Instant.now());
  }

  @Transactional
  public FlashcardView undo(Long id, UndoInput input) {
    ErrorNote note = findEnabled(id);
    scheduling.undo(note, input == null ? null : input.expectedRevision());
    errorNoteRepository.save(note);
    return view(note, Instant.now());
  }

  private ErrorNote findEnabled(Long id) {
    ErrorNote note = errorNoteRepository
      .findLockedById(id)
      .orElseThrow(() ->
        new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "Erro não encontrado."
        )
      );
    if (!note.flashcardEnabled) throw new ResponseStatusException(
      HttpStatus.CONFLICT,
      "Este erro não está vinculado aos flashcards."
    );
    return note;
  }

  @Transactional
  public void setLinked(Long id, LinkInput request) {
    if (request == null || request.enabled() == null) {
      throw new IllegalArgumentException(
        "Informe se o erro deve ser vinculado."
      );
    }
    ErrorNote errorNote = errorNoteRepository
      .findLockedById(id)
      .orElseThrow(() ->
        new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "Erro não encontrado."
        )
      );
    if (errorNote.flashcardEnabled != request.enabled()) {
      errorNote.flashcardEnabled = request.enabled();
      errorNote.flashcardUndoState = null;
      errorNote.flashcardRevision++;
      errorNoteRepository.save(errorNote);
    }
  }

  private FlashcardView view(ErrorNote note, Instant now) {
    var card = scheduling.restore(note, note.id, now);
    return new FlashcardView(
      note.id,
      "ERROR_NOTE",
      note.source,
      note.topic.title,
      note.topic.id,
      note.topic.discipline.name,
      note.topic.discipline.id,
      note.trap,
      note.correctAnswer,
      note.questionImageId,
      note.answerImageId,
      card.getDue(),
      note.flashcardRevision,
      scheduling.nextReviews(card, now)
    );
  }
}
