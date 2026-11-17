import React, {useMemo, useState} from 'react';
import {BookOpenText, Plus, Search, Check, Trash2, Info, ChevronDown, ChevronRight, RotateCcw, Clock3, Target, BookMarked, ListChecks, ArrowUpDown, ClipboardCheck} from 'lucide-react';
import {Modal, Field, PrimaryButton, SubtleButton, Panel, ProgressBar, Empty} from '../components/UI.jsx';
import {statusLabels, masteryLabels, fmtHours, dateBR} from '../utils.js';
import {buildTopicMetrics, localDate, fmtNumber, fmtAccuracy} from '../editalMetrics.js';
import AssimilationPicker from '../components/AssimilationPicker.jsx';
import {revisionLabel} from '../revisionLevels.js';
import EditalImporter from '../components/EditalImporter.jsx';
import DangerZone from '../components/DangerZone.jsx';

const emptyTopic={disciplineId:'',title:'',status:'NOT_STARTED',theoryDone:false,summaryDone:false,mastery:'WEAK',importance:3,assimilationLevel:2};
function StepBox({checked,onChange,disabled=false,label,title}) {
  return <button type="button" className={`study-check ${checked?'is-checked':''}`} aria-label={label} aria-pressed={checked} title={title||label} disabled={disabled} onClick={onChange}>
    <span className="study-check-square">{checked&&<Check size={15} strokeWidth={3}/>}</span>
    <span className="study-check-text">{checked?'Feito':'Pendente'}</span>
  </button>;
}
function ReviewBox({task,openReview,theoryDone}) {
 if(!task)return <span className="review-blank">{theoryDone?'Sem revisão':'Após teoria'}</span>;
 const overdue=task.dueDate<=localDate();
 return <button type="button" className={`review-check ${overdue?'is-overdue':''}`} onClick={()=>openReview(task)} title="Concluir e reagendar após avaliar o aprendizado">
   <span>{dateBR(task.dueDate)}</span><small>{overdue?'Revisar':`${task.intervalDays} dias`}</small>
 </button>;
}
export default function Edital({data,action,working,navigate}) {
  const [modal,setModal]=useState(null);
  const [assimilation,setAssimilation]=useState(null);
  const [form,setForm]=useState(emptyTopic);
  const [disciplineForm,setDisciplineForm]=useState({name:'',color:'#4e9370'});
  const [filter,setFilter]=useState('all'),[search,setSearch]=useState(''),[status,setStatus]=useState('all');
  const [masteryFilter,setMasteryFilter]=useState('all'),[reviewFilter,setReviewFilter]=useState('all');
  const [order,setOrder]=useState('discipline'),[pageSize,setPageSize]=useState(30),[page,setPage]=useState(1),[expanded,setExpanded]=useState(null);
  const stats=useMemo(()=>buildTopicMetrics(data),[data]);
  const saveTopic=async e=>{
    e.preventDefault();const payload={...form,disciplineId:Number(form.disciplineId)};
    const ok=await action(modal==='edit'?`topics/${form.id}`:'topics',modal==='edit'?'PUT':'POST',payload,modal==='edit'?'Assunto atualizado!':'Assunto adicionado!');
    if(ok){setModal(null);setForm(emptyTopic);}
  };
  const openCreate=()=>{setForm({...emptyTopic,disciplineId:String(data.disciplines[0]?.id||'')});setModal('create');};
  const openEdit=t=>{setForm({id:t.id,disciplineId:String(t.discipline.id),title:t.title,status:t.status,theoryDone:!!t.theoryDone,summaryDone:!!t.summaryDone,mastery:t.mastery,importance:t.importance||3,assimilationLevel:t.assimilationLevel||2});setModal('edit');};
  const patch=async(t,changes)=>action(`topics/${t.id}`,'PUT',{disciplineId:t.discipline.id,title:t.title,status:t.status,theoryDone:t.theoryDone,summaryDone:t.summaryDone,mastery:t.mastery,importance:t.importance||3,assimilationLevel:t.assimilationLevel??2,...changes},'Progresso do assunto atualizado!');
  const remove=async t=>{if(window.confirm(`Excluir "${t.title}" e seus registros vinculados?`))await action(`topics/${t.id}`,'DELETE',undefined,'Assunto excluído.');};
  const rows=useMemo(()=>data.topics.map(topic=>({...stats.get(Number(topic.id)),topic})),[data.topics,stats]);
  const filtered=useMemo(()=>rows.filter(row=>{
    const t=row.topic;
    return (filter==='all'||String(t.discipline.id)===filter) && (status==='all'||t.status===status) && (masteryFilter==='all'||t.mastery===masteryFilter)
      && (reviewFilter==='all'||(reviewFilter==='due'?row.due>0:reviewFilter==='done'?row.reviewsCompleted>0:reviewFilter==='notScheduled'?row.reviews.length===0:Boolean(row.currentReview)))
      && `${t.title} ${t.discipline.name}`.toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR'));
  }).sort((a,b)=>{
    if(order==='questions')return b.total-a.total;
    if(order==='accuracy')return (a.accuracy??101)-(b.accuracy??101);
    if(order==='time')return b.seconds-a.seconds;
    if(order==='review')return b.due-a.due;
    if(order==='progress')return b.stepsDone-a.stepsDone;
    if(order==='title')return a.topic.title.localeCompare(b.topic.title,'pt-BR');
    return (a.topic.discipline.position??0)-(b.topic.discipline.position??0) || a.topic.discipline.name.localeCompare(b.topic.discipline.name,'pt-BR') || a.topic.title.localeCompare(b.topic.title,'pt-BR');
  }),[rows,filter,status,masteryFilter,reviewFilter,search,order]);
  const maxPage=Math.max(1,Math.ceil(filtered.length/pageSize));
  const safePage=Math.min(page,maxPage);
  const shown=filtered.slice((safePage-1)*pageSize,safePage*pageSize);
  const completed=rows.filter(x=>x.topic.status==='COMPLETED').length;
  const allQuestions=rows.reduce((a,x)=>a+x.total,0),allCorrect=rows.reduce((a,x)=>a+x.correct,0);
  const trackedSeconds=rows.reduce((a,x)=>a+x.seconds,0),pendingReviews=rows.reduce((a,x)=>a+x.due,0);
  const changeFilters=setter=>e=>{setter(e.target.value);setPage(1);setExpanded(null);};
  return <div className="view-stack edital-advanced">
    <details className="ux-collapsible ux-edital-import"><summary><span>Importar edital</span><small>PDF ou DOCX</small></summary><div className="ux-collapsible-body"><EditalImporter action={action} working={working} history={data['edital/imports']||[]}/></div></details>
    <div className="section-toolbar"><span className="toolbar-info"><BookOpenText size={20}/> {fmtNumber(rows.length)} assuntos cadastrados</span><div className="toolbar-buttons"><SubtleButton onClick={()=>setModal('discipline')}><Plus size={17}/> Disciplina</SubtleButton><PrimaryButton onClick={openCreate}><Plus size={18}/> Novo assunto</PrimaryButton></div></div>
    <section className="edital-summary" aria-label="Indicadores do edital">
      <div><span className="summary-icon mint"><BookMarked size={20}/></span><span>Conteúdo concluído</span><strong>{rows.length?Math.round(completed/rows.length*100):0}%</strong><small>{fmtNumber(completed)} de {fmtNumber(rows.length)} assuntos</small><ProgressBar value={rows.length?completed/rows.length*100:0} color="#439475" height={7}/></div>
      <div><span className="summary-icon blue"><Target size={20}/></span><span>Questões resolvidas</span><strong>{fmtNumber(allQuestions)}</strong><small>{allQuestions?`${fmtAccuracy(allCorrect*100/allQuestions)} de acerto`:'Ainda sem questões'}</small></div>
      <div><span className="summary-icon sand"><Clock3 size={20}/></span><span>Tempo de estudo</span><strong>{fmtHours(trackedSeconds)}</strong><small>Com assunto definido</small></div>
      <div><span className="summary-icon rose"><RotateCcw size={20}/></span><span>Revisões pendentes</span><strong>{fmtNumber(pendingReviews)}</strong><small>Por assimilação</small></div>
    </section>
    <Panel className="edital-sheet-panel" title="Acompanhamento por assunto" action={<span className="small-chip">{filtered.length} de {rows.length} assuntos</span>}>
 
      <div className="edital-filter-grid">
        <label className="sheet-filter sheet-search"><span>Buscar assunto</span><div className="search-wrap"><Search size={18}/><input type="search" placeholder="Ex.: SQL, modelagem, redes..." value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}}/></div></label>
        <label className="sheet-filter"><span>Disciplina</span><select value={filter} onChange={changeFilters(setFilter)}><option value="all">Todas as disciplinas</option>{data.disciplines.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select></label>
        <label className="sheet-filter"><span>Status</span><select value={status} onChange={changeFilters(setStatus)}><option value="all">Todos</option>{Object.entries(statusLabels).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label>
        <details className="ux-more-filters"><summary>Mais filtros e ordenação</summary><div className="ux-extra-filter-grid">
        <label className="sheet-filter"><span>Domínio</span><select value={masteryFilter} onChange={changeFilters(setMasteryFilter)}><option value="all">Todos</option>{Object.entries(masteryLabels).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label>
        <label className="sheet-filter"><span>Revisão</span><select value={reviewFilter} onChange={changeFilters(setReviewFilter)}><option value="all">Todas</option><option value="due">Vencidas/hoje</option><option value="pending">Pendentes</option><option value="done">Com revisão feita</option><option value="notScheduled">Sem agendamento</option></select></label>
        <label className="sheet-filter"><span>Ordenar por</span><select value={order} onChange={changeFilters(setOrder)}><option value="discipline">Disciplina</option><option value="title">Assunto A–Z</option><option value="review">Mais revisões vencidas</option><option value="accuracy">Menor taxa de acerto</option><option value="questions">Mais questões</option><option value="time">Mais tempo de estudo</option><option value="progress">Mais etapas concluídas</option></select></label>
        </div></details>
      </div>
      <div className="sheet-scroll table-scroll" role="region" tabIndex="0" aria-label="Planilha do edital com rolagem horizontal"><table className="data-table edital-sheet"><thead><tr>
        <th className="sheet-sticky">Assunto / disciplina</th><th>Status</th><th>Teoria</th><th>Resumo</th><th>Assimilação</th><th>Próxima revisão</th><th>Domínio</th><th>Questões</th><th>Acertos</th><th>Erros</th><th>Taxa acerto</th><th>Tempo teoria</th><th>Tempo questões</th><th>Etapas</th><th>Ações</th>
      </tr></thead><tbody>{shown.map(row=>{
        const t=row.topic,opened=expanded===t.id;
        return <React.Fragment key={t.id}><tr className={opened?'sheet-open':''}>
          <td className="sheet-sticky"><button className="sheet-topic" onClick={()=>setExpanded(opened?null:t.id)} aria-expanded={opened} title="Expandir informações do assunto">{opened?<ChevronDown size={17}/>:<ChevronRight size={17}/>}<span className="sheet-topic-dot" style={{background:t.discipline.color}}/><span className="sheet-topic-copy"><strong>{t.title}</strong><small>{t.discipline.name}</small></span></button></td>
          <td><select className="sheet-inline-select status-select" value={t.status} disabled={working} onChange={e=>patch(t,{status:e.target.value})} aria-label={`Status de ${t.title}`}>{Object.entries(statusLabels).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></td>
          <td><StepBox checked={Boolean(t.theoryDone)} onChange={()=>t.theoryDone?patch(t,{theoryDone:false}):setAssimilation({mode:'theory',topic:t})} disabled={working} label={`Teoria de ${t.title}`}/></td>
          <td><StepBox checked={Boolean(t.summaryDone)} onChange={()=>patch(t,{summaryDone:!t.summaryDone})} disabled={working} label={`Resumo de ${t.title}`}/></td>
          <td><button type="button" className="btn btn-subtle" disabled={!t.theoryDone} title="Alterar avaliação" onClick={()=>setAssimilation({mode:'reassess',topic:t})}>{t.assimilationLevel?`Nível ${t.assimilationLevel}`:'Definir'}</button></td>
          <td><ReviewBox task={row.currentReview} openReview={review=>setAssimilation({mode:'review',topic:t,review})} theoryDone={t.theoryDone}/></td>
          <td><select className="sheet-inline-select mastery-select" value={t.mastery} disabled={working} onChange={e=>patch(t,{mastery:e.target.value})} aria-label={`Domínio de ${t.title}`}>{Object.entries(masteryLabels).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></td>
          <td className="sheet-num">{fmtNumber(row.total)}</td><td className="sheet-num sheet-good">{fmtNumber(row.correct)}</td><td className="sheet-num sheet-wrong">{fmtNumber(row.wrong)}</td><td className="sheet-num">{row.accuracy===null?'—':fmtAccuracy(row.accuracy)}</td><td className="sheet-num">{row.theorySeconds?fmtHours(row.theorySeconds):'—'}</td><td className="sheet-num">{row.questionSeconds?fmtHours(row.questionSeconds):'—'}</td>
          <td><div className="sheet-progress"><strong>{row.stepsDone}/4</strong><ProgressBar value={100*row.stepsDone/4} color="#47977b" height={6}/></div></td>
          <td><div className="sheet-actions"><button className="btn btn-subtle" onClick={()=>openEdit(t)}>Editar</button><button className="icon-button danger-hover" title={`Excluir ${t.title}`} aria-label={`Excluir ${t.title}`} onClick={()=>remove(t)}><Trash2 size={17}/></button></div></td>
        </tr>{opened&&<tr className="sheet-details-row"><td colSpan={15}><div className="sheet-detail"><div><h4>{t.title}</h4><p><strong>Desempenho:</strong> {fmtNumber(row.correct)} acertos e {fmtNumber(row.wrong)} erros em {fmtNumber(row.total)} questões{row.total?` (${fmtAccuracy(row.accuracy)})`:''}.</p><p><strong>Teoria:</strong> {fmtHours(row.theorySeconds)} · <strong>Questões:</strong> {fmtHours(row.questionSeconds)}. <strong>Revisões:</strong> {row.reviewsCompleted} concluída(s), {row.due} vencida(s)/hoje. <strong>Assimilação:</strong> {revisionLabel(t.assimilationLevel)}.</p><p><strong>Importância:</strong> {t.importance||3}/5 · {t.theoryCompletedAt?`Teoria concluída em ${dateBR(t.theoryCompletedAt)}`:'Teoria ainda não concluída'}.</p></div><div className="sheet-detail-actions"><SubtleButton onClick={()=>openEdit(t)}>Editar assunto</SubtleButton>{navigate&&<SubtleButton onClick={()=>navigate('cycle',{topicId:t.id})}><Clock3 size={16}/> Registrar estudo</SubtleButton>}{navigate&&<SubtleButton onClick={()=>navigate('questions',{topicId:t.id})}><ListChecks size={16}/> Questões</SubtleButton>}</div></div></td></tr>}</React.Fragment>;
      })}</tbody></table>{!shown.length&&<Empty title="Nenhum assunto encontrado" description="Experimente alterar os filtros ou importe um edital."/>}</div>
      <div className="sheet-footer"><span>{filtered.length?`${(safePage-1)*pageSize+1}–${Math.min(filtered.length,safePage*pageSize)} de ${filtered.length}`:'0 resultados'}</span><label>Linhas por página <select value={pageSize} onChange={e=>{setPageSize(Number(e.target.value));setPage(1);}}><option value={15}>15</option><option value={30}>30</option><option value={60}>60</option><option value={200}>200</option></select></label><div className="sheet-pager"><button className="btn btn-subtle" disabled={safePage===1} onClick={()=>{setPage(p=>Math.max(1,p-1));setExpanded(null);}}>Anterior</button><strong>{safePage} / {maxPage}</strong><button className="btn btn-subtle" disabled={safePage===maxPage} onClick={()=>{setPage(p=>Math.min(maxPage,p+1));setExpanded(null);}}>Próxima</button></div></div>
    </Panel>
 
    {(modal==='create'||modal==='edit')&&<Modal title={modal==='create'?'Adicionar assunto':'Editar assunto'}  onClose={()=>setModal(null)}><form className="form-stack" onSubmit={saveTopic}>
      <Field label="Disciplina"><select required value={form.disciplineId} onChange={e=>setForm({...form,disciplineId:e.target.value})}>{data.disciplines.map(d=><option value={d.id} key={d.id}>{d.name}</option>)}</select></Field>
      <Field label="Assunto"><input required maxLength="200" placeholder="Ex.: SQL, JOINs e subconsultas" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></Field>
      <div className="form-grid"><Field label="Status"><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>{Object.entries(statusLabels).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></Field><Field label="Domínio"><select value={form.mastery} onChange={e=>setForm({...form,mastery:e.target.value})}>{Object.entries(masteryLabels).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></Field></div>
      <Field label="Assimilação"><select value={form.assimilationLevel||2} onChange={e=>setForm({...form,assimilationLevel:Number(e.target.value)})}>
       <option value={1}>1 — Não assimilei (48h)</option><option value={2}>2 — Vou esquecer logo (7 dias)</option><option value={3}>3 — Assimilei bem (14 dias)</option><option value={4}>4 — Domino (42 dias)</option>
      </select></Field>
      <Field label={`Importância: ${form.importance}/5`}><input type="range" min="1" max="5" step="1" value={form.importance||3} onChange={e=>setForm({...form,importance:Number(e.target.value)})}/></Field>
      <div className="form-check-row"><label><input type="checkbox" checked={form.theoryDone} onChange={e=>setForm({...form,theoryDone:e.target.checked})}/> Teoria estudada</label><label><input type="checkbox" checked={form.summaryDone} onChange={e=>setForm({...form,summaryDone:e.target.checked})}/> Resumo pronto</label></div>
      <div className="modal-actions"><SubtleButton type="button" onClick={()=>setModal(null)}>Cancelar</SubtleButton><PrimaryButton type="submit" loading={working}>Salvar assunto</PrimaryButton></div>
    </form></Modal>}
    {assimilation&&<AssimilationPicker title={assimilation.mode==='review'?'Como foi a revisão?':'Como você assimilou?'} subject={assimilation.topic.title} onClose={()=>setAssimilation(null)} working={working} submitLabel="Confirmar e agendar" onConfirm={level=>{
      if(assimilation.mode==='review')return action(`reviews/${assimilation.review.id}/complete`,'PATCH',{level},'Próxima revisão agendada.');
      if(assimilation.mode==='reassess')return action(`topics/${assimilation.topic.id}/assimilate`,'POST',{level},'Revisão reprogramada.');
      return patch(assimilation.topic,{theoryDone:true,assimilationLevel:level});
    }}/>}
    {modal==='discipline'&&<Modal title="Nova disciplina"  onClose={()=>setModal(null)}><form className="form-stack" onSubmit={async e=>{e.preventDefault();if(await action('disciplines','POST',disciplineForm,'Disciplina criada!')){setModal(null);setDisciplineForm({name:'',color:'#4e9370'});}}}>
      <Field label="Nome da disciplina"><input required maxLength="120" value={disciplineForm.name} placeholder="Ex.: Engenharia de Software" onChange={e=>setDisciplineForm({...disciplineForm,name:e.target.value})}/></Field><Field label="Cor"><div className="color-field"><input type="color" value={disciplineForm.color} onChange={e=>setDisciplineForm({...disciplineForm,color:e.target.value})}/><span>{disciplineForm.color}</span></div></Field>
      <div className="modal-actions"><SubtleButton type="button" onClick={()=>setModal(null)}>Cancelar</SubtleButton><PrimaryButton type="submit" loading={working}>Adicionar disciplina</PrimaryButton></div>
    </form></Modal>}
  </div>;
}
