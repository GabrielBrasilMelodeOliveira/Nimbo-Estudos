import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  LinearProgress,
} from "@mui/material";
export function GoalStat({ label, actual, target, onClick, unit = "" }) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardActionArea onClick={onClick} sx={{ height: "100%" }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="h5" sx={{ my: 1, fontWeight: 700 }}>
            {actual}
            {target > 0 ? ` / ${target}` : ""}
            {unit}
          </Typography>
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
