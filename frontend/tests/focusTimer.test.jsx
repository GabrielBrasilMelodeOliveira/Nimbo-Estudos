import React, { useState } from "react";
import { it, expect, vi, afterEach } from "vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../src/shared/theme/theme.js";
import { FocusTimerProvider } from "../src/shared/hooks/FocusTimerContext.jsx";
import FocusTimer from "../src/shared/components/focus/FocusTimer.jsx";
import FocusTimerOverlay from "../src/shared/components/focus/FocusTimerOverlay.jsx";
const discipline = { id: 1, name: "Java" };
const data = {
  disciplines: [discipline],
  topics: [{ id: 2, title: "Transações", discipline }],
};
afterEach(() => {
  vi.useRealTimers();
  sessionStorage.clear();
});
function Harness({ action, kind }) {
  const [page, setPage] = useState(kind === "THEORY" ? "cycle" : "questions");
  return (
    <ThemeProvider theme={theme}>
      <FocusTimerProvider data={data} action={action}>
        <button onClick={() => setPage("dashboard")}>Outra página</button>
        {page !== "dashboard" && (
          <FocusTimer
            data={data}
            kind={kind}
            focusDisciplineId="1"
            focusTopicId={kind === "QUESTIONS" ? "2" : ""}
          />
        )}
        <FocusTimerOverlay page={page} navigate={setPage} action={action} />
      </FocusTimerProvider>
    </ThemeProvider>
  );
}
it.each(["THEORY", "QUESTIONS"])(
  "keeps %s running across navigation and saves from the floating clock",
  async (kind) => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-19T12:00:00"));
    sessionStorage.clear();
    const action = vi.fn().mockResolvedValueOnce(false).mockResolvedValue(true);
    render(<Harness kind={kind} action={action} />);
    fireEvent.click(screen.getByRole("button", { name: "Iniciar estudo" }));
    act(() => vi.advanceTimersByTime(3000));
    fireEvent.click(screen.getByRole("button", { name: "Outra página" }));
    act(() => vi.advanceTimersByTime(2000));
    expect(
      within(
        screen.getByRole("region", { name: "Cronômetro em andamento" }),
      ).getByText("00:00:05"),
    ).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: "Finalizar e registrar" }),
    );
    if (kind === "QUESTIONS") {
      fireEvent.change(
        screen.getByRole("spinbutton", { name: "Questões resolvidas" }),
        { target: { value: "10" } },
      );
      fireEvent.change(screen.getByRole("spinbutton", { name: "Acertos" }), {
        target: { value: "7" },
      });
    }
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "Salvar sessão" })),
    );
    expect(
      screen.getByRole("dialog", { name: "Registrar sessão de foco" }),
    ).toBeTruthy();
    act(() => vi.advanceTimersByTime(5000));
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "Salvar sessão" })),
    );
    expect(action).toHaveBeenLastCalledWith(
      kind === "THEORY" ? "study-sessions" : "questions",
      "POST",
      expect.objectContaining({
        durationSeconds: 5,
        ...(kind === "THEORY"
          ? { kind: "THEORY", disciplineId: 1 }
          : { topicId: 2, total: 10, correct: 7 }),
      }),
      expect.any(String),
    );
    expect(
      screen.queryByRole("region", { name: "Cronômetro em andamento" }),
    ).toBeNull();
  },
);
