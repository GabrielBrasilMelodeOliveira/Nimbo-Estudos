package br.com.concursoti.questions.repositories;

import br.com.concursoti.questions.entities.QuestionRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRecordRepository
  extends JpaRepository<QuestionRecord, Long> {}
