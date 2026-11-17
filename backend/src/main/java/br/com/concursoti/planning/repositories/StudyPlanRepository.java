package br.com.concursoti.planning.repositories;

import br.com.concursoti.planning.entities.StudyPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyPlanRepository extends JpaRepository<StudyPlan, Long> {}
