import { api } from "../../../shared/services/api.js";
export const loadFlashcards = () => api("error-notes/flashcards");
export const reviewFlashcard = (card, rating) =>
  api(`error-notes/flashcards/${card.id}/review`, "POST", {
    rating,
    expectedRevision: card.revision,
  });
