package br.com.concursoti.dailygoals.repositories;

import br.com.concursoti.dailygoals.entities.DailyGoalDay;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DailyGoalDayRepository
  extends JpaRepository<DailyGoalDay, LocalDate>
{
  List<DailyGoalDay> findAllByOrderByStudyDateAsc();
}
