import { mixColor, owlDefaults } from "../owlAppearance.js";

const steel = {
  outline: "#17263B",
  shadow: "#233D63",
  blue: "#345C8E",
  blueLight: "#4F7BA8",
  silver: "#91A9B9",
  highlight: "#D7E5EA",
};
const capeColor = (appearance) =>
  appearance.scarfColor.toUpperCase() === owlDefaults.scarfColor
    ? "#B93846"
    : appearance.scarfColor;

export function WarriorMantle({ rank, appearance }) {
  const red = capeColor(appearance);
  return (
    <g
      className="hero-cape"
      data-equipment="class-mantle"
      data-body-accessory={
        appearance.bodyAccessory === "CAPE" ? "CAPE" : undefined
      }
    >
      <path
        d="M17 32h5v9h-5v5h-5v5H7v5H1v6h-6v-8h2v-7h3v-6h4v-4h6v-3h5z"
        fill={steel.outline}
      />
      <path
        d="M17 34h3v6h-5v5h-4v5H6v5H0v5h-3v-5h2v-7h3v-6h4v-4h6v-3h5z"
        fill={red}
      />
      <path
        d="M6 42h3v4H6v5H2v5h-3v3h-1v-5h3v-5h3v-5h2z"
        fill={mixColor(red, "#FFB0A2", 0.3)}
      />
      <path
        d="M17 32h25v5h4v7h3v9h4v7h-7v-3h-5v-3H19v3h-5v4H8v3H1v-7h2v-8h4v-7h4v-6h6z"
        fill={steel.outline}
      />
      <path
        d="M18 34h22v4h4v7h3v9h3v4h-3v-3h-5v-3H18v3h-5v4H7v3H3v-5h2v-7h4v-7h4v-6h5z"
        fill={red}
      />
      <path
        d="M17 37h3v13h-4v3h-4v5H7v3H4v-4h3v-7h4v-6h3v-5h3zM39 37h3v9h3v7h3v3h-3v-3h-4v-7h-2z"
        fill={mixColor(red, "#351C35", 0.45)}
      />
      <path
        d="M11 44h2v6h-3v6H7v3H5v-3h3v-7h3zM43 46h2v8h3v2h-3v-3h-2z"
        fill={mixColor(red, "#FFB0A2", 0.28)}
      />
      {rank === 7 && (
        <path
          d="M3 61h4v-2h5v-3h3v-2h2v2h-2v3h-3v2H7v2H3zM46 57h5v1h-5z"
          fill={steel.silver}
        />
      )}
    </g>
  );
}

export function WarriorArmor({ rank }) {
  return (
    <g data-armor="WARRIOR" data-armor-tier={rank}>
      <g data-equipment="commander-armor">
        <path
          d="M21 36h14v2h4v4h3v10h-3v6H22v-3h-4V42h3z"
          fill={steel.outline}
        />
        <path d="M23 38h10v2h4v4h3v7h-3v5H24v-3h-4V43h3z" fill={steel.blue} />
        <path
          d="M24 39h7v2h5v3h2v5h-5v-2h-5v-2h-5v-3h1z"
          fill={steel.blueLight}
        />
        <path
          d="M24 39h8v1h-8zM22 43h2v5h4v2h8v-1h2v2h-2v1h-9v-2h-5z"
          fill={steel.highlight}
        />
        <path
          d="M31 40h2v4h3v3h-2v-2h-3zM21 44h1v7h3v3h11v1H24v-3h-3z"
          fill={steel.silver}
        />
        <path d="M36 43h3v7h-3v2h-6v-2h5v-3h1z" fill={steel.shadow} />
        <path d="M20 51h20v4H20z" fill={steel.outline} />
        <path d="M21 52h8v2h-8zM34 52h5v2h-5z" fill="#775039" />
        <path d="M29 51h5v5h-5z" fill={steel.silver} />
        <path d="M30 52h3v2h-3z" fill={steel.shadow} />
        <path
          d="M22 56h7v4h-2v3h-7v-4h2zM32 56h7v3h3v4h-8v-3h-2z"
          fill={steel.outline}
        />
        <path
          d="M23 57h5v2h-2v3h-4v-2h1zM33 57h5v3h2v2h-5v-3h-2z"
          fill={steel.blue}
        />
        <path
          d="M23 57h4v1h-4zM34 58h3v1h-3zM22 61h4v1h-4zM35 61h5v1h-5z"
          fill={steel.highlight}
        />
      </g>
      <g data-equipment="pauldrons">
        <path
          d="M12 35h7v1h4v3h2v5h-3v3H11v-3H8v-5h2v-2h2zM37 36h5v2h4v3h2v5H36v-3h-2v-4h3z"
          fill={steel.outline}
        />
        <path
          d="M13 36h5v2h4v2h2v3h-3v2H12v-2H9v-3h2v-2h2zM38 37h3v2h4v3h2v2H37v-2h-2v-2h3z"
          fill={steel.blue}
        />
        <path
          d="M12 38h6v1h3v2H11v2H9v-3h3zM38 39h5v2h2v1h-8v-2h1z"
          fill={steel.silver}
        />
        <path
          d="M12 37h5v1h-5zM11 39h8v1h-8zM38 38h3v1h-3z"
          fill={steel.highlight}
        />
        <path d="M12 43h10v1H12zM38 43h7v1h-7z" fill={steel.blueLight} />
      </g>
      <g data-equipment="master-insignia">
        <path d="M27 40h3v3h-3zM38 38h2v2h-2z" fill={steel.highlight} />
        <path d="M28 40h1v2h-1z" fill="#B93846" />
      </g>
      {rank === 7 && (
        <g data-equipment="legend-armor">
          <path
            d="M23 55h3v4h-3zM35 55h3v4h-3zM24 46h1v3h-1zM29 47h4v1h-4z"
            fill={steel.highlight}
          />
          <path d="M24 56h1v2h-1zM36 56h1v2h-1z" fill={steel.blue} />
          <path d="M13 36h2v2h-2zM41 38h2v2h-2z" fill="#C74853" />
        </g>
      )}
    </g>
  );
}

