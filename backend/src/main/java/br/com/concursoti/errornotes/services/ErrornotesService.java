package br.com.concursoti.errornotes.services;

import br.com.concursoti.assets.services.AssetService;
import br.com.concursoti.curriculum.entities.Topic;
import br.com.concursoti.curriculum.repositories.TopicRepository;
import br.com.concursoti.errornotes.entities.ErrorNote;
import br.com.concursoti.errornotes.repositories.ErrorNoteRepository;
import java.time.LocalDate;
import java.util.*;
import org.springframework.data.domain.Sort;

@org.springframework.stereotype.Service
public class ErrornotesService {

  private final TopicRepository topics;
  private final ErrorNoteRepository errors;
  private final AssetService assets;

  public ErrornotesService(
    TopicRepository topics,
    ErrorNoteRepository errors,
    AssetService assets
  ) {
    this.topics = topics;
    this.errors = errors;
    this.assets = assets;
  }

  private String required(String value, String field, int max) {
    if (value == null || value.isBlank()) throw new IllegalArgumentException(
      "Preencha o campo: " + field
    );
    if (value.trim().length() > max) throw new IllegalArgumentException(
      field + " excede " + max + " caracteres."
    );
    return value.trim();
  }

  private Topic topic(Long id) {
    if (id == null) throw new IllegalArgumentException("Informe um assunto.");
    return topics.findById(id).orElseThrow();
  }

  public record ErrorInput(
    Long topicId,
    String source,
    String trap,
    String correctAnswer,
    Boolean recurring,
    String questionImageId,
    String answerImageId
  ) {}

  public List<ErrorNote> errorNotes() {
    return errors.findAll(Sort.by(Sort.Direction.DESC, "createdAt", "id"));
  }

  public ErrorNote addError(ErrorInput request) {
    ErrorNote e = new ErrorNote();
    e.topic = topic(request.topicId());
    e.source = required(request.source(), "Fonte da questão", 220);
    e.trap = required(request.trap(), "Pegadinha", 20000);
    e.correctAnswer = required(
      request.correctAnswer(),
      "Explicação correta",
      20000
    );
    if (request.questionImageId() != null) {
      assets.ensureImage(request.questionImageId());
      e.questionImageId = request.questionImageId();
    }
    if (request.answerImageId() != null) {
      assets.ensureImage(request.answerImageId());
      e.answerImageId = request.answerImageId();
    }
    e.recurring = Boolean.TRUE.equals(request.recurring());
    e.createdAt = LocalDate.now();
    return errors.save(e);
  }

  public void deleteError(Long id) {
    errors.delete(errors.findById(id).orElseThrow());
  }
}
