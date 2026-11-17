package br.com.concursoti.errornotes.repositories;

import br.com.concursoti.errornotes.entities.ErrorNote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ErrorNoteRepository extends JpaRepository<ErrorNote, Long> {
  @org.springframework.data.jpa.repository.Lock(
    jakarta.persistence.LockModeType.PESSIMISTIC_WRITE
  )
  @org.springframework.data.jpa.repository.Query(
    "select errorNote from ErrorNote errorNote where errorNote.id = :id"
  )
  java.util.Optional<ErrorNote> findLockedById(
    @org.springframework.data.repository.query.Param("id") Long id
  );
}
