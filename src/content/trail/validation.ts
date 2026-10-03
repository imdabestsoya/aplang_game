import type { Asset, PixelAsset, TrailContent } from './types';

const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const text = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;
const integer = (v: unknown) => Number.isInteger(v) && Number(v) >= 0;
const strings = (v: unknown): v is string[] => Array.isArray(v) && v.every(text);
const effects = (v: unknown, costs = false) => record(v) && Object.entries(v).every(([k, n]) => ['food', 'stamina', 'condition', 'coins', 'kits', 'reputation', 'hysteria'].includes(k) && Number.isInteger(n) && (!costs || Number(n) >= 0));
const flags = (v: unknown) => record(v) && Object.values(v).every(n => typeof n === 'boolean');
const basis = (v: unknown) => ['canonical', 'interpretation', 'invented'].includes(String(v));

export function validateTrail(input: unknown): string[] {
  const errors: string[] = [];
  const check = (ok: unknown, message: string) => { if (!ok) errors.push(message); };
  const groups = ['landmarks', 'routes', 'encounters', 'puzzles', 'symbols', 'assets'];
  if (!record(input) || !groups.every(k => Array.isArray(input[k]) && input[k].every(record))) return ['Content requires record arrays for landmarks/routes/encounters/puzzles/symbols/assets.'];
  const data = input as unknown as TrailContent;
  const ids = (name: string) => new Set((input[name] as Record<string, unknown>[]).map(r => r.id));
  for (const group of groups) {
    const rows = input[group] as Record<string, unknown>[];
    check(rows.every(r => text(r.id)) && ids(group).size === rows.length, `${group}: IDs must be unique nonempty strings.`);
  }
  check(text(data.version) && ids('landmarks').has(data.firstLandmark), 'Missing content version or first landmark.');
  const source = (r: unknown) => record(r) && basis(r.basis) && text(r.actReference) && text(r.sourceNote) && strings(r.symbolismIds) && r.symbolismIds.length > 0 && r.symbolismIds.every(id => ids('symbols').has(id));
  const point = (p: unknown, map: TrailContent['landmarks'][number]) => record(p) && integer(p.x) && integer(p.y) && Number(p.x) < map.width && Number(p.y) < map.height;
  const interactionIds = new Set<string>();
  for (const map of data.landmarks) {
    check(text(map.title) && integer(map.width) && map.width > 0 && integer(map.height) && map.height > 0 && ids('assets').has(map.assetId), `${map.id}: invalid landmark/asset.`);
    const validGrid = strings(map.walkable) && map.walkable.length === map.height && map.walkable.every(row => row.length === map.width && /^[01]+$/.test(row));
    check(validGrid, `${map.id}: invalid collision grid.`);
    check(point(map.spawn, map) && validGrid && map.walkable[map.spawn.y]?.[map.spawn.x] === '1', `${map.id}: spawn must be walkable.`);
    if (!Array.isArray(map.interactions) || !map.interactions.every(record)) { errors.push(`${map.id}: invalid interactions.`); continue; }
    check(map.interactions.length >= 3 && map.interactions.length <= 5, `${map.id}: requires 3–5 interactions.`);
    for (const i of map.interactions) {
      check(text(i.id) && !interactionIds.has(i.id), `${map.id}: duplicate interaction ID.`); interactionIds.add(i.id);
      check(point(i, map) && text(i.title) && text(i.body) && source(i) && ids('encounters').has(i.encounterId), `${i.id}: invalid interaction/source/reference.`);
      check(validGrid && [[0, 1], [0, -1], [1, 0], [-1, 0]].some(([x, y]) => map.walkable[i.y + y]?.[i.x + x] === '1'), `${i.id}: no adjacent approach tile.`);
    }
  }
  for (const route of data.routes) {
    check(ids('landmarks').has(route.origin) && ids('landmarks').has(route.destination) && route.origin !== route.destination && integer(route.length) && route.length > 0 && effects(route.arrivalEffects), `${route.id}: invalid route.`);
    check(route.obstacle === null || ids('encounters').has(route.obstacle), `${route.id}: unknown obstacle.`);
    check(Array.isArray(route.eventThresholds) && route.eventThresholds.every(n => integer(n) && n > 0 && n <= route.length) && new Set(route.eventThresholds).size === route.eventThresholds.length, `${route.id}: invalid event thresholds.`);
  }
  for (const encounter of data.encounters) {
    check(source(encounter) && typeof encounter.mandatory === 'boolean' && flags(encounter.conditions) && text(encounter.dialogue), `${encounter.id}: invalid encounter/source.`);
    if (!Array.isArray(encounter.actions) || !encounter.actions.every(record)) { errors.push(`${encounter.id}: invalid actions.`); continue; }
    check(encounter.actions.length >= 2 && encounter.actions.length <= 3 && new Set(encounter.actions.map(a => a.id)).size === encounter.actions.length, `${encounter.id}: requires 2–3 unique actions.`);
    for (const a of encounter.actions) check(text(a.id) && text(a.label) && effects(a.costs, true) && effects(a.deltas) && flags(a.flags) && ['landmark', 'travel', 'event', 'jail', 'ended'].includes(a.nextPhase), `${encounter.id}/${a.id}: invalid action.`);
  }
  for (const p of data.puzzles) check(source(p) && strings(p.clues) && p.clues.length > 0 && p.clues.every(id => interactionIds.has(id)) && strings(p.solution) && p.solution.length > 0 && strings(p.hints) && p.hints.length === 3 && new Set(p.hints).size === 3 && text(p.feedback) && text(p.resultFlag), `${p.id}: invalid puzzle/clue/solution/hints.`);
  for (const s of data.symbols) check(/^S\d{2}$/.test(s.id) && basis(s.basis) && text(s.decision) && text(s.rationale) && strings(s.implementationReferences) && s.implementationReferences.length > 0 && ['implemented', 'partial', 'planned'].includes(s.status), `${s.id}: invalid symbolism.`);
  for (const a of data.assets) {
    check(text(a.path) && /^\/assets\/trail\/[a-z0-9-]+\.json$/.test(a.path) && [a.width, a.height, a.frameWidth, a.frameHeight, a.frames].every(n => integer(n) && n > 0), `${a.id}: invalid asset dimensions/path.`);
    check(a.width % a.frameWidth === 0 && a.height % a.frameHeight === 0 && a.frames === (a.width / a.frameWidth) * (a.height / a.frameHeight), `${a.id}: invalid frame count.`);
    check(strings(a.palette) && a.palette.length > 0 && text(a.creator) && text(a.license) && typeof a.placeholder === 'boolean' && (a.placeholder ? text(a.replacementOwner) : a.replacementOwner === null), `${a.id}: invalid palette/provenance/replacement plan.`);
  }
  return errors;
}

export function validatePixels(input: unknown, asset: Asset): string[] {
  if (!record(input) || !record(input.palette) || !strings(input.pixels)) return [`${asset.id}: malformed pixel data.`];
  const data = input as unknown as PixelAsset;
  const errors: string[] = [];
  if (data.width !== asset.width || data.height !== asset.height || data.pixels.length !== asset.height || data.pixels.some(row => row.length !== asset.width)) errors.push(`${asset.id}: pixel dimensions mismatch.`);
  if (!Object.entries(data.palette).every(([key, value]) => key.length === 1 && (value === 'transparent' || /^#[0-9a-f]{6}$/i.test(value)) && asset.palette.includes(value))) errors.push(`${asset.id}: invalid palette.`);
  if (data.pixels.some(row => [...row].some(pixel => !(pixel in data.palette)))) errors.push(`${asset.id}: unknown pixel color.`);
  return errors;
}
