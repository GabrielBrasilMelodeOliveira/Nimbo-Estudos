import test from 'node:test';
import assert from 'node:assert/strict';
import {itemProgress,periodSummary,suggestWeek,startWeek,unplannedStudies} from '../src/plannerMetrics.js';
const topic={id:2,title:'SQL',theoryDone:true};
const block={id:1,title:'SQL',category:'STUDY',scheduledDate:'2026-11-16',durationMinutes:40,targetQuestions:10,studyKind:'QUESTIONS',topic};
const data={agenda:[block],reviews:[{id:3,dueDate:'2026-11-16',completedAt:null,cancelledAt:null},{id:4,dueDate:'2026-11-16',completedAt:null,cancelledAt:'2026-11-16'}],
 'study-sessions':[{studyDate:'2026-11-16',topic,kind:'QUESTIONS',durationSeconds:1200},{studyDate:'2026-11-16',topic:null,kind:'THEORY',durationSeconds:600}],
 questions:[{date:'2026-11-16',topic,total:8,correct:6}],topics:[topic],analytics:{recommendations:[{id:2,title:'SQL',total:8,accuracy:75}]}};
test('associa ao bloco somente o assunto e a categoria de tempo',()=>{
 const p=itemProgress(data,block);assert.equal(p.seconds,1200);assert.equal(p.questions,8);assert.equal(p.complete,false);
});
test('contabiliza a semana sem contar sessão ou questão duas vezes',()=>{
 const p=periodSummary(data,'2026-11-16','2026-11-22');assert.equal(p.seconds,1800);
 assert.equal(p.theorySeconds,600);assert.equal(p.questions,8);assert.equal(p.reviewDue,1);assert.equal(p.plannedMinutes,40);
});
test('sugestões preservam o calendário e não são gravadas automaticamente',()=>{
 assert.equal(suggestWeek(data,'2026-11-16','2026-11-16').length,0);assert.equal(startWeek('2026-11-19'),'2026-11-16');
});

test('histórico livre aparece no dia sem duplicar o bloco planejado',()=>{
 assert.equal(unplannedStudies(data,'2026-11-16').length,1);
 const withoutBlock={...data,agenda:[]};const history=unplannedStudies(withoutBlock,'2026-11-16');
 assert.equal(history.length,2);assert.equal(history.find(x=>x.kind==='QUESTIONS').questions,8);assert.equal(history.find(x=>x.kind==='QUESTIONS').seconds,1200);
});
