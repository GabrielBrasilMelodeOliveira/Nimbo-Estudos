import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChevronDown, CalendarCheck, CalendarArrowUp } from "lucide-react";
import { dateBR, fmtHours } from "../../utils/utils.js";
import { useDayClosing } from "./hooks/useDayClosing.js";
import DailyGoalEditor from "./components/DailyGoalEditor.jsx";

const outcomes = {
  COMPLETE: ["Completo", "success"],
  PARTIAL: ["Parcial", "default"],
  MISSED: ["Sem progresso", "error"],
  PENDING: ["Em aberto", "default"],
};

export default function DayClosing({ data, action, working }) {
  const state = useDayClosing({ data, action });
  if (!state.progress?.today) return null;
  const goal = state.progress.today;
  const [label, color] = outcomes[goal.outcome] || outcomes.PENDING;
  const metrics = [
    {
      label: "Tempo estudado",
      actual: goal.studiedSeconds,
      target: goal.targetMinutes * 60,
      text: `${fmtHours(goal.studiedSeconds)} / ${fmtHours(goal.targetMinutes * 60)}`,
    },
    {
      label: "Questões resolvidas",
      actual: goal.answeredQuestions,
      target: goal.targetQuestions,
      text: `${goal.answeredQuestions} / ${goal.targetQuestions}`,
    },
    {
      label: "Assuntos estudados",
      actual: goal.studiedTopics,
      target: goal.targetTopics,
      text: `${goal.studiedTopics} / ${goal.targetTopics}`,
    },
  ].filter((metric) => metric.target > 0);
  const plannedDisciplines =
    (data["study-plan"] || []).find((plan) => plan.studyDate === state.today)
      ?.disciplines || [];
  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, width: "100%" }}>
      <Stack
        direction="row"
        sx={{ alignItems: "center", flexWrap: "wrap", gap: 1, mb: 2 }}
      >
        <CalendarCheck size={21} />
        <Typography variant="h6" component="h2" sx={{ flex: 1 }}>
          Fechamento do dia
        </Typography>
        <Chip label={label} color={color} />
        <DailyGoalEditor goal={goal} action={action} working={working} />
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {dateBR(state.today)} · O dia encerra à meia-noite em Fortaleza.
        Registre seus estudos antes disso; resultados encerrados ficam
        preservados.
      </Typography>
      {goal.outcome === "COMPLETE" && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Todas as metas de hoje atingidas. Mais um dia para celebrar com o
          Nimbo!
        </Alert>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: `repeat(${metrics.length}, minmax(0, 1fr))`,
          },
          gap: 3,
        }}
      >
        {metrics.map((metric) => (
          <Box key={metric.label}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ gap: 1, mb: 1 }}
            >
              <Typography variant="body2">{metric.label}</Typography>
              <Typography variant="body2" fontWeight={700}>
                {metric.text}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={Math.min(100, (metric.actual / metric.target) * 100)}
              color={metric.actual >= metric.target ? "success" : "primary"}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        ))}
      </Box>
      {plannedDisciplines.length > 0 && (
        <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap", mt: 2 }}>
          {plannedDisciplines.map((discipline) => {
            const studied =
              (data["study-sessions"] || []).some(
                (session) =>
                  session.studyDate === state.today &&
                  session.discipline?.id === discipline.id &&
                  session.durationSeconds > 0,
              ) ||
              (data.questions || []).some(
                (record) =>
                  record.date === state.today &&
                  record.topic?.discipline?.id === discipline.id &&
                  record.total > 0,
              );
            return (
              <Chip
                key={discipline.id}
                variant="outlined"
                color={studied ? "success" : "default"}
                label={`${discipline.name} · ${studied ? "estudada" : "planejada"}`}
              />
            );
          })}
        </Stack>
      )}
      <Accordion
        expanded={state.expanded}
        onChange={(_, expanded) => state.setExpanded(expanded)}
        disableGutters
        elevation={0}
        sx={{ mt: 2, "&::before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ChevronDown size={18} />}>
          <Stack
            direction="row"
            sx={{ gap: 1, flexWrap: "wrap", alignItems: "center" }}
          >
            <Typography fontWeight={600}>
              Revisar atividades e reagendar
            </Typography>
            <Chip
              size="small"
              label={`${state.activities.length} planejadas hoje`}
            />
            <Chip
              size="small"
              color="success"
              variant="outlined"
              label={`${state.completed.length} concluídas`}
            />
            <Chip
              size="small"
              color="warning"
              variant="outlined"
              label={`${state.activities.length - state.completed.length} pendentes`}
            />
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.includeOverdue}
                onChange={(event) => {
                  state.setIncludeOverdue(event.target.checked);
                  state.setSelection(null);
                }}
              />
            }
            label="Incluir pendências de dias anteriores"
          />
          {state.pending.length ? (
            <>
              <Stack
                spacing={0.5}
                sx={{ maxHeight: 320, overflowY: "auto", mb: 2 }}
              >
                {state.pending.map((item) => (
                  <FormControlLabel
                    key={item.id}
                    control={
                      <Checkbox
                        disabled={working}
                        checked={state.selected.some(
                          (selected) => selected.id === item.id,
                        )}
                        onChange={() => state.toggleItem(item.id)}
                      />
                    }
                    label={`${item.title} · ${dateBR(item.scheduledDate)}${item.startTime ? ` · ${item.startTime.slice(0, 5)}` : ""}`}
                  />
                ))}
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  type="date"
                  label="Reagendar selecionadas para"
                  value={state.targetDate}
                  onChange={(event) => state.setDestination(event.target.value)}
                  slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: { min: state.today },
                  }}
                  sx={{ minWidth: 250 }}
                />
                <Button
                  startIcon={<CalendarArrowUp size={18} />}
                  variant="contained"
                  disabled={working || !state.canReschedule}
                  onClick={state.reschedule}
                >
                  Reagendar {state.selected.length} pendência(s)
                </Button>
              </Stack>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: "block" }}
              >
                Horário, prioridade e detalhes são mantidos. Reagendar não
                altera o resultado de metas de um dia encerrado.
              </Typography>
            </>
          ) : (
            <Alert severity="success">
              Nenhuma atividade pendente nesta seleção.
            </Alert>
          )}
          {state.completed.length > 0 && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Concluídas hoje:{" "}
              {state.completed.map((item) => item.title).join(" · ")}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
      {state.progress.history?.length > 0 && (
        <Stack
          direction="row"
          sx={{ gap: 1, flexWrap: "wrap", mt: 1 }}
          aria-label="Histórico das metas diárias"
        >
          {state.progress.history.map((day) => (
            <Tooltip
              key={day.studyDate}
              title={`${dateBR(day.studyDate)} · ${outcomes[day.outcome]?.[0]}`}
            >
              <Chip
                size="small"
                variant="outlined"
                color={outcomes[day.outcome]?.[1] || "default"}
                label={`${dateBR(day.studyDate).slice(0, 5)} · ${outcomes[day.outcome]?.[0]}`}
              />
            </Tooltip>
          ))}
        </Stack>
      )}
    </Paper>
  );
}
