import "@fontsource-variable/inter";
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import App from "./App.jsx";
import { theme } from "./shared/theme/theme.js";
import { globalStyles } from "./shared/theme/globalStyles.js";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
