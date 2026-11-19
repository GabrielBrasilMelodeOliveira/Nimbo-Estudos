import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { SearchableSelect } from "../../../shared/components/FormControls.jsx";
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
    disciplineId,
    setDisciplineId,
    disciplines,
    undo,
    canUndo,
  } = useFlashcards();
  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <SearchableSelect
          label="Filtrar cartões por disciplina"
          value={disciplineId}
          onChange={(event) => setDisciplineId(event.target.value)}
          disabled={saving || loading}
          sx={{ flex: 1 }}
        >
          <option value="">Todas as disciplinas</option>
          {disciplines.map((discipline) => (
            <option key={discipline.id} value={discipline.id}>
              {discipline.name}
            </option>
          ))}
        </SearchableSelect>
        <Button
          variant="outlined"
          onClick={undo}
          disabled={!canUndo || saving || loading}
        >
          Desfazer última avaliação
        </Button>
      </Stack>
      <Typography variant="caption" color="text.secondary">
        Atalhos: Espaço revela · 1 Novamente · 2 Difícil · 3 Bom · 4 Fácil · Z
        desfaz. Inativos durante a digitação.
      </Typography>
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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                md: "repeat(2, minmax(0, 1fr))",
              },
              gap: 3,
              alignItems: "stretch",
            }}
          >
            <Paper
              component="section"
              aria-label="Pergunta do flashcard"
              variant="outlined"
              sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }}
            >
              <Typography variant="overline" color="text.secondary">
                Pergunta
              </Typography>
              <Typography
                component="h3"
                variant="h6"
                sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", mt: 1 }}
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
            </Paper>
            <Paper
              component="section"
              aria-label="Resposta do flashcard"
              variant="outlined"
              sx={{
                p: { xs: 2, md: 3 },
                minWidth: 0,
                bgcolor: "action.hover",
                minHeight: 240,
              }}
            >
              <Typography variant="overline" color="primary">
                Resposta
              </Typography>
              {revealed ? (
                <>
                  <Typography
                    sx={{
                      whiteSpace: "pre-wrap",
                      overflowWrap: "anywhere",
                      mt: 1,
                    }}
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
                </>
              ) : (
                <Stack spacing={2} sx={{ alignItems: "flex-start", mt: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Tente lembrar antes de revelar. A pergunta continuará
                    visível ao lado.
                  </Typography>
                  <Button
                    variant="contained"
                    disabled={saving}
                    onClick={() => setRevealed(true)}
                  >
                    Mostrar resposta
                  </Button>
                </Stack>
              )}
            </Paper>
          </Box>
          {revealed && (
            <>
              <Typography variant="body2" sx={{ mt: 3, mb: 1 }}>
                Quanto você lembrou?
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                {ratings.map((rating, index) => (
                  <Button
                    key={rating.value}
                    aria-label={rating.label}
                    variant="outlined"
                    color={rating.color}
                    disabled={saving || loading}
                    onClick={() => answer(rating.value)}
                    sx={{ flex: 1, flexDirection: "column", py: 1.5 }}
                  >
                    {index + 1} · {rating.label}
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
