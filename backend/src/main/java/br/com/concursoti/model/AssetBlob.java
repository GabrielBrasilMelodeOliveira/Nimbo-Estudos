package br.com.concursoti.model;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/** Conteúdo de todos os uploads guardado no PostgreSQL em BYTEA; separado dos metadados. */
@Entity
@Table(name="asset_blobs")
public class AssetBlob {
  @Id @Column(length=36) public String id;
  @JdbcTypeCode(SqlTypes.VARBINARY)
  @Column(name="content",nullable=false,columnDefinition="bytea") public byte[] content;
  public AssetBlob(){}
  public AssetBlob(String id,byte[] content){this.id=id;this.content=content;}
}
