import { firstCard, evidence } from '../fixtures/foundation';
import { resolveChoice, transition } from '../../src/engine/transition';
import type { Action, Card, Content, GameState } from '../../src/engine/types';

// Synthetic engine routes, never mounted in the application or claimed as story witnesses.
const entry: Card = {
  ...firstCard, id: 'entry', puzzleIds: ['p1', 'p2', 'p3'],
  choices: [
    { ...firstCard.choices[0], id: 'question', nextCardId: 'court' },
    { ...firstCard.choices[1], id: 'accuse', flags: { falseAccusation: true }, nextCardId: 'court' },
  ],
};
const court: Card = {
  ...firstCard, id: 'court', chapter: 2,
  choices: [
    { ...firstCard.choices[0], id: 'challenge', label: 'Challenge without corroboration', deltas: { reputation: -10, hysteria: 0 }, nextCardId: 'jail', variants: [
      { id: 'sourced', requirements: { evidenceIds: [evidence.id], flags: { poppetProvenance: true } }, label: 'Challenge with the provenance record', deltas: { reputation: -3, hysteria: -5 }, flags: {}, consequence: 'You state the provenance and its limits.' },
    ] },
    { ...firstCard.choices[1], id: 'panic', deltas: { reputation: 6, hysteria: 100 }, nextCardId: 'jail' },
  ],
};
const jail: Card = {
  ...firstCard, id: 'jail', chapter: 3,
  choices: [
    { ...firstCard.choices[0], id: 'wait', deltas: { reputation: 0, hysteria: 0 }, nextCardId: 'final' },
    { ...firstCard.choices[1], id: 'collapse', deltas: { reputation: -100, hysteria: 0 }, nextCardId: 'final' },
  ],
};
const final: Card = {
  ...firstCard, id: 'final', chapter: 4, final: true,
  choices: [
    { ...firstCard.choices[0], id: 'refuse', finalAction: 'refuse', deltas: { reputation: 0, hysteria: 0 } },
    { ...firstCard.choices[1], id: 'sign', finalAction: 'sign', deltas: { reputation: 0, hysteria: 0 } },
  ],
};
export const fixture: Content = {
  version: 'engine-fixture-1', firstCardId: 'entry', cards: [entry, court, jail, final], evidence: [evidence],
  puzzles: [
    { id: 'p1', reward: 'poppetProvenance', solution: ['before', 'after'], hints: ['Look', 'Compare', 'before, after'], explanation: 'Provenance examined.' },
    { id: 'p2', reward: 'landMotiveExamined', solution: ['allegation'], hints: ['Look', 'Classify', 'allegation'], explanation: 'Motive examined.' },
    { id: 'p3', reward: 'courtContradiction', solution: ['circle'], hints: ['Look', 'Connect', 'circle'], explanation: 'Contradiction examined.' },
  ],
};
type WithoutRevision<T> = T extends { revision: number } ? Omit<T, 'revision'> : never;
export function act(state: GameState, command: WithoutRevision<Action>, content: Content = fixture): GameState {
  const result = transition(state, { ...command, revision: state.revision }, content);
  if (result.error) throw new Error(result.error);
  return result.state;
}
export function pick(state: GameState, id: string, content: Content = fixture): GameState {
  const card = content.cards.find((item) => item.id === state.currentCardId)!;
  const choice = resolveChoice(state, card.choices.find((item) => item.id === id)!);
  return act(state, { type: 'choose', cardId: card.id, choiceId: id, variantId: choice.variantId }, content);
}
export function prepared(state: GameState): GameState {
  state = act(state, { type: 'inspect', cardId: 'entry', evidenceId: evidence.id });
  for (const puzzle of fixture.puzzles) state = act(state, { type: 'solve', puzzleId: puzzle.id, answer: puzzle.solution });
  return state;
}
