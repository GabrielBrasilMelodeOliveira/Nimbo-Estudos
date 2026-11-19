export const cardIdentity = (card) =>
  card ? `${card.origin || "ERROR_NOTE"}:${card.id}` : "";

export const cardEndpoint = (card) =>
  `flashcards/${card.origin === "MANUAL" ? "manual/" : ""}${card.id}`;
