package br.com.concursoti.exams.repositories;

import br.com.concursoti.exams.entities.MockExam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MockExamRepository extends JpaRepository<MockExam, Long> {}
