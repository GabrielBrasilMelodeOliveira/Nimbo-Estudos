package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import br.com.concursoti.curriculum.repositories.DisciplineRepository;
import br.com.concursoti.curriculum.repositories.EditalImportRepository;
import br.com.concursoti.curriculum.repositories.TopicRepository;
import br.com.concursoti.errornotes.repositories.ErrorNoteRepository;
import br.com.concursoti.exams.repositories.MockExamRepository;
import br.com.concursoti.maintenance.controllers.MaintenanceController;
import br.com.concursoti.materials.repositories.MaterialRepository;
import br.com.concursoti.planning.repositories.AgendaItemRepository;
import br.com.concursoti.planning.repositories.PeriodGoalRepository;
import br.com.concursoti.questions.repositories.QuestionRecordRepository;
import br.com.concursoti.reviews.repositories.ReviewTaskRepository;
import br.com.concursoti.studying.repositories.StudySessionRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class MaintenanceControllerTest {

  @Mock
  br.com.concursoti.planning.repositories.DailyStudyPlanRepository dailyPlans;

  @Mock
  br.com.concursoti.flashcards.repositories.ManualFlashcardRepository manualFlashcards;

  @Mock
  DisciplineRepository disciplines;

  @Mock
  TopicRepository topics;

  @Mock
  QuestionRecordRepository questions;

  @Mock
  StudySessionRepository sessions;

  @Mock
  ReviewTaskRepository reviews;

  @Mock
  MockExamRepository exams;

  @Mock
  MaterialRepository materials;

  @Mock
  ErrorNoteRepository errors;

  @Mock
  AgendaItemRepository agenda;

  @Mock
  EditalImportRepository imports;

  @Mock
  PeriodGoalRepository goals;

  @InjectMocks
  MaintenanceController controller;

  @Test
  void requiresExactTypedConfirmation() {
    assertThrows(IllegalArgumentException.class, () ->
      controller.clear(
        new MaintenanceController.ClearRequest("questions", "excluir")
      )
    );
    assertThrows(IllegalArgumentException.class, () ->
      controller.clear(new MaintenanceController.ClearRequest("questions", ""))
    );
    assertThrows(IllegalArgumentException.class, () ->
      controller.clear(new MaintenanceController.ClearRequest(null, "EXCLUIR"))
    );
    verifyNoInteractions(questions, topics, disciplines);
  }

  @Test
  void questionsOnlyDoesNotDeleteOtherCategories() {
    var result = controller.clear(
      new MaintenanceController.ClearRequest("questions", "EXCLUIR")
    );
    assertEquals(true, result.get("success"));
    assertEquals("questions", result.get("scope"));
    verify(questions).deleteAllInBatch();
    verifyNoInteractions(
      disciplines,
      topics,
      sessions,
      errors,
      reviews,
      exams,
      materials,
      agenda,
      imports
    );
  }

  @Test
  void editalDeletesDependentsBeforeParents() {
    when(materials.findAll()).thenReturn(List.of());
    controller.clear(
      new MaintenanceController.ClearRequest("edital", "EXCLUIR")
    );
    var ordered = inOrder(
      errors,
      reviews,
      questions,
      sessions,
      topics,
      disciplines,
      imports
    );
    ordered.verify(errors).deleteAllInBatch();
    ordered.verify(reviews).deleteAllInBatch();
    ordered.verify(questions).deleteAllInBatch();
    ordered.verify(sessions).deleteAllInBatch();
    ordered.verify(topics).deleteAllInBatch();
    ordered.verify(disciplines).deleteAllInBatch();
    ordered.verify(imports).deleteAllInBatch();
    verify(materials).findAll();
    verify(materials, never()).deleteAllInBatch();
  }
}
