package br.com.concursoti.flashcards.dto;

import java.time.Instant;
import java.util.Map;

public record FlashcardView(
  Long id,
  String origin,
  String source,
  String topic,
  Long topicId,
  String discipline,
  Long disciplineId,
  String question,
  String answer,
  String questionImageId,
  String answerImageId,
  Instant due,
  long revision,
  Map<String, Instant> nextReviews
) {}
