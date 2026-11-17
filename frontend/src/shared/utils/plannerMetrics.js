import { activeReview } from "./revisionLevels.js";
export const isoDate = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const parseDate = (s) => new Date(`${s}T12:00:00`);
export const addDays = (s, n) => {
  const d = parseDate(s);
  d.setDate(d.getDate() + n);
  return isoDate(d);
};
export const startWeek = (s) => {
  const d = parseDate(s);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return isoDate(d);
};
export const endWeek = (s) => addDays(startWeek(s), 6);
export const monthStart = (s) => `${s.slice(0, 7)}-01`;
export const monthEnd = (s) => {
  const d = parseDate(monthStart(s));
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  return isoDate(d);
};
export const matchesStudy = (item, topicId, kind, day) =>
  item.category === "STUDY" &&
  Number(item.topic?.id) === Number(topicId) &&
  item.studyKind === (kind || "THEORY") &&
  item.scheduledDate === day;

/** Progresso real de uma atividade: não somar sessões da disciplina inteira ao assunto. */
export function itemProgress(data, item) {
  if (!item?.topic || item.category !== "STUDY") return null;
  const id = Number(item.topic.id),
    kind = item.studyKind || "THEORY",
    date = item.scheduledDate;
  const seconds = (data["study-sessions"] || [])
    .filter(
      (s) =>
        Number(s.topic?.id) === id &&
        s.studyDate === date &&
        (s.kind || "THEORY") === kind,
    )
    .reduce((sum, s) => sum + Number(s.durationSeconds || 0), 0);
  const questions =
    kind === "QUESTIONS"
      ? (data.questions || [])
          .filter((q) => Number(q.topic?.id) === id && q.date === date)
          .reduce((sum, q) => sum + Number(q.total || 0), 0)
      : 0;
  const targetSeconds = Number(item.durationMinutes || 0) * 60;
  const targetQuestions =
    kind === "QUESTIONS" ? Number(item.targetQuestions || 0) : 0;
  return {
    seconds,
    questions,
    targetSeconds,
    targetQuestions,
    complete:
      targetSeconds > 0 &&
      seconds >= targetSeconds &&
      (targetQuestions <= 0 || questions >= targetQuestions),
    progress:
      targetSeconds > 0
        ? Math.min(100, Math.round((seconds / targetSeconds) * 100))
        : 0,
    questionProgress:
      targetQuestions > 0
        ? Math.min(100, Math.round((questions / targetQuestions) * 100))
        : null,
  };
}
export function isAgendaCompleted(data, item) {
  return (
    item.completionOverride ??
    (Boolean(item.completed) || Boolean(itemProgress(data, item)?.complete))
  );
}

