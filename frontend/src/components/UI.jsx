import React, {useEffect,useRef} from 'react';
import { X, Trash2, Inbox } from 'lucide-react';
import { masteryLabels, statusLabels, fmtPercent } from '../utils.js';

export function Modal({title,subtitle,onClose,children,wide=false}) {
  const panel=useRef(null),latestClose=useRef(onClose);
  latestClose.current=onClose;
  useEffect(()=>{
    const previous=document.activeElement,oldOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const getItems=()=>[...(panel.current?.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')||[])].filter(el=>el.getClientRects().length>0);
    const frame=requestAnimationFrame(()=>{const auto=panel.current?.querySelector('[autofocus]');(auto||getItems()[0]||panel.current)?.focus()});
    const onKey=e=>{
      if(e.key==='Escape'){e.stopPropagation();latestClose.current();}
      if(e.key==='Tab'){
        const items=getItems();if(!items.length){e.preventDefault();return;}
        if(e.shiftKey&&document.activeElement===items[0]){e.preventDefault();items[items.length-1].focus();}
        else if(!e.shiftKey&&document.activeElement===items[items.length-1]){e.preventDefault();items[0].focus();}
      }
    };
    document.addEventListener('keydown',onKey);
    return ()=>{cancelAnimationFrame(frame);document.removeEventListener('keydown',onKey);document.body.style.overflow=oldOverflow;previous?.focus?.()};
  },[]);
  return <div className="modal-overlay" onMouseDown={(e)=>{if(e.target===e.currentTarget) onClose();}} role="presentation">
    <div ref={panel} tabIndex={-1} className={`modal-panel ${wide?'modal-wide':''}`} role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal-top"><div><h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div><button type="button" className="icon-button" onClick={onClose} aria-label="Fechar"><X size={20}/></button></div>
      <div className="modal-body">{children}</div>
    </div>
  </div>;
}
export function Field({label,hint,children}) {return <label className="field"><span className="field-label">{label}</span>{children}{hint&&<span className="field-hint">{hint}</span>}</label>;}
export function PrimaryButton({children,loading=false,disabled=false,...props}) {return <button className="btn btn-primary" disabled={loading||disabled} {...props}>{children}</button>;}
export function SubtleButton({children,...props}) {return <button className="btn btn-subtle" {...props}>{children}</button>;}
export function DeleteButton({onClick,label='Excluir'}) {return <button className="icon-button danger-hover" title={label} aria-label={label} onClick={onClick}><Trash2 size={16}/></button>;}
export function Panel({title,subtitle,action,children,className=''}) {return <section className={`panel ${className}`}><div className="panel-heading"><div><h3>{title}</h3>{subtitle&&<p>{subtitle}</p>}</div>{action}</div>{children}</section>;}
export function Empty({title='Nada por aqui ainda',description='Comece adicionando um registro.',icon:Icon=Inbox,action}) {return <div className="empty"><span className="empty-icon"><Icon size={23}/></span><h4>{title}</h4><p>{description}</p>{action}</div>;}
export function TopicSelect({topics,value,onChange,placeholder='Selecione um assunto',required=true,disabled=false}) {
  const byDiscipline=Object.groupBy ? Object.groupBy(topics,t=>t.discipline.name) : topics.reduce((acc,t)=>{(acc[t.discipline.name]||=[]).push(t); return acc;},{});
  return <select required={required} disabled={disabled} value={value} onChange={e=>onChange(e.target.value)}><option value="">{placeholder}</option>{Object.entries(byDiscipline).map(([name,items])=><optgroup key={name} label={name}>{items.map(t=><option key={t.id} value={t.id}>{t.title}</option>)}</optgroup>)}</select>;
}
export function MasteryPill({value}) {return <span className={`mastery-pill mastery-${value?.toLowerCase()||'weak'}`}><span className="circle"/>{masteryLabels[value]||'Fraco'}</span>;}
export function StatusPill({value}) {return <span className={`status-pill status-${value?.toLowerCase()||'not_started'}`}>{statusLabels[value]||'A iniciar'}</span>;}
export function AccuracyTag({correct,total}) {const v=total?correct*100/total:0;return <span className={`accuracy-tag ${v>=80?'good':v>=60?'medium':'low'}`}>{fmtPercent(v)}</span>;}
export function ProgressBar({value,color='var(--accent)',height=7}) {return <div className="progress-track" style={{height}}><div className="progress-fill" style={{width:`${Math.max(0,Math.min(100,value||0))}%`,background:color}}/></div>;}
export function Tip({children}) {return <div className="tip"><span className="tip-dot"/> {children}</div>;}
export function SectionIntro({kicker,title,description,action}) {return <div className="section-intro"><div>{kicker&&<span className="eyebrow">{kicker}</span>}<h2>{title}</h2>{description&&<p>{description}</p>}</div>{action&&<div className="intro-action">{action}</div>}</div>;}
