import React from "react";
import { it, expect, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../src/shared/theme/theme.js";
import * as apiService from "../src/shared/services/api.js";
import Flashcards from "../src/pages/flashcards/Flashcards.jsx";
import { FlashcardDeck } from "../src/pages/flashcards/components/FlashcardDeck.jsx";

function makeCard(origin, question) {
  const due = new Date(Date.now() - 60000).toISOString();
  return {
    id: 1,
    origin,
    source: "Meu cartão",
    question,
    answer: "Resposta",
    discipline: "Sem disciplina",
    topic: "Estudo geral",
    due,
    revision: 0,
    nextReviews: { AGAIN: due, HARD: due, GOOD: due, EASY: due },
  };
}
const show = (element) =>
  render(<ThemeProvider theme={theme}>{element}</ThemeProvider>);

it("creates, edits and deletes a manual card without creating an error note", async () => {
  let cards = [];
  const request = vi
    .spyOn(apiService, "api")
    .mockImplementation(async (path, method, body) => {
      if (path === "flashcards/manual" && method === "POST") {
        cards = [
          {
            ...makeCard("MANUAL", body.question),
            answer: body.answer,
            source: body.title,
          },
        ];
        return cards[0];
      }
      if (method === "PUT") {
        cards = [{ ...cards[0], question: body.question, revision: 1 }];
        return cards[0];
      }
      if (method === "DELETE") {
        cards = [];
        return null;
      }
      return cards;
    });
  const action = vi.fn();
  show(
    <Flashcards
      data={{ disciplines: [], topics: [], "error-notes": [] }}
      action={action}
      working={false}
      navigate={vi.fn()}
    />,
  );
  await screen.findByText(/Crie seu primeiro flashcard/);
  fireEvent.click(screen.getByRole("button", { name: "Novo flashcard" }));
  fireEvent.change(screen.getByLabelText("Título (opcional)"), {
    target: { value: "Transações" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: "Pergunta" }), {
    target: { value: "O que é atomicidade?" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: "Resposta" }), {
    target: { value: "Tudo ou nada." },
  });
  fireEvent.click(screen.getByRole("button", { name: "Criar flashcard" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  expect(request).toHaveBeenCalledWith(
    "flashcards/manual",
    "POST",
    expect.objectContaining({
      question: "O que é atomicidade?",
      answer: "Tudo ou nada.",
      disciplineId: null,
      topicId: null,
    }),
  );
  expect(action).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button", { name: "Meus flashcards (1)" }));
  fireEvent.click(
    await screen.findByRole("button", { name: "Editar", exact: true }),
  );
  fireEvent.change(screen.getByRole("textbox", { name: "Pergunta" }), {
    target: { value: "Defina transação." },
  });
  fireEvent.click(screen.getByRole("button", { name: "Salvar alterações" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  expect(request).toHaveBeenCalledWith(
    "flashcards/manual/1",
    "PUT",
    expect.objectContaining({ expectedRevision: 0 }),
  );
  vi.spyOn(window, "confirm").mockReturnValue(true);
  fireEvent.click(screen.getByRole("button", { name: "Excluir", exact: true }));
  await screen.findByText(/Crie seu primeiro flashcard/);
  expect(request).toHaveBeenCalledWith("flashcards/manual/1", "DELETE");
});

it("keeps error and manual cards with identical ids independent when rating and undoing", async () => {
  const errorCard = makeCard("ERROR_NOTE", "Erro cadastrado");
  const manualCard = makeCard("MANUAL", "Pergunta independente");
  const request = vi
    .spyOn(apiService, "api")
    .mockImplementation(async (path) => {
      if (path.endsWith("/undo")) return { ...manualCard, revision: 2 };
      if (path.endsWith("/review"))
        return {
          ...(path.includes("manual") ? manualCard : errorCard),
          revision: 1,
          due: new Date(Date.now() + 600000).toISOString(),
        };
      return [errorCard, manualCard];
    });
  show(<FlashcardDeck />);
  await screen.findByText("Erro cadastrado");
  fireEvent.click(screen.getByRole("button", { name: "Mostrar resposta" }));
  fireEvent.click(screen.getByRole("button", { name: "Bom", exact: true }));
  await screen.findByText("Pergunta independente");
  expect(screen.queryByText("Resposta", { selector: "p" })).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Mostrar resposta" }));
  fireEvent.click(screen.getByRole("button", { name: "Bom", exact: true }));
  await screen.findByText(/Revisões em dia/);
  expect(request).toHaveBeenCalledWith("flashcards/manual/1/review", "POST", {
    rating: "GOOD",
    expectedRevision: 0,
  });
  fireEvent.click(
    screen.getByRole("button", { name: "Desfazer última avaliação" }),
  );
  await screen.findByText("Pergunta independente");
  expect(request).toHaveBeenCalledWith("flashcards/manual/1/undo", "POST", {
    expectedRevision: 1,
  });
  expect(screen.getByText("1 para revisar")).toBeTruthy();
});

it("keeps the editor and entered text open when saving fails", async () => {
  vi.spyOn(apiService, "api").mockImplementation(async (_, method) => {
    if (method === "POST") throw new Error("Não foi possível salvar.");
    return [];
  });
  show(
    <Flashcards
      data={{ disciplines: [], topics: [], "error-notes": [] }}
      action={vi.fn()}
      navigate={vi.fn()}
    />,
  );
  await screen.findByText(/Crie seu primeiro flashcard/);
  fireEvent.click(screen.getByRole("button", { name: "Novo flashcard" }));
  const dialog = within(screen.getByRole("dialog"));
  fireEvent.change(dialog.getByRole("textbox", { name: "Pergunta" }), {
    target: { value: "Minha pergunta" },
  });
  fireEvent.change(dialog.getByRole("textbox", { name: "Resposta" }), {
    target: { value: "Minha resposta" },
  });
  fireEvent.click(dialog.getByRole("button", { name: "Criar flashcard" }));
  await dialog.findByText("Não foi possível salvar.");
  expect(dialog.getByRole("textbox", { name: "Pergunta" }).value).toBe(
    "Minha pergunta",
  );
});
