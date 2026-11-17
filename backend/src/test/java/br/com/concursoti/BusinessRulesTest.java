package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import br.com.concursoti.analytics.services.DashboardService;
import br.com.concursoti.companions.services.PetService;
import br.com.concursoti.curriculum.entities.Discipline;
import br.com.concursoti.curriculum.entities.Topic;
import br.com.concursoti.curriculum.repositories.DisciplineRepository;
import br.com.concursoti.curriculum.repositories.TopicRepository;
import br.com.concursoti.curriculum.services.CurriculumService;
import br.com.concursoti.errornotes.repositories.ErrorNoteRepository;
import br.com.concursoti.exams.entities.MockExam;
import br.com.concursoti.exams.repositories.MockExamRepository;
import br.com.concursoti.materials.repositories.MaterialRepository;
import br.com.concursoti.planning.entities.StudyPlan;
import br.com.concursoti.planning.repositories.AgendaItemRepository;
import br.com.concursoti.planning.repositories.StudyPlanRepository;
import br.com.concursoti.questions.entities.QuestionRecord;
import br.com.concursoti.questions.repositories.QuestionRecordRepository;
import br.com.concursoti.questions.services.QuestionsService;
import br.com.concursoti.reviews.repositories.ReviewTaskRepository;
import br.com.concursoti.reviews.services.ReviewScheduler;
import br.com.concursoti.studying.entities.StudySession;
import br.com.concursoti.studying.repositories.StudySessionRepository;
import java.time.LocalDate;
import java.util.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

@ExtendWith(MockitoExtension.class)
class BusinessRulesTest {

  @Mock
  DisciplineRepository disciplines;

  @Mock
  TopicRepository topics;

  @Mock
  QuestionRecordRepository questions;

  @Mock
  StudySessionRepository sessions;

  @Mock
  ReviewTaskRepository reviews;

  @Mock
  MockExamRepository exams;

  @Mock
  MaterialRepository materials;

  @Mock
  ErrorNoteRepository errors;

  @Mock
  StudyPlanRepository plans;

  @Mock
  PetService pet;

  @Mock
  ReviewScheduler reviewScheduler;

  @Mock
  AgendaItemRepository agenda;

  @InjectMocks
  QuestionsService questionsService;

  @InjectMocks
  CurriculumService curriculumService;

  @InjectMocks
  DashboardService dashboard;

  @Test
  void rejeitaAcertosMaioresQueTotal() {
    var request = new QuestionsService.QuestionInput(
      1L,
      10,
      11,
      LocalDate.now(),
      "",
      0L
    );
    assertThrows(IllegalArgumentException.class, () ->
      questionsService.addQuestions(request)
    );
    verifyNoInteractions(questions);
  }

  @Test
  void marcarTeoriaAgendaSomenteUmaRevisaoSegundoAssimilacao() {
    Discipline d = new Discipline("TI", "#2563EB", 0);
    d.id = 1L;
    Topic t = new Topic(d, "SQL");
    t.id = 2L;
    when(topics.findById(2L)).thenReturn(Optional.of(t));
    when(disciplines.findById(1L)).thenReturn(Optional.of(d));
    when(topics.save(any(Topic.class))).thenAnswer(inv -> inv.getArgument(0));
    curriculumService.updateTopic(
      2L,
      new CurriculumService.TopicInput(
        1L,
        "SQL",
        Topic.Status.IN_PROGRESS,
        true,
        false,
        Topic.Mastery.MEDIUM,
        3,
        3
      )
    );
    assertEquals(LocalDate.now(), t.theoryCompletedAt);
    assertTrue(t.theoryDone);
    verify(reviewScheduler).assessTheory(t, 3);
    verifyNoInteractions(reviews);
  }

