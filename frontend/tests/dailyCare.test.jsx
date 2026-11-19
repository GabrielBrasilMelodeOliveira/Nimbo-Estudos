import React from "react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../src/shared/theme/theme.js";
import DayClosing from "../src/shared/sections/dayClosing/DayClosing.jsx";
import { FlashcardDeck } from "../src/pages/flashcards/components/FlashcardDeck.jsx";
import { SearchableSelect } from "../src/shared/components/SearchableSelect.jsx";
import PetCareStatus from "../src/shared/components/pet/PetCareStatus.jsx";
import { PetArt } from "../src/shared/components/Pet.jsx";

const show = (element) =>
  render(<ThemeProvider theme={theme}>{element}</ThemeProvider>);
const date = "2026-11-19";
const data = {
  "daily-progress": {
    date,
    today: {
      targetMinutes: 30,
      targetQuestions: 10,
      targetTopics: 0,
      studiedSeconds: 900,
      answeredQuestions: 4,
      studiedTopics: 1,
      outcome: "PARTIAL",
    },
    history: [],
  },
  agenda: [
    {
      id: 1,
      title: "Estudar Java",
      scheduledDate: date,
      category: "PERSONAL",
      version: 3,
    },
    {
      id: 2,
      title: "Caminhar",
      scheduledDate: date,
      category: "HEALTH",
      version: 8,
      completed: true,
    },
    {
      id: 3,
      title: "Rever português",
      scheduledDate: "2026-11-18",
      category: "PERSONAL",
      version: 2,
    },
  ],
};

describe("Fechamento do dia", () => {
  it("shows planned and completed counts and reschedules selected pending items with versions", async () => {
    const action = vi.fn().mockResolvedValue(true);
    show(<DayClosing data={data} action={action} working={false} />);
    expect(screen.getByText("2 planejadas hoje")).toBeTruthy();
    expect(screen.getByText("1 concluídas")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Revisar atividades/ }));
    fireEvent.click(
      screen.getByLabelText("Incluir pendências de dias anteriores"),
    );
    fireEvent.click(screen.getByRole("checkbox", { name: /Estudar Java/ }));
    fireEvent.click(
      screen.getByRole("button", { name: "Reagendar 1 pendência(s)" }),
    );
    await waitFor(() =>
      expect(action).toHaveBeenCalledWith(
        "agenda/reschedule",
        "POST",
        { scheduledDate: "2026-11-20", items: [{ id: 3, expectedVersion: 2 }] },
        expect.any(String),
      ),
    );
    expect(screen.queryByRole("checkbox", { name: /Caminhar/ })).toBeNull();
  });
  it("edits daily numeric targets independently from the weekly goal", async () => {
    const action = vi.fn().mockResolvedValue(true);
    show(<DayClosing data={data} action={action} working={false} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Editar metas diárias" }),
    );
    fireEvent.change(
      screen.getByRole("spinbutton", { name: "Minutos de estudo" }),
      { target: { value: "45" } },
    );
    fireEvent.click(screen.getByRole("button", { name: "Salvar metas" }));
    await waitFor(() =>
      expect(action).toHaveBeenCalledWith(
        "daily-progress",
        "PUT",
        { targetMinutes: 45, targetQuestions: 10, targetTopics: 0 },
        expect.any(String),
      ),
    );
  });
});

const makeCard = (id, discipline, disciplineId) => ({
  id,
  discipline,
  disciplineId,
  revision: 0,
  question: `Pergunta ${id}`,
  answer: `Resposta ${id}`,
  topic: "Assunto",
  source: "Prova",
  due: new Date(Date.now() - 10000).toISOString(),
  nextReviews: Object.fromEntries(
    ["AGAIN", "HARD", "GOOD", "EASY"].map((rating) => [
      rating,
      new Date(Date.now() + 600000).toISOString(),
    ]),
  ),
});
const response = (payload) => ({
  ok: true,
  status: 200,
  headers: new Headers({ "content-type": "application/json" }),
  text: async () => JSON.stringify(payload),
});

