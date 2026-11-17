import React,{useState} from 'react';
import {CalendarDays,CheckCircle2,Clock3,ArrowRight,RotateCcw} from 'lucide-react';
import {Panel,Empty,SubtleButton} from '../components/UI.jsx';
import AssimilationPicker from '../components/AssimilationPicker.jsx';
import {TODAY,dateBR} from '../utils.js';
import {activeReview,revisionLabel} from '../revisionLevels.js';
export default function Reviews({data,action,working,navigate}) {
 const [tab,setTab]=useState('due'),[selected,setSelected]=useState(null);
 const today=TODAY();
 const due=(data.reviews||[]).filter(r=>activeReview(r)&&r.dueDate<=today);
 const upcoming=(data.reviews||[]).filter(r=>activeReview(r)&&r.dueDate>today);
 const done=(data.reviews||[]).filter(r=>r.completedAt).sort((a,b)=>b.completedAt.localeCompare(a.completedAt));
 const current={due,upcoming,done}[tab];
 return <div className="view-stack">
 <Panel title="Revisões">
  <div className="tabs" role="tablist"><button className={tab==='due'?'active':''} onClick={()=>setTab('due')}>Pendentes <span>{due.length}</span></button><button className={tab==='upcoming'?'active':''} onClick={()=>setTab('upcoming')}>Próximas <span>{upcoming.length}</span></button><button className={tab==='done'?'active':''} onClick={()=>setTab('done')}>Histórico <span>{done.length}</span></button></div>
  {current.length?<div className="review-list">{current.map(r=><div className="review-item" key={r.id}>
    <div className="review-item-badge"><RotateCcw size={20}/></div>
    <div className="review-item-main"><strong>{r.topic.title}</strong><span>{r.topic.discipline.name} · {r.completedAt?`Revista em ${dateBR(r.completedAt)}`:`Próxima: ${dateBR(r.dueDate)}`}</span>{r.assimilationLevel&&<small>{revisionLabel(r.assimilationLevel)} · intervalo de {r.intervalDays} dias{r.assimilationLevel===1?" · reestudar teoria":""}</small>}</div>
    <div className="review-meta">{!r.completedAt&&r.dueDate<today&&<span className="review-overdue">Atrasada</span>}</div>
    {tab==='due'?<button className="btn btn-primary" disabled={working} onClick={()=>setSelected(r)}><CheckCircle2 size={16}/> {r.assimilationLevel===1?'Reestudar':'Revisar'}</button>:tab==='done'?<SubtleButton disabled={working} onClick={()=>{if(window.confirm('Reabrir esta revisão? A próxima será cancelada.'))action(`reviews/${r.id}/reopen`,'PATCH',undefined,'Revisão reaberta.')}}>Reabrir</SubtleButton>:<span className="upcoming-pill">Agendada</span>}
   </div>)}</div>:<Empty icon={CalendarDays} title={tab==='due'?'Tudo em dia!':tab==='upcoming'?'Sem revisões agendadas':'Nenhuma revisão concluída'} action={tab!=='done'&&<button className="text-link" onClick={()=>navigate('edital')}>Ver edital <ArrowRight size={14}/></button>}/>}
 </Panel>
 <details className="ux-inline-help"><summary>Como funciona?</summary><p>Após estudar ou revisar, escolha quanto assimilou: 1 = 48h, 2 = 7 dias, 3 = 14 dias ou 4 = 42 dias. Uma nova revisão será marcada automaticamente.</p></details>
 {selected&&<AssimilationPicker title="Como foi a revisão?" subject={selected.topic.title} working={working} onClose={()=>setSelected(null)} submitLabel="Concluir e reagendar" onConfirm={level=>action(`reviews/${selected.id}/complete`,'PATCH',{level},'Revisão concluída e próxima data agendada.')}/>}
 </div>;
}
