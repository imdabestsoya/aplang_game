import { afterEach, describe, expect, it, vi } from 'vitest';
import { initialJourney, transition, safeChoices, responsePreview } from '../../src/engine/trail/journey';
import type { Journey, Ration } from '../../src/engine/trail/journey';
import { itineraries, validateItineraries } from '../../src/content/trail/itineraries';
import { trailContent } from '../../src/content/trail';
import { JOURNEY_KEY, loadJourney, saveJourney, validJourney } from '../../src/persistence/trail/journey';
function step(s: Journey, action: Parameters<typeof transition>[1]) { const result = transition(s, action); expect(result.error).toBeNull(); return result.state; }
function reply(s: Journey, choice?: string, ration: Ration = 'full') { return step(s, { type: 'respond', transaction: s.pending!.id, choice: choice ?? safeChoices(s, ration)[0].id, ration }); }
function arrive(s: Journey, route: string) { s = step(s, { type: 'depart', route }); for (let n=0; n<20 && s.phase !== 'landmark'; n++) s = s.pending ? reply(s) : step(s, { type: 'travel', pace: 'steady', ration: 'full' }); expect(s.phase).toBe('landmark'); return s; }
function legTwo(seed=0) { return step(arrive(initialJourney(seed), 'leg1-road'), { type:'depart', route:'leg2-road' }); }
function event(seed:number) { let s=legTwo(seed); while(!s.pending) s=step(s,{type:'travel',pace:'steady',ration:'full'}); return s; }
function bridge(route='leg3-road') { let s=arrive(arrive(initialJourney(), 'leg1-road'), 'leg2-road'); s=step(s,{type:'depart',route}); return step(s,{type:'travel',pace:'steady',ration:'full'}); }
afterEach(()=>vi.unstubAllGlobals());

describe('bounded schedules and exact encounter rules',()=>{
  it('validates eight schedules, catches missing templates, duplicate legs and bad thresholds',()=>{
    expect(validateItineraries(trailContent)).toEqual([]);
    const bad=structuredClone(itineraries);bad[0].events.push({leg:2,at:99,id:'missing'});
    expect(validateItineraries(trailContent,bad).join(' ')).toMatch(/schedule exceeds.*invalid event/);
    const content=structuredClone(trailContent);content.encounters.find(e=>e.id==='weather')!.actions[0].deltas.stamina=4;
    expect(validateItineraries(content).join(' ')).toMatch(/bounds/);
  });
  it.each(itineraries.map((v,seed)=>[seed,v.id] as const))('seed %i persists %s and presents at most one event per leg', (seed,id)=>{
    let s=initialJourney(seed);expect(s.variant).toBe(id);
    s=arrive(s,'leg1-road');expect(s.fired).toEqual([]);
    s=arrive(s,'leg2-road');expect(s.fired).toHaveLength(1);expect(validJourney(s)).toBe(true);
    s=arrive(s,'leg3-road');expect(s.fired.filter(i=>i!=='crossing')).toHaveLength(2);expect(s.fired.filter(i=>i==='crossing')).toHaveLength(1);expect(validJourney(s)).toBe(true);
    const before=[...s.fired];s=step(s,{type:'rest',ration:'full'});expect(s.fired).toEqual(before);
  });
  it('defines all eight event costs, preserves evidence and exposes a non-accusation option',()=>{
    const expected: Record<string, Record<string, number>>={rain:{condition:-4},wheel:{stamina:-4},rumor:{reputation:-3,hysteria:-5},accounts:{hysteria:-2},shelter:{day:1,food:-2,stamina:16,hysteria:2},weather:{stamina:3},neighbor:{food:-2},inspection:{}};
    for(let seed=0;seed<8;seed++) {
      const s=event(seed);const e=trailContent.encounters.find(e=>e.id===s.pending!.encounter)!;
      const result=responsePreview(s,e.actions[0].id,'full');expect(result.error).toBeNull();
      for(const [key,delta] of Object.entries(expected[e.id])) expect(result.state.resources[key as keyof typeof s.resources]-s.resources[key as keyof typeof s.resources]).toBe(delta);
      expect(safeChoices(s,'full').length).toBeGreaterThan(0);expect(result.state.exploration).toEqual(s.exploration);
      const solved=reply(s);expect(transition(solved,{type:'respond',transaction:s.pending!.id,choice:e.actions[0].id,ration:'full'}).error).toBeTruthy();
    }
  });
  it('skips an optional event with no affordable survivable choice, without forcing accusation',()=>{
    const s=legTwo();s.resources={...s.resources,stamina:3,condition:1,food:2};
    const next=step(s,{type:'travel',pace:'careful',ration:'full'});expect(next.phase).toBe('travel');expect(next.fired).toContain('rain');expect(next.log.join(' ')).toMatch(/Skipped rain/);
    const rumor=legTwo(2);rumor.resources.reputation=2;
    const skipped=step(rumor,{type:'travel',pace:'careful',ration:'full'});expect(skipped.pending).toBeNull();expect(skipped.flags.falseAccusation).toBeUndefined();expect(skipped.log.join(' ')).toMatch(/Skipped rumor/);
  });
});

