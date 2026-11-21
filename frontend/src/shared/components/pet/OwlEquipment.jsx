const armorColors = (rank, palette) => ({
  edge: "#162B3B",
  shade: rank >= 5 ? "#66502C" : "#395365",
  base: rank >= 6 ? "#D4AA58" : rank >= 5 ? "#AF8841" : "#718D9F",
  light: rank >= 5 ? "#FFE2A0" : "#CDDEE5",
  cloth: palette.scarf,
});

export function OwlMantle({ rank, appearance, palette }) {
  const hasCape = appearance.bodyAccessory === "CAPE";
  return (
    <>
      {(hasCape || rank >= 4) && (
        <g
          className="hero-cape"
          data-body-accessory={hasCape ? "CAPE" : undefined}
          data-equipment="class-mantle"
        >
          <path
            d={
              rank >= 6
                ? "M16 32h26v6h4v8h4v15h4v4H38v-3H27v3H9v-4h3V42h4z"
                : "M17 33h24v5h3v19h3v6H34v-2H19v2H11v-6h3V41h3z"
            }
            fill={palette.ink}
          />
          <path
            d="M18 35h21v5h3v18h3v3H32v-2H20v2h-7v-4h3V42h2z"
            fill={palette.scarf}
          />
          <path
            d="M18 39h2v19h-2zM36 39h2v20h-2zM14 60h7v1h-7zM34 60h10v1H34z"
            fill={rank >= 5 ? palette.gold : palette.scarfLight}
          />
          {rank >= 6 && (
            <path
              d="M14 46h2v15h-2zM43 44h2v14h3v5h-6v-2h3v-3h-2z"
              fill={palette.scarfLight}
            />
          )}
        </g>
      )}
      {appearance.path === "RANGER" && rank >= 3 && (
        <g data-equipment="quiver">
          <path
            d="M10 30h7v25h-7zM10 23h2v9h-2zM14 20h2v12h-2z"
            fill={palette.ink}
          />
          <path d="M11 32h5v21h-5z" fill={palette.leather} />
          <path d="M9 22h3v4H9zM13 19h3v4h-3z" fill={palette.goldLight} />
        </g>
      )}
    </>
  );
}

