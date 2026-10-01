import type { Content } from './types';

export function validateContent(content: Content): string[] {
  const errors: string[] = [];
  const unique = (ids: readonly string[], label: string) => {
    if (new Set(ids).size !== ids.length || ids.some((id) => !id)) errors.push(`${label} IDs must be unique and nonempty.`);
  };
  unique(content.cards.map((item) => item.id), 'Card');
  unique(content.evidence.map((item) => item.id), 'Evidence');
  unique(content.puzzles.map((item) => item.id), 'Puzzle');
  const cards = new Map(content.cards.map((item) => [item.id, item]));
  const evidence = new Set(content.evidence.map((item) => item.id));
  const puzzles = new Set(content.puzzles.map((item) => item.id));
  if (!content.version || !cards.has(content.firstCardId)) errors.push('Content needs a version and valid first card.');
  for (const card of content.cards) {
    if (!Number.isInteger(card.chapter) || card.chapter < 1 || card.chapter > 4) errors.push(`${card.id}: invalid chapter.`);
    if (card.choices.length !== 2) errors.push(`${card.id}: exactly two story choices are required.`);
    unique(card.choices.map((item) => item.id), `${card.id} choice`);
    if (card.evidenceIds.some((id) => !evidence.has(id))) errors.push(`${card.id}: unresolved evidence.`);
    if (card.puzzleIds?.some((id) => !puzzles.has(id))) errors.push(`${card.id}: unresolved puzzle.`);
    if (card.final && !(['sign', 'refuse'] as const).every((action) => card.choices.some((choice) => choice.finalAction === action))) errors.push(`${card.id}: final card needs sign and refuse choices.`);
    for (const choice of card.choices) {
      const next = choice.nextCardId ? cards.get(choice.nextCardId) : null;
      if (choice.nextCardId && !next) errors.push(`${card.id}: unresolved next card.`);
      if (next && next.chapter < card.chapter) errors.push(`${card.id}: story choices cannot replay earlier chapters.`);
      if (card.final && choice.nextCardId) errors.push(`${card.id}: final choices cannot advance to another card.`);
      if (!card.final && choice.finalAction) errors.push(`${card.id}: final action on a non-final card.`);
      unique((choice.variants ?? []).map((item) => item.id), `${choice.id} variant`);
      for (const effect of [choice, ...(choice.variants ?? [])]) {
        if (!effect.label || !effect.consequence || !Number.isInteger(effect.deltas.reputation) || !Number.isInteger(effect.deltas.hysteria)) errors.push(`${choice.id}: invalid effects.`);
      }
      for (const variant of choice.variants ?? []) {
        if (variant.requirements.evidenceIds?.some((id) => !evidence.has(id))) errors.push(`${choice.id}: unresolved variant evidence.`);
      }
    }
  }
  return errors;
}
