import React, {useEffect,useMemo,useState} from 'react';
import {Plus,Target,Search,RotateCcw,Play,Pause,Check,Timer,Clock3} from 'lucide-react';
import {Modal,Field,PrimaryButton,SubtleButton,Panel,TopicSelect,Empty,AccuracyTag,ProgressBar,DeleteButton} from '../components/UI.jsx';
import DangerZone from '../components/DangerZone.jsx';
import {TODAY,percentage,fmtPercent,fmtHours,fmtTimer,dateBR} from '../utils.js';

const TIMER_KEY='nimbo-question-timer-v1';
const freshClock=()=>({topicId:'',elapsedMs:0,runningSince:null});
const initialClock=()=>{
  try {
    const stored=JSON.parse(sessionStorage.getItem(TIMER_KEY)||'null');
    if(stored && typeof stored==='object' && Number.isFinite(stored.elapsedMs) && stored.elapsedMs>=0 && stored.elapsedMs<=86400000 && (!stored.runningSince || Number.isFinite(stored.runningSince))) {
      return {topicId:String(stored.topicId||''),elapsedMs:stored.elapsedMs,runningSince:stored.runningSince||null};
    }
  }catch { /* sem histórico anterior */ }
  return freshClock();
};
const blank={topicId:'',total:'20',correct:'',date:TODAY(),notes:'',durationSeconds:0,manualMinutes:''};
const matchesAccuracy=(r,value)=>{
  const a=percentage(r.correct,r.total);
  return value==='all'||(value==='weak'&&a<60)||(value==='medium'&&a>=60&&a<80)||(value==='strong'&&a>=80)||(value==='errors'&&r.total>r.correct);
};

