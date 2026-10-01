import { resolveEnding } from './endings';
import type { Action, Card, Choice, Content, GameState, Requirements, RunState, TransitionResult } from './types';

export function snapshot(state: RunState): RunState {
  return {
    reputation: state.reputation, hysteria: state.hysteria,
    currentCardId: state.currentCardId, phase: state.phase,
    evidenceIds: [...state.evidenceIds], flags: { ...state.flags }, history: [...state.history],
    hintLevels: { ...state.hintLevels }, solvedPuzzleIds: [...state.solvedPuzzleIds],
    puzzleFeedback: state.puzzleFeedback, ending: state.ending,
  };
}

export function initialState(content: Content): GameState {
  const first = content.cards.find((card) => card.id === content.firstCardId);
  if (!first) throw new Error('The first card is missing.');
  const state: RunState = {
    currentCardId: first.id, phase: 'choice', reputation: 65, hysteria: 25,
    evidenceIds: [], flags: {
      poppetProvenance: false, landMotiveExamined: false, courtContradiction: false,
      falseAccusation: false, signedFalseConfession: false,
    }, history: [], hintLevels: {}, solvedPuzzleIds: [], puzzleFeedback: null, ending: null,
  };
  return { ...state, revision: 0, checkpoints: [{ chapter: first.chapter, state: snapshot(state) }] };
}

export function meets(state: RunState, requirements: Requirements): boolean {
  return (requirements.evidenceIds ?? []).every((id) => state.evidenceIds.includes(id))
    && Object.entries(requirements.flags ?? {}).every(([key, value]) => state.flags[key as keyof typeof state.flags] === value);
}

export function resolveChoice(state: RunState, choice: Choice) {
  const variant = choice.variants?.find((candidate) => meets(state, candidate.requirements));
  return { ...choice, ...(variant ?? {}), id: choice.id, variantId: variant?.id ?? null };
}

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export function transition(state: GameState, action: Action, content: Content): TransitionResult {
  const reject = (error: string): TransitionResult => ({ state, error });
  const accept = (next: GameState): TransitionResult => ({ state: { ...next, revision: state.revision + 1 }, error: null });
  if (action.revision !== state.revision) return reject('That action is out of date. Review the current card before trying again.');
  if (action.type === 'restart') return accept(initialState(content));
  if (action.type === 'replay') {
    const index = state.checkpoints.findIndex((point) => point.chapter === action.chapter);
    if (index < 0) return reject('That chapter has not been reached.');
    return accept({ ...state, ...snapshot(state.checkpoints[index].state), checkpoints: state.checkpoints.slice(0, index + 1) });
  }
  const card = content.cards.find((item) => item.id === state.currentCardId);
  if (!card) return reject('The current card is unavailable.');
  if (action.type === 'continue') {
    if (state.phase !== 'consequence') return reject('There is no consequence to continue from.');
    if (state.ending) return accept({ ...state, phase: 'ended' });
    const nextId = state.history.at(-1)?.nextCardId;
    if (!nextId) return accept({ ...state, phase: 'sample-complete' });
    const nextCard = content.cards.find((item) => item.id === nextId);
    if (!nextCard) return reject('The next card is unavailable.');
    const next: GameState = { ...state, currentCardId: nextId, phase: 'choice', puzzleFeedback: null };
    if (nextCard.chapter !== card.chapter && !state.checkpoints.some((point) => point.chapter === nextCard.chapter)) {
      next.checkpoints = [...state.checkpoints, { chapter: nextCard.chapter, state: snapshot(next) }];
    }
    return accept(next);
  }
  if (action.type === 'inspect') {
    if (action.cardId !== card.id || !card.evidenceIds.includes(action.evidenceId)) return reject('That evidence is not available on this card.');
    if (state.evidenceIds.includes(action.evidenceId)) return { state, error: null };
    return accept({ ...state, evidenceIds: [...state.evidenceIds, action.evidenceId] });
  }
  if (state.phase !== 'choice' || state.ending) return reject('Read the consequence before taking another action.');
  if (action.type === 'hint' || action.type === 'solve') {
    const puzzle = content.puzzles.find((item) => item.id === action.puzzleId);
    if (!puzzle || !card.puzzleIds?.includes(puzzle.id)) return reject('That puzzle is not available on this card.');
    if (action.type === 'hint') {
      const level = state.hintLevels[puzzle.id] ?? 0;
      if (level === 3) return { state, error: null };
      return accept({ ...state, hintLevels: { ...state.hintLevels, [puzzle.id]: level + 1 }, puzzleFeedback: puzzle.hints[level] });
    }
    if (state.solvedPuzzleIds.includes(puzzle.id)) return { state, error: null };
    const correct = action.answer.length === puzzle.solution.length && action.answer.every((part, index) => part === puzzle.solution[index]);
    if (!correct) return accept({ ...state, puzzleFeedback: 'Those relationships do not yet fit the evidence. Review the clues or use a hint, then try again. There is no penalty.' });
    return accept({ ...state, solvedPuzzleIds: [...state.solvedPuzzleIds, puzzle.id], flags: { ...state.flags, [puzzle.reward]: true }, puzzleFeedback: puzzle.explanation });
  }
  if (action.cardId !== card.id) return reject('That choice belongs to a different card.');
  if (state.history.some((entry) => entry.cardId === card.id)) return reject('This card has already been decided.');
  const base = card.choices.find((item) => item.id === action.choiceId);
  if (!base) return reject('That choice is unavailable.');
  const choice = resolveChoice(state, base);
  if (choice.variantId !== action.variantId) return reject('The evidence for that action has changed. Review its current label before choosing.');
  if (choice.nextCardId && !content.cards.some((item) => item.id === choice.nextCardId)) return reject('The next card is unavailable.');
  const before = { reputation: state.reputation, hysteria: state.hysteria };
  const after = { reputation: clamp(state.reputation + choice.deltas.reputation), hysteria: clamp(state.hysteria + choice.deltas.hysteria) };
  const flags = { ...state.flags, ...choice.flags };
  // These five flags record completed reasoning or past actions; only replay/restart clears them.
  for (const key of Object.keys(flags) as (keyof typeof flags)[]) flags[key] = state.flags[key] || !!choice.flags[key];
  flags.signedFalseConfession ||= choice.finalAction === 'sign';
  const next: GameState = {
    ...state, ...after, flags, phase: 'consequence', puzzleFeedback: null,
    history: [...state.history, {
      cardId: card.id, choiceId: choice.id, variantId: choice.variantId,
      label: choice.label, before, after, consequence: choice.consequence,
      symbolismIds: card.symbolismIds, nextCardId: choice.nextCardId,
    }],
  };
  // The UI shows the recorded consequence before revealing this resolved ending.
  next.ending = resolveEnding(next, card, choice);
  return accept(next);
}

export function currentCard(state: RunState, content: Content): Card {
  const card = content.cards.find((item) => item.id === state.currentCardId);
  if (!card) throw new Error('The current card is missing.');
  return card;
}