export function WarriorHelmet({ rank }) {
  return (
    <g data-headwear="HELMET" data-equipment="knight-helmet">
      {/* Curved silver horns frame the owl's tufts; the open visor preserves both eyes. */}
      <path
        d="M15 8h-3V6H9V2h1v-4h3v5h2v2h3zM37 7h4V4h2V0h-1v-3h3v2h2v6h-2v4h-5v2h-3z"
        fill={steel.outline}
      />
      <path
        d="M14 7h-2V5h-2V2h1v-2h1v4h2v2h3v2h-3zM39 7h3V4h2V0h-1v-1h1v1h2v4h-2v4h-4v1h-1z"
        fill={steel.silver}
      />
      <path
        d="M11 1h1v3h-1zM12 5h2v1h-2zM44 0h1v4h-1zM41 6h2v1h-2z"
        fill={steel.highlight}
      />
      <path
        d="M13 18v-7h3V8h5V5h12v2h6v4h4v8h-4v-4H22v2h-5v12h-5V18z"
        fill={steel.outline}
      />
      <path
        d="M14 18v-6h3V9h5V6h10v2h6v4h3v5h-1v-3H21v2h-5v11h-3v-8z"
        fill={steel.blue}
      />
      <path
        d="M18 11V9h5V7h4v6h-5v2h-5v10h-2V15h2v-4zM34 9h3v3h3v1h-6z"
        fill={steel.silver}
      />
      <path
        d="M22 7h3v1h-3zM18 10h3v1h-3zM15 17h1v7h-1zM35 10h2v1h-2z"
        fill={steel.highlight}
      />
      <path d="M28 6h3v8h-3z" fill={steel.outline} />
      <path d="M29 7h1v6h-1z" fill={steel.highlight} />
      {rank === 7 && (
        <>
          <path
            d="M11 21h3v6h4v4h-5v-2h-3v-6h1zM41 20h3v7h-3v3h-3v-3h2v-3h1z"
            fill={steel.outline}
          />
          <path
            d="M12 22h1v6h4v2h-3v-2h-3v-4h1zM42 21h1v5h-3v2h-1v-2h2v-3h1z"
            fill={steel.silver}
          />
        </>
      )}
    </g>
  );
}

export function WarriorWeapons({ rank }) {
  return (
    <g data-career="WARRIOR">
      <g
        transform={
          rank === 7 ? "rotate(34 45 49) translate(-1 -1)" : "rotate(15 45 49)"
        }
      >
        <g className="hero-weapon" data-equipment="sword">
          <path
            d="M44 17h2v3h2v25h4v4h-5v9h-5v-9h-5v-4h5V20h2z"
            fill={steel.outline}
          />
          <path d="M44 20h2v25h-2z" fill={steel.highlight} />
          <path d="M46 22h1v23h-1z" fill={steel.silver} />
          <path d="M38 46h13v2H38zM43 55h3v2h-3z" fill={steel.silver} />
          <path d="M44 49h1v6h-1z" fill="#775039" />
          <path d="M39 46h4v1h-4zM47 46h3v1h-3z" fill={steel.highlight} />
        </g>
      </g>
      <g
        data-equipment="shield"
        transform={
          rank === 7 ? "rotate(-8 12 47) translate(-1 -1)" : "translate(0 1)"
        }
      >
        <path
          d="M3 36h6v-1h7v1h6v18h-2v4h-3v3h-4v2h-3v-2H7v-3H4v-4H2V37h1z"
          fill={steel.outline}
        />
        <path
          d="M4 37h5v-1h7v1h5v16h-2v4h-3v3h-4v1h-1v-1H8v-3H5v-4H3V38h1z"
          fill={steel.silver}
        />
        <path
          d="M5 39h5v-1h5v1h4v13h-2v4h-3v3h-3v-2H8v-4H6v-3H5z"
          fill="#9D293D"
        />
        <path
          d="M7 40h4v-1h3v1h4v12h-2v3h-3v2h-2v-2H9v-4H7z"
          fill={steel.blue}
        />
        <path
          d="M4 38h1v15H4zM9 37h7v1H9zM18 55h1v2h-1z"
          fill={steel.highlight}
        />
        <g data-equipment="heraldic-eagle" fill={steel.highlight}>
          <path d="M12 42h3v1h2v1h-3v2h-2v2h2v2h2v1h-3v2h-2v2H9v-1h2v-3H9v-2H7v-1h4v-2H9v-2H7v-2h2v1h2v1h1zM13 47h3v-2h1v3h-3v1h-1z" />
        </g>
      </g>
    </g>
  );
}
