import { useState } from "react";
import { TODAY } from "../../../shared/utils/utils.js";
import { activeReview } from "../../../shared/utils/revisionLevels.js";
export function useReviews({ data, action, working, navigate }) {
  const [tab, setTab] = useState("due"),
    [selected, setSelected] = useState(null);
  const today = TODAY();
  const due = (data.reviews || []).filter(
    (r) => activeReview(r) && r.dueDate <= today,
  );
  const upcoming = (data.reviews || []).filter(
    (r) => activeReview(r) && r.dueDate > today,
  );
  const done = (data.reviews || [])
    .filter((r) => r.completedAt)
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt));
  const current = {
    due,
    upcoming,
    done,
  }[tab];
  return {
    tab,
    setTab,
    selected,
    setSelected,
    today,
    due,
    upcoming,
    done,
    current,
  };
}
