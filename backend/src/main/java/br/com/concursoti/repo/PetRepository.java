package br.com.concursoti.repo;
import br.com.concursoti.model.PetState;
import org.springframework.data.jpa.repository.JpaRepository;
public interface PetRepository extends JpaRepository<PetState,Long> {}
