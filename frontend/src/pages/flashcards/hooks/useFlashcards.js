import { useCallback, useEffect, useRef, useState } from "react";
import {
  loadFlashcards,
  reviewFlashcard,
} from "../services/flashcardService.js";

export function useFlashcards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [reviewed, setReviewed] = useState(0);
  const pending = useRef(false);
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setCards(await loadFlashcards());
      setError("");
      setNow(Date.now());
    } catch (exception) {
      setError(exception.message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    refresh();
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [refresh]);
  const dueCards = cards
    .filter((card) => new Date(card.due).getTime() <= now)
    .sort(
      (first, second) =>
        new Date(first.due) - new Date(second.due) || first.id - second.id,
    );
  const card = dueCards[0] || null;
  useEffect(() => setRevealed(false), [card?.id]);
  const answer = async (rating) => {
    if (!card || !revealed || pending.current) return;
    pending.current = true;
    setSaving(true);
    try {
      const updated = await reviewFlashcard(card, rating);
      setCards((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      );
      setRevealed(false);
      setReviewed((current) => current + 1);
      setError("");
      setNow(Date.now());
    } catch (exception) {
      setError(exception.message);
    } finally {
      pending.current = false;
      setSaving(false);
    }
  };
  const nextDue = cards.length
    ? new Date(Math.min(...cards.map((item) => new Date(item.due).getTime())))
    : null;
  return {
    card,
    dueCount: dueCards.length,
    total: cards.length,
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
  };
}
