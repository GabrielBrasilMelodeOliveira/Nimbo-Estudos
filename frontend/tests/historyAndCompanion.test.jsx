import React from "react";
import { afterEach, it, expect, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import { ThemeProvider, GlobalStyles } from "@mui/material";
import { theme } from "../src/shared/theme/theme.js";
import { globalStyles } from "../src/shared/theme/globalStyles.js";
import { FocusTimerProvider } from "../src/shared/hooks/FocusTimerContext.jsx";
import StudyCycle from "../src/pages/studyCycle/StudyCycle.jsx";
import Questions from "../src/pages/questions/Questions.jsx";
import PetCompanion from "../src/shared/components/PetCompanion.jsx";
import { TODAY } from "../src/shared/utils/utils.js";

function dayAgo(days) {
  const date = new Date(`${TODAY()}T12:00:00`);
  date.setDate(date.getDate() - days);
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}
const discipline = { id: 1, name: "Java" };
const topic = { id: 1, title: "Transações", discipline };
function historyData() {
  const dates = [0, 6, 29, 30, -1].map(dayAgo);
  return {
    disciplines: [discipline],
    topics: [topic],
    dashboard: {},
    plan: {},
    "study-sessions": dates.map((studyDate, index) => ({
      id: index + 1,
      studyDate,
      discipline,
      topic,
      kind: "THEORY",
      durationSeconds: 3600,
    })),
    questions: dates.map((date, index) => ({
      id: index + 1,
      date,
      topic,
      total: 10,
      correct: 7,
      focusDurationSeconds: 300,
    })),
  };
}
afterEach(() => {
  sessionStorage.clear();
  localStorage.clear();
});

it.each([
  [StudyCycle, "Sessões registradas (5)", "Histórico de sessões de estudo"],
  [Questions, "Métricas e histórico de questões", "Histórico de questões"],
])(
  "filters and scrolls the history in %s",
  async (Page, section, regionName) => {
    const data = historyData();
    render(
      <ThemeProvider theme={theme}>
        <FocusTimerProvider data={data} action={vi.fn()}>
          <Page data={data} action={vi.fn()} navigate={vi.fn()} />
        </FocusTimerProvider>
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: section }));
    const region = await screen.findByRole("region", { name: regionName });
    const countRows = () => within(region).getAllByRole("row").length - 1;
    expect(countRows()).toBe(5);
    expect(region.tabIndex).toBe(0);
    expect(getComputedStyle(region).overflow).toBe("auto");
    expect(getComputedStyle(region.querySelector("th")).position).toBe(
      "sticky",
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Últimos 7 dias", exact: true }),
    );
    expect(countRows()).toBe(2);
    fireEvent.click(
      screen.getByRole("button", { name: "Último mês", exact: true }),
    );
    expect(countRows()).toBe(3);
    fireEvent.click(
      screen.getByRole("button", { name: "Por dia", exact: true }),
    );
    expect(countRows()).toBe(1);
    fireEvent.change(screen.getByLabelText("Dia do histórico"), {
      target: { value: dayAgo(30) },
    });
    expect(countRows()).toBe(1);
    fireEvent.change(screen.getByLabelText("Dia do histórico"), {
      target: { value: dayAgo(200) },
    });
    expect(screen.queryByRole("region", { name: regionName })).toBeNull();
    fireEvent.click(
      screen.getByRole("button", { name: "Todo o histórico", exact: true }),
    );
    expect(
      within(screen.getByRole("region", { name: regionName })).getAllByRole(
        "row",
      ),
    ).toHaveLength(6);
  },
);

