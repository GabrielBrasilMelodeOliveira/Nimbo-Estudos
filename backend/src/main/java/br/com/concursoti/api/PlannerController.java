package br.com.concursoti.api;
import br.com.concursoti.model.AgendaItem;
import br.com.concursoti.model.PeriodGoal;
import br.com.concursoti.model.StudySession;
import br.com.concursoti.model.Topic;
import br.com.concursoti.repo.PeriodGoalRepository;
import br.com.concursoti.repo.TopicRepository;
import br.com.concursoti.repo.AgendaItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import java.time.*;
import java.util.*;

@RestController @RequestMapping("/api/agenda")
public class PlannerController {
  private final AgendaItemRepository repo;
  private final TopicRepository topics;
  private final PeriodGoalRepository goals;
  public PlannerController(AgendaItemRepository repo,TopicRepository topics,PeriodGoalRepository goals){this.repo=repo;this.topics=topics;this.goals=goals;}
  public record AgendaInput(String title,AgendaItem.Category category,LocalDate scheduledDate,LocalTime startTime,Integer durationMinutes,Integer priority,Boolean repeatWeekly,String notes,Long topicId,StudySession.Kind studyKind,Integer targetQuestions){}
  @GetMapping public List<AgendaItem> list(){return repo.findAll(Sort.by("scheduledDate","startTime","id"));}
  private AgendaItem fill(AgendaItem item,AgendaInput in){
    if(in.title()==null||in.title().isBlank()||in.title().trim().length()>180)throw new IllegalArgumentException("Informe uma atividade de até 180 caracteres.");
    if(in.scheduledDate()==null)throw new IllegalArgumentException("Informe o dia da atividade.");
    if(in.durationMinutes()==null||in.durationMinutes()<0||in.durationMinutes()>1440)throw new IllegalArgumentException("A duração deve estar entre 0 e 1440 minutos.");
    if(in.priority()==null||in.priority()<1||in.priority()>3)throw new IllegalArgumentException("A prioridade deve ser 1, 2 ou 3.");
    if(in.notes()!=null&&in.notes().length()>1200)throw new IllegalArgumentException("Notas limitadas a 1200 caracteres.");
    item.title=in.title().trim();item.category=in.category()==null?AgendaItem.Category.PERSONAL:in.category();
    item.scheduledDate=in.scheduledDate();item.startTime=in.startTime();item.durationMinutes=in.durationMinutes();item.priority=in.priority();
    item.repeatWeekly=Boolean.TRUE.equals(in.repeatWeekly());item.notes=in.notes()==null?"":in.notes();
    if(item.category==AgendaItem.Category.STUDY && in.topicId()!=null) {
      Topic t=topics.findById(in.topicId()).orElseThrow(()->new IllegalArgumentException("Assunto não encontrado."));
      item.topic=t;
      item.studyKind=in.studyKind()==null?StudySession.Kind.THEORY:in.studyKind();
      if(in.targetQuestions()!=null && (in.targetQuestions()<0 || in.targetQuestions()>3000))throw new IllegalArgumentException("Meta de questões inválida.");
      item.targetQuestions=item.studyKind==StudySession.Kind.QUESTIONS?(in.targetQuestions()==null?0:in.targetQuestions()):0;
      if(item.repeatWeekly)throw new IllegalArgumentException("Blocos de estudo vinculados não devem se repetir automaticamente. Use as sugestões semanais.");
      // Impede que duas atividades contem o mesmo resultado de um assunto/tipo/dia.
      boolean duplicate=repo.findAll().stream().anyMatch(other->!Objects.equals(other.id,item.id)
        && other.topic!=null && Objects.equals(other.topic.id,t.id)
        && item.scheduledDate.equals(other.scheduledDate) && other.studyKind==item.studyKind);
      if(duplicate)throw new IllegalArgumentException("Este assunto e tipo de estudo já estão planejados para o dia.");
    } else {item.topic=null;item.studyKind=null;item.targetQuestions=null;}
    return item;
  }
  @PostMapping public AgendaItem add(@RequestBody AgendaInput input){return repo.save(fill(new AgendaItem(),input));}
  @PutMapping("/{id}") public AgendaItem change(@PathVariable Long id,@RequestBody AgendaInput input){return repo.save(fill(repo.findById(id).orElseThrow(),input));}
  @PatchMapping("/{id}/toggle") @Transactional public AgendaItem toggle(@PathVariable Long id){
    AgendaItem item=repo.findById(id).orElseThrow();
    if(item.topic!=null)throw new IllegalArgumentException("Estudos vinculados são concluídos pelo cronômetro e registro de questões.");
    item.completed=!item.completed;
    repo.save(item);
    if(item.completed&&Boolean.TRUE.equals(item.repeatWeekly)){
      LocalDate next=item.scheduledDate.plusWeeks(1);
      while(next.isBefore(LocalDate.now()))next=next.plusWeeks(1);
      final LocalDate finalNext=next;
      boolean exists=repo.findAll().stream().anyMatch(x->!x.id.equals(item.id)&&x.repeatWeekly&&x.title.equals(item.title)&&x.category==item.category&&x.scheduledDate.equals(finalNext));
      if(!exists){AgendaItem copy=new AgendaItem();copy.title=item.title;copy.category=item.category;copy.scheduledDate=finalNext;copy.startTime=item.startTime;copy.durationMinutes=item.durationMinutes;copy.priority=item.priority;copy.repeatWeekly=true;copy.notes=item.notes;repo.save(copy);}
    }
    return item;
  }
  @GetMapping("/goals") public List<PeriodGoal> goals(){return goals.findAll(Sort.by("periodStart","periodType"));}
  public record GoalInput(PeriodGoal.PeriodType periodType,LocalDate periodStart,Integer targetMinutes,Integer targetQuestions,Integer targetTopics){}
  @PutMapping("/goals") @Transactional public PeriodGoal putGoal(@RequestBody GoalInput in) {
    if(in==null || in.periodType()==null || in.periodStart()==null)throw new IllegalArgumentException("Informe o período da meta.");
    if(in.periodType()==PeriodGoal.PeriodType.WEEK && in.periodStart().getDayOfWeek()!=DayOfWeek.MONDAY)
      throw new IllegalArgumentException("Uma meta semanal deve começar na segunda-feira.");
    if(in.periodType()==PeriodGoal.PeriodType.MONTH && in.periodStart().getDayOfMonth()!=1)
      throw new IllegalArgumentException("Uma meta mensal deve começar no primeiro dia do mês.");
    if(in.targetMinutes()==null||in.targetMinutes()<0||in.targetMinutes()>44640
        ||in.targetQuestions()==null||in.targetQuestions()<0||in.targetQuestions()>100000
        ||in.targetTopics()==null||in.targetTopics()<0||in.targetTopics()>10000)
      throw new IllegalArgumentException("Confira as metas informadas.");
    PeriodGoal goal=goals.findByPeriodTypeAndPeriodStart(in.periodType(),in.periodStart()).orElseGet(PeriodGoal::new);
    goal.periodType=in.periodType();goal.periodStart=in.periodStart();goal.targetMinutes=in.targetMinutes();
    goal.targetQuestions=in.targetQuestions();goal.targetTopics=in.targetTopics();
    return goals.save(goal);
  }
  @DeleteMapping("/{id}") public void remove(@PathVariable Long id){repo.deleteById(id);}
}
