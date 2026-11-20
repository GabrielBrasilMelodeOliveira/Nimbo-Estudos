import PixelHeroFace from "./PixelHeroFace.jsx";
import { joyfulMoods } from "./petMotion.js";

const ink = "#222735";
const steel = { dark: "#52697B", mid: "#91ABBC", light: "#DDECF2" };
const gold = { dark: "#936A35", mid: "#D8AB54", light: "#FFE4A0" };

function HeroEquipment({ rank, appearance }) {
  const trim = rank >= 5 ? gold : steel;
  return (
    <g data-equipment={rank >= 3 ? "sword" : rank === 2 ? "book" : "satchel"}>
      {rank >= 3 ? (
        <g className="hero-weapon">
          <path d="M47 27h2v2h1v19h3v3h-4v8h-3v-8h-4v-3h4V29h1z" fill={ink} />
          <path d="M47 30h2v18h-2z" fill={trim.mid} />
          <path d="M47 29h1v18h-1z" fill={trim.light} />
          <path d="M44 49h8v1h-8zM47 56h1v2h-1z" fill={gold.mid} />
          <path d="M47 51h1v5h-1z" fill="#8E5742" />
          {rank === 7 && (
            <path
              className="hero-rune"
              d="M48 32h1v3h-1zM48 38h1v3h-1z"
              fill="#91EDF0"
            />
          )}
        </g>
      ) : rank === 2 ? (
        <g className="hero-weapon">
          <path d="M42 42h9v12h-9z" fill={ink} />
          <path d="M43 43h7v9h-7z" fill={appearance.dark} />
          <path d="M44 43h1v9h-1zM46 45h3v1h-3z" fill={gold.mid} />
          <path d="M43 53h7v1h-7z" fill="#E8DCC5" />
        </g>
      ) : (
        <>
          <path
            d="M25 33h2v4h2v4h2v4h2v4h-2v-4h-2v-4h-2v-4h-2z"
            fill="#5B4039"
          />
          <path d="M34 45h9v9h-9z" fill={ink} />
          <path d="M35 46h7v7h-7z" fill="#A67A50" />
          <path d="M35 46h7v2h-7zM38 48h2v2h-2z" fill="#D6AE72" />
        </>
      )}
      {rank >= 4 && (
        <g className="hero-shield">
          <path d="M12 40h12v14h-2v2h-2v2h-4v-2h-2v-2h-2z" fill={ink} />
          <path d="M13 41h10v12h-2v2h-2v1h-2v-1h-2v-2h-2z" fill={trim.mid} />
          <path d="M15 43h6v9h-1v2h-3v-2h-2z" fill={appearance.dark} />
          <path
            d="M17 44h2v2h2v2h-2v4h-2v-4h-1v-2h1z"
            fill={rank >= 5 ? gold.light : appearance.light}
          />
        </g>
      )}
    </g>
  );
}

function HeroMoodEffects({ mood }) {
  return (
    <g aria-hidden="true">
      {mood === "hungry" && (
        <path
          className="hero-hunger"
          d="M28 42h6v1h-6zM27 44h8v1h-8zM29 46h5v1h-5z"
          fill="#E3AF63"
        />
      )}
      {mood === "tired" && (
        <path
          className="hero-sleep"
          d="M45 14h6v1h-2v2h-2v2h4v1h-6v-2h2v-2h2v-1h-4zM51 7h5v1h-2v2h-2v1h4v1h-5v-2h2V8h-2z"
          fill="#7E96B0"
        />
      )}
      {mood === "angry" && (
        <path
          className="hero-anger"
          d="M43 14h3v-3h1v4h-4zM49 11h1v3h3v1h-4zM43 17h4v4h-1v-3h-3zM49 17h4v1h-3v3h-1z"
          fill="#C45661"
        />
      )}
      {joyfulMoods.includes(mood) && (
        <g
          className="hero-sparkles"
          fill={mood === "legendary" ? "#9F82D8" : gold.mid}
        >
          <path d="M13 18h2v3h3v2h-3v3h-2v-3h-3v-2h3zM51 30h1v2h2v1h-2v2h-1v-2h-2v-1h2z" />
          {["excited", "radiant", "legendary"].includes(mood) && (
            <path d="M47 6h2v3h3v2h-3v3h-2v-3h-3V9h3zM9 39h2v2h-2zM53 52h2v2h-2z" />
          )}
        </g>
      )}
    </g>
  );
}

