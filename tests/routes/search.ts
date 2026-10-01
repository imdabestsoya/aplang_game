import { content } from '../../src/content';
import { initialState, resolveChoice, transition } from '../../src/engine/transition';
import type { Action, GameState } from '../../src/engine/types';

export interface RouteStep { cardId: string; choiceId: string; puzzleAnswers: { puzzleId: string; answer: string[] }[] }
export interface Trace { label: string; cardId: string; choiceId: string; variantId: string | null; reputation: number; hysteria: number; flags: GameState['flags']; ending: string | null }
export interface Witness { steps: RouteStep[]; trace: Trace[]; ending: string }
export function act(state: GameState, action: Omit<Extract<Action, { type: 'continue' }>, 'revision'> | Omit<Extract<Action, { type: 'solve' }>, 'revision'> | Omit<Extract<Action, { type: 'choose' }>, 'revision'> | Omit<Extract<Action, { type: 'hint' }>, 'revision'>): GameState {
  const result = transition(state, { ...action, revision: state.revision }, content);
  if (result.error) throw new Error(result.error);
  return result.state;
}
export function step(state: GameState, input: RouteStep, hints = false) {
  if (state.currentCardId !== input.cardId || state.phase !== 'choice') throw new Error('Route is out of sequence.');
  for (const puzzle of input.puzzleAnswers) {
    if (hints) {
      state = act(state, { type: 'solve', puzzleId: puzzle.puzzleId, answer: ['incorrect'] });
      for (let i = 0; i < 3; i++) state = act(state, { type: 'hint', puzzleId: puzzle.puzzleId });
    }
    state = act(state, { type: 'solve', ...puzzle });
  }
  const card = content.cards.find(c => c.id === input.cardId)!;
  const base = card.choices.find(c => c.id === input.choiceId);
  if (!base) throw new Error('Unknown choice.');
  const choice = resolveChoice(state, base);
  state = act(state, { type: 'choose', cardId: card.id, choiceId: choice.id, variantId: choice.variantId });
  const trace: Trace = { label: choice.label, cardId: card.id, choiceId: choice.id, variantId: choice.variantId, reputation: state.reputation, hysteria: state.hysteria, flags: { ...state.flags }, ending: state.ending?.id ?? null };
  return { state: act(state, { type: 'continue' }), trace };
}
export function replay(steps: readonly RouteStep[], hints = false): Witness {
  let state = initialState(content);
  const trace: Trace[] = [];
  for (const input of steps) {
    const result = step(state, input, hints);
    state = result.state; trace.push(result.trace);
  }
  if (!state.ending || state.phase !== 'ended') throw new Error('Witness did not end.');
  return { steps: [...steps], trace, ending: state.ending.id };
}

// Exhaustively search mechanically distinct states. Wrong answers and hints are
// meter/flag-neutral; include their equivalence explicitly in replay tests.
export function searchGraph() {
  const seen = new Set<string>();
  const reached = new Set<string>();
  const witnesses: Record<string, Witness> = {};
  const deadEnds: string[] = [];
  function visit(state: GameState, steps: RouteStep[], trace: Trace[]) {
    if (state.ending) {
      witnesses[state.ending.id] ??= { steps, trace, ending: state.ending.id };
      return;
    }
    const key = [state.currentCardId, state.reputation, state.hysteria, ...Object.values(state.flags)].join('/');
    if (seen.has(key)) return;
    seen.add(key); reached.add(state.currentCardId);
    const card = content.cards.find(c => c.id === state.currentCardId);
    if (!card || state.phase !== 'choice' || card.choices.length !== 2) { deadEnds.push(key); return; }
    const puzzleAnswers = content.puzzles.filter(p => card.puzzleIds?.includes(p.id)).map(p => ({ puzzleId: p.id, answer: [...p.solution] }));
    for (const answers of puzzleAnswers.length ? [puzzleAnswers, []] : [[]]) {
      for (const choice of card.choices) {
        const input = { cardId: card.id, choiceId: choice.id, puzzleAnswers: answers };
        const result = step(state, input);
        visit(result.state, [...steps, input], [...trace, result.trace]);
      }
    }
  }
  visit(initialState(content), [], []);
  return { witnesses, reached: [...reached], deadEnds, states: seen.size };
}
