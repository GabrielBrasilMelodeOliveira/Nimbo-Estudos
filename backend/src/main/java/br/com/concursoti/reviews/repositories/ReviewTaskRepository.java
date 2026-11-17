package br.com.concursoti.reviews.repositories;

import br.com.concursoti.reviews.entities.ReviewTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewTaskRepository extends JpaRepository<ReviewTask, Long> {
  boolean existsByTopic_IdAndIntervalDaysAndDueDate(
    Long topicId,
    Integer intervalDays,
    java.time.LocalDate dueDate
  );
}
