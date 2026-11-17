package br.com.concursoti.repo;
import br.com.concursoti.model.ReviewTask;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ReviewTaskRepository extends JpaRepository<ReviewTask, Long> {
  boolean existsByTopic_IdAndIntervalDaysAndDueDate(Long topicId, Integer intervalDays, java.time.LocalDate dueDate);
}
