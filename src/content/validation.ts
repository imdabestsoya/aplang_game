import { validateContent } from '../engine/content';
import type { Content, SourceNote } from '../engine/types';
import type { NarrativeCard, NarrativeEvidence, NarrativePuzzle } from './narrativeTypes';
import { historicalContext } from './context';
import { quotations } from './quotations';
import { symbolism } from './symbolism';
import { puzzleForms } from './puzzleForms';
type Narrative = Content & { cards: readonly NarrativeCard[]; evidence: readonly NarrativeEvidence[]; puzzles: readonly NarrativePuzzle[] };
export function validateNarrative(content: Narrative): string[] {
  const errors = validateContent(content);
  const check = (ok: boolean, message: string) => { if (!ok) errors.push(message); };
  const metadata = (record: SourceNote) => ['canonical', 'interpretation', 'invented'].includes(record.basis) && !!record.actReference?.trim() && !!record.sourceNote?.trim();
  check(content.cards.length === 16, 'Expected 16 cards.');
  for (const chapter of [1, 2, 3, 4]) check(content.cards.filter(c => c.chapter === chapter).length === 4, `Chapter ${chapter} needs four cards.`);
  const symbols = new Set(symbolism.map(s => s.id));
  check(symbols.size === 36 && Array.from({ length: 36 }, (_, i) => `S${String(i + 1).padStart(2, '0')}`).every(id => symbols.has(id)), 'Expected S01–S36.');
  check(symbolism.every(s => ['implemented', 'partial', 'deferred'].includes(s.status) && !!s.remaining.trim() && s.locations.length > 0), 'Symbolism needs explicit status, location and remaining review.');
  for (const record of [...content.cards, ...content.evidence, ...content.puzzles, ...symbolism, ...quotations, ...historicalContext]) check(metadata(record), `${record.id}: missing source metadata.`);
  for (const record of [...content.cards, ...content.evidence, ...content.puzzles, ...historicalContext]) check(record.symbolismIds.length > 0 && record.symbolismIds.every(id => symbols.has(id)), `${record.id}: unresolved symbolism.`);
  const speakers = new Set(['John Proctor', 'Reverend Parris', 'Reverend Hale', 'Abigail Williams', 'Elizabeth Proctor', 'Mary Warren', 'Giles Corey', 'Thomas Putnam', 'Deputy Governor Danforth', 'Rebecca Nurse']);
  for (const card of content.cards) {
    check(speakers.has(card.speaker), `${card.id}: unknown speaker.`);
    check(!!card.chronologyNote && !!card.location, `${card.id}: missing adaptation context.`);
    check(card.choices.every(c => !!c.nextCardId || !!card.final), `${card.id}: unintended narrative boundary.`);
    check((card.unlocksPuzzleIds ?? []).every(id => content.puzzles.some(p => p.id === id)), `${card.id}: unknown exercise unlock.`);
  }
  const reached = new Set<string>();
  const active = new Set<string>();
  const visit = (id: string) => {
    if (active.has(id)) { errors.push(`Story cycle at ${id}.`); return; }
    if (reached.has(id)) return;
    reached.add(id); active.add(id);
    content.cards.find(c => c.id === id)?.choices.forEach(c => { if (c.nextCardId) visit(c.nextCardId); });
    active.delete(id);
  };
  visit(content.firstCardId);
  check(content.cards.every(c => reached.has(c.id)), 'Unreachable narrative card.');
  for (const puzzle of content.puzzles) {
    const fields = puzzleForms[puzzle.id];
    check(!!fields && fields.length === puzzle.solution.length && puzzle.solution.every((answer, i) => fields[i].options.some(o => o.value === answer)), `${puzzle.id}: form cannot submit the solution.`);
    check(puzzle.hints.length === 3 && new Set(puzzle.hints).size === 3 && puzzle.hints.every(h => !!h.trim()), `${puzzle.id}: three distinct hints required.`);
    const at = content.cards.findIndex(c => c.id === puzzle.availableAt);
    check(at >= 0 && !!content.cards[at]?.puzzleIds?.includes(puzzle.id), `${puzzle.id}: missing exercise placement.`);
    check(puzzle.evidenceIds.every(id => content.evidence.some(e => e.id === id) && content.cards.slice(0, at + 1).some(c => c.evidenceIds.includes(id))), `${puzzle.id}: clues unavailable before choice.`);
  }
  check(quotations.length === 5 && new Set(quotations.map(q => q.id)).size === 5, 'Expected five quotation slots.');
  for (const q of quotations) {
    check(q.status === 'verified' ? !!(q.text && q.edition && q.page && q.sourceUrl && q.verifiedAt) : q.status === 'draft' ? !!q.text && !!q.sourceUrl && q.edition === null && q.page === null && q.verifiedAt === null : q.text === null && q.page === null, `${q.id}: misleading quotation verification.`);
    const trigger = q.trigger;
    if (trigger.kind === 'card') check(content.cards.some(c => c.id === trigger.cardId), `${q.id}: missing placement.`);
  }
  return errors;
}
