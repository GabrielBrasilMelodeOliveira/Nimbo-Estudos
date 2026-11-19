import { useState } from "react";
import { TODAY } from "../../../shared/utils/utils.js";
export function useStudyCycle({ data, action }) {
  const [showManual, setShowManual] = useState(false);
  const [manual, setManual] = useState({
    disciplineId: "",
    topicId: "",
    hours: "0",
    minutes: "30",
    studyDate: TODAY(),
  });
  const saveManual = async (e) => {
    e.preventDefault();
    const secs = (Number(manual.hours) * 60 + Number(manual.minutes)) * 60;
    if (secs <= 0) return;
    if (
      await action(
        "study-sessions",
        "POST",
        {
          disciplineId: Number(manual.disciplineId),
          topicId: manual.topicId ? Number(manual.topicId) : null,
          durationSeconds: secs,
          studyDate: manual.studyDate,
          kind: "THEORY",
        },
        "Horas registradas!",
      )
    ) {
      setShowManual(false);
      setManual({
        disciplineId: "",
        topicId: "",
        hours: "0",
        minutes: "30",
        studyDate: TODAY(),
      });
    }
  };
  const manualTopics = (data.topics || []).filter(
    (topic) => String(topic.discipline.id) === manual.disciplineId,
  );
  return {
    showManual,
    setShowManual,
    manual,
    setManual,
    saveManual,
    manualTopics,
    history: data["study-sessions"] || [],
  };
}
