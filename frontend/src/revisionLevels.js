export const REVISION_LEVELS = [
 {level:1,label:'Não assimilei',short:'Reestudar',days:2,explain:'Preciso rever a teoria.'},
 {level:2,label:'Vou esquecer logo',short:'Inseguro',days:7,explain:'Lembro parcialmente.'},
 {level:3,label:'Assimilei bem',short:'Bom',days:14,explain:'A lembrança parece estável.'},
 {level:4,label:'Domino o assunto',short:'Forte',days:42,explain:'Tenho confiança no conteúdo.'},
];
export const revisionDays=level=>REVISION_LEVELS.find(x=>x.level===Number(level))?.days??7;
export const revisionLabel=level=>REVISION_LEVELS.find(x=>x.level===Number(level))?.label??'A definir';
export const activeReview=r=>r && !r.completedAt && !r.cancelledAt;
