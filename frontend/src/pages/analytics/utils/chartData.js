import { addDays } from "../../../shared/utils/plannerMetrics.js";
import { TODAY, statusLabels } from "../../../shared/utils/utils.js";

/** Question durations also exist in study sessions: count only the consolidated sessions. */
export function buildChartData(
  data,
  {
    disciplineId = "",
    topicId = "",
    days = 30,
    comparisonLevel = "discipline",
    today = TODAY(),
  } = {},
) {
  const startDate = addDays(today, 1 - days);
  const matchesTopic = (topic) =>
    (!topicId || String(topic?.id) === String(topicId)) &&
    (!disciplineId || String(topic?.discipline?.id) === String(disciplineId));
  const topics = (data.topics || []).filter(matchesTopic);
  const daily = Array.from({ length: days }, (_, index) => ({
    date: addDays(startDate, index),
    correct: 0,
    incorrect: 0,
    theorySeconds: 0,
    questionSeconds: 0,
  }));
  const daysByDate = new Map(daily.map((day) => [day.date, day]));
  const compareTopics = Boolean(topicId || comparisonLevel === "topic");
  const comparisons = (
    compareTopics
      ? topics
      : (data.disciplines || []).filter(
          (discipline) =>
            !disciplineId || String(discipline.id) === String(disciplineId),
        )
  ).map((item) => ({
    id: item.id,
    name: item.title || item.name,
    correct: 0,
    total: 0,
    seconds: 0,
  }));
  const groupsById = new Map(
    comparisons.map((group) => [String(group.id), group]),
  );
  for (const record of data.questions || []) {
    const day = daysByDate.get(record.date);
    if (!day || !matchesTopic(record.topic)) continue;
    const correct = Number(record.correct || 0);
    const total = Number(record.total || 0);
    day.correct += correct;
    day.incorrect += Math.max(0, total - correct);
    const group = groupsById.get(
      String(compareTopics ? record.topic?.id : record.topic?.discipline?.id),
    );
    if (group) {
      group.correct += correct;
      group.total += total;
    }
  }
  for (const session of data["study-sessions"] || []) {
    const day = daysByDate.get(session.studyDate);
    const discipline = session.topic?.discipline || session.discipline;
    if (
      !day ||
      (topicId && String(session.topic?.id) !== String(topicId)) ||
      (disciplineId && String(discipline?.id) !== String(disciplineId))
    )
      continue;
    const seconds = Number(session.durationSeconds || 0);
    day[session.kind === "QUESTIONS" ? "questionSeconds" : "theorySeconds"] +=
      seconds;
    const group = groupsById.get(
      String(compareTopics ? session.topic?.id : discipline?.id),
    );
    if (group) group.seconds += seconds;
  }
  return {
    daily,
    comparisons: comparisons.map((group) => ({
      ...group,
      accuracy: group.total ? (100 * group.correct) / group.total : null,
    })),
    coverage: Object.entries(statusLabels).map(([status, label], index) => ({
      id: status,
      label,
      value: topics.filter(
        (topic) => (topic.status || "NOT_STARTED") === status,
      ).length,
      color: ["#c5d6ce", "#dfaf55", "#39745d"][index],
    })),
  };
}