function pointer(target, type, x, y) {
  const event = new MouseEvent(type, {
    bubbles: true,
    button: 0,
    clientX: x,
    clientY: y,
  });
  Object.defineProperty(event, "pointerId", { value: 1 });
  fireEvent(target, event);
}
const pet = {
  species: "nori",
  stage: 1,
  mood: "neutral",
  level: 1,
  energy: 60,
  xp: 0,
  message: "Vamos estudar?",
  care: { streak: 0, moodLabel: "Neutro" },
};
it("drags only the circular companion, remembers position and opens with a separate click", async () => {
  localStorage.clear();
  const view = render(
    <ThemeProvider theme={theme}>
      <PetCompanion pet={pet} navigate={vi.fn()} action={vi.fn()} />
    </ThemeProvider>,
  );
  const orb = screen.getByRole("button", { name: "Abrir companheiro Nimbo" });
  expect(getComputedStyle(orb).borderRadius).toBe("50%");
  expect(orb.querySelector("p")).toBeNull();
  const before = parseFloat(getComputedStyle(orb.parentElement).left);
  pointer(orb, "pointerdown", 800, 600);
  pointer(orb, "pointermove", 600, 500);
  pointer(orb, "pointerup", 600, 500);
  fireEvent.click(orb, { detail: 1 });
  expect(
    screen.queryByRole("region", { name: "Seu companheiro Nimbo" }),
  ).toBeNull();
  expect(parseFloat(getComputedStyle(orb.parentElement).left)).toBe(
    before - 200,
  );
  const saved = JSON.parse(localStorage.getItem("nimbo:position"));
  expect(saved.x).toBeGreaterThan(0);
  pointer(orb, "pointerdown", 600, 500);
  pointer(orb, "pointerup", 600, 500);
  fireEvent.click(orb, { detail: 1 });
  expect(
    screen.getByRole("region", { name: "Seu companheiro Nimbo" }),
  ).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: "Recolher companheiro" }));
  view.unmount();
  render(
    <ThemeProvider theme={theme}>
      <PetCompanion pet={pet} navigate={vi.fn()} action={vi.fn()} />
    </ThemeProvider>,
  );
  const restored = screen.getByRole("button", {
    name: "Abrir companheiro Nimbo",
  });
  expect(parseFloat(getComputedStyle(restored.parentElement).left)).toBeCloseTo(
    before - 200,
  );
  fireEvent.keyDown(restored, { key: "ArrowLeft" });
  expect(parseFloat(getComputedStyle(restored.parentElement).left)).toBeCloseTo(
    before - 220,
  );
});

it("keeps the page canvas white and shared controls on the active blue palette", () => {
  render(
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyles} />
      <main className="nimbo-theme">
        <div className="app-main">
          <div className="main-content">Conteúdo</div>
        </div>
      </main>
    </ThemeProvider>,
  );
  expect(theme.palette.primary.main).toBe("#0F4C75");
  expect(theme.palette.background.default).toBe("#FFFFFF");
  expect(getComputedStyle(document.body).backgroundColor).toBe(
    "rgb(255, 255, 255)",
  );
  expect(getComputedStyle(screen.getByText("Conteúdo")).backgroundColor).toBe(
    "rgb(255, 255, 255)",
  );
});

it("keeps sidebar counters and selected review labels readable after recoloring", () => {
  render(
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyles} />
      <main className="nimbo-theme ux-v54">
        <aside className="sidebar">
          <span className="nav-count">7 revisões</span>
        </aside>
        <div className="tabs">
          <button className="active">
            Pendentes <span>7</span>
          </button>
        </div>
      </main>
    </ThemeProvider>,
  );
  for (const element of [
    screen.getByText("7 revisões"),
    screen.getByText("7"),
  ]) {
    const style = getComputedStyle(element);
    const luminance = (color) =>
      color
        .match(/[\d.]+/g)
        .slice(0, 3)
        .map(Number)
        .map((channel) => {
          const value = channel / 255;
          return value <= 0.04045
            ? value / 12.92
            : ((value + 0.055) / 1.055) ** 2.4;
        })
        .reduce(
          (sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index],
          0,
        );
    const foreground = luminance(style.color);
    const background = luminance(style.backgroundColor);
    expect(
      (Math.max(foreground, background) + 0.05) /
        (Math.min(foreground, background) + 0.05),
    ).toBeGreaterThanOrEqual(4.5);
  }
});
