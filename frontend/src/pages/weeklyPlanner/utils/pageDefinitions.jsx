import { BookOpen, GraduationCap, House, Heart, Briefcase } from "lucide-react";
import { TODAY } from "../../../shared/utils/utils.js";
import { parseDate, findGoal } from "../../../shared/utils/plannerMetrics.js";
export const CATEGORIES = {
  PERSONAL: {
    name: "Pessoal",
    icon: House,
  },
  ACADEMIC: {
    name: "Acadêmico",
    icon: GraduationCap,
  },
  STUDY: {
    name: "Concurso",
    icon: BookOpen,
  },
  WORK: {
    name: "Trabalho",
    icon: Briefcase,
  },
  HEALTH: {
    name: "Saúde",
    icon: Heart,
  },
};
export const WD = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
export const dateLabel = (s) =>
  new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(parseDate(s));
export const formInitial = (day = TODAY(), study = false) => ({
  title: "",
  category: study ? "STUDY" : "PERSONAL",
  scheduledDate: day,
  startTime: "",
  durationMinutes: 45,
  priority: 2,
  repeatWeekly: false,
  notes: "",
  topicId: "",
  studyKind: "THEORY",
  targetQuestions: 0,
});
export const goalInitial = (data, type, start) => {
  const found = findGoal(data, type, start);
  return {
    periodType: type,
    periodStart: start,
    targetMinutes:
      found?.targetMinutes ??
      (type === "WEEK" ? data.plan?.weeklyGoalMinutes || 0 : 0),
    targetQuestions: found?.targetQuestions ?? 0,
    targetTopics:
      found?.targetTopics ??
      (type === "WEEK" ? data.plan?.weeklyGoalTopics || 0 : 0),
  };
};
