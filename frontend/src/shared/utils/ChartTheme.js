/** Cores usadas em todos os gráficos, para manter a mesma paleta em qualquer tela. */
export const chartColors = {
    correct: "#39745d",
    incorrect: "#c54e4e",
    theory: "#39745d",
    question: "#dfaf55",
    count: "#4e6ccf",
};

/**
 * Estilo base dos gráficos do MUI X: sem linhas e marcas nos eixos, grade
 * tracejada discreta, textos suaves e linhas arredondadas.
 * Uso: sx={modernChartSx} ou sx={[modernChartSx, { ...estilos extras }]}
 */
export const modernChartSx = (theme) => ({
    "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": { display: "none" },
    "& .MuiChartsAxis-tickLabel, & .MuiChartsAxis-label": {
        fill: theme.palette.text.secondary,
        fontSize: 12,
    },
    "& .MuiChartsGrid-line": { strokeDasharray: "4 6" },
    "& .MuiLineElement-root": {
        strokeWidth: 2.5,
        strokeLinecap: "round",
        strokeLinejoin: "round",
    },
});