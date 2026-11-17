import { useMemo, useState } from "react";
import { TODAY } from "../../../shared/utils/utils.js";
import {
  isoDate,
  parseDate,
  addDays,
  startWeek,
  endWeek,
  monthStart,
  monthEnd,
  periodSummary,
  isAgendaCompleted,
  findGoal,
  suggestWeek,
} from "../../../shared/utils/plannerMetrics.js";
import { activeReview } from "../../../shared/utils/revisionLevels.js";
import { formInitial } from "../utils/pageDefinitions.jsx";
export function useWeeklyPlanner({ data, action, working, navigate }) {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [reviewToComplete, setReviewToComplete] = useState(null);
  const [mode, setMode] = useState("week"),
    [anchor, setAnchor] = useState(TODAY()),
    [area, setArea] = useState("ALL");
  const [selectedDay, setSelectedDay] = useState(null),
    [editor, setEditor] = useState(null),
    [form, setForm] = useState(formInitial());
  const [goalOpen, setGoalOpen] = useState(false),
    [goalForm, setGoalForm] = useState(null),
    [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const week = startWeek(anchor),
    month = monthStart(anchor),
    start = mode === "week" ? week : month,
    end = mode === "week" ? endWeek(anchor) : monthEnd(anchor);
  const periodType = mode === "week" ? "WEEK" : "MONTH";
  const dates = useMemo(
    () =>
      Array.from(
        {
          length:
            Math.round((parseDate(end) - parseDate(start)) / 86400000) + 1,
        },
        (_, i) => addDays(start, i),
      ),
    [start, end],
  );
  const gridDates = useMemo(() => {
    if (mode === "week") return dates;
    const gridStart = startWeek(start);
    const count =
      Math.ceil(
        (Math.round((parseDate(end) - parseDate(gridStart)) / 86400000) + 1) /
          7,
      ) * 7;
    return Array.from(
      {
        length: count,
      },
      (_, i) => addDays(gridStart, i),
    );
  }, [mode, start, end, dates]);
  const metrics = useMemo(
    () => periodSummary(data, start, end),
    [data, start, end],
  );
  const savedGoal = findGoal(data, periodType, start);
  const targetMinutes =
    savedGoal?.targetMinutes ??
    (mode === "week" ? data.plan?.weeklyGoalMinutes || 0 : 0);
  const targetQuestions = savedGoal?.targetQuestions ?? 0;
  const targetTopics =
    savedGoal?.targetTopics ??
    (mode === "week" ? data.plan?.weeklyGoalTopics || 0 : 0);
  const suggestions = useMemo(
    () => suggestWeek(data, week, TODAY()),
    [data, week],
  );
  const activityForDay = (day) =>
    (data.agenda || [])
      .filter(
        (i) =>
          i.scheduledDate === day &&
          (area === "ALL" || i.category === area) &&
          (statusFilter === "ALL" ||
            isAgendaCompleted(data, i) === (statusFilter === "DONE")) &&
          i.title
            .toLocaleLowerCase("pt-BR")
            .includes(search.trim().toLocaleLowerCase("pt-BR")),
      )
      .sort((a, b) =>
        (a.startTime || "99:99").localeCompare(b.startTime || "99:99"),
      );
  const reviewsForDay = (day) =>
    area !== "ALL" && area !== "STUDY"
      ? []
      : (data.reviews || []).filter(
          (review) =>
            activeReview(review) &&
            review.dueDate === day &&
            review.topic.title
              .toLocaleLowerCase("pt-BR")
              .includes(search.trim().toLocaleLowerCase("pt-BR")),
        );
  const doneReviewsForDay = (day) =>
    area !== "ALL" && area !== "STUDY"
      ? []
      : (data.reviews || []).filter(
          (r) => !!r.completedAt && r.completedAt === day,
        );
  const actualForDay = (day) => periodSummary(data, day, day);
  const openAdd = (day = TODAY(), study = false) => {
    setSelectedDay(null);
    setForm(formInitial(day, study));
    setEditor("create");
  };
  const openEdit = (item) => {
    setSelectedDay(null);
    setForm({
      ...item,
      topicId: item.topic?.id || "",
      studyKind: item.studyKind || "THEORY",
      targetQuestions: item.targetQuestions || 0,
      startTime: item.startTime?.slice(0, 5) || "",
    });
    setEditor("edit");
  };
  const toPayload = (record) => ({
    ...record,
    topicId:
      record.category === "STUDY" && record.topicId
        ? Number(record.topicId)
        : null,
    durationMinutes: Number(record.durationMinutes),
    priority: Number(record.priority),
    targetQuestions: Number(record.targetQuestions || 0),
    studyKind:
      record.category === "STUDY" && record.topicId ? record.studyKind : null,
    startTime: record.startTime || null,
    repeatWeekly:
      record.category === "STUDY" && record.topicId
        ? false
        : Boolean(record.repeatWeekly),
  });
  const save = async (e) => {
    e.preventDefault();
    if (
      await action(
        editor === "edit" ? `agenda/${form.id}` : "agenda",
        editor === "edit" ? "PUT" : "POST",
        toPayload(form),
        "Agenda atualizada.",
      )
    )
      setEditor(null);
  };
  const toggle = (item, completed) =>
    action(
      `agenda/${item.id}/completion`,
      "PATCH",
      { completed, expectedVersion: item.version ?? 0 },
      "Atividade atualizada.",
    );
  const moveActivity = (item, scheduledDate) => {
    if (
      working ||
      isAgendaCompleted(data, item) ||
      item.scheduledDate === scheduledDate
    )
      return;
    return action(
      `agenda/${item.id}/move`,
      "PATCH",
      { scheduledDate, expectedVersion: item.version ?? 0 },
      "Atividade movida.",
    );
  };
  const dropActivity = (id, scheduledDate) => {
    const item = (data.agenda || []).find(
      (item) => String(item.id) === String(id),
    );
    if (item) return moveActivity(item, scheduledDate);
  };
  const remove = async () => {
    if (window.confirm(`Excluir "${form.title}"?`)) {
      if (
        await action(
          `agenda/${form.id}`,
          "DELETE",
          undefined,
          "Atividade excluída.",
        )
      )
        setEditor(null);
    }
  };
  const shift = (delta) => {
    const d = parseDate(anchor);
    if (mode === "month") {
      d.setDate(1);
      d.setMonth(d.getMonth() + delta);
    } else d.setDate(d.getDate() + 7 * delta);
    setAnchor(isoDate(d));
    setSelectedDay(null);
  };
  const chooseView = (value) => {
    setMode(value);
    setSelectedDay(null);
  };
  const saveGoal = async (e) => {
    e.preventDefault();
    const payload = {
      ...goalForm,
      targetMinutes: Number(goalForm.targetMinutes),
      targetQuestions: Number(goalForm.targetQuestions),
      targetTopics: Number(goalForm.targetTopics),
    };
    if (await action("agenda/goals", "PUT", payload, "Metas atualizadas."))
      setGoalOpen(false);
  };
  const applySuggestion = async (proposal) =>
    action("agenda", "POST", toPayload(proposal), "Estudo incluído na agenda.");
  const navigateBlock = (item) =>
    navigate(item.studyKind === "QUESTIONS" ? "questions" : "cycle", {
      topicId: item.topic.id,
    });
  return {
    mode,
    setMode,
    anchor,
    setAnchor,
    area,
    setArea,
    selectedDay,
    setSelectedDay,
    editor,
    setEditor,
    form,
    setForm,
    goalOpen,
    setGoalOpen,
    goalForm,
    setGoalForm,
    suggestionsOpen,
    setSuggestionsOpen,
    week,
    month,
    start,
    end,
    periodType,
    dates,
    gridDates,
    metrics,
    savedGoal,
    targetMinutes,
    targetQuestions,
    targetTopics,
    suggestions,
    activityForDay,
    reviewsForDay,
    doneReviewsForDay,
    actualForDay,
    openAdd,
    openEdit,
    toPayload,
    save,
    toggle,
    remove,
    shift,
    chooseView,
    saveGoal,
    applySuggestion,
    navigateBlock,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    moveActivity,
    dropActivity,
    reviewToComplete,
    setReviewToComplete,
  };
}
