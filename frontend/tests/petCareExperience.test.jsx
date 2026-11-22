import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import { ThemeProvider } from "@mui/material";
import { theme } from "../src/shared/theme/theme.js";
import PetCompanion from "../src/shared/components/PetCompanion.jsx";
import { PetArt } from "../src/shared/components/Pet.jsx";
import DailyStudyPlan from "../src/pages/weeklyPlanner/components/DailyStudyPlan.jsx";
import usePetCareSession from "../src/shared/hooks/usePetCareSession.js";
import * as apiService from "../src/shared/services/api.js";
import { companionPrompt } from "../src/shared/utils/companionPrompt.js";
import { TODAY } from "../src/shared/utils/utils.js";
const show = (element) =>
  render(<ThemeProvider theme={theme}>{element}</ThemeProvider>);
const pet = {
  id: 1,
  species: "nori",
  stage: 3,
  level: 5,
  xp: 400,
  mood: "neutral",
  care: { dead: false, streak: 0 },
  vitals: {
    activity: "IDLE",
    satiety: 80,
    energy: 80,
    readiness: 80,
    carePoints: 0,
    canTrain: true,
    canEat: true,
    canRest: false,
    restHint: "Para dormir: conclua um treino e coma.",
  },
};
afterEach(() => {
  vi.useRealTimers();
  localStorage.clear();
});
it("shows three care actions, real study guidance and no audio or chat controls", () => {
  localStorage.setItem("nimbo:open", "true");
  const action = vi.fn();
  const navigate = vi.fn();
  show(
    <PetCompanion
      pet={pet}
      action={action}
      navigate={navigate}
      data={{ reviews: [{ dueDate: TODAY() }] }}
    />,
  );
  expect(
    screen
      .getByRole("progressbar", { name: "Saciedade" })
      .getAttribute("aria-valuenow"),
  ).toBe("80");
  expect(screen.getByRole("button", { name: "Treinar" }).disabled).toBe(false);
  expect(screen.getByRole("button", { name: "Descansar" }).disabled).toBe(true);
  expect(
    screen.queryByRole("button", { name: /voz|Conversar|Enviar mensagem/i }),
  ).toBeNull();
  expect(screen.queryByRole("textbox")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Comer" }));
  expect(action).toHaveBeenCalledWith(
    "pet/interact",
    "POST",
    { action: "FEED" },
    expect.any(String),
  );
  fireEvent.click(screen.getByRole("button", { name: /Enfrentar revisões/ }));
  expect(navigate).toHaveBeenCalledWith("reviews", undefined);
});
it.each(["TRAINING", "EATING", "SLEEPING", "CELEBRATING"])(
  "renders %s without changing the class",
  (activity) => {
    show(<PetArt species="nori" stage={7} activity={activity} />);
    const owl = screen.getByRole("img");
    expect(owl.getAttribute("data-activity")).toBe(activity);
    expect(owl.getAttribute("aria-label")).toContain("Lenda da Constância");
    if (activity === "TRAINING")
      expect(owl.querySelector('[data-headwear="GOGGLES"]')).toBeTruthy();
    if (activity === "SLEEPING")
      expect(owl.querySelector('[data-eye-state="closed"]')).toBeTruthy();
  },
);
function SessionHarness({ value, update }) {
  const state = usePetCareSession(value, update);
  return <p>{state.notice || "Sem novidade"}</p>;
}
it("pauses presence when hidden, avoids background heartbeats and resumes without submitting elapsed time", async () => {
  vi.useFakeTimers();
  const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(false);
  const current = {
    ...pet,
    vitals: { ...pet.vitals, activity: "TRAINING", trainingSeconds: 0 },
  };
  const request = vi.spyOn(apiService, "api").mockResolvedValue(current);
  const view = render(<SessionHarness value={current} update={vi.fn()} />);
  await act(async () => {});
  expect(request).toHaveBeenLastCalledWith("pet/1/presence", "POST", {
    present: true,
  });
  hidden.mockReturnValue(true);
  await act(async () => document.dispatchEvent(new Event("visibilitychange")));
  expect(request).toHaveBeenLastCalledWith("pet/1/presence", "POST", {
    present: false,
  });
  const count = request.mock.calls.length;
  await act(async () => vi.advanceTimersByTime(60000));
  expect(request).toHaveBeenCalledTimes(count);
  hidden.mockReturnValue(false);
  await act(async () => document.dispatchEvent(new Event("visibilitychange")));
  expect(request).toHaveBeenLastCalledWith("pet/1/presence", "POST", {
    present: true,
  });
  view.unmount();
  await act(async () => vi.advanceTimersByTime(60000));
  expect(request).toHaveBeenCalledTimes(count + 1);
});
it("celebrates server-confirmed completion only once across remounts", async () => {
  const completed = {
    ...pet,
    vitals: {
      ...pet.vitals,
      trainedAt: "2026-11-21T14:00:00Z",
      carePoints: 20,
    },
  };
  const view = render(<SessionHarness value={completed} update={vi.fn()} />);
  expect(await screen.findByText(/Treino concluído! \+20/)).toBeTruthy();
  view.unmount();
  render(<SessionHarness value={completed} update={vi.fn()} />);
  expect(screen.getByText("Sem novidade")).toBeTruthy();
});
it("points to the planned discipline and preserves urgent study warnings", () => {
  const prompt = companionPrompt(pet, {
    "study-plan": [
      { studyDate: TODAY(), disciplines: [{ id: 8, name: "Java" }] },
    ],
  });
  expect(prompt.options).toEqual({ disciplineId: 8 });
  expect(prompt.text).toContain("Java");
  expect(
    companionPrompt({
      ...pet,
      care: { missedDays: 3 },
      message: "Estude hoje para manter esta vida.",
    }).text,
  ).toContain("manter esta vida");
});
const day = "2026-11-21";
const disciplines = [
  { id: 1, name: "Java" },
  { id: 2, name: "Português" },
  { id: 3, name: "Spring" },
];
const planningData = {
  disciplines,
  "study-plan": [{ studyDate: day, disciplines: disciplines.slice(0, 2) }],
};
it("removes one discipline from the day without deleting curriculum data", () => {
  const action = vi.fn();
  show(<DailyStudyPlan day={day} data={planningData} action={action} />);
  fireEvent.click(
    screen.getByRole("button", { name: "Retirar Java de 21/11/2026" }),
  );
  expect(action).toHaveBeenCalledWith(
    `study-plan/${day}`,
    "PUT",
    { disciplineIds: [2] },
    expect.any(String),
  );
});
it("edits an existing plan with autocomplete and clears the day explicitly", async () => {
  const user = userEvent.setup();
  const action = vi.fn().mockResolvedValue(true);
  show(<DailyStudyPlan day={day} data={planningData} action={action} />);
  await user.click(screen.getByRole("button", { name: "Alterar disciplinas" }));
  const field = screen.getByRole("combobox", { name: "Disciplina 1" });
  await user.clear(field);
  await user.type(field, "Spr");
  await user.click(await screen.findByRole("option", { name: "Spring" }));
  await user.click(screen.getByRole("button", { name: "Salvar planejamento" }));
  expect(action).toHaveBeenCalledWith(
    `study-plan/${day}`,
    "PUT",
    { disciplineIds: [3, 2] },
    expect.any(String),
  );
  await user.click(screen.getByRole("button", { name: "Alterar disciplinas" }));
  await user.click(
    screen.getByRole("button", { name: "Limpar planejamento do dia" }),
  );
  expect(action).toHaveBeenLastCalledWith(
    `study-plan/${day}`,
    "PUT",
    { disciplineIds: [] },
    expect.any(String),
  );
});
