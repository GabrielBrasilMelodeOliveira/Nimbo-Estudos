import React,{useMemo,useState} from 'react';
import {CalendarDays,CalendarRange,ChevronLeft,ChevronRight,Plus,Check,Clock3,PenLine,Trash2,BookOpen,GraduationCap,House,Heart,Briefcase,RotateCcw,Target,Lightbulb} from 'lucide-react';
import {Modal,Field,ProgressBar} from '../components/UI.jsx';
import {TODAY,dateBR,fmtHours} from '../utils.js';
import {isoDate,parseDate,addDays,startWeek,endWeek,monthStart,monthEnd,periodSummary,itemProgress,findGoal,suggestWeek,unplannedStudies} from '../plannerMetrics.js';
import {activeReview} from '../revisionLevels.js';
const CATEGORIES={PERSONAL:{name:'Pessoal',icon:House},ACADEMIC:{name:'Acadêmico',icon:GraduationCap},STUDY:{name:'Concurso',icon:BookOpen},WORK:{name:'Trabalho',icon:Briefcase},HEALTH:{name:'Saúde',icon:Heart}};
const WD=['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
const dateLabel=s=>new Intl.DateTimeFormat('pt-BR',{month:'long',year:'numeric'}).format(parseDate(s));
const formInitial=(day=TODAY(),study=false)=>({title:'',category:study?'STUDY':'PERSONAL',scheduledDate:day,startTime:'',durationMinutes:45,priority:2,repeatWeekly:false,notes:'',topicId:'',studyKind:'THEORY',targetQuestions:0});
const goalInitial=(data,type,start)=>{
 const found=findGoal(data,type,start);
 return {periodType:type,periodStart:start,targetMinutes:found?.targetMinutes??(type==='WEEK'?data.plan?.weeklyGoalMinutes||0:0),
  targetQuestions:found?.targetQuestions??0,targetTopics:found?.targetTopics??(type==='WEEK'?data.plan?.weeklyGoalTopics||0:0)};
};
function GoalStat({label,actual,target,onClick,unit=''}){return <button type="button" className="n55-goal-stat" onClick={onClick} title="Ajustar metas"><span>{label}</span><strong>{actual}{target>0?` / ${target}`:''}{unit}</strong>{target>0?<ProgressBar value={Math.min(100,100*actual/target)} height={5}/>:<small>Definir meta</small>}</button>}
export default function WeeklyPlanner({data,action,working,navigate}) {
 const [mode,setMode]=useState('week'),[anchor,setAnchor]=useState(TODAY()),[area,setArea]=useState('ALL');
 const [selectedDay,setSelectedDay]=useState(null),[editor,setEditor]=useState(null),[form,setForm]=useState(formInitial());
 const [goalOpen,setGoalOpen]=useState(false),[goalForm,setGoalForm]=useState(null),[suggestionsOpen,setSuggestionsOpen]=useState(false);
 const week=startWeek(anchor),month=monthStart(anchor),start=mode==='week'?week:month,end=mode==='week'?endWeek(anchor):monthEnd(anchor);
 const periodType=mode==='week'?'WEEK':'MONTH';
 const dates=useMemo(()=>Array.from({length:Math.round((parseDate(end)-parseDate(start))/86400000)+1},(_,i)=>addDays(start,i)),[start,end]);
 const gridDates=useMemo(()=>{if(mode==='week')return dates;const gridStart=startWeek(start);const count=Math.ceil((Math.round((parseDate(end)-parseDate(gridStart))/86400000)+1)/7)*7;return Array.from({length:count},(_,i)=>addDays(gridStart,i))},[mode,start,end,dates]);
 const metrics=useMemo(()=>periodSummary(data,start,end),[data,start,end]);
 const savedGoal=findGoal(data,periodType,start);
 const targetMinutes=savedGoal?.targetMinutes??(mode==='week'?data.plan?.weeklyGoalMinutes||0:0);
 const targetQuestions=savedGoal?.targetQuestions??0;
 const targetTopics=savedGoal?.targetTopics??(mode==='week'?data.plan?.weeklyGoalTopics||0:0);
 const suggestions=useMemo(()=>suggestWeek(data,week,TODAY()),[data,week]);
 const activityForDay=day=>(data.agenda||[]).filter(i=>i.scheduledDate===day&&(area==='ALL'||i.category===area)).sort((a,b)=>(a.startTime||'99:99').localeCompare(b.startTime||'99:99'));
 const reviewsForDay=day=>area!=='ALL'&&area!=='STUDY'?[]:(data.reviews||[]).filter(r=>activeReview(r)&&r.dueDate===day);
 const doneReviewsForDay=day=>area!=='ALL'&&area!=='STUDY'?[]:(data.reviews||[]).filter(r=>!!r.completedAt&&r.completedAt===day);
 const actualForDay=day=>periodSummary(data,day,day);
 const openAdd=(day=TODAY(),study=false)=>{setSelectedDay(null);setForm(formInitial(day,study));setEditor('create')};
 const openEdit=item=>{setSelectedDay(null);setForm({...item,topicId:item.topic?.id||'',studyKind:item.studyKind||'THEORY',targetQuestions:item.targetQuestions||0,startTime:item.startTime?.slice(0,5)||''});setEditor('edit')};
 const toPayload=record=>({...record,topicId:record.category==='STUDY'&&record.topicId?Number(record.topicId):null,
  durationMinutes:Number(record.durationMinutes),priority:Number(record.priority),targetQuestions:Number(record.targetQuestions||0),
  studyKind:record.category==='STUDY'&&record.topicId?record.studyKind:null,startTime:record.startTime||null,
  repeatWeekly:record.category==='STUDY'&&record.topicId?false:Boolean(record.repeatWeekly)});
 const save=async e=>{e.preventDefault();if(await action(editor==='edit'?`agenda/${form.id}`:'agenda',editor==='edit'?'PUT':'POST',toPayload(form),'Agenda atualizada.'))setEditor(null)};
 const toggle=item=>action(`agenda/${item.id}/toggle`,'PATCH',undefined,'Atividade atualizada.');
 const remove=async()=>{if(window.confirm(`Excluir "${form.title}"?`)){if(await action(`agenda/${form.id}`,'DELETE',undefined,'Atividade excluída.'))setEditor(null)}};
 const shift=delta=>{const d=parseDate(anchor);if(mode==='month'){d.setDate(1);d.setMonth(d.getMonth()+delta)}else d.setDate(d.getDate()+7*delta);setAnchor(isoDate(d));setSelectedDay(null)};
 const chooseView=value=>{setMode(value);setSelectedDay(null)};
 const saveGoal=async e=>{e.preventDefault();const payload={...goalForm,targetMinutes:Number(goalForm.targetMinutes),targetQuestions:Number(goalForm.targetQuestions),targetTopics:Number(goalForm.targetTopics)};
  if(await action('agenda/goals','PUT',payload,'Metas atualizadas.'))setGoalOpen(false)};
 const applySuggestion=async proposal=>action('agenda','POST',toPayload(proposal),'Estudo incluído na agenda.');
 const navigateBlock=item=>navigate(item.studyKind==='QUESTIONS'?'questions':'cycle',{topicId:item.topic.id});
 const renderActivity=(item,compact=false)=>{
  const tracked=itemProgress(data,item),isDone=tracked?tracked.complete:item.completed;
  const cat=CATEGORIES[item.category]||CATEGORIES.PERSONAL;
  return <div className={`n55-event ${isDone?'done':''} ${tracked?'study':''}`} key={`agenda-${item.id}`}>
   {!tracked&&<button className={`n55-check ${item.completed?'checked':''}`} onClick={()=>toggle(item)} disabled={working} title={item.completed?'Reabrir':'Concluir'} aria-label={`Concluir ${item.title}`}>{item.completed&&<Check size={13}/>}</button>}
   <div className="n55-event-body"><strong>{item.title}</strong>{!compact&&<small>{cat.name}{item.startTime?` · ${item.startTime.slice(0,5)}`:''}{tracked?` · ${item.studyKind==='QUESTIONS'?'Questões':'Teoria'}`:''}</small>}
    {tracked&&<span className="n55-event-progress">{fmtHours(tracked.seconds)} / {item.durationMinutes} min{tracked.targetQuestions>0?` · ${tracked.questions}/${tracked.targetQuestions} questões`:''}</span>}
   </div>
   {!compact&&<div className="n55-event-actions">{tracked&&<button className="n55-minibutton" title="Iniciar estudo" onClick={()=>navigateBlock(item)}><Clock3 size={15}/></button>}<button className="n55-minibutton" title="Editar" onClick={()=>openEdit(item)}><PenLine size={15}/></button></div>}
  </div>;
 };
 const dayContent=(day,compact=false)=>{const scheduled=activityForDay(day),reviews=reviewsForDay(day),finished=doneReviewsForDay(day),summary=actualForDay(day),unplanned=unplannedStudies(data,day);
  return <>{scheduled.map(i=>renderActivity(i,compact))}{reviews.map(r=><button className="n55-review-event" key={`review-${r.id}`} onClick={()=>navigate('reviews')} title="Revisão agendada"><RotateCcw size={14}/><span>{r.topic.title}</span></button>)}
    {!compact&&unplanned.map(item=><div className="n55-logged-event" key={`unplanned-${item.key}`}><span>Realizado</span><strong>{item.topic.title}</strong><small>{item.kind==='QUESTIONS'?'Questões':'Teoria'} · {fmtHours(item.seconds)}{item.questions>0?` · ${item.questions} questões`:''}</small></div>)}
    {!compact&&finished.length>0&&<div className="n55-day-actual">{finished.length} revisão(ões) concluída(s)</div>}
    {!compact&&(summary.seconds>0||summary.questions>0)&&<div className="n55-day-actual">Registrado: {fmtHours(summary.seconds)} · {summary.questions} questões</div>}
    {compact&&scheduled.length+reviews.length>2&&<span className="n55-more-count">+{scheduled.length+reviews.length-2} itens</span>}
  </>};
 return <div className="n55-planner view-stack">
  <div className="n55-toolbar"><div className="n55-calendar-switch" role="group" aria-label="Visualização"><button className={mode==='week'?'selected':''} onClick={()=>chooseView('week')}><CalendarRange size={17}/> Semana</button><button className={mode==='month'?'selected':''} onClick={()=>chooseView('month')}><CalendarDays size={17}/> Mês</button></div><div className="n55-toolbar-actions"><button className="btn btn-subtle" onClick={()=>setSuggestionsOpen(x=>!x)}><Lightbulb size={16}/> Sugestões</button><button className="btn btn-primary" onClick={()=>openAdd()}><Plus size={17}/> Nova atividade</button></div></div>
  <section className="n55-summary" aria-label="Metas e resultados do período">
   <GoalStat label="Horas estudadas" actual={+(metrics.seconds/3600).toFixed(1)} target={+(targetMinutes/60).toFixed(1)} unit="h" onClick={()=>{setGoalForm(goalInitial(data,periodType,start));setGoalOpen(true)}}/>
   <GoalStat label="Questões resolvidas" actual={metrics.questions} target={targetQuestions} onClick={()=>{setGoalForm(goalInitial(data,periodType,start));setGoalOpen(true)}}/>
   <GoalStat label="Assuntos estudados" actual={metrics.studiedTopics} target={targetTopics} onClick={()=>{setGoalForm(goalInitial(data,periodType,start));setGoalOpen(true)}}/>
   <div className="n55-goal-stat n55-static"><span>Revisões realizadas</span><strong>{metrics.reviewDone}</strong><small>{metrics.reviewDue} agendadas no período</small></div>
  </section>
  <div className="n55-metrics-detail"><span><b>Teoria</b> {fmtHours(metrics.theorySeconds)}</span><span><b>Questões</b> {fmtHours(metrics.questionSeconds)}</span><span><b>Estudos planejados</b> {metrics.completedBlocks}/{metrics.plannedBlocks} metas atingidas</span><button className="text-link" onClick={()=>{setGoalForm(goalInitial(data,periodType,start));setGoalOpen(true)}}>Editar metas</button></div>
  {suggestionsOpen&&<section className="n55-suggestions"><div className="n55-subhead"><strong>Próximos estudos sugeridos</strong><button className="btn btn-subtle" onClick={()=>setSuggestionsOpen(false)}>Fechar</button></div>{suggestions.length?suggestions.map(p=><div className="n55-suggestion" key={`${p.topicId}-${p.scheduledDate}`}><div><strong>{p.title}</strong><small>{dateBR(p.scheduledDate)} · {p.studyKind==='QUESTIONS'?'Questões':'Teoria'} · {p.durationMinutes} min</small></div><button className="btn btn-subtle" disabled={working} onClick={()=>applySuggestion(p)}>Adicionar</button></div>):<p>Nenhuma sugestão disponível para esta semana.</p>}<small>As sugestões não são incluídas sem sua confirmação.</small></section>}
  <section className="n55-calendar"><div className="n55-calendar-head"><div className="n55-date-nav"><button className="icon-button" onClick={()=>shift(-1)} aria-label="Período anterior"><ChevronLeft size={19}/></button><strong>{mode==='week'?`${dateBR(start)} — ${dateBR(end)}`:dateLabel(start)}</strong><button className="icon-button" onClick={()=>shift(1)} aria-label="Próximo período"><ChevronRight size={19}/></button><button className="btn btn-subtle" onClick={()=>setAnchor(TODAY())}>Hoje</button></div><label className="n55-area">Área <select value={area} onChange={e=>setArea(e.target.value)}><option value="ALL">Todas</option>{Object.entries(CATEGORIES).map(([key,value])=><option key={key} value={key}>{value.name}</option>)}</select></label></div>
   {mode==='month'?<div className="n55-month-scroll"><div className="n55-month-grid">{WD.map(d=><div key={d} className="n55-weekday">{d}</div>)}{gridDates.map(day=>{const scheduled=activityForDay(day),revs=reviewsForDay(day),count=scheduled.length+revs.length;const actual=actualForDay(day);return <button type="button" key={day} className={`n55-month-day ${day.startsWith(start.slice(0,7))?'':'outside'} ${day===TODAY()?'today':''}`} onClick={()=>setSelectedDay(day)} title={`Abrir ${dateBR(day)}`}><span className="n55-month-top"><strong>{parseDate(day).getDate()}</strong>{count>0&&<small>{count} itens</small>}</span><span className="n55-month-text">{scheduled.slice(0,1).map(i=><span key={i.id}>{i.title}</span>)}{revs.length>0&&<span>↻ {revs.length} revisão(ões)</span>}{actual.seconds>0&&<span>◷ {fmtHours(actual.seconds)}</span>}{actual.questions>0&&<span>{actual.questions} questões</span>}</span></button>})}</div></div>
    :<div className="n55-week-grid">{dates.map((day,i)=><section className={`n55-week-day ${day===TODAY()?'today':''}`} key={day}><header><span>{WD[i]}</span><strong>{parseDate(day).getDate()}</strong><button onClick={()=>openAdd(day,true)} title="Planejar estudo"><Plus size={17}/></button></header><div className="n55-day-body">{dayContent(day)}{!activityForDay(day).length&&!reviewsForDay(day).length&&<button className="n55-day-empty" onClick={()=>openAdd(day,true)}>Planejar</button>}</div></section>)}</div>}
  </section>
  {selectedDay&&<Modal title={dateBR(selectedDay)} onClose={()=>setSelectedDay(null)}><div className="n55-day-dialog"><button className="btn btn-primary" onClick={()=>openAdd(selectedDay,true)}><Plus size={16}/> Adicionar estudo ou atividade</button>{dayContent(selectedDay)}{!activityForDay(selectedDay).length&&!reviewsForDay(selectedDay).length&&<p>Nenhum compromisso planejado.</p>}</div></Modal>}
  {editor&&<Modal title={editor==='create'?'Nova atividade':'Editar atividade'} onClose={()=>setEditor(null)}><form onSubmit={save} className="form-stack n55-editor">
   <Field label="Área"><select value={form.category} onChange={e=>setForm({...form,category:e.target.value,topicId:'',studyKind:'THEORY'})}>{Object.entries(CATEGORIES).map(([key,item])=><option value={key} key={key}>{item.name}</option>)}</select></Field>
   {form.category==='STUDY'&&<><Field label="Assunto (vincula automaticamente às métricas)"><select value={form.topicId||''} onChange={e=>{const t=data.topics.find(x=>String(x.id)===e.target.value);setForm({...form,topicId:e.target.value,title:t?.title||form.title})}}><option value="">Atividade livre (sem vínculo automático)</option>{data.topics.map(t=><option key={t.id} value={t.id}>{t.discipline.name} · {t.title}</option>)}</select></Field>{form.topicId&&<div className="form-grid"><Field label="Tipo"><select value={form.studyKind||'THEORY'} onChange={e=>setForm({...form,studyKind:e.target.value})}><option value="THEORY">Teoria</option><option value="QUESTIONS">Questões</option></select></Field>{form.studyKind==='QUESTIONS'&&<Field label="Meta de questões"><input type="number" min="0" max="3000" value={form.targetQuestions||0} onChange={e=>setForm({...form,targetQuestions:e.target.value})}/></Field>}</div>}</>}
   <Field label="Atividade"><input required maxLength={180} value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Ex.: Estudar SQL"/></Field>
   <div className="form-grid"><Field label="Dia"><input required type="date" value={form.scheduledDate} onChange={e=>setForm({...form,scheduledDate:e.target.value})}/></Field><Field label="Horário (opcional)"><input type="time" value={form.startTime||''} onChange={e=>setForm({...form,startTime:e.target.value})}/></Field></div>
   <div className="form-grid"><Field label="Minutos planejados"><input required type="number" min="0" max="1440" value={form.durationMinutes} onChange={e=>setForm({...form,durationMinutes:e.target.value})}/></Field><Field label="Prioridade"><select value={form.priority} onChange={e=>setForm({...form,priority:Number(e.target.value)})}><option value={1}>Baixa</option><option value={2}>Normal</option><option value={3}>Alta</option></select></Field></div>
   {!(form.category==='STUDY'&&form.topicId)&&<label className="week-repeat-check"><input type="checkbox" checked={!!form.repeatWeekly} onChange={e=>setForm({...form,repeatWeekly:e.target.checked})}/> Repetir semanalmente após concluir</label>}
   <details><summary>Notas adicionais</summary><Field label="Notas"><textarea maxLength="1200" rows={2} value={form.notes||''} onChange={e=>setForm({...form,notes:e.target.value})}/></Field></details>
   <div className="modal-actions">{editor==='edit'&&<button className="btn btn-subtle" type="button" onClick={remove}><Trash2 size={15}/> Excluir</button>}<button type="button" className="btn btn-subtle" onClick={()=>setEditor(null)}>Cancelar</button><button type="submit" className="btn btn-primary" disabled={working}>Salvar</button></div>
  </form></Modal>}
  {goalOpen&&goalForm&&<Modal title={`Metas ${mode==='week'?'da semana':'do mês'}`} onClose={()=>setGoalOpen(false)}><form className="form-stack" onSubmit={saveGoal}><Field label="Horas de estudo (total)"><input type="number" min="0" max="744" step="0.5" value={Number(goalForm.targetMinutes)/60} onChange={e=>setGoalForm({...goalForm,targetMinutes:Math.round(Number(e.target.value)*60)})}/></Field><Field label="Questões a resolver"><input type="number" min="0" max="100000" value={goalForm.targetQuestions} onChange={e=>setGoalForm({...goalForm,targetQuestions:e.target.value})}/></Field><Field label="Assuntos a estudar"><input type="number" min="0" max="10000" value={goalForm.targetTopics} onChange={e=>setGoalForm({...goalForm,targetTopics:e.target.value})}/></Field><small>Os realizados são calculados pelo cronômetro e registros de questões. Meta zero significa não definida.</small><div className="modal-actions"><button type="button" className="btn btn-subtle" onClick={()=>setGoalOpen(false)}>Cancelar</button><button type="submit" className="btn btn-primary" disabled={working}>Salvar metas</button></div></form></Modal>}
 </div>;
}
