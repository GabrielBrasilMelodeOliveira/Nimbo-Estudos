import React,{useEffect,useState} from 'react';
import { Target, Save, BookOpenText, ShieldAlert } from 'lucide-react';
import DangerZone from '../components/DangerZone.jsx';
import { Panel, Field, PrimaryButton, ProgressBar } from '../components/UI.jsx';
export default function Settings({data,action,working}) {
  const [form,setForm]=useState({name:data.plan?.name||'',examDate:data.plan?.examDate||'',weeklyGoalHours:String((data.plan?.weeklyGoalMinutes||900)/60),weeklyGoalTopics:String(data.plan?.weeklyGoalTopics||5)});
  useEffect(()=>{setForm({name:data.plan?.name||'',examDate:data.plan?.examDate||'',weeklyGoalHours:String((data.plan?.weeklyGoalMinutes||0)/60),weeklyGoalTopics:String(data.plan?.weeklyGoalTopics||0)});},[data.plan]);
  const submit=e=>{e.preventDefault();return action('plan','PUT',{name:form.name,examDate:form.examDate||null,weeklyGoalMinutes:Math.round(Number(form.weeklyGoalHours)*60),weeklyGoalTopics:Number(form.weeklyGoalTopics)},'Plano atualizado!');};
  return <div className="view-stack settings-view"><Panel title="Meu projeto de aprovação" >
    <form className="settings-form" onSubmit={submit}><div className="settings-group"><div className="settings-group-head"><span className="settings-icon blue"><BookOpenText size={21}/></span><div><h4>Informações do concurso</h4></div></div>
      <div className="form-grid"><Field label="Nome do concurso"><input required maxLength="140" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Ex.: Banco do Brasil — Agente de Tecnologia"/></Field><Field label="Data da prova (se souber)"><input type="date" value={form.examDate} onChange={e=>setForm({...form,examDate:e.target.value})}/></Field></div></div>
    <div className="settings-group"><div className="settings-group-head"><span className="settings-icon teal"><Target size={21}/></span><div><h4>Minhas metas semanais</h4></div></div>
      <div className="form-grid"><Field label="Horas líquidas por semana"><input required type="number" min="0" max="168" step="0.5" value={form.weeklyGoalHours} onChange={e=>setForm({...form,weeklyGoalHours:e.target.value})}/></Field><Field label="Novos tópicos de teoria por semana"><input required type="number" min="0" max="100" value={form.weeklyGoalTopics} onChange={e=>setForm({...form,weeklyGoalTopics:e.target.value})}/></Field></div>
    </div><div className="settings-actions"><PrimaryButton type="submit" loading={working}><Save size={17}/> Salvar configurações</PrimaryButton></div></form>
  </Panel>
  <Panel title="Gerenciar e limpar dados" >
    <details className="maintenance-details"><summary>Mostrar opções de exclusão em massa</summary>
      <div className="maintenance-grid">
        {[
         {scope:'edital',title:'Excluir edital completo',description:'Remove disciplinas, assuntos, questões, revisões, sessões e anotações vinculadas. Materiais são desvinculados, não excluídos.',count:data.disciplines.length+data.topics.length},
         {scope:'topics',title:'Excluir todos os assuntos',description:'Apaga assuntos e seus registros dependentes (questões, erros, sessões e revisões), preservando as disciplinas e os materiais desvinculados.',count:data.topics.length},
         {scope:'questions',title:'Excluir questões',description:'Exclui todos os blocos de questões registrados.',count:data.questions.length},
         {scope:'errors',title:'Excluir caderno de erros',description:'Remove todas as anotações e referências aos prints.',count:data['error-notes'].length},
         {scope:'sessions',title:'Excluir horas de estudo',description:'Apaga todas as sessões de estudo.',count:data['study-sessions'].length},
         {scope:'reviews',title:'Excluir revisões',description:'Apaga toda a fila de revisão pendente e concluída.',count:data.reviews.length},
         {scope:'exams',title:'Excluir simulados',description:'Remove o histórico de simulados.',count:data['mock-exams'].length},
         {scope:'materials',title:'Excluir biblioteca',description:'Remove registros da biblioteca, preservando os arquivos binários no banco.',count:data.materials.length},
         {scope:'agenda',title:'Excluir agenda',description:'Apaga todos os compromissos pessoais e acadêmicos.',count:data.agenda.length},
         {scope:'all',title:'Zerar estudos e agenda',description:'Exclui edital, questões, erros, revisões, sessões, simulados, materiais e agenda. Conserva preferências, mascote e blobs de arquivos no PostgreSQL. Faça backup primeiro.',count:data.disciplines.length+data.topics.length+data.questions.length+data['error-notes'].length+data.reviews.length+data['study-sessions'].length+data['mock-exams'].length+data.materials.length+data.agenda.length}
        ].map(x=><div className="maintenance-option" key={x.scope}><div><strong>{x.title}</strong><span>{x.count} registros indicativos</span></div><DangerZone scope={x.scope} title={x.title} description={x.description} count={x.count} action={action} working={working}/></div>)}
      </div><p className="maintenance-hint">Os totais representam as categorias da tela, não necessariamente o número de linhas apagadas em cascata. A exclusão é definitiva e não recalcula o XP. Faça backup do PostgreSQL antes.</p>
    </details>
  </Panel><details className="ux-inline-help ux-security"><summary>Sobre segurança e uso local</summary><p>Este projeto não possui autenticação. Antes de disponibilizá-lo na internet, configure login, HTTPS e proteção dos dados.</p></details></div>;
}
