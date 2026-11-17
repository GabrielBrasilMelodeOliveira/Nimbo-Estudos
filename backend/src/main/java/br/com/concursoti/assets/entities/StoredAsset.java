package br.com.concursoti.assets.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stored_assets")
public class StoredAsset {

  @Id
  @Column(length = 36)
  public String id;

  @Column(nullable = false, length = 240)
  public String originalName;

  @Column(nullable = false, length = 80)
  public String mediaType;

  @Column(nullable = false)
  public Long sizeBytes;

  @Column(nullable = false)
  public LocalDateTime createdAt;
}
