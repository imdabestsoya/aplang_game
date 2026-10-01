import { describe, expect, it } from 'vitest';
import { initialState } from '../../src/engine/transition';
import { loadRun, saveRun } from '../../src/persistence/storage';
import { act, fixture, pick, prepared } from '../fixtures/engine';

// These prove engine contracts against synthetic content, not PRD story solvability.
describe('synthetic ending witnesses', () => {
  it.each([
    { choices: ['question', 'challenge', 'wait', 'refuse'], prep: true, ending: 'name-preserved', variant: 'resistance' },
    { choices: ['question', 'challenge', 'wait', 'sign'], prep: true, ending: 'within-system', variant: 'confession' },
    { choices: ['question', 'challenge', 'wait', 'refuse'], prep: false, ending: 'within-system', variant: 'unresolved-resistance' },
    { choices: ['accuse', 'challenge', 'wait', 'refuse'], prep: true, ending: 'within-system', variant: 'unresolved-resistance' },
    { choices: ['question', 'panic'], prep: false, ending: 'town-rupture', variant: 'threshold' },
    { choices: ['question', 'challenge', 'collapse'], prep: false, ending: 'condemned', variant: 'threshold' },
  ])('reaches $ending / $variant via $choices', ({ choices, prep, ending, variant }) => {
    let state = initialState(fixture);
    if (prep) {
      for (const puzzle of fixture.puzzles) {
        for (let n = 0; n < 3; n++) state = act(state, { type: 'hint', puzzleId: puzzle.id });
      }
      state = prepared(state);
    }
    let raw: string | null = null;
    const store = { getItem: () => raw, setItem: (_key: string, value: string) => { raw = value; } };
    for (const id of choices) {
      state = pick(state, id);
      expect(state.phase).toBe('consequence');
      saveRun(state, fixture, () => store);
      const loaded = loadRun(fixture, () => store);
      expect(loaded.issue).toBeNull();
      expect(loaded.state).toEqual(state);
      state = act(loaded.state, { type: 'continue' });
    }
    expect(state.phase).toBe('ended');
    expect(state.ending).toMatchObject({ id: ending, variant });
    expect(state.history).toHaveLength(choices.length);
  });
});
