import PixelOwlFace from "./PixelOwlFace.jsx";
import { OwlEquipment, OwlHeadwear } from "./OwlEquipment.jsx";
import { owlPalette } from "./owlAppearance.js";
import { joyfulMoods } from "./petMotion.js";

/** Layered 64 × 80 pixel sprite inspired by the user's cyan owl reference. */
export default function PixelOwl({ rank, mood, appearance }) {
  const palette = owlPalette(appearance);
  return (
    <>
      <path
        d="M17 75h34v2H17zM21 74h25v4H21z"
        fill={palette.ink}
        opacity=".12"
      />
      {rank === 7 && mood !== "dead" && (
        <path
          className="hero-aura"
          d="M6 28h2v34H6zM8 22h2v6H8zM10 17h2v5h-2zM58 22h2v40h-2zM56 17h2v5h-2zM10 62h4v4h-4zM54 62h4v4h-4z"
          fill={palette.feather}
          opacity=".4"
        />
      )}
      <g className="hero-body" data-rank={rank}>
        {appearance.bodyAccessory === "CAPE" && (
          <g className="hero-cape" data-body-accessory="CAPE">
            <path
              d="M18 36h25v8h3v26h-7v-2h-6v3h-9v-2h-9V48h3z"
              fill={palette.ink}
            />
            <path
              d="M19 38h22v9h3v21h-4v-2h-7v3h-8v-2h-8V49h2z"
              fill={palette.scarf}
            />
            <path
              d="M19 46h3v19h-3zM36 46h3v19h-3z"
              fill={palette.scarfLight}
            />
          </g>
        )}
        {appearance.path === "RANGER" && rank >= 3 && (
          <g data-equipment="quiver">
            <path
              d="M14 35h7v26h-7zM15 28h2v8h-2zM19 26h2v10h-2z"
              fill={palette.ink}
            />
            <path d="M15 37h5v22h-5z" fill={palette.leather} />
            <path
              d="M14 27h3v4h-3zM18 25h3v4h-3z"
              fill={palette.featherHighlight}
            />
          </g>
        )}
        <g className="owl-feet">
          <path
            d="M24 65h5v6h4v3H21v-3h3zM40 65h5v6h5v3H37v-3h3z"
            fill={palette.ink}
          />
          <path
            d="M25 67h3v5h4v1H22v-1h3zM41 67h3v5h5v1H38v-1h3z"
            fill={palette.gold}
          />
          <path d="M23 72h2v1h-2zM39 72h2v1h-2z" fill={palette.goldLight} />
        </g>
        <g className="hero-breath">
          <path
            d="M23 34h19v3h5v5h3v17h-2v7h-5v3H23v-2h-5v-7h-3V45h3v-7h5z"
            fill={palette.ink}
          />
          <path
            d="M24 36h16v3h5v5h3v15h-2v6h-5v2H24v-2h-4v-6h-3V46h3v-7h4z"
            fill={palette.featherShadow}
          />
          <path
            d="M25 38h13v4h5v16h-3v7H26v-3h-4V45h3z"
            fill={palette.feather}
          />
          <path
            d="M28 43h7v3h4v12h-3v6h-8v-4h-3V48h3z"
            fill={palette.featherLight}
          />
          <path
            d="M29 49h2v3h-2zM34 53h2v3h-2zM29 58h2v2h-2zM39 44h2v3h-2z"
            fill={palette.featherShadow}
          />
          <g className="owl-wing-back">
            <path d="M44 40h5v4h3v16h-2v4h-4v-6h-2z" fill={palette.ink} />
            <path
              d="M46 42h2v4h2v13h-2v2h-1v-5h-1z"
              fill={palette.featherShadow}
            />
            <path d="M47 46h1v9h-1z" fill={palette.featherLight} />
          </g>
          {appearance.bodyAccessory === "SATCHEL" && (
            <g data-body-accessory="SATCHEL">
              <path
                d="M24 37h3v4h3v4h3v4h3v4h4v4h-4v-3h-3v-4h-3v-4h-3v-4h-3z"
                fill={palette.ink}
              />
              <path
                d="M25 38h1v4h3v4h3v4h3v4h4v1h-4v-4h-3v-4h-3v-4h-3z"
                fill={palette.leatherLight}
              />
              <path
                d="M35 53h13v3h2v10h-3v3H35v-3h-2V56h2z"
                fill={palette.ink}
              />
              <path
                d="M36 55h11v3h1v7h-3v2H36v-2h-1v-8h1z"
                fill={palette.leather}
              />
              <path d="M35 56h13v5H35z" fill={palette.leatherLight} />
              <path d="M37 57h9v1h-9zM37 63h1v2h-1z" fill="#EDB870" />
              <path d="M40 59h4v4h-4z" fill={palette.ink} />
              <path d="M41 60h2v2h-2z" fill={palette.gold} />
            </g>
          )}
          <g className="owl-wing-front">
            <path
              d="M19 38h6v4h1v9h-3v5h-3v5h-4v3h-4v2H8v-7h2v-7h3v-7h3v-4h3z"
              fill={palette.ink}
            />
            <path
              d="M20 40h4v10h-3v5h-3v5h-4v2h-4v-3h2v-7h3v-7h3v-3h2z"
              fill={palette.feather}
            />
            <path
              d="M20 42h2v8h-3v6h-3v3h-3v-4h2v-6h3v-5h2z"
              fill={palette.featherLight}
            />
            <path
              d="M13 58h2v3h-2zM18 53h2v4h-2zM22 47h1v4h-1z"
              fill={palette.featherHighlight}
            />
            <path
              d="M20 43h2v4h-2zM15 52h2v3h-2z"
              fill={palette.featherShadow}
            />
          </g>
          <g className="hero-head">
            <path
              d="M17 13V7h-2V3h3v2h3v4h4v3h5V9h3V5h2v4h3V2h2v5h3v4h4V7h3v6h3v8h2v9h-3v4h-4v3H22v-2h-5v-4h-3V20h2v-7z"
              fill={palette.ink}
            />
            <path
              d="M18 12V7h-1V5h1v2h3v4h4v3h6v-3h3V8h1v4h4V5h1v4h3v4h5V9h1v6h3v7h2v7h-3v4h-4v2H23v-2h-5v-3h-2v-9h2z"
              fill={palette.featherShadow}
            />
            <path
              d="M19 12V9h2v4h4v3h7v-3h3v2h5v-4h2v4h7v4h3v9h-3v4h-5v2H24v-3h-5v-5h-1v-6h2v-5h-1z"
              fill={palette.feather}
            />
            <path
              d="M22 17h7v1h-3v2h-2v3h-2v6h2v3h5v1h-5v-1h-4v-4h-1v-5h1v-3h2zM39 16h5v1h-3v4h-1v-3h-1zM20 10h1v2h-1zM34 12h1v2h-1z"
              fill={palette.featherLight}
            />
            <path
              d="M29 15h2v2h-2zM35 18h2v1h-2zM49 16h1v2h-1z"
              fill={palette.featherHighlight}
            />
            <PixelOwlFace mood={mood} palette={palette} />
            <OwlHeadwear
              accessory={appearance.headAccessory}
              path={appearance.path}
              rank={rank}
              palette={palette}
            />
          </g>
          <g className="owl-scarf">
            <path
              d="M18 33h5v2h23v-1h5v4h-3v4h-6v1H25v-2h-5v-3h-2z"
              fill={palette.ink}
            />
            <path
              d="M20 35h4v2h22v-1h3v2h-4v3H26v-2h-5v-2h-1z"
              fill={palette.scarf}
            />
            <path d="M23 36h3v2h18v1H26v-1h-3z" fill={palette.scarfLight} />
            <path d="M42 41h5v8h-2v3h-4v-6h1z" fill={palette.ink} />
            <path d="M43 42h3v6h-2v2h-1z" fill={palette.scarf} />
          </g>
          <OwlEquipment rank={rank} appearance={appearance} palette={palette} />
          {mood === "hungry" && (
            <path
              className="hero-hunger"
              d="M28 48h5v1h-5zM27 51h7v1h-7z"
              fill={palette.gold}
            />
          )}
          {mood === "tired" && (
            <path
              className="hero-sleep"
              d="M54 10h6v1h-2v2h-2v2h4v1h-6v-2h2v-2h2v-1h-4z"
              fill="#7E96B0"
            />
          )}
          {mood === "angry" && (
            <path
              className="hero-anger"
              d="M53 11h3V8h1v4h-4zM59 8h1v3h3v1h-4zM53 14h4v4h-1v-3h-3zM59 14h4v1h-3v3h-1z"
              fill="#CE5664"
            />
          )}
          {joyfulMoods.includes(mood) && (
            <g
              className="hero-sparkles"
              fill={mood === "legendary" ? "#AE80DE" : palette.gold}
            >
              <path d="M8 22h2v3h3v2h-3v3H8v-3H5v-2h3zM56 44h1v2h2v1h-2v2h-1v-2h-2v-1h2z" />
              {["excited", "radiant", "legendary"].includes(mood) && (
                <path d="M54 3h2v3h3v2h-3v3h-2V8h-3V6h3zM5 42h2v2H5zM58 69h2v2h-2z" />
              )}
            </g>
          )}
        </g>
      </g>
    </>
  );
}
