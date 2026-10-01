import type { NarrativeCard } from '../narrativeTypes';
import { choice } from './helpers';

export const whisper: readonly NarrativeCard[] = [
  {
    id: 'whisper-01', chapter: 1, speaker: 'Reverend Parris', location: 'Parris’s household',
    title: 'Before a rumor becomes a fact',
    body: 'Word of witchcraft moves beyond this house. If you question what people are saying, Proctor, they may begin to question where you stand.',
    basis: 'invented', actReference: 'Act I', sourceStatus: 'adaptation',
    sourceNote: 'Original Parris dialogue built around the PRD’s reputation theme, not Miller’s wording. The household report is invented.',
    chronologyNote: 'The household exchanges are compressed into a teaching sequence; this precise encounter is invented.',
    evidenceIds: ['household-report'], symbolismIds: ['S01', 'S10', 'S11', 'S13', 'S14', 'S26'],
    choices: [
      choice('question-source', 'Ask who witnessed the alleged witchcraft', [-4, -6], 'You ask for a witness before accepting the claim. Parris reads your hesitation as a challenge to his standing. The room grows quieter: for a moment, repetition is no longer enough.', 'whisper-02'),
      choice('defer-authority', 'Support Parris’s call to trust the report', [6, 8], 'Your support reassures Parris and protects your standing in the room. The unconfirmed report gains another voice behind it. Confidence spreads faster than evidence.', 'whisper-02'),
    ],
  },
  {
    id: 'whisper-02', chapter: 1, speaker: 'Reverend Hale', location: 'Parris’s household',
    title: 'The authority of a learned voice',
    body: 'I have come prepared to examine these claims. Yet the room asks for certainty before I have finished asking questions. Will you trust the work of examination, or only the title of the man who performs it?',
    basis: 'invented', actReference: 'Act I', sourceStatus: 'adaptation',
    sourceNote: 'Original dialogue interprets Hale’s initial authority without making expertise or religious belief inherently dishonest (PRD §5).',
    chronologyNote: 'A thematic exchange with Proctor is invented and placed before the game’s Abigail encounter.',
    evidenceIds: ['household-report', 'authority-note'], symbolismIds: ['S05', 'S11', 'S14', 'S27'],
    choices: [
      choice('ask-standard', 'Ask what evidence could change Hale’s conclusion', [-4, -3], 'Hale must distinguish an inquiry from a verdict. Some listeners call your question insolent, but fewer treat his arrival as proof that witchcraft has occurred.', 'whisper-03'),
      choice('endorse-title', 'Let Hale’s reputation lend certainty to the report', [5, 7], 'Your deference wins approving looks. Hale’s learning becomes a substitute for an answer he has not yet established; the unconfirmed household report travels with his authority attached.', 'whisper-03'),
    ],
  },
  {
    id: 'whisper-03', chapter: 1, speaker: 'Abigail Williams', location: 'Outside Parris’s household',
    title: 'The price of a safer name',
    body: 'They will want someone to blame. You know how quickly this room turns against a person left alone. If another name reaches them first, yours may remain untouched.',
    basis: 'invented', actReference: 'Act I; Rebecca’s vulnerability anticipates Act II', sourceStatus: 'adaptation',
    sourceNote: 'Invented coercive proposal, not a canonical conversation or proof about Abigail’s inner motives. Fear and deliberate manipulation coexist in this interpretation.',
    chronologyNote: 'The option to name Rebecca is a game invention that anticipates later accusations; it is not presented as John’s action in the play.',
    evidenceIds: ['household-report', 'rebecca-record'], symbolismIds: ['S12', 'S22', 'S29', 'S31'],
    choices: [
      choice('refuse-name', 'Refuse to place Rebecca’s name inside the rumor', [-6, -5], 'You give Abigail no new name to carry. The protection she offers disappears, and scrutiny returns to you. Rebecca gains no magical immunity, but you have not supplied an accusation against her.', 'whisper-04'),
      choice('name-rebecca', 'Name Rebecca as a source of witchcraft without evidence', [8, 12], 'Suspicion turns toward Rebecca and away from you. You have converted an innocent person’s name into cover for yourself. This false accusation remains in your record; later refusal cannot erase it.', 'whisper-04', { falseAccusation: true }),
    ],
  },
  {
    id: 'whisper-04', chapter: 1, speaker: 'John Proctor', location: 'The town notice board',
    title: 'What the record leaves out',
    body: 'The same report appears again, this time written as though someone has settled it. My own standing has protected me before. If I am to question this account, I must begin by admitting how little I know.',
    basis: 'invented', actReference: 'Act I themes; transition toward Act II', sourceStatus: 'adaptation',
    sourceNote: 'Original internal monologue and invented notice board. The repeated report retains its original uncertain source rather than becoming new evidence.',
    chronologyNote: 'An invented bridge between the household and the Proctor home introduces the method for the later provenance exercise.',
    evidenceIds: ['household-report', 'source-record'], unlocksPuzzleIds: ['P1'], symbolismIds: ['S03', 'S14', 'S21', 'S22'],
    choices: [
      choice('record-source', 'Record the claim, its source, and what remains unknown', [-2, -3], 'Your note separates a report from a finding. It irritates those who want a clean verdict, but slows the rumor’s passage. You open a provenance record for the objects you will examine at home.', 'needle-01'),
      choice('omit-doubt', 'Carry the written report onward without its uncertainty', [5, 8], 'People welcome a version that sounds settled. The report becomes easier to repeat because you have removed the limits of its source. The provenance record remains available, but it does not excuse this choice.', 'needle-01'),
    ],
  },
];
