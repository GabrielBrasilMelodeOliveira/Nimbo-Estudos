package br.com.concursoti.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity @Table(name="edital_imports")
public class EditalImport {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
  @Column(nullable=false,length=240) public String fileName;
  @Column(nullable=false,length=36) public String assetId;
  @Column(nullable=false) public Integer addedDisciplines=0;
  @Column(nullable=false) public Integer addedTopics=0;
  @Column(nullable=false) public Integer skippedTopics=0;
  public LocalDateTime importedAt=LocalDateTime.now();
}
