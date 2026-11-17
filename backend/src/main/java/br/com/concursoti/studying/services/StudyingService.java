package br.com.concursoti.studying.services;

import br.com.concursoti.companions.services.PetService;
import br.com.concursoti.curriculum.entities.Discipline;
import br.com.concursoti.curriculum.entities.Topic;
import br.com.concursoti.curriculum.repositories.DisciplineRepository;
import br.com.concursoti.curriculum.repositories.TopicRepository;
import br.com.concursoti.studying.entities.StudySession;
import br.com.concursoti.studying.repositories.StudySessionRepository;
import java.time.LocalDate;
import java.util.*;
import org.springframework.data.domain.Sort;

@org.springframework.stereotype.Service
public class StudyingService {

  private final DisciplineRepository disciplines;
  private final TopicRepository topics;
  private final StudySessionRepository sessions;
  private final PetService pet;

  public StudyingService(
    DisciplineRepository disciplines,
    TopicRepository topics,
    StudySessionRepository sessions,
    PetService pet
  ) {
    this.disciplines = disciplines;
    this.topics = topics;
    this.sessions = sessions;
    this.pet = pet;
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

  public record SessionInput(
    Long disciplineId,
    Long topicId,
    Long durationSeconds,
    LocalDate studyDate,
    StudySession.Kind kind
  ) {}

  public List<StudySession> sessions() {
    return sessions.findAll(
      Sort.by(Sort.Direction.DESC, "studyDate", "createdAt")
    );
  }

  public StudySession addSession(SessionInput request) {
    if (
      request.durationSeconds() == null ||
      request.durationSeconds() <= 0 ||
      request.durationSeconds() > 86400
    ) throw new IllegalArgumentException(
      "A sessão deve durar entre 1 segundo e 24 horas."
    );
    StudySession s = new StudySession();
    s.discipline = discipline(request.disciplineId());
    if (request.topicId() != null) {
      s.topic = topic(request.topicId());
      if (
        !s.topic.discipline.id.equals(s.discipline.id)
      ) throw new IllegalArgumentException(
        "O assunto não pertence à disciplina."
      );
    }
    s.kind = request.kind() == null ? StudySession.Kind.THEORY : request.kind();
    if (
      s.kind == StudySession.Kind.QUESTIONS && s.topic == null
    ) throw new IllegalArgumentException(
      "Selecione um assunto para o treino de questões."
    );
    s.durationSeconds = request.durationSeconds();
    s.studyDate = dateOrToday(request.studyDate());
    StudySession saved = sessions.save(s);
    pet.progress(
      (int) Math.min(120, s.durationSeconds / 60),
      (int) Math.min(30, s.durationSeconds / 300)
    );
    return saved;
  }

  public void deleteSession(Long id) {
    sessions.delete(sessions.findById(id).orElseThrow());
  }
}
