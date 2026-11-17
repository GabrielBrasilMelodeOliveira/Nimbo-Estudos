package br.com.concursoti.curriculum.services;

import br.com.concursoti.curriculum.entities.Discipline;
import br.com.concursoti.curriculum.entities.Topic;
import br.com.concursoti.curriculum.repositories.DisciplineRepository;
import br.com.concursoti.curriculum.repositories.TopicRepository;
import br.com.concursoti.errornotes.repositories.ErrorNoteRepository;
import br.com.concursoti.materials.entities.Material;
import br.com.concursoti.materials.repositories.MaterialRepository;
import br.com.concursoti.planning.entities.AgendaItem;
import br.com.concursoti.planning.repositories.AgendaItemRepository;
import br.com.concursoti.questions.repositories.QuestionRecordRepository;
import br.com.concursoti.reviews.entities.ReviewTask;
import br.com.concursoti.reviews.repositories.ReviewTaskRepository;
import br.com.concursoti.reviews.services.ReviewScheduler;
import br.com.concursoti.studying.repositories.StudySessionRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.*;
import org.springframework.data.domain.Sort;

@org.springframework.stereotype.Service
public class CurriculumService {

  private final DisciplineRepository disciplines;
  private final TopicRepository topics;
  private final QuestionRecordRepository questions;
  private final StudySessionRepository sessions;
  private final ReviewTaskRepository reviews;
  private final MaterialRepository materials;
  private final ErrorNoteRepository errors;
  private final ReviewScheduler reviewScheduler;
  private final AgendaItemRepository agenda;

