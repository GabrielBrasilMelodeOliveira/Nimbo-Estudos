import { Paper, Typography } from "@mui/material";

export function ChartPanel({ title, description, children }) {
  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>
      {children}
    </Paper>
  );
}
