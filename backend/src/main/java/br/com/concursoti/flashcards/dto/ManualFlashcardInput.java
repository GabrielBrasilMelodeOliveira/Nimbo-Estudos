package br.com.concursoti.flashcards.dto;

public record ManualFlashcardInput(
  String title,
  String question,
  String answer,
  Long disciplineId,
  Long topicId,
  Long expectedRevision
) {}
