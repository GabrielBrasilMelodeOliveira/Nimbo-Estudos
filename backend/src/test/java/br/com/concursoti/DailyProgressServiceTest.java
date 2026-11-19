package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import br.com.concursoti.curriculum.entities.Topic;
import br.com.concursoti.dailygoals.entities.*;
import br.com.concursoti.dailygoals.repositories.*;
import br.com.concursoti.dailygoals.services.DailyProgressService;
import br.com.concursoti.planning.repositories.StudyPlanRepository;
import br.com.concursoti.questions.entities.QuestionRecord;
import br.com.concursoti.questions.repositories.QuestionRecordRepository;
import br.com.concursoti.studying.entities.StudySession;
import br.com.concursoti.studying.repositories.StudySessionRepository;
import java.time.*;
import java.util.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DailyProgressServiceTest {

  final LocalDate today = LocalDate.of(2026, 11, 19);
  final Clock clock = Clock.fixed(
    Instant.parse("2026-11-19T13:00:00Z"),
    ZoneId.of("America/Fortaleza")
  );
  DailyGoalSettingsRepository settingsRepository;
  DailyGoalDayRepository dayRepository;
  StudySessionRepository sessions;
  QuestionRecordRepository questions;
  DailyProgressService service;
  DailyGoalSettings settings;

  @BeforeEach
  void setup() {
    settingsRepository = mock(DailyGoalSettingsRepository.class);
    dayRepository = mock(DailyGoalDayRepository.class);
    sessions = mock(StudySessionRepository.class);
    questions = mock(QuestionRecordRepository.class);
    settings = new DailyGoalSettings();
    settings.trackingStart = today.minusDays(2);
    settings.targetMinutes = 60;
    settings.targetQuestions = 10;
    settings.targetTopics = 1;
    when(settingsRepository.findLocked()).thenReturn(Optional.of(settings));
    service = new DailyProgressService(
      settingsRepository,
      dayRepository,
      sessions,
      questions,
      mock(StudyPlanRepository.class),
      clock
    );
  }

  StudySession session(
    LocalDate date,
    long seconds,
    Long topicId,
    StudySession.Kind kind
  ) {
    StudySession session = new StudySession();
    session.studyDate = date;
    session.durationSeconds = seconds;
    session.kind = kind;
    if (topicId != null) {
      session.topic = new Topic();
      session.topic.id = topicId;
    }
    return session;
  }

  @Test
  void combinesTheoryAndQuestionTimeWithoutDoubleCountingTopicsOrFocusDuration() {
    when(
      sessions.findByStudyDateBetween(settings.trackingStart, today)
    ).thenReturn(
      List.of(
        session(today, 2400, 1L, StudySession.Kind.THEORY),
        session(today, 1200, 1L, StudySession.Kind.QUESTIONS)
      )
    );
    QuestionRecord question = new QuestionRecord();
    question.date = today;
    question.total = 10;
    question.focusDurationSeconds = 1200L;
    question.topic = new Topic();
    question.topic.id = 1L;
    when(questions.findByDateBetween(settings.trackingStart, today)).thenReturn(
      List.of(question)
    );
    var view = service.current();
    assertEquals(3600, view.today().studiedSeconds);
    assertEquals(1, view.today().studiedTopics);
    assertEquals(10, view.today().answeredQuestions);
    assertEquals("COMPLETE", view.today().outcome);
    assertEquals(2, view.history().size());
    assertTrue(
      view
        .history()
        .stream()
        .allMatch(day -> day.closed && day.outcome.equals("MISSED"))
    );
  }

  @Test
  void anyStudyProgressIsPartialUntilAllConfiguredGoalsAreMet() {
    when(
      sessions.findByStudyDateBetween(settings.trackingStart, today)
    ).thenReturn(List.of(session(today, 1, null, StudySession.Kind.THEORY)));
    assertEquals("PARTIAL", service.current().today().outcome);
  }

  @Test
  void changingTargetsDoesNotRewriteClosedDaysOrUseNewTargetsForMissedDates() {
    DailyGoalDay closed = new DailyGoalDay();
    closed.studyDate = settings.trackingStart;
    closed.targetMinutes = 90;
    closed.closed = true;
    closed.outcome = "MISSED";
    when(dayRepository.findAllByOrderByStudyDateAsc()).thenReturn(
      List.of(closed)
    );
    var view = service.update(new DailyProgressService.GoalInput(15, 0, 0));
    assertEquals(90, view.history().getFirst().targetMinutes);
    assertEquals("MISSED", closed.outcome);
    assertEquals(60, view.history().getLast().targetMinutes);
    assertEquals(15, view.today().targetMinutes);
    assertEquals(15, settings.targetMinutes);
    verify(sessions).findByStudyDateBetween(today.minusDays(1), today);
  }

  @Test
  void rejectsAllDisabledOrNegativeGoals() {
    assertThrows(IllegalArgumentException.class, () ->
      service.update(new DailyProgressService.GoalInput(0, 0, 0))
    );
    assertThrows(IllegalArgumentException.class, () ->
      service.update(new DailyProgressService.GoalInput(-1, 10, 1))
    );
    verifyNoInteractions(settingsRepository);
  }

  @Test
  void usesFortalezaDateBeforeUtcMidnightBoundary() {
    Clock lateNight = Clock.fixed(
      Instant.parse("2026-11-20T01:00:00Z"),
      ZoneId.of("America/Fortaleza")
    );
    var localService = new DailyProgressService(
      settingsRepository,
      dayRepository,
      sessions,
      questions,
      mock(StudyPlanRepository.class),
      lateNight
    );
    assertEquals(today, localService.current().date());
  }
}
