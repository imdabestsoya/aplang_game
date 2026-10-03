import { initialJourney } from '../../engine/trail/journey';
import type { Journey, Snapshot } from '../../engine/trail/journey';
import { trailContent } from '../../content/trail';
import { itineraries } from '../../content/trail/itineraries';
import { load as loadExploration } from './exploration';
import { validJourney as validLegacy, JOURNEY_KEY as LEGACY_KEY } from './legacyJourney';
export const JOURNEY_KEY = 'the-weight:trail:journey:v2';
const CONTENT_VERSION = 'trail-encounters-2';
export function newJourney() { const bytes = new Uint32Array(1); crypto.getRandomValues(bytes); return initialJourney(bytes[0]); }
export function saveJourney(state: Journey): string | null {
  try { localStorage.setItem(JOURNEY_KEY, JSON.stringify({ schemaVersion: 2, contentVersion: CONTENT_VERSION, state })); return null; }
  catch { return 'Journey progress could not be saved. Continue in this tab; refreshing may lose unsaved choices.'; }
}
const object = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const integer = (v: unknown, min = 0, max = Number.MAX_SAFE_INTEGER): v is number => Number.isSafeInteger(v) && (v as number) >= min && (v as number) <= max;
const strings = (v: unknown): v is string[] => Array.isArray(v) && v.every(i => typeof i === 'string');
function validSnapshot(value: unknown): value is Snapshot {
  if (!object(value)) return false;
  const s = value as unknown as Snapshot;
  if (!integer(s.revision) || !integer(s.seed, 0, 4294967295) || s.variant !== itineraries[s.seed % 8].id || !['landmark', 'travel', 'pending', 'ended'].includes(s.phase) || !object(s.resources) || !object(s.exploration) || !object(s.flags) || !strings(s.causes) || !strings(s.log) || !strings(s.fired)) return false;
  const bounds = { day: [1, Number.MAX_SAFE_INTEGER], food: [0, 40], stamina: [0, 100], condition: [0, 100], coins: [0, Number.MAX_SAFE_INTEGER], kits: [0, 4], reputation: [0, 100], hysteria: [0, 100] };
  if (Object.keys(s.resources).length !== Object.keys(bounds).length || Object.entries(bounds).some(([k, [min, max]]) => !integer(s.resources[k as keyof typeof bounds], min, max))) return false;
  if (Object.entries(s.flags).some(([k, v]) => !['falseAccusation', 'poppetUnderstood', 'landExamined', 'courtContradiction', 'signedFalseConfession'].includes(k) || typeof v !== 'boolean')) return false;
  const schedule = itineraries[s.seed % 8];
  const allowed = ['crossing', ...schedule.events.map(e => e.id)];
  if (new Set(s.fired).size !== s.fired.length || s.fired.some(id => !allowed.includes(id)) || s.fired.filter(id => id !== 'crossing').length > 3) return false;
  if (!trailContent.landmarks.some(m => m.id === s.landmark) || !s.exploration[s.landmark]) return false;
  for (const [id, e] of Object.entries(s.exploration)) {
    const m = trailContent.landmarks.find(m => m.id === id);
    if (!m || !object(e) || !integer(e.x, 0, m.width - 1) || !integer(e.y, 0, m.height - 1) || m.walkable[e.y][e.x] !== '1' || !['north', 'south', 'east', 'west'].includes(e.direction) || !strings(e.inspected) || new Set(e.inspected).size !== e.inspected.length || e.inspected.some(id => !m.interactions.some(i => i.id === id))) return false;
  }
  const r = s.resources;
  const causes = [r.hysteria === 100 && 'Salem in Rupture', r.reputation === 0 && 'Condemned', r.stamina === 0 && 'Stamina exhausted', r.condition === 0 && 'Cart broken'].filter(Boolean);
  if (JSON.stringify(causes) !== JSON.stringify(s.causes) || (causes.length > 0) !== (s.phase === 'ended')) return false;
  const route = trailContent.routes.find(r => r.id === s.route);
  if (!integer(s.remaining, 0, route?.length ?? 0)) return false;
  if (s.phase === 'landmark' && (s.route !== null || s.remaining !== 0)) return false;
  if (s.route !== null && (!route || route.origin !== s.landmark)) return false;
  if ((s.phase === 'travel' || s.phase === 'pending') && !route) return false;
  if (s.phase === 'travel' && s.remaining === 0) return false;
  if (s.phase !== 'pending') return s.pending === null;
  const p = s.pending;
  if (!object(p) || typeof p.encounter !== 'string' || !['full', 'sparse', 'none'].includes(p.ration) || !strings(p.queue) || new Set(p.queue).size !== p.queue.length || !s.fired.includes(p.encounter)) return false;
  if (p.id !== `${s.seed}:${s.route}:${s.resources.day}:${s.revision}:${p.encounter}`) return false;
  const progress = route!.length - s.remaining; const leg = Number(route!.origin.slice(1));
  const eligible = (id: string) => id === 'crossing' ? leg === 3 && progress >= 2 : schedule.events.some(e => e.id === id && e.leg === leg && e.at <= progress);
  if (!eligible(p.encounter) || p.queue.some(id => !eligible(id) || s.fired.includes(id))) return false;
  const due: { id: string; at: number }[] = schedule.events.filter(e => e.leg === leg && e.at <= progress && !s.fired.includes(e.id));
  if (leg === 3 && progress >= 2 && !s.fired.includes('crossing')) due.push({ id: 'crossing', at: 2 });
  return JSON.stringify(p.queue) === JSON.stringify(due.sort((a, b) => a.at - b.at).map(e => e.id));
}
export function validJourney(value: unknown): value is Journey {
  try {
    if (!validSnapshot(value) || !object(value)) return false;
    const s = value as unknown as Journey; const cp = s.checkpoint;
    return (cp === null && s.phase === 'ended') || !!cp && validSnapshot(cp) && !('checkpoint' in cp) && cp.phase === 'landmark' && cp.seed === s.seed && cp.variant === s.variant && cp.revision <= s.revision && cp.landmark === s.landmark;
  } catch { return false; }
}
export function loadJourney(): { state: Journey; canSave: boolean; issue: string | null } {
  try {
    const raw = localStorage.getItem(JOURNEY_KEY);
    if (raw !== null) {
      const data = JSON.parse(raw);
      if (data.schemaVersion !== 2 || data.contentVersion !== CONTENT_VERSION || !validJourney(data.state)) throw new Error('Incompatible journey');
      return { state: data.state, canSave: true, issue: null };
    }
    const oldRaw = localStorage.getItem(LEGACY_KEY);
    const fallback = newJourney();
    if (oldRaw !== null) {
      const data = JSON.parse(oldRaw);
      if (data.schemaVersion !== 1 || data.contentVersion !== 'trail-journey-1' || !validLegacy(data.state)) throw new Error('Invalid legacy journey');
      for (const k of ['revision', 'phase', 'landmark', 'route', 'remaining', 'resources', 'exploration', 'causes', 'log'] as const) Object.assign(fallback, { [k]: data.state[k] });
      // Legacy runs only contain leg1 and cannot have a pending encounter.
      if (!['L1', 'L2'].includes(fallback.landmark) || (fallback.route && !fallback.route.startsWith('leg1-'))) throw new Error('Invalid legacy route');
      if (fallback.phase === 'landmark') { const { checkpoint: _cp, ...snapshot } = fallback; void _cp; fallback.checkpoint = structuredClone(snapshot); }
      else if (fallback.phase === 'ended') fallback.checkpoint = null;
      if (!validJourney(fallback)) throw new Error('Invalid migrated journey');
    } else {
      const old = loadExploration(trailContent.landmarks[0]); fallback.exploration.L1 = old.state;
      if (!old.canSave) return { ...old, state: fallback };
      const { checkpoint: _cp, ...snapshot } = fallback; void _cp; fallback.checkpoint = structuredClone(snapshot);
    }
    const issue = saveJourney(fallback);
    return { state: fallback, canSave: !issue, issue };
  } catch { return { state: initialJourney(), canSave: false, issue: 'Trail progress could not be loaded. Play without saving or explicitly replace the journey save. Earlier saves remain untouched.' }; }
}
