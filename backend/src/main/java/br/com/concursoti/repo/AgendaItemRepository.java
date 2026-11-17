package br.com.concursoti.repo;
import br.com.concursoti.model.AgendaItem;
import org.springframework.data.jpa.repository.JpaRepository;
public interface AgendaItemRepository extends JpaRepository<AgendaItem,Long> {}
