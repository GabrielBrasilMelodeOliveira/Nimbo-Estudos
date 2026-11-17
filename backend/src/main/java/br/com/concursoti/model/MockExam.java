package br.com.concursoti.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="mock_exams")
public class MockExam {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
  @Column(nullable=false,length=160) public String title;
  @Column(nullable=false) public LocalDate date;
  @Column(nullable=false) public Integer total;
  @Column(nullable=false) public Integer correct;
  @Column(nullable=false) public Double cutoffPercentage;
  @Column(length=500) public String notes;
}
