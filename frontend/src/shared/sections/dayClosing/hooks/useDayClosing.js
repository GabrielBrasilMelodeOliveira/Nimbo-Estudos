import { useState } from "react";
import { addDays, isAgendaCompleted } from "../../../utils/plannerMetrics.js";

export function useDayClosing({ data, action }) {
  const progress = data["daily-progress"];
  const today = progress?.date;
  const [includeOverdue, setIncludeOverdue] = useState(false);
  const [selection, setSelection] = useState(null);
  const [destination, setDestination] = useState("");
  const [expanded, setExpanded] = useState(false);
  const activities = (data.agenda || []).filter(
    (item) => item.scheduledDate === today,
  );
  const completed = activities.filter((item) => isAgendaCompleted(data, item));
  const pending = (data.agenda || []).filter(
    (item) =>
      (item.scheduledDate === today ||
        (includeOverdue && item.scheduledDate < today)) &&
      !isAgendaCompleted(data, item),
  );
  const selected = pending.filter(
    (item) => selection === null || selection.includes(item.id),
  );
  const targetDate = destination || (today ? addDays(today, 1) : "");
  const toggleItem = (id) =>
    setSelection((current) => {
      const ids = current ?? pending.map((item) => item.id);
      return ids.includes(id)
        ? ids.filter((value) => value !== id)
        : [...ids, id];
    });
  const canReschedule =
    selected.length > 0 &&
    targetDate >= today &&
    selected.every((item) => targetDate > item.scheduledDate);
  const reschedule = async () => {
    if (!canReschedule) return;
    const saved = await action(
      "agenda/reschedule",
      "POST",
      {
        scheduledDate: targetDate,
        items: selected.map((item) => ({
          id: item.id,
          expectedVersion: item.version ?? 0,
        })),
      },
      `${selected.length} pendência(s) reagendada(s).`,
    );
    if (saved) setSelection(null);
  };
  return {
    progress,
    today,
    activities,
    completed,
    pending,
    selected,
    targetDate,
    setDestination,
    includeOverdue,
    setIncludeOverdue,
    toggleItem,
    selection,
    setSelection,
    reschedule,
    canReschedule,
    expanded,
    setExpanded,
  };
}
