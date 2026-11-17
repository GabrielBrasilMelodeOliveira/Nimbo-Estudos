import React,{useMemo,useState} from 'react';
import {NotebookPen,Plus,AlertTriangle,BookOpenText,CircleCheck,Search,ImagePlus,Expand,ClipboardPaste,Camera,X,RotateCcw,Filter} from 'lucide-react';
import {Panel,Modal,Field,PrimaryButton,SubtleButton,Empty,TopicSelect,DeleteButton} from '../components/UI.jsx';
import {uploadFile,fileUrl} from '../api.js';
import DangerZone from '../components/DangerZone.jsx';
import {dateBR} from '../utils.js';
const blank={topicId:'',source:'',trap:'',correctAnswer:'',recurring:false,questionImageId:null,answerImageId:null};
function ScreenshotInput({id,label,onChange,disabled}){
 const [loading,setLoading]=useState(false),[error,setError]=useState('');
 const send=async file=>{if(!file)return;setError('');setLoading(true);
  try {if(!/\.(png|jpe?g|webp)$/i.test(file.name))throw new Error('Envie uma imagem PNG, JPG ou WEBP.');
   const uploaded=await uploadFile(file);if(!uploaded.type.startsWith('image/'))throw new Error('Este arquivo não é uma imagem.');onChange(uploaded.id);
  }catch(e){setError(e.message);}finally{setLoading(false);}
 };
 const paste=e=>{const image=Array.from(e.clipboardData?.items||[]).find(item=>item.type.startsWith('image/'));
  if(image){e.preventDefault();const original=image.getAsFile();if(original){const ext=image.type==='image/jpeg'?'jpg':image.type==='image/webp'?'webp':'png';const file=new File([original],`captura-${Date.now()}.${ext}`,{type:image.type});send(file);}}};
 return <div className="screenshot-input" onPaste={paste} tabIndex={0} aria-label={`${label}; clique aqui e pressione Control V para colar uma captura`}>
  <div className="screenshot-title"><Camera size={17}/><strong>{label}</strong></div>
  {id?<div className="screenshot-selected"><img src={fileUrl(id)} alt={`Print da ${label.toLowerCase()}`}/><button type="button" className="btn btn-subtle" onClick={()=>onChange(null)}>Remover captura</button></div>:
  <div className="screenshot-drop"><ImagePlus size={22}/><span>Envie um print ou cole uma captura do computador.</span><label className="screenshot-file-button">Selecionar imagem<input type="file" accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp" disabled={disabled||loading} aria-label={`Enviar ${label}`} onChange={e=>send(e.target.files?.[0])}/></label><button type="button" className="screenshot-paste-button" onClick={e=>e.currentTarget.closest('.screenshot-input')?.focus()}><ClipboardPaste size={14}/> Colar com Ctrl + V</button></div>}
  {loading&&<small>Enviando imagem...</small>}{error&&<small className="input-error">{error}</small>}
 </div>;
}
export default function ErrorNotes({data,action,working}){
 const [open,setOpen]=useState(false),[form,setForm]=useState(blank),[zoom,setZoom]=useState(null);
 const [search,setSearch]=useState(''),[discipline,setDiscipline]=useState('all'),[topic,setTopic]=useState('all');
 const [recurring,setRecurring]=useState('all'),[photo,setPhoto]=useState('all'),[from,setFrom]=useState(''),[to,setTo]=useState(''),[order,setOrder]=useState('recent');
 const notes=data['error-notes']||[];
 const allowedTopics=data.topics.filter(t=>discipline==='all'||String(t.discipline.id)===discipline);
 const visible=useMemo(()=>notes.filter(n=>{
  const images=[n.questionImageId,n.answerImageId].filter(Boolean).length;
  return (discipline==='all'||String(n.topic.discipline.id)===discipline)
   &&(topic==='all'||String(n.topic.id)===topic)
   &&(recurring==='all'||String(!!n.recurring)===recurring)
   &&(photo==='all'||(photo==='both'&&images===2)||(photo==='missing'&&images<2)||(photo==='some'&&images>0))
   &&(from===''||n.createdAt>=from)&&(to===''||n.createdAt<=to)
   &&`${n.topic.title} ${n.topic.discipline.name} ${n.source} ${n.trap} ${n.correctAnswer}`.toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR'));
 }).sort((a,b)=>order==='oldest'?a.createdAt.localeCompare(b.createdAt)||a.id-b.id:order==='topic'?a.topic.title.localeCompare(b.topic.title,'pt-BR'):b.createdAt.localeCompare(a.createdAt)||b.id-a.id),[notes,search,discipline,topic,recurring,photo,from,to,order]);
 const reset=()=>{setSearch('');setDiscipline('all');setTopic('all');setRecurring('all');setPhoto('all');setFrom('');setTo('');setOrder('recent')};
 const save=async e=>{e.preventDefault();if(await action('error-notes','POST',{...form,topicId:Number(form.topicId)},'Erro salvo com suas capturas!')){setOpen(false);setForm(blank)}};
 const recurringCount=visible.filter(n=>n.recurring).length,withPhotos=visible.filter(n=>n.questionImageId||n.answerImageId).length;
 return <div className="view-stack"><div className="section-toolbar"><span className="toolbar-info"><NotebookPen size={19}/> Seus erros registrados</span><div className="toolbar-buttons"><PrimaryButton onClick={()=>setOpen(true)}><Plus size={18}/> Anotar erro</PrimaryButton></div></div>
 
 <Panel title="Encontrar anotação">
  <div className="filter-workspace">
   <label className="filter-item filter-search"><span>Buscar</span><div className="search-wrap"><Search size={17}/><input type="search" placeholder="Pegadinha, resposta, fonte, assunto..." value={search} onChange={e=>setSearch(e.target.value)}/></div></label>
   <label className="filter-item"><span>Disciplina</span><select value={discipline} onChange={e=>{setDiscipline(e.target.value);setTopic('all')}}><option value="all">Todas as disciplinas</option>{data.disciplines.map(d=><option key={d.id} value={String(d.id)}>{d.name}</option>)}</select></label>
   <label className="filter-item"><span>Assunto</span><select value={topic} onChange={e=>setTopic(e.target.value)}><option value="all">Todos os assuntos</option>{allowedTopics.map(t=><option key={t.id} value={String(t.id)}>{t.title}</option>)}</select></label>
   <details className="ux-more-filters"><summary>Mais filtros</summary><div className="ux-extra-filter-grid">
   <label className="filter-item"><span>Recorrência</span><select value={recurring} onChange={e=>setRecurring(e.target.value)}><option value="all">Todos os erros</option><option value="true">Errei mais de uma vez</option><option value="false">Não recorrentes</option></select></label>
   <label className="filter-item"><span>Capturas anexadas</span><select value={photo} onChange={e=>setPhoto(e.target.value)}><option value="all">Com ou sem prints</option><option value="both">Questão e resposta</option><option value="some">Pelo menos um print</option><option value="missing">Falta algum print</option></select></label>
   <label className="filter-item"><span>De</span><input type="date" value={from} max={to||undefined} onChange={e=>setFrom(e.target.value)}/></label>
   <label className="filter-item"><span>Até</span><input type="date" value={to} min={from||undefined} onChange={e=>setTo(e.target.value)}/></label>
   <label className="filter-item"><span>Ordenação</span><select value={order} onChange={e=>setOrder(e.target.value)}><option value="recent">Mais recentes</option><option value="oldest">Mais antigos</option><option value="topic">Por assunto</option></select></label>
   </div></details>
  </div><div className="filter-foot"><span><strong>{visible.length}</strong> de {notes.length} anotações encontradas</span><button type="button" className="btn btn-subtle" onClick={reset}><RotateCcw size={15}/> Limpar filtros</button></div>
 </Panel>
 <div className="mini-metric-grid"><div className="mini-metric"><div className="mini-icon blue"><NotebookPen size={21}/></div><span>ERROS FILTRADOS</span><strong>{visible.length}</strong><small>Registros no caderno</small></div><div className="mini-metric"><div className="mini-icon purple"><AlertTriangle size={21}/></div><span>RECORRENTES</span><strong>{recurringCount}</strong><small>Erros repetidos</small></div><div className="mini-metric"><div className="mini-icon teal"><Camera size={21}/></div><span>COM PRINTS</span><strong>{withPhotos}</strong><small>Com captura anexada</small></div></div>
 <Panel title="Minhas anotações" action={<span className="small-chip">{visible.length} anotações</span>}>
  {visible.length?<div className="note-grid">{visible.map(n=><article className="note-card" key={n.id}>
   <div className="note-card-top"><span className="note-topic"><BookOpenText size={15}/>{n.topic.title}</span><DeleteButton onClick={()=>{if(window.confirm('Excluir esta anotação?'))action(`error-notes/${n.id}`,'DELETE',undefined,'Anotação excluída.')}}/></div>
   <div className="note-source"><span>{n.source}</span><small>{n.topic.discipline.name} · {dateBR(n.createdAt)}</small></div>{n.recurring&&<span className="repeat-alert"><AlertTriangle size={13}/> Erro recorrente</span>}
   {(n.questionImageId||n.answerImageId)&&<div className="error-screenshots">{[['Questão',n.questionImageId],['Resposta',n.answerImageId]].filter(([,id])=>id).map(([label,id])=><button key={label} onClick={()=>setZoom({label,id})} title={`Ampliar print: ${label}`}><img src={fileUrl(id)} alt={`Print da ${label.toLowerCase()}`}/><span>{label} <Expand size={13}/></span></button>)}</div>}
   <div className="note-block"><span>POR QUE ERREI?</span><p>{n.trap}</p></div><div className="note-block correct-block"><span><CircleCheck size={14}/> COMO RESOLVER</span><p>{n.correctAnswer}</p></div>
  </article>)}</div>:<Empty icon={NotebookPen} title="Nenhum erro para estes filtros" description="Ajuste os filtros ou registre um novo erro."/>}
 </Panel>
 {open&&<Modal title="Registrar erro" subtitle="Você pode enviar dois prints diferentes: enunciado e gabarito." wide onClose={()=>setOpen(false)}><form className="form-stack" onSubmit={save}>
  <Field label="Assunto"><TopicSelect topics={data.topics} value={form.topicId} onChange={v=>setForm({...form,topicId:v})}/></Field>
  <Field label="Fonte da questão"><input required maxLength="220" placeholder="Ex.: Cesgranrio — Questão 32" value={form.source} onChange={e=>setForm({...form,source:e.target.value})}/></Field>
  <div className="screenshot-pair"><ScreenshotInput label="Print da questão" id={form.questionImageId} onChange={id=>setForm(f=>({...f,questionImageId:id}))} disabled={working}/><ScreenshotInput label="Print da resposta" id={form.answerImageId} onChange={id=>setForm(f=>({...f,answerImageId:id}))} disabled={working}/></div>
  <Field label="Qual foi a pegadinha? Por que errei?"><textarea required rows="3" maxLength="20000" value={form.trap} onChange={e=>setForm({...form,trap:e.target.value})}/></Field>
  <Field label="Qual é o raciocínio correto?"><textarea required rows="3" maxLength="20000" value={form.correctAnswer} onChange={e=>setForm({...form,correctAnswer:e.target.value})}/></Field>
  <label className="checkbox-label"><input type="checkbox" checked={form.recurring} onChange={e=>setForm({...form,recurring:e.target.checked})}/> Já errei isso mais de uma vez</label>
  <div className="modal-actions"><SubtleButton type="button" onClick={()=>setOpen(false)}>Cancelar</SubtleButton><PrimaryButton type="submit" loading={working}>Salvar no caderno</PrimaryButton></div>
 </form></Modal>}
 {zoom&&<Modal title={`Print da ${zoom.label.toLowerCase()}`} wide onClose={()=>setZoom(null)}><div className="screenshot-lightbox"><img src={fileUrl(zoom.id)} alt={`Captura de tela: ${zoom.label}`}/><a className="btn btn-subtle" href={fileUrl(zoom.id,true)}>Baixar imagem</a></div></Modal>}
 </div>;
}
