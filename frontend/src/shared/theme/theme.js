import { surfaceStyles } from "./surfaceStyles.js";
import { designColors, statusColors, withOpacity } from "./designColors.js";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: designColors.primary,
      light: designColors.accent,
      dark: designColors.primaryDark,
      contrastText: designColors.paper,
    },
    secondary: { main: designColors.accent, contrastText: designColors.dark },
    background: { default: designColors.background, paper: designColors.paper },
    text: { primary: designColors.text, secondary: designColors.muted },
    divider: designColors.border,
    success: { main: statusColors.success },
    error: { main: statusColors.error },
    warning: { main: statusColors.warning },
    info: { main: designColors.primary },
    action: {
      hover: withOpacity(designColors.accent, 0.06),
      selected: withOpacity(designColors.accent, 0.12),
      focus: withOpacity(designColors.accent, 0.16),
    },
  },
  typography: {
    fontFamily: '"Inter Variable", sans-serif',
    button: { textTransform: "none" },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiPaper: {
      defaultProps: { elevation: 2 },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          "&.MuiPaper-outlined": {
            boxShadow: surfaceStyles.cardShadow,
            borderRadius: surfaceStyles.borderRadius,
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          "&.Mui-focusVisible": {
            outline: `2px solid ${designColors.primary}`,
            outlineOffset: 2,
          },
        },
      },
    },
    MuiTextField: { defaultProps: { size: "small", fullWidth: true } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          minWidth: 0,
          gap: 6,
          flexShrink: 0,
          "&.MuiButton-outlined": { borderColor: designColors.border },
          "&.MuiButton-outlined:hover": {
            borderColor: designColors.borderHover,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: { outlined: { borderColor: designColors.border } },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: designColors.paper,
          minWidth: 0,
          maxWidth: "100%",
          minHeight: 44,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: designColors.border,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: designColors.borderHover,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: designColors.primary,
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: statusColors.error,
          },
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
