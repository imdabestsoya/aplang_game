import { describe, expect, it } from 'vitest';
import { firstCard, evidence, content } from '../fixtures/foundation';
import { initialState } from '../../src/engine/transition';
import { act, pick } from '../fixtures/engine';

// Foundation paths only: these are not full-game ending witnesses.
describe('one-card routes', () => {
  it('resolves all evidence references and exposes exactly two unique choices', () => {
    expect(firstCard.evidenceIds).toEqual([evidence.id]);
    expect(firstCard.choices).toHaveLength(2);
    expect(new Set(firstCard.choices.map((choice) => choice.id)).size).toBe(2);
  });

  for (const inspected of [false, true]) {
    it.each([
      ['question-source', 61, 19],
      ['defer-authority', 71, 33],
    ] as const)(`reaches sample end via %s with inspection=${inspected}`, (id, reputation, hysteria) => {
      let state = initialState(content);
      if (inspected) state = act(state, { type: 'inspect', cardId: firstCard.id, evidenceId: evidence.id }, content);
      state = pick(state, id, content);
      expect(state.phase).toBe('consequence');
      state = act(state, { type: 'continue' }, content);
      expect(state).toMatchObject({ currentCardId: firstCard.id, phase: 'sample-complete', reputation, hysteria });
      expect(state.history).toHaveLength(1);
      expect(state.history[0].consequence.length).toBeGreaterThan(0);
      expect(state.flags.falseAccusation).toBe(false);
    });
  }
});