  public CurriculumService(
    DisciplineRepository disciplines,
    TopicRepository topics,
    QuestionRecordRepository questions,
    StudySessionRepository sessions,
    ReviewTaskRepository reviews,
    MaterialRepository materials,
    ErrorNoteRepository errors,
    ReviewScheduler reviewScheduler,
    AgendaItemRepository agenda
  ) {
    this.disciplines = disciplines;
    this.topics = topics;
    this.questions = questions;
    this.sessions = sessions;
    this.reviews = reviews;
    this.materials = materials;
    this.errors = errors;
    this.reviewScheduler = reviewScheduler;
    this.agenda = agenda;
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

  private Discipline discipline(Long id) {
    if (id == null) throw new IllegalArgumentException(
      "Informe uma disciplina."
    );
    return disciplines.findById(id).orElseThrow();
  }

  public record DisciplineInput(String name, String color) {}

  public record DisciplineTuning(
    Integer importance,
    Integer examWeight,
    Integer confidence
  ) {}

  private int rank(Integer value, String name) {
    if (
      value == null || value < 1 || value > 5
    ) throw new IllegalArgumentException(name + " deve ser entre 1 e 5.");
    return value;
  }

  public record TopicInput(
    Long disciplineId,
    String title,
    Topic.Status status,
    Boolean theoryDone,
    Boolean summaryDone,
    Topic.Mastery mastery,
    Integer importance,
    Integer assimilationLevel
  ) {}

  private void applyTopic(Topic t, TopicInput request) {
    t.discipline = discipline(request.disciplineId());
    t.title = required(request.title(), "Assunto", 200);
    t.status =
      request.status() == null ? Topic.Status.NOT_STARTED : request.status();
    t.theoryDone = Boolean.TRUE.equals(request.theoryDone());
    t.summaryDone = Boolean.TRUE.equals(request.summaryDone());
    t.mastery =
      request.mastery() == null ? Topic.Mastery.WEAK : request.mastery();
    t.importance =
      request.importance() == null
        ? 3
        : rank(request.importance(), "Prioridade do assunto");
    if (request.assimilationLevel() != null) t.assimilationLevel = rank4(
      request.assimilationLevel()
    );
  }

  private int rank4(Integer value) {
    if (
      value == null || value < 1 || value > 4
    ) throw new IllegalArgumentException("Assimilação entre 1 e 4.");
    return value;
  }

  private void scheduleReviews(Topic t) {
    LocalDate today = LocalDate.now();
    t.theoryCompletedAt = today;
    topics.save(t);
    reviewScheduler.assessTheory(
      t,
      t.assimilationLevel == null ? 2 : t.assimilationLevel
    );
  }

  public record AssimilationInput(Integer level) {}

  public List<Discipline> disciplines() {
    return disciplines.findAll(Sort.by("position", "id"));
  }

  public Discipline addDiscipline(DisciplineInput request) {
    String color =
      request.color() == null || !request.color().matches("^#[0-9a-fA-F]{6}$")
        ? "#2563eb"
        : request.color();
    return disciplines.save(
      new Discipline(
        required(request.name(), "Nome", 120),
        color,
        (int) disciplines.count()
      )
    );
  }

  public Discipline tuneDiscipline(Long id, DisciplineTuning request) {
    Discipline d = discipline(id);
    d.importance = rank(request.importance(), "Importância");
    d.examWeight = rank(request.examWeight(), "Peso na prova");
    d.confidence = rank(request.confidence(), "Entendimento");
    return disciplines.save(d);
  }

  public List<Discipline> reorderDisciplines(List<Long> order) {
    List<Discipline> all = disciplines.findAll();
    if (
      order == null ||
      order.size() != all.size() ||
      !new HashSet<>(order).equals(
        all
          .stream()
          .map(d -> d.id)
          .collect(java.util.stream.Collectors.toSet())
      )
    ) throw new IllegalArgumentException(
      "A ordem deve conter todas as disciplinas, sem repetição."
    );
    Map<Long, Discipline> byId = new HashMap<>();
    for (Discipline d : all) byId.put(d.id, d);
    for (int i = 0; i < order.size(); i++) byId.get(order.get(i)).position = i;
    disciplines.saveAll(all);
    return disciplines.findAll(Sort.by("position", "id"));
  }

  public List<Topic> topics() {
    return topics.findAll(Sort.by("id"));
  }

  public Topic addTopic(TopicInput request) {
    Topic t = new Topic();
    applyTopic(t, request);
    t = topics.save(t);
    if (t.theoryDone) scheduleReviews(t);
    return t;
  }

  @Transactional
  public Topic updateTopic(Long id, TopicInput request) {
    Topic t = topic(id);
    boolean wasDone = Boolean.TRUE.equals(t.theoryDone);
    Integer oldAssimilation = t.assimilationLevel;
    applyTopic(t, request);
    if (wasDone && !t.theoryDone) reviewScheduler.pause(t);
    if (!wasDone && t.theoryDone) scheduleReviews(t);
    else if (
      wasDone &&
      t.theoryDone &&
      request.assimilationLevel() != null &&
      !Objects.equals(oldAssimilation, request.assimilationLevel())
    ) reviewScheduler.assessTheory(t, request.assimilationLevel());
    return topics.save(t);
  }

  @Transactional
  public ReviewTask assessTopic(Long id, AssimilationInput request) {
    if (request == null) throw new IllegalArgumentException(
      "Escolha o nível de assimilação."
    );
    return reviewScheduler.assessTheory(topic(id), rank4(request.level()));
  }

  @Transactional
  public void deleteTopic(Long id) {
    Topic target = topic(id);
    for (AgendaItem item : agenda.findAll())
      if (item.topic != null && item.topic.id.equals(id)) {
        item.topic = null;
        item.studyKind = null;
        item.targetQuestions = null;
        agenda.save(item);
      }
    for (Material m : materials.findAll())
      if (m.topic != null && m.topic.id.equals(id)) {
        m.topic = null;
        materials.save(m);
      }
    errors.deleteAll(
      errors
        .findAll()
        .stream()
        .filter(e -> e.topic != null && e.topic.id.equals(id))
        .toList()
    );
    reviews.deleteAll(
      reviews
        .findAll()
        .stream()
        .filter(r -> r.topic.id.equals(id))
        .toList()
    );
    questions.deleteAll(
      questions
        .findAll()
        .stream()
        .filter(q -> q.topic.id.equals(id))
        .toList()
    );
    sessions.deleteAll(
      sessions
        .findAll()
        .stream()
        .filter(r -> r.topic != null && r.topic.id.equals(id))
        .toList()
    );
    topics.delete(target);
  }
}
