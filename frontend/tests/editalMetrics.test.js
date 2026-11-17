import test from 'node:test';
import assert from 'node:assert/strict';
import {buildTopicMetrics} from '../src/editalMetrics.js';
const topic = {id:5,title:'SQL',theoryDone:true,summaryDone:false,status:'IN_PROGRESS'};
test('integra questões, tempo por assunto e revisões sem inventar valores', () => {
  const data={topics:[topic], questions:[{topic:{id:5},total:15,correct:12},{topic:{id:5},total:5,correct:2}],
    'study-sessions':[{topic:{id:5},durationSeconds:1800},{topic:null,durationSeconds:9999}],
    reviews:[{id:1,topic:{id:5},intervalDays:1,dueDate:'2026-01-01',completedAt:'2026-01-02'},
      {id:2,topic:{id:5},intervalDays:7,dueDate:'2026-01-08',completedAt:null,cancelledAt:null},
      {id:3,topic:{id:5},intervalDays:30,dueDate:'2026-02-01',completedAt:null,cancelledAt:'2026-01-08'}]};
  const row=buildTopicMetrics(data).get(5);
  assert.equal(row.total,20);assert.equal(row.correct,14);assert.equal(row.wrong,6);
  assert.equal(row.accuracy,70);assert.equal(row.seconds,1800);assert.equal(row.sessions,1);
  assert.equal(row.reviewsCompleted,1);assert.equal(row.currentReview?.id,2);
  assert.equal(row.stepsDone,2);assert.equal(row.stepsTotal,4);
});
test('assunto sem registros mantém traços e nenhum tempo atribuído',()=>{
  const row=buildTopicMetrics({topics:[topic],questions:[],reviews:[],'study-sessions':[]}).get(5);
  assert.equal(row.accuracy,null);assert.equal(row.seconds,0);assert.equal(row.currentReview,null);
});
test('separa teoria de questões e mantém sessões anteriores como teoria',()=>{
  const row=buildTopicMetrics({topics:[topic],questions:[],reviews:[],
    'study-sessions':[
      {topic:{id:5},durationSeconds:420,kind:'THEORY'},
      {topic:{id:5},durationSeconds:180,kind:'QUESTIONS'},
      {topic:{id:5},durationSeconds:120},
      {topic:null,durationSeconds:900,kind:'QUESTIONS'}
    ]}).get(5);
  assert.equal(row.theorySeconds,540);
  assert.equal(row.questionSeconds,180);
  assert.equal(row.seconds,720);
});
