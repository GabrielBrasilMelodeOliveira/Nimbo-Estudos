import { Button, Stack, Typography, Paper } from "@mui/material";
import { FlashcardDeck } from "./components/FlashcardDeck.jsx";

export default function Flashcards({ data, action, working, navigate }) {
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
          Revise os erros que você vinculou usando repetição espaçada.
        </Typography>
        <Button variant="outlined" onClick={() => navigate("errors")}>
          Vincular erros do caderno
        </Button>
      </Stack>
      <FlashcardDeck key={linkedNotes.map((note) => note.id).join(",")} />
      {linkedNotes.length > 0 && (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Erros vinculados
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
                  disabled={working}
                  onClick={() =>
                    action(
                      `flashcards/${note.id}/link`,
                      "PATCH",
                      { enabled: false },
                      "Cartão desvinculado. Histórico preservado.",
                    )
                  }
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
