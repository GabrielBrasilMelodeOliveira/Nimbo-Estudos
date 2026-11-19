import { LineChart } from "@mui/x-charts/LineChart";
import { dateBR } from "../utils/utils.js";
import { chartColors, chartSx } from "../theme/chartTheme.js";

export default function QuestionVolumeChart({ daily, height = 280, width }) {
  return (
    <LineChart
      height={height}
      width={width}
      skipAnimation
      grid={{ horizontal: true }}
      sx={chartSx}
      xAxis={[
        {
          scaleType: "point",
          data: daily.map((day) => day.date),
          valueFormatter: (date) => dateBR(date).slice(0, 5),
        },
      ]}
      yAxis={[{ min: 0, tickMinStep: 1, label: "Questões" }]}
      series={[
        {
          id: "question-count",
          label: "Questões resolvidas",
          data: daily.map(
            (day) => day.questions ?? (day.correct || 0) + (day.incorrect || 0),
          ),
          color: chartColors.volume,
          curve: "monotoneX",
          showMark: daily.length === 1,
          area: true,
          valueFormatter: (value) => `${value || 0} questões`,
        },
      ]}
    />
  );
}
