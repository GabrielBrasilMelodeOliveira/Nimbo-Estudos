import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import { ThemeProvider } from "@mui/material";
import { theme } from "../src/shared/theme/theme.js";
import OwlCustomizer from "../src/pages/collection/components/OwlCustomizer.jsx";
import { PetArt } from "../src/shared/components/Pet.jsx";
import PetCompanion from "../src/shared/components/PetCompanion.jsx";
import { owlDefaults } from "../src/shared/components/pet/owlAppearance.js";
import { recoverCompanion } from "../src/shared/utils/companionRecovery.js";
import * as apiService from "../src/shared/services/api.js";
import App from "../src/App.jsx";
import { focusStorageKey, freshFocus } from "../src/shared/utils/focusClock.js";

const pet = {
  id: 4,
  species: "nori",
  stage: 5,
  level: 18,
  xp: 1700,
  energy: 65,
  mood: "neutral",
  appearance: { ...owlDefaults },
  care: { moodLabel: "Neutro", streak: 0 },
};
const show = (children) =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

it("previews paths, colors and accessories, then saves only customization without granting preview XP", async () => {
  const user = userEvent.setup();
  const action = vi.fn().mockResolvedValue(true);
  const close = vi.fn();
  show(<OwlCustomizer pet={pet} action={action} onClose={close} />);
  await user.click(screen.getByRole("button", { name: "Mago", exact: true }));
  fireEvent.change(screen.getByLabelText("Cor das penas", { exact: true }), {
    target: { value: "#AB8DD8" },
  });
  await user.click(
    screen.getByRole("combobox", { name: "Acessório de cabeça" }),
  );
  await user.click(
    screen.getByRole("option", { name: "Óculos de explorador" }),
  );
  await user.click(
    screen.getByRole("combobox", { name: "Acessório do corpo" }),
  );
  await user.click(screen.getByRole("option", { name: "Capa", exact: true }));
  fireEvent.change(screen.getByRole("slider", { name: "Prévia da evolução" }), {
    target: { value: 7 },
  });
  expect(screen.getByRole("img").getAttribute("aria-label")).toContain(
    "Lenda da Constância",
  );
  expect(document.querySelector('[data-headwear="GOGGLES"]')).toBeTruthy();
  expect(document.querySelector('[data-body-accessory="CAPE"]')).toBeTruthy();
  await user.click(screen.getByRole("button", { name: "Salvar aparência" }));
  expect(action).toHaveBeenCalledWith(
    "pet/4/appearance",
    "PUT",
    {
      ...owlDefaults,
      path: "MAGE",
      featherColor: "#AB8DD8",
      headAccessory: "GOGGLES",
      bodyAccessory: "CAPE",
    },
    expect.any(String),
  );
  expect(close).toHaveBeenCalledOnce();
  expect(pet.xp).toBe(1700);
});