export function OwlArmor({ rank, appearance, palette }) {
  if (rank < 3) return null;
  const metal = armorColors(rank, palette);
  const mage = appearance.path === "MAGE";
  const ranger = appearance.path === "RANGER";
  return (
    <g data-armor={appearance.path} data-armor-tier={rank}>
      <path d="M20 37h15v3h6v14h-3v6H22v-3h-4V42h2z" fill={metal.edge} />
      <path
        d="M22 39h11v3h6v11h-3v5H24v-3h-4V43h2z"
        fill={mage ? palette.scarf : ranger ? "#735037" : metal.base}
      />
      <path
        d="M22 40h11v2h-9v8h-2zM25 53h11v3H25z"
        fill={mage ? palette.scarfLight : ranger ? "#B1814E" : metal.light}
      />
      <path
        d="M31 43h5v8h-3v3h-7v-2h5z"
        fill={mage ? palette.scarfDark : metal.shade}
      />
      <path d="M20 50h19v3H20z" fill={palette.leather} />
      <path d="M28 50h5v4h-5z" fill={palette.gold} />
      <path d="M29 51h3v2h-3z" fill={palette.ink} />
      {mage && (
        <>
          <path d="M22 51h14v7h4v5H19v-5h3z" fill={palette.ink} />
          <path d="M24 53h10v6h4v2H21v-2h3z" fill={palette.scarf} />
          <path d="M28 53h2v8h-2zM22 60h15v1H22z" fill={palette.gold} />
          <path
            className="hero-rune"
            d="M27 42h2v2h2v2h-2v2h-2v-2h-2v-2h2z"
            fill="#B4EDFA"
          />
        </>
      )}
      {ranger && (
        <path
          d="M22 39h3v3h3v3h3v3h3v3h-3v-2h-3v-3h-3v-3h-3zM21 54h3v4h-3zM35 54h3v4h-3z"
          fill={palette.leatherLight}
        />
      )}
      {rank >= 4 && (
        <g data-equipment="pauldrons">
          <path
            d="M12 36h9v3h3v6H11v-3H9v-3h3zM37 37h6v3h3v5h-8v-3h-3v-3h2z"
            fill={metal.edge}
          />
          <path
            d="M13 37h7v3h2v3H12v-2h-1v-1h2zM38 38h4v3h2v2h-5v-3h-2z"
            fill={mage ? palette.scarfLight : metal.base}
          />
          <path d="M13 38h6v1h-6zM38 39h3v1h-3z" fill={metal.light} />
          {!mage && (
            <path d="M23 56h6v5h-7v-3h1zM31 56h6v5h-6z" fill={metal.base} />
          )}
        </g>
      )}
      {rank >= 5 && (
        <g data-equipment="master-insignia">
          <path
            d="M21 40h2v9h-2zM34 42h2v7h-2zM25 40h7v2h-7zM27 44h4v4h-4z"
            fill={metal.light}
          />
          <path d="M28 44h2v3h-2z" fill="#57CBDC" />
          <path
            d="M13 41h9v2h-9zM39 42h5v1h-5zM23 57h5v1h-5zM32 57h4v1h-4z"
            fill={palette.goldLight}
          />
        </g>
      )}
      {rank >= 6 && (
        <g data-equipment="commander-armor">
          <path
            d="M11 34h8v2h4v3H10v4H7v-7h4zM40 35h4v2h4v7h-3v-4h-6v-3h1z"
            fill={metal.edge}
          />
          <path
            d="M12 35h6v2h4v1H9v3H8v-4h4zM41 36h2v2h4v3h-1v-2h-6v-1h1z"
            fill={metal.light}
          />
          <path d="M19 58h6v5h-7v-3h1zM36 58h6v5h-6z" fill={metal.base} />
          <path d="M19 59h5v1h-5zM37 59h4v1h-4z" fill={metal.light} />
        </g>
      )}
      {rank === 7 && (
        <g data-equipment="legend-armor" fill={metal.light}>
          <path d="M8 34h2v3H8zM5 32h2v4H5zM44 34h2v3h-2zM47 32h2v4h-2zM25 55h2v4h-2zM32 55h2v4h-2z" />
        </g>
      )}
    </g>
  );
}

