package br.com.concursoti.planning.repositories;

import br.com.concursoti.planning.entities.AgendaItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgendaItemRepository extends JpaRepository<AgendaItem, Long> {
  @org.springframework.data.jpa.repository.Lock(
    jakarta.persistence.LockModeType.PESSIMISTIC_WRITE
  )
  @org.springframework.data.jpa.repository.Query(
    "select item from AgendaItem item where item.id = :id"
  )
  java.util.Optional<AgendaItem> findLockedById(
    @org.springframework.data.repository.query.Param("id") Long id
  );
}
