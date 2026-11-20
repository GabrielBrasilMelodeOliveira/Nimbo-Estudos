import { useState } from "react";
import { Plus } from "lucide-react";
import { api } from "../../shared/services/api.js";
import CollapsiblePanel from "../../shared/components/CollapsiblePanel.jsx";
import FlashcardEditor from "./components/FlashcardEditor.jsx";
import { useFlashcards } from "./hooks/useFlashcards.js";
import { Alert, Button, Stack, Typography, Paper } from "@mui/material";
import { FlashcardDeck } from "./components/FlashcardDeck.jsx";

export default function Flashcards({ data, action, working, navigate }) {
  const deck = useFlashcards();
  const [editor, setEditor] = useState(null);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState("");
  const manualCards = deck.cards.filter((card) => card.origin === "MANUAL");
  const busy = working || deck.saving || deck.loading || removing;
  const removeCard = async (card) => {
    if (
      !window.confirm(
        `Excluir o flashcard “${card.source}” e seu histórico de revisão?`,
      )
    )
      return;
    setRemoving(true);
    setError("");
    try {
      await api(`flashcards/manual/${card.id}`, "DELETE");
      await deck.refresh();
    } catch (exception) {
      setError(exception.message);
    } finally {
      setRemoving(false);
    }
  };
  const linkedNotes = (data["error-notes"] || []).filter(
    (note) => note.flashcardEnabled,
  );
  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ justifyContent: "space-between", gap: 2 }}
      >
        <Typography color="text.secondary">
          Crie seus próprios cartões. Os erros registrados também entram
          automaticamente na revisão espaçada.
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            disabled={busy}
            onClick={() => setEditor({})}
          >
            Novo flashcard
          </Button>
          <Button variant="outlined" onClick={() => navigate("errors")}>
            Abrir caderno de erros
          </Button>
        </Stack>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      <FlashcardDeck model={deck} />
      <CollapsiblePanel title={`Meus flashcards (${manualCards.length})`}>
        {manualCards.length ? (
          <Stack spacing={1} sx={{ maxHeight: 400, overflowY: "auto" }}>
            {manualCards.map((card) => (
              <Stack
                key={card.id}
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{
                  p: 2,
                  alignItems: "center",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Stack sx={{ flex: 1, minWidth: 0, width: "100%" }}>
                  <Typography fontWeight={600}>{card.source}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {card.question || "Pergunta em imagem"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {card.discipline} · {card.topic}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Button disabled={busy} onClick={() => setEditor(card)}>
                    Editar
                  </Button>
                  <Button
                    color="error"
                    disabled={busy}
                    onClick={() => removeCard(card)}
                  >
                    Excluir
                  </Button>
                </Stack>
              </Stack>
            ))}
          </Stack>
        ) : (
          <Typography color="text.secondary">
            Use “Novo flashcard” para criar um cartão com sua própria pergunta e
            resposta.
          </Typography>
        )}
      </CollapsiblePanel>
      {editor && (
        <FlashcardEditor
          card={editor.id ? editor : null}
          data={data}
          onClose={() => setEditor(null)}
          onSaved={deck.refresh}
        />
      )}
      {linkedNotes.length > 0 && (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Erros para revisão
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Desvincular retira o cartão da fila e preserva a anotação e o
            histórico de revisão.
          </Typography>
          <Stack spacing={1}>
            {linkedNotes.map((note) => (
              <Stack
                key={note.id}
                direction={{ xs: "column", sm: "row" }}
                sx={{
                  justifyContent: "space-between",
                  gap: 1,
                  py: 1,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <div>
                  <Typography>{note.source}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {note.topic.title}
                  </Typography>
                </div>
                <Button
                  disabled={busy}
                  onClick={async () => {
                    const success = await action(
                      `flashcards/${note.id}/link`,
                      "PATCH",
                      { enabled: false },
                      "Cartão desvinculado. Histórico preservado.",
                    );
                    if (success) await deck.refresh();
                  }}
                >
                  Desvincular
                </Button>
              </Stack>
            ))}
          </Stack>
        </Paper>
      )}
    </Stack>
  );
}