export function OwlHeadwear({ accessory, path, rank, palette }) {
  const selected =
    accessory === "AUTO"
      ? rank < 3
        ? "NONE"
        : path === "MAGE"
          ? "HAT"
          : path === "RANGER"
            ? "HOOD"
            : "HELMET"
      : accessory;
  const metal = armorColors(rank, palette);
  return (
    <g data-headwear={selected}>
      {selected === "GOGGLES" && (
        <>
          <path
            d="M19 16h14v2h2v-2h9v12H34v-8h-1v9H19zM21 19v7h10v-7zM37 19v6h5v-6z"
            fillRule="evenodd"
            fill={palette.leather}
          />
          <path
            d="M20 18h12v9H20zM36 18h7v8h-7z"
            fill="none"
            stroke={palette.gold}
          />
          <path d="M21 18h4v1h-4zM37 18h2v1h-2z" fill="#E3FAF3" />
        </>
      )}
      {selected === "HAT" && (
        <>
          <path
            d="M15 13h4V9h3V4h3v-5h3v-4h8v3h-3v4h3v4h3v6h6v2h3v3H13v-3h2z"
            fill={palette.ink}
          />
          <path
            d="M17 13h4V9h3V4h3V0h3v-3h4v1h-3v5h3v5h3v5h7v2H16v-1h1z"
            fill={palette.scarf}
          />
          <path d="M20 11h18v3H20z" fill={palette.gold} />
          <path
            d="M27 4h1v2h2v1h-2v2h-1V7h-2V6h2zM23 9h1V4h2V0h2v2h-1v3h-2v4z"
            fill={rank >= 5 ? palette.goldLight : palette.scarfLight}
          />
          {rank >= 6 && (
            <path d="M17 15h28v1H17zM32 9h3v3h-3z" fill={palette.goldLight} />
          )}
        </>
      )}
      {selected === "CROWN" && (
        <>
          <path d="M15 12V5h3v3h5V3h3v4h5V1h3v6h5V4h3v9z" fill={palette.ink} />
          <path
            d="M16 11V7h1v2h7V5h1v3h7V3h1v5h7V6h1v6H16z"
            fill={palette.gold}
          />
          <path d="M17 11h23v1H17zM27 9h3v2h-3z" fill={palette.goldLight} />
        </>
      )}
      {selected === "HOOD" && (
        <>
          <path
            d="M12 28V17h1v-6h4V6h6V3h13v3h6v5h3v18h-3V17h-4v-4H22v2h-5v13z"
            fill={palette.ink}
          />
          <path
            d="M13 27V17h2v-5h3V7h6V4h11v3h6v5h3v14h-1V16h-4v-4H21v2h-5v13z"
            fill={palette.scarf}
          />
          <path d="M18 11V8h7V6h9v1h-9v2h-6v2z" fill={palette.scarfLight} />
          {rank >= 5 && (
            <path
              d="M15 17h1v10h-1zM41 17h1v10h-1zM24 10h9v1h-9z"
              fill={palette.gold}
            />
          )}
        </>
      )}
      {selected === "HELMET" && (
        <>
          <path
            d="M12 18v-7h4V7h6V5h13v3h6v4h3v5h-5v-3H22v2h-6v4h-4z"
            fill={metal.edge}
          />
          <path
            d="M13 17v-5h4V8h6V6h11v3h6v4h2v2h-2v-2H21v2h-6v2z"
            fill={metal.base}
          />
          <path d="M18 9h6V7h9v2h-9v2h-6zM15 13h5v1h-5z" fill={metal.light} />
          {rank >= 4 && (
            <>
              <path d="M12 18h4v7h2v5h-5v-3h-2V20h1z" fill={metal.edge} />
              <path d="M13 19h2v7h2v2h-3v-3h-2v-4h1z" fill={metal.base} />
            </>
          )}
          {rank >= 5 && (
            <path d="M24 6h3v7h-3zM14 15h7v1h-7z" fill={metal.light} />
          )}
          {rank >= 6 && (
            <>
              <path d="M26 6V0h2v-4h6v2h4v3h-6v5z" fill={palette.ink} />
              <path d="M27 5V1h2v-4h4v2h3v1h-5v5z" fill={palette.scarfLight} />
              <path d="M28 1h2v4h-2z" fill={palette.goldLight} />
            </>
          )}
        </>
      )}
    </g>
  );
}

