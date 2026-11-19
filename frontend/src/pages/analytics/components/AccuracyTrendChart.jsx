import { LineChart } from "@mui/x-charts/LineChart";
import { chartColors, chartSx } from "../../../shared/theme/chartTheme.js";
import { dateBR } from "../../../shared/utils/utils.js";
export default function AccuracyTrendChart({ daily, width }) {
  const recordedDays = daily.filter(
    (day) => day.correct + day.incorrect > 0,
  ).length;
  return (
    <LineChart
      height={320}
      width={width}
      skipAnimation
      grid={{ horizontal: true }}
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
          color: chartColors.correct,
          showMark: recordedDays === 1,
          connectNulls: true,
          curve: "monotoneX",
          area: true,
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
          color: chartColors.incorrect,
          showMark: recordedDays === 1,
          connectNulls: true,
          curve: "monotoneX",
          area: true,
          valueFormatter: (value) =>
            value == null ? "Sem questões" : `${value.toFixed(1)}%`,
        },
      ]}
      sx={chartSx}
    />
  );
}
