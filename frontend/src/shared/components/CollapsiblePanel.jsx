import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ChevronDown } from "lucide-react";
export default function CollapsiblePanel({
  title,
  children,
  defaultExpanded = false,
}) {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      variant="outlined"
      disableGutters
      sx={{ "&:before": { display: "none" }, borderRadius: 2 }}
    >
      <AccordionSummary expandIcon={<ChevronDown size={20} />}>
        <Typography fontWeight={600}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
}
