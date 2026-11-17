package br.com.concursoti.analytics.services;

import br.com.concursoti.curriculum.entities.Discipline;
import br.com.concursoti.curriculum.entities.Topic;
import br.com.concursoti.curriculum.repositories.DisciplineRepository;
import br.com.concursoti.curriculum.repositories.TopicRepository;
import br.com.concursoti.questions.entities.QuestionRecord;
import br.com.concursoti.questions.repositories.QuestionRecordRepository;
import br.com.concursoti.reviews.entities.ReviewTask;
import br.com.concursoti.reviews.repositories.ReviewTaskRepository;
import br.com.concursoti.studying.entities.StudySession;
import br.com.concursoti.studying.repositories.StudySessionRepository;
import java.time.*;
import java.util.*;
import java.util.stream.*;
import org.springframework.data.domain.Sort;

/** Pontuação explicável, calculada a partir de preferências e registros reais. */
@org.springframework.stereotype.Service
public class AnalyticsService {

  private final DisciplineRepository disciplines;
  private final TopicRepository topics;
  private final QuestionRecordRepository questions;
  private final StudySessionRepository sessions;
  private final ReviewTaskRepository reviews;

  public AnalyticsService(
    DisciplineRepository disciplines,
    TopicRepository topics,
    QuestionRecordRepository questions,
    StudySessionRepository sessions,
    ReviewTaskRepository reviews
  ) {
    this.disciplines = disciplines;
    this.topics = topics;
    this.questions = questions;
    this.sessions = sessions;
    this.reviews = reviews;
  }

  private int rank(Integer n) {
    return n == null ? 3 : Math.max(1, Math.min(5, n));
  }

  private int mastery(Topic.Mastery m) {
    return m == Topic.Mastery.STRONG ? 5 : m == Topic.Mastery.MEDIUM ? 3 : 1;
  }

  private double round(double n) {
    return Math.round(n * 10) / 10.0;
  }

