package br.com.concursoti.planning.repositories;

import br.com.concursoti.planning.entities.DailyStudyPlan;
import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DailyStudyPlanRepository
  extends JpaRepository<DailyStudyPlan, LocalDate> {}
