package br.com.concursoti.api;

import br.com.concursoti.model.*;
import br.com.concursoti.repo.*;
import br.com.concursoti.service.PetService;
import br.com.concursoti.service.AssetService;
import br.com.concursoti.service.DocumentService;
import br.com.concursoti.service.ReviewScheduler;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api")
public class ApiController {
  private final DisciplineRepository disciplines;
  private final TopicRepository topics;
  private final QuestionRecordRepository questions;
  private final StudySessionRepository sessions;
  private final ReviewTaskRepository reviews;
  private final MockExamRepository exams;
  private final MaterialRepository materials;
  private final ErrorNoteRepository errors;
  private final StudyPlanRepository plans;
  private final PetService pet;
  private final AssetService assets;
  private final DocumentService documents;
  private final ReviewScheduler reviewScheduler;
  private final AgendaItemRepository agenda;

  public ApiController(DisciplineRepository disciplines, TopicRepository topics, QuestionRecordRepository questions,
                       StudySessionRepository sessions, ReviewTaskRepository reviews, MockExamRepository exams,
                       MaterialRepository materials, ErrorNoteRepository errors, StudyPlanRepository plans, PetService pet, AssetService assets, DocumentService documents, ReviewScheduler reviewScheduler, AgendaItemRepository agenda) {
    this.disciplines=disciplines; this.topics=topics; this.questions=questions; this.sessions=sessions;
    this.reviews=reviews; this.exams=exams; this.materials=materials; this.errors=errors; this.plans=plans; this.pet=pet; this.assets=assets; this.documents=documents; this.reviewScheduler=reviewScheduler; this.agenda=agenda;
  }
  private String required(String value, String field, int max) {
    if (value==null || value.isBlank()) throw new IllegalArgumentException("Preencha o campo: " + field);
    if (value.trim().length()>max) throw new IllegalArgumentException(field + " excede " + max + " caracteres.");
    return value.trim();
  }
  private void countPair(Integer total, Integer correct) {
    if (total==null || total<=0 || correct==null || correct<0 || correct>total)
      throw new IllegalArgumentException("Total deve ser positivo e acertos devem estar entre 0 e o total.");
  }
  private LocalDate dateOrToday(LocalDate date) { return date == null ? LocalDate.now() : date; }
  private Topic topic(Long id) { if(id==null) throw new IllegalArgumentException("Informe um assunto."); return topics.findById(id).orElseThrow(); }
  private Discipline discipline(Long id) { if(id==null) throw new IllegalArgumentException("Informe uma disciplina."); return disciplines.findById(id).orElseThrow(); }

  public record PetSelection(String species) {}
  public record PetInteraction(String action) {}
  @PostMapping("/pet/interact") public Map<String,Object> interactPet(@RequestBody PetInteraction request){return pet.interact(request.action());}
  @GetMapping("/pet") public Map<String,Object> getPet(){return pet.current();}
  @PostMapping("/pet") public Map<String,Object> choosePet(@RequestBody PetSelection selection){return pet.choose(selection.species());}
  @PutMapping("/pet/active/{id}") public Map<String,Object> activatePet(@PathVariable Long id){return pet.activate(id);}

  @GetMapping("/health") public Map<String,String> health() { return Map.of("status","ok"); }

  @GetMapping("/disciplines") public List<Discipline> disciplines() { return disciplines.findAll(Sort.by("position","id")); }
  public record DisciplineInput(String name, String color) {}
  @PostMapping("/disciplines") public Discipline addDiscipline(@RequestBody DisciplineInput in) {
    String color = in.color()==null || !in.color().matches("^#[0-9a-fA-F]{6}$") ? "#2563eb" : in.color();
    return disciplines.save(new Discipline(required(in.name(),"Nome",120),color,(int)disciplines.count()));
  }

