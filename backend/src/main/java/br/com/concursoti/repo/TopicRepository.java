package br.com.concursoti.repo;
import br.com.concursoti.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
public interface TopicRepository extends JpaRepository<Topic, Long> {}
