import { companionRank } from "./owlAppearance.js";

// Joint transforms belong to the pose; animated gestures use separate wrappers.
const commonPoses = [
  {
    name: "traveler",
    head: "",
    body: "",
    frontWing: "",
    backWing: "",
    frontFoot: "",
    backFoot: "",
  },
  {
    name: "reading",
    head: "rotate(5 29 29) translate(0 1)",
    body: "translate(0 1)",
    frontWing: "rotate(-35 18 38)",
    backWing: "rotate(22 40 39)",
    frontFoot: "translate(1 0)",
    backFoot: "translate(-1 0)",
  },
];
const posesByPath = {
  WARRIOR: [
    ["ready", -3, -14, 12, -1, 1, 0],
    ["shield-guard", 5, 28, -15, -3, 2, 2],
    ["blade-raised", -7, 60, -32, -4, 3, 0],
    ["commander-salute", -4, 126, -10, -2, 2, -1],
    ["legend-flight", -6, 76, -65, -3, 4, -4],
  ],
  MAGE: [
    ["staff-rest", 4, 28, -10, 0, 2, 0],
    ["rune-study", 9, -32, 30, -1, 1, 2],
    ["spell-cast", -8, 105, -42, -3, 3, -1],
    ["archmage-command", -5, 67, -20, -2, 2, -2],
    ["arcane-ascension", -8, 102, -72, -3, 4, -5],
  ],
  RANGER: [
    ["trail-scout", 6, -12, -5, -2, 1, 1],
    ["bow-ready", -4, -48, 18, -3, 3, 2],
    ["arrow-aim", -8, -76, 32, -4, 4, 0],
    ["horizon-watch", -9, 120, -20, -2, 3, -1],
    ["sky-sentinel", -5, 80, -66, -4, 4, -4],
  ],
};
export function owlPose(stage, path) {
  const rank = companionRank(stage);
  if (rank <= 2) return commonPoses[rank - 1];
  const [name, head, front, back, frontFoot, backFoot, lift] = (posesByPath[
    path
  ] || posesByPath.WARRIOR)[rank - 3];
  return {
    name,
    head: `rotate(${head} 29 29)`,
    body: `translate(0 ${lift})`,
    frontWing: `rotate(${front} 18 38)`,
    backWing: `rotate(${back} 40 39)`,
    frontFoot: `translate(${frontFoot} ${rank === 7 ? -2 : 0})`,
    backFoot: `translate(${backFoot} ${rank === 7 ? -1 : 0})`,
  };
}
