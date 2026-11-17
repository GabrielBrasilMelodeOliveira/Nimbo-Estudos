import { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Box,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Button,
  Chip,
  Alert,
} from "@mui/material";
import { fmtHours } from "../../../shared/utils/utils.js";

export function DisciplineCharts({ disciplines, onEdit }) {
  const [metric, setMetric] = useState("coverage");
  const [selectedId, setSelectedId] = useState("");
  if (!disciplines.length)
    return (
      <Alert severity="info">
        Cadastre disciplinas para acompanhar seu desempenho.
      </Alert>
    );
  const selected =
    disciplines.find((discipline) => String(discipline.id) === selectedId) ||
    disciplines[0];
  const metrics = {
    coverage: {
      label: "Cobertura do edital (%)",
      value: (discipline) => discipline.coverage || 0,
    },
    accuracy: {
      label: "Acertos em questões (%)",
      value: (discipline) =>
        discipline.questions ? discipline.accuracy : null,
    },
    time: {
      label: "Tempo estudado (horas)",
      value: (discipline) =>
        Math.round(
          ((discipline.theorySeconds || 0) +
            (discipline.questionSeconds || 0)) /
            36,
        ) / 100,
    },
    priority: {
      label: "Prioridade de estudo (0–100)",
      value: (discipline) => discipline.priority || 0,
    },
  };
  const current = metrics[metric];
  return (
    <Stack spacing={3}>
      <TextField
        select
        size="small"
        label="Comparar disciplinas por"
        value={metric}
        onChange={(event) => setMetric(event.target.value)}
        sx={{ maxWidth: 340 }}
      >
        {Object.entries(metrics).map(([key, item]) => (
          <MenuItem key={key} value={key}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ minWidth: 500 }}>
          <BarChart
            layout="horizontal"
            height={Math.max(260, disciplines.length * 52)}
            yAxis={[
              {
                scaleType: "band",
                data: disciplines.map((discipline) => discipline.name),
                width: 210,
              },
            ]}
            xAxis={[{ min: 0, ...(metric !== "time" ? { max: 100 } : {}) }]}
            series={[
              {
                label: current.label,
                data: disciplines.map(current.value),
                valueFormatter: (value) =>
                  value === null
                    ? "Sem questões registradas"
                    : `${value}${metric === "time" ? " h" : metric === "priority" ? " pontos" : "%"}`,
              },
            ]}
            margin={{ left: 15, right: 30 }}
            onItemClick={(_, item) =>
              setSelectedId(String(disciplines[item.dataIndex].id))
            }
          />
        </Box>
      </Box>
      {metric === "accuracy" && (
        <Typography variant="caption" color="text.secondary">
          Disciplinas sem questões registradas não possuem taxa de acerto.
        </Typography>
      )}
      <Box sx={{ p: 2, border: 1, borderColor: "divider", borderRadius: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: { sm: "center" } }}
        >
          <TextField
            select
            size="small"
            label="Detalhes da disciplina"
            value={String(selected.id)}
            onChange={(event) => setSelectedId(event.target.value)}
            sx={{ minWidth: 240 }}
          >
            {disciplines.map((discipline) => (
              <MenuItem value={String(discipline.id)} key={discipline.id}>
                {discipline.name}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="outlined" onClick={() => onEdit(selected)}>
            Ajustar prioridade
          </Button>
        </Stack>
        <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap", mt: 2 }}>
          <Chip
            label={`${selected.completedTopics}/${selected.topicCount} assuntos concluídos`}
          />
          <Chip label={`${selected.questions} questões`} />
          <Chip
            label={
              selected.questions
                ? `${selected.accuracy}% de acertos`
                : "Sem questões"
            }
          />
          <Chip label={`Teoria ${fmtHours(selected.theorySeconds || 0)}`} />
          <Chip label={`Questões ${fmtHours(selected.questionSeconds || 0)}`} />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Importância {selected.importance}/5 · Peso na prova{" "}
          {selected.examWeight}/5 · Entendimento {selected.confidence}/5
        </Typography>
      </Box>
    </Stack>
  );
}
