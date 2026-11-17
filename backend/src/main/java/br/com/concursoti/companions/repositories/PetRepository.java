package br.com.concursoti.companions.repositories;

import br.com.concursoti.companions.entities.PetState;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<PetState, Long> {}
