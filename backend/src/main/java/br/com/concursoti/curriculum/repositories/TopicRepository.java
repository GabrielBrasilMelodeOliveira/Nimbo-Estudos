package br.com.concursoti.curriculum.repositories;

import br.com.concursoti.curriculum.entities.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Long> {}
