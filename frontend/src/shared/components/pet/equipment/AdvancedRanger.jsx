import { mixColor, owlDefaults } from "../owlAppearance.js";

const leather = {
  outline: "#302E21",
  dark: "#4E3C27",
  base: "#8D6540",
  light: "#C39A60",
  cream: "#D9D2AD",
};
const rangerGreen = (appearance) =>
  appearance.scarfColor.toUpperCase() === owlDefaults.scarfColor
    ? "#687C39"
    : appearance.scarfColor;

export function RangerMantle({ rank, appearance }) {
  const green = rangerGreen(appearance);
  return (
    <>
      <g
        className="hero-cape"
        data-equipment="class-mantle"
        data-body-accessory={
          appearance.bodyAccessory === "CAPE" ? "CAPE" : undefined
        }
      >
        <path
          d="M17 33h23v5h3v13h-3v7h-5v3H23v-2h-6v3h-6v-3H6v2H1v-6h2v-8h5v-6h4v-5h5z"
          fill={leather.outline}
        />
        <path
          d="M18 35h20v4h3v11h-3v6h-4v3H24v-2h-8v3h-4v-3H7v2H3v-3h2v-8h4v-6h5v-5h4z"
          fill={green}
        />
        <path
          d="M16 39h4v13h-4v4h-4v-2H8v3H5v-2h2v-6h4v-6h5zM36 40h3v11h-3v6h-3v-2h2v-6h1z"
          fill={mixColor(green, "#293621", 0.48)}
        />
        {rank === 7 && (
          <path
            d="M9 46h5v2h-3v3H8v3H5v-3h2v-3h2zM20 55h7v2h-7zM33 56h3v2h-3z"
            fill={mixColor(green, "#D4D68A", 0.35)}
          />
        )}
      </g>
      <g data-equipment="quiver" transform="rotate(-16 14 35)">
        <path d="M9 28h9v25h-2v4H9v-3H7V31h2z" fill={leather.outline} />
        <path d="M10 30h7v22h-2v3h-5v-3H9V32h1z" fill={leather.base} />
        <path d="M10 31h2v20h-2zM10 53h5v1h-5z" fill={leather.light} />
        <path d="M8 29h10v4H8zM10 41h7v2h-7z" fill={leather.dark} />
        <path
          d="M10 16h1v14h-1zM13 13h1v17h-1zM16 16h1v14h-1z"
          fill={leather.light}
        />
        <path
          d="M8 14h2v2h2v5h-2v-2H8zM11 11h2v2h2v5h-2v-2h-2zM15 13h2v2h2v5h-2v-2h-2z"
          fill={green}
        />
        <path d="M9 15h1v3H9zM12 12h1v3h-1zM16 14h1v3h-1z" fill="#B1B877" />
      </g>
    </>
  );
}

export function RangerArmor({ rank, appearance }) {
  const green = rangerGreen(appearance);
  const light = mixColor(green, "#D6D4A0", 0.35);
  return (
    <g data-armor="RANGER" data-armor-tier={rank}>
      <g data-equipment="commander-armor">
        <path
          d="M21 36h14v3h5v6h2v9h-3v6h-7v-2h-4v3h-9v-6h-2V43h4z"
          fill={leather.outline}
        />
        <path
          d="M23 38h10v3h5v5h2v7h-3v5h-5v-2h-5v3h-6v-5h-2V44h4z"
          fill={green}
        />
        <path
          d="M24 39h8v2h4v2h-9v3h-5v6h-2v-7h4zM25 55h3v3h-3z"
          fill={light}
        />
        <path
          d="M34 44h4v9h-3v3h-5v-2h3v-3h1z"
          fill={mixColor(green, "#293621", 0.48)}
        />
        <path
          d="M20 50h19v4H20zM25 40h3v4h3v4h3v4h-4v-5h-3v-4h-2z"
          fill={leather.dark}
        />
        <path
          d="M21 51h17v2H21zM26 40h1v4h3v4h3v3h-2v-4h-3v-4h-2z"
          fill={leather.light}
        />
        <path d="M28 50h5v5h-5z" fill="#C5A25E" />
        <path d="M29 51h3v2h-3z" fill={leather.dark} />
        {/* Light cloth and laced leather greaves echo the archer reference. */}
        <path
          d="M21 56h7v6h-2v3h-7v-4h2zM33 56h6v3h3v6h-7v-4h-2z"
          fill={leather.outline}
        />
        <path
          d="M22 57h5v4h-2v2h-5v-2h2zM34 57h4v3h3v3h-5v-3h-2z"
          fill={leather.cream}
        />
        <path d="M20 61h6v4h-7v-2h1zM36 61h6v4h-6z" fill={leather.base} />
        <path
          d="M21 61h3v1h-3zM20 63h4v1h-4zM37 61h3v1h-3zM37 63h4v1h-4z"
          fill={leather.light}
        />
      </g>
      <g data-equipment="pauldrons">
        <path
          d="M13 36h8v2h4v5h-3v3H11v-3H9v-4h4zM37 38h6v3h3v5h-9v-3h-2v-3h2z"
          fill={leather.outline}
        />
        <path
          d="M14 37h6v2h3v3h-2v2h-9v-2h-1v-2h3zM38 39h4v3h2v2h-6v-2h-2v-1h2z"
          fill={leather.base}
        />
        <path
          d="M14 38h5v1h3v2h-8v2h-2v-3h2zM38 40h3v2h2v1h-5z"
          fill={leather.light}
        />
        <path d="M17 38h1v5h-1zM39 40h1v3h-1z" fill={leather.dark} />
      </g>
      <g data-equipment="master-insignia">
        <path d="M28 39h3v1h2v2h-3v2h-2v-2h-2v-1h2z" fill={light} />
        <path d="M29 40h1v3h-1z" fill={leather.cream} />
      </g>
      {rank === 7 && (
        <g data-equipment="legend-armor">
          <path
            d="M14 36h7v2h3v2h-5v-1h-5zM37 38h5v2h-5zM22 56h2v3h-2zM35 56h2v3h-2z"
            fill={light}
          />
          <path d="M33 51h5v7h-6v-5h1z" fill={leather.outline} />
          <path d="M34 52h3v4h-4v-3h1z" fill={leather.light} />
          <path d="M35 53h1v1h-1z" fill={leather.dark} />
        </g>
      )}
    </g>
  );
}

