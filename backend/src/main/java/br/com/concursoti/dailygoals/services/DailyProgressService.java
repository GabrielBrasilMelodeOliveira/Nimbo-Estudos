package br.com.concursoti.dailygoals.services;

import br.com.concursoti.dailygoals.entities.*;
import br.com.concursoti.dailygoals.repositories.*;
import br.com.concursoti.planning.entities.StudyPlan;
import br.com.concursoti.planning.repositories.StudyPlanRepository;
import br.com.concursoti.questions.entities.QuestionRecord;
import br.com.concursoti.questions.repositories.QuestionRecordRepository;
import br.com.concursoti.studying.entities.StudySession;
import br.com.concursoti.studying.repositories.StudySessionRepository;
import java.time.*;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DailyProgressService {

  private final DailyGoalSettingsRepository settingsRepository;
  private final DailyGoalDayRepository dayRepository;
  private final StudySessionRepository sessionRepository;
  private final QuestionRecordRepository questionRepository;
  private final StudyPlanRepository planRepository;
  private final Clock clock;

  public DailyProgressService(
    DailyGoalSettingsRepository settingsRepository,
    DailyGoalDayRepository dayRepository,
    StudySessionRepository sessionRepository,
    QuestionRecordRepository questionRepository,
    StudyPlanRepository planRepository,
    Clock clock
  ) {
    this.settingsRepository = settingsRepository;
    this.dayRepository = dayRepository;
    this.sessionRepository = sessionRepository;
    this.questionRepository = questionRepository;
    this.planRepository = planRepository;
    this.clock = clock;
  }

  public record GoalInput(
    Integer targetMinutes,
    Integer targetQuestions,
    Integer targetTopics
  ) {}

  public record ProgressView(
    LocalDate date,
    String timezone,
    DailyGoalDay today,
    List<DailyGoalDay> history
  ) {}

  public ProgressView current() {
    List<DailyGoalDay> days = synchronize();
    LocalDate today = LocalDate.now(clock);
    return new ProgressView(
      today,
      clock.getZone().getId(),
      days.getLast(),
      days
        .stream()
        .filter(
          day -> day.closed && !day.studyDate.isBefore(today.minusDays(14))
        )
        .toList()
    );
  }

  /** Closed dates are immutable. Activity entered later never silently rewrites a pet's life. */
  public List<DailyGoalDay> synchronize() {
    DailyGoalSettings settings = lockedSettings();
    LocalDate today = LocalDate.now(clock);
    List<DailyGoalDay> days = new ArrayList<>(
      dayRepository.findAllByOrderByStudyDateAsc()
    );
    Map<LocalDate, DailyGoalDay> byDate = days
      .stream()
      .collect(Collectors.toMap(day -> day.studyDate, day -> day));
    LocalDate firstOpen = days
      .stream()
      .filter(day -> !day.closed)
      .map(day -> day.studyDate)
      .min(LocalDate::compareTo)
      .orElse(
        days.isEmpty()
          ? settings.trackingStart
          : days.getLast().studyDate.plusDays(1)
      );
    Map<LocalDate, List<StudySession>> sessions = sessionRepository
      .findByStudyDateBetween(firstOpen, today)
      .stream()
      .collect(Collectors.groupingBy(session -> session.studyDate));
    Map<LocalDate, List<QuestionRecord>> questions = questionRepository
      .findByDateBetween(firstOpen, today)
      .stream()
      .collect(Collectors.groupingBy(question -> question.date));
    List<DailyGoalDay> changed = new ArrayList<>();
    for (
      LocalDate date = firstOpen;
      !date.isAfter(today);
      date = date.plusDays(1)
    ) {
      DailyGoalDay day = byDate.get(date);
      if (day == null) {
        day = new DailyGoalDay();
        day.studyDate = date;
        applyTargets(
          day,
          settings.targetMinutes,
          settings.targetQuestions,
          settings.targetTopics
        );
        days.add(day);
      }
      if (day.closed) continue;
      day.closed = date.isBefore(today);
      measure(
        day,
        sessions.getOrDefault(date, List.of()),
        questions.getOrDefault(date, List.of())
      );
      changed.add(day);
    }
    dayRepository.saveAll(changed);
    return days;
  }

  public ProgressView update(GoalInput input) {
    if (
      input == null ||
      input.targetMinutes() == null ||
      input.targetQuestions() == null ||
      input.targetTopics() == null ||
      input.targetMinutes() < 0 ||
      input.targetMinutes() > 1440 ||
      input.targetQuestions() < 0 ||
      input.targetQuestions() > 10000 ||
      input.targetTopics() < 0 ||
      input.targetTopics() > 1000 ||
      input.targetMinutes() + input.targetQuestions() + input.targetTopics() ==
        0
    ) {
      throw new IllegalArgumentException(
        "Defina pelo menos uma meta positiva: até 1440 minutos, 10000 questões ou 1000 assuntos."
      );
    }
    // First close old dates using the targets that were in force at the time.
    List<DailyGoalDay> days = synchronize();
    DailyGoalSettings settings = settingsRepository.findLocked().orElseThrow();
    settings.targetMinutes = input.targetMinutes();
    settings.targetQuestions = input.targetQuestions();
    settings.targetTopics = input.targetTopics();
    settingsRepository.save(settings);
    DailyGoalDay today = days.getLast();
    applyTargets(
      today,
      settings.targetMinutes,
      settings.targetQuestions,
      settings.targetTopics
    );
    today.outcome = outcome(today);
    dayRepository.save(today);
    return new ProgressView(
      today.studyDate,
      clock.getZone().getId(),
      today,
      days
        .stream()
        .filter(
          day ->
            day.closed && !day.studyDate.isBefore(today.studyDate.minusDays(14))
        )
        .toList()
    );
  }

  private DailyGoalSettings lockedSettings() {
    StudyPlan plan = planRepository.findById(1L).orElseGet(StudyPlan::new);
    int minutes = Math.max(1, (int) Math.ceil(plan.weeklyGoalMinutes / 7.0));
    int topics = Math.max(0, (int) Math.ceil(plan.weeklyGoalTopics / 7.0));
    settingsRepository.initialize(LocalDate.now(clock), minutes, topics);
    return settingsRepository.findLocked().orElseThrow();
  }

  private void applyTargets(
    DailyGoalDay day,
    int minutes,
    int questions,
    int topics
  ) {
    day.targetMinutes = minutes;
    day.targetQuestions = questions;
    day.targetTopics = topics;
  }

  private void measure(
    DailyGoalDay day,
    List<StudySession> sessions,
    List<QuestionRecord> questions
  ) {
    day.studiedSeconds = sessions
      .stream()
      .mapToLong(session -> session.durationSeconds)
      .sum();
    day.answeredQuestions = questions
      .stream()
      .mapToInt(question -> question.total)
      .sum();
    Set<Long> topics = new HashSet<>();
    sessions
      .stream()
      .filter(session -> session.durationSeconds > 0 && session.topic != null)
      .forEach(session -> topics.add(session.topic.id));
    questions
      .stream()
      .filter(question -> question.total > 0)
      .forEach(question -> topics.add(question.topic.id));
    day.studiedTopics = topics.size();
    day.outcome = outcome(day);
  }

  public static String outcome(DailyGoalDay day) {
    boolean complete =
      (day.targetMinutes == 0 ||
        day.studiedSeconds >= day.targetMinutes * 60L) &&
      (day.targetQuestions == 0 ||
        day.answeredQuestions >= day.targetQuestions) &&
      (day.targetTopics == 0 || day.studiedTopics >= day.targetTopics);
    if (complete) return "COMPLETE";
    if (day.studiedSeconds > 0 || day.answeredQuestions > 0) return "PARTIAL";
    return day.closed ? "MISSED" : "PENDING";
  }
}
