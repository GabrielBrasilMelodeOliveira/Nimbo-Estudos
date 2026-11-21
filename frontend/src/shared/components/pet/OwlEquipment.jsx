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
  const metal = rank >= 5 ? palette.gold : "#86A9BA";
  return (
    <g data-headwear={selected}>
      {selected === "GOGGLES" && (
        <>
          <path
            d="M22 19h16v1h4v-1h10v12H41v-9h-3v10H22zM25 22v7h10v-7zM44 22v6h5v-6z"
            fillRule="evenodd"
            fill="#714A2F"
          />
          <path
            d="M24 21h12v9H24zM43 21h7v8h-7z"
            fill="none"
            stroke={palette.gold}
            strokeWidth="1"
          />
          <path d="M25 21h5v1h-5zM44 21h3v1h-3z" fill="#FFFFFF" opacity=".65" />
        </>
      )}
      {selected === "HAT" && (
        <>
          <path
            d="M25 17v-3h3v-4h3V6h3V3h7v3h2v4h2v5h7v2h3v3H21v-3z"
            fill={palette.ink}
          />
          <path
            d="M27 16h3v-5h3V7h3V4h4v4h2v5h2v3h7v2H24v-1h3z"
            fill={palette.scarf}
          />
          <path d="M33 11h2V7h2V5h2v3h-2v5h-4z" fill={palette.scarfLight} />
          <path d="M28 15h17v2H28z" fill={palette.gold} />
          <path
            d="M37 10h1v1h2v1h-2v2h-1v-2h-2v-1h2z"
            fill={palette.goldLight}
          />
        </>
      )}
      {selected === "CROWN" && (
        <>
          <path d="M23 13V6h3v3h4V5h3v4h4V4h3v5h4V6h3v8z" fill={palette.ink} />
          <path
            d="M24 12V8h1v2h6V7h1v3h6V6h1v4h6V8h1v5H24z"
            fill={palette.gold}
          />
          <path d="M25 12h20v1H25zM33 10h3v2h-3z" fill={palette.goldLight} />
        </>
      )}
      {selected === "HOOD" && (
        <>
          <path
            d="M19 20v-7h3V9h4V6h15v2h6v4h4v7h-3v-4h-5v-3H27v3h-5v6z"
            fill={palette.ink}
          />
          <path
            d="M20 19v-5h3v-4h4V7h13v2h6v4h3v3h-3v-2h-4v-3H26v3h-4v5z"
            fill={palette.scarf}
          />
          <path d="M25 10h3V8h10v1H28v2h-3z" fill={palette.scarfLight} />
        </>
      )}
      {selected === "HELMET" && (
        <>
          <path d="M23 15v-5h4V7h14v3h5v6h-4v-3H27v3h-4z" fill={palette.ink} />
          <path d="M24 14v-3h4V8h12v3h5v3h-2v-2H26v2z" fill={metal} />
          <path d="M28 8h10v1H28z" fill="#DAEDF1" />
          {rank >= 6 && (
            <>
              <path d="M32 7V3h2V1h4v3h2v4z" fill={palette.scarf} />
              <path d="M34 2h2v5h-2z" fill={palette.goldLight} />
            </>
          )}
        </>
      )}
    </g>
  );
}

