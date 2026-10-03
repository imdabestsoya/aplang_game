import { canAnswer, initialJudge } from '../../engine/judge/game';
import type { JudgeState } from '../../engine/judge/game';
import { cases, connections, quotes, townMaps } from '../../content/judge';
export const JUDGE_KEY='the-weight:judge:v1';
const ints=(n:unknown,min:number,max:number)=>Number.isSafeInteger(n)&&(n as number)>=min&&(n as number)<=max;
const strings=(v:unknown):v is string[]=>Array.isArray(v)&&v.every(i=>typeof i==='string')&&new Set(v).size===v.length;
export function validJudge(value:unknown):value is JudgeState {
  try {
    if(!value||typeof value!=='object')return false;const s=value as JudgeState;
    if(!ints(s.revision,0,Number.MAX_SAFE_INTEGER)||!ints(s.day,1,cases.length)||!ints(s.reputation,0,100)||!ints(s.hysteria,0,100)||!['explore','consequence','ended'].includes(s.phase)||!townMaps.some(m=>m.id===s.location)||!s.positions||Array.isArray(s.positions)||typeof s.consequence!=='string'||typeof s.openRecord!=='boolean'||typeof s.publicWitness!=='boolean')return false;
    if(!strings(s.evidence)||s.evidence.some(id=>!townMaps.some(m=>m.interactions.some(i=>i.id===id)))||!strings(s.connections)||s.connections.some(id=>!connections.some(c=>c.id===id&&c.clues.every(clue=>s.evidence.includes(clue)))))return false;
    if(Object.keys(s.positions).length!==townMaps.length)return false;
    for(const m of townMaps){const p=s.positions[m.id];if(!p||!ints(p.x,0,m.width-1)||!ints(p.y,0,m.height-1)||m.walkable[p.y][p.x]!=='1'||!['north','south','east','west'].includes(p.direction)||!strings(p.inspected)||p.inspected.some(id=>!m.interactions.some(i=>i.id===id)||!s.evidence.includes(id)))return false;}
    if(!Array.isArray(s.shame)||s.shame.length>8||s.shame.some(i=>!i||!ints(i.day,1,s.day)||typeof i.reason!=='string')||!Array.isArray(s.recanted)||new Set(s.recanted).size!==s.recanted.length||s.recanted.some(i=>!ints(i,0,s.shame.length-1)))return false;
    if(!strings(s.quotes)||!strings(s.seenQuotes)||[...s.quotes,...s.seenQuotes].some(id=>!Object.hasOwn(quotes,id))||s.quotes.some(id=>!s.seenQuotes.includes(id)))return false;
    if(!Array.isArray(s.history)||s.history.length!==(s.phase==='explore'?s.day-1:s.day)||s.history.some((h,i)=>!h||h.day!==i+1||h.caseId!==cases[i].id||!['defend','accuse'].includes(h.choice)||!ints(h.reputation,0,100)||!ints(h.hysteria,0,100)))return false;
    const last=s.history.at(-1);
    const expected=last??{reputation:62,hysteria:30};
    if(s.reputation!==expected.reputation||s.hysteria!==expected.hysteria)return false;
    if(s.phase==='consequence'&&s.day===cases.length)return false;
    if(s.history.slice(0,-1).some(h=>h.reputation===0||h.hysteria===100))return false;
    if(s.hysteria===100&&s.ending!=='chaos')return false;
    if(s.reputation===0&&s.hysteria<100&&s.ending!=='condemned')return false;
    if(s.ending==='condemned'&&s.reputation>0&&(s.day!==8||last?.choice!=='defend'||canAnswer(s)))return false;
    if((s.ending!==null)!==(s.phase==='ended')||s.ending!==null&&!['won','chaos','condemned','compromised'].includes(s.ending))return false;
    if(s.phase!=='ended'&&(s.reputation===0||s.hysteria===100))return false;
    if(s.ending==='chaos'&&s.hysteria!==100)return false;
    if(s.ending==='compromised'&&(s.day!==8||s.history.at(-1)?.choice!=='accuse'))return false;
    if(s.ending==='won'&&(s.day!==8||s.history.at(-1)?.choice!=='defend'||s.connections.length!==3||!s.openRecord||!s.publicWitness||!s.shame.every((_,i)=>s.recanted.includes(i))))return false;
    return true;
  }catch{return false;}
}
export function saveJudge(state:JudgeState):string|null {try{localStorage.setItem(JUDGE_KEY,JSON.stringify({version:1,content:'town-judge-1',state}));return null;}catch{return 'Progress could not be saved. You can play in this tab, but refreshing may lose new decisions.';}}
export function loadJudge():{state:JudgeState;canSave:boolean;issue:string|null} {try{const raw=localStorage.getItem(JUDGE_KEY);if(raw===null)return {state:initialJudge(),canSave:true,issue:null};const data=JSON.parse(raw);if(data.version!==1||data.content!=='town-judge-1'||!validJudge(data.state))throw Error('invalid');return {state:data.state,canSave:true,issue:null};}catch{return {state:initialJudge(),canSave:false,issue:'Judge progress could not be loaded. Continue without saving or explicitly replace this save in Settings.'};}}
