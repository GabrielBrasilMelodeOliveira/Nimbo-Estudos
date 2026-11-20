package br.com.concursoti.flashcards.dto;

public record ManualFlashcardInput(
  String title,
  String question,
  String answer,
  Long disciplineId,
  Long topicId,
  Long expectedRevision,
  String questionImageId,
  String answerImageId
) {
  public ManualFlashcardInput(
    String title,
    String question,
    String answer,
    Long disciplineId,
    Long topicId,
    Long expectedRevision
  ) {
    this(
      title,
      question,
      answer,
      disciplineId,
      topicId,
      expectedRevision,
      null,
      null
    );
  }
}