export function RangerHeadband({ rank, appearance }) {
  const green = rangerGreen(appearance);
  return (
    <g data-headwear="HEADBAND" data-equipment="forest-headband">
      <path
        d="M13 14h5v-3h8V9h10v1h5v3h3v5h-4v-3H27v1h-8v3h-6z"
        fill={leather.outline}
      />
      <path d="M14 15h5v-3h8v-2h8v1h5v3h3v2h-2v-2H26v1h-7v2h-5z" fill={green} />
      <path d="M19 13h8v-1h11v1H27v1h-8zM14 15h3v1h-3z" fill="#B4BD7B" />
      <path
        d="M14 14V9h-3V7H9V4h3v2h4v3h3v5zM18 12V7h-2V3h3v3h3v5z"
        fill={leather.dark}
      />
      <path
        d="M15 13V9h-2V7h-2V6h1v1h4v3h2v2zM19 10V7h-2V5h1v2h3v3z"
        fill={leather.light}
      />
      <path d="M16 14h4v3h-3v3h-4v-2h2z" fill={green} />
      {rank === 7 && (
        <>
          <path d="M23 12V8h-2V5h2v2h3v4zM30 11V6h2v3h2v2z" fill={green} />
          <path d="M23 8h1v3h-1zM31 8h1v2h-1zM17 15h2v1h-2z" fill="#C6CD8D" />
        </>
      )}
    </g>
  );
}

export function RangerWeapons({ rank }) {
  return (
    <g
      data-career="RANGER"
      transform={rank === 7 ? "translate(1 -2)" : "rotate(9 46 44)"}
    >
      <g className="hero-weapon" data-equipment="bow">
        {/* Recurved wooden limbs, bound grip and a drawn string instead of a metal bow. */}
        <path
          d="M47 17h3v5h3v6h3v8h2v14h-2v8h-3v6h-3v6h-3v-4h2v-5h3v-7h2V33h-2v-6h-3v-6h-2z"
          fill={leather.dark}
        />
        <path
          d="M48 18h1v5h3v6h3v8h2v12h-2v8h-3v6h-3v5h-1v-3h2v-5h3v-7h2V34h-2v-6h-3v-6h-2z"
          fill={leather.light}
        />
        <path
          d="M50 24h1v4h2v6h1v5h1v-4h-1v-7h-2v-5h-2zM54 51h1v5h-2v5h-2v3h-1v-4h2v-5h2z"
          fill="#E3C48B"
        />
        <path d="M53 40h5v8h-5z" fill={leather.outline} />
        <path d="M54 40h3v7h-3zM53 39h4v1h-4z" fill={leather.base} />
        <path d="M54 41h3v1h-3zM54 44h3v1h-3z" fill={leather.cream} />
        <path
          d={rank === 7 ? "M48 21L31 44L48 66" : "M48 21L43 44L48 66"}
          fill="none"
          stroke="#D6C8A1"
          strokeWidth=".65"
        />
        <g data-equipment="ranger-arrow">
          <path
            d={rank === 7 ? "M30 43h31v1H30z" : "M40 43h21v1H40z"}
            fill={leather.light}
          />
          <path d="M60 41h2v1h2v2h-2v1h-2z" fill="#9CA7A0" />
          <path
            d={
              rank === 7
                ? "M29 41h3v1h3v3h-3v-1h-3z"
                : "M38 41h3v1h3v3h-3v-1h-3z"
            }
            fill="#87994C"
          />
        </g>
      </g>
    </g>
  );
}
