import { resolveEnding } from '../engine/endings';
import { initialState } from '../engine/transition';
import type { Content, GameState, RunState } from '../engine/types';

const record = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
const integer = (value: unknown, max = Number.MAX_SAFE_INTEGER): value is number => Number.isSafeInteger(value) && Number(value) >= 0 && Number(value) <= max;
const strings = (value: unknown): value is string[] => Array.isArray(value) && value.every((item) => typeof item === 'string') && new Set(value).size === value.length;
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const clamp = (value: number) => Math.min(100, Math.max(0, value));

function validRun(value: unknown, content: Content): value is RunState {
  if (!record(value) || !integer(value.reputation, 100) || !integer(value.hysteria, 100)) return false;
  const card = content.cards.find((item) => item.id === value.currentCardId);
  if (!card || !['choice', 'consequence', 'ended', 'sample-complete'].includes(String(value.phase))) return false;
  if (!strings(value.evidenceIds) || !value.evidenceIds.every((id) => content.evidence.some((item) => item.id === id))) return false;
  const flagNames = Object.keys(initialState(content).flags);
  if (!record(value.flags) || Object.keys(value.flags).length !== flagNames.length || !flagNames.every((key) => typeof (value.flags as Record<string, unknown>)[key] === 'boolean')) return false;
  if (!strings(value.solvedPuzzleIds) || !value.solvedPuzzleIds.every((id) => content.puzzles.some((item) => item.id === id))) return false;
  if (!record(value.hintLevels) || !Object.entries(value.hintLevels).every(([id, level]) => content.puzzles.some((item) => item.id === id) && integer(level, 3) && level > 0)) return false;
  if (value.puzzleFeedback !== null && typeof value.puzzleFeedback !== 'string') return false;
  if (!Array.isArray(value.history) || value.history.length > content.cards.length) return false;
  let expectedId: string | null = content.firstCardId;
  let meters = { reputation: 65, hysteria: 25 };
  const visited = new Set<string>();
  const expectedFlags = { ...initialState(content).flags };
  for (const puzzle of content.puzzles) {
    if (value.solvedPuzzleIds.includes(puzzle.id)) expectedFlags[puzzle.reward] = true;
  }
  for (const entry of value.history) {
    if (!record(entry) || typeof entry.cardId !== 'string' || entry.cardId !== expectedId || visited.has(entry.cardId)) return false;
    const entryCard = content.cards.find((item) => item.id === entry.cardId);
    const choice = entryCard?.choices.find((item) => item.id === entry.choiceId);
    if (!choice || !entryCard) return false;
    const effect = entry.variantId === null ? choice : choice.variants?.find((item) => item.id === entry.variantId);
    if (!effect || !same(entry.before, meters)) return false;
    meters = { reputation: clamp(meters.reputation + effect.deltas.reputation), hysteria: clamp(meters.hysteria + effect.deltas.hysteria) };
    if (!same(entry.after, meters) || entry.label !== effect.label || entry.consequence !== effect.consequence || entry.nextCardId !== choice.nextCardId || !same(entry.symbolismIds, entryCard.symbolismIds)) return false;
    for (const key of Object.keys(expectedFlags) as (keyof typeof expectedFlags)[]) expectedFlags[key] ||= !!effect.flags[key];
    expectedFlags.signedFalseConfession ||= choice.finalAction === 'sign';
    visited.add(entry.cardId);
    expectedId = entry.nextCardId as string | null;
    // A threshold/final card must be the last recorded decision.
    if ((meters.reputation === 0 || meters.hysteria === 100 || entryCard.final) && entry !== value.history.at(-1)) return false;
  }
  if (value.reputation !== meters.reputation || value.hysteria !== meters.hysteria) return false;
  const state = value as unknown as RunState;
  if (!Object.entries(expectedFlags).every(([key, flag]) => state.flags[key as keyof typeof expectedFlags] === flag)) return false;
  const accessible = content.cards.filter((item) => visited.has(item.id) || item.id === card.id);
  if (state.evidenceIds.some((id) => !accessible.some((item) => item.evidenceIds.includes(id)))) return false;
  if ([...state.solvedPuzzleIds, ...Object.keys(state.hintLevels)].some((id) => !accessible.some((item) => item.puzzleIds?.includes(id)))) return false;
  for (const puzzle of content.puzzles) {
    if (state.solvedPuzzleIds.includes(puzzle.id) && !state.flags[puzzle.reward]) return false;
  }
  const last = state.history.at(-1);
  if (state.phase === 'choice') return expectedId === card.id && !visited.has(card.id) && value.ending === null && meters.reputation > 0 && meters.hysteria < 100;
  if (!last || last.cardId !== card.id) return false;
  const choice = card.choices.find((item) => item.id === last.choiceId)!;
  const expectedEnding = resolveEnding(state, card, choice);
  if (!same(value.ending, expectedEnding)) return false;
  if (state.phase === 'ended') return expectedEnding !== null;
  if (state.phase === 'sample-complete') return expectedEnding === null && last.nextCardId === null;
  return true;
}

export function validState(value: unknown, content: Content): value is GameState {
  if (!validRun(value, content) || !record(value) || !integer(value.revision)) return false;
  if (!Array.isArray(value.checkpoints) || value.checkpoints.length === 0 || value.checkpoints.length > 4) return false;
  const chapters = new Set<number>();
  const current = value as unknown as GameState;
  let previousLength = -1;
  for (const checkpoint of value.checkpoints) {
    if (!record(checkpoint) || !integer(checkpoint.chapter, 4) || !validRun(checkpoint.state, content)) return false;
    const point = checkpoint.state;
    if (chapters.has(checkpoint.chapter) || point.phase !== 'choice' || point.history.length <= previousLength) return false;
    if (content.cards.find((card) => card.id === point.currentCardId)?.chapter !== checkpoint.chapter) return false;
    if (!same(point.history, current.history.slice(0, point.history.length))) return false;
    chapters.add(checkpoint.chapter);
    previousLength = point.history.length;
  }
  const initial = initialState(content);
  if (!same(value.checkpoints[0], initial.checkpoints[0])) return false;
  return chapters.has(content.cards.find((card) => card.id === current.currentCardId)!.chapter);
}
