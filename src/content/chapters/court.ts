import type { NarrativeCard } from '../narrativeTypes';
import { choice } from './helpers';

export const court: readonly NarrativeCard[] = [
  {
    id: 'court-01', chapter: 3, speaker: 'Giles Corey', location: 'The courtroom antechamber',
    title: 'Who might profit?',
    body: 'I suspect that an accusation can serve a man’s interest in land. But if I give you another person’s name, that person may be made to answer for my words. Examine the claim without pretending I have already proved it.',
    basis: 'invented', actReference: 'Act III', sourceStatus: 'adaptation',
    sourceNote: 'Original dialogue interprets Giles’s allegation about material motives. The allegation is not a proven account of Putnam’s conduct.',
    chronologyNote: 'A private exchange replaces a more complex courtroom dispute; the game invents this opportunity to handle the claim.',
    evidenceIds: ['giles-allegation', 'property-note'], symbolismIds: ['S14', 'S16', 'S21'],
    choices: [
      choice('qualify-allegation', 'Record Giles’s allegation as a question requiring corroboration', [-4, -3], 'You preserve the possible motive without calling it proof. The qualification disappoints a room that wants either a guilty man or a discredited witness. Giles’s unnamed source is not exposed by your action.', 'court-02'),
      choice('demand-source-name', 'Demand that Giles expose his source before I listen', [6, 8], 'Your demand resembles the court’s procedure and lends you standing. It also makes another person’s safety the price of being heard. Giles’s claim remains unproved, while the pressure to name someone increases.', 'court-02'),
    ],
  },
  {
    id: 'court-02', chapter: 3, speaker: 'Thomas Putnam', location: 'The courtroom',
    title: 'A ledger is not a verdict',
    body: 'You place my interest in land beside these charges and invite the room to finish your argument. If you say that I benefit, have you shown what I did? Will you examine your own inference as closely as mine?',
    basis: 'invented', actReference: 'Act III', sourceStatus: 'adaptation',
    sourceNote: 'Invented Putnam speech makes the distinction between motive and proof explicit. The ledger is a constructed visualization; no historical ownership record is asserted.',
    chronologyNote: 'This direct challenge and document exercise are invented, not a replay of the play’s courtroom dialogue.',
    evidenceIds: ['property-note', 'giles-allegation', 'court-motive-claim'], puzzleIds: ['P2'], symbolismIds: ['S03', 'S14', 'S16'],
    choices: [
      {
        ...choice('examine-motive', 'Request scrutiny of the land claim without a completed classification', [-8, -2], 'You resist treating the allegation as settled, but your request does not yet separate what is shown from what is inferred. The room hears an attack on its procedure; Putnam’s alleged motive remains unproved.', 'court-03'),
        variants: [{ id: 'classified', requirements: { flags: { landMotiveExamined: true } }, label: 'Distinguish the observation, allegation, and inference before judging', deltas: { reputation: -3, hysteria: -6 }, flags: {}, consequence: 'You identify a possible reason to investigate without manufacturing a finding of guilt. Some confidence in the accusation weakens. The court need not welcome that distinction, and the allegation against Putnam remains unproved.' }],
      },
      choice('accuse-putnam', 'Accuse Putnam of witchcraft to discredit his defense', [8, 12], 'You answer a demand for evidence with a new unsupported charge. The court’s method briefly works in your favor, but you have reproduced it. Putnam’s name now carries a false accusation from you.', 'court-03', { falseAccusation: true }),
    ],
  },
  {
    id: 'court-03', chapter: 3, speaker: 'Mary Warren', location: 'The courtroom',
    title: 'An account under pressure',
    body: 'When I speak here, every face asks which side I belong to. I remember what I told you. I am frightened of what they will do with it, and frightened of what you will demand if I falter.',
    basis: 'invented', actReference: 'Acts II–III', sourceStatus: 'adaptation',
    sourceNote: 'Original dialogue interprets coercion around Mary’s testimony. Fear is not treated as proof that either version of testimony is factually reliable.',
    chronologyNote: 'Several pressures are compressed into one decision; the game does not reproduce every reversal from the play.',
    evidenceIds: ['mary-account', 'defense-statement'], symbolismIds: ['S14', 'S28', 'S29'],
    choices: [
      {
        ...choice('support-testimony', 'Ask for Mary’s account without threatening her', [-10, -2], 'You decline to purchase testimony with another threat. Without an assembled provenance argument, your defense remains vulnerable and your standing falls. Mary’s fear is acknowledged rather than mistaken for proof.', 'court-04'),
        variants: [{ id: 'grounded-account', requirements: { flags: { poppetProvenance: true } }, label: 'Return to the examined provenance without threatening Mary', deltas: { reputation: -4, hysteria: -5 }, flags: {}, consequence: 'You return to the object’s provenance instead of demanding a performance of certainty from Mary. The distinction reduces the cost of your defense, though the court can still reject it and she remains under pressure.' }],
      },
      choice('disown-mary', 'Call Mary an agent of witchcraft to distance myself from her', [8, 12], 'Your accusation shifts danger toward Mary and gives the court a new claim to repeat. You regain standing through the same coercion that frightened her. Her vulnerability has become your instrument.', 'court-04', { falseAccusation: true }),
    ],
  },
  {
    id: 'court-04', chapter: 3, speaker: 'Deputy Governor Danforth', location: 'The courtroom',
    title: 'A rule that cannot be disproved',
    body: 'The court receives the accusation as a reason for suspicion. If you defend the accused, your defense will raise suspicion of you. Tell us where you stand, Proctor; the procedure leaves little room for your distinction.',
    basis: 'invented', actReference: 'Act III', sourceStatus: 'adaptation',
    sourceNote: 'Original paraphrased court rules, not Miller’s quotation. Their circular structure is this adaptation’s interpretation of binary institutional loyalty.',
    chronologyNote: 'The circular-logic exercise condenses the hearing’s rhetoric; it is not a literal procedure transcribed from the play or historical Salem.',
    evidenceIds: ['accusation-rule', 'defense-rule', 'defense-statement'], puzzleIds: ['P3'], symbolismIds: ['S13', 'S18', 'S32'],
    choices: [
      {
        ...choice('challenge-circle', 'Reject the court’s binary without a completed counterargument', [-10, -2], 'You refuse its terms but do not yet demonstrate how they turn a defense into confirmation. Danforth treats your resistance as further reason for suspicion. The court’s authority remains intact.', 'name-01'),
        variants: [{ id: 'closed-circle', requirements: { flags: { courtContradiction: true } }, label: 'Show how the rule counts both accusation and defense as guilt', deltas: { reputation: -4, hysteria: -7 }, flags: {}, consequence: 'You expose a rule that admits no meaningful disproof. Some listeners can now name the contradiction. Danforth still rejects your challenge; recognizing the logic does not make the court just.' }],
      },
      choice('accept-binary', 'Accept the rule that defending the accused creates suspicion', [8, 10], 'You gain a measure of institutional approval by accepting its terms. The procedure becomes harder for anyone else to challenge, because their disagreement can now be offered as evidence against them.', 'name-01'),
    ],
  },
];
