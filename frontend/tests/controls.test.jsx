import React, { useState } from "react";
import { it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material";
import { theme } from "../src/shared/theme/theme.js";
import { TopicSelect } from "../src/shared/components/UI.jsx";
import Reviews from "../src/pages/reviews/Reviews.jsx";
it("filters subjects by typing, selects a string id and clears selection", async () => {
  const onChange = vi.fn();
  function Selector() {
    const [value, setValue] = useState("");
    return (
      <TopicSelect
        topics={[
          { id: 1, title: "Java", discipline: { name: "TI" } },
          { id: 2, title: "Gramática", discipline: { name: "Português" } },
        ]}
        value={value}
        onChange={(selected) => {
          setValue(selected);
          onChange(selected);
        }}
        required={false}
      />
    );
  }
  render(
    <ThemeProvider theme={theme}>
      <Selector />
    </ThemeProvider>,
  );
  const user = userEvent.setup();
  await user.type(screen.getByRole("combobox"), "jav");
  expect(screen.getByRole("option", { name: "Java" })).toBeTruthy();
  expect(screen.queryByRole("option", { name: "Gramática" })).toBeNull();
  await user.click(screen.getByRole("option", { name: "Java" }));
  expect(onChange).toHaveBeenLastCalledWith("1");
  await user.click(screen.getByRole("button", { name: "Limpar assunto" }));
  expect(onChange).toHaveBeenLastCalledWith("");
});
it("preserves review tab labels when switching views", async () => {
  render(
    <ThemeProvider theme={theme}>
      <Reviews data={{ reviews: [] }} action={vi.fn()} navigate={vi.fn()} />
    </ThemeProvider>,
  );
  const user = userEvent.setup();
  for (const label of ["Próximas (0)", "Histórico (0)", "Pendentes (0)"]) {
    await user.click(screen.getByRole("tab", { name: label }));
    expect(
      screen.getByRole("tab", { name: label }).getAttribute("aria-selected"),
    ).toBe("true");
    expect(screen.getAllByRole("tab").map((tab) => tab.textContent)).toEqual([
      "Pendentes (0)",
      "Próximas (0)",
      "Histórico (0)",
    ]);
  }
});

it("searches shared lists by typing and validates actual selection", async () => {
  const { SearchableSelect } =
    await import("../src/shared/components/FormControls.jsx");
  const onChange = vi.fn();
  function Selector() {
    const [value, setValue] = useState("");
    return (
      <SearchableSelect
        label="Disciplina"
        required
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
      >
        <option value="">Selecione a disciplina</option>
        <option value={1}>Português</option>
        <option value={2}>Matemática</option>
      </SearchableSelect>
    );
  }
  render(
    <ThemeProvider theme={theme}>
      <Selector />
    </ThemeProvider>,
  );
  const user = userEvent.setup();
  const input = screen.getByRole("combobox", { name: /Disciplina/ });
  expect(input.checkValidity()).toBe(false);
  await user.clear(input);
  await user.type(input, "matematica");
  expect(screen.queryByRole("option", { name: "Português" })).toBeNull();
  await user.click(screen.getByRole("option", { name: "Matemática" }));
  expect(onChange).toHaveBeenLastCalledWith("2");
  expect(input.checkValidity()).toBe(true);
});

it("links errors from the notebook without embedding the review deck", async () => {
  const { default: ErrorNotes } =
    await import("../src/pages/errorNotes/ErrorNotes.jsx");
  const action = vi.fn();
  const discipline = { id: 1, name: "TI" };
  const topic = { id: 2, title: "Java", discipline };
  render(
    <ThemeProvider theme={theme}>
      <ErrorNotes
        data={{
          disciplines: [discipline],
          topics: [topic],
          "error-notes": [
            {
              id: 42,
              topic,
              source: "Prova",
              trap: "Transação",
              correctAnswer: "Atomicidade",
              createdAt: "2026-11-18",
              flashcardEnabled: false,
            },
          ],
        }}
        action={action}
        navigate={vi.fn()}
      />
    </ThemeProvider>,
  );
  await userEvent.click(
    screen.getByRole("button", { name: "Vincular aos flashcards" }),
  );
  expect(action).toHaveBeenCalledWith(
    "flashcards/42/link",
    "PATCH",
    { enabled: true },
    expect.any(String),
  );
  expect(screen.queryByRole("tab", { name: "Flashcards" })).toBeNull();
  expect(screen.queryByRole("button", { name: "Mostrar resposta" })).toBeNull();
});
