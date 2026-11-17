import React,{useId,useState} from 'react';
import {ArrowRight,Sparkles} from 'lucide-react';

/** Nimbo e suas variações são personagens ORIGINAIS do projeto. SVG local, sem APIs de terceiros. */
export const CREATURES={
 nori:{name:'Nimbo Orvalho',short:'Orvalho',color:'#6dbca5',dark:'#317967',light:'#c5f2df',type:'Sereno',emoji:'🌱'},
 luma:{name:'Nimbo Lavanda',short:'Lavanda',color:'#b4a0d9',dark:'#7561a5',light:'#eae0ff',type:'Calmo',emoji:'🌙'},
 favo:{name:'Nimbo Mel',short:'Mel',color:'#e8b45f',dark:'#a77b32',light:'#ffe6aa',type:'Alegre',emoji:'☀️'},
 brisa:{name:'Nimbo Brisa',short:'Brisa',color:'#8dbbd8',dark:'#517eaa',light:'#d8f1ff',type:'Leve',emoji:'☁️'},
 mimo:{name:'Nimbo Coral',short:'Coral',color:'#eaa6b6',dark:'#a96583',light:'#ffe0e7',type:'Gentil',emoji:'💗'},
 foli:{name:'Nimbo Floresta',short:'Floresta',color:'#93b37c',dark:'#557943',light:'#d9ebbe',type:'Atento',emoji:'🍃'},
 fira:{name:'Nimbo Pôr do Sol',short:'Crepúsculo',color:'#e7a08c',dark:'#a15b49',light:'#ffdccb',type:'Corajoso',emoji:'✨'},
 tuca:{name:'Nimbo Lago',short:'Lago',color:'#8bd3ce',dark:'#3e9496',light:'#d0faf1',type:'Curioso',emoji:'💧'},
 duna:{name:'Nimbo Areia',short:'Areia',color:'#d2b69d',dark:'#937664',light:'#f8e8d5',type:'Tranquilo',emoji:'🌾'},
 noa:{name:'Nimbo Noite',short:'Noite',color:'#8c97bd',dark:'#505c86',light:'#ccd6f3',type:'Sonhador',emoji:'⭐'},
 iris:{name:'Nimbo Aurora',short:'Aurora',color:'#ad9bd2',dark:'#705d9e',light:'#e6d8ff',type:'Criativo',emoji:'🌈'}
};
export const speciesInfo=(species)=>CREATURES[species]||CREATURES.nori;
export const displayName=(species,stage=1)=>`${speciesInfo(species).name}${stage===3?' · radiante':stage===2?' · desperto':''}`;
export function PetArt({species='nori',stage=1,large=false,mood='normal',onClick}){
 const p=speciesInfo(species);const unique=useId().replace(/:/g,'');
 return <svg className={`nimbo-art ${large?'nimbo-big':''} nimbo-${mood}`} viewBox="0 0 300 288" role="img" aria-label={`Ilustração original de ${displayName(species,stage)}`} onClick={onClick}>
  <defs>
   <radialGradient id={`body-${unique}`} cx="37%" cy="24%" r="74%"><stop offset="0" stopColor={p.light}/><stop offset="0.48" stopColor={p.color}/><stop offset="1" stopColor={p.dark}/></radialGradient>
   <linearGradient id={`leaf-${unique}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f3ecc1"/><stop offset="1" stopColor={p.dark}/></linearGradient>
   <radialGradient id={`shine-${unique}`}><stop stopColor="#fff" stopOpacity=".9"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient>
   <filter id={`blur-${unique}`}><feGaussianBlur stdDeviation="7"/></filter>
   <filter id={`shadow-${unique}`} x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="7" stdDeviation="8" floodColor="#23463e" floodOpacity=".24"/></filter>
  </defs>
  <ellipse cx="150" cy="264" rx="78" ry="10" fill="#244d45" opacity=".13" filter={`url(#blur-${unique})`}/>
  <g className="nimbo-orbit" opacity={stage>=2?1:.5}>
   <circle cx="50" cy="106" r="5" fill={p.light}/><circle cx="244" cy="81" r="6" fill="#ffebae"/><circle cx="250" cy="192" r="3" fill="#fff"/>
   {stage===3&&<><path d="M69 39l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#fae5a2"/><path d="M247 39l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#fff"/></>}
  </g>
  <g className="nimbo-float" filter={`url(#shadow-${unique})`}>
   <path d="M110 99Q71 68 76 26Q104 34 129 89Z" fill={p.dark}/><path d="M187 91Q219 45 245 35Q240 89 207 114Z" fill={p.dark}/>
   <path d="M110 91Q91 67 88 45Q107 56 120 92Z" fill={p.light} opacity=".8"/>
   <path d="M202 89Q224 64 230 53Q225 83 210 99Z" fill={p.light} opacity=".8"/>
   {stage>=2&&<g className="nimbo-crown"><path d="M127 84Q116 42 135 15Q160 30 153 77Z" fill={`url(#leaf-${unique})`}/><path d="M162 82Q163 39 183 19Q202 55 182 89Z" fill={p.light}/></g>}
   {stage>=3&&<><circle cx="118" cy="62" r="10" fill="#fff1ba" opacity=".75"/><circle cx="195" cy="71" r="8" fill="#fff6d5" opacity=".8"/></>}
   <path d="M84 173Q67 167 59 178Q53 192 81 205" fill={p.dark}/>
   <path d="M222 170Q240 164 247 179Q251 193 223 207" fill={p.dark}/>
   <path d="M101 221Q84 254 116 254L130 230M176 231Q181 255 201 251Q217 247 196 217" stroke={p.dark} strokeWidth="18" strokeLinecap="round" fill="none"/>
   <path d="M151 72C99 66 72 110 69 167C65 213 91 246 143 251C204 258 234 230 233 172C233 118 212 80 151 72Z" fill={`url(#body-${unique})`}/>
   <ellipse cx="111" cy="123" rx="28" ry="36" fill={`url(#shine-${unique})`} opacity=".38" transform="rotate(-26 111 123)"/>
   <ellipse cx="151" cy="215" rx="55" ry="22" fill={p.light} opacity=".36"/>
   <g className="nimbo-face">
    <ellipse className="nimbo-eye" cx="117" cy="161" rx="8" ry={mood==='tired'?3:11} fill="#263e3d"/>
    <ellipse className="nimbo-eye" cx="184" cy="161" rx="8" ry={mood==='tired'?3:11} fill="#263e3d"/>
    <ellipse cx="114" cy="156" rx="2.5" ry="3.6" fill="#fff"/><ellipse cx="181" cy="156" rx="2.5" ry="3.6" fill="#fff"/>
    <ellipse cx="98" cy="182" rx="16" ry="9" fill="#efaa9f" opacity=".56"/><ellipse cx="204" cy="182" rx="16" ry="9" fill="#efaa9f" opacity=".56"/>
    <path d={mood==='sad'?'M139 203Q151 193 162 204':mood==='happy'?'M137 196Q149 216 165 194':'M141 198Q151 205 160 197'} stroke="#3b4e4b" strokeWidth="4.2" strokeLinecap="round" fill="none"/>
   </g>
   <path d="M91 216C77 223 80 233 89 235" stroke={p.light} strokeWidth="4" strokeLinecap="round" opacity=".7" fill="none"/>
  </g>
 </svg>;
}
export function PetPicker({onSelect,working,availableSpecies=Object.keys(CREATURES),compact=false}){
 const [selected,setSelected]=useState(availableSpecies[0]||'nori');
 const chosen=availableSpecies.includes(selected)?selected:availableSpecies[0];
 return <section className={`nimbo-picker ${compact?'nimbo-picker-small':''}`}>
  <div className="nimbo-intro"><span className="eyebrow">SEU COMPANHEIRO ORIGINAL</span><h2>Conheça os Nimbos.</h2><p>Pequenos guardiões da constância. Eles evoluem com seu tempo de estudo, questões e revisões. Cada variação tem seu próprio progresso.</p></div>
  <div className="nimbo-options">{availableSpecies.map(k=><button type="button" className={`nimbo-choice ${chosen===k?'active':''}`} key={k} onClick={()=>setSelected(k)} aria-pressed={chosen===k}><PetArt species={k}/><strong>{speciesInfo(k).short}</strong><small>{speciesInfo(k).type}</small></button>)}</div>
  <button className="btn btn-primary" disabled={working||!chosen} onClick={()=>onSelect(chosen)}><Sparkles size={17}/> Começar com {speciesInfo(chosen).short} <ArrowRight size={17}/></button>
 </section>;
}
export default function Pet({pet,navigate}){return <div className="nimbo-hero-card"><PetArt species={pet.species} stage={pet.stage} large/><div><span className="eyebrow">SEU COMPANHEIRO</span><h2>{displayName(pet.species,pet.stage)}</h2><p>{pet.xp} XP conquistados estudando.</p><button className="btn btn-primary" onClick={()=>navigate('cycle')}>Iniciar estudo <ArrowRight size={16}/></button></div></div>}
