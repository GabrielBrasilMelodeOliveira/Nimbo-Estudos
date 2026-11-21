import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { PetArt } from "../src/shared/components/Pet.jsx";
import { petMotion } from "../src/shared/components/pet/petMotion.js";

it("keeps the complete eye foundation visible while only the feather-colored eyelids blink", () => {
  const { container, rerender } = render(
    <PetArt appearance={{ featherColor: "#AB8DD8" }} />,
  );
  const foundation = container.querySelector(".hero-eye-foundation");
  expect(foundation.querySelectorAll("[data-owl-layer]")).toHaveLength(2);
  expect(foundation.getAttribute("opacity")).toBeNull();
  const motion = petMotion("neutral");
  expect(motion["& .hero-eye-foundation"]).toBeUndefined();
  expect(motion["& .hero-eyes-open"]).toBeUndefined();
  expect(motion["& .hero-eyes-closed"].animation).toContain("infinite");
  const eyelids = container.querySelector('[data-eye-state="blinking"]');
  expect(eyelids.querySelector('[fill="#AB8DD8"]')).toBeTruthy();
  expect(eyelids.querySelector('[fill="#FFFFFF"]')).toBeNull();
  for (const mood of ["tired", "dead"]) {
    rerender(<PetArt mood={mood} />);
    expect(container.querySelector(".hero-eye-foundation")).toBeTruthy();
    expect(container.querySelector('[data-eye-state="closed"]')).toBeTruthy();
    expect(container.querySelector(".hero-eyes-closed")).toBeNull();
  }
});

it.each(["WARRIOR", "RANGER"])(
  "limits the new %s outfit to the last two stages and respects personal accessories",
  (path) => {
    const { container, rerender } = render(
      <PetArt stage={5} appearance={{ path }} />,
    );
    const newHeadwear =
      '[data-equipment="knight-helmet"], [data-equipment="forest-headband"]';
    expect(container.querySelector(newHeadwear)).toBeNull();
    for (const stage of [6, 7]) {
      rerender(<PetArt stage={stage} appearance={{ path }} />);
      expect(container.querySelector(newHeadwear)).toBeTruthy();
      rerender(
        <PetArt
          stage={stage}
          appearance={{
            path,
            headAccessory: "GOGGLES",
            bodyAccessory: "NONE",
            scarfColor: "#913A61",
          }}
        />,
      );
      expect(container.querySelector(newHeadwear)).toBeNull();
      expect(container.querySelector('[data-headwear="GOGGLES"]')).toBeTruthy();
      expect(
        container.querySelector('[data-body-accessory="SATCHEL"]'),
      ).toBeNull();
      expect(
        container.querySelector(
          '[data-equipment="class-mantle"] [fill="#913A61"]',
        ),
      ).toBeTruthy();
    }
  },
);
