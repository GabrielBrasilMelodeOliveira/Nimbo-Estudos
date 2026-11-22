import OwlCareProps from "./OwlCareProps.jsx";
import { memo } from "react";
import OwlBodyFoundation, { OwlLegJoint } from "./OwlBodyFoundation.jsx";
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
function PixelOwl({ rank, mood, appearance, activity = "IDLE" }) {
  const palette = owlPalette(appearance);
  const colors = referencePalette(appearance);
  const caring = ["TRAINING", "EATING", "SLEEPING"].includes(activity);
  const pose = owlPose(
    caring ? (activity === "TRAINING" ? 2 : 1) : rank,
    appearance.path,
  );
  const advancedOutfit =
    rank >= 6 && ["WARRIOR", "RANGER"].includes(appearance.path);
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
          {appearance.path === "MAGE" ? (
            <>
              <path d="M0 20h1v32H0zM3 12h1v5H3zM53 12h1v5h-1zM57 21h1v29h-1zM5 56h2v2H5zM51 57h2v2h-2z" />
              <path d="M15 -4h24v1H15zM11 -3h4v1h-4zM39 -3h4v1h-4zM15 0h24v1H15z" />
            </>
          ) : (
            <path
              d="M1 27h1v2h2v1H2v2H1v-2h-2v-1h2zM56 57h1v2h2v1h-2v2h-1v-2h-2v-1h2zM8 65h1v2H8zM45 68h1v2h-1z"
              opacity=".65"
            />
          )}
        </g>
      )}
      <g className="hero-body" data-rank={rank} data-pose={pose.name}>
        <g className="owl-gesture-body">
          <g transform={pose.body}>
            <OwlMantle rank={rank} appearance={appearance} palette={palette} />
            <g transform={pose.frontFoot}>
              <OwlLegJoint side="front" colors={colors} />
              {layer("footFront")}
            </g>
            <g transform={pose.backFoot}>
              <OwlLegJoint side="back" colors={colors} />
              {layer("footBack")}
            </g>
            <g className="hero-breath">
              <OwlBodyFoundation colors={colors} />
              {layer("body")}
              <g transform={pose.backWing}>
                <g className="owl-wing-back">{layer("wingBack")}</g>
              </g>
              {appearance.bodyAccessory === "SATCHEL" && (
                <g
                  data-body-accessory="SATCHEL"
                  transform={
                    rank >= 3 && !advancedOutfit ? "translate(3 1)" : undefined
                  }
                >
                  {advancedOutfit ? (
                    <>
                      <path
                        d="M39 49h7v3h1v5h-2v2h-6v-2h-1v-6h1z"
                        fill={palette.ink}
                      />
                      <path
                        d="M40 50h5v3h1v3h-2v1h-4v-2h-1v-3h1z"
                        fill={palette.leather}
                      />
                      <path d="M40 51h5v3h-5z" fill={palette.leatherLight} />
                      <path d="M42 53h1v2h-1z" fill={palette.goldLight} />
                    </>
                  ) : (
                    <>
                      {layer("strap")}
                      {layer("satchel")}
                    </>
                  )}
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
                    appearance={appearance}
                    accessory={
                      activity === "TRAINING"
                        ? "GOGGLES"
                        : activity === "SLEEPING"
                          ? "NONE"
                          : appearance.headAccessory
                    }
                    path={appearance.path}
                    rank={rank}
                    palette={palette}
                  />
                </g>
              </g>
              {!caring && (
                <OwlEquipment
                  rank={rank}
                  appearance={appearance}
                  palette={palette}
                />
              )}
              <OwlCareProps activity={activity} palette={palette} />
              {mood === "hungry" && (
                <path
                  className="hero-hunger"
                  d="M24 48h5v1h-5zM23 51h7v1h-7z"
                  fill={palette.gold}
                />
              )}
              {mood === "tired" && activity !== "SLEEPING" && (
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