it("preserves edited values when saving fails and rejects invalid color input", async () => {
  const action = vi.fn().mockResolvedValue(false);
  const close = vi.fn();
  show(<OwlCustomizer pet={pet} action={action} onClose={close} />);
  fireEvent.change(screen.getByLabelText("Cor dos olhos", { exact: true }), {
    target: { value: "#oops" },
  });
  expect(
    screen.getByRole("button", { name: "Salvar aparência" }).disabled,
  ).toBe(true);
  fireEvent.change(screen.getByLabelText("Cor dos olhos", { exact: true }), {
    target: { value: "#ABCDEF" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Salvar aparência" }));
  expect(await screen.findByRole("alert")).toBeTruthy();
  expect(screen.getByLabelText("Cor dos olhos", { exact: true }).value).toBe(
    "#ABCDEF",
  );
  expect(close).not.toHaveBeenCalled();
  fireEvent.click(
    screen.getByRole("button", { name: "Restaurar visual azul original" }),
  );
  expect(screen.getByLabelText("Cor dos olhos", { exact: true }).value).toBe(
    owlDefaults.eyeColor,
  );
});

it("does not save canceled edits and keeps stored choices when reopened", () => {
  const action = vi.fn();
  const close = vi.fn();
  show(
    <OwlCustomizer
      pet={{
        ...pet,
        appearance: { ...owlDefaults, featherColor: "#ABCDEF", path: "MAGE" },
      }}
      action={action}
      onClose={close}
    />,
  );
  expect(screen.getByLabelText("Cor das penas", { exact: true }).value).toBe(
    "#ABCDEF",
  );
  expect(
    screen
      .getByRole("button", { name: "Mago", exact: true })
      .getAttribute("aria-pressed"),
  ).toBe("true");
  fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
  expect(close).toHaveBeenCalledOnce();
  expect(action).not.toHaveBeenCalled();
});

it.each([
  ["WARRIOR", "sword", "Mestre de Batalha"],
  ["MAGE", "staff", "Mestre Arcano"],
  ["RANGER", "bow", "Mestre Rastreador"],
])(
  "renders %s equipment with persistent custom colors",
  (path, equipment, title) => {
    const { container } = show(
      <PetArt
        stage={5}
        appearance={{
          ...owlDefaults,
          path,
          featherColor: "#ABCDEF",
          bodyAccessory: "NONE",
          headAccessory: "NONE",
        }}
      />,
    );
    expect(
      container.querySelector(`[data-equipment="${equipment}"]`),
    ).toBeTruthy();
    expect(container.querySelector('[fill="#ABCDEF"]')).toBeTruthy();
    expect(
      container.querySelector('[data-body-accessory="SATCHEL"]'),
    ).toBeNull();
    expect(container.querySelector('[data-headwear="NONE"]')).toBeTruthy();
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain(title);
  },
);

it("recovers an orb saved behind the sidebar, re-clamps on resize and stays above the drawer", async () => {
  localStorage.setItem("nimbo:position", JSON.stringify({ x: 0.01, y: 0.8 }));
  const sidebar = document.createElement("aside");
  sidebar.setAttribute("aria-label", "Barra lateral principal");
  document.body.append(sidebar);
  let width = 244;
  vi.spyOn(sidebar, "getBoundingClientRect").mockImplementation(() => ({
    right: width,
    width,
    top: 0,
    bottom: 768,
    left: 0,
    height: 768,
  }));
  try {
    show(<PetCompanion pet={pet} action={vi.fn()} navigate={vi.fn()} />);
    let orb = screen.getByRole("button", { name: "Abrir companheiro Nimbo" });
    expect(parseFloat(getComputedStyle(orb.parentElement).left)).toBe(252);
    expect(Number(getComputedStyle(orb.parentElement).zIndex)).toBeGreaterThan(
      theme.zIndex.drawer,
    );
    expect(orb.parentElement.parentElement).toBe(document.body);
    width = 300;
    fireEvent(window, new Event("resize"));
    expect(parseFloat(getComputedStyle(orb.parentElement).left)).toBe(308);
    fireEvent.click(orb);
    expect(
      screen.getByRole("region", { name: "Seu companheiro Nimbo" }),
    ).toBeTruthy();
    act(() => recoverCompanion());
    orb = screen.getByRole("button", { name: "Abrir companheiro Nimbo" });
    expect(
      screen.queryByRole("region", { name: "Seu companheiro Nimbo" }),
    ).toBeNull();
    expect(parseFloat(getComputedStyle(orb.parentElement).left)).toBe(
      window.innerWidth - 76,
    );
    expect(localStorage.getItem("nimbo:open")).toBe("false");
  } finally {
    sidebar.remove();
  }
});

it("keeps the owl visible when a saved study clock is active and offers sidebar recovery", async () => {
  sessionStorage.setItem(
    focusStorageKey,
    JSON.stringify({ ...freshFocus(), disciplineId: "1", elapsedMs: 10000 }),
  );
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  vi.spyOn(apiService, "api").mockImplementation(async (path) => {
    const resources = {
      plan: {},
      dashboard: {},
      analytics: {},
      pet,
      disciplines: [{ id: 1, name: "Java" }],
    };
    return Object.hasOwn(resources, path) ? resources[path] : [];
  });
  show(<App />);
  expect(
    await screen.findByRole("button", { name: "Abrir companheiro Nimbo" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("region", { name: "Cronômetro em andamento" }),
  ).toBeTruthy();
  fireEvent.click(
    screen.getByRole("button", { name: "Recuperar companheiro" }),
  );
  await waitFor(() =>
    expect(
      screen.getByRole("button", { name: "Abrir companheiro Nimbo" }),
    ).toBeTruthy(),
  );
});

it("keeps the orb above the floating clock on small screens", () => {
  const originalWidth = window.innerWidth;
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    value: 360,
  });
  const clock = document.createElement("section");
  clock.setAttribute("aria-label", "Cronômetro em andamento");
  document.body.append(clock);
  vi.spyOn(clock, "getBoundingClientRect").mockReturnValue({
    top: window.innerHeight - 140,
    height: 124,
    bottom: window.innerHeight - 16,
    left: 12,
    right: 348,
    width: 336,
  });
  try {
    show(<PetCompanion pet={pet} action={vi.fn()} navigate={vi.fn()} />);
    const orb = screen.getByRole("button", { name: "Abrir companheiro Nimbo" });
    expect(
      parseFloat(getComputedStyle(orb.parentElement).top) + 60,
    ).toBeLessThan(clock.getBoundingClientRect().top);
    act(() => recoverCompanion());
    expect(
      parseFloat(getComputedStyle(orb.parentElement).top) + 60,
    ).toBeLessThan(clock.getBoundingClientRect().top);
  } finally {
    clock.remove();
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: originalWidth,
    });
  }
});