describe('atomic crossing and arrivals',()=>{
  it.each(['leg3-road','leg3-detour'])('%s crossing consumes each option exactly once', route=>{
    const s=bridge(route);expect(s.pending?.encounter).toBe('crossing');const before=s.resources;
    for(const [choice,delta] of [['wait',{day:1,food:-2,hysteria:2}],['hire',{coins:-3}],['ford',{condition:-10,stamina:-5}]] as const){
      const next=reply(s,choice);for(const key of Object.keys(before) as (keyof typeof before)[]) expect(next.resources[key]-before[key]).toBe((delta as Partial<typeof before>)[key]??0);
      expect(next.remaining).toBe(s.remaining);expect(transition(next,{type:'respond',transaction:s.pending!.id,choice,ration:'full'}).error).toBeTruthy();
    }
    expect(reply(s,'wait','none').resources.stamina).toBe(before.stamina-12);
    const restored=step(reply(s,'ford'),{type:'checkpoint'});expect(restored.phase).toBe('landmark');expect(restored.landmark).toBe('L3');expect(restored.seed).toBe(s.seed);expect(restored.fired).not.toContain('crossing');
  });
  it('queues the optional event behind a forced-day crossing and arrival behind its response',()=>{
    let s=arrive(arrive(initialJourney(), 'leg1-road'),'leg2-road');s=step(s,{type:'depart',route:'leg3-road'});
    s=step(s,{type:'travel',pace:'forced',ration:'full'});expect(s.pending?.encounter).toBe('crossing');expect(s.pending?.queue).toEqual(['inspection']);const day=s.resources.day;
    s=reply(s,'hire');expect(s.pending?.encounter).toBe('inspection');expect(s.resources.day).toBe(day);expect(validJourney(s)).toBe(true);
    s=reply(s,'records');s=step(s,{type:'travel',pace:'forced',ration:'full'});expect(s.landmark).toBe('L4');expect(s.resources.day).toBe(day+1);expect(s.log.filter(l=>l.startsWith('Arrival: leg3-road'))).toHaveLength(1);
  });
  it('records simultaneous threshold precedence and stops later queued effects',()=>{
    let s=bridge();s.resources={...s.resources,hysteria:99,stamina:1,condition:1,reputation:0};
    s=reply(s,'wait','none');expect(s.causes).toEqual(['Salem in Rupture','Condemned','Stamina exhausted']);expect(s.pending).toBeNull();expect(s.landmark).toBe('L3');expect(s.fired).not.toContain('inspection');
  });
  it('offers checkpoint recovery when crossing options are all unsafe or unaffordable',()=>{
    const s=bridge();s.resources={...s.resources,stamina:1,condition:1,hysteria:99,coins:0,food:0};
    for(const ration of ['full','sparse','none'] as const) expect(safeChoices(s,ration)).toHaveLength(0);
    const restored=step(s,{type:'checkpoint'});expect(restored.resources).toEqual(s.checkpoint!.resources);expect(validJourney(restored)).toBe(true);
  });
});

