package br.com.concursoti.repo;
import br.com.concursoti.model.Discipline;
import org.springframework.data.jpa.repository.JpaRepository;
public interface DisciplineRepository extends JpaRepository<Discipline, Long> {}
