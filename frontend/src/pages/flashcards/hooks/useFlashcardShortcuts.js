import { useEffect } from "react";

export function useFlashcardShortcuts({
  card,
  revealed,
  reveal,
  answer,
  undo,
  canUndo,
  disabled,
}) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (
        disabled ||
        event.defaultPrevented ||
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.target?.closest?.(
          "input, textarea, select, [contenteditable='true'], [role='combobox']",
        ) ||
        document.querySelector('[role="dialog"], [role="alertdialog"]')
      )
        return;
      if (event.key.toLowerCase() === "z" && canUndo) {
        event.preventDefault();
        undo();
      } else if (
        event.code === "Space" &&
        card &&
        !revealed &&
        !event.target?.closest?.("button")
      ) {
        event.preventDefault();
        reveal();
      } else if (card && revealed && /^[1-4]$/.test(event.key)) {
        event.preventDefault();
        answer(["AGAIN", "HARD", "GOOD", "EASY"][Number(event.key) - 1]);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [card, revealed, reveal, answer, undo, canUndo, disabled]);
}
