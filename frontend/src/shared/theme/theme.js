import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: { primary: { main: "#39745d" }, background: { default: "#f5f7f5" } },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    button: { textTransform: "none" },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { minWidth: 0, gap: 6, flexShrink: 0 } },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          minWidth: 0,
          maxWidth: "100%",
          minHeight: 44,
        },
        input: {
          fontSize: 14,
          padding: "10px 12px",
          boxSizing: "content-box",
          height: "1.5em",
          "&.MuiInputBase-inputMultiline": { height: "auto", padding: 0 },
        },
      },
    },
    MuiSelect: { styleOverrides: { select: { minWidth: 0 } } },
    MuiFormControl: { styleOverrides: { root: { minWidth: 0 } } },
    MuiIconButton: { defaultProps: { size: "small" } },
  },
});
