import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { ThemeProvider, GlobalStyles } from "@mui/material";
import { BookOpen, Home } from "lucide-react";
import App from "../src/App.jsx";
import Sidebar from "../src/shared/components/navigation/Sidebar.jsx";
import { theme } from "../src/shared/theme/theme.js";
import { globalStyles } from "../src/shared/theme/globalStyles.js";
import * as apiService from "../src/shared/services/api.js";
import { GoalStat } from "../src/pages/weeklyPlanner/components/GoalStat.jsx";
import DayClosing from "../src/shared/sections/dayClosing/DayClosing.jsx";
import SubjectPerformanceList from "../src/pages/questions/components/SubjectPerformanceList.jsx";
import { TODAY } from "../src/shared/utils/utils.js";

const show = (element) =>
  render(
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyles} />
      {element}
    </ThemeProvider>,
  );
afterEach(() => localStorage.clear());

it("collapses navigation without hiding routes, remembers the preference and expands again", async () => {
  localStorage.clear();
  vi.spyOn(apiService, "api").mockImplementation(async (path) => {
    const resources = { plan: {}, dashboard: {}, analytics: {}, pet: null };
    return Object.hasOwn(resources, path) ? resources[path] : [];
  });
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  const app = show(<App />);
  await screen.findByText("Pronto para começar?");
  const sidebar = screen.getByRole("complementary", {
    name: "Barra lateral principal",
  });
  expect(getComputedStyle(sidebar).overflowX).toBe("hidden");
  fireEvent.click(
    screen.getByRole("button", { name: "Recolher barra lateral" }),
  );
  expect(getComputedStyle(sidebar).width).toBe("76px");
  expect(localStorage.getItem("nimbo:sidebar-collapsed")).toBe("true");
  const navigation = within(
    screen.getByRole("navigation", { name: "Navegação principal" }),
  );
  expect(
    navigation.getByRole("button", { name: "Questões", exact: true })
      .textContent,
  ).toBe("");
  expect(
    navigation.getByRole("button", { name: "Configurações", exact: true }),
  ).toBeTruthy();
  fireEvent.click(
    navigation.getByRole("button", { name: "Flashcards", exact: true }),
  );
  await screen.findByRole("button", { name: "Novo flashcard" });
  expect(
    screen
      .getByRole("button", { name: "Flashcards", exact: true })
      .getAttribute("aria-current"),
  ).toBe("page");
  app.unmount();
  show(<App />);
  await screen.findByText("Pronto para começar?");
  fireEvent.click(
    screen.getByRole("button", { name: "Expandir barra lateral" }),
  );
  expect(localStorage.getItem("nimbo:sidebar-collapsed")).toBe("false");
  expect(
    within(screen.getByRole("navigation")).getByRole("button", {
      name: "Questões",
      exact: true,
    }).textContent,
  ).toBe("Questões");
});

it("shows full labels on mobile even with the desktop collapsed preference and closes on Escape", async () => {
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: query === "(max-width:760px)",
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  }));
  const close = vi.fn();
  show(
    <Sidebar
      mainMenu={[{ key: "dashboard", label: "Início", icon: Home }]}
      extraMenu={[{ key: "edital", label: "Meu edital", icon: BookOpen }]}
      page="dashboard"
      navigate={vi.fn()}
      pending={0}
      version="5.10.1"
      collapsed
      mobileOpen
      onMobileClose={close}
      more
      onToggleMore={vi.fn()}
      onToggleCollapsed={vi.fn()}
    />,
  );
  const button = await screen.findByRole("button", {
    name: "Início",
    exact: true,
  });
  expect(button.textContent).toBe("Início");
  expect(
    screen.queryByRole("button", { name: "Expandir barra lateral" }),
  ).toBeNull();
  fireEvent.keyDown(button, { key: "Escape", code: "Escape" });
  expect(close).toHaveBeenCalled();
});

it("uses the active palette for completed goals and daily progress", () => {
  show(
    <>
      <GoalStat label="Questões" actual={10} target={10} onClick={vi.fn()} />
      <DayClosing
        data={{
          "daily-progress": {
            date: TODAY(),
            today: {
              targetMinutes: 30,
              targetQuestions: 10,
              targetTopics: 2,
              studiedSeconds: 1800,
              answeredQuestions: 10,
              studiedTopics: 2,
              outcome: "COMPLETE",
            },
            history: [],
          },
          agenda: [],
        }}
        action={vi.fn()}
      />
    </>,
  );
  const chip = screen
    .getByText("✓ Meta cumprida! Bom trabalho!")
    .closest(".MuiChip-root");
  expect(chip.className).toContain("MuiChip-colorPrimary");
  for (const progress of screen.getAllByRole("progressbar"))
    expect(progress.className).toContain("MuiLinearProgress-colorPrimary");
});

it("aligns subject metrics into the same columns while retaining green and red accuracy colors", () => {
  const discipline = { name: "Java" };
  show(
    <SubjectPerformanceList
      subjects={[
        { id: 1, title: "Transações", discipline, correct: 2, total: 200 },
        { id: 2, title: "Classes", discipline, correct: 183, total: 220 },
      ]}
    />,
  );
  const rows = within(
    screen.getByRole("list", { name: "Desempenho por assunto" }),
  ).getAllByRole("listitem");
  expect(getComputedStyle(rows[0]).display).toBe("grid");
  expect(getComputedStyle(rows[0]).gridTemplateColumns).toBe(
    getComputedStyle(rows[1]).gridTemplateColumns,
  );
  expect(
    screen
      .getByRole("progressbar", { name: "Taxa de acertos em Transações" })
      .getAttribute("aria-valuenow"),
  ).toBe("1");
  expect(
    getComputedStyle(rows[0].querySelector(".MuiLinearProgress-bar"))
      .backgroundColor,
  ).toBe("rgb(189, 53, 69)");
  expect(
    getComputedStyle(rows[1].querySelector(".MuiLinearProgress-bar"))
      .backgroundColor,
  ).toBe("rgb(37, 118, 77)");
});
