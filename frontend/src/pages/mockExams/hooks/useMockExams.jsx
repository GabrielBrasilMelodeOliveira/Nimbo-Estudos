import { useState } from "react";
import { percentage } from "../../../shared/utils/utils.js";
import { blank } from "../utils/pageDefinitions.jsx";
export function useMockExams({ data, action, working }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);
  const exams = data["mock-exams"];
  const best = exams.length
    ? Math.max(...exams.map((e) => percentage(e.correct, e.total)))
    : 0;
  const last = exams[0];
  const goalAchieved = exams.filter(
    (e) => percentage(e.correct, e.total) >= e.cutoffPercentage,
  ).length;
  const save = async (e) => {
    e.preventDefault();
    if (
      await action(
        "mock-exams",
        "POST",
        {
          ...form,
          total: Number(form.total),
          correct: Number(form.correct),
          cutoffPercentage: Number(form.cutoffPercentage),
        },
        "Simulado registrado!",
      )
    ) {
      setOpen(false);
      setForm(blank);
    }
  };
  return {
    open,
    setOpen,
    form,
    setForm,
    exams,
    best,
    last,
    goalAchieved,
    save,
  };
}
