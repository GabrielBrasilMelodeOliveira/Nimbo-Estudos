package br.com.concursoti.exams.services;

import br.com.concursoti.companions.services.PetService;
import br.com.concursoti.exams.entities.MockExam;
import br.com.concursoti.exams.repositories.MockExamRepository;
import java.time.LocalDate;
import java.util.*;
import org.springframework.data.domain.Sort;

@org.springframework.stereotype.Service
public class ExamsService {

  private final MockExamRepository exams;
  private final PetService pet;

  public ExamsService(MockExamRepository exams, PetService pet) {
    this.exams = exams;
    this.pet = pet;
  }

  private String required(String value, String field, int max) {
    if (value == null || value.isBlank()) throw new IllegalArgumentException(
      "Preencha o campo: " + field
    );
    if (value.trim().length() > max) throw new IllegalArgumentException(
      field + " excede " + max + " caracteres."
    );
    return value.trim();
  }

  private void countPair(Integer total, Integer correct) {
    if (
      total == null ||
      total <= 0 ||
      correct == null ||
      correct < 0 ||
      correct > total
    ) throw new IllegalArgumentException(
      "Total deve ser positivo e acertos devem estar entre 0 e o total."
    );
  }

  private LocalDate dateOrToday(LocalDate date) {
    return date == null ? LocalDate.now() : date;
  }

  public record ExamInput(
    String title,
    LocalDate date,
    Integer total,
    Integer correct,
    Double cutoffPercentage,
    String notes
  ) {}

  public List<MockExam> mockExams() {
    return exams.findAll(Sort.by(Sort.Direction.DESC, "date", "id"));
  }

  public MockExam addExam(ExamInput request) {
    countPair(request.total(), request.correct());
    if (
      request.cutoffPercentage() == null ||
      request.cutoffPercentage() < 0 ||
      request.cutoffPercentage() > 100
    ) throw new IllegalArgumentException(
      "Nota de corte deve estar entre 0 e 100%."
    );
    MockExam m = new MockExam();
    m.title = required(request.title(), "Nome do simulado", 160);
    m.date = dateOrToday(request.date());
    m.total = request.total();
    m.correct = request.correct();
    m.cutoffPercentage = request.cutoffPercentage();
    m.notes = request.notes();
    MockExam saved = exams.save(m);
    pet.progress(
      Math.min(150, request.correct() * 2),
      Math.min(25, request.correct() / 2) -
        Math.min(30, request.total() - request.correct())
    );
    return saved;
  }

  public void deleteExam(Long id) {
    exams.delete(exams.findById(id).orElseThrow());
  }
}