  public Map<String, Object> analytics() {
    LocalDate today = LocalDate.now();
    List<Discipline> all = disciplines.findAll(Sort.by("position", "id"));
    List<Topic> allTopics = topics.findAll();
    List<QuestionRecord> records = questions.findAll();
    List<StudySession> studies = sessions.findAll();
    List<ReviewTask> tasks = reviews.findAll();
    Map<Long, List<QuestionRecord>> byTopic = records
      .stream()
      .collect(Collectors.groupingBy(x -> x.topic.id));
    Map<Long, List<StudySession>> byStudyTopic = studies
      .stream()
      .filter(x -> x.topic != null)
      .collect(Collectors.groupingBy(x -> x.topic.id));
    Map<Long, List<ReviewTask>> byReview = tasks
      .stream()
      .collect(Collectors.groupingBy(x -> x.topic.id));
    List<Map<String, Object>> topicRows = new ArrayList<>();
    List<Map<String, Object>> disciplineRows = new ArrayList<>();
    for (Topic t : allTopics) {
      List<QuestionRecord> qs = byTopic.getOrDefault(t.id, List.of());
      int count = qs
          .stream()
          .mapToInt(x -> x.total)
          .sum(),
        correct = qs
          .stream()
          .mapToInt(x -> x.correct)
          .sum();
      double accuracy = count == 0 ? 0 : round((100.0 * correct) / count);
      long seconds = byStudyTopic
        .getOrDefault(t.id, List.of())
        .stream()
        .mapToLong(x -> x.durationSeconds)
        .sum();
      long theorySeconds = byStudyTopic
        .getOrDefault(t.id, List.of())
        .stream()
        .filter(x -> x.effectiveKind() == StudySession.Kind.THEORY)
        .mapToLong(x -> x.durationSeconds)
        .sum();
      long due = byReview
        .getOrDefault(t.id, List.of())
        .stream()
        .filter(
          x ->
            x.completedAt == null &&
            x.cancelledAt == null &&
            !x.dueDate.isAfter(today)
        )
        .count();
      int importance = rank(t.discipline.importance),
        weight = rank(t.discipline.examWeight),
        confidence = rank(t.discipline.confidence);
      int focus = rank(t.importance),
        mastery = mastery(t.mastery);
      // A pontuação vai de 0 a 100. A importância e o peso contam mais do que o histórico bruto.
      double priority =
        (25.0 * importance) / 5 +
        (20.0 * weight) / 5 +
        (15.0 * (6 - confidence)) / 5 +
        (10.0 * focus) / 5 +
        (10.0 * (6 - mastery)) / 5 +
        15.0 * (count > 0 ? 1.0 - correct / (double) count : .55) +
        5.0 * (due > 0 ? 1 : 0);
      if (
        t.status == Topic.Status.COMPLETED && count >= 20 && accuracy >= 85
      ) priority *= .82;
      LocalDate lastStudy = byStudyTopic
        .getOrDefault(t.id, List.of())
        .stream()
        .map(x -> x.studyDate)
        .max(LocalDate::compareTo)
        .orElse(null);
      int recentTotal = qs
        .stream()
        .filter(x -> !x.date.isBefore(today.minusDays(29)))
        .mapToInt(x -> x.total)
        .sum();
      int recentCorrect = qs
        .stream()
        .filter(x -> !x.date.isBefore(today.minusDays(29)))
        .mapToInt(x -> x.correct)
        .sum();
      Map<String, Object> row = new LinkedHashMap<>();
      row.put("id", t.id);
      row.put("title", t.title);
      row.put("disciplineId", t.discipline.id);
      row.put("discipline", t.discipline.name);
      row.put("color", t.discipline.color);
      row.put("status", t.status.name());
      row.put("mastery", t.mastery.name());
      row.put("importance", focus);
      row.put("theoryDone", t.theoryDone);
      row.put("summaryDone", t.summaryDone);
      row.put("total", count);
      row.put("correct", correct);
      row.put("wrong", count - correct);
      row.put("accuracy", accuracy);
      row.put("recentQuestions", recentTotal);
      row.put(
        "recentAccuracy",
        recentTotal > 0 ? round((100.0 * recentCorrect) / recentTotal) : null
      );
      row.put("seconds", seconds);
      row.put("theorySeconds", theorySeconds);
      row.put("questionSeconds", seconds - theorySeconds);
      row.put("dueReviews", due);
      row.put("lastStudy", lastStudy);
      row.put("priority", round(Math.max(0, Math.min(100, priority))));
      row.put("sampleLow", count < 20);
      topicRows.add(row);
    }
    Map<Long, List<Map<String, Object>>> grouped = topicRows
      .stream()
      .collect(Collectors.groupingBy(x -> (Long) x.get("disciplineId")));
    for (Discipline d : all) {
      List<Map<String, Object>> own = grouped.getOrDefault(d.id, List.of());
      int total = own
        .stream()
        .mapToInt(x -> (Integer) x.get("total"))
        .sum();
      int correct = own
        .stream()
        .mapToInt(x -> (Integer) x.get("correct"))
        .sum();
      List<StudySession> ownStudies = studies
        .stream()
        .filter(x -> x.discipline.id.equals(d.id))
        .toList();
      long seconds = ownStudies
        .stream()
        .mapToLong(x -> x.durationSeconds)
        .sum();
      long theorySeconds = ownStudies
        .stream()
        .filter(x -> x.effectiveKind() == StudySession.Kind.THEORY)
        .mapToLong(x -> x.durationSeconds)
        .sum();
      long completed = own
        .stream()
        .filter(x -> "COMPLETED".equals(x.get("status")))
        .count();
      long due = own
        .stream()
        .mapToLong(x -> (Long) x.get("dueReviews"))
        .sum();
      double priority = own.isEmpty()
        ? round(
            (25.0 * rank(d.importance)) / 5 +
              (20.0 * rank(d.examWeight)) / 5 +
              (15.0 * (6 - rank(d.confidence))) / 5
          )
        : round(
            own
              .stream()
              .mapToDouble(x -> (Double) x.get("priority"))
              .average()
              .orElse(0)
          );
      Map<String, Object> row = new LinkedHashMap<>();
      row.put("id", d.id);
      row.put("name", d.name);
      row.put("color", d.color);
      row.put("importance", rank(d.importance));
      row.put("examWeight", rank(d.examWeight));
      row.put("confidence", rank(d.confidence));
      row.put("topicCount", own.size());
      row.put("completedTopics", completed);
      row.put(
        "coverage",
        own.isEmpty() ? 0 : round((100.0 * completed) / own.size())
      );
      row.put("questions", total);
      row.put("correct", correct);
      row.put("accuracy", total == 0 ? 0 : round((100.0 * correct) / total));
      row.put("seconds", seconds);
      row.put("theorySeconds", theorySeconds);
      row.put("questionSeconds", seconds - theorySeconds);
      row.put("dueReviews", due);
      row.put("priority", priority);
      row.put(
        "topicIds",
        own
          .stream()
          .map(x -> x.get("id"))
          .toList()
      );
      disciplineRows.add(row);
    }
    topicRows.sort(
      Comparator.comparingDouble(
        (Map<String, Object> x) -> (Double) x.get("priority")
      ).reversed()
    );
    disciplineRows.sort(
      Comparator.comparingDouble(
        (Map<String, Object> x) -> (Double) x.get("priority")
      ).reversed()
    );
    int total = records
      .stream()
      .mapToInt(x -> x.total)
      .sum();
    int correct = records
      .stream()
      .mapToInt(x -> x.correct)
      .sum();
    long sec = studies
      .stream()
      .mapToLong(x -> x.durationSeconds)
      .sum();
    long due = tasks
      .stream()
      .filter(
        x ->
          x.completedAt == null &&
          x.cancelledAt == null &&
          !x.dueDate.isAfter(today)
      )
      .count();
    Map<String, Object> result = new LinkedHashMap<>();
    result.put("disciplines", disciplineRows);
    result.put("topics", topicRows);
    result.put("totalTopics", allTopics.size());
    result.put(
      "completedTopics",
      allTopics
        .stream()
        .filter(t -> t.status == Topic.Status.COMPLETED)
        .count()
    );
    result.put("totalQuestions", total);
    result.put("accuracy", total == 0 ? 0 : round((100.0 * correct) / total));
    long theorySec = studies
      .stream()
      .filter(x -> x.effectiveKind() == StudySession.Kind.THEORY)
      .mapToLong(x -> x.durationSeconds)
      .sum();
    result.put("totalSeconds", sec);
    result.put("totalTheorySeconds", theorySec);
    result.put("totalQuestionSeconds", sec - theorySec);
    result.put("dueReviews", due);
    result.put("recommendations", topicRows.stream().limit(6).toList());
    return result;
  }
}
