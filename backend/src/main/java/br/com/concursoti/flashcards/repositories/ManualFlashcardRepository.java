package br.com.concursoti.flashcards.repositories;

import br.com.concursoti.flashcards.entities.ManualFlashcard;
import jakarta.persistence.LockModeType;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface ManualFlashcardRepository
  extends JpaRepository<ManualFlashcard, Long>
{
  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @Query("select card from ManualFlashcard card where card.id = :id")
  Optional<ManualFlashcard> findLockedById(@Param("id") Long id);
}
