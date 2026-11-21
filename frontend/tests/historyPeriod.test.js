import test from "node:test";
import assert from "node:assert/strict";
import {
  historyDateRange,
  isWithinHistoryRange,
} from "../src/shared/utils/historyPeriod.js";
import {
  clampFloatingPosition,
  restoreFloatingPosition,
} from "../src/shared/utils/floatingPosition.js";

test("history presets include today and handle month/year boundaries without UTC shifts", () => {
  const week = historyDateRange("week", "", "2026-01-03");
  assert.deepEqual(week, { from: "2025-12-28", to: "2026-01-03" });
  assert.equal(isWithinHistoryRange("2025-12-27", week), false);
  assert.equal(isWithinHistoryRange("2025-12-28", week), true);
  assert.equal(isWithinHistoryRange("2026-01-04", week), false);
  assert.deepEqual(historyDateRange("month", "", "2024-03-01"), {
    from: "2024-02-01",
    to: "2024-03-01",
  });
  assert.deepEqual(historyDateRange("day", "2026-09-30"), {
    from: "2026-09-30",
    to: "2026-09-30",
  });
  assert.equal(
    isWithinHistoryRange("2000-01-01", historyDateRange("all")),
    true,
  );
});

test("floating companion stays on screen after dragging and restoring on smaller screens", () => {
  assert.deepEqual(
    clampFloatingPosition({ x: -200, y: 900 }, { width: 320, height: 600 }),
    { x: 8, y: 532 },
  );
  assert.deepEqual(
    restoreFloatingPosition({ x: 0.95, y: 0.95 }, { width: 320, height: 600 }),
    { x: 252, y: 532 },
  );
  assert.deepEqual(
    restoreFloatingPosition({ x: "bad", y: 0.5 }, { width: 320, height: 600 }),
    { x: 244, y: 524 },
  );
});

test("floating positions exclude the sidebar and recover nonfinite coordinates", () => {
  assert.deepEqual(
    clampFloatingPosition(
      { x: 15, y: 200 },
      { width: 1440, height: 900, leftInset: 244 },
    ),
    { x: 252, y: 200 },
  );
  assert.deepEqual(
    restoreFloatingPosition(
      { x: -4, y: 10 },
      { width: 1440, height: 900, leftInset: 244 },
    ),
    { x: 252, y: 832 },
  );
  const recovered = clampFloatingPosition(
    { x: NaN, y: Infinity },
    { width: 320, height: 600 },
  );
  assert.deepEqual(recovered, { x: 252, y: 532 });
});
