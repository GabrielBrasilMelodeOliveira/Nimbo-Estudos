package br.com.concursoti.planning.repositories;

import br.com.concursoti.planning.entities.AgendaItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgendaItemRepository extends JpaRepository<AgendaItem, Long> {}
