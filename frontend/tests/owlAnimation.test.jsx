import { act, render, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PetArt } from "../src/shared/components/Pet.jsx";
import useOwlGesture, {
  gestureDuration,
  owlGesturePool,
  shuffleGestures,
} from "../src/shared/components/pet/useOwlGesture.js";
import { owlPose } from "../src/shared/components/pet/owlPoses.js";
import { petMotion } from "../src/shared/components/pet/petMotion.js";
import { owlDefaults } from "../src/shared/components/pet/owlAppearance.js";
import { referencePalette } from "../src/shared/components/pet/art/referencePalette.js";
import { referenceColors } from "../src/shared/components/pet/art/owlReferencePixels.js";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("reference owl and class silhouettes", () => {
  it("preserves the reference colors and recolors feather and scarf families independently", () => {
    expect(referencePalette(owlDefaults)).toEqual(referenceColors);
    const feathers = referencePalette({
      ...owlDefaults,
      featherColor: "#AB8DD8",
    });
    expect(feathers[5]).toBe("#AB8DD8");
    expect(feathers.slice(11)).toEqual(referenceColors.slice(11));
    const scarf = referencePalette({ ...owlDefaults, scarfColor: "#BF432B" });
    expect(scarf[14]).toBe("#BF432B");
    expect(scarf.slice(0, 11)).toEqual(referenceColors.slice(0, 11));
  });

  it.each(["WARRIOR", "MAGE", "RANGER"])(
    "gives all seven %s ranks distinct joint poses and layered armor",
    (path) => {
      const poses = Array.from({ length: 7 }, (_, index) =>
        owlPose(index + 1, path),
      );
      const joints = poses.map(({ name, ...transforms }) =>
        JSON.stringify(transforms),
      );
      expect(new Set(joints).size).toBe(7);
      const { container, rerender } = render(
        <PetArt stage={1} appearance={{ path }} />,
      );
      expect(container.querySelector("[data-armor]")).toBeNull();
      for (let rank = 3; rank <= 7; rank++) {
        rerender(<PetArt stage={rank} appearance={{ path }} />);
        expect(
          container.querySelector("[data-armor]").getAttribute("data-armor"),
        ).toBe(path);
        expect(
          container
            .querySelector("[data-armor-tier]")
            .getAttribute("data-armor-tier"),
        ).toBe(String(rank));
        expect(!!container.querySelector('[data-equipment="pauldrons"]')).toBe(
          rank >= 4,
        );
        expect(
          !!container.querySelector('[data-equipment="commander-armor"]'),
        ).toBe(rank >= 6);
        expect(
          !!container.querySelector('[data-equipment="legend-armor"]'),
        ).toBe(rank === 7);
        expect(
          container.querySelectorAll('[data-owl-layer="eyeFront"]'),
        ).toHaveLength(1);
      }
    },
  );
});

describe("varied idle gestures", () => {
  it("visits every gesture before repeating and avoids repeats between bags", () => {
    const pool = owlGesturePool("WARRIOR", 5, "neutral");
    const first = shuffleGestures(pool, null, () => 0);
    const second = shuffleGestures(pool, first.at(-1), () => 0);
    expect(new Set(first)).toEqual(new Set(pool));
    expect(second[0]).not.toBe(first.at(-1));
    expect(owlGesturePool("MAGE", 5, "neutral")).toContain("cast");
    expect(owlGesturePool("RANGER", 5, "neutral")).toContain("aim");
    expect(owlGesturePool("WARRIOR", 1, "neutral")).not.toContain("sword");
    expect(owlGesturePool("MAGE", 5, "dead")).toEqual([]);
    expect(owlGesturePool("MAGE", 5, "tired")).not.toContain("cast");
  });

  it("alternates actions with pauses and cancels its timer on unmount", () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0);
    const elementRef = { current: null };
    const { result, unmount } = renderHook(() =>
      useOwlGesture({ path: "MAGE", rank: 5, mood: "neutral", elementRef }),
    );
    const seen = [];
    expect(result.current).toBe("rest");
    const pool = owlGesturePool("MAGE", 5, "neutral");
    for (let index = 0; index < pool.length; index++) {
      act(() => vi.advanceTimersByTime(1800));
      seen.push(result.current);
      act(() => vi.advanceTimersByTime(gestureDuration));
      expect(result.current).toBe("rest");
    }
    expect(new Set(seen)).toEqual(new Set(pool));
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("pauses for hidden tabs, reduced motion and death, then resumes safely", () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0);
    const media = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    vi.spyOn(window, "matchMedia").mockReturnValue(media);
    const elementRef = { current: null };
    const { result, rerender } = renderHook(
      ({ mood }) =>
        useOwlGesture({ path: "WARRIOR", rank: 7, mood, elementRef }),
      { initialProps: { mood: "neutral" } },
    );
    const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(vi.getTimerCount()).toBe(0);
    expect(result.current).toBe("paused");
    hidden.mockReturnValue(false);
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(vi.getTimerCount()).toBe(1);
    media.matches = true;
    act(() => media.addEventListener.mock.calls[0][1]());
    expect(vi.getTimerCount()).toBe(0);
    media.matches = false;
    rerender({ mood: "dead" });
    expect(vi.getTimerCount()).toBe(0);
    rerender({ mood: "happy" });
    act(() => vi.advanceTimersByTime(1800));
    expect(result.current).not.toBe("rest");
  });

  it("suspends offscreen animation and resumes when the owl returns to view", () => {
    vi.useFakeTimers();
    let intersect;
    const observe = vi.fn();
    const disconnect = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback) {
          intersect = callback;
        }
        observe = observe;
        disconnect = disconnect;
      },
    );
    const elementRef = { current: document.createElement("div") };
    const { result, unmount } = renderHook(() =>
      useOwlGesture({ path: "RANGER", rank: 6, mood: "neutral", elementRef }),
    );
    expect(observe).toHaveBeenCalledWith(elementRef.current);
    act(() => intersect([{ isIntersecting: false }]));
    expect(result.current).toBe("paused");
    expect(vi.getTimerCount()).toBe(0);
    expect(petMotion("neutral", "paused")["&& *"].animationPlayState).toBe(
      "paused",
    );
    act(() => intersect([{ isIntersecting: true }]));
    expect(result.current).toBe("rest");
    expect(vi.getTimerCount()).toBe(1);
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("retains joint pivots while gestures animate and uses different limbs for each action", () => {
    expect(petMotion("neutral", "look")["& .hero-head"].transformOrigin).toBe(
      "29px 29px",
    );
    expect(
      petMotion("neutral", "wave")["& .owl-wing-front"].transformOrigin,
    ).toBe("18px 38px");
    expect(
      petMotion("neutral", "wave")["& .owl-wing-front"].animation,
    ).toContain("1 both");
    expect(petMotion("neutral", "sword")["& .hero-weapon"].animation).not.toBe(
      petMotion("neutral", "aim")["& .hero-weapon"].animation,
    );
  });
});
