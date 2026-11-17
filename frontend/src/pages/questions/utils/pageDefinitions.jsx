import { TODAY, percentage } from "../../../shared/utils/utils.js";
export const TIMER_KEY = "nimbo-question-timer-v1";
export const freshClock = () => ({
  topicId: "",
  elapsedMs: 0,
  runningSince: null,
});
export const initialClock = () => {
  try {
    const stored = JSON.parse(sessionStorage.getItem(TIMER_KEY) || "null");
    if (
      stored &&
      typeof stored === "object" &&
      Number.isFinite(stored.elapsedMs) &&
      stored.elapsedMs >= 0 &&
      stored.elapsedMs <= 86400000 &&
      (!stored.runningSince || Number.isFinite(stored.runningSince))
    ) {
      return {
        topicId: String(stored.topicId || ""),
        elapsedMs: stored.elapsedMs,
        runningSince: stored.runningSince || null,
      };
    }
  } catch {
    /* sem histórico anterior */
  }
  return freshClock();
};
export const blank = {
  topicId: "",
  total: "20",
  correct: "",
  date: TODAY(),
  notes: "",
  durationSeconds: 0,
  manualMinutes: "",
};
export const matchesAccuracy = (r, value) => {
  const a = percentage(r.correct, r.total);
  return (
    value === "all" ||
    (value === "weak" && a < 60) ||
    (value === "medium" && a >= 60 && a < 80) ||
    (value === "strong" && a >= 80) ||
    (value === "errors" && r.total > r.correct)
  );
};
