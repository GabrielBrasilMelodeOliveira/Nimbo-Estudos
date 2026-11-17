package br.com.concursoti.planning.controllers;

import br.com.concursoti.curriculum.entities.Topic;
import br.com.concursoti.curriculum.repositories.TopicRepository;
import br.com.concursoti.planning.entities.AgendaItem;
import br.com.concursoti.planning.entities.PeriodGoal;
import br.com.concursoti.planning.repositories.AgendaItemRepository;
import br.com.concursoti.planning.repositories.PeriodGoalRepository;
import br.com.concursoti.studying.entities.StudySession;
import jakarta.transaction.Transactional;
import java.time.*;
import java.util.*;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/agenda")
public class PlannerController {

  private final AgendaItemRepository repo;
  private final TopicRepository topics;
  private final PeriodGoalRepository goals;

  public PlannerController(
    AgendaItemRepository repo,
    TopicRepository topics,
    PeriodGoalRepository goals
  ) {
    this.repo = repo;
    this.topics = topics;
    this.goals = goals;
  }

  public record AgendaInput(
    String title,
    AgendaItem.Category category,
    LocalDate scheduledDate,
    LocalTime startTime,
    Integer durationMinutes,
    Integer priority,
    Boolean repeatWeekly,
    String notes,
    Long topicId,
    StudySession.Kind studyKind,
    Integer targetQuestions
  ) {}

  @GetMapping
  public List<AgendaItem> list() {
    return repo.findAll(Sort.by("scheduledDate", "startTime", "id"));
  }

  private AgendaItem fill(AgendaItem item, AgendaInput request) {
    if (
      request.title() == null ||
      request.title().isBlank() ||
      request.title().trim().length() > 180
    ) throw new IllegalArgumentException(
      "Informe uma atividade de até 180 caracteres."
    );
    if (request.scheduledDate() == null) throw new IllegalArgumentException(
      "Informe o dia da atividade."
    );
    if (
      request.durationMinutes() == null ||
      request.durationMinutes() < 0 ||
      request.durationMinutes() > 1440
    ) throw new IllegalArgumentException(
      "A duração deve estar entre 0 e 1440 minutos."
    );
    if (
      request.priority() == null ||
      request.priority() < 1 ||
      request.priority() > 3
    ) throw new IllegalArgumentException("A prioridade deve ser 1, 2 ou 3.");
    if (
      request.notes() != null && request.notes().length() > 1200
    ) throw new IllegalArgumentException("Notas limitadas a 1200 caracteres.");
    item.title = request.title().trim();
    item.category =
      request.category() == null
        ? AgendaItem.Category.PERSONAL
        : request.category();
    item.scheduledDate = request.scheduledDate();
    item.startTime = request.startTime();
    item.durationMinutes = request.durationMinutes();
    item.priority = request.priority();
    item.repeatWeekly = Boolean.TRUE.equals(request.repeatWeekly());
    item.notes = request.notes() == null ? "" : request.notes();
    if (
      item.category == AgendaItem.Category.STUDY && request.topicId() != null
    ) {
      Topic t = topics
        .findLockedById(request.topicId())
        .orElseThrow(() ->
          new IllegalArgumentException("Assunto não encontrado.")
        );
      item.topic = t;
      item.studyKind =
        request.studyKind() == null
          ? StudySession.Kind.THEORY
          : request.studyKind();
      if (
        request.targetQuestions() != null &&
        (request.targetQuestions() < 0 || request.targetQuestions() > 3000)
      ) throw new IllegalArgumentException("Meta de questões inválida.");
      item.targetQuestions =
        item.studyKind == StudySession.Kind.QUESTIONS
          ? request.targetQuestions() == null
            ? 0
            : request.targetQuestions()
          : 0;
      if (item.repeatWeekly) throw new IllegalArgumentException(
        "Blocos de estudo vinculados não devem se repetir automaticamente. Use as sugestões semanais."
      );
      // Impede que duas atividades contem o mesmo resultado de um assunto/tipo/dia.
      boolean duplicate = repo
        .findAll()
        .stream()
        .anyMatch(
          other ->
            !Objects.equals(other.id, item.id) &&
            other.topic != null &&
            Objects.equals(other.topic.id, t.id) &&
            item.scheduledDate.equals(other.scheduledDate) &&
            other.studyKind == item.studyKind
        );
      if (duplicate) throw new IllegalArgumentException(
        "Este assunto e tipo de estudo já estão planejados para o dia."
      );
    } else {
      item.topic = null;
      item.studyKind = null;
      item.targetQuestions = null;
    }
    return item;
  }

  @PostMapping
  @Transactional
  public AgendaItem add(@RequestBody AgendaInput input) {
    return repo.save(fill(new AgendaItem(), input));
  }

  @PutMapping("/{id}")
  @Transactional
  public AgendaItem change(
    @PathVariable Long id,
    @RequestBody AgendaInput input
  ) {
    return repo.save(fill(repo.findById(id).orElseThrow(), input));
  }

