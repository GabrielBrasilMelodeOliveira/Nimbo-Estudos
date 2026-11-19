import { LineChart } from "@mui/x-charts/LineChart";
import { dateBR } from "../../../shared/utils/utils.js";
export default function AccuracyTrendChart({ daily, width }) {
  return (
    <LineChart
      height={320}
      width={width}
      skipAnimation
      xAxis={[
        {
          scaleType: "point",
          data: daily.map((day) => day.date),
          valueFormatter: (date) => dateBR(date).slice(0, 5),
        },
      ]}
      yAxis={[
        {
          min: -5,
          max: 105,
          label: "%",
          tickInterval: [0, 20, 40, 60, 80, 100],
        },
      ]}
      series={[
        {
          id: "correct",
          data: daily.map((day) =>
            day.correct + day.incorrect
              ? (100 * day.correct) / (day.correct + day.incorrect)
              : null,
          ),
          label: "Acertos",
          color: "#39745d",
          showMark: true,
          connectNulls: true,
          curve: "linear",
          valueFormatter: (value) =>
            value == null ? "Sem questões" : `${value.toFixed(1)}%`,
        },
        {
          id: "incorrect",
          data: daily.map((day) =>
            day.correct + day.incorrect
              ? (100 * day.incorrect) / (day.correct + day.incorrect)
              : null,
          ),
          label: "Erros",
          color: "#c54e4e",
          showMark: true,
          connectNulls: true,
          curve: "linear",
          valueFormatter: (value) =>
            value == null ? "Sem questões" : `${value.toFixed(1)}%`,
        },
      ]}
      sx={{
        "& .MuiLineChart-mark": { opacity: 1, strokeWidth: 2 },
        "& .MuiLineChart-line": { strokeWidth: 3 },
      }}
    />
  );
}