export default function Questions({data,action,working,focusTopicId}) {
  const [open,setOpen]=useState(false),[form,setForm]=useState(blank);
  const [search,setSearch]=useState(''),[discipline,setDiscipline]=useState('all'),[topic,setTopic]=useState('all');
  const [result,setResult]=useState('all'),[from,setFrom]=useState(''),[to,setTo]=useState(''),[order,setOrder]=useState('recent');
  const [clock,setClock]=useState(initialClock),[now,setNow]=useState(Date.now());
  useEffect(()=>{if(!focusTopicId)return;const selected=(data.topics||[]).find(t=>String(t.id)===String(focusTopicId));if(!selected)return;setDiscipline(String(selected.discipline.id));setTopic(String(selected.id));setClock(c=>c.runningSince||c.elapsedMs>0?c:{...c,topicId:String(focusTopicId)});},[focusTopicId]);
  const running=clock.runningSince!==null;
  const seconds=Math.min(86400,Math.floor((clock.elapsedMs+(running?Math.max(0,now-clock.runningSince):0))/1000));
  useEffect(()=>{sessionStorage.setItem(TIMER_KEY,JSON.stringify(clock));},[clock]);
  useEffect(()=>{
    if(!running)return;
    const id=setInterval(()=>setNow(Date.now()),500);
    return ()=>clearInterval(id);
  },[running]);
  const pause=()=>{
    setClock(c=>({...c,elapsedMs:Math.min(86400000,c.elapsedMs+(c.runningSince?Math.max(0,Date.now()-c.runningSince):0)),runningSince:null}));
    setNow(Date.now());
  };
  const reset=()=>{setClock(c=>({...freshClock(),topicId:c.topicId}));setNow(Date.now());};
  const start=()=>{if(!clock.topicId||seconds>=86400)return;setClock(c=>({...c,runningSince:c.runningSince||Date.now()}));setNow(Date.now());};
  const openManual=()=>{setForm({...blank,topicId:clock.topicId||String(data.topics?.[0]?.id||''),date:TODAY()});setOpen(true);};
  const finishFocus=()=>{
    if(!clock.topicId||seconds<1)return;
    const duration=Math.min(86400,Math.floor((clock.elapsedMs+(running?Date.now()-clock.runningSince:0))/1000));
    pause();
    setForm({...blank,topicId:clock.topicId,date:TODAY(),durationSeconds:duration});
    setOpen(true);
  };
  const submit=async e=>{
    e.preventDefault();
    const success=await action('questions','POST',{
      topicId:Number(form.topicId),total:Number(form.total),correct:Number(form.correct),
      notes:form.notes,date:form.date,
      durationSeconds:Number(form.durationSeconds)||Math.floor((Number(form.manualMinutes)||0)*60),
    },'Questões registradas!');
    if(success){setOpen(false);if(form.durationSeconds>0)reset();setForm(blank)}
  };
  const records=data.questions||[];
  const topicsForDiscipline=data.topics.filter(t=>discipline==='all'||String(t.discipline.id)===discipline);
  const filtered=useMemo(()=>records.filter(r=>{
    const t=r.topic;
    return (discipline==='all'||String(t.discipline.id)===discipline)
      &&(topic==='all'||String(t.id)===topic)
      &&`${t.title} ${t.discipline.name} ${r.notes||''}`.toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR'))
      &&(from===''||r.date>=from)&&(to===''||r.date<=to)&&matchesAccuracy(r,result);
  }).sort((a,b)=>order==='oldest'?a.date.localeCompare(b.date)||a.id-b.id:order==='errors'?((b.total-b.correct)-(a.total-a.correct)):order==='accuracy'?percentage(a.correct,a.total)-percentage(b.correct,b.total):b.date.localeCompare(a.date)||b.id-a.id),[records,discipline,topic,search,result,from,to,order]);
  const rows=useMemo(()=>{
    const sums=new Map();
    for(const r of filtered){const t=r.topic;const prev=sums.get(t.id)||{...t,total:0,correct:0};prev.total+=r.total;prev.correct+=r.correct;sums.set(t.id,prev)}
    return [...sums.values()].sort((a,b)=>percentage(a.correct,a.total)-percentage(b.correct,b.total));
  },[filtered]);
  const total=filtered.reduce((n,r)=>n+r.total,0),correct=filtered.reduce((n,r)=>n+r.correct,0);
  const focusedSeconds=filtered.reduce((n,r)=>n+(Number(r.focusDurationSeconds)||0),0);
  const clearFilters=()=>{setSearch('');setDiscipline('all');setTopic('all');setResult('all');setFrom('');setTo('');setOrder('recent')};
  return <div className="view-stack questions-page">
    <section className="question-focus-panel" aria-label="Cronômetro de questões">
      <div className="question-focus-details"><div className="question-focus-title"><Timer size={19}/><h3>Foco em questões</h3><span className={`timer-state ${running?'is-running':''}`}>{running?'Contando':seconds?'Pausado':'Pronto'}</span></div>
        <label className="question-topic-picker"><span>Assunto</span><TopicSelect topics={data.topics||[]} value={clock.topicId} disabled={running||seconds>0} onChange={v=>setClock(c=>({...c,topicId:v}))} placeholder="Escolha o assunto"/></label>
      </div>
      <div className="question-focus-clock"><output aria-live="off">{fmtTimer(seconds)}</output><span>Tempo líquido</span></div>
      <div className="question-focus-actions">
        {!running?<PrimaryButton disabled={!clock.topicId||seconds>=86400||working} onClick={start}><Play size={16}/> {seconds?'Continuar':'Iniciar'}</PrimaryButton>:<SubtleButton onClick={pause}><Pause size={16}/> Pausar</SubtleButton>}
        <PrimaryButton disabled={seconds<1||working} onClick={finishFocus}><Check size={16}/> Registrar resultado</PrimaryButton>
        <button className="icon-button question-reset" disabled={!seconds||working} title="Zerar cronômetro" aria-label="Zerar cronômetro" onClick={()=>{if(window.confirm('Zerar o tempo atual sem salvar?'))reset()}}><RotateCcw size={18}/></button>
      </div>
    </section>
    <div className="section-toolbar"><span className="toolbar-info"><Target size={18}/> Questões registradas</span><div className="toolbar-buttons"><SubtleButton onClick={openManual}><Plus size={16}/> Registro manual</SubtleButton></div></div>
    <Panel title="Registros e filtros">
      <div className="filter-workspace">
        <label className="filter-item filter-search"><span>Buscar</span><div className="search-wrap"><Search size={17}/><input type="search" placeholder="Assunto ou disciplina" value={search} onChange={e=>setSearch(e.target.value)}/></div></label>
        <label className="filter-item"><span>Disciplina</span><select value={discipline} onChange={e=>{setDiscipline(e.target.value);setTopic('all')}}><option value="all">Todas</option>{data.disciplines.map(d=><option key={d.id} value={String(d.id)}>{d.name}</option>)}</select></label>
        <label className="filter-item"><span>Assunto</span><select value={topic} onChange={e=>setTopic(e.target.value)}><option value="all">Todos</option>{topicsForDiscipline.map(t=><option key={t.id} value={String(t.id)}>{t.title}</option>)}</select></label>
        <details className="ux-more-filters"><summary>Mais filtros: acertos, datas e ordem</summary><div className="ux-extra-filter-grid">
        <label className="filter-item"><span>Acertos</span><select value={result} onChange={e=>setResult(e.target.value)}><option value="all">Todos</option><option value="weak">Abaixo de 60%</option><option value="medium">60–79%</option><option value="strong">80% ou mais</option><option value="errors">Com erros</option></select></label>
        <label className="filter-item"><span>De</span><input type="date" value={from} max={to||undefined} onChange={e=>setFrom(e.target.value)}/></label>
        <label className="filter-item"><span>Até</span><input type="date" value={to} min={from||undefined} onChange={e=>setTo(e.target.value)}/></label>
        <label className="filter-item"><span>Ordenar</span><select value={order} onChange={e=>setOrder(e.target.value)}><option value="recent">Recentes</option><option value="oldest">Antigos</option><option value="errors">Mais erros</option><option value="accuracy">Menor acerto</option></select></label>
        </div></details>
      </div><div className="filter-foot"><span>{filtered.length} registros</span><button type="button" className="btn btn-subtle" onClick={clearFilters}><RotateCcw size={14}/> Limpar</button></div>
    </Panel>
    <div className="question-stat-grid">
      <div><span>Questões</span><strong>{total.toLocaleString('pt-BR')}</strong></div>
      <div><span>Acertos / erros</span><strong>{correct.toLocaleString('pt-BR')} <em>/ {(total-correct).toLocaleString('pt-BR')}</em></strong></div>
      <div><span>Aproveitamento</span><strong>{total?fmtPercent(percentage(correct,total)):'—'}</strong></div>
      <div><span>Tempo em questões</span><strong>{fmtHours(focusedSeconds)}</strong></div>
    </div>
    <Panel title="Por assunto" action={<span className="small-chip">{rows.length} assuntos</span>}>
      {rows.length?<div className="topic-performance-list">{rows.map(t=><div className="performance-row" key={t.id}><div className="performance-info"><div><strong>{t.title}</strong><span>{t.discipline.name}</span></div></div><div className="performance-counts"><span><b>{t.correct}</b> acertos</span><span><b>{t.total-t.correct}</b> erros</span></div><div className="performance-bar"><ProgressBar value={percentage(t.correct,t.total)} color={percentage(t.correct,t.total)>=80?'#24ad90':percentage(t.correct,t.total)>=60?'#efa83e':'#ee6d7e'}/></div><AccuracyTag correct={t.correct} total={t.total}/></div>)}</div>:<Empty title="Nenhuma questão encontrada" description="Registre o resultado de uma sessão." icon={Target}/>}
    </Panel>
    <Panel title="Histórico">
      {filtered.length?<div className="table-scroll"><table className="data-table"><thead><tr><th>DATA</th><th>ASSUNTO</th><th>TOTAL</th><th>ACERTOS</th><th>ERROS</th><th>TEMPO</th><th>ACERTO</th><th></th></tr></thead><tbody>{filtered.map(r=><tr key={r.id}><td className="table-muted">{dateBR(r.date)}</td><td><div className="table-cell-main"><strong>{r.topic.title}</strong><small>{r.topic.discipline.name}</small>{r.notes&&<small>{r.notes}</small>}</div></td><td>{r.total}</td><td>{r.correct}</td><td>{r.total-r.correct}</td><td>{r.focusDurationSeconds?fmtHours(r.focusDurationSeconds):'—'}</td><td><AccuracyTag correct={r.correct} total={r.total}/></td><td><DeleteButton onClick={()=>{if(window.confirm('Excluir este registro?'))action(`questions/${r.id}`,'DELETE',undefined,'Registro excluído.')}}/></td></tr>)}</tbody></table></div>:<Empty title="Sem registros" description="Altere os filtros ou comece uma sessão."/>}
    </Panel>
    {open&&<Modal title="Registrar resultado" onClose={()=>setOpen(false)}><form className="form-stack" onSubmit={submit}>
      <Field label="Assunto"><TopicSelect topics={data.topics} disabled={form.durationSeconds>0} value={form.topicId} onChange={v=>setForm({...form,topicId:v})}/></Field>
      {form.durationSeconds>0?<div className="question-record-time"><Clock3 size={17}/> Tempo em questões <strong>{fmtTimer(form.durationSeconds)}</strong></div>:<Field label="Tempo gasto (minutos, opcional)"><input type="number" min="0" max="1440" step="1" value={form.manualMinutes} onChange={e=>setForm({...form,manualMinutes:e.target.value})} placeholder="0"/></Field>}
      <div className="form-grid"><Field label="Questões resolvidas"><input required type="number" min="1" max="100000" value={form.total} onChange={e=>setForm({...form,total:e.target.value})}/></Field><Field label="Acertos"><input required type="number" min="0" max={form.total} value={form.correct} onChange={e=>setForm({...form,correct:e.target.value})}/></Field></div>
      <Field label="Data"><input type="date" required value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></Field>
      <Field label="Observação (opcional)"><textarea rows="2" maxLength="400" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/></Field>
      <div className="modal-actions"><SubtleButton type="button" onClick={()=>setOpen(false)}>Cancelar</SubtleButton><PrimaryButton type="submit" loading={working}>Salvar</PrimaryButton></div>
    </form></Modal>}
  </div>;
}
