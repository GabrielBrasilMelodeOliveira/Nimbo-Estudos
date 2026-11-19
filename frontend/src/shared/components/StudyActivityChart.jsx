import { Stack, Typography } from "@mui/material";
import { ChartsContainer } from "@mui/x-charts/ChartsContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { dateBR, fmtHours } from "../utils/utils.js";

export default function StudyActivityChart({ daily, height = 280, width }) {
  return (
    <>
      <Stack direction="row" sx={{ gap: 2, flexWrap: "wrap" }}>
        <Typography variant="caption" color="#39745d">
          ● Teoria (horas)
        </Typography>
        <Typography variant="caption" color="#ab7e20">
          ● Questões (horas)
        </Typography>
        <Typography variant="caption" color="#4e6ccf">
          ● Questões resolvidas (quantidade)
        </Typography>
      </Stack>
      <ChartsContainer
        height={height}
        width={width}
        skipAnimation
        xAxis={[
          {
            id: "date",
            scaleType: "band",
            data: daily.map((day) => day.date),
            valueFormatter: (date) => dateBR(date).slice(0, 5),
          },
        ]}
        yAxis={[
          { id: "hours", position: "left", label: "Horas", min: 0 },
          {
            id: "questions",
            position: "right",
            label: "Questões",
            min: 0,
            tickMinStep: 1,
          },
        ]}
        series={[
          {
            type: "bar",
            id: "theory",
            data: daily.map((day) => (day.theorySeconds || 0) / 3600),
            yAxisId: "hours",
            stack: "time",
            label: "Tempo de teoria",
            color: "#39745d",
            valueFormatter: (value) => fmtHours(value * 3600),
          },
          {
            type: "bar",
            id: "question-time",
            data: daily.map((day) => (day.questionSeconds || 0) / 3600),
            yAxisId: "hours",
            stack: "time",
            label: "Tempo em questões",
            color: "#dfaf55",
            valueFormatter: (value) => fmtHours(value * 3600),
          },
          {
            type: "line",
            id: "question-count",
            data: daily.map(
              (day) =>
                day.questions ?? (day.correct || 0) + (day.incorrect || 0),
            ),
            yAxisId: "questions",
            label: "Questões resolvidas",
            color: "#4e6ccf",
            curve: "linear",
            showMark: true,
            valueFormatter: (value) => `${value || 0} questões`,
          },
        ]}
      >
        <BarPlot />
        <LinePlot />
        <MarkPlot />
        <ChartsXAxis axisId="date" />
        <ChartsYAxis axisId="hours" />
        <ChartsYAxis axisId="questions" />
        <ChartsTooltip />
      </ChartsContainer>
    </>
  );
}
