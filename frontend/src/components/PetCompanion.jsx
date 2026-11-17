import React,{useEffect,useState} from 'react';
import {ChevronUp,ChevronDown,Heart,Star,MessageCircle, X, Moon, HandHeart, SmilePlus, Volume2, VolumeX, Send, Sparkles} from 'lucide-react';
import {PetArt,PetPicker,displayName,speciesInfo} from './Pet.jsx';

const starters=['Vamos avançar um pouquinho hoje?','Consistência vale mais do que pressa.','Seu esforço está criando raízes.','Um assunto de cada vez. Eu fico aqui com você.'];
function reply(text,pet){const s=text.toLowerCase();if(/cans|sono|descans|dorm/.test(s))return 'Descansar também faz parte do plano. Que tal uma pausa de verdade?';if(/prova|concurso|edital/.test(s))return 'A prova se aproxima por etapas. Vamos resolver o próximo assunto juntos.';if(/trist|desanim|dif[ií]cil/.test(s))return 'Um dia difícil não apaga tudo que você já estudou. Podemos fazer só 15 minutos.';if(/quest|err/.test(s))return 'Cada erro revela um tema para reforçar. Anote o motivo e tente de novo.';if(/obrig|oi|ol[aá]/.test(s))return 'Oi! Estou por aqui. Vamos conquistar uma pequena meta hoje?';return pet.energy<30?'Estou um pouco cansado. Podemos ir com calma.':starters[Math.floor(s.length%starters.length)];}
export default function PetCompanion({pet,navigate,reaction,action,working}){
 const [open,setOpen]=useState(()=>{const saved=localStorage.getItem('nimbo:open');return saved!==null?saved==='true':window.matchMedia('(min-width: 900px)').matches});
 const [chat,setChat]=useState(false),[message,setMessage]=useState('');
 const [line,setLine]=useState('Eu acompanho seus passos.');
 const [speaking,setSpeaking]=useState(false),[spark,setSpark]=useState(false);
 const mood=reaction||(pet?.energy<=22?'tired':pet?.energy<=42?'sad':pet?.energy>=78?'happy':'normal');
 useEffect(()=>{if(reaction){setLine(reaction==='happy'?'Uhu! Mais um passo na direção da sua meta!':'Tudo bem errar. Vamos aprender com isso.');setSpark(true);const t=setTimeout(()=>setSpark(false),1800);return()=>clearTimeout(t)}},[reaction]);
 const toggle=()=>{localStorage.setItem('nimbo:open',String(!open));setOpen(!open)};
 const speak=t=>{if(!speaking||!('speechSynthesis' in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='pt-BR';u.rate=1.08;window.speechSynthesis.speak(u)};
 const say=t=>{setLine(t);speak(t)};
 const interact=async type=>{if(working)return;const ok=await action('pet/interact','POST',{action:type},'Nimbo gostou da atenção!');if(ok)say({PET:'Carinho recebido! Obrigado por cuidar de mim.',PLAY:'Foi divertido! Que tal um bloco de foco agora?',REST:'Boa ideia. Até os guardiões precisam descansar.',TALK:'Eu gosto de conversar com você.'}[type]);};
 const send=e=>{e.preventDefault();if(!message.trim())return;const answer=reply(message,pet);setMessage('');say(answer);};
 if(!pet)return <div className="nimbo-onboarding-floating"><button className="nimbo-tab" onClick={toggle}><Sparkles size={18}/> {open?'Fechar':'Conhecer Nimbo'}</button>{open&&<div className="nimbo-first">Comece escolhendo um Nimbo na página inicial.</div>}</div>;
 return <div className={`nimbo-widget ${open?'is-open':'is-closed'}`}>
  {!open?<button className="nimbo-tab" onClick={toggle}><span className="nimbo-tab-avatar"><PetArt species={pet.species} stage={pet.stage} mood={mood}/></span><span><strong>{speciesInfo(pet.species).short}</strong><small>Nível {pet.level} · Energia {pet.energy}%</small></span><ChevronUp size={18}/></button>:
   <section className="nimbo-panel" aria-label="Seu companheiro Nimbo">
    <header className="nimbo-panel-head"><span className="nimbo-live"><i/> COMPANHEIRO</span><div><button title="Ativar ou desativar voz" className="nimbo-tool" onClick={()=>setSpeaking(!speaking)}>{speaking?<Volume2 size={16}/>:<VolumeX size={16}/>}</button><button className="nimbo-tool" aria-label="Recolher companheiro" onClick={toggle}><ChevronDown size={19}/></button></div></header>
    <div className={`nimbo-habitat ${spark?'is-sparkling':''}`}><div className="nimbo-light"/><span className="nimbo-star star-a">✧</span><span className="nimbo-star star-b">✦</span><button className="nimbo-art-button" title="Dar carinho" onClick={()=>interact('PET')} disabled={working}><PetArt species={pet.species} stage={pet.stage} mood={mood} large/></button><span className="nimbo-floor"/></div>
    <div className="nimbo-panel-body"><div className="nimbo-title"><div><h3>{speciesInfo(pet.species).name}</h3><small>Nível {pet.level} · {pet.stage===3?'Forma radiante':`Estágio ${pet.stage}/3`}</small></div><span className="nimbo-mood">{mood==='happy'?'Radiante':mood==='tired'?'Cansado':mood==='sad'?'Quietinho':'Tranquilo'}</span></div>
    <div className="nimbo-meter-label"><span><Heart size={13}/> Energia</span><b>{pet.energy}%</b></div><div className="nimbo-meter"><i style={{width:`${pet.energy}%`}}/></div>
    <div className="nimbo-meter-label"><span><Star size={13}/> Experiência</span><b>{pet.xp} XP</b></div><div className="nimbo-meter xp"><i style={{width:`${pet.xpToNextStage?Math.min(100,100*pet.xpWithinStage/pet.xpToNextStage):100}%`}}/></div>
    <div className="nimbo-bubble"><MessageCircle size={16}/><span>{line}</span></div>
    <div className="nimbo-actions"><button onClick={()=>interact('PLAY')} disabled={working}><SmilePlus size={16}/> Brincar</button><button onClick={()=>interact('REST')} disabled={working}><Moon size={16}/> Descansar</button><button onClick={()=>setChat(!chat)}><MessageCircle size={16}/> Conversar</button></div>
    {chat&&<form className="nimbo-chat" onSubmit={send}><input value={message} onChange={e=>setMessage(e.target.value)} maxLength={180} placeholder="Conte como está seu dia..." aria-label="Mensagem para Nimbo"/><button type="submit" aria-label="Enviar mensagem"><Send size={16}/></button></form>}
    <button className="nimbo-collection-link" onClick={()=>navigate('collection')}>Ver meus companheiros <span>→</span></button>
    </div>
   </section>}
 </div>;
}
