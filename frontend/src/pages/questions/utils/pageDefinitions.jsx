import { TODAY, percentage } from "../../../shared/utils/utils.js";
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
