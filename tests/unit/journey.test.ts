import { afterEach, expect, it, vi } from 'vitest';
import { initialJourney, transition, forecast, canTrade } from '../../src/engine/trail/journey';
import type { Pace, Ration } from '../../src/engine/trail/journey';
import { JOURNEY_KEY, loadJourney, saveJourney, validJourney } from '../../src/persistence/trail/journey';
import { serialize, TRAIL_KEY } from '../../src/persistence/trail/exploration';
import { trailContent } from '../../src/content/trail';
afterEach(() => vi.unstubAllGlobals());
function depart(route = 'leg1-road') { return transition(initialJourney(), { type: 'depart', route }).state; }
it.each(['leg1-road', 'leg1-detour'])('completes %s once, rejects duplicate departure and stale daily action', route => {
  let s = depart(route); const initial = structuredClone(s);
  expect(transition(s, { type: 'depart', route }).state).toBe(s);
  while (s.phase === 'travel') s = transition(s, { type: 'travel', pace: 'steady', ration: 'full' }).state;
  expect(initial.resources.day).toBe(1);
  expect(s.landmark).toBe('L2'); expect(s.resources).toMatchObject({ day: route.endsWith('road') ? 3 : 4, reputation: route.endsWith('road') ? 62 : 65 });
  expect(transition(s, { type: 'travel', pace: 'steady', ration: 'full' }).state).toBe(s);
  expect(transition(s, { type: 'rest', ration: 'full' }, s.revision - 1).error).toMatch(/stale/);
});
it.each([['careful',1,2,0],['steady',2,5,2],['forced',3,12,5]] as const)('charges exact %s pace with each ration and on a short day', (pace, progress, stamina, damage) => {
  for (const [ration, food, penalty] of [['full',2,0],['sparse',1,4],['none',0,12]] as const) {
    const s = depart(); const next = transition(s, { type: 'travel', pace, ration }).state;
    expect(next.resources).toMatchObject({ food:24-food,stamina:80-stamina-penalty,condition:90-damage,day:2,hysteria:27 }); expect(next.remaining).toBe(4-progress);
    s.remaining=1; const short=transition(s,{type:'travel',pace,ration}).state;
    expect(short.resources.stamina).toBe(next.resources.stamina);expect(short.resources.food).toBe(next.resources.food);expect(short.landmark).toBe('L2');
  }
});
it('blocks unaffordable rations without mutation and allows explicit no-food choice', () => {
  const s=depart();s.resources.food=0;
  for(const ration of ['full','sparse'] as Ration[]) expect(transition(s,{type:'travel',pace:'steady',ration}).state).toBe(s);
  expect(transition(s,{type:'travel',pace:'steady',ration:'none'}).state.resources.stamina).toBe(63);
});
it('rests before ration modifier and final cap, repairs without days, prevents waste', () => {
  for(const [ration,expected] of [['full',96],['sparse',92],['none',84]] as const) expect(transition(initialJourney(),{type:'rest',ration}).state.resources.stamina).toBe(expected);
  const s=initialJourney();s.resources.stamina=99;
  expect(transition(s,{type:'rest',ration:'none'}).state.resources.stamina).toBe(100);
  const repaired=transition(s,{type:'repair'}).state;expect(repaired.resources).toMatchObject({condition:100,kits:1,day:1,hysteria:25});expect(transition(repaired,{type:'repair'}).error).toBeTruthy();
  expect(transition(depart(),{type:'rest',ration:'full'}).error).toBeTruthy();expect(transition(depart(),{type:'repair'}).error).toBeTruthy();
});
it('trades only at L2/L3 with complete bundles, capacity and money guards', () => {
  expect(canTrade('L3')).toBe(true);expect(canTrade('L4')).toBe(false);expect(transition(initialJourney(),{type:'food'}).error).toBeTruthy();
  const s=initialJourney();s.landmark='L2';s.resources.food=37;s.resources.kits=3;s.resources.coins=4;
  const food=transition(s,{type:'food'}).state; const kit=transition(food,{type:'kit'}).state;
  expect(kit.resources).toMatchObject({food:40,kits:4,coins:0,day:1,hysteria:25});expect(transition(kit,{type:'food'}).error).toBeTruthy();expect(transition(kit,{type:'kit'}).error).toBeTruthy();
  s.resources.food=38;expect(transition(s,{type:'food'}).state).toBe(s);s.resources.coins=0;expect(transition(s,{type:'kit'}).state).toBe(s);
});
it('checks simultaneous terminal causes before arrival and arrival thresholds once', () => {
  const s=depart();s.remaining=1;s.resources.hysteria=99;s.resources.stamina=1;s.resources.condition=1;
  const result=forecast(s,{type:'travel',pace:'forced',ration:'none'});expect(result.severe).toBe(true);expect(result.state.causes).toEqual(['Salem in Rupture','Stamina exhausted','Cart broken']);expect(result.state.resources.reputation).toBe(65);expect(result.state.landmark).toBe('L1');
  s.resources.hysteria=25;s.resources.stamina=80;s.resources.condition=90;s.resources.reputation=2;
  const ended=transition(s,{type:'travel',pace:'steady',ration:'full'}).state;expect(ended.causes).toEqual(['Condemned']);expect(ended.resources.reputation).toBe(0);
});
it('forecasts are pure and match committed outcomes for all pace/ration pairs', () => {
  const s=depart();const before=JSON.stringify(s);
  for(const pace of ['careful','steady','forced'] as Pace[]) for(const ration of ['full','sparse','none'] as Ration[]) {const action={type:'travel' as const,pace,ration};expect(forecast(s,action).state).toEqual(transition(s,action).state);}
  expect(JSON.stringify(s)).toBe(before);
});
it('migrates exploration read-only, round trips journey and rejects invalid saves without overwriting', () => {
  const s=initialJourney();s.exploration.L1.inspected=['notice'];const old=serialize(s.exploration.L1,trailContent.landmarks[0]);const data=new Map([[TRAIL_KEY,old],['card','keep']]);
  vi.stubGlobal('localStorage',{getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>data.set(k,v)});
  expect(loadJourney().state.exploration.L1.inspected).toEqual(['notice']);expect(data.has(JOURNEY_KEY)).toBe(true);
  const next=depart();saveJourney(next);expect(loadJourney().state).toEqual(next);expect(data.get(TRAIL_KEY)).toBe(old);expect(data.get('card')).toBe('keep');
  next.resources.food=41;expect(validJourney(next)).toBe(false);saveJourney(next);const raw=data.get(JOURNEY_KEY);expect(loadJourney().canSave).toBe(false);expect(data.get(JOURNEY_KEY)).toBe(raw);
  vi.stubGlobal('localStorage',{getItem:()=>{throw Error('denied');},setItem:()=>{throw Error('quota');}});expect(loadJourney().canSave).toBe(false);expect(saveJourney(initialJourney())).toMatch(/could not be saved/);
});
