package br.com.concursoti.flashcards.services;

import br.com.concursoti.assets.services.AssetService;
import br.com.concursoti.curriculum.repositories.DisciplineRepository;
import br.com.concursoti.curriculum.repositories.TopicRepository;
import br.com.concursoti.flashcards.dto.FlashcardView;
import br.com.concursoti.flashcards.dto.ManualFlashcardInput;
import br.com.concursoti.flashcards.entities.ManualFlashcard;
import br.com.concursoti.flashcards.repositories.ManualFlashcardRepository;
import io.github.openspacedrepetition.Rating;
import jakarta.transaction.Transactional;
import java.time.Instant;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ManualFlashcardService {

  private final ManualFlashcardRepository repository;
  private final DisciplineRepository disciplines;
  private final TopicRepository topics;
  private final FlashcardSchedulingService scheduling;
  private final AssetService assets;

  public ManualFlashcardService(
    ManualFlashcardRepository repository,
    DisciplineRepository disciplines,
    TopicRepository topics,
    FlashcardSchedulingService scheduling,
    AssetService assets
  ) {
    this.repository = repository;
    this.disciplines = disciplines;
    this.topics = topics;
    this.scheduling = scheduling;
    this.assets = assets;
  }

  public List<FlashcardView> list(Instant now) {
    return repository
      .findAll()
      .stream()
      .map(card -> view(card, now))
      .toList();
  }

  @Transactional
  public FlashcardView create(ManualFlashcardInput input) {
    ManualFlashcard card = new ManualFlashcard();
    applyInput(card, input);
    card.createdAt = Instant.now();
    return view(repository.save(card), card.createdAt);
  }

  @Transactional
  public FlashcardView update(Long id, ManualFlashcardInput input) {
    ManualFlashcard card = findLocked(id);
    if (
      input == null ||
      input.expectedRevision() == null ||
      card.flashcardRevision != input.expectedRevision()
    ) {
      throw new ResponseStatusException(
        HttpStatus.CONFLICT,
        "O cartão mudou. Atualize antes de editar."
      );
    }
    applyInput(card, input);
    card.flashcardUndoState = null;
    card.flashcardRevision++;
    return view(repository.save(card), Instant.now());
  }

  @Transactional
  public void delete(Long id) {
    repository.delete(findLocked(id));
  }

  @Transactional
  public FlashcardView review(Long id, Rating rating, Long expectedRevision) {
    ManualFlashcard card = findLocked(id);
    scheduling.review(card, id, rating, expectedRevision);
    return view(repository.save(card), Instant.now());
  }

  @Transactional
  public FlashcardView undo(Long id, Long expectedRevision) {
    ManualFlashcard card = findLocked(id);
    scheduling.undo(card, expectedRevision);
    return view(repository.save(card), Instant.now());
  }

  private ManualFlashcard findLocked(Long id) {
    return repository
      .findLockedById(id)
      .orElseThrow(() ->
        new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "Cartão não encontrado."
        )
      );
  }

  private void applyInput(ManualFlashcard card, ManualFlashcardInput input) {
    if (input == null) throw new IllegalArgumentException(
      "Informe a pergunta e a resposta."
    );
    card.title =
      input.title() == null || input.title().isBlank()
        ? "Cartão pessoal"
        : requiredText(input.title(), "Título", 220);
    card.questionImageId = imageId(input.questionImageId());
    card.answerImageId = imageId(input.answerImageId());
    card.question = sideContent(
      input.question(),
      card.questionImageId,
      "Pergunta"
    );
    card.answer = sideContent(input.answer(), card.answerImageId, "Resposta");
    card.discipline =
      input.disciplineId() == null
        ? null
        : disciplines
            .findById(input.disciplineId())
            .orElseThrow(() ->
              new IllegalArgumentException("Disciplina não encontrada.")
            );
    card.topic =
      input.topicId() == null
        ? null
        : topics
            .findById(input.topicId())
            .orElseThrow(() ->
              new IllegalArgumentException("Assunto não encontrado.")
            );
    if (card.topic != null) {
      if (
        card.discipline != null &&
        !card.discipline.id.equals(card.topic.discipline.id)
      ) {
        throw new IllegalArgumentException(
          "O assunto deve pertencer à disciplina escolhida."
        );
      }
      card.discipline = card.topic.discipline;
    }
  }

  private String imageId(String value) {
    if (value == null || value.isBlank()) return null;
    String id = value.trim();
    if (id.length() > 36) throw new IllegalArgumentException(
      "Identificador de imagem inválido."
    );
    assets.ensureImage(id);
    return id;
  }

  private String sideContent(String text, String imageId, String label) {
    String content = text == null ? "" : text.trim();
    if (content.length() > 20000) throw new IllegalArgumentException(
      label + " excede 20000 caracteres."
    );
    if (
      content.isEmpty() && imageId == null
    ) throw new IllegalArgumentException(
      label + " precisa de texto ou imagem."
    );
    return content;
  }

  private String requiredText(String text, String label, int limit) {
    if (text == null || text.isBlank() || text.trim().length() > limit) {
      throw new IllegalArgumentException(
        label + " deve conter de 1 a " + limit + " caracteres."
      );
    }
    return text.trim();
  }

  private FlashcardView view(ManualFlashcard card, Instant now) {
    var state = scheduling.restore(card, card.id, now);
    return new FlashcardView(
      card.id,
      "MANUAL",
      card.title,
      card.topic == null ? "Estudo geral" : card.topic.title,
      card.topic == null ? null : card.topic.id,
      card.discipline == null ? "Sem disciplina" : card.discipline.name,
      card.discipline == null ? null : card.discipline.id,
      card.question,
      card.answer,
      card.questionImageId,
      card.answerImageId,
      state.getDue(),
      card.flashcardRevision,
      scheduling.nextReviews(state, now)
    );
  }
}
