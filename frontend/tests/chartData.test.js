import { test } from "node:test";
import assert from "node:assert/strict";
import { buildChartData } from "../src/pages/analytics/utils/chartData.js";
const discipline = { id: 1, name: "TI" };
const topic = { id: 2, title: "Java", discipline, status: "COMPLETED" };
const otherTopic = { id: 3, title: "Redes", discipline, status: "NOT_STARTED" };
const data = {
  disciplines: [discipline],
  topics: [topic, otherTopic],
  questions: [
    {
      topic,
      total: 10,
      correct: 10,
      date: "2026-11-18",
      focusDurationSeconds: 60,
    },
    { topic: otherTopic, total: 90, correct: 0, date: "2026-11-17" },
    { topic, total: 100, correct: 100, date: "2026-10-01" },
  ],
  "study-sessions": [
    { topic, durationSeconds: 60, kind: "QUESTIONS", studyDate: "2026-11-18" },
    { discipline, durationSeconds: 120, studyDate: "2026-11-17" },
  ],
};
test("chart filters weight accuracy, fill empty days and avoid duplicate focus time", () => {
  const result = buildChartData(data, { days: 7, today: "2026-11-18" });
  assert.equal(result.daily.length, 7);
  assert.equal(result.comparisons[0].accuracy, 10);
  assert.equal(result.comparisons[0].seconds, 180);
  assert.equal(result.daily[6].questionSeconds, 60);
  assert.equal(result.daily[0].correct, 0);
});
test("subject filter excludes unrelated sessions and limits coverage", () => {
  const result = buildChartData(data, {
    topicId: "2",
    disciplineId: "1",
    days: 7,
    today: "2026-11-18",
  });
  assert.equal(result.comparisons.length, 1);
  assert.equal(result.comparisons[0].accuracy, 100);
  assert.equal(result.comparisons[0].seconds, 60);
  assert.equal(
    result.coverage.find((item) => item.id === "COMPLETED").value,
    1,
  );
  assert.equal(
    result.coverage.find((item) => item.id === "NOT_STARTED").value,
    0,
  );
});
test("no questions means unknown accuracy", () => {
  const result = buildChartData(
    { disciplines: [discipline] },
    { days: 7, today: "2026-11-18" },
  );
  assert.equal(result.comparisons[0].accuracy, null);
});

test("compares all subjects independently", () => {
  const result = buildChartData(
    {
      ...data,
      reviews: [
        { topic, dueDate: "2026-11-17" },
        { topic, dueDate: "2026-11-18" },
        { topic: otherTopic, dueDate: "2026-11-19", completedAt: "2026-11-18" },
        { topic, dueDate: "2026-11-19", cancelledAt: "2026-11-18" },
      ],
    },
    { comparisonLevel: "topic", days: 7, today: "2026-11-18" },
  );
  assert.equal(result.comparisons.length, 2);
  assert.equal(
    result.comparisons.find((group) => group.id === 2).accuracy,
    100,
  );
  assert.equal(result.comparisons.find((group) => group.id === 3).accuracy, 0);
});
