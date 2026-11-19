import { useCallback, useEffect, useRef, useState } from "react";
import {
  loadFlashcards,
  reviewFlashcard,
  undoFlashcard,
} from "../services/flashcardService.js";
import { useFlashcardShortcuts } from "./useFlashcardShortcuts.js";

const disciplineKey = (card) =>
  String(card.disciplineId ?? card.discipline ?? "");

export function useFlashcards() {
  const [cards, setCards] = useState([]);
  const [disciplineId, setDisciplineId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [reviewed, setReviewed] = useState(0);
  const [lastReview, setLastReview] = useState(null);
  const pending = useRef(false);
  const refresh = useCallback(async () => {
    if (pending.current) return;
    pending.current = true;
    setLoading(true);
    try {
      setCards(await loadFlashcards());
      setError("");
      setNow(Date.now());
    } catch (exception) {
      setError(exception.message);
    } finally {
      pending.current = false;
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    refresh();
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [refresh]);
  const disciplines = [
    ...new Map(
      cards.map((card) => [disciplineKey(card), card.discipline]),
    ).entries(),
  ]
    .map(([id, name]) => ({ id, name }))
    .sort((first, second) => first.name.localeCompare(second.name, "pt-BR"));
  const filteredCards = cards.filter(
    (card) => !disciplineId || disciplineKey(card) === disciplineId,
  );
  const dueCards = filteredCards
    .filter((card) => new Date(card.due).getTime() <= now)
    .sort(
      (first, second) =>
        new Date(first.due) - new Date(second.due) || first.id - second.id,
    );
  const card = dueCards[0] || null;
  useEffect(() => setRevealed(false), [card?.id, disciplineId]);

  const replaceCard = (updated) => {
    setCards((current) =>
      current.map((item) => (item.id === updated.id ? updated : item)),
    );
    setRevealed(false);
    setError("");
    setNow(Date.now());
  };
  const answer = async (rating) => {
    if (!card || !revealed || pending.current) return;
    pending.current = true;
    setSaving(true);
    try {
      const updated = await reviewFlashcard(card, rating);
      replaceCard(updated);
      setLastReview(updated);
      setReviewed((current) => current + 1);
    } catch (exception) {
      setError(exception.message);
    } finally {
      pending.current = false;
      setSaving(false);
    }
  };
  const undo = async () => {
    if (!lastReview || pending.current) return;
    pending.current = true;
    setSaving(true);
    try {
      const restored = await undoFlashcard(lastReview);
      replaceCard(restored);
      if (disciplineId && disciplineKey(restored) !== disciplineId)
        setDisciplineId(disciplineKey(restored));
      setLastReview(null);
      setReviewed((current) => Math.max(0, current - 1));
    } catch (exception) {
      setError(exception.message);
      if (exception.status === 409) setLastReview(null);
    } finally {
      pending.current = false;
      setSaving(false);
    }
  };
  useFlashcardShortcuts({
    card,
    revealed,
    reveal: () => setRevealed(true),
    answer,
    undo,
    canUndo: !!lastReview,
    disabled: loading || saving,
  });
  const nextDue = filteredCards.length
    ? new Date(
        Math.min(...filteredCards.map((item) => new Date(item.due).getTime())),
      )
    : null;
  return {
    card,
    dueCount: dueCards.length,
    total: filteredCards.length,
    loading,
    error,
    revealed,
    setRevealed,
    saving,
    answer,
    refresh,
    reviewed,
    nextDue,
    now,
    disciplineId,
    setDisciplineId,
    disciplines,
    undo,
    canUndo: !!lastReview,
  };
}
