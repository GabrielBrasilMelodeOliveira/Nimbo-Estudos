import { SearchableSelect } from "../../shared/components/FormControls.jsx";
import { Box, Paper, Stack, Typography, MenuItem } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { TopicSelect } from "../../shared/components/UI.jsx";
import { fmtHours, dateBR } from "../../shared/utils/utils.js";
import { useAnalytics } from "./hooks/useAnalytics.jsx";
import { ChartPanel } from "./components/ChartPanel.jsx";

export default function Analytics({ data }) {
  const {
    comparisonLevel,
    setComparisonLevel,
    rankOrder,
    setRankOrder,
    reviewForecast,
    disciplineId,
    setDisciplineId,
    topicId,
    setTopicId,
    days,
    setDays,
    metric,
    setMetric,
    analysis,
    topics,
    daily,
    coverage,
    metrics,
    ranked,
  } = useAnalytics(data);
  const dateAxis = [
    {
      scaleType: "band",
      data: daily.map((day) => day.date),
      valueFormatter: (date) => dateBR(date).slice(0, 5),
    },
  ];
  const summaryCards = [
    [
      "Assuntos acompanhados",
      analysis.totalTopics || 0,
      `${analysis.completedTopics || 0} concluídos`,
    ],
    [
      "Questões resolvidas",
      analysis.totalQuestions || 0,
      analysis.totalQuestions
        ? `${analysis.accuracy}% de acertos`
        : "Sem registros ainda",
    ],
    [
      "Tempo líquido",
      fmtHours(analysis.totalSeconds),
      `Teoria ${fmtHours(analysis.totalTheorySeconds)} · Questões ${fmtHours(analysis.totalQuestionSeconds)}`,
    ],
    ["Revisões pendentes", analysis.dueReviews || 0, "Até hoje"],
  ];
  return (
    <Stack spacing={3} sx={{ width: "100%", minWidth: 0 }}>
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Resumo geral • todo o histórico
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              xl: "repeat(4, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {summaryCards.map(([label, value, description]) => (
            <Paper key={label} variant="outlined" sx={{ p: 2.5 }}>
              <Typography color="text.secondary">{label}</Typography>
              <Typography variant="h4" sx={{ my: 1 }}>
                {value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1.5fr 1fr" },
          gap: 2,
        }}
      >
        <SearchableSelect
          label="Disciplina"
          value={disciplineId}
          onChange={(event) => {
            setDisciplineId(event.target.value);
            setTopicId("");
            setComparisonLevel(event.target.value ? "topic" : "discipline");
          }}
        >
          <MenuItem value="">Todas as disciplinas</MenuItem>
          {(data.disciplines || []).map((discipline) => (
            <MenuItem key={discipline.id} value={String(discipline.id)}>
              {discipline.name}
            </MenuItem>
          ))}
        </SearchableSelect>
        <TopicSelect
          topics={topics}
          value={topicId}
          onChange={setTopicId}
          required={false}
          placeholder="Todos os assuntos • digite para buscar"
        />
        <SearchableSelect
          label="Período dos registros"
          value={days}
          onChange={(event) => setDays(Number(event.target.value))}
        >
          {[7, 30, 90].map((period) => (
            <MenuItem key={period} value={period}>
              Últimos {period} dias
            </MenuItem>
          ))}
        </SearchableSelect>
      </Paper>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            lg: "repeat(2, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
        <ChartPanel
          title="Questões por dia"
          description="Acertos e erros no período e nos assuntos selecionados."
        >
          <BarChart
            height={280}
            xAxis={dateAxis}
            series={[
              {
                data: daily.map((day) => day.correct),
                label: "Acertos",
                stack: "questions",
                color: "#39745d",
              },
              {
                data: daily.map((day) => day.incorrect),
                label: "Erros",
                stack: "questions",
                color: "#c57664",
              },
            ]}
          />
        </ChartPanel>
        <ChartPanel
          title="Tempo de estudo por dia"
          description="Horas líquidas de teoria e questões, sem duplicar o cronômetro."
        >
          <BarChart
            height={280}
            xAxis={dateAxis}
            series={[
              {
                data: daily.map((day) => day.theorySeconds / 3600),
                label: "Teoria",
                stack: "time",
                color: "#39745d",
                valueFormatter: (value) => fmtHours(value * 3600),
              },
              {
                data: daily.map((day) => day.questionSeconds / 3600),
                label: "Questões",
                stack: "time",
                color: "#dfaf55",
                valueFormatter: (value) => fmtHours(value * 3600),
              },
            ]}
            yAxis={[{ label: "Horas" }]}
          />
        </ChartPanel>
        <ChartPanel
          title="Cobertura do edital"
          description="Situação atual dos assuntos selecionados, independente do período."
        >
          <PieChart
            height={260}
            series={[
              {
                data: coverage,
                innerRadius: 55,
                outerRadius: 90,
                paddingAngle: 3,
              },
            ]}
          />
        </ChartPanel>
        <ChartPanel
          title={
            comparisonLevel === "topic" || topicId
              ? "Comparação entre assuntos"
              : "Comparação entre disciplinas"
          }
          description="Compare até 8 resultados e encontre os assuntos que precisam de reforço."
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{ mb: 2 }}
          >
            <SearchableSelect
              label="Comparar por"
              value={topicId ? "topic" : comparisonLevel}
              disabled={Boolean(topicId)}
              onChange={(event) => setComparisonLevel(event.target.value)}
            >
              <option value="discipline">Disciplinas</option>
              <option value="topic">Assuntos</option>
            </SearchableSelect>
            <SearchableSelect
              label="Ordem"
              value={rankOrder}
              onChange={(event) => setRankOrder(event.target.value)}
            >
              <option value="highest">Maiores resultados</option>
              <option value="lowest">Menores resultados</option>
            </SearchableSelect>
          </Stack>
          <SearchableSelect
            size="small"
            fullWidth
            label="Indicador"
            value={metric}
            onChange={(event) => setMetric(event.target.value)}
          >
            {Object.entries(metrics).map(([value, item]) => (
              <MenuItem key={value} value={value}>
                {item.label}
              </MenuItem>
            ))}
          </SearchableSelect>
          <BarChart
            height={280}
            layout="horizontal"
            yAxis={[
              {
                scaleType: "band",
                data: ranked.map((group) => group.name),
                width: 140,
                valueFormatter: (name, context) =>
                  context.location === "tick" && name.length > 22
                    ? `${name.slice(0, 21)}…`
                    : name,
              },
            ]}
            xAxis={[{ min: 0, ...(metric === "accuracy" ? { max: 100 } : {}) }]}
            series={[
              {
                data: ranked.map((group) =>
                  metric === "seconds" ? group.seconds / 3600 : group[metric],
                ),
                label:
                  metric === "seconds"
                    ? "Horas de estudo"
                    : metrics[metric].label,
                color: "#39745d",
                valueFormatter: (value) =>
                  metrics[metric].format(
                    metric === "seconds" ? value * 3600 : value,
                  ),
              },
            ]}
            localeText={{
              noData: "Sem registros para os filtros selecionados",
            }}
          />
        </ChartPanel>
        <ChartPanel
          title="Evolução dos acertos"
          description="Taxa diária nos registros filtrados. Dias sem questões não são tratados como erro."
        >
          <LineChart
            height={280}
            xAxis={dateAxis}
            yAxis={[{ min: 0, max: 100, label: "%" }]}
            series={[
              {
                data: daily.map((day) =>
                  day.correct + day.incorrect
                    ? (100 * day.correct) / (day.correct + day.incorrect)
                    : null,
                ),
                label: "Taxa de acertos",
                color: "#39745d",
                valueFormatter: (value) =>
                  value == null ? "Sem questões" : `${value.toFixed(1)}%`,
              },
            ]}
          />
        </ChartPanel>
        <ChartPanel
          title="Carga de revisões"
          description="Revisões pendentes dos assuntos selecionados: atrasadas e próximos 7 dias, independente do período de registros."
        >
          <BarChart
            height={280}
            xAxis={[
              {
                scaleType: "band",
                data: reviewForecast.map((day) => day.label),
              },
            ]}
            series={[
              {
                data: reviewForecast.map((day) => day.count),
                label: "Revisões pendentes",
                color: "#b38c40",
              },
            ]}
          />
        </ChartPanel>
      </Box>
    </Stack>
  );
}
