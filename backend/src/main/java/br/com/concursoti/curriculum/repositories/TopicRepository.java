package br.com.concursoti.curriculum.repositories;

import br.com.concursoti.curriculum.entities.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Long> {
  @org.springframework.data.jpa.repository.Lock(
    jakarta.persistence.LockModeType.PESSIMISTIC_WRITE
  )
  @org.springframework.data.jpa.repository.Query(
    "select topic from Topic topic where topic.id = :id"
  )
  java.util.Optional<Topic> findLockedById(
    @org.springframework.data.repository.query.Param("id") Long id
  );
}
