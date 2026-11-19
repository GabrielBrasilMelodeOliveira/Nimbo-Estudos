import { Box, LinearProgress, Typography } from "@mui/material";
import { AccuracyTag } from "../../../shared/components/UI.jsx";
import { percentage } from "../../../shared/utils/utils.js";
import { statusColors } from "../../../shared/theme/designColors.js";

export default function SubjectPerformanceList({ subjects }) {
  return (
    <Box
      component="ul"
      aria-label="Desempenho por assunto"
      sx={{ listStyle: "none", p: 0, m: 0 }}
    >
      {subjects.map((subject) => {
        const accuracy = percentage(subject.correct, subject.total);
        const color =
          accuracy >= 80
            ? statusColors.success
            : accuracy >= 60
              ? statusColors.warning
              : statusColors.error;
        return (
          <Box
            component="li"
            key={subject.id}
            sx={{
              display: "grid",
              alignItems: "center",
              columnGap: { xs: 1, lg: 2 },
              rowGap: 1.5,
              gridTemplateColumns: {
                xs: "minmax(0,1fr) minmax(0,1fr) 72px",
                lg: "minmax(0,1fr) 100px 100px minmax(100px,240px) 72px",
              },
              py: 2,
              minWidth: 0,
              borderBottom: "1px solid",
              borderColor: "divider",
              "&:last-child": { borderBottom: 0 },
            }}
          >
            <Box sx={{ minWidth: 0, gridColumn: { xs: "1 / -1", lg: "auto" } }}>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ overflowWrap: "anywhere" }}
              >
                {subject.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {subject.discipline.name}
              </Typography>
            </Box>
            {[
              [subject.correct, "acertos"],
              [subject.total - subject.correct, "erros"],
            ].map(([count, label], index) => (
              <Typography
                key={label}
                variant="caption"
                color="text.secondary"
                sx={{
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                  whiteSpace: "nowrap",
                  gridColumn: { xs: index + 1, lg: "auto" },
                  gridRow: { xs: 2, lg: "auto" },
                }}
              >
                <Box component="strong" sx={{ color: "text.primary", mr: 0.5 }}>
                  {count.toLocaleString("pt-BR")}
                </Box>
                {label}
              </Typography>
            ))}
            <LinearProgress
              aria-label={`Taxa de acertos em ${subject.title}`}
              variant="determinate"
              value={accuracy}
              sx={{
                gridColumn: { xs: "1 / -1", lg: "auto" },
                gridRow: { xs: 3, lg: "auto" },
                minWidth: 0,
                width: "100%",
                height: 6,
                borderRadius: 3,
                "& .MuiLinearProgress-bar": { bgcolor: color },
              }}
            />
            <Box
              sx={{
                justifySelf: "end",
                fontVariantNumeric: "tabular-nums",
                gridColumn: { xs: 3, lg: "auto" },
                gridRow: { xs: 2, lg: "auto" },
              }}
            >
              <AccuracyTag correct={subject.correct} total={subject.total} />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
