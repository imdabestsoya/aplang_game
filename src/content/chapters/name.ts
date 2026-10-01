import type { NarrativeCard } from '../narrativeTypes';
import { choice } from './helpers';

export const name: readonly NarrativeCard[] = [
  {
    id: 'name-01', chapter: 4, speaker: 'Rebecca Nurse', location: 'The jail',
    title: 'Someone else carries the cost',
    body: 'Your answer will be your own, John. My name cannot make it innocent, and my danger cannot make it necessary. Consider what your protection has asked another person to carry.',
    basis: 'invented', actReference: 'Act IV; earlier accusations recalled', sourceStatus: 'adaptation',
    sourceNote: 'Invented encounter gives Rebecca a voice rather than using her as a moral shield. Her innocence is not an immunity mechanic.',
    chronologyNote: 'The reflective meeting and its timing are invented. Conditional consequences refer to the player’s record, not to canonical actions by John.',
    evidenceIds: ['decision-record', 'rebecca-record'], symbolismIds: ['S01', 'S12', 'S21', 'S31'],
    choices: [
      {
        ...choice('own-cost', 'Keep Rebecca’s name out of my defense', [-3, -3], 'You refuse to make Rebecca’s peril a reason to accuse her. The officials gain no new name from you. This restraint cannot free her, but her suffering has not become your justification.', 'name-02'),
        variants: [{ id: 'acknowledge-accusation', requirements: { flags: { falseAccusation: true } }, label: 'Acknowledge the harm of my earlier accusation without renewing it', deltas: { reputation: -6, hysteria: -6 }, flags: {}, consequence: 'You acknowledge the person you placed in danger; the journal identifies your actual accusation. Recognition slows the repetition but does not erase the act. The clean resistance route remains closed unless you replay the chapter where you made it.' }],
      },
      choice('trade-name', 'Offer Rebecca’s name as a false accusation to protect mine', [8, 12], 'You make Rebecca’s name into another bargaining counter. Approval comes from supplying the accusation the system can use. Her innocence does not stop that machinery, and your role remains in the record.', 'name-02', { falseAccusation: true }),
    ],
  },
  {
    id: 'name-02', chapter: 4, speaker: 'Reverend Hale', location: 'The jail',
    title: 'Authority learns to doubt',
    body: 'I once lent certainty to this court. Now I ask whether a life can be preserved after that certainty has helped endanger it. I can plead with you, John; I cannot make my changed mind repair what has been done.',
    basis: 'invented', actReference: 'Act IV, contrasted with Act I', sourceStatus: 'adaptation',
    sourceNote: 'Original dialogue interprets Hale’s change without making him a rescuer who resets the court. Material survival and moral resistance remain separate.',
    chronologyNote: 'The conversation compresses his later appeals into one choice; neither branch reverses earlier harms.',
    evidenceIds: ['authority-note', 'confession-draft'], symbolismIds: ['S11', 'S17', 'S27', 'S35'],
    choices: [
      choice('hear-doubt', 'Hear Hale’s plea while refusing to blame another person', [2, -2], 'Your willingness to listen eases the immediate confrontation and slows the room’s certainty. Hale’s doubt matters, but it neither cancels the court’s demands nor decides your confession for you.', 'name-03'),
      choice('borrow-certainty', 'Use Hale’s former certainty to excuse my own choices', [4, 6], 'The familiar appeal to authority briefly shelters you. It also turns Hale’s earlier confidence into permission not to examine your actions. A changed authority cannot carry your responsibility for you.', 'name-03'),
    ],
  },
  {
    id: 'name-03', chapter: 4, speaker: 'Elizabeth Proctor', location: 'The jail, before the confession desk',
    title: 'A judgment that is yours',
    body: 'I will speak to you as the person who has lived beside you, not as a certificate of your goodness. Hear me, and then own what you choose. Neither my forgiveness nor my pain can supply your answer.',
    basis: 'invented', actReference: 'Act IV, with Act II relationship themes', sourceStatus: 'adaptation',
    sourceNote: 'Original dialogue preserves Elizabeth’s perspective and refuses to turn her trust into a numerical score. No invented line is attributed to Miller.',
    chronologyNote: 'The marital conversation is compressed and rephrased; the two game responses are interpretive alternatives.',
    evidenceIds: ['decision-record', 'confession-draft'], symbolismIds: ['S11', 'S17', 'S30'],
    choices: [
      choice('own-answer', 'Accept responsibility for the answer I am about to give', [-2, -3], 'You stop asking Elizabeth to make your decision respectable. That leaves you more exposed before the court, but less able to disguise another act as someone else’s demand.', 'name-04'),
      choice('ask-absolution', 'Ask Elizabeth to make the decision for me', [1, 3], 'Elizabeth refuses to become your excuse. The appeal briefly softens how others judge you, while repeating the habit of moving responsibility away from the person who must act.', 'name-04'),
    ],
  },
  {
    id: 'name-04', chapter: 4, speaker: 'John Proctor', location: 'The confession desk',
    title: 'The weight of a name', final: true,
    body: 'The paper asks for a name, but it will carry an account of what is true. I cannot make my past disappear at this desk. I can decide what I will lend it now, and face what that decision costs.',
    basis: 'invented', actReference: 'Act IV', sourceStatus: 'adaptation',
    sourceNote: 'Original internal monologue at an adapted sign/refuse decision. The alternate outcomes are game interpretations; resistance does not imply physical escape.',
    chronologyNote: 'The confession sequence is compressed. Earlier numerical rules and the puzzle prerequisites are inventions, not events or moral scores from the play.',
    evidenceIds: ['confession-draft', 'decision-record'], symbolismIds: ['S01', 'S17', 'S25', 'S35', 'S36'],
    choices: [
      {
        ...choice('refuse-confession', 'Refuse the false confession and face the unresolved record', [-4, -2], 'You withhold your name. The decision refuses this paper’s claim, but the ending must still account for the evidence you examined and the accusations you made. Refusal cannot rewrite your earlier actions.', null),
        finalAction: 'refuse',
        variants: [{ id: 'informed-refusal', requirements: { flags: { poppetProvenance: true, landMotiveExamined: true, courtContradiction: true, falseAccusation: false, signedFalseConfession: false } }, label: 'Refuse the false confession with the court’s logic examined', deltas: { reputation: -4, hysteria: -2 }, flags: {}, consequence: 'You withhold your name with the evidence and the court’s circular logic examined. No false accusation or false confession stands in your record. You have not escaped the jail; you have refused the institution’s claim over your integrity.' }],
      },
      { ...choice('sign-confession', 'Sign the false confession in hope of surviving', [8, 8], 'Your signature offers the court a statement it can display as confirmation. It promises a possibility of survival, not a clean moral account. The ending will name what you accepted rather than call survival goodness.', null, { signedFalseConfession: true }), finalAction: 'sign' },
    ],
  },
];
