import { useEffect, useState } from "react";
export function useSettings({ data, action, working }) {
  const [form, setForm] = useState({
    name: data.plan?.name || "",
    examDate: data.plan?.examDate || "",
    weeklyGoalHours: String((data.plan?.weeklyGoalMinutes || 900) / 60),
    weeklyGoalTopics: String(data.plan?.weeklyGoalTopics || 5),
  });
  useEffect(() => {
    setForm({
      name: data.plan?.name || "",
      examDate: data.plan?.examDate || "",
      weeklyGoalHours: String((data.plan?.weeklyGoalMinutes || 0) / 60),
      weeklyGoalTopics: String(data.plan?.weeklyGoalTopics || 0),
    });
  }, [data.plan]);
  const submit = (e) => {
    e.preventDefault();
    return action(
      "plan",
      "PUT",
      {
        name: form.name,
        examDate: form.examDate || null,
        weeklyGoalMinutes: Math.round(Number(form.weeklyGoalHours) * 60),
        weeklyGoalTopics: Number(form.weeklyGoalTopics),
      },
      "Plano atualizado!",
    );
  };
  return {
    form,
    setForm,
    submit,
  };
}