  public record DisciplineTuning(Integer importance,Integer examWeight,Integer confidence) {}
  private int rank(Integer value,String name){if(value==null||value<1||value>5)throw new IllegalArgumentException(name+" deve ser entre 1 e 5.");return value;}
  @PatchMapping("/disciplines/{id}/priority") public Discipline tuneDiscipline(@PathVariable Long id,@RequestBody DisciplineTuning in){
    Discipline d=discipline(id);d.importance=rank(in.importance(),"Importância");d.examWeight=rank(in.examWeight(),"Peso na prova");d.confidence=rank(in.confidence(),"Entendimento");return disciplines.save(d);
  }
  @PutMapping("/disciplines/reorder") public List<Discipline> reorderDisciplines(@RequestBody List<Long> order) {
    List<Discipline> all=disciplines.findAll();
    if(order==null || order.size()!=all.size() || !new HashSet<>(order).equals(all.stream().map(d->d.id).collect(java.util.stream.Collectors.toSet())))
      throw new IllegalArgumentException("A ordem deve conter todas as disciplinas, sem repetição.");
    Map<Long,Discipline> byId=new HashMap<>(); for(Discipline d:all) byId.put(d.id,d);
    for(int i=0;i<order.size();i++) byId.get(order.get(i)).position=i;
    disciplines.saveAll(all);
    return disciplines.findAll(Sort.by("position","id"));
  }

  @GetMapping("/topics") public List<Topic> topics() { return topics.findAll(Sort.by("id")); }
  public record TopicInput(Long disciplineId,String title,Topic.Status status,Boolean theoryDone,Boolean summaryDone,Topic.Mastery mastery,Integer importance,Integer assimilationLevel) {}
  private void applyTopic(Topic t, TopicInput in) {
    t.discipline=discipline(in.disciplineId()); t.title=required(in.title(),"Assunto",200);
    t.status=in.status()==null ? Topic.Status.NOT_STARTED : in.status();
    t.theoryDone=Boolean.TRUE.equals(in.theoryDone());
    t.summaryDone=Boolean.TRUE.equals(in.summaryDone());
    t.mastery=in.mastery()==null ? Topic.Mastery.WEAK : in.mastery();
    t.importance=in.importance()==null?3:rank(in.importance(),"Prioridade do assunto");
    if(in.assimilationLevel()!=null) t.assimilationLevel=rank4(in.assimilationLevel());
  }
  private int rank4(Integer value) { if(value==null||value<1||value>4) throw new IllegalArgumentException("Assimilação entre 1 e 4."); return value; }
  @PostMapping("/topics") public Topic addTopic(@RequestBody TopicInput in) {
    Topic t=new Topic(); applyTopic(t,in); t=topics.save(t); if(t.theoryDone) scheduleReviews(t); return t;
  }
  @Transactional
  @PutMapping("/topics/{id}") public Topic updateTopic(@PathVariable Long id,@RequestBody TopicInput in) {
    Topic t=topic(id); boolean wasDone=Boolean.TRUE.equals(t.theoryDone); Integer oldAssimilation=t.assimilationLevel;
    applyTopic(t,in);
    if(wasDone && !t.theoryDone) reviewScheduler.pause(t);
    if(!wasDone && t.theoryDone) scheduleReviews(t);
    else if(wasDone && t.theoryDone && in.assimilationLevel()!=null && !Objects.equals(oldAssimilation,in.assimilationLevel())) reviewScheduler.assessTheory(t,in.assimilationLevel());
    return topics.save(t);
  }
  private void scheduleReviews(Topic t) {
    LocalDate today=LocalDate.now();
    t.theoryCompletedAt=today; topics.save(t);
    reviewScheduler.assessTheory(t,t.assimilationLevel==null?2:t.assimilationLevel);
  }
  public record AssimilationInput(Integer level) {}
  @PostMapping("/topics/{id}/assimilate") @Transactional
  public ReviewTask assessTopic(@PathVariable Long id,@RequestBody AssimilationInput in) {
    if(in==null)throw new IllegalArgumentException("Escolha o nível de assimilação.");
    return reviewScheduler.assessTheory(topic(id),rank4(in.level()));
  }
  @DeleteMapping("/topics/{id}") @Transactional public void deleteTopic(@PathVariable Long id) {
    Topic target=topic(id);
    for(AgendaItem item:agenda.findAll()) if(item.topic!=null && item.topic.id.equals(id)) {
      item.topic=null;item.studyKind=null;item.targetQuestions=null;agenda.save(item);
    }
    for(Material m:materials.findAll()) if(m.topic!=null && m.topic.id.equals(id)) {m.topic=null;materials.save(m);}
    errors.deleteAll(errors.findAll().stream().filter(e->e.topic!=null && e.topic.id.equals(id)).toList());
    reviews.deleteAll(reviews.findAll().stream().filter(r->r.topic.id.equals(id)).toList());
    questions.deleteAll(questions.findAll().stream().filter(q->q.topic.id.equals(id)).toList());
    sessions.deleteAll(sessions.findAll().stream().filter(r->r.topic!=null && r.topic.id.equals(id)).toList());
    topics.delete(target);
  }

