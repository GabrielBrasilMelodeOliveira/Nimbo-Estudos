package br.com.concursoti.repo;

import br.com.concursoti.model.StoredAsset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoredAssetRepository extends JpaRepository<StoredAsset,String> {}
