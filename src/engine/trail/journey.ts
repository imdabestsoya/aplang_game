import { itineraries } from '../../content/trail/itineraries';
import { trailContent } from '../../content/trail';
import { initialExploration, supplies } from './exploration';
import type { Exploration } from './exploration';
export const paces = { careful: [1, -2, 0], steady: [2, -5, -2], forced: [3, -12, -5] } as const;
export const rations = { full: [2, 0], sparse: [1, -4], none: [0, -12] } as const;
export type Pace = keyof typeof paces;
export type Ration = keyof typeof rations;
export type Resources = { -readonly [K in keyof typeof supplies]: number };
export interface Pending { id: string; encounter: string; ration: Ration; queue: string[] }
export interface Snapshot { revision: number; phase: 'landmark' | 'travel' | 'pending' | 'ended'; landmark: string; route: string | null; remaining: number; resources: Resources; exploration: Record<string, Exploration>; causes: string[]; log: string[]; seed: number; variant: string; fired: string[]; flags: Record<string, boolean>; pending: Pending | null }
export interface Journey extends Snapshot { checkpoint: Snapshot | null }
export type Action = { type: 'depart'; route: string } | { type: 'travel'; pace: Pace; ration: Ration } | { type: 'rest'; ration: Ration } | { type: 'repair' | 'food' | 'kit' | 'checkpoint' } | { type: 'respond'; transaction: string; choice: string; ration: Ration };
export function initialJourney(seed = 0): Journey {
  const map = trailContent.landmarks[0];
  const s: Journey = { revision: 0, phase: 'landmark', landmark: map.id, route: null, remaining: 0, resources: { ...supplies }, exploration: { [map.id]: initialExploration(map) }, causes: [], log: [], seed, variant: itineraries[seed % 8].id, fired: [], flags: {}, pending: null, checkpoint: null };
  checkpoint(s); return s;
}
function checkpoint(s: Journey) { const { checkpoint: _previous, ...snapshot } = s; void _previous; s.checkpoint = structuredClone(snapshot); }
export function destination(s: Journey) { const route = trailContent.routes.find(r => r.id === s.route); return trailContent.landmarks.find(m => m.id === route?.destination)?.title ?? 'the next landmark'; }
export function encounter(s: Journey) { return trailContent.encounters.find(e => e.id === s.pending?.encounter); }
function choiceResult(s: Journey, id: string, ration: Ration): { state: Journey; error: string | null } {
  const e = encounter(s); const choice = e?.actions.find(c => c.id === id);
  if (!e || !choice) return { state: s, error: 'Unknown encounter choice.' };
  const next = structuredClone(s); const r = next.resources;
  for (const [key, cost] of Object.entries(choice.costs)) {
    if (r[key as keyof Resources] < cost) return { state: s, error: `Not enough ${key}. Choose another option.` };
    r[key as keyof Resources] -= cost;
  }
  for (const [key, delta] of Object.entries(choice.deltas)) r[key as keyof Resources] += delta;
  if ((e.id === 'shelter' && id === 'rest') || (e.id === 'crossing' && id === 'wait')) {
    const [food, penalty] = rations[ration];
    if (r.food < food) return { state: s, error: 'Not enough food. Select sparse or no food explicitly, or choose another option.' };
    r.food -= food; r.day++; r.hysteria += 2; r.stamina += penalty + (e.id === 'shelter' ? 16 : 0);
  }
  Object.assign(next.flags, choice.flags); clamp(r); terminal(next);
  return { state: next, error: null };
}
export function responsePreview(s: Journey, id: string, ration: Ration) { return choiceResult(s, id, ration); }
export function safeChoices(s: Journey, ration: Ration) { return encounter(s)?.actions.filter(c => { const result = choiceResult(s, c.id, ration); return !result.error && result.state.phase !== 'ended' && !c.flags.falseAccusation; }) ?? []; }
function settle(s: Journey, queue: string[], ration: Ration) {
  if (s.phase === 'ended') return;
  s.pending = null;
  while (queue.length) {
    const id = queue.shift()!;
    if (s.fired.includes(id)) continue;
    s.fired.push(id); s.phase = 'pending';
    s.pending = { id: `${s.seed}:${s.route}:${s.resources.day}:${s.revision + 1}:${id}`, encounter: id, ration, queue: [...queue] };
    const survivable = (Object.keys(rations) as Ration[]).some(policy => safeChoices(s, policy).length > 0);
    if (id === 'crossing' || survivable) return;
    s.log.push(`Skipped ${id}: no affordable, survivable non-accusation choice.`); s.pending = null;
  }
  s.phase = 'travel';
  if (s.remaining === 0) {
    const route = trailContent.routes.find(r => r.id === s.route)!;
    s.resources.reputation += route.arrivalEffects.reputation ?? 0; clamp(s.resources); terminal(s);
    if (s.causes.length === 0) {
      s.phase = 'landmark'; s.landmark = route.destination; s.route = null;
      const map = trailContent.landmarks.find(m => m.id === s.landmark)!;
      s.exploration[map.id] = initialExploration(map);
      s.log.push(`Arrival: ${route.id}; reputation ${route.arrivalEffects.reputation ?? 0}.`);
    }
  }
}
export const canTrade = (landmark: string) => ['L2', 'L3'].includes(landmark);
function terminal(s: Journey) {
  const r = s.resources;
  s.causes = [r.hysteria >= 100 && 'Salem in Rupture', r.reputation <= 0 && 'Condemned', r.stamina <= 0 && 'Stamina exhausted', r.condition <= 0 && 'Cart broken'].filter(Boolean) as string[];
  if (s.causes.length) { s.phase = 'ended'; s.pending = null; }
}
function clamp(r: Resources) { r.food = Math.max(0, Math.min(40, r.food)); r.kits = Math.max(0, Math.min(4, r.kits)); for (const key of ['stamina', 'condition', 'reputation', 'hysteria'] as const) r[key] = Math.max(0, Math.min(100, r[key])); }
export function transition(state: Journey, action: Action, revision = state.revision): { state: Journey; error: string | null } {
  const reject = (error: string) => ({ state, error });
  if (revision !== state.revision) return reject('This action is stale. Review the current supplies.');
  if (action.type === 'checkpoint') {
    if (!state.checkpoint) return reject('No landmark checkpoint is available.');
    const restored: Journey = { ...structuredClone(state.checkpoint), checkpoint: structuredClone(state.checkpoint), revision: state.revision + 1 };
    restored.log.push('Restored landmark checkpoint; later choices discarded.'); return { state: restored, error: null };
  }
  if (state.phase === 'pending' && action.type !== 'respond') return reject('Resolve the pending encounter before advancing.');
  if (action.type === 'respond' && state.phase !== 'pending') return reject('This encounter is already resolved.');
  if (state.phase === 'ended') return reject('This journey has ended. Start a new first leg to try again.');
  const s: Journey = structuredClone(state); const r = s.resources;
  if (action.type === 'respond') {
    if (action.transaction !== s.pending?.id) return reject('This encounter response is stale.');
    const queue = [...s.pending.queue]; const id = s.pending.encounter;
    const result = choiceResult(s, action.choice, action.ration);
    if (result.error) return reject(result.error);
    Object.assign(s, result.state);
    s.log.push(`Resolved ${id}: ${action.choice}.`);
    settle(s, queue, action.ration);
  } else if (action.type === 'depart') {
    const route = trailContent.routes.find(i => i.id === action.route);
    if (s.phase !== 'landmark' || !route || route.origin !== s.landmark) return reject('This route is unavailable here.');
    checkpoint(s);
    s.phase = 'travel'; s.route = route.id; s.remaining = route.length;
  } else if (action.type === 'travel' || action.type === 'rest') {
    if (s.phase !== (action.type === 'travel' ? 'travel' : 'landmark')) return reject('This action is unavailable here.');
    const [food, penalty] = rations[action.ration];
    if (r.food < food) return reject('Not enough food for this policy. Select sparse or explicitly go without food.');
    r.food -= food; r.day++; r.hysteria += 2;
    if (action.type === 'rest') r.stamina = r.stamina + 16 + penalty;
    else { const [progress, stamina, condition] = paces[action.pace]; s.remaining = Math.max(0, s.remaining - progress); r.stamina += stamina + penalty; r.condition += condition; }
    clamp(r); terminal(s);
    if (action.type === 'travel' && s.causes.length === 0) {
      const route = trailContent.routes.find(i => i.id === s.route)!;
      const leg = Number(route.origin.slice(1)); const progress = route.length - s.remaining;
      const schedule = itineraries.find(i => i.id === s.variant)!;
      const due: { id: string; at: number }[] = schedule.events.filter(e => e.leg === leg && e.at <= progress && !s.fired.includes(e.id));
      if (leg === 3 && progress >= 2 && !s.fired.includes('crossing')) due.push({ id: 'crossing', at: 2 });
      settle(s, due.sort((a, b) => a.at - b.at).map(e => e.id), action.ration);
    }
  } else {
    if (s.phase !== 'landmark') return reject('Supplies can only be managed at a landmark.');
    if (action.type === 'repair') { if (!r.kits || r.condition === 100) return reject('Repair needs a kit and a damaged cart.'); r.kits--; r.condition = Math.min(100, r.condition + 25); }
    else {
      if (!canTrade(s.landmark)) return reject('Trade is available at Proctor farm and the meetinghouse.');
      if (action.type === 'food') { if (r.coins < 1 || r.food > 37) return reject('A full bundle needs 1 coin and space for 3 food (capacity 40).'); r.coins--; r.food += 3; }
      else { if (r.coins < 3 || r.kits >= 4) return reject('A kit needs 3 coins and a free kit slot (capacity 4).'); r.coins -= 3; r.kits++; }
    }
  }
  s.revision++; s.log.push(`${s.revision}: ${action.type} · day ${r.day}${s.causes.length ? ` · ${s.causes.join(', ')}` : ''}`);
  s.log.push(`Supplies: ${JSON.stringify(s.resources)}; remaining ${s.remaining}; phase ${s.phase}.`);
  if (s.phase === 'landmark' && s.landmark !== state.landmark) checkpoint(s);
  return { state: s, error: null };
}
export function forecast(s: Journey, a: Action) {
  const result = transition(s, a); const next = result.state;
  const changes = (Object.keys(s.resources) as (keyof Resources)[]).filter(k => next.resources[k] !== s.resources[k]).map(k => `${k} ${next.resources[k] - s.resources[k] > 0 ? '+' : ''}${next.resources[k] - s.resources[k]}`).join(', ');
  return { ...result, text: result.error ?? `${changes || 'No daily cost'}.${a.type === 'travel' ? ` Progress ${s.remaining - next.remaining}; ${next.remaining} units remain. Full daily charges apply even on a short final day.${next.pending ? ' An encounter pauses travel; its choice costs are separate.' : ''}` : ''}`, severe: !result.error && (next.phase === 'ended' || next.resources.stamina <= 20 || next.resources.condition <= 20 || next.resources.hysteria >= 80 || (next.flags.falseAccusation && !s.flags.falseAccusation)) };
}
export function standing(r: Resources) { return { reputation: r.reputation === 0 ? 'Condemned' : r.reputation < 25 ? 'Under suspicion' : r.reputation < 50 ? 'Watched' : r.reputation < 75 ? 'Accepted' : 'Favored', hysteria: r.hysteria >= 100 ? 'Salem in Rupture' : r.hysteria >= 80 ? 'Near rupture' : r.hysteria >= 50 ? 'Fear governs' : r.hysteria >= 25 ? 'Rumors spreading' : 'Uneasy' }; }