  @GetMapping("/questions") public List<QuestionRecord> questions() { return questions.findAll(Sort.by(Sort.Direction.DESC,"date","id")); }
  public record QuestionInput(Long topicId,Integer total,Integer correct,LocalDate date,String notes,Long durationSeconds) {}
  @PostMapping("/questions") @Transactional public QuestionRecord addQuestions(@RequestBody QuestionInput in) {
    countPair(in.total(),in.correct());
    long duration=in.durationSeconds()==null ? 0 : in.durationSeconds();
    if(duration<0 || duration>86400) throw new IllegalArgumentException("O tempo deve estar entre zero e 24 horas.");
    Topic selected=topic(in.topicId());
    QuestionRecord q=new QuestionRecord();
    q.topic=selected; q.total=in.total(); q.correct=in.correct(); q.date=dateOrToday(in.date());
    q.notes=in.notes()==null?"":in.notes().trim();
    q.focusDurationSeconds=duration>0?duration:null;
    QuestionRecord saved=questions.save(q);
    if(duration>0){
      StudySession focus=new StudySession();focus.topic=selected;focus.discipline=selected.discipline;
      focus.kind=StudySession.Kind.QUESTIONS;focus.durationSeconds=duration;focus.studyDate=q.date;
      sessions.save(focus);
      pet.progress((int)Math.min(120,duration/60), (int)Math.min(30,duration/300));
    }
    pet.progress(Math.min(120,in.correct()*3), Math.min(30,in.correct())-Math.min(35,(in.total()-in.correct())*3));
    return saved;
  }
  @DeleteMapping("/questions/{id}") public void deleteQuestions(@PathVariable Long id) { questions.delete(questions.findById(id).orElseThrow()); }

  @GetMapping("/study-sessions") public List<StudySession> sessions() { return sessions.findAll(Sort.by(Sort.Direction.DESC,"studyDate","createdAt")); }
  public record SessionInput(Long disciplineId,Long topicId,Long durationSeconds,LocalDate studyDate,StudySession.Kind kind) {}
  @PostMapping("/study-sessions") public StudySession addSession(@RequestBody SessionInput in) {
    if(in.durationSeconds()==null || in.durationSeconds()<=0 || in.durationSeconds()>86400) throw new IllegalArgumentException("A sessão deve durar entre 1 segundo e 24 horas.");
    StudySession s=new StudySession(); s.discipline=discipline(in.disciplineId());
    if(in.topicId()!=null) { s.topic=topic(in.topicId()); if(!s.topic.discipline.id.equals(s.discipline.id)) throw new IllegalArgumentException("O assunto não pertence à disciplina."); }
    s.kind=in.kind()==null?StudySession.Kind.THEORY:in.kind();
    if(s.kind==StudySession.Kind.QUESTIONS && s.topic==null) throw new IllegalArgumentException("Selecione um assunto para o treino de questões.");
    s.durationSeconds=in.durationSeconds(); s.studyDate=dateOrToday(in.studyDate()); StudySession saved=sessions.save(s);
    pet.progress((int)Math.min(120,s.durationSeconds/60), (int)Math.min(30,s.durationSeconds/300)); return saved;
  }
  @DeleteMapping("/study-sessions/{id}") public void deleteSession(@PathVariable Long id) { sessions.delete(sessions.findById(id).orElseThrow()); }

  @GetMapping("/reviews") public List<ReviewTask> reviews() { return reviews.findAll(Sort.by("dueDate","id")); }
  @PatchMapping("/reviews/{id}/complete") @Transactional
  public ReviewTask completeReview(@PathVariable Long id,@RequestBody AssimilationInput in) {
    if(in==null)throw new IllegalArgumentException("Escolha o nível de assimilação.");
    ReviewTask task=reviewScheduler.complete(id,rank4(in.level()));
    pet.progress(15,5);
    return task;
  }
  @PatchMapping("/reviews/{id}/reopen") @Transactional
  public ReviewTask reopenReview(@PathVariable Long id) {return reviewScheduler.reopen(id);}

