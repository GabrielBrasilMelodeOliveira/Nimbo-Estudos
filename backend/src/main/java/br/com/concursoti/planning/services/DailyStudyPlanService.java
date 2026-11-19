package br.com.concursoti.planning.services;

import br.com.concursoti.curriculum.entities.Discipline;
import br.com.concursoti.curriculum.repositories.DisciplineRepository;
import br.com.concursoti.planning.entities.DailyStudyPlan;
import br.com.concursoti.planning.repositories.DailyStudyPlanRepository;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Stream;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DailyStudyPlanService {

  private final DailyStudyPlanRepository plans;
  private final DisciplineRepository disciplines;

  public DailyStudyPlanService(
    DailyStudyPlanRepository plans,
    DisciplineRepository disciplines
  ) {
    this.plans = plans;
    this.disciplines = disciplines;
  }

  public record PlanInput(List<Long> disciplineIds) {}

  public record PlanView(LocalDate studyDate, List<Discipline> disciplines) {}

  private PlanView view(DailyStudyPlan plan) {
    return new PlanView(
      plan.studyDate,
      Stream.of(plan.firstDiscipline, plan.secondDiscipline)
        .filter(Objects::nonNull)
        .toList()
    );
  }

  public List<PlanView> list() {
    return plans
      .findAll(Sort.by("studyDate"))
      .stream()
      .map(this::view)
      .toList();
  }

  @Transactional
  public PlanView save(LocalDate date, PlanInput request) {
    if (
      request == null ||
      request.disciplineIds() == null ||
      request.disciplineIds().size() > 2 ||
      request.disciplineIds().stream().anyMatch(Objects::isNull) ||
      new HashSet<>(request.disciplineIds()).size() !=
        request.disciplineIds().size()
    ) throw new IllegalArgumentException(
      "Escolha até duas disciplinas diferentes por dia."
    );
    List<Discipline> selected = request
      .disciplineIds()
      .stream()
      .map(id ->
        disciplines
          .findById(id)
          .orElseThrow(() ->
            new IllegalArgumentException("Disciplina não encontrada.")
          )
      )
      .toList();
    if (selected.isEmpty()) {
      plans.deleteById(date);
      return new PlanView(date, List.of());
    }
    DailyStudyPlan plan = plans.findById(date).orElseGet(DailyStudyPlan::new);
    plan.studyDate = date;
    plan.firstDiscipline = selected.getFirst();
    plan.secondDiscipline = selected.size() == 2 ? selected.get(1) : null;
    return view(plans.save(plan));
  }
}
