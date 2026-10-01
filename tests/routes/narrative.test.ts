import { readFileSync, writeFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { content } from '../../src/content';
import { replay, searchGraph } from './search';
import type { Witness } from './search';
import { renderWalkthrough } from './walkthrough';

const fixturePath = new URL('./fixtures/narrative.json', import.meta.url);
describe('production narrative balance', () => {
  it('searches solved and skipped puzzle branches and saves reproducible witnesses', () => {
    const result = searchGraph();
    expect(result.deadEnds).toEqual([]);
    expect(result.reached.sort()).toEqual(content.cards.map(c => c.id).sort());
    expect(Object.keys(result.witnesses).sort()).toEqual(['condemned', 'name-preserved', 'town-rupture', 'within-system']);
    const clean = result.witnesses['name-preserved'];
    const recoverySteps = structuredClone(clean.steps);
    // One early deference to an unconfirmed rumor is recoverable without replay.
    recoverySteps[0].choiceId = 'defer-authority';
    const recovery = replay(recoverySteps);
    expect(recovery.ending).toBe('name-preserved');
    const data = { states: result.states, witnesses: { ...result.witnesses, 'recoverable-mistake': recovery } };
    const walkthroughPath = new URL('../../docs/ROUTES.md', import.meta.url);
    if (process.env.UPDATE_WITNESSES === '1') {
      writeFileSync(fixturePath, JSON.stringify(data, null, 2) + '\n');
      writeFileSync(walkthroughPath, renderWalkthrough(data));
    }
    expect(readFileSync(walkthroughPath, 'utf8')).toBe(renderWalkthrough(data));
    const stored = JSON.parse(readFileSync(fixturePath, 'utf8')) as typeof data;
    expect(stored).toEqual(data);
  }, 60000);
  it('replays saved inputs, including free mistakes and all three hints, with exact traces', () => {
    const data = JSON.parse(readFileSync(fixturePath, 'utf8')) as { witnesses: Record<string, Witness> };
    for (const witness of Object.values(data.witnesses)) {
      expect(replay(witness.steps)).toEqual(witness);
      expect(replay(witness.steps, true)).toEqual(witness);
      if (witness.ending === 'name-preserved') for (const row of witness.trace) {
        expect(row.reputation).toBeGreaterThan(0);
        expect(row.hysteria).toBeLessThan(100);
        expect(row.flags.falseAccusation).toBe(false);
        expect(row.flags.signedFalseConfession).toBe(false);
      }
    }
    const primary = data.witnesses['name-preserved'];
    const recovery = data.witnesses['recoverable-mistake'];
    expect(primary.steps.filter((s, i) => s.choiceId !== recovery.steps[i].choiceId)).toHaveLength(1);
    expect(recovery.trace.at(-1)?.flags).toMatchObject({ poppetProvenance: true, landMotiveExamined: true, courtContradiction: true });
  });
});
