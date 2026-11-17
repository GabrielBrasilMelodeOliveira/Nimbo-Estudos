package br.com.concursoti.shared.services;

import br.com.concursoti.planning.entities.StudyPlan;
import br.com.concursoti.planning.repositories.StudyPlanRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/** Na instalação nova, não cria disciplinas fictícias: o usuário importa seu edital real. */
@Component
public class SeedData implements CommandLineRunner {

  private final StudyPlanRepository plans;

  public SeedData(StudyPlanRepository plans) {
    this.plans = plans;
  }

  @Override
  public void run(String... args) {
    if (plans.count() == 0) plans.save(new StudyPlan());
  }
}
