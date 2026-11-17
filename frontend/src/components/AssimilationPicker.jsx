import React,{useState} from 'react';
import {Modal} from './UI.jsx';
import {REVISION_LEVELS} from '../revisionLevels.js';
export default function AssimilationPicker({title='Como você assimilou?',subject,onConfirm,onClose,working,submitLabel='Confirmar revisão'}){
 const [level,setLevel]=useState(2);
 const submit=async()=>{const ok=await onConfirm(level);if(ok)onClose()};
 return <Modal title={title} onClose={onClose}>
   <div className="assimilation-picker">
     {subject&&<p className="assimilation-subject">{subject}</p>}
     <div className="assimilation-options" role="radiogroup" aria-label="Nível de assimilação">
      {REVISION_LEVELS.map(item=><label key={item.level} className={`assimilation-choice ${level===item.level?'selected':''}`}>
        <input type="radio" name="assimilation" value={item.level} checked={level===item.level} onChange={()=>setLevel(item.level)}/>
        <span className="assimilation-number">{item.level}</span>
        <span className="assimilation-copy"><strong>{item.label}</strong><small>{item.explain}</small></span>
        <span className="assimilation-days">{item.days} dias</span>
      </label>)}
     </div>
     <div className="assimilation-footer"><button className="btn btn-subtle" type="button" onClick={onClose}>Cancelar</button><button className="btn btn-primary" type="button" onClick={submit} disabled={working}>{submitLabel}</button></div>
   </div>
 </Modal>;
}
