import { afterEach, describe, expect, it, vi } from 'vitest';
import { readFileSync, mkdtempSync, mkdirSync, copyFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { trailContent } from '../../src/content/trail';
import { validateTrail, validatePixels } from '../../src/content/trail/validation';
import { initialExploration, move, inspect, nearby, supplies } from '../../src/engine/trail/exploration';
import { load, save, serialize, TRAIL_KEY } from '../../src/persistence/trail/exploration';
const map = trailContent.landmarks[0];
afterEach(() => vi.unstubAllGlobals());

describe('trail contracts and assets', () => {
  it('validates the authored landmark and actual pixel files', () => {
    expect(validateTrail(trailContent)).toEqual([]);
    for (const asset of trailContent.assets) expect(validatePixels(JSON.parse(readFileSync(`public${asset.path}`, 'utf8')), asset)).toEqual([]);
  });
  it('rejects broken references, duplicate IDs, bad frame counts and missing provenance', () => {
    const broken = structuredClone(trailContent);
    broken.landmarks[0].interactions[0].encounterId = 'missing';
    broken.landmarks[0].interactions[0].symbolismIds = ['S99'];
    broken.encounters.push(broken.encounters[0]);
    broken.assets[0].frames = 5;
    broken.assets[0].replacementOwner = null;
    const errors = validateTrail(broken).join(' ');
    expect(errors).toMatch(/interaction\/source\/reference/); expect(errors).toMatch(/unique/);
    expect(errors).toMatch(/frame count/); expect(errors).toMatch(/replacement plan/);
  });
  it('rejects invalid routes, action costs and puzzle clue contracts', () => {
    const broken = structuredClone(trailContent);
    broken.routes = [{ id: 'r1', origin: 'L1', destination: 'missing', length: -1, arrivalEffects: {}, obstacle: 'missing', eventThresholds: [2, 2] }];
    broken.encounters[0].actions[0].costs.food = -1;
    broken.puzzles = [{ ...broken.landmarks[0].interactions[0], clues: ['missing'], solution: [], hints: ['same', 'same', 'same'], feedback: '', resultFlag: '' }];
    expect(validateTrail(broken).join(' ')).toMatch(/invalid route/);
    expect(validateTrail(broken).join(' ')).toMatch(/invalid action/);
    expect(validateTrail(broken).join(' ')).toMatch(/invalid puzzle/);
  });
  it('rejects malformed grids, out-of-bounds spawn and invalid pixel data', () => {
    const broken = structuredClone(trailContent); broken.landmarks[0].spawn.x = 100;
    expect(validateTrail(broken).join(' ')).toMatch(/spawn/);
    broken.landmarks[0].walkable[0] = 'x'; expect(validateTrail(broken).join(' ')).toMatch(/collision grid/);
    expect(validateTrail(null)).not.toEqual([]);
    expect(validatePixels({ width: 1, height: 1, palette: { a: 'bogus' }, pixels: ['?'] }, trailContent.assets[0]).join(' ')).toMatch(/dimensions.*palette.*color/);
  });
  it('asset CLI fails on a missing file rather than reporting success', () => {
    const root = mkdtempSync(join(tmpdir(), 'weight-validator-'));
    try {
      for (const path of ['scripts', 'src/content/trail', 'src/components', 'src/rendering']) mkdirSync(join(root, path), { recursive: true });
      for (const path of ['scripts/validate-trail.mjs', 'src/content/trail/validation.ts', 'src/content/trail/types.ts', 'src/content/trail/itineraries.ts', 'src/content/trail/foundation.json']) copyFileSync(path, join(root, path));
      for (const path of ['src/components/TrailApp.tsx', 'src/rendering/TrailWorld.tsx']) writeFileSync(join(root, path), '');
      writeFileSync(join(root, 'package.json'), '{"type":"module"}');
      const result = spawnSync(process.execPath, ['--experimental-strip-types', 'scripts/validate-trail.mjs', '--assets'], { cwd: root, encoding: 'utf8' });
      expect(result.status).toBe(1); expect(result.stderr).toContain('cannot read asset');
    } finally { rmSync(root, { recursive: true, force: true }); }
  });
});

describe('exploration without survival time', () => {
  it('reaches every interaction through legal movement and never leaves collision bounds', () => {
    const queue = [initialExploration(map)]; const visited = new Set<string>(); const reached = new Set<string>();
    while (queue.length) {
      const state = queue.shift()!; const key = `${state.x},${state.y}`;
      if (visited.has(key)) continue; visited.add(key);
      expect(map.walkable[state.y][state.x]).toBe('1'); nearby(state, map).forEach(i => reached.add(i.id));
      for (const direction of ['north', 'south', 'east', 'west'] as const) queue.push(move(state, direction, map));
    }
    expect([...reached].sort()).toEqual(map.interactions.map(i => i.id).sort());
    let state = initialExploration(map);
    for (let i = 0; i < 100; i++) state = move(state, 'south', map);
    expect(state.y).toBe(8);
  });
  it('records inspection once, ignores unknown objects and preserves supplies', () => {
    const before = JSON.stringify(supplies); const state = initialExploration(map);
    const next = inspect(state, 'notice', map);
    expect(next.inspected).toEqual(['notice']); expect(state.inspected).toEqual([]);
    expect(inspect(next, 'notice', map)).toBe(next); expect(inspect(next, 'bad', map)).toBe(next);
    expect(JSON.stringify(supplies)).toBe(before);
  });
});

describe('isolated trail save', () => {
  it('round trips without reading or writing legacy keys', () => {
    const values = new Map([['the-weight:run', 'legacy sentinel']]);
    const storage = { getItem: vi.fn((key: string) => values.get(key) ?? null), setItem: vi.fn((key: string, v: string) => values.set(key, v)) };
    vi.stubGlobal('localStorage', storage);
    const state = inspect(initialExploration(map), 'notice', map);
    expect(save(state, map)).toBeNull(); expect(load(map).state).toEqual(state);
    expect(values.get('the-weight:run')).toBe('legacy sentinel');
    expect(storage.getItem).toHaveBeenCalledWith(TRAIL_KEY); expect(storage.setItem.mock.calls.every(([key]) => key === TRAIL_KEY)).toBe(true);
  });
  it('preserves corrupt or incompatible saves and tolerates blocked storage', () => {
    const storage = { getItem: () => '{bad', setItem: vi.fn() }; vi.stubGlobal('localStorage', storage);
    expect(load(map).canSave).toBe(false); expect(storage.setItem).not.toHaveBeenCalled();
    storage.getItem = () => serialize({ ...initialExploration(map), x: 90 }, map);
    expect(load(map).canSave).toBe(false);
    storage.getItem = () => { throw new Error('blocked'); }; expect(load(map).state).toEqual(initialExploration(map));
    storage.setItem.mockImplementation(() => { throw new Error('quota'); }); expect(save(initialExploration(map), map)).toMatch(/could not be saved/);
  });
});
