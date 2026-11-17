import { useMemo, useState } from "react";
export function useAnalytics({ data, action, working, navigate }) {
  const analysis = data.analytics || {
    disciplines: [],
    topics: [],
  };
  const [search, setSearch] = useState(""),
    [disc, setDisc] = useState("all"),
    [status, setStatus] = useState("all"),
    [mastery, setMastery] = useState("all"),
    [order, setOrder] = useState("priority");
  const [editing, setEditing] = useState(null),
    [tuning, setTuning] = useState({
      importance: 3,
      examWeight: 3,
      confidence: 3,
    });
  const [topicEditing, setTopicEditing] = useState(null),
    [topicImportance, setTopicImportance] = useState(3);
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(
    () =>
      [...(analysis.topics || [])]
        .filter(
          (t) =>
            (disc === "all" || String(t.disciplineId) === disc) &&
            (status === "all" || t.status === status) &&
            (mastery === "all" || t.mastery === mastery) &&
            `${t.title} ${t.discipline}`
              .toLowerCase()
              .includes(search.toLowerCase()),
        )
        .sort((a, b) =>
          order === "priority"
            ? b.priority - a.priority
            : order === "accuracy"
              ? a.accuracy - b.accuracy
              : order === "questions"
                ? b.total - a.total
                : a.title.localeCompare(b.title),
        ),
    [analysis, disc, status, mastery, search, order],
  );
  const saveTuning = async (e) => {
    e.preventDefault();
    if (
      await action(
        `disciplines/${editing.id}/priority`,
        "PATCH",
        tuning,
        "Prioridades recalculadas!",
      )
    )
      setEditing(null);
  };
  const saveTopic = async (e) => {
    e.preventDefault();
    let topic = data.topics.find((t) => t.id === topicEditing.id);
    if (!topic) return;
    const payload = {
      disciplineId: topic.discipline.id,
      title: topic.title,
      status: topic.status,
      theoryDone: topic.theoryDone,
      summaryDone: topic.summaryDone,
      mastery: topic.mastery,
      importance: Number(topicImportance),
    };
    if (
      await action(
        `topics/${topic.id}`,
        "PUT",
        payload,
        "Importância do assunto atualizada!",
      )
    )
      setTopicEditing(null);
  };
  const selectRow = (topic) =>
    setSelected(selected === topic.id ? null : topic.id);
  const allTopics = analysis.topics || [];
  const statusDistribution = [
    {
      name: "A iniciar",
      n: allTopics.filter((t) => t.status === "NOT_STARTED").length,
      color: "#eab36e",
    },
    {
      name: "Em andamento",
      n: allTopics.filter((t) => t.status === "IN_PROGRESS").length,
      color: "#86abe2",
    },
    {
      name: "Concluídos",
      n: allTopics.filter((t) => t.status === "COMPLETED").length,
      color: "#64bc93",
    },
  ];
  const priorityDistribution = [
    {
      name: "Urgente (70–100)",
      n: allTopics.filter((t) => t.priority >= 70).length,
      color: "#e28e86",
    },
    {
      name: "Moderada (48–69)",
      n: allTopics.filter((t) => t.priority >= 48 && t.priority < 70).length,
      color: "#edc477",
    },
    {
      name: "Baixa (0–47)",
      n: allTopics.filter((t) => t.priority < 48).length,
      color: "#7dc8a7",
    },
  ];
  return {
    analysis,
    search,
    setSearch,
    disc,
    setDisc,
    status,
    setStatus,
    mastery,
    setMastery,
    order,
    setOrder,
    editing,
    setEditing,
    tuning,
    setTuning,
    topicEditing,
    setTopicEditing,
    topicImportance,
    setTopicImportance,
    selected,
    setSelected,
    filtered,
    saveTuning,
    saveTopic,
    selectRow,
    allTopics,
    statusDistribution,
    priorityDistribution,
  };
}