  @GetMapping("/mock-exams") public List<MockExam> mockExams() { return exams.findAll(Sort.by(Sort.Direction.DESC,"date","id")); }
  public record ExamInput(String title,LocalDate date,Integer total,Integer correct,Double cutoffPercentage,String notes) {}
  @PostMapping("/mock-exams") public MockExam addExam(@RequestBody ExamInput in) {
    countPair(in.total(),in.correct());
    if(in.cutoffPercentage()==null || in.cutoffPercentage()<0 || in.cutoffPercentage()>100) throw new IllegalArgumentException("Nota de corte deve estar entre 0 e 100%.");
    MockExam m=new MockExam(); m.title=required(in.title(),"Nome do simulado",160); m.date=dateOrToday(in.date());
    m.total=in.total(); m.correct=in.correct(); m.cutoffPercentage=in.cutoffPercentage(); m.notes=in.notes(); MockExam saved=exams.save(m);
    pet.progress(Math.min(150,in.correct()*2), Math.min(25,in.correct()/2)-Math.min(30,in.total()-in.correct())); return saved;
  }
  @DeleteMapping("/mock-exams/{id}") public void deleteExam(@PathVariable Long id) { exams.delete(exams.findById(id).orElseThrow()); }

  @GetMapping("/materials") public List<Material> materials() { return materials.findAll(Sort.by("title")); }
  public record MaterialInput(String title,String url,Material.Type type,Long topicId,String description,String assetId,String previewAssetId) {}
  public record MaterialStatus(Boolean readDone,Boolean reviewed,Topic.Mastery mastery,String notes) {}
  public record DocumentEdit(String content) {}
  @PostMapping("/materials") public Material addMaterial(@RequestBody MaterialInput in) {
    Material m=new Material();m.title=required(in.title(),"Título",140);
    if(in.assetId()!=null && !in.assetId().isBlank()) {assets.ensureDocument(in.assetId());m.assetId=in.assetId();m.originalAssetId=in.assetId();}
    if(in.url()!=null && !in.url().isBlank()){
      m.url=in.url().trim();if(m.url.length()>2000)throw new IllegalArgumentException("URL muito longa.");
      try {URI uri=URI.create(m.url);if(!Set.of("https","http").contains(uri.getScheme())||uri.getHost()==null)throw new Exception();}
      catch(Exception e){throw new IllegalArgumentException("Informe uma URL HTTP ou HTTPS válida.");}
    } else m.url="";
    if(m.assetId==null && m.url.isBlank())throw new IllegalArgumentException("Envie um arquivo ou informe um link.");
    m.type=in.type()==null?Material.Type.OTHER:in.type();
    if(m.assetId!=null){String media=assets.type(m.assetId);m.type=media.equals("application/pdf")?Material.Type.PDF:media.contains("wordprocessingml")?Material.Type.DOCX:Material.Type.IMAGE;}
    if(in.previewAssetId()!=null && !in.previewAssetId().isBlank()){assets.ensureImage(in.previewAssetId());m.previewAssetId=in.previewAssetId();}
    if(in.topicId()!=null)m.topic=topic(in.topicId());m.description=in.description()==null?"":in.description().substring(0,Math.min(400,in.description().length()));
    return materials.save(m);
  }
  @PatchMapping("/materials/{id}/status") public Material statusMaterial(@PathVariable Long id,@RequestBody MaterialStatus in){
    Material m=materials.findById(id).orElseThrow();
    if(in.readDone()!=null){
      if(in.readDone()&&!Boolean.TRUE.equals(m.readRewarded)){pet.progress(10,2);m.readRewarded=true;}
      m.readDone=in.readDone();m.readAt=in.readDone()?LocalDate.now():null;
    }
    if(in.reviewed()!=null){
      if(in.reviewed()&&!Boolean.TRUE.equals(m.reviewRewarded)){pet.progress(15,3);m.reviewRewarded=true;}
      m.reviewed=in.reviewed();m.reviewedAt=in.reviewed()?LocalDate.now():null;
    }
    if(in.mastery()!=null)m.mastery=in.mastery();
    if(in.notes()!=null){if(in.notes().length()>12000)throw new IllegalArgumentException("Notas limitadas a 12 mil caracteres.");m.notes=in.notes();}
    return materials.save(m);
  }
  @GetMapping("/materials/{id}/document") public Map<String,Object> documentText(@PathVariable Long id){
    Material m=materials.findById(id).orElseThrow();
    if(m.assetId==null)throw new IllegalArgumentException("Este material é um link externo.");
    String type=assets.type(m.assetId);
    if(!type.contains("wordprocessingml"))throw new IllegalArgumentException("O editor de texto é para DOCX. PDFs podem receber anotações.");
    return Map.of("content",assets.docxText(m.assetId));
  }
  @PutMapping("/materials/{id}/document") public Material editDocument(@PathVariable Long id,@RequestBody DocumentEdit in){
    Material m=materials.findById(id).orElseThrow();if(m.assetId==null)throw new IllegalArgumentException("Envie um arquivo antes de editar.");
    String type=assets.type(m.assetId);
    if(in.content()==null || in.content().length()>250000)throw new IllegalArgumentException("Texto muito longo.");
    byte[] newBytes;
    if(type.contains("wordprocessingml"))newBytes=assets.docxFromText(in.content());
    else if(type.equals("application/pdf")){
      if(in.content().equals(m.notes))return m; // evita anexar a mesma anotação duas vezes
      newBytes=documents.appendPdfNotes(m.assetId,in.content());
    }
    else throw new IllegalArgumentException("Use um PDF ou DOCX para editar.");
    m.assetId=assets.version(m.assetId,newBytes).id;
    if(type.equals("application/pdf"))m.notes=in.content();
    m.readDone=true;m.readAt=LocalDate.now();return materials.save(m);
  }
  @DeleteMapping("/materials/{id}") public void deleteMaterial(@PathVariable Long id){materials.delete(materials.findById(id).orElseThrow());}

