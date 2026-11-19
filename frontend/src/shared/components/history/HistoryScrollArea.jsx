import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

export default function HistoryScrollArea({ label, filterKey, children }) {
  const container = useRef(null);
  useEffect(() => {
    if (container.current) container.current.scrollTop = 0;
  }, [filterKey]);
  return (
    <Box
      ref={container}
      role="region"
      aria-label={label}
      tabIndex={0}
      sx={{
        maxHeight: { xs: 360, md: 480 },
        overflow: "auto",
        minWidth: 0,
        scrollbarGutter: "stable",
        overscrollBehaviorY: "contain",
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: 2,
        },
        "& table": {
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
        },
        "& thead th": {
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: "background.paper",
        },
      }}
    >
      {children}
    </Box>
  );
}
