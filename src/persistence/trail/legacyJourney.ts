import type { Snapshot } from '../../engine/trail/journey';
type Journey = Pick<Snapshot, 'revision' | 'phase' | 'landmark' | 'route' | 'remaining' | 'resources' | 'exploration' | 'causes' | 'log'>;
import { trailContent } from '../../content/trail';
export const JOURNEY_KEY = 'the-weight:trail:journey:v1';
export function validJourney(s: Journey): boolean {
  if (!s || !Number.isSafeInteger(s.revision) || s.revision < 0 || !['landmark', 'travel', 'ended'].includes(s.phase) || !trailContent.landmarks.some(m => m.id === s.landmark) || !s.resources || !s.exploration || !Array.isArray(s.log) || !s.log.every(i => typeof i === 'string') || !Array.isArray(s.causes) || !s.causes.every(i => typeof i === 'string')) return false;
  const bounds = { day: [1, Number.MAX_SAFE_INTEGER], food: [0, 40], stamina: [0, 100], condition: [0, 100], coins: [0, Number.MAX_SAFE_INTEGER], kits: [0, 4], reputation: [0, 100], hysteria: [0, 100] };
  for (const [key, [min, max]] of Object.entries(bounds)) { const value = s.resources[key as keyof typeof bounds]; if (!Number.isSafeInteger(value) || value < min || value > max) return false; }
  for (const [id, e] of Object.entries(s.exploration)) { const m = trailContent.landmarks.find(m => m.id === id); if (!m || !e || !Number.isInteger(e.x) || !Number.isInteger(e.y) || m.walkable[e.y]?.[e.x] !== '1' || !['north', 'south', 'east', 'west'].includes(e.direction) || !Array.isArray(e.inspected) || new Set(e.inspected).size !== e.inspected.length || !e.inspected.every(id => m.interactions.some(i => i.id === id))) return false; }
  if (!s.exploration[s.landmark] || !Number.isInteger(s.remaining) || s.remaining < 0) return false;
  const route = trailContent.routes.find(r => r.id === s.route);
  if (s.phase === 'travel' && (!route || route.origin !== s.landmark || s.remaining < 1 || s.remaining > route.length)) return false;
  if (s.phase === 'landmark' && (s.route !== null || s.remaining !== 0)) return false;
  const terminal = s.resources.hysteria === 100 || s.resources.reputation === 0 || s.resources.stamina === 0 || s.resources.condition === 0;
  return terminal === (s.phase === 'ended');
}