  @Test
  void calculoDeAcertoEhPonderadoPorQuantidadeDeQuestoes() {
    Discipline d = new Discipline("TI", "#2563EB", 0);
    d.id = 1L;
    Topic t = new Topic(d, "SQL");
    t.id = 1L;
    t.status = Topic.Status.COMPLETED;
    QuestionRecord a = new QuestionRecord();
    a.id = 1L;
    a.topic = t;
    a.total = 10;
    a.correct = 10;
    a.date = LocalDate.now();
    QuestionRecord b = new QuestionRecord();
    b.id = 2L;
    b.topic = t;
    b.total = 30;
    b.correct = 10;
    b.date = LocalDate.now();
    when(topics.findAll()).thenReturn(List.of(t));
    when(questions.findAll()).thenReturn(List.of(a, b));
    when(sessions.findAll()).thenReturn(List.of());
    when(reviews.findAll()).thenReturn(List.of());
    MockExam exam = new MockExam();
    exam.total = 60;
    exam.correct = 60;
    exam.date = LocalDate.now();
    when(exams.findAll()).thenReturn(List.of(exam));
    when(plans.findById(1L)).thenReturn(Optional.of(new StudyPlan()));
    when(disciplines.findAll(any(Sort.class))).thenReturn(List.of(d));
    Map<String, Object> result = dashboard.dashboard();
    assertEquals(40, result.get("totalQuestions"));
    assertEquals(20, result.get("totalCorrect"));
    assertEquals(50.0, result.get("overallAccuracy"));
    assertEquals(80.0, result.get("recentAccuracy"));
    assertEquals(100.0, result.get("progressPercentage"));
  }

  @Test
  void registraCronometroDeQuestoesJuntoAoResultado() {
    Discipline d = new Discipline("TI", "#2563eb", 0);
    d.id = 1L;
    Topic t = new Topic(d, "SQL");
    t.id = 2L;
    when(topics.findById(2L)).thenReturn(Optional.of(t));
    when(questions.save(any(QuestionRecord.class))).thenAnswer(inv ->
      inv.getArgument(0)
    );
    questionsService.addQuestions(
      new QuestionsService.QuestionInput(
        2L,
        20,
        15,
        LocalDate.now(),
        "Lista",
        600L
      )
    );
    var captor = org.mockito.ArgumentCaptor.forClass(StudySession.class);
    verify(sessions).save(captor.capture());
    assertEquals(StudySession.Kind.QUESTIONS, captor.getValue().kind);
    assertEquals(600L, captor.getValue().durationSeconds);
    assertEquals(2L, captor.getValue().topic.id);
  }

  @Test
  void sessoesLegadasContamComoTeoriaNoDashboard() {
    Discipline d = new Discipline("TI", "#2563eb", 0);
    d.id = 1L;
    StudySession old = new StudySession();
    old.discipline = d;
    old.kind = null;
    old.durationSeconds = 1200L;
    old.studyDate = LocalDate.now();
    old.createdAt = java.time.LocalDateTime.now().minusMinutes(20);
    StudySession practice = new StudySession();
    practice.discipline = d;
    practice.kind = StudySession.Kind.QUESTIONS;
    practice.durationSeconds = 600L;
    practice.studyDate = LocalDate.now();
    practice.createdAt = java.time.LocalDateTime.now();
    when(topics.findAll()).thenReturn(List.of());
    when(questions.findAll()).thenReturn(List.of());
    when(sessions.findAll()).thenReturn(List.of(old, practice));
    when(reviews.findAll()).thenReturn(List.of());
    when(exams.findAll()).thenReturn(List.of());
    when(plans.findById(1L)).thenReturn(Optional.of(new StudyPlan()));
    when(disciplines.findAll(any(Sort.class))).thenReturn(List.of(d));
    Map<String, Object> result = dashboard.dashboard();
    assertEquals(1800L, result.get("weeklySeconds"));
    assertEquals(1200L, result.get("weeklyTheorySeconds"));
    assertEquals(600L, result.get("weeklyQuestionSeconds"));
    assertEquals(d.id, result.get("nextCycleDisciplineId"));
  }
}
