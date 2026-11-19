import QuestionVolumeChart from "../src/shared/components/QuestionVolumeChart.jsx";
import React from "react";
import { it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../src/shared/theme/theme.js";
import AccuracyTrendChart from "../src/pages/analytics/components/AccuracyTrendChart.jsx";
import StudyActivityChart from "../src/shared/components/StudyActivityChart.jsx";
it("renders visible marks for accuracy and errors with just one recorded day", () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <AccuracyTrendChart
        width={800}
        daily={[
          { date: "2026-11-18", correct: 0, incorrect: 0 },
          { date: "2026-11-19", correct: 8, incorrect: 2 },
          { date: "2026-11-20", correct: 0, incorrect: 0 },
        ]}
      />
    </ThemeProvider>,
  );
  expect(container.querySelectorAll(".MuiLineChart-mark").length).toBe(2);
});
it("plots question counts even when no question time was recorded", () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <QuestionVolumeChart
        width={800}
        daily={[
          {
            date: "2026-11-19",
            theorySeconds: 3600,
            questionSeconds: 0,
            correct: 8,
            incorrect: 2,
          },
        ]}
      />
    </ThemeProvider>,
  );
  expect(container.querySelectorAll(".MuiLineChart-mark").length).toBe(1);
  expect(container.textContent).toContain("Questões resolvidas");
});

it("renders smooth trends without permanent markers when multiple days have data", () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <AccuracyTrendChart
        width={800}
        daily={[
          { date: "2026-11-18", correct: 5, incorrect: 5 },
          { date: "2026-11-19", correct: 8, incorrect: 2 },
          { date: "2026-11-20", correct: 7, incorrect: 3 },
        ]}
      />
    </ThemeProvider>,
  );
  expect(container.querySelectorAll(".MuiLineChart-mark")).toHaveLength(0);
  const lines = container.querySelectorAll(".MuiLineChart-line");
  expect(lines).toHaveLength(2);
  expect(lines[0].getAttribute("d")).toContain("C");
});
it("groups theory and question time into separate bars", () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <StudyActivityChart
        width={800}
        daily={[
          { date: "2026-11-19", theorySeconds: 3600, questionSeconds: 1800 },
        ]}
      />
    </ThemeProvider>,
  );
  const bars = container.querySelectorAll(".MuiBarChart-element");
  expect(bars).toHaveLength(2);
  const firstLeft = Number(bars[0].getAttribute("x"));
  const firstRight = firstLeft + Number(bars[0].getAttribute("width"));
  const secondLeft = Number(bars[1].getAttribute("x"));
  expect(secondLeft).toBeGreaterThan(firstRight);
  const baseline = (bar) =>
    Number(bar.getAttribute("y")) + Number(bar.getAttribute("height"));
  expect(baseline(bars[0])).toBeCloseTo(baseline(bars[1]));
  expect(container.querySelectorAll(".MuiLineChart-line")).toHaveLength(0);
  expect(container.textContent).toContain("Teoria");
  expect(container.textContent).toContain("Questões");
});
