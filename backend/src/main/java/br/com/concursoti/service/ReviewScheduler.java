package br.com.concursoti.service;

import br.com.concursoti.model.ReviewTask;
import br.com.concursoti.model.Topic;
import br.com.concursoti.repo.ReviewTaskRepository;
import br.com.concursoti.repo.TopicRepository;
import jakarta.transaction.Transactional;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

/** Uma revisão ativa por assunto. Histórico concluído e revisões antigas canceladas são preservados. */
@Service
public class ReviewScheduler implements ApplicationRunner {
  private final ReviewTaskRepository reviews;
  private final TopicRepository topics;
  public ReviewScheduler(ReviewTaskRepository reviews, TopicRepository topics) {
    this.reviews=reviews; this.topics=topics;
  }
  public static int interval(int level) {
    return switch(level) { case 1 -> 2; case 2 -> 7; case 3 -> 14; case 4 -> 42;
      default -> throw new IllegalArgumentException("A assimilação deve estar entre 1 e 4."); };
  }
  public static boolean active(ReviewTask r) { return r.completedAt==null && r.cancelledAt==null; }

  /** Reprograma sem apagar o histórico. Executado na confirmação da teoria e em cada revisão. */
  @Transactional
  public ReviewTask schedule(Topic topic, int level, LocalDate base) {
    int days=interval(level);
    topic.reviewScheduleInitialized=true;
    topics.save(topic);
    if(base==null) throw new IllegalArgumentException("Data da revisão inválida.");
    var all=reviews.findAll().stream().filter(r->r.topic.id.equals(topic.id)).toList();
    for(var r:all) if(active(r)) { r.cancelledAt=LocalDate.now(); reviews.save(r); }
    LocalDate due=base.plusDays(days);
    // A restrição legada (assunto, intervalo, data) continua válida no PostgreSQL.
    // Reaproveitamos uma revisão cancelada com a mesma chave, se existir.
    while(true) {
      LocalDate candidate=due;
      var existing=all.stream().filter(r->r.intervalDays==days && r.dueDate.equals(candidate)).findFirst();
      if(existing.isEmpty()) break;
      var previous=existing.get();
      if(previous.completedAt==null) {
        previous.cancelledAt=null;
        previous.assimilationLevel=level;
        return reviews.save(previous);
      }
      due=due.plusDays(1);
    }
    ReviewTask task=new ReviewTask(topic,due,days);
    task.assimilationLevel=level;
    return reviews.save(task);
  }
  @Transactional
  public void pause(Topic topic) {
    for(var r:reviews.findAll()) if(r.topic.id.equals(topic.id) && active(r)) {
      r.cancelledAt=LocalDate.now(); reviews.save(r);
    }
  }
  @Transactional
  public ReviewTask assessTheory(Topic topic,int level) {
    interval(level);
    topic.assimilationLevel=level;
    if(!Boolean.TRUE.equals(topic.theoryDone)) {
      throw new IllegalArgumentException("Marque a teoria como estudada antes de agendar revisões.");
    }
    if(topic.theoryCompletedAt==null) topic.theoryCompletedAt=LocalDate.now();
    topics.save(topic);
    return schedule(topic,level,LocalDate.now());
  }
  @Transactional
  public ReviewTask complete(Long id, int level) {
    interval(level);
    ReviewTask review=reviews.findById(id).orElseThrow();
    if(review.cancelledAt!=null) throw new IllegalArgumentException("Esta revisão foi substituída por uma mais recente.");
    if(review.completedAt!=null) throw new IllegalArgumentException("Esta revisão já foi concluída.");
    review.completedAt=LocalDate.now();
    review.assimilationLevel=level;
    reviews.save(review);
    Topic topic=review.topic;
    topic.assimilationLevel=level;
    topics.save(topic);
    schedule(topic,level,review.completedAt);
    return review;
  }
  @Transactional
  public ReviewTask reopen(Long id) {
    ReviewTask review=reviews.findById(id).orElseThrow();
    if(review.completedAt==null) throw new IllegalArgumentException("A revisão ainda está pendente.");
    boolean laterCompleted=reviews.findAll().stream().anyMatch(r->r.topic.id.equals(review.topic.id)
        && r.completedAt!=null && r.id!=null && !r.id.equals(review.id)
        && (r.completedAt.isAfter(review.completedAt)
          || (r.completedAt.equals(review.completedAt) && r.id>review.id)));
    if(laterCompleted) throw new IllegalArgumentException("Há revisões mais recentes; não é possível reabrir esta revisão.");
    for(var r:reviews.findAll()) if(r.topic.id.equals(review.topic.id) && active(r)) {
      r.cancelledAt=LocalDate.now(); reviews.save(r);
    }
    review.completedAt=null;
    review.cancelledAt=null;
    review.topic.assimilationLevel=review.assimilationLevel==null?2:review.assimilationLevel;
    topics.save(review.topic);
    return reviews.save(review);
  }
  /** Migração conservadora e idempotente dos intervalos 1/7/30: nível padrão 2, revisável pelo usuário. */
  @Override @Transactional public void run(ApplicationArguments args) {
    var all=reviews.findAll();
    for(var topic:topics.findAll()) {
      if(!Boolean.TRUE.equals(topic.theoryDone) || Boolean.TRUE.equals(topic.reviewScheduleInitialized)) continue;
      List<ReviewTask> own=all.stream().filter(r->r.topic.id.equals(topic.id)).toList();
      // O histórico concluído não é alterado; somente uma próxima revisão continua ativa.
      boolean hasNewActive=own.stream().anyMatch(r->active(r) && r.assimilationLevel!=null);
      if(hasNewActive) {topic.reviewScheduleInitialized=true; topics.save(topic); continue;}
      int level=topic.assimilationLevel==null?2:topic.assimilationLevel;
      if(level<1||level>4)level=2;
      LocalDate studied=topic.theoryCompletedAt==null?LocalDate.now():topic.theoryCompletedAt;
      LocalDate last=own.stream().filter(r->r.completedAt!=null).map(r->r.completedAt)
          .max(Comparator.naturalOrder()).orElse(studied);
      if(last.isBefore(studied))last=studied;
      topic.assimilationLevel=level;
      topics.save(topic);
      schedule(topic,level,last);
    }
  }
}
