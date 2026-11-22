import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "@mui/material";
import { theme } from "../src/shared/theme/theme.js";
import { PetArt, PetPicker } from "../src/shared/components/Pet.jsx";
import PetProgression, {
  PetClassProgress,
} from "../src/shared/components/pet/PetProgression.jsx";
import { petMotion } from "../src/shared/components/pet/petMotion.js";
import { classNamesByPath } from "../src/shared/components/pet/owlAppearance.js";
const heroClassNames = classNamesByPath.WARRIOR;

const show = (children) =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
const journey = heroClassNames.map((name, index) => ({
  rank: index + 1,
  name,
  minimumExperience: [0, 200, 400, 800, 1200, 2400, 4000][index],
  minimumLevel: [1, 3, 5, 9, 13, 25, 41][index],
}));
const pet = {
  species: "luma",
  stage: 5,
  xp: 1700,
  classJourney: journey,
  career: {
    current: journey[4],
    next: journey[5],
    experienceWithinClass: 500,
    experienceToNextClass: 1200,
    remainingExperience: 700,
  },
};

describe("pixel hero evolution", () => {
  it("changes equipment at each class and preserves the chosen appearance", () => {
    const { container, rerender } = show(<PetArt species="luma" stage={1} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain(
      "Nimbo Lavanda · Coruja Viajante",
    );
    expect(
      container.querySelector('[data-body-accessory="SATCHEL"]'),
    ).toBeTruthy();
    for (let rank = 2; rank <= 7; rank++) {
      rerender(
        <ThemeProvider theme={theme}>
          <PetArt species="luma" stage={rank} />
        </ThemeProvider>,
      );
      expect(screen.getByRole("img").getAttribute("aria-label")).toContain(
        heroClassNames[rank - 1],
      );
      expect(screen.getByRole("img").getAttribute("shape-rendering")).toBe(
        "crispEdges",
      );
      expect(
        container.querySelector(
          `[data-equipment="${rank === 2 ? "book" : "sword"}"]`,
        ),
      ).toBeTruthy();
      expect(!!container.querySelector('[data-equipment="shield"]')).toBe(
        rank >= 4,
      );
      expect(
        !!container.querySelector('[data-equipment="master-insignia"]'),
      ).toBe(rank >= 5);
      expect(!!container.querySelector(".hero-aura")).toBe(rank === 7);
    }
  });

  it("offers the same identifiers when recruiting an owl companion", () => {
    const select = vi.fn();
    show(<PetPicker availableSpecies={["nori", "luma"]} onSelect={select} />);
    fireEvent.click(screen.getByRole("button", { name: /Lavanda Coruja/ }));
    fireEvent.click(
      screen.getByRole("button", { name: /Começar com Lavanda/ }),
    );
    expect(select).toHaveBeenCalledWith("luma");
  });

  it("shows current class progress without restoring the removed journey grid", () => {
    show(
      <>
        <PetProgression pet={pet} />
        <PetClassProgress pet={pet} />
      </>,
    );
    expect(screen.getByText(journey[4].name)).toBeTruthy();
    expect(screen.queryByText("Conquistada")).toBeNull();
    expect(screen.queryByText("Classe atual")).toBeNull();
    expect(screen.queryByText("A conquistar")).toBeNull();
    expect(
      screen.getByText("Faltam 700 XP para Comandante da Aurora"),
    ).toBeTruthy();
    expect(
      Number(screen.getByRole("progressbar").getAttribute("aria-valuenow")),
    ).toBeCloseTo(41.6667, 3);
  });

  it("shows completed progression at the final class without dividing by zero", () => {
    show(
      <PetClassProgress
        pet={{
          ...pet,
          stage: 7,
          career: {
            current: journey[6],
            next: null,
            experienceWithinClass: 320,
            experienceToNextClass: 0,
            remainingExperience: 0,
          },
        }}
      />,
    );
    expect(screen.getByText(/Classe máxima conquistada/)).toBeTruthy();
    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe(
      "100",
    );
  });

  it("keeps idle movement and blinking, freezes death and respects reduced motion", () => {
    const idle = petMotion("neutral");
    for (const part of ["hero-breath", "hero-eyes-closed"]) {
      expect(idle[`& .${part}`].animation).toContain("infinite");
      expect(idle[`& .${part}`].animation).toContain("steps(");
    }
    show(<PetArt stage={7} mood="dead" />);
    expect(screen.getByRole("img").getAttribute("viewBox")).toBe(
      "-14 -9 86 86",
    );
    const dead = petMotion("dead");
    expect(dead["&& *"].animation).toBe("none !important");
    expect(dead["&&"].filter).toBe("grayscale(1)");
    expect(
      idle["@media (prefers-reduced-motion: reduce)"]["&, & *"].animation,
    ).toBe("none !important");
  });
});
