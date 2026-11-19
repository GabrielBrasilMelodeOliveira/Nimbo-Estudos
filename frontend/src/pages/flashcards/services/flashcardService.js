import { cardEndpoint } from "../utils/cardIdentity.js";
import { api } from "../../../shared/services/api.js";
export const loadFlashcards = () => api("flashcards");
export const reviewFlashcard = (card, rating) =>
  api(`${cardEndpoint(card)}/review`, "POST", {
    rating,
    expectedRevision: card.revision,
  });

export const undoFlashcard = (card) =>
  api(`${cardEndpoint(card)}/undo`, "POST", {
    expectedRevision: card.revision,
  });
