package br.com.concursoti.assets.repositories;

import br.com.concursoti.assets.entities.StoredAsset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoredAssetRepository
  extends JpaRepository<StoredAsset, String> {}
