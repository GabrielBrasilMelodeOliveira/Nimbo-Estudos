import { useEffect, useState } from "react";

export const gestureDuration = 2800;
export function owlGesturePool(path, rank, mood) {
  if (mood === "dead") return [];
  if (mood === "tired") return ["yawn", "droop", "look"];
  if (mood === "hungry") return ["belly", "shiver", "look", "droop"];
  if (mood === "sad") return ["droop", "preen", "look"];
  if (mood === "angry") return ["stomp", "ruffle", "look"];
  const gestures = ["look", "preen", "stretch", "step", "scarf", "wave"];
  if (rank === 2) gestures.push("read", "ponder");
  if (rank >= 3) {
    const careerGestures = {
      WARRIOR: ["sword", rank >= 4 ? "shield" : "salute"],
      MAGE: ["cast", "staff"],
      RANGER: ["aim", "scan"],
    };
    gestures.push(...(careerGestures[path] || careerGestures.WARRIOR));
  }
  if (["happy", "proud", "excited", "radiant", "legendary"].includes(mood)) {
    gestures.push("celebrate", "salute");
  }
  return [...new Set(gestures)];
}

/** A shuffled bag visits every gesture before cycling; adjacent cycles cannot repeat. */
export function shuffleGestures(gestures, previous, random = Math.random) {
  const shuffled = [...gestures];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const nextIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[nextIndex]] = [
      shuffled[nextIndex],
      shuffled[index],
    ];
  }
  if (shuffled.length > 1 && shuffled[0] === previous) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }
  return shuffled;
}

export default function useOwlGesture({ path, rank, mood, elementRef }) {
  const [gesture, setGesture] = useState("rest");
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let timeout;
    let remaining = [];
    let previous;
    let disposed = false;
    const allowed = () =>
      !disposed &&
      visible &&
      !document.hidden &&
      !media.matches &&
      mood !== "dead";
    const schedule = () => {
      clearTimeout(timeout);
      setGesture(allowed() ? "rest" : "paused");
      if (!allowed()) return;
      timeout = setTimeout(
        () => {
          if (!allowed()) return;
          if (!remaining.length)
            remaining = shuffleGestures(
              owlGesturePool(path, rank, mood),
              previous,
            );
          previous = remaining.shift();
          setGesture(previous || "rest");
          timeout = setTimeout(schedule, gestureDuration);
        },
        1800 + Math.round(Math.random() * 3600),
      );
    };
    const observer =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            schedule();
          })
        : null;
    if (elementRef.current) observer?.observe(elementRef.current);
    document.addEventListener("visibilitychange", schedule);
    media.addEventListener("change", schedule);
    schedule();
    return () => {
      disposed = true;
      clearTimeout(timeout);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", schedule);
      media.removeEventListener("change", schedule);
    };
  }, [path, rank, mood, elementRef]);
  return gesture;
}
