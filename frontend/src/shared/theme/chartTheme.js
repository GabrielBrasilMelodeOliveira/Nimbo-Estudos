export const chartColors = {
  theory: "#39745d",
  questions: "#d9a441",
  volume: "#5777c6",
  correct: "#39745d",
  incorrect: "#c95e68",
};

export const chartSx = {
  "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": { stroke: "transparent" },
  "& .MuiChartsAxis-tickLabel": { fill: "#728279", fontSize: 11 },
  "& .MuiChartsGrid-line": { stroke: "#e5ece7", strokeDasharray: "3 5" },
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
  "& .MuiChartsLegend-root": { fontSize: 12, color: "#53685c" },
};
