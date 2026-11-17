package br.com.concursoti.errornotes.repositories;

import br.com.concursoti.errornotes.entities.ErrorNote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ErrorNoteRepository extends JpaRepository<ErrorNote, Long> {}
