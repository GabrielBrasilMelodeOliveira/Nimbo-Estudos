import { designColors, statusColors } from "./designColors.js";
export const chartColors = {
  theory: designColors.primary,
  questions: designColors.accent,
  volume: designColors.accent,
  correct: statusColors.success,
  incorrect: statusColors.error,
};

export const chartSx = {
  "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": { stroke: "transparent" },
  "& .MuiChartsAxis-tickLabel": { fill: designColors.muted, fontSize: 11 },
  "& .MuiChartsGrid-line": {
    stroke: designColors.border,
    strokeDasharray: "3 5",
  },
  "& .MuiLineChart-line": {
    strokeWidth: 2.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  "& .MuiLineChart-area": { opacity: 0.08 },
  "& .MuiLineChart-mark": {
    strokeWidth: 0,
    scale: "0.65",
    transformBox: "fill-box",
    transformOrigin: "center",
  },
  '& .MuiLineChart-mark[data-series="correct"]': { fill: chartColors.correct },
  '& .MuiLineChart-mark[data-series="incorrect"]': {
    fill: chartColors.incorrect,
  },
  '& .MuiLineChart-mark[data-series="question-count"]': {
    fill: chartColors.volume,
  },
  "& .MuiChartsLegend-root": { fontSize: 12, color: designColors.muted },
};
