import { describe, expect, it } from 'vitest';
import { content } from '../../src/content';
import { validateNarrative } from '../../src/content/validation';
import { quotations, visibleQuotations } from '../../src/content/quotations';
import { initialState, resolveChoice, transition } from '../../src/engine/transition';
import type { GameState } from '../../src/engine/types';

function choose(state: GameState, index: number) {
  const card = content.cards.find(c => c.id === state.currentCardId)!;
  const choice = resolveChoice(state, card.choices[index]);
  const result = transition(state, { type: 'choose', cardId: card.id, choiceId: choice.id, variantId: choice.variantId, revision: state.revision }, content);
  expect(result.error).toBeNull();
  return result.state;
}
const advance = (s: GameState) => transition(s, { type: 'continue', revision: s.revision }, content).state;

describe('authored narrative', () => {
  it('validates all cards, clues, source metadata and registry references', () => expect(validateNarrative(content)).toEqual([]));
  it('rejects missing metadata, unknown symbolism, missing clues and unreachable cards', () => {
    const broken = structuredClone(content);
    broken.cards[0].sourceNote = '';
    broken.cards[0].symbolismIds = ['S99'];
    broken.cards[0].choices = broken.cards[0].choices.map(c => ({ ...c, nextCardId: 'name-04' })) as unknown as typeof broken.cards[0]['choices'];
    broken.puzzles[0].evidenceIds = ['missing'];
    expect(validateNarrative(broken).join(' ')).toMatch(/metadata/);
    expect(validateNarrative(broken).join(' ')).toMatch(/symbolism/);
    expect(validateNarrative(broken).join(' ')).toMatch(/Unreachable/);
    expect(validateNarrative(broken).join(' ')).toMatch(/clues/);
  });
  it('can reach every card through real transitions without puzzle rewards', () => {
    const reached = new Set<string>();
    const seen = new Set<string>();
    function search(state: GameState): boolean {
      if (state.phase !== 'choice') return false;
      reached.add(state.currentCardId);
      if (reached.size === 16) return true;
      const key = `${state.currentCardId}/${state.reputation}/${state.hysteria}/${state.flags.falseAccusation}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return [0, 1].some(index => search(advance(choose(state, index))));
    }
    expect(search(initialState(content))).toBe(true);
    expect(reached.size).toBe(16);
  });
  it('separates the checked excerpt from drafts without invented edition metadata', () => {
    expect(quotations.map(q => q.id)).toEqual(['Q1', 'Q2', 'Q3', 'Q4', 'Q5']);
    expect(quotations[0]).toMatchObject({ status: 'verified', page: '249', verifiedAt: '2026-10-01' });
    for (const q of quotations.slice(1)) {
      expect(q).toMatchObject({ status: 'draft', page: null, edition: null, verifiedAt: null });
      expect(q.text).toBeTruthy();
      expect(q.sourceUrl).toMatch(/^https:/);
    }
    expect(quotations.reduce((sum, q) => sum + (q.text?.split(/\s+/).length ?? 0), 0)).toBeLessThanOrEqual(25);
  });
  it('shows Q5 on the first false accusation, preserves the flag and clears it on chapter replay', () => {
    let state = advance(choose(advance(choose(initialState(content), 0)), 0));
    expect(visibleQuotations(state, content).map(q => q.id)).toContain('Q2');
    state = choose(state, 1);
    expect(state.flags.falseAccusation).toBe(true);
    expect(visibleQuotations(state, content).map(q => q.id)).toContain('Q5');
    state = advance(state);
    expect(visibleQuotations(state, content).map(q => q.id)).not.toContain('Q5');
    state = transition(state, { type: 'replay', chapter: 1, revision: state.revision }, content).state;
    expect(state.flags.falseAccusation).toBe(false);
  });
  it('shows Q3 at the first threshold crossing and uses debrief fallbacks', () => {
    let state = initialState(content);
    state.hysteria = 75;
    state = choose(state, 1);
    expect(visibleQuotations(state, content).map(q => q.id)).toContain('Q3');
    state = advance(state);
    state = choose(state, 1);
    expect(visibleQuotations(state, content).map(q => q.id)).not.toContain('Q3');
    state.phase = 'ended';
    expect(visibleQuotations(state, content).map(q => q.id)).toEqual(['Q1', 'Q5']);
    const fresh = { ...initialState(content), phase: 'ended' as const };
    expect(visibleQuotations(fresh, content).map(q => q.id)).toEqual(['Q1', 'Q3', 'Q5']);
  });
});

it('distinguishes causal ending explanations on the authored final card', () => {
  const final = content.cards.at(-1)!;
  const base = { ...initialState(content), currentCardId: final.id };
  const refusal = choose(base, 0).ending!;
  const confession = choose(base, 1).ending!;
  const informed = { ...base, flags: { ...base.flags, poppetProvenance: true, landMotiveExamined: true, courtContradiction: true } };
  const resistance = choose(informed, 0).ending!;
  const accused = choose({ ...informed, flags: { ...informed.flags, falseAccusation: true } }, 0).ending!;
  expect(refusal.explanation).toContain('incomplete');
  expect(confession.explanation).toContain('sign a false confession');
  expect(resistance.explanation).toContain('not physical escape');
  expect(accused.explanation).toContain('earlier false accusation');
  expect(new Set([refusal, confession, resistance, accused].map(e => e.explanation)).size).toBe(4);
});

it('offers Q3 at the court debrief if no crossing occurred', () => {
  const state = { ...initialState(content), currentCardId: 'court-04', phase: 'consequence' as const };
  expect(visibleQuotations(state, content).map(q => q.id)).toContain('Q3');
});

it('places Q1 at confession and Q4 at the circular-rule exercise', () => {
  const state = initialState(content);
  expect(visibleQuotations({ ...state, currentCardId: 'name-04' }, content).map(q => q.id)).toEqual(['Q1']);
  expect(visibleQuotations({ ...state, currentCardId: 'court-04' }, content).map(q => q.id)).toEqual(['Q4']);
  expect(visibleQuotations(state, content)).toEqual([]);
});
