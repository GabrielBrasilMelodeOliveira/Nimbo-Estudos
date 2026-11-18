import React from "react";
import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../src/shared/theme/theme.js";
import {
  Input,
  SearchableSelect,
} from "../src/shared/components/FormControls.jsx";
import { AgendaCard } from "../src/pages/weeklyPlanner/components/AgendaCard.jsx";
import { WeekBoard } from "../src/pages/weeklyPlanner/sections/WeekBoard.jsx";
import { FlashcardDeck } from "../src/pages/flashcards/components/FlashcardDeck.jsx";
import { isAgendaCompleted } from "../src/shared/utils/plannerMetrics.js";

const renderWithTheme = (element) =>
  render(<ThemeProvider theme={theme}>{element}</ThemeProvider>);
const item = {
  id: 1,
  title: "Java e Spring Boot com transações e persistência",
  category: "STUDY",
  scheduledDate: "2026-11-17",
  durationMinutes: 45,
  priority: 3,
};

describe("Shared input controls", () => {
  it("keeps HTML validation and accessible names on the actual input", () => {
    renderWithTheme(
      <>
        <Input aria-label="Minutos" type="number" min={0} max={1440} />
        <SearchableSelect aria-label="Status">
          <option value="pending">Pendente</option>
        </SearchableSelect>
      </>,
    );
    expect(
      screen.getByRole("spinbutton", { name: "Minutos" }).getAttribute("max"),
    ).toBe("1440");
    expect(screen.getByRole("combobox", { name: "Status" }).tagName).toBe(
      "INPUT",
    );
  });
});
describe("Agenda", () => {
  it("offers completion for linked studies and preserves readable title markup", () => {
    const onComplete = vi.fn();
    renderWithTheme(
      <AgendaCard
        item={{ ...item, topic: { id: 7 } }}
        completed={false}
        working={false}
        dates={[]}
        onComplete={onComplete}
      />,
    );
    fireEvent.click(
      screen.getByRole("checkbox", { name: `Concluir ${item.title}` }),
    );
    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1 }),
      true,
    );
    expect(screen.getByRole("heading", { name: item.title }).textContent).toBe(
      item.title,
    );
  });
  it("moves a pending item through the accessible menu", () => {
    const onMove = vi.fn();
    renderWithTheme(
      <AgendaCard
        item={item}
        completed={false}
        dates={["2026-11-17", "2026-11-18"]}
        onMove={onMove}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: `Mover ${item.title}` }),
    );
    fireEvent.click(screen.getByRole("menuitem", { name: "18/11/2026" }));
    expect(onMove).toHaveBeenCalledWith(item, "2026-11-18");
  });
  it("accepts a drag payload on another day", () => {
    const onDrop = vi.fn();
    const { container } = renderWithTheme(
      <WeekBoard
        dates={["2026-11-17", "2026-11-18"]}
        itemsForDay={() => []}
        renderDay={() => null}
        onDrop={onDrop}
        onAdd={() => {}}
      />,
    );
    fireEvent.drop(container.querySelector('[data-agenda-day="2026-11-18"]'), {
      dataTransfer: { getData: () => "1" },
    });
    expect(onDrop).toHaveBeenCalledWith("1", "2026-11-18");
  });
  it("honors manual reopening even when a study target has been met", () => {
    const linked = {
      ...item,
      topic: { id: 7 },
      studyKind: "THEORY",
      completionOverride: false,
    };
    const data = {
      "study-sessions": [
        { topic: { id: 7 }, studyDate: "2026-11-17", durationSeconds: 2700 },
      ],
    };
    expect(isAgendaCompleted(data, linked)).toBe(false);
    expect(
      isAgendaCompleted(data, { ...linked, completionOverride: null }),
    ).toBe(true);
  });
});
it("reveals flashcards before rating and sends the persisted revision", async () => {
  const now = Date.now();
  const card = {
    id: 42,
    revision: 3,
    question: "Qual é a regra?",
    answer: "A transação é atômica.",
    discipline: "Java",
    topic: "Transações",
    source: "Prova",
    due: new Date(now - 1000).toISOString(),
    nextReviews: Object.fromEntries(
      ["AGAIN", "HARD", "GOOD", "EASY"].map((key) => [
        key,
        new Date(now + 600000).toISOString(),
      ]),
    ),
  };
  const fetchMock = vi
    .spyOn(globalThis, "fetch")
    .mockImplementation(async (url, options) => ({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
      text: async () =>
        JSON.stringify(
          options?.method === "POST"
            ? {
                ...card,
                revision: 4,
                due: new Date(now + 600000).toISOString(),
              }
            : [card],
        ),
    }));
  renderWithTheme(<FlashcardDeck />);
  await screen.findByText(card.question);
  expect(screen.queryByText(card.answer)).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Mostrar resposta" }));
  expect(screen.getByText(card.answer)).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: /^Bom/ }));
  await waitFor(() =>
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/flashcards/42/review",
      expect.objectContaining({
        body: JSON.stringify({ rating: "GOOD", expectedRevision: 3 }),
      }),
    ),
  );
  await screen.findByText(/Revisões em dia/);
});
