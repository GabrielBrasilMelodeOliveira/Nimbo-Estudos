import React from "react";
import { it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, GlobalStyles } from "@mui/material";
import App from "../src/App.jsx";
import * as apiService from "../src/shared/services/api.js";
import { theme } from "../src/shared/theme/theme.js";
import { globalStyles } from "../src/shared/theme/globalStyles.js";

it("opens independent flashcards below Study and identifies the running release", async () => {
  vi.spyOn(apiService, "api").mockImplementation(async (path) => {
    const resources = {
      plan: { name: "Concurso de teste" },
      dashboard: {},
      analytics: {},
      pet: null,
    };
    return Object.hasOwn(resources, path) ? resources[path] : [];
  });
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  render(
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyles} />
      <App />
    </ThemeProvider>,
  );
  const user = userEvent.setup();
  await screen.findByText("Pronto para começar?");
  expect(screen.getByText("Nimbo v5.6.0")).toBeTruthy();
  const navigation = screen.getByRole("navigation");
  const labels = within(navigation)
    .getAllByRole("button")
    .map((button) => button.textContent);
  expect(labels.indexOf("Flashcards")).toBe(labels.indexOf("Estudar") + 1);
  await user.click(
    within(navigation).getByRole("button", { name: "Flashcards", exact: true }),
  );
  await screen.findByText(
    "Vincule um erro do caderno para começar os flashcards.",
  );
  await user.click(
    screen.getByRole("button", { name: "Vincular erros do caderno" }),
  );
  expect(
    await screen.findByRole("button", { name: "Anotar erro" }),
  ).toBeTruthy();
  expect(screen.queryByText("Atualizar fila")).toBeNull();
});
