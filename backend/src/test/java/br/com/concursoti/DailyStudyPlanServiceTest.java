package br.com.concursoti;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import br.com.concursoti.curriculum.entities.Discipline;
import br.com.concursoti.curriculum.repositories.DisciplineRepository;
import br.com.concursoti.planning.entities.DailyStudyPlan;
import br.com.concursoti.planning.repositories.DailyStudyPlanRepository;
import br.com.concursoti.planning.services.DailyStudyPlanService;
import java.time.LocalDate;
import java.util.*;
import org.junit.jupiter.api.Test;

class DailyStudyPlanServiceTest {

  private final DailyStudyPlanRepository plans = mock(
    DailyStudyPlanRepository.class
  );
  private final DisciplineRepository disciplines = mock(
    DisciplineRepository.class
  );
  private final DailyStudyPlanService service = new DailyStudyPlanService(
    plans,
    disciplines
  );
  private final LocalDate date = LocalDate.of(2026, 11, 19);

  @Test
  void savesTwoDisciplinesInOrderAndAllowsClearingTheDay() {
    Discipline first = new Discipline("Java", "#123456", 0);
    Discipline second = new Discipline("Redes", "#123456", 1);
    when(disciplines.findById(1L)).thenReturn(Optional.of(first));
    when(disciplines.findById(2L)).thenReturn(Optional.of(second));
    when(plans.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
    var result = service.save(
      date,
      new DailyStudyPlanService.PlanInput(List.of(2L, 1L))
    );
    assertEquals(List.of(second, first), result.disciplines());
    assertEquals(date, result.studyDate());
    assertTrue(
      service
        .save(date, new DailyStudyPlanService.PlanInput(List.of()))
        .disciplines()
        .isEmpty()
    );
    verify(plans).deleteById(date);
  }

  @Test
  void rejectsMoreThanTwoDuplicatesAndUnknownDisciplines() {
    for (List<Long> ids : List.of(
      List.of(1L, 2L, 3L),
      List.of(1L, 1L),
      List.of(42L)
    )) {
      assertThrows(IllegalArgumentException.class, () ->
        service.save(date, new DailyStudyPlanService.PlanInput(ids))
      );
    }
    verify(plans, never()).save(any());
  }
}
