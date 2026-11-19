import { statusColors } from "../../../shared/theme/designColors.js";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
} from "@mui/material";
export function GoalStat({
  label,
  actual,
  target,
  onClick,
  unit = "",
  completed = target > 0 && actual >= target,
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        borderColor: completed ? "success.main" : "divider",
        bgcolor: completed ? statusColors.successSoft : "background.paper",
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          height: "100%",
          borderColor: completed ? "success.main" : "divider",
          bgcolor: completed ? statusColors.successSoft : "background.paper",
        }}
      >
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="h5" sx={{ my: 1, fontWeight: 700 }}>
            {actual}
            {target > 0 ? ` / ${target}` : ""}
            {unit}
          </Typography>
          {completed && (
            <Chip
              size="small"
              color="success"
              label="✓ Meta cumprida! Bom trabalho!"
              sx={{ mb: 1 }}
            />
          )}
          {target > 0 ? (
            <LinearProgress
              variant="determinate"
              value={Math.min(100, (100 * actual) / target)}
              sx={{ height: 5, borderRadius: 1 }}
            />
          ) : (
            <Typography variant="caption">Definir meta</Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
