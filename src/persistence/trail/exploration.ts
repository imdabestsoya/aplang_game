import { initialExploration } from '../../engine/trail/exploration';
import type { Exploration } from '../../engine/trail/exploration';
import type { Landmark } from '../../content/trail/types';
export const TRAIL_KEY = 'the-weight:trail:exploration:v1';
export const TRAIL_VERSION = 'trail-foundation-1';
interface Saved { schemaVersion: 1; contentVersion: string; landmark: string; state: Exploration }
export function serialize(state: Exploration, map: Landmark) { return JSON.stringify({ schemaVersion: 1, contentVersion: TRAIL_VERSION, landmark: map.id, state } satisfies Saved); }
export function load(map: Landmark): { state: Exploration; issue: string | null; canSave: boolean } {
  const fallback = initialExploration(map);
  try {
    const raw = localStorage.getItem(TRAIL_KEY);
    if (raw === null) return { state: fallback, issue: null, canSave: true };
    const data = JSON.parse(raw) as Saved; const s = data?.state;
    if (data.schemaVersion !== 1 || data.contentVersion !== TRAIL_VERSION || data.landmark !== map.id || !s || !Number.isInteger(s.x) || !Number.isInteger(s.y) || map.walkable[s.y]?.[s.x] !== '1' || !['north', 'south', 'east', 'west'].includes(s.direction) || !Array.isArray(s.inspected) || new Set(s.inspected).size !== s.inspected.length || !s.inspected.every(id => map.interactions.some(i => i.id === id))) throw new Error('Incompatible exploration save');
    return { state: s, issue: null, canSave: true };
  } catch { return { state: fallback, issue: 'Trail progress could not be loaded. Explore without saving, or explicitly replace the trail save. Your card-game save is untouched.', canSave: false }; }
}
export function save(state: Exploration, map: Landmark): string | null {
  try { localStorage.setItem(TRAIL_KEY, serialize(state, map)); return null; }
  catch { return 'Trail progress could not be saved. You can keep exploring in this tab.'; }
}
