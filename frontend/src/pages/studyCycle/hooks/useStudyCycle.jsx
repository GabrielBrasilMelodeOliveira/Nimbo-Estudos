import { useEffect, useRef, useState } from "react";
import { TODAY } from "../../../shared/utils/utils.js";
export function useStudyCycle({ data, action, working, focusTopicId }) {
  const nextId = data.dashboard?.nextCycleDisciplineId;
  const [disciplineId, setDisciplineId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const startAt = useRef(null),
    elapsedMs = useRef(0);
  const interval = useRef(null),
    appliedFocus = useRef(null);
  const [showManual, setShowManual] = useState(false);
  const [concludeTopic, setConcludeTopic] = useState(null);
  const [showReorder, setShowReorder] = useState(false);
  const [cycleOrder, setCycleOrder] = useState([]);
  useEffect(() => {
    setCycleOrder(data.disciplines.map((d) => d.id));
  }, [data.disciplines]);
  const moveCycle = (index, direction) =>
    setCycleOrder((old) => {
      const next = [...old],
        target = index + direction;
      if (target < 0 || target >= next.length) return old;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  const [manual, setManual] = useState({
    disciplineId: "",
    topicId: "",
    hours: "0",
    minutes: "30",
    studyDate: TODAY(),
  });
  useEffect(() => {
    if (!disciplineId && nextId) setDisciplineId(String(nextId));
  }, [nextId, disciplineId]);
  useEffect(() => {
    if (
      !focusTopicId ||
      appliedFocus.current === focusTopicId ||
      running ||
      seconds > 0
    )
      return;
    const topic = (data.topics || []).find(
      (t) => String(t.id) === String(focusTopicId),
    );
    if (topic) {
      appliedFocus.current = focusTopicId;
      setDisciplineId(String(topic.discipline.id));
      setTopicId(String(topic.id));
    }
  }, [focusTopicId, data.topics, running, seconds]);
  useEffect(() => {
    if (running) {
      startAt.current = Date.now();
      interval.current = setInterval(
        () =>
          setSeconds(
            Math.floor(
              (elapsedMs.current + Date.now() - startAt.current) / 1000,
            ),
          ),
        250,
      );
    }
    return () => clearInterval(interval.current);
  }, [running]);
  const pause = () => {
    if (!running) return;
    elapsedMs.current += Date.now() - startAt.current;
    setRunning(false);
    setSeconds(Math.floor(elapsedMs.current / 1000));
  };
  const reset = () => {
    setRunning(false);
    elapsedMs.current = 0;
    setSeconds(0);
    setTopicId("");
  };
  const save = async () => {
    const duration = running
      ? Math.floor((elapsedMs.current + Date.now() - startAt.current) / 1000)
      : seconds;
    if (duration < 1) return;
    pause();
    const success = await action(
      "study-sessions",
      "POST",
      {
        disciplineId: Number(disciplineId),
        topicId: topicId ? Number(topicId) : null,
        durationSeconds: duration,
        studyDate: TODAY(),
        kind: "THEORY",
      },
      "Sessão salva! Próxima disciplina liberada no ciclo.",
    );
    if (success) {
      const studied = data.topics.find((t) => String(t.id) === String(topicId));
      reset();
      setDisciplineId("");
      if (studied) setConcludeTopic(studied);
    }
  };
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
      setDisciplineId("");
    }
  };
  const availableTopics = data.topics.filter(
    (t) => String(t.discipline.id) === String(disciplineId),
  );
  const manualTopics = data.topics.filter(
    (t) => String(t.discipline.id) === String(manual.disciplineId),
  );
  const next = data.disciplines.find((d) => d.id === nextId);
  const history = data["study-sessions"];
  const recommendation = data.analytics?.recommendations?.[0];
  const recommendedDiscipline = data.disciplines.find(
    (d) => d.id === recommendation?.disciplineId,
  );
  return {
    nextId,
    disciplineId,
    setDisciplineId,
    topicId,
    setTopicId,
    running,
    setRunning,
    seconds,
    setSeconds,
    startAt,
    elapsedMs,
    interval,
    appliedFocus,
    showManual,
    setShowManual,
    concludeTopic,
    setConcludeTopic,
    showReorder,
    setShowReorder,
    cycleOrder,
    setCycleOrder,
    moveCycle,
    manual,
    setManual,
    pause,
    reset,
    save,
    saveManual,
    availableTopics,
    manualTopics,
    next,
    history,
    recommendation,
    recommendedDiscipline,
  };
}
