import type { NarrativeCard } from '../narrativeTypes';
import { choice } from './helpers';

export const needle: readonly NarrativeCard[] = [
  {
    id: 'needle-01', chapter: 2, speaker: 'Elizabeth Proctor', location: 'The Proctor household',
    title: 'An object on the table',
    body: 'Look at what has actually entered this house, John. Do not answer for me before you have heard me. A small thing may become dangerous when another person is allowed to supply its meaning.',
    basis: 'invented', actReference: 'Act II', sourceStatus: 'adaptation',
    sourceNote: 'Original dialogue gives Elizabeth agency in examining the accusation; the domestic object sequence follows the PRD. Gift-before-discovery is corroborated by the publisher guide, not by an inspected play edition.',
    chronologyNote: 'Domestic discussion is condensed; the inspection interaction and its timing are invented.',
    evidenceIds: ['poppet', 'source-record'], symbolismIds: ['S03', 'S15', 'S30'],
    choices: [
      choice('hear-elizabeth', 'Hear Elizabeth’s account before assigning the poppet a meaning', [-4, -3], 'Elizabeth’s account remains her own. Your refusal to let an object speak for her looks like resistance to the inquiry, yet it prevents one more unsupported conclusion from entering the room.', 'needle-02'),
      choice('defer-object', 'Let the court decide what the poppet means before hearing her', [4, 6], 'Your deference protects your public posture. Elizabeth must now answer an interpretation formed without her account. Trust at home is strained while the town’s suspicion gains room.', 'needle-02'),
    ],
  },
  {
    id: 'needle-02', chapter: 2, speaker: 'Mary Warren', location: 'The Proctor household',
    title: 'A maker’s account',
    body: 'You ask about the little figure as if the charge came first and the sewing afterward. I can tell you what I did. I cannot promise that a room already afraid will let my account remain my own.',
    basis: 'invented', actReference: 'Act II', sourceStatus: 'adaptation',
    sourceNote: 'Original dialogue. Mary’s account is corroborated by an online transcription; the assigned edition remains for review. Exact needle timing is not asserted.',
    chronologyNote: 'Mary’s account is isolated as a decision card; the order of questions and game chronology are adapted, not a transcript.',
    evidenceIds: ['poppet', 'needle', 'mary-account'], symbolismIds: ['S14', 'S15', 'S28'],
    choices: [
      choice('preserve-account', 'Record Mary’s account without forcing it into a verdict', [-8, -3], 'You keep Mary’s account distinct from the conclusion others demand. Your insistence costs standing, but her testimony has not been replaced by your certainty. Her account still needs scrutiny; it is not a guarantee that the court will listen.', 'needle-03'),
      choice('demand-certainty', 'Demand that Mary guarantee the court will accept her account', [4, 7], 'You borrow the posture of an examiner and regain some authority. Mary is pressed to promise an outcome she cannot control. Pressure grows around the witness instead of testing the charge.', 'needle-03'),
    ],
  },
  {
    id: 'needle-03', chapter: 2, speaker: 'Elizabeth Proctor', location: 'The Proctor household',
    title: 'Possession becomes an accusation',
    body: 'They have put an accusation beside an object and made the distance between them vanish. I will answer for what I have done. I will not agree that possession tells them what I intended.',
    basis: 'invented', actReference: 'Act II', sourceStatus: 'adaptation',
    sourceNote: 'Original speech interprets the poppet accusation. The accusation record is a game summary of an allegation, not proof of witchcraft or a historical warrant.',
    chronologyNote: 'The accusation is presented as a document before the game’s final household response; the layout and exchange are invented.',
    evidenceIds: ['poppet', 'needle', 'mary-account', 'accusation-record'], symbolismIds: ['S04', 'S15', 'S18', 'S30'],
    choices: [
      choice('separate-intent', 'Reject the leap from possession to harmful intent', [-8, -4], 'You demand a connection the charge has not established. The demand angers the officials represented by the record, yet the accusation remains an allegation rather than something you affirm. Elizabeth is still taken into custody in this adaptation.', 'needle-04'),
      choice('endorse-charge', 'Repeat the charge against Elizabeth to protect my standing', [8, 12], 'Your assent makes you seem cooperative while turning Elizabeth into the price of that cooperation. A false accusation now bears your support. The court’s acceptance of it does not make it true.', 'needle-04', { falseAccusation: true }),
    ],
  },
  {
    id: 'needle-04', chapter: 2, speaker: 'Reverend Hale', location: 'The Proctor household, after the accusation',
    title: 'A chain with a missing link',
    body: 'A court may accept a pattern before it examines how the parts came together. If you challenge this charge, tell me which link it has assumed. I cannot promise that exposing it will release Elizabeth.',
    basis: 'invented', actReference: 'Act II', sourceStatus: 'adaptation',
    sourceNote: 'Original bridge into the provenance puzzle. P1 orders making, gift and later evidentiary use; it makes no claim to know the exact needle-placement time. Sourced reasoning limits an inference, not the institution’s power.',
    chronologyNote: 'Hale’s response and the optional exercise are invented; neither branch reverses Elizabeth’s arrest.',
    evidenceIds: ['poppet', 'needle', 'mary-account', 'accusation-record'], puzzleIds: ['P1'], symbolismIds: ['S14', 'S15', 'S27'],
    choices: [
      {
        ...choice('challenge-chain', 'Challenge the charge without a completed provenance argument', [-8, -2], 'You insist the charge is wrong, but have not assembled the account that explains why its inference fails. Hale hears your urgency more readily than your reasoning. Elizabeth remains imprisoned.', 'court-01'),
        variants: [{ id: 'provenance', requirements: { flags: { poppetProvenance: true } }, label: 'Use the provenance record to separate possession from intent', deltas: { reputation: -3, hysteria: -7 }, flags: {}, consequence: 'You distinguish the object’s path from the accusation attached to it. The sourced challenge costs less standing than an unsupported denial and checks some fear. It still does not compel the court to release Elizabeth.' }],
      },
      choice('defer-chain', 'Accept the court’s interpretation of the object as sufficient', [6, 9], 'Hale encounters less resistance, and your public position improves. An untested inference is allowed to stand in for an explanation. Elizabeth remains imprisoned while the method used against her gains another defender.', 'court-01'),
    ],
  },
];
