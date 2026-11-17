package br.com.concursoti.repo;
import br.com.concursoti.model.PeriodGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;
public interface PeriodGoalRepository extends JpaRepository<PeriodGoal,Long> {
  Optional<PeriodGoal> findByPeriodTypeAndPeriodStart(PeriodGoal.PeriodType periodType,LocalDate periodStart);
}
