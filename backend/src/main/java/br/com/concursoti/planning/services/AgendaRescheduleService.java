package br.com.concursoti.planning.services;

import br.com.concursoti.planning.entities.AgendaItem;
import br.com.concursoti.planning.repositories.AgendaItemRepository;
import br.com.concursoti.questions.repositories.QuestionRecordRepository;
import br.com.concursoti.studying.entities.StudySession;
import br.com.concursoti.studying.repositories.StudySessionRepository;
import java.time.*;
import java.util.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AgendaRescheduleService {

  private final AgendaItemRepository agendaRepository;
  private final StudySessionRepository sessionRepository;
  private final QuestionRecordRepository questionRepository;
  private final Clock clock;

  public AgendaRescheduleService(
    AgendaItemRepository agendaRepository,
    StudySessionRepository sessionRepository,
    QuestionRecordRepository questionRepository,
    Clock clock
  ) {
    this.agendaRepository = agendaRepository;
    this.sessionRepository = sessionRepository;
    this.questionRepository = questionRepository;
    this.clock = clock;
  }

  public record ActivityInput(Long id, Long expectedVersion) {}

  public record RescheduleInput(
    LocalDate scheduledDate,
    List<ActivityInput> items
  ) {}

  @Transactional
  public List<AgendaItem> reschedule(RescheduleInput input) {
    if (
      input == null ||
      input.scheduledDate() == null ||
      input.scheduledDate().isBefore(LocalDate.now(clock)) ||
      input.items() == null ||
      input.items().isEmpty() ||
      input.items().size() > 100 ||
      input
        .items()
        .stream()
        .anyMatch(
          item ->
            item == null || item.id() == null || item.expectedVersion() == null
        )
    ) {
      throw new IllegalArgumentException(
        "Selecione até 100 pendências e uma data a partir de hoje."
      );
    }
    Set<Long> selectedIds = new HashSet<>();
    List<AgendaItem> selected = new ArrayList<>();
    for (ActivityInput requested : input
      .items()
      .stream()
      .sorted(Comparator.comparing(ActivityInput::id))
      .toList()) {
      if (!selectedIds.add(requested.id())) throw new IllegalArgumentException(
        "Atividade repetida na seleção."
      );
      AgendaItem item = agendaRepository
        .findLockedById(requested.id())
        .orElseThrow(() ->
          conflict("Uma atividade foi removida. Atualize o resumo.")
        );
      if (item.version != requested.expectedVersion()) throw conflict(
        "Uma atividade mudou. Atualize o resumo antes de reagendar."
      );
      if (
        !input.scheduledDate().isAfter(item.scheduledDate)
      ) throw new IllegalArgumentException(
        "O reagendamento deve ser para um dia posterior ao original."
      );
      if (isCompleted(item)) throw conflict(
        "Uma atividade já foi concluída. Atualize o resumo."
      );
      selected.add(item);
    }
    Set<String> destinationStudies = new HashSet<>();
    agendaRepository
      .findAll()
      .stream()
      .filter(
        item ->
          !selectedIds.contains(item.id) &&
          input.scheduledDate().equals(item.scheduledDate)
      )
      .map(this::studyKey)
      .filter(Objects::nonNull)
      .forEach(destinationStudies::add);
    for (AgendaItem item : selected) {
      String key = studyKey(item);
      if (key != null && !destinationStudies.add(key)) throw conflict(
        "Já existe um bloco deste assunto e tipo no destino. Escolha outro dia ou reagende separadamente."
      );
    }
    selected.forEach(item -> item.scheduledDate = input.scheduledDate());
    return agendaRepository.saveAll(selected);
  }

  private String studyKey(AgendaItem item) {
    return item.category == AgendaItem.Category.STUDY && item.topic != null
      ? item.topic.id + ":" + item.studyKind
      : null;
  }

  private boolean isCompleted(AgendaItem item) {
    if (item.completionOverride != null) return item.completionOverride;
    if (Boolean.TRUE.equals(item.completed)) return true;
    if (
      studyKey(item) == null ||
      item.durationMinutes == null ||
      item.durationMinutes <= 0
    ) return false;
    StudySession.Kind kind =
      item.studyKind == null ? StudySession.Kind.THEORY : item.studyKind;
    long seconds = sessionRepository
      .findByStudyDateBetween(item.scheduledDate, item.scheduledDate)
      .stream()
      .filter(
        session ->
          session.topic != null &&
          session.topic.id.equals(item.topic.id) &&
          session.effectiveKind() == kind
      )
      .mapToLong(session -> session.durationSeconds)
      .sum();
    int questions =
      kind == StudySession.Kind.QUESTIONS
        ? questionRepository
            .findByDateBetween(item.scheduledDate, item.scheduledDate)
            .stream()
            .filter(question -> question.topic.id.equals(item.topic.id))
            .mapToInt(question -> question.total)
            .sum()
        : 0;
    return (
      seconds >= item.durationMinutes * 60L &&
      (kind != StudySession.Kind.QUESTIONS ||
        item.targetQuestions == null ||
        questions >= item.targetQuestions)
    );
  }

  private ResponseStatusException conflict(String message) {
    return new ResponseStatusException(HttpStatus.CONFLICT, message);
  }
}
