package br.com.concursoti.repo;
import br.com.concursoti.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
public interface MaterialRepository extends JpaRepository<Material, Long> {}
