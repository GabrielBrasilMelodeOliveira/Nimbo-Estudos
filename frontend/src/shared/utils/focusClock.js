export const focusStorageKey = "nimbo-focus-clock-v2";
export const freshFocus = () => ({
  kind: "THEORY",
  disciplineId: "",
  topicId: "",
  elapsedMs: 0,
  runningSince: null,
  studyDate: "",
});
export function elapsedMilliseconds(clock, now = Date.now()) {
  return Math.min(
    86400000,
    Math.max(
      0,
      clock.elapsedMs +
        (clock.runningSince !== null ? now - clock.runningSince : 0),
    ),
  );
}
export function restoreFocus(storage) {
  try {
    const stored = JSON.parse(storage.getItem(focusStorageKey) || "null");
    if (
      stored &&
      ["THEORY", "QUESTIONS"].includes(stored.kind) &&
      Number.isFinite(stored.elapsedMs) &&
      stored.elapsedMs >= 0 &&
      stored.elapsedMs <= 86400000 &&
      (stored.runningSince === null || Number.isFinite(stored.runningSince))
    )
      return { ...freshFocus(), ...stored };
    const legacy = JSON.parse(
      storage.getItem("nimbo-question-timer-v1") || "null",
    );
    if (
      legacy?.topicId &&
      Number.isFinite(legacy.elapsedMs) &&
      legacy.elapsedMs >= 0 &&
      legacy.elapsedMs <= 86400000 &&
      (legacy.runningSince === null || Number.isFinite(legacy.runningSince))
    )
      return { ...freshFocus(), ...legacy, kind: "QUESTIONS" };
  } catch {
    /* Invalid or unavailable storage starts a new clock. */
  }
  return freshFocus();
}
