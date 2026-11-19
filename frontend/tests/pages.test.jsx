import { FocusTimerProvider } from "../src/shared/hooks/FocusTimerContext.jsx";
import React from "react";
import { it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../src/shared/theme/theme.js";

const discipline = {
  id: 1,
  name: "Engenharia de Software",
  color: "#39745d",
  importance: 3,
  examWeight: 3,
  confidence: 3,
};
const topic = {
  id: 1,
  title: "Análise por pontos de função (IFPUG e NESMA)",
  discipline,
  status: "IN_PROGRESS",
  mastery: "WEAK",
  theoryDone: false,
  summaryDone: false,
  importance: 3,
};
const data = {
  disciplines: [discipline],
  topics: [topic],
  questions: [],
  "study-sessions": [],
  reviews: [],
  "mock-exams": [],
  materials: [],
  "error-notes": [],
  agenda: [
    {
      id: 1,
      title: "Java e Spring Boot",
      category: "STUDY",
      topic,
      studyKind: "THEORY",
      durationMinutes: 45,
      scheduledDate: "2026-11-17",
      completed: false,
      version: 0,
    },
  ],
  "agenda/goals": [],
  "edital/imports": [],
  plan: { name: "Concurso de TI", weeklyGoalMinutes: 900, weeklyGoalTopics: 5 },
  dashboard: {},
  pet: null,
  analytics: {
    disciplines: [
      {
        ...discipline,
        topicCount: 1,
        completedTopics: 0,
        questions: 0,
        coverage: 0,
        priority: 50,
      },
    ],
    topics: [],
    recommendations: [],
  },
};
const pages = import.meta.glob("../src/pages/*/*.jsx");
for (const [path, load] of Object.entries(pages)) {
  it(`renders ${path} with existing project data`, async () => {
    const { default: Page } = await load();
    const { container } = render(
      <ThemeProvider theme={theme}>
        <FocusTimerProvider data={data} action={vi.fn()}>
          <Page
            data={data}
            action={vi.fn()}
            working={false}
            navigate={vi.fn()}
            focusTopicId=""
          />
        </FocusTimerProvider>
      </ThemeProvider>,
    );
    expect(container.textContent.length).toBeGreaterThan(0);
  });
}
