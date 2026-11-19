package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import br.com.concursoti.curriculum.entities.Topic;
import br.com.concursoti.planning.entities.AgendaItem;
import br.com.concursoti.planning.repositories.AgendaItemRepository;
import br.com.concursoti.planning.services.AgendaRescheduleService;
import br.com.concursoti.questions.repositories.QuestionRecordRepository;
import br.com.concursoti.studying.entities.StudySession;
import br.com.concursoti.studying.repositories.StudySessionRepository;
import java.time.*;
import java.util.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

class AgendaRescheduleServiceTest {

  final LocalDate today = LocalDate.of(2026, 11, 19);
  AgendaItemRepository repository;
  StudySessionRepository sessions;
  AgendaRescheduleService service;
  AgendaItem first;
  AgendaItem second;

  @BeforeEach
  void setup() {
    repository = mock(AgendaItemRepository.class);
    sessions = mock(StudySessionRepository.class);
    service = new AgendaRescheduleService(
      repository,
      sessions,
      mock(QuestionRecordRepository.class),
      Clock.fixed(
        Instant.parse("2026-11-19T13:00:00Z"),
        ZoneId.of("America/Fortaleza")
      )
    );
    first = activity(1L);
    second = activity(2L);
    when(repository.findLockedById(1L)).thenReturn(Optional.of(first));
    when(repository.findLockedById(2L)).thenReturn(Optional.of(second));
    when(repository.findAll()).thenReturn(List.of(first, second));
  }

  AgendaItem activity(Long id) {
    AgendaItem item = new AgendaItem();
    item.id = id;
    item.scheduledDate = today;
    item.startTime = LocalTime.of(16, 30);
    item.title = "Atividade " + id;
    item.version = 2;
    return item;
  }

  AgendaRescheduleService.RescheduleInput input(long secondVersion) {
    return new AgendaRescheduleService.RescheduleInput(
      today.plusDays(1),
      List.of(
        new AgendaRescheduleService.ActivityInput(1L, 2L),
        new AgendaRescheduleService.ActivityInput(2L, secondVersion)
      )
    );
  }

  @Test
  void movesSelectionTogetherAndPreservesDetails() {
    service.reschedule(input(2));
    assertEquals(today.plusDays(1), first.scheduledDate);
    assertEquals(first.scheduledDate, second.scheduledDate);
    assertEquals(LocalTime.of(16, 30), first.startTime);
    assertEquals("Atividade 1", first.title);
    verify(repository).saveAll(List.of(first, second));
  }

  @Test
  void staleSecondItemDoesNotPartiallyMoveFirst() {
    assertThrows(ResponseStatusException.class, () ->
      service.reschedule(input(1))
    );
    assertEquals(today, first.scheduledDate);
    verify(repository, never()).saveAll(any());
  }

  @Test
  void rejectsCompletedActivitiesIncludingAutomaticCompletion() {
    first.category = AgendaItem.Category.STUDY;
    first.topic = new Topic();
    first.topic.id = 7L;
    first.studyKind = StudySession.Kind.THEORY;
    first.durationMinutes = 30;
    StudySession session = new StudySession();
    session.topic = first.topic;
    session.durationSeconds = 1800L;
    when(sessions.findByStudyDateBetween(today, today)).thenReturn(
      List.of(session)
    );
    assertThrows(ResponseStatusException.class, () ->
      service.reschedule(input(2))
    );
    assertEquals(today, first.scheduledDate);
  }

  @Test
  void rejectsDuplicateLinkedStudiesAtDestinationBeforeMutating() {
    first.category = second.category = AgendaItem.Category.STUDY;
    first.topic = second.topic = new Topic();
    first.topic.id = 8L;
    first.studyKind = second.studyKind = StudySession.Kind.THEORY;
    assertThrows(ResponseStatusException.class, () ->
      service.reschedule(input(2))
    );
    assertEquals(today, first.scheduledDate);
    assertEquals(today, second.scheduledDate);
  }
}
