/** Authored once-per-run schedules. Legs4–5 become reachable with Session10. */
import type { TrailContent } from './types';
export interface Itinerary { id: string; name: string; events: { leg: number; at: number; id: string }[] }
export const itineraries: readonly Itinerary[] = [
  { id: 'rain-and-records', name: 'Rain and records', events: [{ leg: 2, at: 1, id: 'rain' }, { leg: 3, at: 3, id: 'inspection' }, { leg: 5, at: 2, id: 'weather' }] },
  { id: 'loose-wheel', name: 'The loose wheel', events: [{ leg: 2, at: 2, id: 'wheel' }, { leg: 3, at: 3, id: 'neighbor' }, { leg: 4, at: 1, id: 'accounts' }] },
  { id: 'voices-on-road', name: 'Voices on the road', events: [{ leg: 2, at: 1, id: 'rumor' }, { leg: 3, at: 3, id: 'shelter' }, { leg: 5, at: 1, id: 'weather' }] },
  { id: 'separate-accounts', name: 'Separate accounts', events: [{ leg: 2, at: 1, id: 'accounts' }, { leg: 3, at: 3, id: 'rain' }, { leg: 4, at: 2, id: 'inspection' }] },
  { id: 'open-door', name: 'An open door', events: [{ leg: 2, at: 2, id: 'shelter' }, { leg: 3, at: 3, id: 'wheel' }, { leg: 5, at: 1, id: 'neighbor' }] },
  { id: 'clear-morning', name: 'Clear morning', events: [{ leg: 2, at: 1, id: 'weather' }, { leg: 3, at: 3, id: 'rumor' }, { leg: 4, at: 2, id: 'accounts' }] },
  { id: 'neighbors-road', name: 'The neighbor’s road', events: [{ leg: 2, at: 2, id: 'neighbor' }, { leg: 3, at: 3, id: 'weather' }, { leg: 5, at: 2, id: 'rain' }] },
  { id: 'papers-at-gate', name: 'Papers at the gate', events: [{ leg: 2, at: 1, id: 'inspection' }, { leg: 3, at: 3, id: 'accounts' }, { leg: 4, at: 2, id: 'shelter' }] },
] as const;
export const eventRules = {
  rain: { prerequisite: 'Travel only; protect-cart requires2 food', cooldown: 'once per run' },
  wheel: { prerequisite: 'Travel only; at least one survivable option', cooldown: 'once per run' },
  rumor: { prerequisite: 'Travel only; source-questioning must remain survivable', cooldown: 'once per run' },
  inspection: { prerequisite: 'Travel only; records are never consumed', cooldown: 'once per run' },
  neighbor: { prerequisite: 'Travel only; sharing requires2 food; declining is free', cooldown: 'once per run' },
  accounts: { prerequisite: 'Travel only; separate recording must remain survivable', cooldown: 'once per run' },
  shelter: { prerequisite: 'Travel only; resting requires selected ration', cooldown: 'once per run' },
  weather: { prerequisite: 'Travel only; stamina boost capped at100', cooldown: 'once per run' },
} as const;
export const eventTitles: Record<string, string> = { rain: 'Rain on the road', wheel: 'Loose wheel', rumor: 'Rumor at the crossroads', inspection: 'Official inspection', neighbor: 'A neighbor asks for food', accounts: 'Conflicting accounts', shelter: 'Shelter offered', weather: 'Clear weather', crossing: 'The damaged bridge' };

export function validateItineraries(content: TrailContent, variants: readonly Itinerary[] = itineraries): string[] {
  const errors: string[] = [];
  if (variants.length !== 8 || new Set(variants.map(v => v.id)).size !== 8 || new Set(variants.map(v => v.name)).size !== 8) errors.push('Expected eight uniquely named itineraries.');
  for (const v of variants) {
    if (!v.id || !v.name || v.events.length > 3 || new Set(v.events.map(e => e.leg)).size !== v.events.length || new Set(v.events.map(e => e.id)).size !== v.events.length) errors.push(`${v.id}: schedule exceeds one event per leg or once per run.`);
    for (const e of v.events) if (!Number.isInteger(e.leg) || e.leg < 1 || e.leg > 5 || !Number.isInteger(e.at) || e.at < 1 || e.at > 4 || !(e.id in eventRules) || !content.encounters.some(c => c.id === e.id)) errors.push(`${v.id}: invalid event threshold/reference.`);
  }
  for (const id of Object.keys(eventRules)) {
    const e = content.encounters.find(e => e.id === id);
    if (!e || e.mandatory || e.actions.length !== 2 || !e.actions.some(c => !c.flags.falseAccusation)) { errors.push(`${id}: missing optional safe alternative.`); continue; }
    const allowed: Record<string, string[]> = { rain: ['food', 'condition'], wheel: ['stamina', 'condition'], rumor: ['reputation', 'hysteria'], inspection: ['reputation'], neighbor: ['food'], accounts: ['reputation', 'hysteria'], shelter: [], weather: ['stamina'] };
    for (const c of e.actions) {
      if ([...Object.keys(c.costs), ...Object.keys(c.deltas)].some(k => !allowed[id].includes(k)) || Object.keys(c.flags).some(k => k !== 'falseAccusation')) errors.push(`${id}: effects outside declared bounds.`);
      const bounds: Record<string, Record<string, [number, number]>> = { rain: { food: [-2, 0], condition: [-4, 0] }, wheel: { stamina: [-4, 0], condition: [-5, 0] }, rumor: { reputation: [-3, 7], hysteria: [-5, 8] }, inspection: { reputation: [-4, 0] }, neighbor: { food: [-2, 0] }, accounts: { reputation: [0, 3], hysteria: [-2, 4] }, shelter: {}, weather: { stamina: [0, 3] } };
      for (const [key, [min, max]] of Object.entries(bounds[id])) {
        const k = key as keyof typeof c.deltas; const cost = c.costs[k] ?? 0; const delta = c.deltas[k] ?? 0;
        if (cost > -min || delta < min || delta > max || delta - cost < min || delta - cost > max) errors.push(`${id}: effects outside declared bounds.`);
      }
    }
  }
  if (new Set(variants.flatMap(v => v.events.map(e => e.id))).size !== 8) errors.push('Every event template must appear in a schedule.');
  return errors;
}
