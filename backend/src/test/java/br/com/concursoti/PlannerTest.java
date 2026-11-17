package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import br.com.concursoti.curriculum.repositories.TopicRepository;
import br.com.concursoti.planning.controllers.PlannerController;
import br.com.concursoti.planning.entities.AgendaItem;
import br.com.concursoti.planning.entities.PeriodGoal;
import br.com.concursoti.planning.repositories.AgendaItemRepository;
import br.com.concursoti.planning.repositories.PeriodGoalRepository;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;
import org.junit.jupiter.api.Test;

class PlannerTest {

  @Test
  void agendaExigeDiaEAtividade() {
    var repository = mock(AgendaItemRepository.class);
    var controller = new PlannerController(
      repository,
      mock(TopicRepository.class),
      mock(PeriodGoalRepository.class)
    );
    assertThrows(IllegalArgumentException.class, () ->
      controller.add(
        new PlannerController.AgendaInput(
          "",
          AgendaItem.Category.PERSONAL,
          LocalDate.now(),
          null,
          30,
          2,
          false,
          "",
          null,
          null,
          null
        )
      )
    );
    assertThrows(IllegalArgumentException.class, () ->
      controller.add(
        new PlannerController.AgendaInput(
          "Estudar",
          AgendaItem.Category.STUDY,
          null,
          null,
          30,
          2,
          false,
          "",
          null,
          null,
          null
        )
      )
    );
    verifyNoInteractions(repository);
  }

  @Test
  void concluirCompromissoSemanalGeraProximaOcorrencia() {
    var repository = mock(AgendaItemRepository.class);
    var current = new AgendaItem();
    current.id = 1L;
    current.title = "Academia";
    current.scheduledDate = LocalDate.now();
    current.repeatWeekly = true;
    when(repository.findById(1L)).thenReturn(Optional.of(current));
    when(repository.findAll()).thenReturn(List.of(current));
    var controller = new PlannerController(
      repository,
      mock(TopicRepository.class),
      mock(PeriodGoalRepository.class)
    );
    assertTrue(controller.toggle(1L).completed);
    verify(repository, times(2)).save(any(AgendaItem.class));
  }

  @Test
  void metaSemanalDeveIniciarNaSegunda() {
    var controller = new PlannerController(
      mock(AgendaItemRepository.class),
      mock(TopicRepository.class),
      mock(PeriodGoalRepository.class)
    );
    LocalDate wednesday = LocalDate.of(2026, 11, 18);
    assertThrows(IllegalArgumentException.class, () ->
      controller.putGoal(
        new PlannerController.GoalInput(
          PeriodGoal.PeriodType.WEEK,
          wednesday,
          600,
          50,
          4
        )
      )
    );
  }

  @Test
  void metaMensalEhSalvaNoPostgres() {
    var goals = mock(PeriodGoalRepository.class);
    var controller = new PlannerController(
      mock(AgendaItemRepository.class),
      mock(TopicRepository.class),
      goals
    );
    when(
      goals.findByPeriodTypeAndPeriodStart(
        PeriodGoal.PeriodType.MONTH,
        LocalDate.of(2026, 11, 1)
      )
    ).thenReturn(Optional.empty());
    when(goals.save(any(PeriodGoal.class))).thenAnswer(inv ->
      inv.getArgument(0)
    );
    var created = controller.putGoal(
      new PlannerController.GoalInput(
        PeriodGoal.PeriodType.MONTH,
        LocalDate.of(2026, 11, 1),
        1800,
        300,
        20
      )
    );
    assertEquals(1800, created.targetMinutes);
    assertEquals(300, created.targetQuestions);
    verify(goals).save(any(PeriodGoal.class));
  }
}
