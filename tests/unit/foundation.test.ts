import { describe, expect, it } from 'vitest';
import { firstCard, evidence } from '../../src/content/foundation';
import { choose, hysteriaLabel, initialState, inspectEvidence, reputationLabel } from '../../src/engine/foundation';

describe('foundation state', () => {
  it('starts with PRD meters, empty history/evidence, and false flags', () => {
    const state = initialState(firstCard.id);
    expect(state).toMatchObject({ reputation: 65, hysteria: 25, history: [], evidenceIds: [] });
    expect(Object.values(state.flags).every((flag) => flag === false)).toBe(true);
  });

  it('inspects without meter effects or duplicate records', () => {
    const before = initialState(firstCard.id);
    const after = inspectEvidence(before, firstCard, evidence.id);
    expect(after.evidenceIds).toEqual([evidence.id]);
    expect(after.reputation).toBe(65);
    expect(after.hysteria).toBe(25);
    expect(after.history).toEqual([]);
    expect(before.evidenceIds).toEqual([]);
    expect(inspectEvidence(after, firstCard, evidence.id)).toBe(after);
    expect(inspectEvidence(before, firstCard, 'missing')).toBe(before);
  });

  it('records the exact causal change without mutating the input', () => {
    const before = initialState(firstCard.id);
    const after = choose(before, firstCard, 'question-source');
    expect(after).toMatchObject({ reputation: 61, hysteria: 19, currentCardId: null });
    expect(after.history).toHaveLength(1);
    expect(after.history[0]).toMatchObject({
      cardId: 'whisper-01', choiceId: 'question-source',
      before: { reputation: 65, hysteria: 25 }, after: { reputation: 61, hysteria: 19 },
    });
    expect(before.history).toEqual([]);
    expect(before.reputation).toBe(65);
  });

  it('rejects invalid, stale, and repeated actions', () => {
    const before = initialState(firstCard.id);
    expect(choose(before, firstCard, 'missing')).toBe(before);
    const after = choose(before, firstCard, 'defer-authority');
    expect(choose(after, firstCard, 'defer-authority')).toBe(after);
    expect(choose(after, firstCard, 'question-source')).toBe(after);
  });

  it.each([[1, 'Under suspicion'], [24, 'Under suspicion'], [25, 'Watched'], [49, 'Watched'], [50, 'Accepted'], [74, 'Accepted'], [75, 'Favored'], [100, 'Favored']] as const)('labels reputation %i as %s', (value, label) => {
    expect(reputationLabel(value)).toBe(label);
  });

  it.each([[0, 'Uneasy'], [24, 'Uneasy'], [25, 'Rumors spreading'], [49, 'Rumors spreading'], [50, 'Fear governs'], [79, 'Fear governs'], [80, 'Near rupture'], [99, 'Near rupture']] as const)('labels hysteria %i as %s', (value, label) => {
    expect(hysteriaLabel(value)).toBe(label);
  });
});