export function OwlEquipment({ rank, appearance, palette }) {
  const metal = armorColors(rank, palette);
  const weaponPose =
    rank === 3
      ? "rotate(12 45 49)"
      : rank === 4
        ? "rotate(-12 45 49)"
        : rank === 5
          ? "rotate(28 45 49) translate(0 -3)"
          : rank === 6
            ? "translate(0 -2)"
            : "rotate(23 45 49) translate(0 -6)";
  return (
    <g data-career={appearance.path}>
      {rank === 2 && (
        <g className="owl-book" data-equipment="book">
          <path d="M23 43h8v1h8v-1h6v14h-7v1h-8v-1h-7z" fill={palette.ink} />
          <path
            d="M24 44h6v1h4v11h-4v-1h-6zM35 45h4v-1h5v11h-5v1h-4z"
            fill="#F1DAAD"
          />
          <path
            d="M25 47h5v1h-5zM26 50h5v1h-5zM38 47h4v1h-4zM37 51h5v1h-5z"
            fill={palette.leather}
          />
          <path d="M33 45h2v12h-2zM24 56h7v1h-7z" fill={palette.gold} />
        </g>
      )}
      {rank >= 3 && appearance.path === "WARRIOR" && (
        <>
          <g transform={weaponPose}>
            <g className="hero-weapon" data-equipment="sword">
              <path
                d="M44 22h2v3h2v21h4v3h-5v9h-4v-9h-5v-3h4V25h2z"
                fill={palette.ink}
              />
              <path d="M44 25h2v21h-2z" fill={metal.light} />
              <path d="M46 27h1v19h-1z" fill={metal.base} />
              <path d="M39 47h12v1H39zM44 55h2v2h-2z" fill={palette.gold} />
              <path d="M44 49h2v6h-2z" fill={palette.leatherLight} />
            </g>
          </g>
          {rank >= 4 && (
            <g
              data-equipment="shield"
              transform={
                rank === 4
                  ? "translate(0 -3)"
                  : rank === 5
                    ? "rotate(18 12 48)"
                    : "translate(-3 0)"
              }
            >
              <path
                d="M4 41h16v16h-2v3h-3v3h-6v-3H6v-3H4z"
                fill={palette.ink}
              />
              <path d="M5 42h14v14h-2v3h-3v2h-4v-2H7v-3H5z" fill={metal.base} />
              <path
                d="M7 44h10v10h-2v3h-2v2h-2v-2H9v-3H7z"
                fill={palette.scarf}
              />
              <path d="M11 46h2v3h3v2h-3v5h-2v-5H8v-2h3z" fill={metal.light} />
              <path d="M6 43h12v1H6zM6 44h1v11H6z" fill={metal.light} />
            </g>
          )}
        </>
      )}
      {rank >= 3 && appearance.path === "MAGE" && (
        <>
          <g transform={rank >= 5 ? "rotate(12 46 49)" : ""}>
            <g className="hero-weapon" data-equipment="staff">
              <path d="M45 27h3v37h-3z" fill={palette.ink} />
              <path d="M46 28h1v35h-1z" fill={palette.leatherLight} />
              <path d="M42 17h8v2h3v8h-3v4h-8v-4h-3v-8h3z" fill={palette.ink} />
              <path d="M43 18h6v3h2v5h-3v3h-5v-3h-2v-5h2z" fill={metal.base} />
              <path
                className="hero-rune"
                d="M44 19h3v2h2v3h-2v3h-3v-3h-1v-3h1z"
                fill="#9DEAF5"
              />
              <path d="M44 20h1v3h-1z" fill="#F2FFFF" />
            </g>
          </g>
          {rank >= 4 && (
            <g
              className="owl-spell"
              data-equipment="arcane-runes"
              fill={palette.goldLight}
            >
              <path d="M5 28h2v3h3v2H7v3H5v-3H2v-2h3zM9 39h1v2h2v1h-2v2H9v-2H7v-1h2z" />
              {rank >= 5 && (
                <path d="M-1 25h1v15h-1zM1 23h8v1H1zM2 41h8v1H2zM11 26h1v12h-1z" />
              )}
            </g>
          )}
        </>
      )}
      {rank >= 3 && appearance.path === "RANGER" && (
        <g
          transform={
            rank === 5 ? "translate(3 -6)" : rank >= 6 ? "rotate(15 46 44)" : ""
          }
        >
          <g className="hero-weapon" data-equipment="bow">
            <path
              d="M44 27h3v3h3v4h3v6h2v13h-2v6h-3v4h-3v3h-3v-3h2v-5h3v-6h2V41h-2v-6h-3v-5h-2z"
              fill={palette.ink}
            />
            <path
              d="M45 29h1v3h3v4h2v6h2v10h-2v6h-2v4h-3v2h-1v-2h2v-5h2v-6h2v-9h-2v-5h-2v-5h-2z"
              fill={palette.gold}
            />
            <path d="M44 30h1v33h-1z" fill="#EEDABD" />
            {rank >= 4 && (
              <g data-equipment="ranger-arrow">
                <path d="M29 46h28v1H29z" fill={palette.goldLight} />
                <path
                  d="M54 44h3v1h3v2h-3v1h-3zM29 44h3v1h2v3h-3v-1h-2z"
                  fill={metal.light}
                />
              </g>
            )}
          </g>
        </g>
      )}
    </g>
  );
}
