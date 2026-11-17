package br.com.concursoti.service;

import br.com.concursoti.model.*;
import br.com.concursoti.repo.*;
import org.springframework.web.bind.annotation.*;
import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardService {
  private final TopicRepository topics;
  private final QuestionRecordRepository questions;
  private final StudySessionRepository sessions;
  private final ReviewTaskRepository reviews;
  private final StudyPlanRepository plans;
  private final MockExamRepository exams;
  private final DisciplineRepository disciplines;
  public DashboardService(TopicRepository topics,QuestionRecordRepository questions,StudySessionRepository sessions,
                          ReviewTaskRepository reviews,StudyPlanRepository plans,DisciplineRepository disciplines,MockExamRepository exams) {
    this.topics=topics; this.questions=questions; this.sessions=sessions; this.reviews=reviews; this.plans=plans; this.disciplines=disciplines; this.exams=exams;
  }
  @GetMapping public Map<String,Object> dashboard() {
    LocalDate today=LocalDate.now(); LocalDate monday=today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
    List<Topic> t=topics.findAll(); List<QuestionRecord> q=questions.findAll(); List<StudySession> s=sessions.findAll();
    List<ReviewTask> r=reviews.findAll(); StudyPlan p=plans.findById(1L).orElse(new StudyPlan());
    long done=t.stream().filter(x->x.status==Topic.Status.COMPLETED).count();
    int totalQ=q.stream().mapToInt(x->x.total).sum(); int correct=q.stream().mapToInt(x->x.correct).sum();
    LocalDate recentFrom=today.minusDays(29);
    List<QuestionRecord> recentQuestions=q.stream().filter(x->!x.date.isBefore(recentFrom) && !x.date.isAfter(today)).toList();
    List<MockExam> recentExams=exams.findAll().stream().filter(x->!x.date.isBefore(recentFrom) && !x.date.isAfter(today)).toList();
    int recentTotal=recentQuestions.stream().mapToInt(x->x.total).sum()+recentExams.stream().mapToInt(x->x.total).sum();
    int recentCorrect=recentQuestions.stream().mapToInt(x->x.correct).sum()+recentExams.stream().mapToInt(x->x.correct).sum();
    List<StudySession> weekly=s.stream().filter(x->!x.studyDate.isBefore(monday) && !x.studyDate.isAfter(today)).toList();
    long weeklySeconds=weekly.stream().mapToLong(x->x.durationSeconds).sum();
    long weeklyTheorySeconds=weekly.stream().filter(x->x.effectiveKind()==StudySession.Kind.THEORY).mapToLong(x->x.durationSeconds).sum();
    long weeklyQuestionSeconds=weeklySeconds-weeklyTheorySeconds;
    long due=r.stream().filter(x->x.completedAt==null && x.cancelledAt==null && !x.dueDate.isAfter(today)).count();
    long completedThisWeek=t.stream().filter(x->x.theoryCompletedAt!=null && !x.theoryCompletedAt.isBefore(monday) && !x.theoryCompletedAt.isAfter(today)).count();
    List<Map<String,Object>> last7=new ArrayList<>();
    for(int i=6;i>=0;i--) {
      LocalDate d=today.minusDays(i);
      long seconds=s.stream().filter(x->x.studyDate.equals(d)).mapToLong(x->x.durationSeconds).sum();
      long theorySeconds=s.stream().filter(x->x.studyDate.equals(d) && x.effectiveKind()==StudySession.Kind.THEORY).mapToLong(x->x.durationSeconds).sum();
      last7.add(Map.of("date",d.toString(),"seconds",seconds,"theorySeconds",theorySeconds,"questionSeconds",seconds-theorySeconds));
    }
    Map<Long,List<QuestionRecord>> groups=q.stream().collect(Collectors.groupingBy(x->x.topic.id));
    List<Map<String,Object>> weak=new ArrayList<>();
    for(Topic x:t) {
      List<QuestionRecord> records=groups.getOrDefault(x.id,List.of());
      int n=records.stream().mapToInt(a->a.total).sum(); if(n==0) continue;
      int hits=records.stream().mapToInt(a->a.correct).sum();
      Map<String,Object> item=new LinkedHashMap<>();
      item.put("topicId",x.id); item.put("topicTitle",x.title); item.put("discipline",x.discipline.name);
      item.put("total",n); item.put("correct",hits); item.put("accuracy",Math.round(1000.0*hits/n)/10.0);
      weak.add(item);
    }
    weak.sort(Comparator.comparingDouble(x->(Double)x.get("accuracy")));
    List<Discipline> cycle=disciplines.findAll(org.springframework.data.domain.Sort.by("position","id"));
    Long nextCycleId=null;
    if(!cycle.isEmpty()) {
      nextCycleId=cycle.get(0).id;
      Optional<StudySession> recent=s.stream().filter(x->x.effectiveKind()==StudySession.Kind.THEORY).max(Comparator.comparing((StudySession x)->x.createdAt));
      if(recent.isPresent()) {
        Long previousId=recent.get().discipline.id;
        for(int i=0;i<cycle.size();i++) if(cycle.get(i).id.equals(previousId)) { nextCycleId=cycle.get((i+1)%cycle.size()).id; break; }
      }
    }
    Map<String,Object> result=new LinkedHashMap<>();
    result.put("totalTopics",t.size()); result.put("completedTopics",done);
    result.put("progressPercentage",t.isEmpty()?0:Math.round(1000.0*done/t.size())/10.0);
    result.put("totalQuestions",totalQ); result.put("totalCorrect",correct);
    result.put("recentTotal",recentTotal); result.put("recentCorrect",recentCorrect);
    result.put("recentAccuracy",recentTotal==0?0:Math.round(1000.0*recentCorrect/recentTotal)/10.0);
    result.put("overallAccuracy",totalQ==0?0:Math.round(1000.0*correct/totalQ)/10.0);
    result.put("weeklySeconds",weeklySeconds);
    result.put("weeklyTheorySeconds",weeklyTheorySeconds);result.put("weeklyQuestionSeconds",weeklyQuestionSeconds);
    long totalTheorySeconds=s.stream().filter(x->x.effectiveKind()==StudySession.Kind.THEORY).mapToLong(x->x.durationSeconds).sum();
    result.put("totalTheorySeconds",totalTheorySeconds);result.put("totalQuestionSeconds",s.stream().mapToLong(x->x.durationSeconds).sum()-totalTheorySeconds);
    result.put("weeklyGoalMinutes",p.weeklyGoalMinutes);
    result.put("weeklyGoalTopics",p.weeklyGoalTopics); result.put("topicsStudiedThisWeek",completedThisWeek);
    result.put("dueReviews",due); result.put("examDaysLeft",p.examDate==null?null:ChronoUnit.DAYS.between(today,p.examDate));
    result.put("dailyHours",last7); result.put("weakTopics",weak.stream().limit(5).toList());
    result.put("nextCycleDisciplineId",nextCycleId);
    return result;
  }
}
