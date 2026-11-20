/**
 * CORES DO NIMBO — edite as quatro cores de uma paleta ou troque activePaletteName.
 * dark: textos/menu; primary: ações; accent: destaques/gráficos; light: superfícies.
 * O fundo do site permanece branco em todas as paletas.
 */
export const colorPalettes = {
  ocean: {
    dark: "#1B262C",
    primary: "#0F4C75",
    accent: "#3282B8",
    light: "#BBE1FA",
  },
  forest: {
    dark: "#183B34",
    primary: "#286F60",
    accent: "#5CA58D",
    light: "#DCEEE5",
  },
  violet: {
    dark: "#29233D",
    primary: "#5B418B",
    accent: "#9272C7",
    light: "#E9DFF8",
  },
  terracotta: {
    dark: "#382B26",
    primary: "#934C35",
    accent: "#C87955",
    light: "#F7DECB",
  },
};

export const activePaletteName = "ocean";
export const siteBackground = "#FFFFFF";
const palette = colorPalettes[activePaletteName];

function mix(first, second, amount) {
  return (
    "#" +
    [1, 3, 5]
      .map((offset) => {
        const start = parseInt(first.slice(offset, offset + 2), 16);
        const end = parseInt(second.slice(offset, offset + 2), 16);
        return Math.round(start + (end - start) * amount)
          .toString(16)
          .padStart(2, "0");
      })
      .join("")
  );
}
export function withOpacity(color, opacity) {
  const channels = [1, 3, 5].map((offset) =>
    parseInt(color.slice(offset, offset + 2), 16),
  );
  return `rgba(${channels.join(", ")}, ${opacity})`;
}

export const designColors = {
  ...palette,
  background: siteBackground,
  paper: siteBackground,
  text: palette.dark,
  muted: mix(palette.dark, siteBackground, 0.34),
  subtle: mix(palette.dark, siteBackground, 0.48),
  // Bordas estruturais neutras, independentes da paleta ativa.
  border: "#D0D0D0",
  borderHover: "#9E9E9E",
  surface: mix(palette.light, siteBackground, 0.82),
  selected: mix(palette.light, siteBackground, 0.35),
  primaryDark: mix(palette.primary, palette.dark, 0.24),
  sidebar: palette.dark,
};

// Cores semânticas: acertos continuam verdes e erros vermelhos em qualquer paleta.
export const statusColors = {
  success: "#25764D",
  successSoft: "#EDF7F0",
  error: "#BD3545",
  errorSoft: "#FDEEF0",
  warning: "#975B00",
  warningSoft: "#FFF5E5",
};
