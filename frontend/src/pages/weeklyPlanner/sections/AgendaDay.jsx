import { Paper, Stack, Checkbox, Typography, Chip } from "@mui/material";
import { AgendaCard } from "../components/AgendaCard.jsx";
import {
  itemProgress,
  isAgendaCompleted,
  unplannedStudies,
} from "../../../shared/utils/plannerMetrics.js";
import { fmtHours } from "../../../shared/utils/utils.js";

export function AgendaDay({
  day,
  data,
  items,
  reviews,
  finishedReviews,
  working,
  dates,
  onComplete,
  onEdit,
  onStart,
  onMove,
  onReview,
  showRecorded = true,
  search = "",
}) {
  return (
    <Stack spacing={1.25}>
      {items.map((item) => (
        <AgendaCard
          key={item.id}
          item={item}
          progress={itemProgress(data, item)}
          completed={isAgendaCompleted(data, item)}
          working={working}
          dates={dates}
          onComplete={onComplete}
          onEdit={onEdit}
          onStart={onStart}
          onMove={onMove}
        />
      ))}
      {reviews.map((review) => (
        <Paper key={`review-${review.id}`} variant="outlined" sx={{ p: 1.25 }}>
          <Stack direction="row" sx={{ alignItems: "flex-start", gap: 1 }}>
            <Checkbox
              size="small"
              checked={false}
              disabled={working}
              onChange={() => onReview(review)}
              slotProps={{
                input: {
                  "aria-label": `Concluir revisão de ${review.topic.title}`,
                },
              }}
            />
            <Stack sx={{ minWidth: 0 }}>
              <Typography
                variant="subtitle2"
                sx={{ overflowWrap: "break-word" }}
              >
                Revisar {review.topic.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Revisão espaçada
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      ))}
      {showRecorded &&
        unplannedStudies(data, day)
          .filter((item) =>
            item.topic.title
              .toLocaleLowerCase("pt-BR")
              .includes(search.trim().toLocaleLowerCase("pt-BR")),
          )
          .map((item) => (
            <Paper
              key={item.key}
              variant="outlined"
              sx={{ p: 1.5, bgcolor: "action.hover" }}
            >
              <Checkbox
                checked
                disabled
                size="small"
                slotProps={{
                  input: {
                    "aria-label": `Estudo registrado de ${item.topic.title}`,
                  },
                }}
              />
              <Chip
                size="small"
                color="primary"
                variant="outlined"
                label="Registrado"
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {item.topic.title}
              </Typography>
              <Typography variant="caption">
                {item.kind === "QUESTIONS" ? "Questões" : "Teoria"} ·{" "}
                {fmtHours(item.seconds)}
              </Typography>
            </Paper>
          ))}
      {finishedReviews.length > 0 && (
        <Typography variant="caption" color="text.secondary">
          {finishedReviews.length} revisões concluídas
        </Typography>
      )}
    </Stack>
  );
}
