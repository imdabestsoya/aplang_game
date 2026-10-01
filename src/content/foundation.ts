import type { Card, Content, Evidence } from '../engine/types';
import { validateContent } from '../engine/content';

export const evidence: Evidence = {
  id: 'household-report',
  title: 'A report without a witness',
  classification: 'Allegation · source unconfirmed',
  body: 'The household repeats a claim of witchcraft. No named witness or direct observation accompanies this report. Repetition tells you that a claim is circulating; it does not establish that the claim is true.',
  basis: 'invented',
  actReference: 'Act I (thematic basis; wording unverified)',
  sourceNote: 'Invented teaching record inspired by fear around Parris’s household. Not an object or quotation from the play.',
};

export const firstCard: Card = {
  id: 'whisper-01',
  chapter: 1,
  speaker: 'Reverend Parris',
  title: 'Before a rumor becomes a fact',
  body: 'Word of witchcraft moves beyond this house. If you question what people are saying, Proctor, they may begin to question where you stand.',
  basis: 'invented',
  actReference: 'Act I (adapted encounter)',
  sourceNote: 'Original dialogue and invented encounter, inspired by Parris’s concern for his standing. Not Miller’s wording; scene chronology is adapted.',
  evidenceIds: [evidence.id],
  symbolismIds: ['S01', 'S10', 'S11', 'S13', 'S14', 'S26'],
  choices: [
    {
      id: 'question-source',
      label: 'Ask who witnessed the alleged witchcraft',
      deltas: { reputation: -4, hysteria: -6 },
      flags: {},
      consequence: 'You ask for a witness before accepting the claim. Parris reads your hesitation as a challenge to his standing. The room grows quieter: for a moment, repetition is no longer enough.',
      nextCardId: null,
    },
    {
      id: 'defer-authority',
      label: 'Support Parris’s call to trust the report',
      deltas: { reputation: 6, hysteria: 8 },
      flags: {},
      consequence: 'Your support reassures Parris and protects your standing in the room. The unconfirmed report gains another voice behind it. Confidence spreads faster than evidence.',
      nextCardId: null,
    },
  ],
};

export const content: Content = {
  version: 'foundation-2',
  firstCardId: firstCard.id,
  cards: [firstCard],
  evidence: [evidence],
  puzzles: [],
};

const contentErrors = validateContent(content);
if (contentErrors.length) throw new Error(contentErrors.join('\n'));
