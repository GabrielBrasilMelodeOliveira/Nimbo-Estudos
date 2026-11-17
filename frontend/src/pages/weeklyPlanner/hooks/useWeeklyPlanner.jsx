import { Button } from "@mui/material";
import { useMemo, useState } from "react";
import { Check, Clock3, PenLine, RotateCcw } from "lucide-react";
import { TODAY, fmtHours } from "../../../shared/utils/utils.js";
import {
  isoDate,
  parseDate,
  addDays,
  startWeek,
  endWeek,
  monthStart,
  monthEnd,
  periodSummary,
  itemProgress,
  findGoal,
  suggestWeek,
  unplannedStudies,
} from "../../../shared/utils/plannerMetrics.js";
import { activeReview } from "../../../shared/utils/revisionLevels.js";
import { CATEGORIES, formInitial } from "../utils/pageDefinitions.jsx";
export function useWeeklyPlanner({ data, action, working, navigate }) {
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
          i.scheduledDate === day && (area === "ALL" || i.category === area),
      )
      .sort((a, b) =>
        (a.startTime || "99:99").localeCompare(b.startTime || "99:99"),
      );
  const reviewsForDay = (day) =>
    area !== "ALL" && area !== "STUDY"
      ? []
      : (data.reviews || []).filter(
          (r) => activeReview(r) && r.dueDate === day,
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
  const toggle = (item) =>
    action(
      `agenda/${item.id}/toggle`,
      "PATCH",
      undefined,
      "Atividade atualizada.",
    );
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
  const renderActivity = (item, compact = false) => {
    const tracked = itemProgress(data, item),
      isDone = tracked ? tracked.complete : item.completed;
    const cat = CATEGORIES[item.category] || CATEGORIES.PERSONAL;
    return (
      <div
        className={`n55-event ${isDone ? "done" : ""} ${tracked ? "study" : ""}`}
        key={`agenda-${item.id}`}
      >
        {!tracked && (
          <Button
            className={`n55-check ${item.completed ? "checked" : ""}`}
            onClick={() => toggle(item)}
            disabled={working}
            title={item.completed ? "Reabrir" : "Concluir"}
            aria-label={`Concluir ${item.title}`}
            type="button"
          >
            {item.completed && <Check size={13} />}
          </Button>
        )}
        <div className="n55-event-body">
          <strong>{item.title}</strong>
          {!compact && (
            <small>
              {cat.name}
              {item.startTime ? ` · ${item.startTime.slice(0, 5)}` : ""}
              {tracked
                ? ` · ${item.studyKind === "QUESTIONS" ? "Questões" : "Teoria"}`
                : ""}
            </small>
          )}
          {tracked && (
            <span className="n55-event-progress">
              {fmtHours(tracked.seconds)} / {item.durationMinutes} min
              {tracked.targetQuestions > 0
                ? ` · ${tracked.questions}/${tracked.targetQuestions} questões`
                : ""}
            </span>
          )}
        </div>
        {!compact && (
          <div className="n55-event-actions">
            {tracked && (
              <Button
                className="n55-minibutton"
                title="Iniciar estudo"
                onClick={() => navigateBlock(item)}
                type="button"
              >
                <Clock3 size={15} />
              </Button>
            )}
            <Button
              className="n55-minibutton"
              title="Editar"
              onClick={() => openEdit(item)}
              type="button"
            >
              <PenLine size={15} />
            </Button>
          </div>
        )}
      </div>
    );
  };
  const dayContent = (day, compact = false) => {
    const scheduled = activityForDay(day),
      reviews = reviewsForDay(day),
      finished = doneReviewsForDay(day),
      summary = actualForDay(day),
      unplanned = unplannedStudies(data, day);
    return (
      <>
        {scheduled.map((i) => renderActivity(i, compact))}
        {reviews.map((r) => (
          <Button
            className="n55-review-event"
            key={`review-${r.id}`}
            onClick={() => navigate("reviews")}
            title="Revisão agendada"
            type="button"
          >
            <RotateCcw size={14} />
            <span>{r.topic.title}</span>
          </Button>
        ))}
        {!compact &&
          unplanned.map((item) => (
            <div className="n55-logged-event" key={`unplanned-${item.key}`}>
              <span>Realizado</span>
              <strong>{item.topic.title}</strong>
              <small>
                {item.kind === "QUESTIONS" ? "Questões" : "Teoria"} ·{" "}
                {fmtHours(item.seconds)}
                {item.questions > 0 ? ` · ${item.questions} questões` : ""}
              </small>
            </div>
          ))}
        {!compact && finished.length > 0 && (
          <div className="n55-day-actual">
            {finished.length} revisão(ões) concluída(s)
          </div>
        )}
        {!compact && (summary.seconds > 0 || summary.questions > 0) && (
          <div className="n55-day-actual">
            Registrado: {fmtHours(summary.seconds)} · {summary.questions}{" "}
            questões
          </div>
        )}
        {compact && scheduled.length + reviews.length > 2 && (
          <span className="n55-more-count">
            +{scheduled.length + reviews.length - 2} itens
          </span>
        )}
      </>
    );
  };
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
    renderActivity,
    dayContent,
  };
}
