import { useEffect, useRef, useState } from "react";
import { api } from "../services/api.js";
import { accountLocalStorage } from "../utils/accountStorage.js";

export default function usePetCareSession(pet, onUpdate) {
  const [now, setNow] = useState(Date.now());
  const [notice, setNotice] = useState(null);
  const [celebrating, setCelebrating] = useState(false);
  const updateReference = useRef(onUpdate);
  updateReference.current = onUpdate;
  const activity = pet?.vitals?.activity;
  useEffect(() => {
    setNotice(null);
    setCelebrating(false);
  }, [pet?.id]);
  useEffect(() => {
    if (!pet?.id || !["TRAINING", "SLEEPING", "EATING"].includes(activity))
      return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [pet?.id, activity]);
  useEffect(() => {
    if (!pet?.id || !["TRAINING", "SLEEPING", "EATING"].includes(activity))
      return;
    let disposed = false;
    let busy = false;
    let pendingVisibility = false;
    const synchronize = async (allowHidden = false) => {
      if (busy) {
        if (allowHidden === true) pendingVisibility = true;
        return;
      }
      if (!updateReference.current) return;
      if (document.hidden && (activity !== "TRAINING" || allowHidden !== true))
        return;
      busy = true;
      try {
        const next =
          activity === "TRAINING"
            ? await api(`pet/${pet.id}/presence`, "POST", {
                present: !document.hidden,
              })
            : await api("pet");
        if (!disposed && next?.id === pet.id) updateReference.current?.(next);
      } catch {
        // A missing heartbeat never grants offline training time. Retry after reconnection.
      } finally {
        busy = false;
        if (pendingVisibility && !disposed) {
          pendingVisibility = false;
          synchronize(true);
        }
      }
    };
    synchronize();
    const timer = setInterval(synchronize, 15000);
    const visibility = () => {
      setNow(Date.now());
      synchronize(true);
    };
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("online", synchronize);
    return () => {
      disposed = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("online", synchronize);
    };
  }, [pet?.id, activity]);
  useEffect(() => {
    if (!pet?.id || pet.care?.dead) return;
    const events = [
      [
        "training",
        pet.vitals?.trainedAt,
        "Treino concluído! +20 pontos de cuidado. Penas afiadas, cérebro perigosíssimo.",
      ],
      [
        "sleep",
        pet.vitals?.wokeAt,
        "Acordei TURBINADO! Energia restaurada e +10 pontos de cuidado. Cadê o edital?",
      ],
    ];
    for (const [kind, timestamp, message] of events) {
      if (!timestamp) continue;
      const key = `nimbo:care-notice:${pet.id}:${kind}`;
      try {
        if (accountLocalStorage.getItem(key) === timestamp) continue;
        accountLocalStorage.setItem(key, timestamp);
      } catch {
        /* Notifications still work without persistence. */
      }
      setNotice(message);
      setCelebrating(true);
    }
  }, [pet?.id, pet?.vitals?.trainedAt, pet?.vitals?.wokeAt, pet?.care?.dead]);
  useEffect(() => {
    if (!celebrating) return;
    const timer = setTimeout(() => setCelebrating(false), 8000);
    return () => clearTimeout(timer);
  }, [celebrating]);
  return { now, notice, clearNotice: () => setNotice(null), celebrating };
}
