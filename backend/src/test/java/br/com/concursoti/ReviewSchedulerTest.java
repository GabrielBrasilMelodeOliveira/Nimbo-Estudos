package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import br.com.concursoti.curriculum.entities.Topic;
import br.com.concursoti.curriculum.repositories.TopicRepository;
import br.com.concursoti.reviews.entities.ReviewTask;
import br.com.concursoti.reviews.repositories.ReviewTaskRepository;
import br.com.concursoti.reviews.services.ReviewScheduler;
import java.time.LocalDate;
import java.util.*;
import org.junit.jupiter.api.Test;

class ReviewSchedulerTest {

  @Test
  void intervalosSao48h7d14d42d() {
    assertEquals(2, ReviewScheduler.interval(1));
    assertEquals(7, ReviewScheduler.interval(2));
    assertEquals(14, ReviewScheduler.interval(3));
    assertEquals(42, ReviewScheduler.interval(4));
    assertThrows(IllegalArgumentException.class, () ->
      ReviewScheduler.interval(5)
    );
  }

  @Test
  void agendarUmaUnicaRevisaoNaoApagaHistorico() {
    var reviews = mock(ReviewTaskRepository.class);
    var topics = mock(TopicRepository.class);
    var scheduler = new ReviewScheduler(reviews, topics);
    var topic = new Topic();
    topic.id = 5L;
    var old = new ReviewTask(topic, LocalDate.of(2026, 11, 17), 1);
    old.id = 10L;
    var history = new ReviewTask(topic, LocalDate.of(2026, 11, 1), 7);
    history.id = 11L;
    history.completedAt = LocalDate.of(2026, 11, 2);
    when(reviews.findAll()).thenReturn(List.of(old, history));
    when(reviews.save(any())).thenAnswer(inv -> inv.getArgument(0));
    var next = scheduler.schedule(topic, 3, LocalDate.of(2026, 11, 16));
    assertEquals(LocalDate.of(2026, 11, 30), next.dueDate);
    assertEquals(LocalDate.of(2026, 11, 2), history.completedAt);
    assertNotNull(old.cancelledAt);
    assertEquals(14, next.intervalDays);
  }

  @Test
  void concluirCriaNovaRevisaoEGuardaNivel() {
    var reviews = mock(ReviewTaskRepository.class);
    var topics = mock(TopicRepository.class);
    var scheduler = new ReviewScheduler(reviews, topics);
    var topic = new Topic();
    topic.id = 5L;
    topic.theoryDone = true;
    var old = new ReviewTask(topic, LocalDate.now(), 7);
    old.id = 10L;
    when(reviews.findById(10L)).thenReturn(Optional.of(old));
    when(reviews.findAll()).thenReturn(List.of(old));
    when(reviews.save(any())).thenAnswer(inv -> inv.getArgument(0));
    var done = scheduler.complete(10L, 4);
    assertEquals(4, topic.assimilationLevel);
    assertEquals(LocalDate.now(), done.completedAt);
    verify(reviews, atLeast(2)).save(any(ReviewTask.class));
  }

  @Test
  void revisoesLegadasSaoCanceladasMasOHistoricoPermanece() {
    var repo = mock(ReviewTaskRepository.class);
    var topics = mock(TopicRepository.class);
    var scheduler = new ReviewScheduler(repo, topics);
    var topic = new Topic();
    topic.id = 3L;
    topic.theoryDone = true;
    topic.theoryCompletedAt = LocalDate.of(2026, 11, 16);
    var a = new ReviewTask(topic, LocalDate.of(2026, 11, 17), 1);
    a.id = 1L;
    var b = new ReviewTask(topic, LocalDate.of(2026, 11, 23), 7);
    b.id = 2L;
    var c = new ReviewTask(topic, LocalDate.of(2026, 12, 16), 30);
    c.id = 3L;
    var historic = new ReviewTask(topic, LocalDate.of(2026, 11, 1), 1);
    historic.id = 4L;
    historic.completedAt = LocalDate.of(2026, 11, 2);
    when(repo.findAll()).thenReturn(List.of(a, b, c, historic));
    when(topics.findAll()).thenReturn(List.of(topic));
    when(repo.save(any())).thenAnswer(inv -> inv.getArgument(0));
    scheduler.run(null);
    assertEquals(2, topic.assimilationLevel);
    assertTrue(topic.reviewScheduleInitialized);
    assertNotNull(a.cancelledAt);
    assertNull(b.cancelledAt);
    assertNotNull(c.cancelledAt);
    assertNotNull(historic.completedAt);
    scheduler.run(null);
    assertNull(b.cancelledAt); // segunda inicialização não reabre revisões extras
  }
}
