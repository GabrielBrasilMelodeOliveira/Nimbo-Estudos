package br.com.concursoti.maintenance.controllers;

import br.com.concursoti.curriculum.repositories.DisciplineRepository;
import br.com.concursoti.curriculum.repositories.EditalImportRepository;
import br.com.concursoti.curriculum.repositories.TopicRepository;
import br.com.concursoti.errornotes.repositories.ErrorNoteRepository;
import br.com.concursoti.exams.repositories.MockExamRepository;
import br.com.concursoti.flashcards.repositories.ManualFlashcardRepository;
import br.com.concursoti.materials.entities.Material;
import br.com.concursoti.materials.repositories.MaterialRepository;
import br.com.concursoti.planning.repositories.AgendaItemRepository;
import br.com.concursoti.planning.repositories.DailyStudyPlanRepository;
import br.com.concursoti.planning.repositories.PeriodGoalRepository;
import br.com.concursoti.questions.repositories.QuestionRecordRepository;
import br.com.concursoti.reviews.repositories.ReviewTaskRepository;
import br.com.concursoti.studying.repositories.StudySessionRepository;
import jakarta.transaction.Transactional;
import java.util.Map;
import java.util.Set;
import org.springframework.web.bind.annotation.*;

/**
 * Manutenção explícita da instalação pessoal. Nenhuma exclusão ocorre via GET.
 * A operação é atômica: em caso de erro, o PostgreSQL faz rollback.
 */
@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {

  private static final Set<String> SCOPES = Set.of(
    "questions",
    "errors",
    "reviews",
    "sessions",
    "exams",
    "materials",
    "agenda",
    "topics",
    "edital",
    "all"
  );
  private final DisciplineRepository disciplines;
  private final TopicRepository topics;
  private final QuestionRecordRepository questions;
  private final StudySessionRepository sessions;
  private final ReviewTaskRepository reviews;
  private final MockExamRepository exams;
  private final MaterialRepository materials;
  private final ErrorNoteRepository errors;
  private final AgendaItemRepository agenda;
  private final EditalImportRepository imports;
  private final PeriodGoalRepository goals;
  private final DailyStudyPlanRepository dailyPlans;
  private final ManualFlashcardRepository manualFlashcards;

  public MaintenanceController(
    DisciplineRepository disciplines,
    TopicRepository topics,
    QuestionRecordRepository questions,
    StudySessionRepository sessions,
    ReviewTaskRepository reviews,
    MockExamRepository exams,
    MaterialRepository materials,
    ErrorNoteRepository errors,
    AgendaItemRepository agenda,
    EditalImportRepository imports,
    PeriodGoalRepository goals,
    DailyStudyPlanRepository dailyPlans,
    ManualFlashcardRepository manualFlashcards
  ) {
    this.disciplines = disciplines;
    this.topics = topics;
    this.questions = questions;
    this.sessions = sessions;
    this.reviews = reviews;
    this.exams = exams;
    this.materials = materials;
    this.errors = errors;
    this.agenda = agenda;
    this.imports = imports;
    this.goals = goals;
    this.dailyPlans = dailyPlans;
    this.manualFlashcards = manualFlashcards;
  }

  public record ClearRequest(String scope, String confirmation) {}

  @PostMapping("/clear")
  @Transactional
  public Map<String, Object> clear(@RequestBody ClearRequest request) {
    if (
      request == null ||
      request.scope() == null ||
      !SCOPES.contains(request.scope())
    ) throw new IllegalArgumentException(
      "Escolha um conjunto válido para excluir."
    );
    if (
      !"EXCLUIR".equals(request.confirmation())
    ) throw new IllegalArgumentException(
      "Digite EXCLUIR para confirmar a operação."
    );

    // Dados filhos precisam ser excluídos antes de seus tópicos/disciplinas.
    switch (request.scope()) {
      case "questions" -> questions.deleteAllInBatch();
      case "errors" -> errors.deleteAllInBatch();
      case "reviews" -> reviews.deleteAllInBatch();
      case "sessions" -> sessions.deleteAllInBatch();
      case "exams" -> exams.deleteAllInBatch();
      case "materials" -> materials.deleteAllInBatch();
      case "agenda" -> {
        dailyPlans.deleteAllInBatch();
        agenda.deleteAllInBatch();
        goals.deleteAllInBatch();
      }
      case "topics" -> clearTopics();
      case "edital" -> clearEdital();
      case "all" -> {
        manualFlashcards.deleteAllInBatch();
        // Mantém os arquivos binários no banco para não destruir anexos órfãos
        // de forma irreversível; a limpeza de blobs será uma rotina separada.
        materials.deleteAllInBatch();
        clearEdital();
        exams.deleteAllInBatch();
        dailyPlans.deleteAllInBatch();
        agenda.deleteAllInBatch();
        goals.deleteAllInBatch();
      }
      default -> throw new IllegalArgumentException("Conjunto desconhecido.");
    }
    return Map.of("success", true, "scope", request.scope());
  }

  private void clearTopics() {
    // Materiais não devem ser apagados numa limpeza apenas dos assuntos.
    var linked = materials
      .findAll()
      .stream()
      .filter(m -> m.topic != null)
      .toList();
    for (Material m : linked) m.topic = null;
    if (!linked.isEmpty()) materials.saveAllAndFlush(linked);
    // Blocos de estudo devem perder sua associação antes da exclusão do assunto.
    var related = agenda
      .findAll()
      .stream()
      .filter(a -> a.topic != null)
      .toList();
    for (var a : related) {
      a.topic = null;
      a.studyKind = null;
      a.targetQuestions = null;
    }
    if (!related.isEmpty()) agenda.saveAllAndFlush(related);
    errors.deleteAllInBatch();
    reviews.deleteAllInBatch();
    questions.deleteAllInBatch();
    sessions.deleteAllInBatch();
    topics.deleteAllInBatch();
  }

  private void clearEdital() {
    clearTopics();
    dailyPlans.deleteAllInBatch();
    disciplines.deleteAllInBatch();
    imports.deleteAllInBatch();
  }
}
