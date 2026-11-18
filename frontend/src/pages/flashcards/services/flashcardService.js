import { api } from "../../../shared/services/api.js";
export const loadFlashcards = () => api("flashcards");
export const reviewFlashcard = (card, rating) =>
  api(`flashcards/${card.id}/review`, "POST", {
    rating,
    expectedRevision: card.revision,
  });
