package br.com.concursoti.assets.repositories;

import br.com.concursoti.assets.entities.AssetBlob;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetBlobRepository extends JpaRepository<AssetBlob, String> {}
