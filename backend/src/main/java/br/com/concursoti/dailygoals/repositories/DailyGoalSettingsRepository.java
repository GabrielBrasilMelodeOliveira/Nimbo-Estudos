package br.com.concursoti.dailygoals.repositories;

import br.com.concursoti.dailygoals.entities.DailyGoalSettings;
import jakarta.persistence.LockModeType;
import java.time.LocalDate;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface DailyGoalSettingsRepository
  extends JpaRepository<DailyGoalSettings, Long>
{
  @Modifying
  @Query(
    value = "insert into daily_goal_settings (id, tracking_start, target_minutes, target_questions, target_topics) values (1, :today, :minutes, 0, :topics) on conflict (id) do nothing",
    nativeQuery = true
  )
  void initialize(
    @Param("today") LocalDate today,
    @Param("minutes") int minutes,
    @Param("topics") int topics
  );

  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @Query(
    "select settings from DailyGoalSettings settings where settings.id = 1"
  )
  Optional<DailyGoalSettings> findLocked();
}
