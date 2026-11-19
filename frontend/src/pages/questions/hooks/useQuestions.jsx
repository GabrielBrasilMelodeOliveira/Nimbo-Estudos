import { useHistoryPeriod } from "../../../shared/hooks/useHistoryPeriod.js";
import { useEffect, useMemo, useState } from "react";
import { TODAY, percentage } from "../../../shared/utils/utils.js";
import { blank, matchesAccuracy } from "../utils/pageDefinitions.jsx";
export function useQuestions({ data, action, working, focusTopicId }) {
  const [open, setOpen] = useState(false),
    [form, setForm] = useState(blank);
  const [search, setSearch] = useState(""),
    [discipline, setDiscipline] = useState("all"),
    [topic, setTopic] = useState("all");
  const [result, setResult] = useState("all"),
    [order, setOrder] = useState("recent");
  const historyPeriod = useHistoryPeriod();
  const { from, to, setFrom, setTo } = historyPeriod;
  useEffect(() => {
    const selected = data.topics.find(
      (topic) => String(topic.id) === String(focusTopicId),
    );
    if (selected) {
      setDiscipline(String(selected.discipline.id));
      setTopic(String(selected.id));
    }
  }, [focusTopicId]);
  const openManual = () => {
    setForm({
      ...blank,
      topicId: focusTopicId || String(data.topics?.[0]?.id || ""),
      date: TODAY(),
    });
    setOpen(true);
  };
  const submit = async (e) => {
    e.preventDefault();
    const success = await action(
      "questions",
      "POST",
      {
        topicId: Number(form.topicId),
        total: Number(form.total),
        correct: Number(form.correct),
        notes: form.notes,
        date: form.date,
        durationSeconds:
          Number(form.durationSeconds) ||
          Math.floor((Number(form.manualMinutes) || 0) * 60),
      },
      "Questões registradas!",
    );
    if (success) {
      setOpen(false);
      setForm(blank);
    }
  };
  const records = data.questions || [];
  const topicsForDiscipline = data.topics.filter(
    (t) => discipline === "all" || String(t.discipline.id) === discipline,
  );
  const filtered = useMemo(
    () =>
      records
        .filter((r) => {
          const t = r.topic;
          return (
            (discipline === "all" || String(t.discipline.id) === discipline) &&
            (topic === "all" || String(t.id) === topic) &&
            `${t.title} ${t.discipline.name} ${r.notes || ""}`
              .toLocaleLowerCase("pt-BR")
              .includes(search.toLocaleLowerCase("pt-BR")) &&
            (from === "" || r.date >= from) &&
            (to === "" || r.date <= to) &&
            matchesAccuracy(r, result)
          );
        })
        .sort((a, b) =>
          order === "oldest"
            ? a.date.localeCompare(b.date) || a.id - b.id
            : order === "errors"
              ? b.total - b.correct - (a.total - a.correct)
              : order === "accuracy"
                ? percentage(a.correct, a.total) -
                  percentage(b.correct, b.total)
                : b.date.localeCompare(a.date) || b.id - a.id,
        ),
    [records, discipline, topic, search, result, from, to, order],
  );
  const rows = useMemo(() => {
    const sums = new Map();
    for (const r of filtered) {
      const t = r.topic;
      const prev = sums.get(t.id) || {
        ...t,
        total: 0,
        correct: 0,
      };
      prev.total += r.total;
      prev.correct += r.correct;
      sums.set(t.id, prev);
    }
    return [...sums.values()].sort(
      (a, b) => percentage(a.correct, a.total) - percentage(b.correct, b.total),
    );
  }, [filtered]);
  const total = filtered.reduce((n, r) => n + r.total, 0),
    correct = filtered.reduce((n, r) => n + r.correct, 0);
  const focusedSeconds = filtered.reduce(
    (n, r) => n + (Number(r.focusDurationSeconds) || 0),
    0,
  );
  const clearFilters = () => {
    setSearch("");
    setDiscipline("all");
    setTopic("all");
    setResult("all");
    historyPeriod.reset();
    setOrder("recent");
  };
  return {
    historyPeriod,
    open,
    setOpen,
    form,
    setForm,
    search,
    setSearch,
    discipline,
    setDiscipline,
    topic,
    setTopic,
    result,
    setResult,
    from,
    setFrom,
    to,
    setTo,
    order,
    setOrder,
    openManual,
    submit,
    records,
    topicsForDiscipline,
    filtered,
    rows,
    total,
    correct,
    focusedSeconds,
    clearFilters,
  };
}
