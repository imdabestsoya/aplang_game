import { cases, connections, townMaps } from '../../content/judge';
import type { ConnectionId, QuoteId } from '../../content/judge';
import { initialExploration, move } from '../trail/exploration';
import type { Direction, Exploration } from '../trail/exploration';
export type Ending = 'won'|'chaos'|'condemned'|'compromised';
export interface JudgeState {
  revision:number; day:number; reputation:number; hysteria:number; phase:'explore'|'consequence'|'ended'; location:string;
  positions:Record<string,Exploration>; evidence:string[]; connections:ConnectionId[]; openRecord:boolean; publicWitness:boolean;
  shame:{day:number;reason:string}[]; recanted:number[]; ending:Ending|null; consequence:string; quotes:QuoteId[]; seenQuotes:QuoteId[];
  history:{day:number;caseId:string;choice:'defend'|'accuse';reputation:number;hysteria:number}[];
}
export type JudgeAction = {type:'move';direction:Direction}|{type:'visit';location:string}|{type:'inspect';id:string}|{type:'connect';id:ConnectionId;correct:boolean}|{type:'decide';choice:'defend'|'accuse';day:number;revision:number}|{type:'continue'};
export function initialJudge():JudgeState {return {revision:0,day:1,reputation:62,hysteria:30,phase:'explore',location:'chamber',positions:Object.fromEntries(townMaps.map(m=>[m.id,initialExploration(m)])),evidence:[],connections:[],openRecord:false,publicWitness:false,shame:[],recanted:[],ending:null,consequence:'',quotes:['intro'],seenQuotes:['intro'],history:[]};}
export function completeRecord(s:JudgeState) {return connections.every(c=>s.connections.includes(c.id));}
export function canAnswer(s:JudgeState) {return completeRecord(s)&&s.openRecord&&s.publicWitness&&s.shame.every((_,i)=>s.recanted.includes(i));}
export function rulingHint(s:JudgeState) {
  const c=cases[s.day-1];
  if(c.kind==='final')return canAnswer(s)?"Your evidence is public, and witnesses are ready to back it up.":"Before you refuse, check your record. Have you connected all the evidence, made it public, and corrected any accusation you supported?";
  if(c.kind==='neutral')return completeRecord(s)?"You have enough evidence to demand that accusers answer questions in public.":"Challenging the elders without evidence will hurt your reputation. They will also hold it against you if you try to stay neutral.";
  if(c.kind==='record')return completeRecord(s)&&s.openRecord?"You can now publish the evidence and ask witnesses to speak publicly. You can correct one earlier accusation, but you will keep its Shame badge.":"You need all three evidence connections and an agreement to question accusers publicly before publishing will help.";
  return s.connections.includes(c.proof)?"You have evidence to support a defense. Using it will limit the damage to your reputation and calm some of the fear.":"Defending someone without evidence will cost you more reputation. You can adjourn and investigate first. There is no time limit.";
}
export function judgeTransition(state:JudgeState,action:JudgeAction):{state:JudgeState;error:string|null} {
  const reject=(error:string)=>({state,error});
  if(state.phase==='ended')return reject('This hearing has ended. Begin a new term to try again.');
  const s=structuredClone(state);
  if(action.type==='continue') {
    if(s.phase!=='consequence')return reject('There is no completed hearing to continue.');
    s.day++;s.phase='explore';s.consequence='';s.quotes=[];s.location='chamber';s.positions.chamber={...s.positions.chamber,...townMaps[0].spawn,direction:'south'};
  } else if(action.type==='decide') {
    if(s.phase!=='explore'||action.day!==s.day||action.revision!==s.revision)return reject('That ruling is already recorded or out of date.');
    const c=cases[s.day-1];const before=s.hysteria;s.quotes=[];
    const quote=(id:QuoteId)=>{s.quotes.push(id);if(!s.seenQuotes.includes(id))s.seenQuotes.push(id);};
    if(c.kind==='final') {
      if(action.choice==='accuse') {s.ending='compromised';s.shame.push({day:s.day,reason:'Signed a false confession to save yourself'});quote('name');s.consequence="The elders let you live. Your signed confession stays with the court, where it can be used against the neighbors you named. The accusations continue.";}
      else if(canAnswer(s)) {s.ending='won';s.consequence="The witnesses read their statements aloud. Everyone can see the copied passages, the rejected land offer, and the old complaint. The townspeople demand that the court stop seizing property on these accusations. The elders suspend the hearings. Your neighbors are still afraid, but they are finally asking for proof.";}
      else {s.ending='condemned';s.consequence="You refuse to sign. The elders ask who will speak for you, but the town has no complete public record to challenge their account. They order your arrest. You told the truth, and they condemned you anyway.";}
    } else {
      s.hysteria+=6;
      if(c.kind==='neutral') {
        if(action.choice==='accuse') {s.reputation-=20;s.hysteria+=12;quote('neutral');s.consequence="You ask to stay out of the dispute. The elders take that as a refusal to support them, and the crowd begins to suspect you.";}
        else if(completeRecord(s)) {s.reputation-=5;s.hysteria-=10;s.openRecord=true;s.consequence="You lay out the land deal, the copied statements, and the old complaint. People in the room start asking questions of their own. The elders reluctantly agree to let accusers be questioned in public.";}
        else {s.reputation-=18;s.hysteria+=5;s.consequence="You demand an open hearing, but you cannot show how the records support your request. The elders call you insubordinate and refuse to change the rules.";}
      } else if(c.kind==='record') {
        if(action.choice==='accuse') {s.reputation+=9;s.hysteria+=15;s.shame.push({day:s.day,reason:'Sealed evidence to protect your office'});s.consequence="You agree to seal the records. The elders praise your loyalty. Outside the court, no one can check what the witnesses actually said.";}
        else if(completeRecord(s)&&s.openRecord) {s.reputation-=s.shame.length?12:6;s.hysteria-=18;s.publicWitness=true;if(s.shame.length===1)s.recanted=[0];s.consequence=s.shame.length===1?"You admit that your earlier accusation was wrong. Some neighbors lose faith in you, but the witnesses agree to speak in public. Your Shame badge stays: the correction cannot undo what happened.":"You open the records to the town. Witnesses point out where their statements were copied or changed, and their neighbors hear the corrections for themselves.";}
        else {s.reputation-=18;s.hysteria+=8;s.consequence="You release the notes, but you have not built a complete case or secured an open hearing. The elders dismiss your claims. No witness is willing to speak publicly.";}
      } else if(action.choice==='accuse') {
        s.reputation+=9;s.hysteria+=15;s.shame.push({day:s.day,reason:`Endorsed the unsupported charge in “${c.title}”`});quote('accuse');s.consequence="The crowd approves of your ruling. You are safe for now, but the accused is taken away. You receive a Shame badge for backing a charge you could not prove.";
      } else if(s.connections.includes(c.proof)) {s.reputation-=4;s.hysteria-=7;s.consequence="You show the court the evidence behind your defense. A few neighbors still distrust you, but others begin to doubt the accusation. The room grows quieter.";}
      else {s.reputation-=16;s.hysteria+=5;s.consequence="You speak up for the accused, but you have no evidence ready to challenge the charge. The elders ask why you are so eager to defend a suspect. By evening, people are whispering about you too.";}
      s.reputation=Math.max(0,Math.min(100,s.reputation));s.hysteria=Math.max(0,Math.min(100,s.hysteria));
      if(before<80&&s.hysteria>=80&&!s.seenQuotes.includes('hysteria'))quote('hysteria');
      if(s.hysteria===100)s.ending='chaos';else if(s.reputation===0)s.ending='condemned';
    }
    s.history.push({day:s.day,caseId:c.id,choice:action.choice,reputation:s.reputation,hysteria:s.hysteria});s.phase=s.ending?'ended':'consequence';
  } else {
    if(s.phase!=='explore')return reject('Read the consequence before returning to the town.');
    if(action.type==='visit') {if(!townMaps.some(m=>m.id===action.location))return reject('Unknown location.');s.location=action.location;}
    if(action.type==='move')s.positions[s.location]=move(s.positions[s.location],action.direction,townMaps.find(m=>m.id===s.location)!);
    if(action.type==='inspect') {if(!townMaps.find(m=>m.id===s.location)!.interactions.some(i=>i.id===action.id))return reject('This object is not here.');if(!s.evidence.includes(action.id))s.evidence.push(action.id);if(!s.positions[s.location].inspected.includes(action.id))s.positions[s.location].inspected.push(action.id);}
    if(action.type==='connect') {const c=connections.find(c=>c.id===action.id);if(!c||!c.clues.every(id=>s.evidence.includes(id)))return reject('Inspect both records first.');if(!action.correct)return reject(c.feedback);if(!s.connections.includes(c.id))s.connections.push(c.id);}
  }
  s.revision++;return {state:s,error:null};
}
export function judgeStanding(s:JudgeState) {return {reputation:s.reputation<=0?'Condemned':s.reputation<25?'Under suspicion':s.reputation<50?'Watched':s.reputation<75?'Accepted':'Favored',hysteria:s.hysteria>=100?'Chaos':s.hysteria>=80?'Near rupture':s.hysteria>=50?'Fear governs':s.hysteria>=25?'Rumors spreading':'Uneasy'};}
