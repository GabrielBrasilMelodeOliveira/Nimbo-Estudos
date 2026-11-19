import { designColors } from "../../../shared/theme/designColors.js";
import { useMemo, useState } from "react";
import { buildTopicMetrics } from "../../../shared/utils/editalMetrics.js";
import { emptyTopic } from "../utils/pageDefinitions.jsx";
export function useEdital({ data, action, working, navigate }) {
  const [modal, setModal] = useState(null);
  const [assimilation, setAssimilation] = useState(null);
  const [form, setForm] = useState(emptyTopic);
  const [disciplineForm, setDisciplineForm] = useState({
    name: "",
    color: designColors.accent,
  });
  const [filter, setFilter] = useState("all"),
    [search, setSearch] = useState(""),
    [status, setStatus] = useState("all");
  const [masteryFilter, setMasteryFilter] = useState("all"),
    [reviewFilter, setReviewFilter] = useState("all");
  const [order, setOrder] = useState("discipline"),
    [pageSize, setPageSize] = useState(30),
    [page, setPage] = useState(1),
    [expanded, setExpanded] = useState(null);
  const stats = useMemo(() => buildTopicMetrics(data), [data]);
  const saveTopic = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      disciplineId: Number(form.disciplineId),
    };
    const ok = await action(
      modal === "edit" ? `topics/${form.id}` : "topics",
      modal === "edit" ? "PUT" : "POST",
      payload,
      modal === "edit" ? "Assunto atualizado!" : "Assunto adicionado!",
    );
    if (ok) {
      setModal(null);
      setForm(emptyTopic);
    }
  };
  const openCreate = () => {
    setForm({
      ...emptyTopic,
      disciplineId: String(data.disciplines[0]?.id || ""),
    });
    setModal("create");
  };
  const openEdit = (t) => {
    setForm({
      id: t.id,
      disciplineId: String(t.discipline.id),
      title: t.title,
      status: t.status,
      theoryDone: !!t.theoryDone,
      summaryDone: !!t.summaryDone,
      mastery: t.mastery,
      importance: t.importance || 3,
      assimilationLevel: t.assimilationLevel || 2,
    });
    setModal("edit");
  };
  const patch = async (t, changes) =>
    action(
      `topics/${t.id}`,
      "PUT",
      {
        disciplineId: t.discipline.id,
        title: t.title,
        status: t.status,
        theoryDone: t.theoryDone,
        summaryDone: t.summaryDone,
        mastery: t.mastery,
        importance: t.importance || 3,
        assimilationLevel: t.assimilationLevel ?? 2,
        ...changes,
      },
      "Progresso do assunto atualizado!",
    );
  const remove = async (t) => {
    if (window.confirm(`Excluir "${t.title}" e seus registros vinculados?`))
      await action(`topics/${t.id}`, "DELETE", undefined, "Assunto excluído.");
  };
  const rows = useMemo(
    () =>
      data.topics.map((topic) => ({
        ...stats.get(Number(topic.id)),
        topic,
      })),
    [data.topics, stats],
  );
  const filtered = useMemo(
    () =>
      rows
        .filter((row) => {
          const t = row.topic;
          return (
            (filter === "all" || String(t.discipline.id) === filter) &&
            (status === "all" || t.status === status) &&
            (masteryFilter === "all" || t.mastery === masteryFilter) &&
            (reviewFilter === "all" ||
              (reviewFilter === "due"
                ? row.due > 0
                : reviewFilter === "done"
                  ? row.reviewsCompleted > 0
                  : reviewFilter === "notScheduled"
                    ? row.reviews.length === 0
                    : Boolean(row.currentReview))) &&
            `${t.title} ${t.discipline.name}`
              .toLocaleLowerCase("pt-BR")
              .includes(search.toLocaleLowerCase("pt-BR"))
          );
        })
        .sort((a, b) => {
          if (order === "questions") return b.total - a.total;
          if (order === "accuracy")
            return (a.accuracy ?? 101) - (b.accuracy ?? 101);
          if (order === "time") return b.seconds - a.seconds;
          if (order === "review") return b.due - a.due;
          if (order === "progress") return b.stepsDone - a.stepsDone;
          if (order === "title")
            return a.topic.title.localeCompare(b.topic.title, "pt-BR");
          return (
            (a.topic.discipline.position ?? 0) -
              (b.topic.discipline.position ?? 0) ||
            a.topic.discipline.name.localeCompare(
              b.topic.discipline.name,
              "pt-BR",
            ) ||
            a.topic.title.localeCompare(b.topic.title, "pt-BR")
          );
        }),
    [rows, filter, status, masteryFilter, reviewFilter, search, order],
  );
  const maxPage = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, maxPage);
  const shown = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const completed = rows.filter((x) => x.topic.status === "COMPLETED").length;
  const allQuestions = rows.reduce((a, x) => a + x.total, 0),
    allCorrect = rows.reduce((a, x) => a + x.correct, 0);
  const trackedSeconds = rows.reduce((a, x) => a + x.seconds, 0),
    pendingReviews = rows.reduce((a, x) => a + x.due, 0);
  const changeFilters = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
    setExpanded(null);
  };
  return {
    modal,
    setModal,
    assimilation,
    setAssimilation,
    form,
    setForm,
    disciplineForm,
    setDisciplineForm,
    filter,
    setFilter,
    search,
    setSearch,
    status,
    setStatus,
    masteryFilter,
    setMasteryFilter,
    reviewFilter,
    setReviewFilter,
    order,
    setOrder,
    pageSize,
    setPageSize,
    page,
    setPage,
    expanded,
    setExpanded,
    stats,
    saveTopic,
    openCreate,
    openEdit,
    patch,
    remove,
    rows,
    filtered,
    maxPage,
    safePage,
    shown,
    completed,
    allQuestions,
    allCorrect,
    trackedSeconds,
    pendingReviews,
    changeFilters,
  };
}
