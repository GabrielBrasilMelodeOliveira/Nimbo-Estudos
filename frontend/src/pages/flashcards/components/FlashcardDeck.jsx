import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useFlashcards } from "../hooks/useFlashcards.js";
import { fileUrl } from "../../../shared/services/api.js";

const ratings = [
  { value: "AGAIN", label: "Novamente", color: "error" },
  { value: "HARD", label: "Difícil", color: "warning" },
  { value: "GOOD", label: "Bom", color: "primary" },
  { value: "EASY", label: "Fácil", color: "success" },
];
function intervalLabel(date, now) {
  const minutes = Math.max(
    1,
    Math.round((new Date(date).getTime() - now) / 60000),
  );
  return minutes < 60
    ? `${minutes} min`
    : minutes < 1440
      ? `${Math.round(minutes / 60)} h`
      : `${Math.round(minutes / 1440)} dias`;
}
export function FlashcardDeck() {
  const {
    card,
    dueCount,
    total,
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
  } = useFlashcards();
  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        sx={{ gap: 1, flexWrap: "wrap", alignItems: "center" }}
      >
        <Chip label={`${dueCount} para revisar`} />
        <Chip label={`${reviewed} revisados nesta sessão`} />
        <Chip label={`${total} cartões`} />
        <Button onClick={refresh} disabled={saving || loading}>
          Atualizar fila
        </Button>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        Cada novo erro registrado é um cartão. Tente lembrar a resposta antes de
        revelá-la. FSRS com retenção de 90% ajusta o próximo intervalo conforme
        sua avaliação.
      </Typography>
      {error && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" onClick={refresh} disabled={saving}>
              Atualizar
            </Button>
          }
        >
          {error}
        </Alert>
      )}
      {loading ? (
        <CircularProgress aria-label="Carregando cartões" />
      ) : card ? (
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="overline">
            {card.discipline} · {card.topic}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Fonte · {card.source}
          </Typography>
          <Typography
            component="h3"
            variant="h6"
            sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
          >
            {card.question}
          </Typography>
          {card.questionImageId && (
            <Box
              component="img"
              src={fileUrl(card.questionImageId)}
              alt="Imagem da questão"
              sx={{
                maxWidth: "100%",
                maxHeight: 480,
                objectFit: "contain",
                mt: 2,
              }}
            />
          )}
          {!revealed ? (
            <Button
              variant="contained"
              onClick={() => setRevealed(true)}
              sx={{ mt: 3 }}
            >
              Mostrar resposta
            </Button>
          ) : (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
                Resposta
              </Typography>
              <Typography
                sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
              >
                {card.answer}
              </Typography>
              {card.answerImageId && (
                <Box
                  component="img"
                  src={fileUrl(card.answerImageId)}
                  alt="Imagem da resposta"
                  sx={{
                    maxWidth: "100%",
                    maxHeight: 480,
                    objectFit: "contain",
                    mt: 2,
                  }}
                />
              )}
              <Typography variant="body2" sx={{ mt: 3, mb: 1 }}>
                Quanto você lembrou?
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                {ratings.map((rating) => (
                  <Button
                    key={rating.value}
                    variant="outlined"
                    color={rating.color}
                    disabled={saving}
                    onClick={() => answer(rating.value)}
                    sx={{ flex: 1, flexDirection: "column", py: 1.5 }}
                  >
                    {rating.label}
                    <Typography component="span" variant="caption">
                      {intervalLabel(card.nextReviews[rating.value], now)}
                    </Typography>
                  </Button>
                ))}
              </Stack>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 1 }}
              >
                Use “Novamente” se não lembrou. “Difícil” significa que lembrou
                com esforço.
              </Typography>
            </>
          )}
        </Paper>
      ) : (
        <Alert severity="success">
          {total
            ? `Revisões em dia. Próximo cartão em ${nextDue.toLocaleString("pt-BR")}.`
            : "Registre um erro no caderno para começar os flashcards."}
        </Alert>
      )}
    </Stack>
  );
}
