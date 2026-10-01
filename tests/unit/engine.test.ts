import { describe, expect, it } from 'vitest';
import { validateContent } from '../../src/engine/content';
import { resolveEnding } from '../../src/engine/endings';
import { initialState, resolveChoice, transition } from '../../src/engine/transition';
import { fixture, act, pick, prepared } from '../fixtures/engine';
import { content } from '../fixtures/foundation';
import type { Card, GameState } from '../../src/engine/types';

const final = fixture.cards[3];
function finalState(): GameState {
  let state = prepared(initialState(fixture));
  for (const id of ['question', 'challenge', 'wait']) state = act(pick(state, id), { type: 'continue' });
  return state;
}

describe('content validation', () => {
  it('validates shipped content and synthetic engine fixtures', () => {
    expect(validateContent(content)).toEqual([]);
    expect(validateContent(fixture)).toEqual([]);
  });
  it('rejects broken IDs, unresolved variants, and malformed final choices', () => {
    const broken: Card = { ...fixture.cards[0], final: true, evidenceIds: ['missing'], choices: [{ ...fixture.cards[0].choices[0], nextCardId: 'missing' }, fixture.cards[0].choices[0]] };
    expect(validateContent({ ...fixture, cards: [broken, broken] }).length).toBeGreaterThan(3);
  });
});

describe('atomic transitions', () => {
  it('rejects stale/wrong-card/missing-choice actions without changing input', () => {
    const state = initialState(fixture);
    const original = JSON.stringify(state);
    for (const action of [
      { type: 'choose' as const, revision: -1, cardId: 'entry', choiceId: 'question', variantId: null },
      { type: 'choose' as const, revision: 0, cardId: 'court', choiceId: 'question', variantId: null },
      { type: 'choose' as const, revision: 0, cardId: 'entry', choiceId: 'missing', variantId: null },
    ]) {
      const result = transition(state, action, fixture);
      expect(result.state).toBe(state);
      expect(result.error).toBeTruthy();
    }
    expect(JSON.stringify(state)).toBe(original);
  });
  it('holds the consequence until continue, records once, and rejects rapid duplicate requests', () => {
    const state = initialState(fixture);
    const action = { type: 'choose' as const, revision: 0, cardId: 'entry', choiceId: 'question', variantId: null };
    const next = transition(state, action, fixture).state;
    expect(next.phase).toBe('consequence');
    expect(next.currentCardId).toBe('entry');
    expect(next.history).toHaveLength(1);
    expect(transition(next, action, fixture).state).toBe(next);
    expect(transition(next, { ...action, revision: next.revision }, fixture).state).toBe(next);
    expect(act(next, { type: 'continue' }).currentCardId).toBe('court');
    expect(state.history).toEqual([]);
  });
  it('keeps two available choices and checks the exact displayed evidence variant', () => {
    const unprepared = act(pick(initialState(fixture), 'question'), { type: 'continue' });
    const ready = act(pick(prepared(initialState(fixture)), 'question'), { type: 'continue' });
    const choice = fixture.cards[1].choices[0];
    expect(resolveChoice(unprepared, choice).variantId).toBeNull();
    expect(resolveChoice(ready, choice)).toMatchObject({ variantId: 'sourced', label: 'Challenge with the provenance record' });
    expect(transition(unprepared, { type: 'choose', revision: unprepared.revision, cardId: 'court', choiceId: 'challenge', variantId: 'sourced' }, fixture).state).toBe(unprepared);
    expect(transition(ready, { type: 'choose', revision: ready.revision, cardId: 'court', choiceId: 'challenge', variantId: null }, fixture).state).toBe(ready);
    expect(pick(unprepared, 'challenge').history.at(-1)?.after.reputation).toBe(51);
    expect(pick(ready, 'challenge').history.at(-1)?.after.reputation).toBe(58);
    expect(fixture.cards[1].choices).toHaveLength(2);
  });
  it('records inspection after a choice without applying its effects again', () => {
    const decided = pick(initialState(fixture), 'question');
    const inspected = act(decided, { type: 'inspect', cardId: 'entry', evidenceId: 'household-report' });
    expect(inspected.evidenceIds).toEqual(['household-report']);
    expect(inspected.history).toEqual(decided.history);
    expect(inspected.reputation).toBe(decided.reputation);
    expect(inspected.phase).toBe('consequence');
  });
  it('keeps inspection, hints, wrong answers and solutions free, retaining evidence', () => {
    let state = initialState(fixture);
    state = act(state, { type: 'inspect', cardId: 'entry', evidenceId: 'household-report' });
    for (let i = 0; i < 4; i++) state = act(state, { type: 'hint', puzzleId: 'p1' });
    expect(state.hintLevels.p1).toBe(3);
    state = act(state, { type: 'solve', puzzleId: 'p1', answer: ['wrong'] });
    expect(state.puzzleFeedback).toContain('no penalty');
    state = act(state, { type: 'solve', puzzleId: 'p1', answer: ['before', 'after'] });
    expect(state.flags.poppetProvenance).toBe(true);
    expect(state.evidenceIds).toEqual(['household-report']);
    expect(state).toMatchObject({ reputation: 65, hysteria: 25, history: [] });
    expect(act(state, { type: 'solve', puzzleId: 'p1', answer: ['before', 'after'] })).toBe(state);
    expect(transition(state, { type: 'hint', puzzleId: 'missing', revision: state.revision }, fixture).state).toBe(state);
  });
});

