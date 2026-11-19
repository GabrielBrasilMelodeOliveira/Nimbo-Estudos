package br.com.concursoti.questions.services;

import br.com.concursoti.companions.services.PetService;
import br.com.concursoti.curriculum.entities.Discipline;
import br.com.concursoti.curriculum.entities.Topic;
import br.com.concursoti.curriculum.repositories.DisciplineRepository;
import br.com.concursoti.curriculum.repositories.TopicRepository;
import br.com.concursoti.questions.entities.QuestionRecord;
import br.com.concursoti.questions.repositories.QuestionRecordRepository;
import br.com.concursoti.studying.entities.StudySession;
import br.com.concursoti.studying.repositories.StudySessionRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.*;
import org.springframework.data.domain.Sort;

@org.springframework.stereotype.Service
public class QuestionsService {

  private final DisciplineRepository disciplines;
  private final TopicRepository topics;
  private final QuestionRecordRepository questions;
  private final StudySessionRepository sessions;
  private final PetService pet;

  public QuestionsService(
    DisciplineRepository disciplines,
    TopicRepository topics,
    QuestionRecordRepository questions,
    StudySessionRepository sessions,
    PetService pet
  ) {
    this.disciplines = disciplines;
    this.topics = topics;
    this.questions = questions;
    this.sessions = sessions;
    this.pet = pet;
  }

  private void countPair(Integer total, Integer correct) {
    if (
      total == null ||
      total <= 0 ||
      correct == null ||
      correct < 0 ||
      correct > total
    ) throw new IllegalArgumentException(
      "Total deve ser positivo e acertos devem estar entre 0 e o total."
    );
  }

  private LocalDate dateOrToday(LocalDate date) {
    return date == null ? LocalDate.now() : date;
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

  public record QuestionInput(
    Long topicId,
    Integer total,
    Integer correct,
    LocalDate date,
    String notes,
    Long durationSeconds
  ) {}

  public List<QuestionRecord> questions() {
    return questions.findAll(Sort.by(Sort.Direction.DESC, "date", "id"));
  }

  @Transactional
  public QuestionRecord addQuestions(QuestionInput request) {
    countPair(request.total(), request.correct());
    long duration =
      request.durationSeconds() == null ? 0 : request.durationSeconds();
    if (duration < 0 || duration > 86400) throw new IllegalArgumentException(
      "O tempo deve estar entre zero e 24 horas."
    );
    Topic selected = topic(request.topicId());
    QuestionRecord q = new QuestionRecord();
    q.topic = selected;
    q.total = request.total();
    q.correct = request.correct();
    q.date = dateOrToday(request.date());
    q.notes = request.notes() == null ? "" : request.notes().trim();
    q.focusDurationSeconds = duration > 0 ? duration : null;
    QuestionRecord saved = questions.save(q);
    if (duration > 0) {
      StudySession focus = new StudySession();
      focus.topic = selected;
      focus.discipline = selected.discipline;
      focus.kind = StudySession.Kind.QUESTIONS;
      focus.durationSeconds = duration;
      focus.studyDate = q.date;
      sessions.save(focus);
      pet.awardExperience((int) Math.min(120, duration / 60));
    }
    pet.awardExperience(Math.min(120, request.correct() * 3));
    return saved;
  }

  public void deleteQuestions(Long id) {
    questions.delete(questions.findById(id).orElseThrow());
  }
}
