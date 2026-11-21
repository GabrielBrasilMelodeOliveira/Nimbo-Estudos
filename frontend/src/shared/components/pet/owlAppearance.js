export const owlDefaults = {
  path: "WARRIOR",
  featherColor: "#55BDD5",
  scarfColor: "#17475F",
  eyeColor: "#244B62",
  headAccessory: "AUTO",
  bodyAccessory: "SATCHEL",
};
export const owlPaths = [
  {
    value: "WARRIOR",
    label: "Guerreiro",
    description: "Espada, escudo e armadura a cada conquista.",
  },
  {
    value: "MAGE",
    label: "Mago",
    description: "Grimório, cajado e runas para sua jornada.",
  },
  {
    value: "RANGER",
    label: "Patrulheiro",
    description: "Arco, aljava e equipamentos de exploração.",
  },
];
export const headAccessories = [
  { value: "AUTO", label: "Da classe" },
  { value: "NONE", label: "Sem acessório" },
  { value: "GOGGLES", label: "Óculos de explorador" },
  { value: "HAT", label: "Chapéu de mago" },
  { value: "HOOD", label: "Capuz" },
  { value: "CROWN", label: "Coroa" },
];
export const bodyAccessories = [
  { value: "SATCHEL", label: "Bolsa de viagem" },
  { value: "CAPE", label: "Capa" },
  { value: "NONE", label: "Sem acessório" },
];
const identities = [
  ["nori", "Orvalho", "#55BDD5"],
  ["luma", "Lavanda", "#AB8DD8"],
  ["favo", "Mel", "#D8AF60"],
  ["brisa", "Brisa", "#86C9E7"],
  ["mimo", "Coral", "#DC8AA5"],
  ["foli", "Floresta", "#87B484"],
  ["fira", "Crepúsculo", "#D8916D"],
  ["tuca", "Lago", "#64C8BE"],
  ["duna", "Areia", "#C5AE83"],
  ["noa", "Noite", "#7C91C2"],
  ["iris", "Aurora", "#B89FDF"],
];
export const owlIdentities = Object.fromEntries(
  identities.map(([id, short, color]) => [
    id,
    {
      name: `Nimbo ${short}`,
      short,
      color,
      light: mixColor(color, "#FFFFFF", 0.78),
      type: "Coruja",
    },
  ]),
);
export const classNamesByPath = {
  WARRIOR: [
    "Coruja Viajante",
    "Aprendiz",
    "Soldado",
    "Guardião da Vigília",
    "Mestre de Batalha",
    "Comandante da Aurora",
    "Lenda da Constância",
  ],
  MAGE: [
    "Coruja Viajante",
    "Aprendiz",
    "Mago",
    "Guardião das Runas",
    "Mestre Arcano",
    "Arquimago da Aurora",
    "Lenda da Constância",
  ],
  RANGER: [
    "Coruja Viajante",
    "Aprendiz",
    "Batedor",
    "Sentinela do Bosque",
    "Mestre Rastreador",
    "Guardião do Horizonte",
    "Lenda da Constância",
  ],
};
export const companionRank = (stage) =>
  Math.min(7, Math.max(1, Math.trunc(Number(stage) || 1)));
export const companionClassName = (stage, path = "WARRIOR") =>
  (classNamesByPath[path] || classNamesByPath.WARRIOR)[
    companionRank(stage) - 1
  ];
export const isHexColor = (color) =>
  typeof color === "string" && /^#[0-9a-f]{6}$/i.test(color);

export function mixColor(color, target, amount) {
  return (
    "#" +
    [1, 3, 5]
      .map((offset) =>
        Math.round(
          parseInt(color.slice(offset, offset + 2), 16) * (1 - amount) +
            parseInt(target.slice(offset, offset + 2), 16) * amount,
        )
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}
export function resolveOwlAppearance(appearance = {}, species = "nori") {
  const defaults = {
    ...owlDefaults,
    featherColor: owlIdentities[species]?.color || owlDefaults.featherColor,
  };
  return Object.fromEntries(
    Object.entries(defaults).map(([key, fallback]) => {
      const value = appearance?.[key];
      const allowed =
        key === "path"
          ? owlPaths
          : key === "headAccessory"
            ? headAccessories
            : bodyAccessories;
      return [
        key,
        key.endsWith("Color")
          ? isHexColor(value)
            ? value.toUpperCase()
            : fallback
          : allowed.some((option) => option.value === value)
            ? value
            : fallback,
      ];
    }),
  );
}
export function owlPalette(appearance) {
  return {
    ink: "#142735",
    feather: appearance.featherColor,
    featherLight: mixColor(appearance.featherColor, "#E5FBFF", 0.55),
    featherHighlight: mixColor(appearance.featherColor, "#FFFFFF", 0.8),
    featherShadow: mixColor(appearance.featherColor, "#12354A", 0.42),
    featherDark: mixColor(appearance.featherColor, "#102536", 0.68),
    scarf: appearance.scarfColor,
    scarfLight: mixColor(appearance.scarfColor, "#CBE7F2", 0.3),
    scarfDark: mixColor(appearance.scarfColor, "#0A1A2C", 0.4),
    eye: appearance.eyeColor,
    gold: "#D8A44E",
    goldLight: "#FFE19B",
    leather: "#A96C37",
    leatherLight: "#D79750",
  };
}
