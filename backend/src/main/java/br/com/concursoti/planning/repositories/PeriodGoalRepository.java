package br.com.concursoti.planning.repositories;

import br.com.concursoti.planning.entities.PeriodGoal;
import java.time.LocalDate;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PeriodGoalRepository extends JpaRepository<PeriodGoal, Long> {
  Optional<PeriodGoal> findByPeriodTypeAndPeriodStart(
    PeriodGoal.PeriodType periodType,
    LocalDate periodStart
  );
}
