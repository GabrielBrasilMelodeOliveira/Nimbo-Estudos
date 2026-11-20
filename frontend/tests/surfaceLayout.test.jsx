import React from "react";
import { it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, GlobalStyles } from "@mui/material";
import { theme } from "../src/shared/theme/theme.js";
import { globalStyles } from "../src/shared/theme/globalStyles.js";
import { Panel } from "../src/shared/components/UI.jsx";
import { SearchableSelect } from "../src/shared/components/SearchableSelect.jsx";
import ErrorNotes from "../src/pages/errorNotes/ErrorNotes.jsx";
import StudySummary from "../src/pages/dashboard/sections/StudySummary.jsx";
const show = (element) =>
  render(
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyles} />
      <div className="nimbo-theme ux-v54">{element}</div>
    </ThemeProvider>,
  );

it("uses the same neutral border on panels and resting filter inputs", () => {
  show(
    <Panel title="Filtros">
      <SearchableSelect label="Disciplina" value="all">
        <option value="all">Todas as disciplinas</option>
      </SearchableSelect>
    </Panel>,
  );
  const panel = screen.getByText("Filtros").closest("section");
  expect(panel.className).toContain("MuiPaper-root");
  expect(getComputedStyle(panel).boxShadow).not.toBe("none");
  expect(getComputedStyle(panel).boxShadow).toContain("rgba(0, 0, 0");
  const outline = panel.querySelector(".MuiOutlinedInput-notchedOutline");
  expect(getComputedStyle(panel).borderTopColor).toBe("rgb(208, 208, 208)");
  expect(getComputedStyle(outline).borderTopColor).toBe("rgb(208, 208, 208)");
});

it("separates error notebook filters, statistics and notes by 24 pixels", () => {
  show(
    <ErrorNotes
      data={{ disciplines: [], topics: [], "error-notes": [] }}
      action={vi.fn()}
    />,
  );
  const filters = screen.getByText("Encontrar anotação").closest("section");
  const statistics = screen
    .getByText("ERROS FILTRADOS")
    .closest(".mini-metric-grid");
  const notes = screen.getByText("Minhas anotações").closest("section");
  expect(statistics.parentElement).toBe(filters.parentElement);
  expect(notes.parentElement).toBe(filters.parentElement);
  for (const metric of statistics.children) {
    expect(metric.className).toContain("MuiPaper-root");
    expect(getComputedStyle(metric).boxShadow).not.toBe("none");
  }
  expect(getComputedStyle(statistics).marginTop).toBe("24px");
  expect(getComputedStyle(notes).marginTop).toBe("24px");
});

it("gives both home charts equal desktop columns with a single column on small screens", () => {
  show(
    <StudySummary
      daily={[]}
      questions={[]}
      weekly={0}
      goalSeconds={3600}
      navigate={vi.fn()}
    />,
  );
  const timeChart = screen.getByRole("region", {
    name: "Tempo de estudo nos últimos 7 dias",
  });
  const questionChart = screen.getByRole("region", {
    name: "Questões resolvidas nos últimos 7 dias",
  });
  const layout = timeChart.parentElement;
  expect(layout).toBe(questionChart.parentElement);
  const columns = [];
  const inspect = (rules) => {
    for (const rule of rules) {
      if (
        rule.selectorText &&
        layout.matches(rule.selectorText) &&
        rule.style?.getPropertyValue("grid-template-columns")
      )
        columns.push(
          rule.style
            .getPropertyValue("grid-template-columns")
            .replace(/0px/g, "0"),
        );
      if (rule.cssRules) inspect(rule.cssRules);
    }
  };
  for (const sheet of document.styleSheets) inspect(sheet.cssRules);
  expect(columns).toContain("repeat(2, minmax(0, 1fr))");
  expect(columns).toContain("minmax(0, 1fr)");
});