  @GetMapping("/error-notes") public List<ErrorNote> errorNotes() { return errors.findAll(Sort.by(Sort.Direction.DESC,"createdAt","id")); }
  public record ErrorInput(Long topicId,String source,String trap,String correctAnswer,Boolean recurring,String questionImageId,String answerImageId) {}
  @PostMapping("/error-notes") public ErrorNote addError(@RequestBody ErrorInput in) {
    ErrorNote e=new ErrorNote();e.topic=topic(in.topicId());
    e.source=required(in.source(),"Fonte da questão",220);e.trap=required(in.trap(),"Pegadinha",20000);
    e.correctAnswer=required(in.correctAnswer(),"Explicação correta",20000);
    if(in.questionImageId()!=null){assets.ensureImage(in.questionImageId());e.questionImageId=in.questionImageId();}
    if(in.answerImageId()!=null){assets.ensureImage(in.answerImageId());e.answerImageId=in.answerImageId();}
    e.recurring=Boolean.TRUE.equals(in.recurring());e.createdAt=LocalDate.now();return errors.save(e);
  }
  @DeleteMapping("/error-notes/{id}") public void deleteError(@PathVariable Long id){errors.delete(errors.findById(id).orElseThrow());}

  @GetMapping("/plan") public StudyPlan plan() { return plans.findById(1L).orElseGet(()->plans.save(new StudyPlan())); }
  public record PlanInput(String name,LocalDate examDate,Integer weeklyGoalMinutes,Integer weeklyGoalTopics) {}
  @PutMapping("/plan") public StudyPlan updatePlan(@RequestBody PlanInput in) {
    StudyPlan p=plan(); p.name=required(in.name(),"Nome do concurso",140); p.examDate=in.examDate();
    if(in.weeklyGoalMinutes()==null || in.weeklyGoalMinutes()<0 || in.weeklyGoalMinutes()>10080 || in.weeklyGoalTopics()==null || in.weeklyGoalTopics()<0 || in.weeklyGoalTopics()>100)
      throw new IllegalArgumentException("Confira as metas semanais informadas.");
    p.weeklyGoalMinutes=in.weeklyGoalMinutes(); p.weeklyGoalTopics=in.weeklyGoalTopics(); return plans.save(p);
  }
}
