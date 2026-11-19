import React from "react";
import { it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../src/shared/theme/theme.js";
import Dashboard from "../src/pages/dashboard/Dashboard.jsx";
import { GoalStat } from "../src/pages/weeklyPlanner/components/GoalStat.jsx";
import { TODAY } from "../src/shared/utils/utils.js";
it("shows every appointment for today and uses today's discipline as next step", () => {
  const today = TODAY();
  const tasks = Array.from({ length: 7 }, (_, index) => ({
    id: index + 1,
    title: `Compromisso ${index + 1}`,
    scheduledDate: today,
    category: "PERSONAL",
    completed: false,
  }));
  render(
    <ThemeProvider theme={theme}>
      <Dashboard
        data={{
          agenda: tasks,
          topics: [],
          questions: [],
          reviews: [],
          "study-sessions": [],
          "study-plan": [
            { studyDate: today, disciplines: [{ id: 1, name: "Java" }] },
          ],
          analytics: {},
          dashboard: {},
          plan: {},
          pet: {},
        }}
        action={vi.fn()}
        navigate={vi.fn()}
      />
    </ThemeProvider>,
  );
  expect(screen.getAllByRole("checkbox")).toHaveLength(7);
  expect(
    within(
      screen.getByRole("region", { name: "Próximo passo de estudo" }),
    ).getByRole("heading", { name: "Java" }),
  ).toBeTruthy();
});
it("celebrates reached goals without celebrating an undefined target", () => {
  render(
    <ThemeProvider theme={theme}>
      <GoalStat label="Questões" actual={80} target={50} />
      <GoalStat label="Horas" actual={2} target={0} />
    </ThemeProvider>,
  );
  expect(screen.getAllByText("✓ Meta cumprida! Bom trabalho!")).toHaveLength(1);
});
