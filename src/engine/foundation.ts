import type { Card, GameState, Meters } from './types';

// Session 01 handles one card only. Null means end of this sample, not an ending.
export function initialState(cardId: string): GameState {
  return {
    currentCardId: cardId,
    reputation: 65,
    hysteria: 25,
    evidenceIds: [],
    flags: {
      poppetProvenance: false,
      landMotiveExamined: false,
      courtContradiction: false,
      falseAccusation: false,
      signedFalseConfession: false,
    },
    history: [],
  };
}

export function inspectEvidence(state: GameState, card: Card, id: string): GameState {
  if (!card.evidenceIds.includes(id) || state.evidenceIds.includes(id)) return state;
  return { ...state, evidenceIds: [...state.evidenceIds, id] };
}

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export function choose(state: GameState, card: Card, choiceId: string): GameState {
  const choice = card.choices.find((item) => item.id === choiceId);
  if (!choice || state.currentCardId !== card.id || state.history.some((item) => item.cardId === card.id)) return state;
  const before: Meters = { reputation: state.reputation, hysteria: state.hysteria };
  const after: Meters = {
    reputation: clamp(state.reputation + choice.deltas.reputation),
    hysteria: clamp(state.hysteria + choice.deltas.hysteria),
  };
  return {
    ...state,
    ...after,
    currentCardId: choice.nextCardId,
    flags: { ...state.flags, ...choice.flags },
    history: [...state.history, {
      cardId: card.id, choiceId, label: choice.label, before, after,
      consequence: choice.consequence, symbolismIds: card.symbolismIds,
    }],
  };
}

export function reputationLabel(value: number): string {
  if (value === 0) return 'Condemned';
  if (value < 25) return 'Under suspicion';
  if (value < 50) return 'Watched';
  if (value < 75) return 'Accepted';
  return 'Favored';
}

export function hysteriaLabel(value: number): string {
  if (value === 100) return 'Town Rupture';
  if (value < 25) return 'Uneasy';
  if (value < 50) return 'Rumors spreading';
  if (value < 80) return 'Fear governs';
  return 'Near rupture';
}
