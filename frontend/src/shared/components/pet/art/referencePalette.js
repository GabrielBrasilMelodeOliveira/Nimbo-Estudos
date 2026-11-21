import { mixColor, owlDefaults } from "../owlAppearance.js";
import { referenceColors } from "./owlReferencePixels.js";

/** Keep the reference shading intact; customization recolors material families. */
export function referencePalette(appearance) {
  const colors = [...referenceColors];
  if (appearance.featherColor.toUpperCase() !== owlDefaults.featherColor) {
    const feather = appearance.featherColor;
    [0.82, 0.66, 0.48, 0.25].forEach((shade, index) => {
      colors[index + 1] = mixColor(feather, "#071826", shade);
    });
    colors[5] = feather;
    [0.25, 0.52, 0.78].forEach((light, index) => {
      colors[index + 6] = mixColor(feather, "#F0FFFF", light);
    });
  }
  if (appearance.scarfColor.toUpperCase() !== owlDefaults.scarfColor) {
    [0.78, 0.55, 0.2].forEach((shade, index) => {
      colors[index + 11] = mixColor(appearance.scarfColor, "#071015", shade);
    });
    colors[14] = appearance.scarfColor;
    colors[15] = mixColor(appearance.scarfColor, "#A2DCEB", 0.25);
  }
  return colors;
}
