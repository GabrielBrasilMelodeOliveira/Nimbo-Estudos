import { useState } from "react";
import { TODAY } from "../utils/utils.js";
import { historyDateRange } from "../utils/historyPeriod.js";

export function useHistoryPeriod() {
  const [period, setPeriod] = useState("all");
  const [selectedDay, setSelectedDay] = useState(TODAY);
  const [customRange, setCustomRange] = useState({ from: "", to: "" });
  const range =
    period === "custom" ? customRange : historyDateRange(period, selectedDay);
  const setBoundary = (boundary, value) => {
    setCustomRange({ ...range, [boundary]: value });
    setPeriod("custom");
  };
  return {
    period,
    setPeriod,
    selectedDay,
    setSelectedDay,
    ...range,
    setFrom: (value) => setBoundary("from", value),
    setTo: (value) => setBoundary("to", value),
    reset: () => {
      setPeriod("all");
      setSelectedDay(TODAY());
      setCustomRange({ from: "", to: "" });
    },
  };
}
