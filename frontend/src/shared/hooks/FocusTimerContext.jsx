import { createAccountSessionStorage } from "../utils/accountStorage.js";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { TODAY } from "../utils/utils.js";
import {
  elapsedMilliseconds,
  focusStorageKey,
  freshFocus,
  restoreFocus,
} from "../utils/focusClock.js";

const FocusContext = createContext(null);
export function useFocusTimer() {
  const context = useContext(FocusContext);
  if (!context) throw new Error("O cronômetro precisa do FocusTimerProvider.");
  return context;
}
export function FocusTimerProvider({ data, action, working, children }) {
  const [sessionStorage] = useState(createAccountSessionStorage);
  const [clock, setClock] = useState(() => restoreFocus(sessionStorage));
  const [now, setNow] = useState(Date.now());
  const [recordOpen, setRecordOpen] = useState(false);
  const [result, setResult] = useState({ total: "20", correct: "", notes: "" });
  const [concludeTopic, setConcludeTopic] = useState(null);
  const savingReference = useRef(false);
  const [saving, setSaving] = useState(false);
  const running = clock.runningSince !== null;
  const seconds = Math.floor(elapsedMilliseconds(clock, now) / 1000);
  const active = running || clock.elapsedMs > 0;
  const topic = data.topics?.find((item) => String(item.id) === clock.topicId);
  const discipline =
    data.disciplines?.find((item) => String(item.id) === clock.disciplineId) ||
    topic?.discipline;
  useEffect(() => {
    try {
      sessionStorage.setItem(focusStorageKey, JSON.stringify(clock));
      sessionStorage.removeItem("nimbo-question-timer-v1");
    } catch {
      /* Clock still works when storage is unavailable. */
    }
  }, [clock, sessionStorage]);
  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(interval);
  }, [running]);
  const configure = (selection) =>
    setClock((current) =>
      current.runningSince !== null || current.elapsedMs > 0
        ? current
        : { ...current, ...selection },
    );
  const start = () => {
    if (
      working ||
      saving ||
      recordOpen ||
      !discipline ||
      (clock.kind === "QUESTIONS" && !topic) ||
      seconds >= 86400
    )
      return;
    const timestamp = Date.now();
    setClock((current) => ({
      ...current,
      disciplineId: String(discipline.id),
      runningSince: current.runningSince ?? timestamp,
      studyDate: current.studyDate || TODAY(),
    }));
    setNow(timestamp);
  };
  const pause = () => {
    const timestamp = Date.now();
    const pausedClock = {
      ...clock,
      elapsedMs: elapsedMilliseconds(clock, timestamp),
      runningSince: null,
    };
    // Persist before logout can unmount this provider and change the active account.
    try {
      sessionStorage.setItem(focusStorageKey, JSON.stringify(pausedClock));
    } catch {
      /* Pausing still works when browser storage is unavailable. */
    }
    setClock(pausedClock);
    setNow(timestamp);
  };
  const reset = () => {
    setClock((current) => ({
      ...freshFocus(),
      kind: current.kind,
      disciplineId: current.disciplineId,
      topicId: current.topicId,
    }));
    setNow(Date.now());
  };
  const finish = () => {
    if (elapsedMilliseconds(clock) < 1000 || saving || working) return;
    pause();
    setRecordOpen(true);
  };
  const save = async (event) => {
    event.preventDefault();
    if (savingReference.current || working) return;
    const durationSeconds = Math.floor(elapsedMilliseconds(clock) / 1000);
    if (
      !discipline ||
      durationSeconds < 1 ||
      (clock.kind === "QUESTIONS" &&
        (!topic ||
          !result.correct.trim() ||
          Number(result.total) < 1 ||
          Number(result.correct) < 0 ||
          Number(result.correct) > Number(result.total)))
    )
      return;
    savingReference.current = true;
    setSaving(true);
    try {
      const questionSession = clock.kind === "QUESTIONS";
      const payload = questionSession
        ? {
            topicId: topic.id,
            total: Number(result.total),
            correct: Number(result.correct),
            notes: result.notes,
            date: clock.studyDate || TODAY(),
            durationSeconds,
          }
        : {
            disciplineId: discipline.id,
            topicId: topic?.id || null,
            kind: "THEORY",
            studyDate: clock.studyDate || TODAY(),
            durationSeconds,
          };
      if (
        await action(
          questionSession ? "questions" : "study-sessions",
          "POST",
          payload,
          "Sessão registrada! Bom trabalho.",
        )
      ) {
        setRecordOpen(false);
        reset();
        setResult({ total: "20", correct: "", notes: "" });
        if (!questionSession && topic) setConcludeTopic(topic);
      }
    } finally {
      savingReference.current = false;
      setSaving(false);
    }
  };
  return (
    <FocusContext.Provider
      value={{
        clock,
        seconds,
        running,
        active,
        topic,
        discipline,
        configure,
        start,
        pause,
        reset,
        finish,
        save,
        saving,
        recordOpen,
        setRecordOpen,
        result,
        setResult,
        concludeTopic,
        setConcludeTopic,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
}
