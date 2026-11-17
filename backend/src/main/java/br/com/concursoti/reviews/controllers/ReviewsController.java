package br.com.concursoti.reviews.controllers;

import br.com.concursoti.reviews.entities.ReviewTask;
import br.com.concursoti.reviews.services.ReviewsService;
import br.com.concursoti.reviews.services.ReviewsService.*;
import jakarta.transaction.Transactional;
import java.util.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ReviewsController {

  private final ReviewsService service;

  public ReviewsController(ReviewsService service) {
    this.service = service;
  }

  @GetMapping("/reviews")
  public List<ReviewTask> reviews() {
    return service.reviews();
  }

  @PatchMapping("/reviews/{id}/complete")
  @Transactional
  public ReviewTask completeReview(
    @PathVariable Long id,
    @RequestBody AssimilationInput request
  ) {
    return service.completeReview(id, request);
  }

  @PatchMapping("/reviews/{id}/reopen")
  @Transactional
  public ReviewTask reopenReview(@PathVariable Long id) {
    return service.reopenReview(id);
  }
}
