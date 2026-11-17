package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import br.com.concursoti.curriculum.entities.Discipline;
import br.com.concursoti.curriculum.entities.Topic;
import br.com.concursoti.curriculum.repositories.TopicRepository;
import br.com.concursoti.planning.controllers.PlannerController;
import br.com.concursoti.planning.entities.AgendaItem;
import br.com.concursoti.planning.repositories.AgendaItemRepository;
import br.com.concursoti.planning.repositories.PeriodGoalRepository;
import br.com.concursoti.studying.entities.StudySession;
import java.time.LocalDate;
import java.util.*;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

class AgendaActionsTest {

  @Test
  void completesAndReopensLinkedStudyWithoutCreatingStudyTime() {
    AgendaItemRepository repository = mock(AgendaItemRepository.class);
    var controller = new PlannerController(
      repository,
      mock(TopicRepository.class),
      mock(PeriodGoalRepository.class)
    );
    AgendaItem item = new AgendaItem();
    item.id = 1L;
    item.topic = new Topic();
    when(repository.findById(1L)).thenReturn(Optional.of(item));
    controller.complete(1L, new PlannerController.CompletionInput(true, 0L));
    assertTrue(item.completed);
    assertTrue(item.completionOverride);
    controller.complete(1L, new PlannerController.CompletionInput(false, 0L));
    assertFalse(item.completed);
    assertFalse(item.completionOverride);
  }

  @Test
  void movesLinkedStudyAndKeepsItsTargets() {
    AgendaItemRepository repository = mock(AgendaItemRepository.class);
    TopicRepository topics = mock(TopicRepository.class);
    var controller = new PlannerController(
      repository,
      topics,
      mock(PeriodGoalRepository.class)
    );
    Topic topic = new Topic(new Discipline("Java", "#123456", 0), "Spring");
    topic.id = 7L;
    AgendaItem item = new AgendaItem();
    item.id = 1L;
    item.title = "Estudar Spring";
    item.category = AgendaItem.Category.STUDY;
    item.topic = topic;
    item.studyKind = StudySession.Kind.QUESTIONS;
    item.targetQuestions = 20;
    item.scheduledDate = LocalDate.of(2026, 11, 16);
    when(repository.findById(1L)).thenReturn(Optional.of(item));
    when(topics.findLockedById(7L)).thenReturn(Optional.of(topic));
    when(repository.findAll()).thenReturn(List.of(item));
    controller.move(
      1L,
      new PlannerController.MoveInput(LocalDate.of(2026, 11, 18), 0L)
    );
    assertEquals(LocalDate.of(2026, 11, 18), item.scheduledDate);
    assertEquals(topic, item.topic);
    assertEquals(20, item.targetQuestions);
    assertThrows(ResponseStatusException.class, () ->
      controller.move(
        1L,
        new PlannerController.MoveInput(LocalDate.of(2026, 11, 19), 99L)
      )
    );
    verify(repository, times(1)).save(item);
  }
}
