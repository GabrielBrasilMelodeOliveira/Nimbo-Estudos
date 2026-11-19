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
      <StudyActivityChart
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
