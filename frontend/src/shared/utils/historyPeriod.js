import { TODAY } from "./utils.js";

export function historyDateRange(
  period,
  selectedDay = TODAY(),
  today = TODAY(),
) {
  if (period === "day") return { from: selectedDay, to: selectedDay };
  if (period !== "week" && period !== "month") return { from: "", to: "" };
  const firstDay = new Date(`${today}T12:00:00`);
  firstDay.setDate(firstDay.getDate() - (period === "week" ? 6 : 29));
  const from = [
    firstDay.getFullYear(),
    String(firstDay.getMonth() + 1).padStart(2, "0"),
    String(firstDay.getDate()).padStart(2, "0"),
  ].join("-");
  return { from, to: today };
}

export function isWithinHistoryRange(date, { from, to }) {
  return (!from || date >= from) && (!to || date <= to);
}
