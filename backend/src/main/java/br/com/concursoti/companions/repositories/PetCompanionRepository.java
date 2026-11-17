package br.com.concursoti.companions.repositories;

import br.com.concursoti.companions.entities.PetCompanion;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetCompanionRepository
  extends JpaRepository<PetCompanion, Long>
{
  Optional<PetCompanion> findBySpecies(String species);
  Optional<PetCompanion> findFirstByActiveTrue();
}
