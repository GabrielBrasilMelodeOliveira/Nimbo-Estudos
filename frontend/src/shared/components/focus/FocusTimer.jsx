import { useEffect } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  Chip,
  Alert,
} from "@mui/material";
import { Play, Pause, Square, RotateCcw } from "lucide-react";
import { useFocusTimer } from "../../hooks/FocusTimerContext.jsx";
import { SearchableSelect } from "../FormControls.jsx";
import { fmtTimer } from "../../utils/utils.js";

export default function FocusTimer({
  kind,
  data,
  working,
  focusTopicId,
  focusDisciplineId,
}) {
  const timer = useFocusTimer();
  useEffect(() => {
    const selected = data.topics?.find(
      (topic) => String(topic.id) === String(focusTopicId),
    );
    timer.configure({
      kind,
      ...(selected
        ? {
            topicId: String(selected.id),
            disciplineId: String(selected.discipline.id),
          }
        : focusDisciplineId
          ? { disciplineId: String(focusDisciplineId), topicId: "" }
          : {}),
    });
  }, [kind, focusTopicId, focusDisciplineId, timer.active]);
  const topics = (data.topics || []).filter(
    (topic) =>
      String(topic.discipline.id) ===
      String(timer.discipline?.id || timer.clock.disciplineId),
  );
  return (
    <Paper
      component="section"
      variant="outlined"
      aria-label={`Cronômetro de ${kind === "THEORY" ? "teoria" : "questões"}`}
      sx={{ p: { xs: 2, md: 4 }, minHeight: 330 }}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", gap: 2, mb: 3 }}
      >
        <Typography variant="h6">
          Foco em {timer.clock.kind === "THEORY" ? "teoria" : "questões"}
        </Typography>
        <Chip
          color={timer.running ? "success" : "default"}
          label={
            timer.running
              ? "Em andamento"
              : timer.active
                ? "Pausado"
                : "Pronto para começar"
          }
        />
      </Stack>
      {timer.active && timer.clock.kind !== kind && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Você tem uma sessão de{" "}
          {timer.clock.kind === "THEORY" ? "teoria" : "questões"} em andamento.
          Registre ou zere esta sessão antes de iniciar outra.
        </Alert>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            md: "minmax(0, 1fr) minmax(260px, 1fr)",
          },
          alignItems: "center",
          gap: 4,
        }}
      >
        <Stack spacing={2}>
          <SearchableSelect
            label="Disciplina"
            disabled={timer.active || working}
            value={
              timer.clock.disciplineId || String(timer.discipline?.id || "")
            }
            onChange={(event) =>
              timer.configure({ disciplineId: event.target.value, topicId: "" })
            }
          >
            <option value="">Selecione a disciplina</option>
            {(data.disciplines || []).map((discipline) => (
              <option key={discipline.id} value={discipline.id}>
                {discipline.name}
              </option>
            ))}
          </SearchableSelect>
          <SearchableSelect
            label={
              timer.clock.kind === "QUESTIONS"
                ? "Assunto"
                : "Assunto (opcional)"
            }
            disabled={timer.active || !timer.clock.disciplineId || working}
            value={timer.clock.topicId}
            onChange={(event) =>
              timer.configure({ topicId: event.target.value })
            }
          >
            <option value="">
              {timer.clock.kind === "QUESTIONS"
                ? "Escolha o assunto"
                : "Estudo geral da disciplina"}
            </option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </SearchableSelect>
          <Typography variant="body2" color="text.secondary">
            Pode navegar pelo Nimbo: seu cronômetro continua contando.
          </Typography>
        </Stack>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <Typography
            component="output"
            aria-label="Tempo de foco"
            sx={{
              fontSize: "clamp(36px, 4.5vw, 64px)",
              fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
              color: "primary.dark",
            }}
          >
            {fmtTimer(timer.seconds)}
          </Typography>
          <Typography variant="overline" color="text.secondary">
            Tempo líquido
          </Typography>
          <Stack
            direction="row"
            sx={{ gap: 1, flexWrap: "wrap", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              onClick={timer.running ? timer.pause : timer.start}
              disabled={
                working ||
                timer.saving ||
                !timer.discipline ||
                (timer.clock.kind === "QUESTIONS" && !timer.topic)
              }
              startIcon={
                timer.running ? <Pause size={17} /> : <Play size={17} />
              }
            >
              {timer.running
                ? "Pausar"
                : timer.active
                  ? "Continuar"
                  : "Iniciar estudo"}
            </Button>
            <Button
              variant="outlined"
              disabled={timer.seconds < 1 || working || timer.saving}
              onClick={timer.finish}
              startIcon={<Square size={16} />}
            >
              Finalizar e registrar
            </Button>
            <Button
              disabled={!timer.active || working || timer.saving}
              onClick={() => {
                if (window.confirm("Zerar o tempo atual sem salvar?"))
                  timer.reset();
              }}
              startIcon={<RotateCcw size={16} />}
            >
              Zerar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}
