package br.com.concursoti.materials.repositories;

import br.com.concursoti.materials.entities.Material;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialRepository extends JpaRepository<Material, Long> {}