describe('ending precedence and final choices', () => {
  it.each([
    [-100, 100, 'town-rupture', true, 0, 100],
    [-100, 0, 'condemned', true, 0, 14],
    [100, 100, 'town-rupture', false, 100, 100],
    [100, -100, 'name-preserved', false, 100, 0],
  ] as const)('clamps final deltas %i/%i and resolves %s', (r, h, id, condemnation, expectedR, expectedH) => {
    const changed: Card = { ...final, choices: [{ ...final.choices[0], deltas: { reputation: r, hysteria: h } }, final.choices[1]] };
    const testContent = { ...fixture, cards: [...fixture.cards.slice(0, 3), changed] };
    const next = pick(finalState(), 'refuse', testContent);
    expect(next).toMatchObject({ reputation: expectedR, hysteria: expectedH, phase: 'consequence', ending: { id, condemnation } });
    const ended = act(next, { type: 'continue' }, testContent);
    expect(ended.phase).toBe('ended');
    expect(transition(ended, { type: 'choose', cardId: 'final', choiceId: 'sign', variantId: null, revision: ended.revision }, testContent).state).toBe(ended);
  });
  it('does not let signing bypass a threshold ending', () => {
    const changed: Card = { ...final, choices: [final.choices[0], { ...final.choices[1], deltas: { reputation: -100, hysteria: 100 } }] };
    const next = pick(finalState(), 'sign', { ...fixture, cards: [...fixture.cards.slice(0, 3), changed] });
    expect(next.ending).toMatchObject({ id: 'town-rupture', condemnation: true });
    expect(next.flags.signedFalseConfession).toBe(true);
  });
  it('separates refusal, confession, and unresolved refusal', () => {
    expect(pick(finalState(), 'refuse').ending?.id).toBe('name-preserved');
    expect(pick(finalState(), 'sign').ending?.variant).toBe('confession');
    for (const flag of ['poppetProvenance', 'landMotiveExamined', 'courtContradiction', 'falseAccusation', 'signedFalseConfession'] as const) {
      const state = finalState();
      state.flags[flag] = !state.flags[flag];
      expect(pick(state, 'refuse').ending?.variant).toBe('unresolved-resistance');
    }
  });
  it('does not label an ordinary null next-card sample as a final ending', () => {
    expect(resolveEnding(initialState(content), content.cards[0], content.cards[0].choices[0])).toBeNull();
  });
});

describe('chapter replay and restart', () => {
  it('restores chapter-start evidence, flags, meters, hints and history; discards later checkpoints', () => {
    let state = act(pick(prepared(initialState(fixture)), 'accuse'), { type: 'continue' });
    const startOfCourt = state.checkpoints[1].state;
    state = act(pick(state, 'challenge'), { type: 'continue' });
    state = act(pick(state, 'wait'), { type: 'continue' });
    const oldRevision = state.revision;
    state = act(state, { type: 'replay', chapter: 2 });
    expect(state).toMatchObject(startOfCourt);
    expect(state.history).toHaveLength(1);
    expect(state.checkpoints.map((point) => point.chapter)).toEqual([1, 2]);
    expect(state.revision).toBeGreaterThan(oldRevision);
    state = act(state, { type: 'replay', chapter: 1 });
    expect(state.flags.falseAccusation).toBe(false);
    expect(state.evidenceIds).toEqual([]);
    expect(state.solvedPuzzleIds).toEqual([]);
    expect(state.history).toEqual([]);
  });
  it('rejects unreached chapters and resets only when explicitly requested', () => {
    const state = pick(initialState(fixture), 'accuse');
    expect(transition(state, { type: 'replay', chapter: 4, revision: state.revision }, fixture).state).toBe(state);
    const restarted = act(state, { type: 'restart' });
    expect(restarted).toMatchObject({ history: [], reputation: 65, hysteria: 25, phase: 'choice' });
    expect(restarted.revision).toBeGreaterThan(state.revision);
  });
});
