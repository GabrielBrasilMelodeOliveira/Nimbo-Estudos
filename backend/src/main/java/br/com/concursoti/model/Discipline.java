package br.com.concursoti.model;

import jakarta.persistence.*;

@Entity
@Table(name = "disciplines")
public class Discipline {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) public Long id;
  @Column(nullable = false, length = 120) public String name;
  @Column(nullable = false, length = 16) public String color = "#2563eb";
  @Column(nullable = false) public Integer position = 0;
  @Column public Integer importance = 3; // Importância atribuída pelo aluno (1-5)
  @Column public Integer examWeight = 3; // Peso relativo na prova (1-5)
  @Column public Integer confidence = 3; // Conhecimento autodeclarado (1-5)
  public Discipline() {}
  public Discipline(String name, String color, int position) { this.name=name; this.color=color; this.position=position; }
}
