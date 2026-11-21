import { memo } from "react";
import PixelOwlFace from "./PixelOwlFace.jsx";
import {
  OwlEquipment,
  OwlHeadwear,
  OwlArmor,
  OwlMantle,
} from "./OwlEquipment.jsx";
import { owlPalette } from "./owlAppearance.js";
import { owlPose } from "./owlPoses.js";
import { joyfulMoods } from "./petMotion.js";
import ReferenceOwlLayer from "./art/ReferenceOwlLayer.jsx";
import { referencePalette } from "./art/referencePalette.js";

/** Reference-faithful pixel layers, articulated at the neck, shoulders and feet. */
function PixelOwl({ rank, mood, appearance }) {
  const palette = owlPalette(appearance);
  const colors = referencePalette(appearance);
  const pose = owlPose(rank, appearance.path);
  const layer = (name) => <ReferenceOwlLayer name={name} colors={colors} />;
  return (
    <>
      <path
        d="M13 65h32v2H13zM18 64h22v4H18z"
        fill={palette.ink}
        opacity=".1"
      />
      {rank === 7 && mood !== "dead" && (
        <g className="hero-aura" fill={palette.goldLight}>
          <path d="M0 20h1v32H0zM3 12h1v5H3zM53 12h1v5h-1zM57 21h1v29h-1zM5 56h2v2H5zM51 57h2v2h-2z" />
          <path d="M15 -4h24v1H15zM11 -3h4v1h-4zM39 -3h4v1h-4zM15 0h24v1H15z" />
        </g>
      )}
      <g className="hero-body" data-rank={rank} data-pose={pose.name}>
        <g className="owl-gesture-body">
          <g transform={pose.body}>
            <OwlMantle rank={rank} appearance={appearance} palette={palette} />
            <g transform={pose.frontFoot}>{layer("footFront")}</g>
            <g transform={pose.backFoot}>{layer("footBack")}</g>
            <g className="hero-breath">
              {/* Underpainting prevents gaps when the original wing or bag moves. */}
              {(rank > 1 || appearance.bodyAccessory !== "SATCHEL") && (
                <>
                  <path
                    d="M18 36h17v4h7v14h-4v5H23v-3h-7V43h2z"
                    fill={colors[2]}
                  />
                  <path
                    d="M22 39h11v5h6v10h-4v3H24v-3h-5v-9h3z"
                    fill={colors[5]}
                  />
                  <path d="M25 43h5v3h4v7h-7v2h-4v-8h2z" fill={colors[6]} />
                </>
              )}
              {layer("body")}
              <g transform={pose.backWing}>
                <g className="owl-wing-back">{layer("wingBack")}</g>
              </g>
              {appearance.bodyAccessory === "SATCHEL" && (
                <g
                  data-body-accessory="SATCHEL"
                  transform={rank >= 3 ? "translate(3 1)" : undefined}
                >
                  {layer("strap")}
                  {layer("satchel")}
                </g>
              )}
              <OwlArmor rank={rank} appearance={appearance} palette={palette} />
              <g transform={pose.frontWing}>
                <g className="owl-wing-front">{layer("wingFront")}</g>
              </g>
              <g className="owl-scarf">{layer("scarf")}</g>
              <g transform={pose.head}>
                <g className="hero-head">
                  {layer("head")}
                  <PixelOwlFace mood={mood} palette={palette} colors={colors} />
                  <OwlHeadwear
                    accessory={appearance.headAccessory}
                    path={appearance.path}
                    rank={rank}
                    palette={palette}
                  />
                </g>
              </g>
              <OwlEquipment
                rank={rank}
                appearance={appearance}
                palette={palette}
              />
              {mood === "hungry" && (
                <path
                  className="hero-hunger"
                  d="M24 48h5v1h-5zM23 51h7v1h-7z"
                  fill={palette.gold}
                />
              )}
              {mood === "tired" && (
                <path
                  className="hero-sleep"
                  d="M46 6h6v1h-2v2h-2v2h4v1h-6v-2h2V8h2V7h-4z"
                  fill="#7E96B0"
                />
              )}
              {mood === "angry" && (
                <path
                  className="hero-anger"
                  d="M46 12h3V9h1v4h-4zM52 9h1v3h3v1h-4zM46 15h4v4h-1v-3h-3zM52 15h4v1h-3v3h-1z"
                  fill="#CE5664"
                />
              )}
              {joyfulMoods.includes(mood) && (
                <g
                  className="hero-sparkles"
                  fill={mood === "legendary" ? "#AE80DE" : palette.gold}
                >
                  <path d="M4 21h1v2h2v1H5v2H4v-2H2v-1h2zM48 40h1v2h2v1h-2v2h-1v-2h-2v-1h2z" />
                </g>
              )}
            </g>
          </g>
        </g>
      </g>
    </>
  );
}

export default memo(PixelOwl);
