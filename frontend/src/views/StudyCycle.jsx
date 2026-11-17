import React, {useEffect,useRef,useState} from 'react';
import { Play, Pause, Square, RotateCcw, Timer, Clock3, Plus, ArrowRight, Lightbulb, ArrowUp, ArrowDown, ListOrdered } from 'lucide-react';
import { Modal, Field, PrimaryButton, SubtleButton, Panel, Empty, TopicSelect, DeleteButton, ProgressBar } from '../components/UI.jsx';
import DangerZone from '../components/DangerZone.jsx';
import { TODAY, fmtTimer,fmtHours,dateBR } from '../utils.js';
import AssimilationPicker from '../components/AssimilationPicker.jsx';
export default function StudyCycle({data,action,working,focusTopicId}) {
  const nextId=data.dashboard?.nextCycleDisciplineId;
  const [disciplineId,setDisciplineId]=useState('');
  const [topicId,setTopicId]=useState('');
  const [running,setRunning]=useState(false); const [seconds,setSeconds]=useState(0);
  const startAt=useRef(null), elapsedMs=useRef(0); const interval=useRef(null), appliedFocus=useRef(null);
  const [showManual,setShowManual]=useState(false);
  const [concludeTopic,setConcludeTopic]=useState(null);
  const [showReorder,setShowReorder]=useState(false);
  const [cycleOrder,setCycleOrder]=useState([]);
  useEffect(()=>{setCycleOrder(data.disciplines.map(d=>d.id));},[data.disciplines]);
  const moveCycle=(index,direction)=>setCycleOrder(old=>{
    const next=[...old], target=index+direction;
    if(target<0||target>=next.length)return old;
    [next[index],next[target]]=[next[target],next[index]];
    return next;
  });
  const [manual,setManual]=useState({disciplineId:'',topicId:'',hours:'0',minutes:'30',studyDate:TODAY()});
  useEffect(()=>{if(!disciplineId&&nextId) setDisciplineId(String(nextId));},[nextId,disciplineId]);
  useEffect(()=>{if(!focusTopicId||appliedFocus.current===focusTopicId||running||seconds>0)return;const topic=(data.topics||[]).find(t=>String(t.id)===String(focusTopicId));if(topic){appliedFocus.current=focusTopicId;setDisciplineId(String(topic.discipline.id));setTopicId(String(topic.id));}},[focusTopicId,data.topics,running,seconds]);
  useEffect(()=>{
    if(running) {startAt.current=Date.now();interval.current=setInterval(()=>setSeconds(Math.floor((elapsedMs.current+Date.now()-startAt.current)/1000)),250);}
    return ()=>clearInterval(interval.current);
  },[running]);
  const pause=()=>{if(!running)return;elapsedMs.current+=Date.now()-startAt.current;setRunning(false);setSeconds(Math.floor(elapsedMs.current/1000));};
  const reset=()=>{setRunning(false);elapsedMs.current=0;setSeconds(0);setTopicId('');};
  const save=async()=>{
    const duration=running?Math.floor((elapsedMs.current+Date.now()-startAt.current)/1000):seconds;
    if(duration<1) return;
    pause(); const success=await action('study-sessions','POST',{disciplineId:Number(disciplineId),topicId:topicId?Number(topicId):null,durationSeconds:duration,studyDate:TODAY(),kind:'THEORY' },'Sessão salva! Próxima disciplina liberada no ciclo.');
    if(success){const studied=data.topics.find(t=>String(t.id)===String(topicId));reset();setDisciplineId('');if(studied)setConcludeTopic(studied);}
  };
  const saveManual=async e=>{e.preventDefault();const secs=(Number(manual.hours)*60+Number(manual.minutes))*60;
    if(secs<=0)return;
    if(await action('study-sessions','POST',{disciplineId:Number(manual.disciplineId),topicId:manual.topicId?Number(manual.topicId):null,durationSeconds:secs,studyDate:manual.studyDate,kind:'THEORY' },'Horas registradas!')) {setShowManual(false);setManual({disciplineId:'',topicId:'',hours:'0',minutes:'30',studyDate:TODAY()});setDisciplineId('');}
  };
  const availableTopics=data.topics.filter(t=>String(t.discipline.id)===String(disciplineId));
  const manualTopics=data.topics.filter(t=>String(t.discipline.id)===String(manual.disciplineId));
  const next=data.disciplines.find(d=>d.id===nextId);
  const history=data['study-sessions'];
  const recommendation=data.analytics?.recommendations?.[0];
  const recommendedDiscipline=data.disciplines.find(d=>d.id===recommendation?.disciplineId);
  return <div className="view-stack">
    <div className="section-toolbar"><span className="toolbar-info"><RotateCcw size={19}/> Estudo de teoria</span><div className="toolbar-buttons"><SubtleButton onClick={()=>{setManual({...manual,disciplineId:String(nextId||data.disciplines[0]?.id||'')});setShowManual(true)}}><Plus size={17}/> Registrar tempo manualmente</SubtleButton></div></div>
    {recommendation&&!focusTopicId&&<div className="focus-suggestion"><span className="focus-symbol"><Lightbulb size={22}/></span><div><span className="eyebrow">FOCO RECOMENDADO</span><strong>{recommendation.title}</strong><small>{recommendation.discipline} · {recommendation.total?`${recommendation.accuracy}% de acertos`:'sem questões registradas'} · {recommendation.dueReviews} revisões pendentes</small></div><button className="btn btn-primary" disabled={running||seconds>0} onClick={()=>{if(recommendedDiscipline){setDisciplineId(String(recommendedDiscipline.id));setTopicId(String(recommendation.id));}}}>Selecionar foco <ArrowRight size={15}/></button></div>}
    <div className="study-grid">
      <Panel title="Cronômetro de teoria" className="timer-panel" action={<span className={`timer-state ${running?'is-running':''}`}><span/> {running?'Em andamento':seconds?'Pausado':'Pronto para começar'}</span>}>
        <div className="timer-content"><div className="timer-face"><div className="timer-icon"><Timer size={25}/></div><div className="timer-digits">{fmtTimer(seconds)}</div><div className="timer-caption">TEMPO LÍQUIDO</div></div>
          <div className="timer-selects"><Field label="Disciplina"><select disabled={running||seconds>0} value={disciplineId} onChange={e=>{setDisciplineId(e.target.value);setTopicId('')}}><option value="">Selecione a disciplina</option>{data.disciplines.map(d=><option value={d.id} key={d.id}>{d.name}</option>)}</select></Field><Field label="Assunto (opcional)"><select disabled={running||seconds>0} value={topicId} onChange={e=>setTopicId(e.target.value)}><option value="">Estudo geral da disciplina</option>{availableTopics.map(t=><option value={t.id} key={t.id}>{t.title}</option>)}</select></Field></div>
          <div className="timer-actions">{!running?<PrimaryButton disabled={!disciplineId} onClick={()=>setRunning(true)}><Play size={17} fill="currentColor"/> {seconds?'Continuar':'Iniciar foco'}</PrimaryButton>:<button className="btn btn-warning" onClick={pause}><Pause size={17} fill="currentColor"/> Pausar</button>}
            <SubtleButton disabled={!seconds&&!running} onClick={reset}><RotateCcw size={17}/> Zerar</SubtleButton>
          </div>
          {seconds>0&&<button className="timer-save" disabled={working} onClick={save}><Square size={16}/> Finalizar e registrar {fmtHours(seconds)} <ArrowRight size={16}/></button>}
          
        </div>
      </Panel>
      <Panel title="Esta semana" action={<Clock3 size={19} className="muted-icon"/>}>
        <div className="hours-summary"><span>TOTAL DA SEMANA</span><strong>{fmtHours(data.dashboard?.weeklySeconds||0)}</strong><p>de {fmtHours((data.plan?.weeklyGoalMinutes||0)*60)} planejados</p></div>
        <ProgressBar value={data.plan?.weeklyGoalMinutes?100*(data.dashboard?.weeklySeconds||0)/(data.plan.weeklyGoalMinutes*60):0} color="#5776f7" height={8}/>
        <div className="time-split compact"><span><i className="time-dot theory"/>Teoria <b>{fmtHours(data.dashboard?.weeklyTheorySeconds||0)}</b></span><span><i className="time-dot questions"/>Questões <b>{fmtHours(data.dashboard?.weeklyQuestionSeconds||0)}</b></span></div>
        <div className="daily-mini-bars">{(data.dashboard?.dailyHours||[]).map(day=><div key={day.date} className="daily-mini"><span>{day.date.slice(8,10)}</span><div><div style={{height:`${Math.max(day.seconds?5:0,Math.min(100,day.seconds/14400*100))}%`}}/></div><small>{day.seconds?`${(day.seconds/3600).toFixed(1).replace('.',',')}h`:'—'}</small></div>)}</div>
         
      </Panel>
    </div>
    <details className="ux-collapsible ux-cycle-order"><summary>Organizar ciclo de matérias</summary><div className="ux-collapsible-body"><Panel title="Ciclo de matérias" action={<button className="text-link" onClick={()=>setShowReorder(true)}><ListOrdered size={16}/> Reordenar ciclo</button>}>
      <div className="cycle-cards">{data.disciplines.map((d,i)=><button key={d.id} onClick={()=>{if(!running&&seconds===0){setDisciplineId(String(d.id));setTopicId('');}}} className={`cycle-card ${String(d.id)===String(disciplineId)?'active':''}`}><span className="cycle-card-index">{String(i+1).padStart(2,'0')}</span><span className="cycle-card-dot" style={{background:d.color}}/><strong>{d.name}</strong>{d.id===nextId&&<span className="cycle-next-label">A SEGUIR</span>}</button>)}</div>
    </Panel></div></details>
    <Panel title="Sessões registradas" action={<span className="small-chip">{history.length} sessões</span>}>
      {history.length?<div className="table-scroll"><table className="data-table"><thead><tr><th>DATA</th><th>DISCIPLINA</th><th>ASSUNTO</th><th>TIPO</th><th>TEMPO</th><th></th></tr></thead><tbody>{history.map(s=><tr key={s.id}><td className="table-muted">{dateBR(s.studyDate)}</td><td><strong>{s.discipline.name}</strong></td><td className="table-muted">{s.topic?.title||'Estudo geral'}</td><td><span className={`study-type ${s.kind==='QUESTIONS'?'questions':'theory'}`}>{s.kind==='QUESTIONS'?'Questões':'Teoria'}</span></td><td><span className="time-tag">{fmtHours(s.durationSeconds)}</span></td><td><DeleteButton onClick={()=>{if(window.confirm('Excluir esta sessão?'))action(`study-sessions/${s.id}`,'DELETE',undefined,'Sessão removida.')}}/></td></tr>)}</tbody></table></div>
      :<Empty title="Sua primeira sessão começa aqui" description="Inicie o cronômetro e registre sua primeira sessão de foco." icon={Timer}/>}
    </Panel>
    {concludeTopic&&<AssimilationPicker title={concludeTopic.theoryDone?'Atualizar assimilação?':'Terminou a teoria deste assunto?'} subject={concludeTopic.title} working={working} submitLabel={concludeTopic.theoryDone?'Reagendar revisão':'Marcar teoria concluída'} onClose={()=>setConcludeTopic(null)} onConfirm={level=>concludeTopic.theoryDone?action(`topics/${concludeTopic.id}/assimilate`,'POST',{level},'Revisão reprogramada.'):
      action(`topics/${concludeTopic.id}`,'PUT',{disciplineId:concludeTopic.discipline.id,title:concludeTopic.title,status:concludeTopic.status,mastery:concludeTopic.mastery,importance:concludeTopic.importance||3,summaryDone:concludeTopic.summaryDone,theoryDone:true,assimilationLevel:level},'Teoria concluída. Revisão agendada.')}/>}
    {showReorder&&<Modal title="Reordenar o ciclo" subtitle="Escolha a ordem em que as disciplinas entram na fila." onClose={()=>setShowReorder(false)}><div className="form-stack">
      <div className="reorder-list">{cycleOrder.map((id,i)=>{const item=data.disciplines.find(d=>d.id===id);return <div className="reorder-item" key={id}><span className="reorder-number">{i+1}</span><span className="discipline-dot" style={{background:item?.color}}/><strong>{item?.name}</strong><div><button className="icon-button" disabled={i===0} onClick={()=>moveCycle(i,-1)} aria-label={`Subir ${item?.name}`}><ArrowUp size={16}/></button><button className="icon-button" disabled={i===cycleOrder.length-1} onClick={()=>moveCycle(i,1)} aria-label={`Descer ${item?.name}`}><ArrowDown size={16}/></button></div></div>})}</div>
      <div className="modal-actions"><SubtleButton onClick={()=>setShowReorder(false)}>Cancelar</SubtleButton><PrimaryButton loading={working} onClick={async()=>{if(await action('disciplines/reorder','PUT',cycleOrder,'Ordem do ciclo atualizada!'))setShowReorder(false);}}>Salvar ordem</PrimaryButton></div>
    </div></Modal>}
    {showManual&&<Modal title="Registrar tempo manualmente" subtitle="Para quando você estudou sem usar o cronômetro." onClose={()=>setShowManual(false)}><form className="form-stack" onSubmit={saveManual}>
      <Field label="Disciplina"><select required value={manual.disciplineId} onChange={e=>setManual({...manual,disciplineId:e.target.value,topicId:''})}><option value="">Selecione</option>{data.disciplines.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select></Field>
      <Field label="Assunto (opcional)"><select value={manual.topicId} onChange={e=>setManual({...manual,topicId:e.target.value})}><option value="">Estudo geral</option>{manualTopics.map(t=><option key={t.id} value={t.id}>{t.title}</option>)}</select></Field>
      <div className="form-grid"><Field label="Horas"><input min="0" max="23" type="number" required value={manual.hours} onChange={e=>setManual({...manual,hours:e.target.value})}/></Field><Field label="Minutos"><input min="0" max="59" type="number" required value={manual.minutes} onChange={e=>setManual({...manual,minutes:e.target.value})}/></Field></div>
      <Field label="Data do estudo"><input type="date" required value={manual.studyDate} onChange={e=>setManual({...manual,studyDate:e.target.value})}/></Field>
      <div className="modal-actions"><SubtleButton type="button" onClick={()=>setShowManual(false)}>Cancelar</SubtleButton><PrimaryButton type="submit" loading={working}>Salvar tempo</PrimaryButton></div>
    </form></Modal>}
  </div>;
}
