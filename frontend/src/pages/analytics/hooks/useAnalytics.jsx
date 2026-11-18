import { useMemo, useState } from "react";
import { fmtHours } from "../../../shared/utils/utils.js";
import { buildChartData } from "../utils/chartData.js";

export function useAnalytics(data) {
  const [disciplineId, setDisciplineId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [days, setDays] = useState(30);
  const [metric, setMetric] = useState("accuracy");
  const analysis = data.analytics || {};
  const topics = (data.topics || []).filter(
    (topic) => !disciplineId || String(topic.discipline?.id) === disciplineId,
  );
  const { daily, comparisons, coverage } = useMemo(
    () => buildChartData(data, { disciplineId, topicId, days }),
    [data, disciplineId, topicId, days],
  );
  const metrics = {
    accuracy: {
      label: "Taxa de acertos",
      format: (value) =>
        value == null ? "Sem questões" : `${value.toFixed(1)}%`,
    },
    total: {
      label: "Questões resolvidas",
      format: (value) => `${value || 0} questões`,
    },
    seconds: { label: "Tempo de estudo", format: (value) => fmtHours(value) },
  };
  const ranked = comparisons
    .filter((group) =>
      metric === "accuracy" ? group.total > 0 : group[metric] > 0,
    )
    .sort((first, second) => second[metric] - first[metric])
    .slice(0, 8);
  return {
    disciplineId,
    setDisciplineId,
    topicId,
    setTopicId,
    days,
    setDays,
    metric,
    setMetric,
    analysis,
    topics,
    daily,
    coverage,
    metrics,
    ranked,
  };
}
