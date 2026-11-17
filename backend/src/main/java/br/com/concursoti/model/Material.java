package br.com.concursoti.model;

import jakarta.persistence.*;

@Entity
@Table(name="materials")
public class Material {
  public enum Type { PDF, DOCX, IMAGE, VIDEO, QUESTIONS, DRIVE, COURSE, OTHER }
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
  @Column(nullable=false,length=140) public String title;
  @Column(nullable=false,length=2000) public String url;
  @Enumerated(EnumType.STRING) @Column(nullable=false,length=20) public Type type=Type.OTHER;
  @ManyToOne(fetch=FetchType.EAGER) @JoinColumn(name="topic_id") public Topic topic;
  @Column(length=400) public String description;
  // Valores padrão são aplicados também a registros legados com o Hibernate update.
  @Column(length=36) public String assetId;
  @Column(length=36) public String originalAssetId;
  @Column(length=36) public String previewAssetId;
  @Column public Boolean readDone=false;
  @Column public Boolean reviewed=false;
  @Column public Boolean readRewarded=false;
  @Column public Boolean reviewRewarded=false;
  @Enumerated(EnumType.STRING) @Column(length=16) public Topic.Mastery mastery=Topic.Mastery.WEAK;
  @Column(columnDefinition="text") public String notes;
  public java.time.LocalDate readAt;
  public java.time.LocalDate reviewedAt;
}
