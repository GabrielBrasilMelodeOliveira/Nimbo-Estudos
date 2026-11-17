package br.com.concursoti.planning.services;

import br.com.concursoti.planning.entities.StudyPlan;
import br.com.concursoti.planning.repositories.StudyPlanRepository;
import java.time.LocalDate;
import java.util.*;

@org.springframework.stereotype.Service
public class PlanningService {

  private final StudyPlanRepository plans;

  public PlanningService(StudyPlanRepository plans) {
    this.plans = plans;
  }

  private String required(String value, String field, int max) {
    if (value == null || value.isBlank()) throw new IllegalArgumentException(
      "Preencha o campo: " + field
    );
    if (value.trim().length() > max) throw new IllegalArgumentException(
      field + " excede " + max + " caracteres."
    );
    return value.trim();
  }

  public record PlanInput(
    String name,
    LocalDate examDate,
    Integer weeklyGoalMinutes,
    Integer weeklyGoalTopics
  ) {}

  public StudyPlan plan() {
    return plans.findById(1L).orElseGet(() -> plans.save(new StudyPlan()));
  }

  public StudyPlan updatePlan(PlanInput request) {
    StudyPlan p = plan();
    p.name = required(request.name(), "Nome do concurso", 140);
    p.examDate = request.examDate();
    if (
      request.weeklyGoalMinutes() == null ||
      request.weeklyGoalMinutes() < 0 ||
      request.weeklyGoalMinutes() > 10080 ||
      request.weeklyGoalTopics() == null ||
      request.weeklyGoalTopics() < 0 ||
      request.weeklyGoalTopics() > 100
    ) throw new IllegalArgumentException(
      "Confira as metas semanais informadas."
    );
    p.weeklyGoalMinutes = request.weeklyGoalMinutes();
    p.weeklyGoalTopics = request.weeklyGoalTopics();
    return plans.save(p);
  }
}