describe("Flashcards com atalhos", () => {
  it("filters by discipline, protects typing, rates once and undoes the latest schedule", async () => {
    const cards = [makeCard(1, "Java", 1), makeCard(2, "Português", 2)];
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockImplementation(async (url) => {
        if (url.endsWith("/undo"))
          return response({ ...cards[1], revision: 2 });
        if (url.endsWith("/review"))
          return response({
            ...cards[1],
            revision: 1,
            due: new Date(Date.now() + 600000).toISOString(),
          });
        return response(cards);
      });
    show(<FlashcardDeck />);
    await screen.findByText("Pergunta 1");
    const filter = screen.getByRole("combobox", {
      name: "Filtrar cartões por disciplina",
    });
    const user = userEvent.setup();
    await user.click(filter);
    await user.clear(filter);
    await user.type(filter, "Português");
    fireEvent.click(await screen.findByRole("option", { name: "Português" }));
    await screen.findByText("Pergunta 2");
    fireEvent.keyDown(window, { key: "3", code: "Digit3" });
    expect(
      fetchMock.mock.calls.filter(([url]) => url.endsWith("/review")),
    ).toHaveLength(0);
    fireEvent.keyDown(window, { key: " ", code: "Space" });
    expect(screen.getByText("Resposta 2")).toBeTruthy();
    fireEvent.keyDown(filter, { key: "3", code: "Digit3" });
    expect(
      fetchMock.mock.calls.filter(([url]) => url.endsWith("/review")),
    ).toHaveLength(0);
    fireEvent.keyDown(window, { key: "3", code: "Digit3" });
    fireEvent.keyDown(window, { key: "3", code: "Digit3", repeat: true });
    await screen.findByText(/Revisões em dia/);
    expect(
      fetchMock.mock.calls.filter(([url]) => url.endsWith("/review")),
    ).toHaveLength(1);
    fireEvent.keyDown(window, { key: "z", code: "KeyZ" });
    await screen.findByText("Pergunta 2");
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/flashcards/2/undo",
      expect.objectContaining({
        body: JSON.stringify({ expectedRevision: 1 }),
      }),
    );
    expect(screen.queryByText("Resposta 2")).toBeNull();
    expect(screen.getByText("0 revisados nesta sessão")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Desfazer última avaliação" })
        .disabled,
    ).toBe(true);
  });
  it("keeps the queue and displays a failure if undo conflicts with another review", async () => {
    const card = makeCard(1, "Java", 1);
    vi.spyOn(globalThis, "fetch").mockImplementation(async (url) => {
      if (url.endsWith("/undo"))
        return {
          ok: false,
          status: 409,
          json: async () => ({ error: "Esta avaliação mudou em outra aba." }),
        };
      return response(
        url.endsWith("/review")
          ? {
              ...card,
              revision: 1,
              due: new Date(Date.now() + 600000).toISOString(),
            }
          : [card],
      );
    });
    show(<FlashcardDeck />);
    await screen.findByText("Pergunta 1");
    fireEvent.click(screen.getByRole("button", { name: "Mostrar resposta" }));
    fireEvent.click(screen.getByRole("button", { name: "Bom" }));
    await screen.findByText(/Revisões em dia/);
    fireEvent.click(
      screen.getByRole("button", { name: "Desfazer última avaliação" }),
    );
    await screen.findByText("Esta avaliação mudou em outra aba.");
    expect(screen.queryByText("Pergunta 1")).toBeNull();
    expect(screen.getByText("1 revisados nesta sessão")).toBeTruthy();
  });
});

describe("Nimbo diário", () => {
  it("shows the authoritative speech and requires explicit restart after death", async () => {
    const action = vi.fn().mockResolvedValue(true);
    show(
      <PetCareStatus
        pet={{
          id: 9,
          xp: 800,
          message: "Esta vida terminou.",
          care: {
            dead: true,
            moodLabel: "Jornada encerrada",
            streak: 0,
            lifeNumber: 1,
            deathDate: date,
          },
        }}
        action={action}
        working={false}
      />,
    );
    expect(screen.getByText("Esta vida terminou.")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Recomeçar uma vida" }));
    expect(action).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Iniciar nova vida" }));
    await waitFor(() =>
      expect(action).toHaveBeenCalledWith(
        "pet/9/restart",
        "POST",
        undefined,
        expect.any(String),
      ),
    );
  });
  it("renders distinct facial states with accessible descriptions and reduced-motion support", () => {
    show(
      <>
        {[
          "hungry",
          "tired",
          "sad",
          "angry",
          "dead",
          "neutral",
          "happy",
          "proud",
          "excited",
          "radiant",
          "legendary",
        ].map((mood) => (
          <PetArt key={mood} mood={mood} />
        ))}
      </>,
    );
    expect(screen.getAllByRole("img")).toHaveLength(11);
    for (const label of [
      "com fome",
      "cansado",
      "triste",
      "irritado",
      "jornada encerrada",
      "neutro",
      "feliz",
      "orgulhoso",
      "empolgado",
      "radiante",
      "lendário",
    ])
      expect(
        screen.getByRole("img", { name: new RegExp(` · ${label}$`) }),
      ).toBeTruthy();
    expect(document.querySelectorAll(".pet-tear").length).toBe(2);
  });
});

it("preserves an autocomplete search when parent data refreshes", async () => {
  const user = userEvent.setup();
  const control = () => (
    <ThemeProvider theme={theme}>
      <SearchableSelect label="Disciplina" value="1" onChange={() => {}}>
        <option value="1">Java</option>
        <option value="2">Português</option>
      </SearchableSelect>
    </ThemeProvider>
  );
  const { rerender } = render(control());
  const input = screen.getByRole("combobox", { name: "Disciplina" });
  await user.click(input);
  await user.clear(input);
  await user.type(input, "Port");
  rerender(control());
  expect(input.value).toBe("Port");
  expect(await screen.findByRole("option", { name: "Português" })).toBeTruthy();
});
