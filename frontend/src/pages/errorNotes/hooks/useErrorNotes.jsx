import { useMemo, useState } from "react";
import { blank } from "../utils/pageDefinitions.jsx";
export function useErrorNotes({ data, action, working }) {
  const [open, setOpen] = useState(false),
    [form, setForm] = useState(blank),
    [zoom, setZoom] = useState(null);
  const [search, setSearch] = useState(""),
    [discipline, setDiscipline] = useState("all"),
    [topic, setTopic] = useState("all");
  const [recurring, setRecurring] = useState("all"),
    [photo, setPhoto] = useState("all"),
    [from, setFrom] = useState(""),
    [to, setTo] = useState(""),
    [order, setOrder] = useState("recent");
  const notes = data["error-notes"] || [];
  const allowedTopics = data.topics.filter(
    (t) => discipline === "all" || String(t.discipline.id) === discipline,
  );
  const visible = useMemo(
    () =>
      notes
        .filter((n) => {
          const images = [n.questionImageId, n.answerImageId].filter(
            Boolean,
          ).length;
          return (
            (discipline === "all" ||
              String(n.topic.discipline.id) === discipline) &&
            (topic === "all" || String(n.topic.id) === topic) &&
            (recurring === "all" || String(!!n.recurring) === recurring) &&
            (photo === "all" ||
              (photo === "both" && images === 2) ||
              (photo === "missing" && images < 2) ||
              (photo === "some" && images > 0)) &&
            (from === "" || n.createdAt >= from) &&
            (to === "" || n.createdAt <= to) &&
            `${n.topic.title} ${n.topic.discipline.name} ${n.source} ${n.trap} ${n.correctAnswer}`
              .toLocaleLowerCase("pt-BR")
              .includes(search.toLocaleLowerCase("pt-BR"))
          );
        })
        .sort((a, b) =>
          order === "oldest"
            ? a.createdAt.localeCompare(b.createdAt) || a.id - b.id
            : order === "topic"
              ? a.topic.title.localeCompare(b.topic.title, "pt-BR")
              : b.createdAt.localeCompare(a.createdAt) || b.id - a.id,
        ),
    [notes, search, discipline, topic, recurring, photo, from, to, order],
  );
  const reset = () => {
    setSearch("");
    setDiscipline("all");
    setTopic("all");
    setRecurring("all");
    setPhoto("all");
    setFrom("");
    setTo("");
    setOrder("recent");
  };
  const save = async (e) => {
    e.preventDefault();
    if (
      await action(
        "error-notes",
        "POST",
        {
          ...form,
          topicId: Number(form.topicId),
        },
        "Erro salvo com suas capturas!",
      )
    ) {
      setOpen(false);
      setForm(blank);
    }
  };
  const recurringCount = visible.filter((n) => n.recurring).length,
    withPhotos = visible.filter(
      (n) => n.questionImageId || n.answerImageId,
    ).length;
  return {
    open,
    setOpen,
    form,
    setForm,
    zoom,
    setZoom,
    search,
    setSearch,
    discipline,
    setDiscipline,
    topic,
    setTopic,
    recurring,
    setRecurring,
    photo,
    setPhoto,
    from,
    setFrom,
    to,
    setTo,
    order,
    setOrder,
    notes,
    allowedTopics,
    visible,
    reset,
    save,
    recurringCount,
    withPhotos,
  };
}
