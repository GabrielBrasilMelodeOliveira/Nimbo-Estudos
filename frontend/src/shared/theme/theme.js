import { createTheme } from "@mui/material/styles";
export const theme = createTheme({
  palette: { primary: { main: "#39745d" }, background: { default: "#f5f7f5" } },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    button: { textTransform: "none" },
  },
  shape: { borderRadius: 10 },
  components: { MuiButton: { defaultProps: { disableElevation: true } } },
});
