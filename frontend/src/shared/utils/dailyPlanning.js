import { TODAY } from "./utils.js";
export function plannedDisciplinesForDay(data, day = TODAY()) {
  return (
    (data["study-plan"] || []).find((plan) => plan.studyDate === day)
      ?.disciplines || []
  );
}
export function nextPlannedDiscipline(data, day = TODAY()) {
  const planned = plannedDisciplinesForDay(data, day);
  const studiedIds = new Set(
    (data["study-sessions"] || [])
      .filter((session) => session.studyDate === day)
      .map((session) =>
        String(session.discipline?.id || session.topic?.discipline?.id),
      ),
  );
  return (
    planned.find((discipline) => !studiedIds.has(String(discipline.id))) ||
    planned[0] ||
    null
  );
}
