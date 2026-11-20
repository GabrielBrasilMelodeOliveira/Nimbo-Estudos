import React from "react";
import { it, expect, vi } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../src/shared/theme/theme.js";
import FlashcardEditor from "../src/pages/flashcards/components/FlashcardEditor.jsx";
import { ScreenshotInput } from "../src/shared/components/ScreenshotInput.jsx";
import * as apiService from "../src/shared/services/api.js";

const data = { disciplines: [], topics: [] };
const show = (element) =>
  render(<ThemeProvider theme={theme}>{element}</ThemeProvider>);
it("uploads and pastes images on separate sides, waits for completion and saves image-only cards", async () => {
  let finishUpload;
  const upload = vi
    .spyOn(apiService, "uploadFile")
    .mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          finishUpload = resolve;
        }),
    )
    .mockResolvedValueOnce({ id: "answer-image", type: "image/jpeg" });
  const request = vi.spyOn(apiService, "api").mockResolvedValue({ id: 1 });
  const close = vi.fn();
  show(<FlashcardEditor data={data} onClose={close} onSaved={vi.fn()} />);
  const photo = new File(["pixels"], "questao.png", { type: "image/png" });
  fireEvent.change(screen.getByLabelText("Enviar Pergunta"), {
    target: { files: [photo] },
  });
  expect(screen.getByRole("button", { name: "Criar flashcard" }).disabled).toBe(
    true,
  );
  expect(screen.getByRole("button", { name: "Cancelar" }).disabled).toBe(true);
  const answer = new File(["pixels"], "print.jpg", { type: "image/jpeg" });
  fireEvent.paste(screen.getByLabelText(/^Resposta; clique aqui/), {
    clipboardData: { items: [{ type: "image/jpeg", getAsFile: () => answer }] },
  });
  await screen.findByAltText("Print da resposta");
  expect(screen.getByRole("button", { name: "Criar flashcard" }).disabled).toBe(
    true,
  );
  await act(async () =>
    finishUpload({ id: "question-image", type: "image/png" }),
  );
  expect(screen.getByAltText("Print da pergunta").getAttribute("src")).toBe(
    "/api/uploads/question-image/content",
  );
  expect(screen.getByRole("button", { name: "Criar flashcard" }).disabled).toBe(
    false,
  );
  fireEvent.click(screen.getByRole("button", { name: "Criar flashcard" }));
  await waitFor(() => expect(close).toHaveBeenCalled());
  expect(upload).toHaveBeenCalledTimes(2);
  expect(request).toHaveBeenCalledWith(
    "flashcards/manual",
    "POST",
    expect.objectContaining({
      questionImageId: "question-image",
      answerImageId: "answer-image",
      question: "",
      answer: "",
    }),
  );
});

it("preserves attachments while editing text and allows removing an image", async () => {
  const request = vi.spyOn(apiService, "api").mockResolvedValue({ id: 3 });
  show(
    <FlashcardEditor
      data={data}
      card={{
        id: 3,
        revision: 2,
        question: "Pergunta",
        answer: "Resposta",
        questionImageId: "question-image",
        answerImageId: "answer-image",
      }}
      onClose={vi.fn()}
      onSaved={vi.fn()}
    />,
  );
  fireEvent.click(
    screen.getAllByRole("button", { name: "Remover captura" })[0],
  );
  expect(screen.queryByAltText("Print da pergunta")).toBeNull();
  expect(screen.getByAltText("Print da resposta")).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: "Salvar alterações" }));
  await waitFor(() =>
    expect(request).toHaveBeenCalledWith(
      "flashcards/manual/3",
      "PUT",
      expect.objectContaining({
        questionImageId: null,
        answerImageId: "answer-image",
        expectedRevision: 2,
      }),
    ),
  );
});

it("rejects invalid files, reports upload failures and ignores paste when disabled", async () => {
  const upload = vi
    .spyOn(apiService, "uploadFile")
    .mockRejectedValue(new Error("Falha de conexão"));
  const change = vi.fn();
  const view = show(<ScreenshotInput label="Pergunta" onChange={change} />);
  fireEvent.change(screen.getByLabelText("Enviar Pergunta"), {
    target: {
      files: [new File(["pdf"], "documento.pdf", { type: "application/pdf" })],
    },
  });
  await screen.findByText("Envie uma imagem PNG, JPG ou WEBP.");
  expect(upload).not.toHaveBeenCalled();
  fireEvent.change(screen.getByLabelText("Enviar Pergunta"), {
    target: {
      files: [new File(["image"], "imagem.png", { type: "image/png" })],
    },
  });
  await screen.findByText("Falha de conexão");
  expect(change).not.toHaveBeenCalled();
  view.unmount();
  show(<ScreenshotInput label="Pergunta" onChange={change} disabled />);
  fireEvent.paste(screen.getByLabelText(/^Pergunta; clique aqui/), {
    clipboardData: {
      items: [
        {
          type: "image/png",
          getAsFile: () =>
            new File(["image"], "imagem.png", { type: "image/png" }),
        },
      ],
    },
  });
  expect(upload).toHaveBeenCalledTimes(1);
});