/** Métricas de períodos, derivadas dos registros originais (um lançamento só conta uma vez). */
export function periodSummary(data, start, end) {
  const inRange = (date) => date >= start && date <= end;
  const sessions = (data["study-sessions"] || []).filter((s) =>
    inRange(s.studyDate),
  );
  const questionRecords = (data.questions || []).filter((q) => inRange(q.date));
  const agenda = (data.agenda || []).filter((i) => inRange(i.scheduledDate));
  const studies = agenda.filter((i) => i.category === "STUDY" && i.topic);
  const reviews = data.reviews || [];
  const due = reviews.filter((r) => !r.cancelledAt && inRange(r.dueDate));
  const completedReviews = reviews.filter(
    (r) => r.completedAt && inRange(r.completedAt),
  );
  const seconds = sessions.reduce(
    (a, s) => a + Number(s.durationSeconds || 0),
    0,
  );
  const theorySeconds = sessions
    .filter((s) => (s.kind || "THEORY") === "THEORY")
    .reduce((a, s) => a + Number(s.durationSeconds || 0), 0);
  const questions = questionRecords.reduce(
    (a, q) => a + Number(q.total || 0),
    0,
  );
  const correct = questionRecords.reduce(
    (a, q) => a + Number(q.correct || 0),
    0,
  );
  const topicIds = new Set([
    ...sessions.filter((s) => s.topic).map((s) => Number(s.topic.id)),
    ...questionRecords.map((q) => Number(q.topic.id)),
  ]);
  return {
    seconds,
    theorySeconds,
    questionSeconds: seconds - theorySeconds,
    questions,
    correct,
    errors: questions - correct,
    studiedTopics: topicIds.size,
    plannedTopics: new Set(studies.map((i) => i.topic.id)).size,
    plannedMinutes: studies.reduce(
      (a, i) => a + Number(i.durationMinutes || 0),
      0,
    ),
    plannedQuestions: studies.reduce(
      (a, i) => a + Number(i.targetQuestions || 0),
      0,
    ),
    reviewDue: due.length,
    reviewDone: completedReviews.length,
    personalPending: agenda.filter(
      (i) => i.category !== "STUDY" && !i.completed,
    ).length,
    actualPlannedMinutes: studies.reduce(
      (a, i) => a + (itemProgress(data, i)?.seconds || 0) / 60,
      0,
    ),
    plannedBlocks: studies.length,
    completedBlocks: studies.filter((i) => itemProgress(data, i)?.complete)
      .length,
  };
}
export function findGoal(data, type, start) {
  return (
    (data["agenda/goals"] || []).find(
      (g) => g.periodType === type && g.periodStart === start,
    ) || null
  );
}
/** Sugerir não grava nada: o usuário aprova e pode mudar a data e os objetivos. */
export function suggestWeek(data, start, today = isoDate(new Date())) {
  const days = Array.from({ length: 7 }, (_, i) =>
    addDays(startWeek(start), i),
  ).filter((day) => day >= today);
  if (!days.length) return [];
  const recommendations = (data.analytics?.recommendations || []).filter((t) =>
    (data.topics || []).some((x) => Number(x.id) === Number(t.id)),
  );
  const existing = data.agenda || [];
  const proposals = [];
  for (const row of recommendations.slice(0, 9)) {
    const topic = (data.topics || []).find(
      (t) => Number(t.id) === Number(row.id),
    );
    if (!topic) continue;
    const kind =
      topic.theoryDone &&
      Number(row.total || 0) > 0 &&
      Number(row.accuracy || 0) < 80
        ? "QUESTIONS"
        : "THEORY";
    if (
      existing.some(
        (i) =>
          i.topic &&
          Number(i.topic.id) === Number(topic.id) &&
          i.studyKind === kind &&
          days.includes(i.scheduledDate),
      )
    )
      continue;
    const candidates = days.filter(
      (day) =>
        !proposals.some(
          (i) => i.topicId === topic.id && i.scheduledDate === day,
        ),
    );
    if (!candidates.length) continue;
    const dailyLoad = (day) =>
      existing
        .filter((i) => i.scheduledDate === day && i.category === "STUDY")
        .reduce((a, i) => a + Number(i.durationMinutes || 0), 0) +
      proposals
        .filter((i) => i.scheduledDate === day)
        .reduce((a, i) => a + i.durationMinutes, 0);
    const day = candidates.sort(
      (a, b) => dailyLoad(a) - dailyLoad(b) || a.localeCompare(b),
    )[0];
    if (dailyLoad(day) >= 150) continue;
    proposals.push({
      title: topic.title,
      category: "STUDY",
      topicId: topic.id,
      studyKind: kind,
      scheduledDate: day,
      durationMinutes: kind === "THEORY" ? 45 : 30,
      targetQuestions: kind === "QUESTIONS" ? 20 : 0,
      startTime: null,
      priority: 2,
      repeatWeekly: false,
      notes: "",
    });
    if (proposals.length >= 5) break;
  }
  return proposals;
}

/** Lançamentos efetivos fora dos blocos planejados: apenas para exibição no calendário. */
export function unplannedStudies(data, day) {
  const scheduled = (data.agenda || []).filter(
    (a) => a.category === "STUDY" && a.topic && a.scheduledDate === day,
  );
  const keyed = new Map();
  const push = (topic, discipline, kind, seconds, questions) => {
    const ref = topic || {
      id: `general-${discipline?.id || "unknown"}`,
      title: `Estudo geral — ${discipline?.name || "Disciplina"}`,
    };
    if (topic && scheduled.some((a) => matchesStudy(a, topic.id, kind, day)))
      return;
    const key = `${ref.id}-${kind}`;
    const prev = keyed.get(key) || {
      key,
      topic: ref,
      discipline,
      kind,
      seconds: 0,
      questions: 0,
    };
    prev.seconds += seconds;
    prev.questions += questions;
    keyed.set(key, prev);
  };
  for (const item of data["study-sessions"] || [])
    if (item.studyDate === day) {
      push(
        item.topic,
        item.discipline,
        item.kind || "THEORY",
        Number(item.durationSeconds || 0),
        0,
      );
    }
  for (const item of data.questions || [])
    if (item.date === day) {
      push(
        item.topic,
        item.topic?.discipline,
        "QUESTIONS",
        0,
        Number(item.total || 0),
      );
    }
  return [...keyed.values()];
}
