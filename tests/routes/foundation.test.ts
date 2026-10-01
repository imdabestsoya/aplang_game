import { describe, expect, it } from 'vitest';
import { firstCard, evidence } from '../../src/content/foundation';
import { choose, initialState, inspectEvidence } from '../../src/engine/foundation';

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
      let state = initialState(firstCard.id);
      if (inspected) state = inspectEvidence(state, firstCard, evidence.id);
      state = choose(state, firstCard, id);
      expect(state).toMatchObject({ currentCardId: null, reputation, hysteria });
      expect(state.history).toHaveLength(1);
      expect(state.history[0].consequence.length).toBeGreaterThan(0);
      expect(state.flags.falseAccusation).toBe(false);
    });
  }
});
