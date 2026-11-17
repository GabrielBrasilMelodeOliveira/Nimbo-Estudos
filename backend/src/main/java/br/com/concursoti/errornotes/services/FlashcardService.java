package br.com.concursoti.errornotes.services;

import br.com.concursoti.errornotes.entities.ErrorNote;
import br.com.concursoti.errornotes.repositories.ErrorNoteRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import io.github.openspacedrepetition.Card;
import io.github.openspacedrepetition.Rating;
import io.github.openspacedrepetition.Scheduler;
import jakarta.transaction.Transactional;
import java.time.Instant;
import java.util.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class FlashcardService {

  private final ErrorNoteRepository errorNoteRepository;
  private final ObjectMapper objectMapper;
  // Deterministic intervals keep the answer-button preview equal to the stored schedule.
  private final Scheduler scheduler = Scheduler.builder()
    .desiredRetention(0.9)
    .enableFuzzing(false)
    .build();

  public FlashcardService(
    ErrorNoteRepository errorNoteRepository,
    ObjectMapper objectMapper
  ) {
    this.errorNoteRepository = errorNoteRepository;
    this.objectMapper = objectMapper;
  }

  public record FlashcardView(
    Long id,
    String source,
    String topic,
    String discipline,
    String question,
    String answer,
    String questionImageId,
    String answerImageId,
    Instant due,
    long revision,
    Map<String, Instant> nextReviews
  ) {}

  public record ReviewInput(Rating rating, Long expectedRevision) {}

  public List<FlashcardView> list() {
    Instant now = Instant.now();
    return errorNoteRepository
      .findAll()
      .stream()
      .map(errorNote -> view(errorNote, now))
      .sorted(
        Comparator.comparing(FlashcardView::due).thenComparing(
          FlashcardView::id
        )
      )
      .toList();
  }

  @Transactional
  public FlashcardView review(Long id, ReviewInput request) {
    if (
      request == null ||
      request.rating() == null ||
      request.expectedRevision() == null
    ) {
      throw new IllegalArgumentException(
        "Escolha uma avaliação válida para o cartão."
      );
    }
    ErrorNote errorNote = errorNoteRepository.findLockedById(id).orElseThrow();
    if (errorNote.flashcardRevision != request.expectedRevision()) {
      throw new ResponseStatusException(
        HttpStatus.CONFLICT,
        "Este cartão já foi revisado. Atualize a fila."
      );
    }
    Instant now = Instant.now();
    Card card = restore(errorNote, now);
    if (card.getDue().isAfter(now)) {
      throw new IllegalArgumentException(
        "Aguarde o próximo horário de revisão deste cartão."
      );
    }
    var result = scheduler.reviewCard(card, request.rating(), now);
    errorNote.flashcardState = result.card().toJson();
    errorNote.flashcardRevision++;
    try {
      ArrayNode history =
        errorNote.flashcardHistory == null
          ? objectMapper.createArrayNode()
          : (ArrayNode) objectMapper.readTree(errorNote.flashcardHistory);
      history.add(objectMapper.readTree(result.reviewLog().toJson()));
      errorNote.flashcardHistory = objectMapper.writeValueAsString(history);
    } catch (com.fasterxml.jackson.core.JsonProcessingException exception) {
      throw new IllegalStateException(
        "Não foi possível salvar o histórico de revisão.",
        exception
      );
    }
    errorNoteRepository.save(errorNote);
    return view(errorNote, now);
  }

  private Card restore(ErrorNote errorNote, Instant now) {
    return errorNote.flashcardState == null
      ? Card.builder().cardId(Objects.hashCode(errorNote.id)).due(now).build()
      : Card.fromJson(errorNote.flashcardState);
  }

  private FlashcardView view(ErrorNote errorNote, Instant now) {
    Card card = restore(errorNote, now);
    Map<String, Instant> nextReviews = new LinkedHashMap<>();
    for (Rating rating : Rating.values()) {
      nextReviews.put(
        rating.name(),
        scheduler.reviewCard(card, rating, now).card().getDue()
      );
    }
    return new FlashcardView(
      errorNote.id,
      errorNote.source,
      errorNote.topic.title,
      errorNote.topic.discipline.name,
      errorNote.trap,
      errorNote.correctAnswer,
      errorNote.questionImageId,
      errorNote.answerImageId,
      card.getDue(),
      errorNote.flashcardRevision,
      nextReviews
    );
  }
}
