package br.com.concursoti.flashcards.services;

import br.com.concursoti.flashcards.entities.FlashcardSchedule;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import io.github.openspacedrepetition.Card;
import io.github.openspacedrepetition.Rating;
import io.github.openspacedrepetition.Scheduler;
import java.time.Instant;
import java.util.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class FlashcardSchedulingService {

  private final ObjectMapper objectMapper;
  private final Scheduler scheduler = Scheduler.builder()
    .desiredRetention(0.9)
    .enableFuzzing(false)
    .build();

  public FlashcardSchedulingService(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  public record UndoSnapshot(String state, String history) {}

  public void review(
    FlashcardSchedule schedule,
    Long id,
    Rating rating,
    Long expectedRevision
  ) {
    if (rating == null || expectedRevision == null) {
      throw new IllegalArgumentException(
        "Escolha uma avaliação válida para o cartão."
      );
    }
    if (schedule.flashcardRevision != expectedRevision) {
      throw new ResponseStatusException(
        HttpStatus.CONFLICT,
        "Este cartão já foi revisado. Atualize a fila."
      );
    }
    Instant now = Instant.now();
    Card card = restore(schedule, id, now);
    if (card.getDue().isAfter(now)) {
      throw new IllegalArgumentException(
        "Aguarde o próximo horário de revisão deste cartão."
      );
    }
    try {
      schedule.flashcardUndoState = objectMapper.writeValueAsString(
        new UndoSnapshot(schedule.flashcardState, schedule.flashcardHistory)
      );
    } catch (com.fasterxml.jackson.core.JsonProcessingException exception) {
      throw new IllegalStateException(
        "Não foi possível preparar a avaliação para desfazer.",
        exception
      );
    }
    var result = scheduler.reviewCard(card, rating, now);
    schedule.flashcardState = result.card().toJson();
    schedule.flashcardRevision++;
    try {
      ArrayNode history =
        schedule.flashcardHistory == null
          ? objectMapper.createArrayNode()
          : (ArrayNode) objectMapper.readTree(schedule.flashcardHistory);
      history.add(objectMapper.readTree(result.reviewLog().toJson()));
      schedule.flashcardHistory = objectMapper.writeValueAsString(history);
    } catch (com.fasterxml.jackson.core.JsonProcessingException exception) {
      throw new IllegalStateException(
        "Não foi possível salvar o histórico de revisão.",
        exception
      );
    }
  }

  public void undo(FlashcardSchedule schedule, Long expectedRevision) {
    if (
      expectedRevision == null ||
      schedule.flashcardUndoState == null ||
      schedule.flashcardRevision != expectedRevision
    ) {
      throw new ResponseStatusException(
        HttpStatus.CONFLICT,
        "Esta avaliação não pode mais ser desfeita. Atualize a fila."
      );
    }
    try {
      UndoSnapshot previous = objectMapper.readValue(
        schedule.flashcardUndoState,
        UndoSnapshot.class
      );
      schedule.flashcardState = previous.state();
      schedule.flashcardHistory = previous.history();
    } catch (com.fasterxml.jackson.core.JsonProcessingException exception) {
      throw new IllegalStateException(
        "Não foi possível restaurar a avaliação anterior.",
        exception
      );
    }
    schedule.flashcardUndoState = null;
    schedule.flashcardRevision++;
  }

  public Card restore(FlashcardSchedule schedule, Long id, Instant now) {
    return schedule.flashcardState == null
      ? Card.builder().cardId(Objects.hashCode(id)).due(now).build()
      : Card.fromJson(schedule.flashcardState);
  }

  public Map<String, Instant> nextReviews(Card card, Instant now) {
    Map<String, Instant> nextReviews = new LinkedHashMap<>();
    for (Rating rating : Rating.values()) {
      nextReviews.put(
        rating.name(),
        scheduler.reviewCard(card, rating, now).card().getDue()
      );
    }
    return nextReviews;
  }
}