describe('versioned pending saves',()=>{
  it('round trips every stable phase without recharging, rerolling or responding twice',()=>{
    const values=new Map<string,string>();vi.stubGlobal('localStorage',{getItem:(k:string)=>values.get(k)??null,setItem:(k:string,v:string)=>values.set(k,v)});
    let s=initialJourney();
    for(const action of [{type:'depart',route:'leg1-road'},{type:'travel',pace:'steady',ration:'full'},{type:'travel',pace:'steady',ration:'full'},{type:'depart',route:'leg2-road'},{type:'travel',pace:'steady',ration:'full'}] as const){s=step(s,action);expect(saveJourney(s)).toBeNull();expect(loadJourney().state).toEqual(s);}
    expect(s.phase).toBe('pending');expect(transition(s,{type:'rest',ration:'full'}).error).toBeTruthy();expect(transition(s,{type:'travel',pace:'steady',ration:'full'}).error).toBeTruthy();
    const next=reply(s);saveJourney(next);expect(loadJourney().state).toEqual(next);expect(transition(next,{type:'respond',transaction:s.pending!.id,choice:'supplies',ration:'full'},s.revision).error).toMatch(/stale/);
    expect(values.has(JOURNEY_KEY)).toBe(true);
  });
  it('rejects malformed seed, variant, fired IDs, phase, transaction, checkpoint and flags',()=>{
    const s=bridge();expect(validJourney(s)).toBe(true);
    const corruptions=[{seed:-1},{variant:'missing'},{fired:['crossing','crossing']},{pending:{...s.pending,queue:['rain']}},{pending:{...s.pending,id:'forged'}},{checkpoint:{...s.checkpoint,pending:s.pending}},{flags:{madeUp:true}},{resources:{...s.resources,coins:-1}},{phase:'jail'},{causes:['fake']}];
    for(const change of corruptions) expect(validJourney({...s,...change})).toBe(false);
  });
  it('migrates v1 read-only, seeds once and leaves corrupt v2 data untouched',()=>{
    const s=initialJourney();const {seed:_seed,variant:_variant,fired:_fired,flags:_flags,pending:_pending,checkpoint:_checkpoint,...legacy}=s;void [_seed,_variant,_fired,_flags,_pending,_checkpoint];
    const raw=JSON.stringify({schemaVersion:1,contentVersion:'trail-journey-1',state:legacy});const values=new Map([['the-weight:trail:journey:v1',raw],['card','keep']]);vi.stubGlobal('localStorage',{getItem:(k:string)=>values.get(k)??null,setItem:(k:string,v:string)=>values.set(k,v)});
    const loaded=loadJourney();expect(loaded.canSave).toBe(true);expect(validJourney(loaded.state)).toBe(true);expect(loadJourney().state).toEqual(loaded.state);expect(values.get('the-weight:trail:journey:v1')).toBe(raw);expect(values.get('card')).toBe('keep');
    values.set(JOURNEY_KEY,'{bad');expect(loadJourney().canSave).toBe(false);expect(values.get(JOURNEY_KEY)).toBe('{bad');
  });
});

it('blocks repeated responses, keeps accusation flags explicit, and offers free refusal when food is absent',()=>{
  const s=event(6);s.resources.food=0;
  expect(responsePreview(s,'share','full').error).toMatch(/food/);
  expect(reply(s,'decline').resources).toEqual(s.resources);
  const rumor=event(2);const repeated=reply(rumor,'repeat');expect(repeated.flags.falseAccusation).toBe(true);expect(repeated.resources.reputation-rumor.resources.reputation).toBe(7);expect(repeated.resources.hysteria-rumor.resources.hysteria).toBe(8);
  expect(step(repeated,{type:'checkpoint'}).flags.falseAccusation).toBeUndefined();
});
it('stops before an optional event on base-cost failure and before arrival on response failure',()=>{
  const s=legTwo();s.resources.stamina=1;
  const ended=step(s,{type:'travel',pace:'steady',ration:'full'});expect(ended.phase).toBe('ended');expect(ended.fired).toEqual([]);
  let queued=bridge();queued.remaining=0;queued.pending!.queue=['inspection'];queued.resources.hysteria=99;
  queued=reply(queued,'wait');expect(queued.causes[0]).toBe('Salem in Rupture');expect(queued.fired).not.toContain('inspection');expect(queued.landmark).toBe('L3');expect(queued.log.some(l=>l.startsWith('Arrival: leg3'))).toBe(false);
});
it('shelter sparse/no-food policies recover only their normal daily amount and never retrigger',()=>{
  const s=event(4);
  for(const [ration,food,stamina] of [['sparse',1,12],['none',0,4]] as const){
    const next=reply(s,'rest',ration);expect(next.resources.day).toBe(s.resources.day+1);expect(next.resources.food).toBe(s.resources.food-food);expect(next.resources.stamina).toBe(s.resources.stamina+stamina);expect(next.resources.hysteria).toBe(s.resources.hysteria+2);expect(next.fired.filter(i=>i==='shelter')).toHaveLength(1);
  }
});
