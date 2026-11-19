import QuestionVolumeChart from "../../../shared/components/QuestionVolumeChart.jsx";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import StudyActivityChart from "../../../shared/components/StudyActivityChart.jsx";
import { addDays } from "../../../shared/utils/plannerMetrics.js";
import { TODAY, fmtHours } from "../../../shared/utils/utils.js";

export default function StudySummary({
  daily,
  questions = [],
  weekly,
  goalSeconds,
  navigate,
}) {
  const today = TODAY();
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(today, index - 6);
    const record = daily.find((day) => day.date === date) || {};
    return {
      date,
      questions: questions
        .filter((record) => record.date === date)
        .reduce((total, record) => total + Number(record.total || 0), 0),
      seconds: record.seconds || 0,
      questionSeconds: record.questionSeconds || 0,
      theorySeconds:
        record.theorySeconds ??
        Math.max(0, (record.seconds || 0) - (record.questionSeconds || 0)),
    };
  });
  const totalSeconds = days.reduce((total, day) => total + day.seconds, 0);
  const activeDays = days.filter((day) => day.seconds > 0).length;
  const goalProgress = goalSeconds
    ? Math.round((100 * weekly) / goalSeconds)
    : 0;
  return (
    <Paper
      component="section"
      variant="outlined"
      sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <Typography variant="h6">Estudo nos últimos 7 dias</Typography>
        <Button onClick={() => navigate("analytics")}>Desempenho →</Button>
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            md: "minmax(0, 1fr)",
          },
          gap: 3,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              lg: "minmax(0, 1.3fr) minmax(0, 1fr)",
            },
            gap: 3,
          }}
        >
          <Box
            component="section"
            aria-label="Tempo de estudo nos últimos 7 dias"
            sx={{ minWidth: 0 }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Tempo de estudo
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Teoria e questões lado a lado
            </Typography>
            <StudyActivityChart daily={days} />
          </Box>
          <Box
            component="section"
            aria-label="Questões resolvidas nos últimos 7 dias"
            sx={{ minWidth: 0 }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Questões resolvidas
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Quantidade registrada por dia
            </Typography>
            <QuestionVolumeChart daily={days} />
          </Box>
        </Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{
            justifyContent: "space-between",
            alignItems: { sm: "center" },
            "& > *": { flex: 1 },
          }}
        >
          <Box>
            <Typography variant="h4">{fmtHours(totalSeconds)}</Typography>
            <Typography color="text.secondary">
              Tempo líquido nos últimos 7 dias
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight={600}>
              {activeDays} de 7 dias ativos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Média diária: {fmtHours(totalSeconds / 7)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {goalSeconds
                ? `Meta da semana atual: ${goalProgress}%`
                : "Meta semanal não definida"}
            </Typography>
            {goalSeconds > 0 && (
              <>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(100, goalProgress)}
                  sx={{ height: 8, borderRadius: 1 }}
                />
                <Typography variant="caption">
                  {fmtHours(weekly)} de {fmtHours(goalSeconds)}
                </Typography>
              </>
            )}
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}
