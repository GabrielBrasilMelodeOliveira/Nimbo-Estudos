package br.com.concursoti.curriculum.repositories;

import br.com.concursoti.curriculum.entities.Discipline;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DisciplineRepository extends JpaRepository<Discipline, Long> {}