/** Original 64 × 76 pixel sprite. Integer coordinates and stepped motion keep its pixels crisp. */
export default function PixelHero({ rank, mood, appearance }) {
  const armor = rank >= 3;
  const trim = rank >= 5 ? gold : steel;
  return (
    <>
      <g fill={ink} opacity=".12">
        <path d="M19 69h28v2H19zM23 68h20v4H23z" />
      </g>
      {rank === 7 && mood !== "dead" && (
        <g className="hero-aura" fill={appearance.color} opacity=".25">
          <path d="M10 30h2v29h-2zM12 23h2v7h-2zM14 19h2v4h-2zM52 25h2v34h-2zM50 19h2v6h-2zM14 59h4v4h-4zM48 59h4v4h-4z" />
        </g>
      )}
      <g className="hero-body" data-rank={rank}>
        {rank >= 4 && (
          <g className="hero-cape">
            <path
              d="M22 30h21v5h2v20h2v9h-8v-2h-5v2h-8v-2h-7v-9h2V35h1z"
              fill={ink}
            />
            <path
              d="M23 32h18v5h2v19h2v6h-5v-2h-6v2h-7v-2h-6v-6h2z"
              fill={appearance.dark}
            />
            <path d="M25 35h3v23h-3zM38 35h2v25h-2z" fill={appearance.color} />
            {rank >= 6 && (
              <path
                d="M21 59h6v2h7v-1h6v1h5v1h-5v-1h-6v1h-7v-1h-6z"
                fill={gold.mid}
              />
            )}
          </g>
        )}
        <g data-part="legs">
          <path d="M24 49h17v15h2v5h-10V56h-1v13H22v-5h2z" fill={ink} />
          <path
            d="M25 50h6v13h-6zM34 50h6v13h-6z"
            fill={armor ? steel.dark : appearance.dark}
          />
          <path
            d="M25 51h2v11h-2zM34 51h2v11h-2z"
            fill={armor ? steel.mid : appearance.color}
          />
          {rank >= 5 && (
            <path d="M25 54h6v3h-6zM34 54h6v3h-6z" fill={trim.mid} />
          )}
          <path d="M24 64h7v3h-8v-1h1zM34 64h6v2h2v1h-8z" fill="#55423D" />
          <path
            d="M24 64h7v1h-7zM34 64h6v1h-6z"
            fill={armor ? trim.mid : "#A17C52"}
          />
        </g>
        <g className="hero-breath">
          <g className="hero-arm-left">
            <path d="M20 33h6v15h-2v5h-6v-3h-1V39h1v-4h2z" fill={ink} />
            <path
              d="M20 35h4v10h-5v-6h1z"
              fill={armor ? trim.mid : appearance.color}
            />
            <path d="M19 46h5v5h-4v-1h-1z" fill={appearance.skin} />
            <path d="M19 49h2v2h-1v-1h-1z" fill={appearance.skinShadow} />
          </g>
          <g className="hero-arm-right">
            <path d="M40 33h5v2h2v5h1v11h-2v2h-5V43h-1z" fill={ink} />
            <path
              d="M41 35h3v2h1v8h-4z"
              fill={armor ? trim.mid : appearance.color}
            />
            <path d="M42 46h5v4h-2v1h-3z" fill={appearance.skin} />
            <path d="M45 46h2v4h-2z" fill={appearance.skinShadow} />
          </g>
          <path d="M25 31h14v2h3v17h-2v3H24v-3h-1V33h2z" fill={ink} />
          <path
            d="M26 33h12v2h2v14H25V35h1z"
            fill={armor ? steel.dark : appearance.dark}
          />
          <path
            d="M26 35h12v12H26z"
            fill={armor ? steel.mid : appearance.color}
          />
          <path
            d="M26 35h2v10h-2zM28 35h9v1h-9z"
            fill={armor ? steel.light : appearance.light}
          />
          {armor && (
            <>
              <path d="M30 38h6v5h-1v2h-3v-2h-2z" fill={appearance.dark} />
              <path d="M32 39h2v3h-2z" fill={trim.light} />
              <path d="M26 46h12v2H26z" fill={steel.dark} />
            </>
          )}
          <path d="M24 49h17v3H24z" fill="#5D4033" />
          <path d="M31 49h5v3h-5z" fill={gold.mid} />
          <path d="M32 50h3v1h-3z" fill={ink} />
          {rank >= 5 && (
            <g data-equipment="pauldrons">
              <path
                d="M19 32h8v2h2v4H18v-4h1zM38 32h7v2h2v4H37v-4h1z"
                fill={ink}
              />
              <path
                d="M20 33h6v2h1v2h-8v-2h1zM39 33h5v2h2v2h-8v-2h1z"
                fill={gold.mid}
              />
              <path d="M20 33h6v1h-6zM39 33h5v1h-5z" fill={gold.light} />
            </g>
          )}
          <g className="hero-head">
            <path d="M29 28h8v6h-2v2h-4v-2h-2z" fill={ink} />
            <path d="M30 28h6v5h-1v1h-3v-1h-2z" fill={appearance.skinShadow} />
            <path
              d="M26 12h12v2h3v6h1v6h-2v4h-3v2H28v-2h-3v-4h-2v-6h1v-6h2z"
              fill={ink}
            />
            <path
              d="M26 17h13v9h-1v3h-2v2h-7v-2h-3v-4h-2v-4h2z"
              fill={appearance.skinShadow}
            />
            <path
              d="M27 16h10v2h2v7h-2v3h-2v1h-6v-2h-2v-3h-2v-3h2z"
              fill={appearance.skin}
            />
            <path
              d="M25 12h3v-2h9v1h3v2h2v7h-3v-3h-3v-1h-5v2h-4v3h-3v-7h1z"
              fill={appearance.hair}
            />
            <path
              d="M28 12h8v1h3v1h-8v1h-5v2h-1v-3h3z"
              fill={appearance.hairLight}
            />
            <path d="M26 19h1v3h-1zM38 19h2v3h-2z" fill={appearance.hair} />
            {rank === 2 && (
              <>
                <path d="M24 17h16v2H24z" fill={appearance.dark} />
                <path
                  d="M25 17h14v1H25zM39 18h4v2h-3v4h-2v-5z"
                  fill={appearance.color}
                />
              </>
            )}
            {rank >= 3 && (
              <g data-equipment="headgear">
                <path d="M25 11h2V9h12v2h2v7h-3v-3H27v3h-3v-5h1z" fill={ink} />
                <path
                  d="M26 12h2v-2h10v2h2v4h-1v-2H26v3h-1v-3h1z"
                  fill={trim.mid}
                />
                <path d="M28 10h8v1h-8zM26 12h2v1h-2z" fill={trim.light} />
                <path d="M31 11h3v3h-3z" fill={appearance.dark} />
                {rank >= 6 && (
                  <>
                    <path d="M30 9V5h2V3h4v2h2v5z" fill={appearance.dark} />
                    <path
                      d="M32 5h2V4h1v5h-3z"
                      fill={rank === 7 ? gold.light : appearance.color}
                    />
                  </>
                )}
              </g>
            )}
            <PixelHeroFace mood={mood} appearance={appearance} />
          </g>
          <HeroEquipment rank={rank} appearance={appearance} />
          <HeroMoodEffects mood={mood} />
        </g>
      </g>
    </>
  );
}
