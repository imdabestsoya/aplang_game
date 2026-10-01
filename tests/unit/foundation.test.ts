import { describe, expect, it } from 'vitest';
import { firstCard, evidence, content } from '../../src/content/foundation';
import { hysteriaLabel, reputationLabel } from '../../src/engine/foundation';
import { initialState, transition } from '../../src/engine/transition';
import { act, pick } from '../fixtures/engine';

describe('foundation state', () => {
  it('starts with PRD meters, empty history/evidence, and false flags', () => {
    const state = initialState(content);
    expect(state).toMatchObject({ reputation: 65, hysteria: 25, history: [], evidenceIds: [] });
    expect(Object.values(state.flags).every((flag) => flag === false)).toBe(true);
  });

  it('inspects without meter effects or duplicate records', () => {
    const before = initialState(content);
    const after = act(before, { type: 'inspect', cardId: firstCard.id, evidenceId: evidence.id }, content);
    expect(after.evidenceIds).toEqual([evidence.id]);
    expect(after.reputation).toBe(65);
    expect(after.hysteria).toBe(25);
    expect(after.history).toEqual([]);
    expect(before.evidenceIds).toEqual([]);
    expect(act(after, { type: 'inspect', cardId: firstCard.id, evidenceId: evidence.id }, content)).toBe(after);
    expect(transition(before, { type: 'inspect', revision: before.revision, cardId: firstCard.id, evidenceId: 'missing' }, content).state).toBe(before);
  });

  it('records the exact causal change without mutating the input', () => {
    const before = initialState(content);
    const after = pick(before, 'question-source', content);
    expect(after).toMatchObject({ reputation: 61, hysteria: 19, currentCardId: firstCard.id, phase: 'consequence' });
    expect(after.history).toHaveLength(1);
    expect(after.history[0]).toMatchObject({
      cardId: 'whisper-01', choiceId: 'question-source',
      before: { reputation: 65, hysteria: 25 }, after: { reputation: 61, hysteria: 19 },
    });
    expect(before.history).toEqual([]);
    expect(before.reputation).toBe(65);
  });

  it('rejects invalid, stale, and repeated actions', () => {
    const before = initialState(content);
    expect(transition(before, { type: 'choose', revision: before.revision, cardId: firstCard.id, choiceId: 'missing', variantId: null }, content).state).toBe(before);
    const after = pick(before, 'defer-authority', content);
    expect(transition(after, { type: 'choose', revision: after.revision, cardId: firstCard.id, choiceId: 'defer-authority', variantId: null }, content).state).toBe(after);
    expect(transition(after, { type: 'choose', revision: after.revision, cardId: firstCard.id, choiceId: 'question-source', variantId: null }, content).state).toBe(after);
  });

  it.each([[1, 'Under suspicion'], [24, 'Under suspicion'], [25, 'Watched'], [49, 'Watched'], [50, 'Accepted'], [74, 'Accepted'], [75, 'Favored'], [100, 'Favored']] as const)('labels reputation %i as %s', (value, label) => {
    expect(reputationLabel(value)).toBe(label);
  });

  it.each([[0, 'Uneasy'], [24, 'Uneasy'], [25, 'Rumors spreading'], [49, 'Rumors spreading'], [50, 'Fear governs'], [79, 'Fear governs'], [80, 'Near rupture'], [99, 'Near rupture']] as const)('labels hysteria %i as %s', (value, label) => {
    expect(hysteriaLabel(value)).toBe(label);
  });
});