export function OwlEquipment({ rank, appearance, palette }) {
  const metal = rank >= 5 ? palette.gold : "#98B4C3";
  return (
    <g data-career={appearance.path}>
      {rank === 2 && (
        <g data-equipment="book">
          <path d="M42 49h10v12H42z" fill={palette.ink} />
          <path d="M43 50h8v9h-8z" fill={palette.scarf} />
          <path d="M44 50h1v9h-1zM47 52h3v1h-3z" fill={palette.gold} />
          <path d="M43 60h8v1h-8z" fill="#F5E4BE" />
        </g>
      )}
      {rank >= 3 && appearance.path === "WARRIOR" && (
        <g className="hero-weapon" data-equipment="sword">
          <path
            d="M55 33h2v3h1v23h3v2h-4v8h-3v-8h-4v-2h4V36h1z"
            fill={palette.ink}
          />
          <path d="M55 36h2v23h-2z" fill={metal} />
          <path d="M55 36h1v21h-1z" fill="#E3F6FF" />
          <path d="M52 59h8v1h-8zM55 67h1v1h-1z" fill={palette.gold} />
          <path d="M55 61h1v6h-1z" fill={palette.leather} />
        </g>
      )}
      {rank >= 4 && appearance.path === "WARRIOR" && (
        <g data-equipment="shield">
          <path d="M7 47h12v12h-2v3h-2v2h-4v-2H9v-3H7z" fill={palette.ink} />
          <path d="M8 48h10v10h-2v3h-2v1h-2v-1h-2v-3H8z" fill={metal} />
          <path d="M10 50h6v7h-1v3h-2v-2h-3z" fill={palette.scarf} />
          <path
            d="M12 51h2v2h2v1h-2v4h-2v-4h-1v-1h1z"
            fill={palette.goldLight}
          />
        </g>
      )}
      {rank >= 3 && appearance.path === "MAGE" && (
        <g className="hero-weapon" data-equipment="staff">
          <path d="M54 34h4v3h-1v34h-3V40h-3v-6z" fill={palette.ink} />
          <path d="M55 38h1v32h-1z" fill={palette.leatherLight} />
          <path d="M51 25h7v2h3v8h-3v3h-7v-3h-2v-8h2z" fill={palette.ink} />
          <path
            d="M52 27h5v2h2v5h-2v2h-5v-2h-1v-5h1z"
            fill={rank >= 5 ? palette.gold : palette.scarfLight}
          />
          <path
            className="hero-rune"
            d="M53 28h3v2h1v3h-2v2h-2v-3h-1v-2h1z"
            fill="#D8FAFF"
          />
        </g>
      )}
      {rank >= 3 && appearance.path === "RANGER" && (
        <g className="hero-weapon" data-equipment="bow">
          <path
            d="M53 35h3v3h2v5h2v16h-2v5h-2v3h-3v-2h2v-6h2V43h-2v-6h-2z"
            fill={palette.ink}
          />
          <path d="M54 37h1v6h2v16h-2v6h-1v-7h2V44h-2z" fill={palette.gold} />
          <path d="M53 37h1v28h-1z" fill="#EAD6B2" />
        </g>
      )}
      {rank >= 4 && appearance.path === "MAGE" && (
        <g data-equipment="arcane-runes" fill={palette.goldLight}>
          <path d="M27 43h1v2h2v1h-2v2h-1v-2h-2v-1h2zM33 47h1v1h1v1h-1v1h-1v-1h-1v-1h1z" />
        </g>
      )}
      {rank >= 4 && appearance.path === "RANGER" && (
        <g data-equipment="ranger-arrow">
          <path d="M48 46h13v1H48z" fill={palette.goldLight} />
          <path d="M59 44h2v1h2v1h-2v2h-2z" fill={metal} />
        </g>
      )}
      {rank >= 6 && appearance.path !== "WARRIOR" && (
        <g className="hero-rune" data-equipment="commander-gems">
          <path
            d="M27 40h3v3h-3zM37 41h3v3h-3zM45 44h3v3h-3z"
            fill={palette.ink}
          />
          <path
            d="M28 40h1v2h-1zM38 41h1v2h-1zM46 44h1v2h-1z"
            fill={palette.goldLight}
          />
        </g>
      )}
      {rank >= 5 && (
        <g data-equipment="master-insignia">
          <path d="M22 39h7v5h-7zM43 40h6v4h-6z" fill={palette.ink} />
          <path d="M23 40h5v3h-5zM44 41h4v2h-4z" fill={palette.gold} />
          <path d="M24 40h3v1h-3z" fill={palette.goldLight} />
        </g>
      )}
    </g>
  );
}
