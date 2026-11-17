package br.com.concursoti.reviews.services;

import br.com.concursoti.companions.services.PetService;
import br.com.concursoti.reviews.entities.ReviewTask;
import br.com.concursoti.reviews.repositories.ReviewTaskRepository;
import br.com.concursoti.reviews.services.ReviewScheduler;
import jakarta.transaction.Transactional;
import java.util.*;
import org.springframework.data.domain.Sort;

@org.springframework.stereotype.Service
public class ReviewsService {

  private final ReviewTaskRepository reviews;
  private final PetService pet;
  private final ReviewScheduler reviewScheduler;

  public ReviewsService(
    ReviewTaskRepository reviews,
    PetService pet,
    ReviewScheduler reviewScheduler
  ) {
    this.reviews = reviews;
    this.pet = pet;
    this.reviewScheduler = reviewScheduler;
  }

  private int rank4(Integer value) {
    if (
      value == null || value < 1 || value > 4
    ) throw new IllegalArgumentException("Assimilação entre 1 e 4.");
    return value;
  }

  public record AssimilationInput(Integer level) {}

  public List<ReviewTask> reviews() {
    return reviews.findAll(Sort.by("dueDate", "id"));
  }

  @Transactional
  public ReviewTask completeReview(Long id, AssimilationInput request) {
    if (request == null) throw new IllegalArgumentException(
      "Escolha o nível de assimilação."
    );
    ReviewTask task = reviewScheduler.complete(id, rank4(request.level()));
    pet.progress(15, 5);
    return task;
  }

  @Transactional
  public ReviewTask reopenReview(Long id) {
    return reviewScheduler.reopen(id);
  }
}
