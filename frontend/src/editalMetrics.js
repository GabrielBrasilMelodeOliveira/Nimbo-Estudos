/** Métricas por assunto derivadas dos lançamentos reais, sem somar sessões por disciplina ao assunto. */
import {activeReview} from './revisionLevels.js';
export function buildTopicMetrics(data) {
 const index=new Map((data.topics||[]).map(topic=>[Number(topic.id),{
   topic,total:0,correct:0,wrong:0,seconds:0,theorySeconds:0,questionSeconds:0,sessions:0,
   reviews:[],accuracy:null,due:0,reviewsCompleted:0,currentReview:null,nextReview:null,
 }]));
 for(const q of data.questions||[]) {
  const row=index.get(Number(q.topic?.id));if(!row)continue;
  row.total+=Number(q.total)||0;row.correct+=Number(q.correct)||0;
 }
 for(const s of data['study-sessions']||[]) {
  const row=index.get(Number(s.topic?.id));if(!row)continue;
  const duration=Number(s.durationSeconds)||0;row.seconds+=duration;
  if(s.kind==='QUESTIONS')row.questionSeconds+=duration;else row.theorySeconds+=duration;
  row.sessions++;
 }
 for(const r of data.reviews||[]) {
  const row=index.get(Number(r.topic?.id));if(row)row.reviews.push(r);
 }
 const today=localDate();
 for(const row of index.values()) {
  row.wrong=Math.max(0,row.total-row.correct);
  row.accuracy=row.total>0?row.correct*100/row.total:null;
  row.reviewsCompleted=row.reviews.filter(r=>r.completedAt).length;
  row.currentReview=row.reviews.filter(activeReview).sort((a,b)=>a.dueDate.localeCompare(b.dueDate))[0]||null;
  row.nextReview=row.currentReview;
  row.due=row.currentReview&&row.currentReview.dueDate<=today?1:0;
  row.stepsDone=Number(Boolean(row.topic.theoryDone))+Number(Boolean(row.topic.summaryDone))+
     Number(row.topic.status==='COMPLETED')+Number(row.reviewsCompleted>0);
  row.stepsTotal=4;
 }
 return index;
}
export function localDate(date=new Date()) {
 return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
export const fmtNumber=n=>Number(n||0).toLocaleString('pt-BR');
export const fmtAccuracy=n=>n==null?'Sem questões':`${n.toLocaleString('pt-BR',{maximumFractionDigits:1})}%`;
