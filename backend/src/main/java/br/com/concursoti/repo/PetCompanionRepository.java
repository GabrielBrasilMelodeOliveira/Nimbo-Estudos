package br.com.concursoti.repo;
import br.com.concursoti.model.PetCompanion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface PetCompanionRepository extends JpaRepository<PetCompanion,Long>{
  Optional<PetCompanion> findBySpecies(String species);
  Optional<PetCompanion> findFirstByActiveTrue();
}
