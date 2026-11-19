import {
  plannedDisciplinesForDay,
  nextPlannedDiscipline,
} from "../../../shared/utils/dailyPlanning.js";
import { TODAY } from "../../../shared/utils/utils.js";
import { activeReview } from "../../../shared/utils/revisionLevels.js";
import { startWeek, findGoal } from "../../../shared/utils/plannerMetrics.js";
export function useDashboard({ data, action, working, navigate }) {
  const overview = data.dashboard || {},
    today = TODAY();
  const allTasks = data.agenda || [],
    todayTasks = allTasks
      .filter((t) => t.scheduledDate === today)
      .sort((a, b) => (a.startTime || "99").localeCompare(b.startTime || "99"));
  const due = (data.reviews || [])
    .filter((r) => activeReview(r) && r.dueDate <= today)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const focus = (data.analytics?.recommendations || [])[0];
  const weekly = overview.weeklySeconds || 0,
    goalSeconds =
      ((findGoal(data, "WEEK", startWeek(today))?.targetMinutes ??
        data.plan?.weeklyGoalMinutes) ||
        0) * 60;
  const daily = (overview.dailyHours || []).slice(-7);
  const greet =
    new Date().getHours() < 12
      ? "Bom dia"
      : new Date().getHours() < 18
        ? "Boa tarde"
        : "Boa noite";
  return {
    overview,
    today,
    allTasks,
    todayTasks,
    due,
    focus,
    plannedDisciplines: plannedDisciplinesForDay(data, today),
    plannedDiscipline: nextPlannedDiscipline(data, today),
    weekly,
    goalSeconds,
    daily,
    greet,
  };
}