  @PatchMapping("/{id}/toggle")
  @Transactional
  public AgendaItem toggle(@PathVariable Long id) {
    AgendaItem item = repo.findById(id).orElseThrow();
    item.completed = !item.completed;
    item.completionOverride = item.completed;
    repo.save(item);
    if (item.completed && Boolean.TRUE.equals(item.repeatWeekly)) {
      LocalDate next = item.scheduledDate.plusWeeks(1);
      while (next.isBefore(LocalDate.now())) next = next.plusWeeks(1);
      final LocalDate finalNext = next;
      boolean exists = repo
        .findAll()
        .stream()
        .anyMatch(
          x ->
            !x.id.equals(item.id) &&
            x.repeatWeekly &&
            x.title.equals(item.title) &&
            x.category == item.category &&
            x.scheduledDate.equals(finalNext)
        );
      if (!exists) {
        AgendaItem copy = new AgendaItem();
        copy.title = item.title;
        copy.category = item.category;
        copy.scheduledDate = finalNext;
        copy.startTime = item.startTime;
        copy.durationMinutes = item.durationMinutes;
        copy.priority = item.priority;
        copy.repeatWeekly = true;
        copy.notes = item.notes;
        repo.save(copy);
      }
    }
    return item;
  }

  public record CompletionInput(Boolean completed, Long expectedVersion) {}

  @PatchMapping("/{id}/completion")
  @Transactional
  public AgendaItem complete(
    @PathVariable Long id,
    @RequestBody CompletionInput request
  ) {
    AgendaItem item = repo.findById(id).orElseThrow();
    if (request.completed() == null) throw new IllegalArgumentException(
      "Informe se a atividade foi concluída."
    );
    verifyVersion(item, request.expectedVersion());
    if (Objects.equals(item.completed, request.completed())) {
      item.completionOverride = request.completed();
      return repo.save(item);
    }
    return toggle(id);
  }

  public record MoveInput(LocalDate scheduledDate, Long expectedVersion) {}

  @PatchMapping("/{id}/move")
  @Transactional
  public AgendaItem move(
    @PathVariable Long id,
    @RequestBody MoveInput request
  ) {
    AgendaItem item = repo.findById(id).orElseThrow();
    verifyVersion(item, request.expectedVersion());
    if (request.scheduledDate() == null) throw new IllegalArgumentException(
      "Informe o dia de destino."
    );
    if (Boolean.TRUE.equals(item.completed)) throw new IllegalArgumentException(
      "Reabra a atividade antes de movê-la."
    );
    AgendaInput input = new AgendaInput(
      item.title,
      item.category,
      request.scheduledDate(),
      item.startTime,
      item.durationMinutes,
      item.priority,
      item.repeatWeekly,
      item.notes,
      item.topic == null ? null : item.topic.id,
      item.studyKind,
      item.targetQuestions
    );
    return repo.save(fill(item, input));
  }

  private void verifyVersion(AgendaItem item, Long expectedVersion) {
    if (expectedVersion == null || item.version != expectedVersion) {
      throw new org.springframework.web.server.ResponseStatusException(
        org.springframework.http.HttpStatus.CONFLICT,
        "A atividade mudou. Atualize a agenda e tente novamente."
      );
    }
  }

  @GetMapping("/goals")
  public List<PeriodGoal> goals() {
    return goals.findAll(Sort.by("periodStart", "periodType"));
  }

  public record GoalInput(
    PeriodGoal.PeriodType periodType,
    LocalDate periodStart,
    Integer targetMinutes,
    Integer targetQuestions,
    Integer targetTopics
  ) {}

  @PutMapping("/goals")
  @Transactional
  public PeriodGoal putGoal(@RequestBody GoalInput request) {
    if (
      request == null ||
      request.periodType() == null ||
      request.periodStart() == null
    ) throw new IllegalArgumentException("Informe o período da meta.");
    if (
      request.periodType() == PeriodGoal.PeriodType.WEEK &&
      request.periodStart().getDayOfWeek() != DayOfWeek.MONDAY
    ) throw new IllegalArgumentException(
      "Uma meta semanal deve começar na segunda-feira."
    );
    if (
      request.periodType() == PeriodGoal.PeriodType.MONTH &&
      request.periodStart().getDayOfMonth() != 1
    ) throw new IllegalArgumentException(
      "Uma meta mensal deve começar no primeiro dia do mês."
    );
    if (
      request.targetMinutes() == null ||
      request.targetMinutes() < 0 ||
      request.targetMinutes() > 44640 ||
      request.targetQuestions() == null ||
      request.targetQuestions() < 0 ||
      request.targetQuestions() > 100000 ||
      request.targetTopics() == null ||
      request.targetTopics() < 0 ||
      request.targetTopics() > 10000
    ) throw new IllegalArgumentException("Confira as metas informadas.");
    PeriodGoal goal = goals
      .findByPeriodTypeAndPeriodStart(
        request.periodType(),
        request.periodStart()
      )
      .orElseGet(PeriodGoal::new);
    goal.periodType = request.periodType();
    goal.periodStart = request.periodStart();
    goal.targetMinutes = request.targetMinutes();
    goal.targetQuestions = request.targetQuestions();
    goal.targetTopics = request.targetTopics();
    return goals.save(goal);
  }

  @DeleteMapping("/{id}")
  public void remove(@PathVariable Long id) {
    repo.deleteById(id);
  }
}
