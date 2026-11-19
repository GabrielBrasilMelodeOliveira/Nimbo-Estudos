import { BarChart } from "@mui/x-charts/BarChart";
import { dateBR, fmtHours } from "../utils/utils.js";
import { chartColors, chartSx } from "../theme/chartTheme.js";

export default function StudyActivityChart({ daily, height = 280, width }) {
  return (
    <BarChart
      height={height}
      width={width}
      skipAnimation
      borderRadius={5}
      grid={{ horizontal: true }}
      sx={chartSx}
      xAxis={[
        {
          scaleType: "band",
          data: daily.map((day) => day.date),
          categoryGapRatio: 0.35,
          barGapRatio: 0.15,
          valueFormatter: (date) => dateBR(date).slice(0, 5),
        },
      ]}
      yAxis={[{ min: 0, label: "Horas" }]}
      series={[
        {
          id: "theory",
          data: daily.map((day) => (day.theorySeconds || 0) / 3600),
          label: "Teoria",
          color: chartColors.theory,
          valueFormatter: (value) => fmtHours(value * 3600),
        },
        {
          id: "question-time",
          data: daily.map((day) => (day.questionSeconds || 0) / 3600),
          label: "Questões",
          color: chartColors.questions,
          valueFormatter: (value) => fmtHours(value * 3600),
        },
      ]}
    />
  );
}
