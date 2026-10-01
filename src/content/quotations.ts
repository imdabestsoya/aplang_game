import type { QuotationSlot } from './narrativeTypes';
import type { Content, RunState } from '../engine/types';

// Short excerpts only; longer passages remain in the linked reading sources.
const readingSource = 'https://www.culliton.org/uploads/3/4/4/2/34421062/the_crucible_unknown.pdf';
const slot = (id: string, passage: string, speaker: string, act: string, text: string, trigger: QuotationSlot['trigger'], debrief: QuotationSlot['debrief'], context: string): QuotationSlot => ({
  id, passage, speaker, actReference: `Act ${act}`, trigger, debrief, context,
  basis: 'canonical', sourceNote: 'Short excerpt, not the complete passage. Speaker and act corroborated against an online transcription; its edition is unidentified. Assigned-edition wording and punctuation await review.',
  text, status: 'draft', edition: null, page: null, sourceUrl: readingSource, verifiedAt: null,
});
export const quotations: readonly QuotationSlot[] = [
  {
    ...slot('Q1', 'Proctor’s soul and name', 'John Proctor', 'IV', 'leave me my name!', { kind: 'card', cardId: 'name-04' }, 'always', 'Facing public use of his confession, Proctor resists surrendering his identity. This is resistance to a lie, not an endorsement of lying.'),
    status: 'verified', edition: 'Holt, Rinehart and Winston, from The Crucible (school-hosted excerpt; publication year not identified)', page: '249',
    sourceUrl: 'https://fhs.trusd.net/documents/Library/the%20crucible.pdf#page=30', verifiedAt: '2026-10-01',
    sourceNote: 'Short excerpt checked in the licensed textbook selection, printed p. 249, Act IV. The selection credits permission from Viking Penguin. This is not a claim about the assigned classroom edition.',
  },
  { ...slot('Q2', 'Abigail’s account of parental violence', 'Abigail Williams', 'I', 'some reddish work', { kind: 'card', cardId: 'whisper-03' }, 'never', 'Abigail recalls violent childhood loss while threatening the other girls. Trauma gives context to her intimidation; it does not excuse it.'), contentNotice: 'References to violence against parents. This optional passage can be skipped.' },
  slot('Q3', 'Proctor on children, keys, and vengeance', 'John Proctor', 'II', 'vengeance writes the law!', { kind: 'first-hysteria-crossing', threshold: 80 }, 'if-not-triggered', 'During Elizabeth’s arrest, Proctor attacks a process that lets accusations govern justice. His outburst is a character’s argument, not proof that every accuser has the same motive.'),
  slot('Q4', 'Danforth’s division between the court and its opponents', 'Deputy Governor Danforth', 'III', 'there be no road between.', { kind: 'card', cardId: 'court-04' }, 'never', 'Danforth treats criticism of the court as opposition. The forced choice excludes legitimate uncertainty and helps explain the game’s circular-rule puzzle.'),
  slot('Q5', 'Proctor questions the accuser’s presumed holiness', 'John Proctor', 'II', 'Is the accuser always holy now?', { kind: 'first-false-accusation' }, 'if-not-triggered', 'Proctor challenges Hale during Elizabeth’s arrest: accusers also require scrutiny. In the game, this reflection does not erase an earlier false accusation.'),
];

export function visibleQuotations(state: RunState, content: Content): readonly QuotationSlot[] {
  return quotations.filter((q) => {
    const trigger = q.trigger;
    const index = trigger.kind === 'first-hysteria-crossing'
      ? state.history.findIndex((d) => d.before.hysteria < trigger.threshold && d.after.hysteria >= trigger.threshold)
      : trigger.kind === 'first-false-accusation'
        ? state.history.findIndex((d) => {
          const choice = content.cards.find((c) => c.id === d.cardId)?.choices.find((c) => c.id === d.choiceId);
          return (choice?.variants?.find((v) => v.id === d.variantId) ?? choice)?.flags.falseAccusation === true;
        }) : -1;
    if (state.phase === 'ended') return q.debrief === 'always' || (q.debrief === 'if-not-triggered' && index < 0);
    if (trigger.kind === 'card') return state.currentCardId === trigger.cardId;
    if (q.id === 'Q3' && state.currentCardId === 'court-04' && state.phase === 'consequence' && index < 0) return true;
    return state.phase === 'consequence' && index >= 0 && index === state.history.length - 1;
  });
}
