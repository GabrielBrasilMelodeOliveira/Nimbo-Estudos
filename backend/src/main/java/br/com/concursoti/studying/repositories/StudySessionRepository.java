package br.com.concursoti.studying.repositories;

import br.com.concursoti.studying.entities.StudySession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudySessionRepository
  extends JpaRepository<StudySession, Long>
{
  java.util.List<StudySession> findByStudyDateBetween(
    java.time.LocalDate start,
    java.time.LocalDate end
  );
}
