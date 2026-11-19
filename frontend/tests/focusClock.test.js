import { test } from "node:test";
import assert from "node:assert/strict";
import {
  elapsedMilliseconds,
  restoreFocus,
  focusStorageKey,
  freshFocus,
} from "../src/shared/utils/focusClock.js";
import { nextPlannedDiscipline } from "../src/shared/utils/dailyPlanning.js";
test("restores running clock from timestamps, preserving paused time and capping at 24 hours", () => {
  const clock = {
    ...freshFocus(),
    elapsedMs: 4000,
    runningSince: 10000,
    disciplineId: "1",
  };
  const restored = restoreFocus({
    getItem: (key) => (key === focusStorageKey ? JSON.stringify(clock) : null),
  });
  assert.equal(elapsedMilliseconds(restored, 17000), 11000);
  assert.equal(
    elapsedMilliseconds({ ...clock, runningSince: null }, 17000),
    4000,
  );
  assert.equal(elapsedMilliseconds(clock, 86410000), 86400000);
});
test("invalid stored clock falls back safely", () => {
  assert.deepEqual(restoreFocus({ getItem: () => "invalid" }), freshFocus());
});
test("next step uses today's planned discipline before the next unstudied choice", () => {
  const data = {
    "study-plan": [
      {
        studyDate: "2026-11-19",
        disciplines: [
          { id: 1, name: "Java" },
          { id: 2, name: "Redes" },
        ],
      },
    ],
    "study-sessions": [],
  };
  assert.equal(nextPlannedDiscipline(data, "2026-11-19").id, 1);
  data["study-sessions"].push({
    studyDate: "2026-11-19",
    discipline: { id: 1 },
  });
  assert.equal(nextPlannedDiscipline(data, "2026-11-19").id, 2);
  assert.equal(nextPlannedDiscipline(data, "2026-11-20"), null);
});
