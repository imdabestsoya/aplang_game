import type { NarrativePuzzle } from './narrativeTypes';
export const puzzles: readonly NarrativePuzzle[] = [
  {
    "id": "P1",
    "title": "Trace the poppet",
    "reward": "poppetProvenance",
    "availableAt": "needle-04",
    "evidenceIds": [
      "poppet",
      "needle",
      "mary-account",
      "accusation-record"
    ],
    "solution": [
      "sewing",
      "gift",
      "accusation",
      "possession-not-intent"
    ],
    "hints": [
      "Read Mary’s account and locate the gift relative to the accusation.",
      "Separate the object’s earlier history from the intent later attributed to its owner.",
      "Order the making, gift and later use of the object as evidence. Mary’s needle account is testimony, not proof of Elizabeth’s intent. The exercise does not require an exact needle-placement time."
    ],
    "explanation": "Order the making, gift and later use of the object as evidence. Mary’s needle account is testimony, not proof of Elizabeth’s intent. The exercise does not require an exact needle-placement time.",
    "basis": "interpretation",
    "actReference": "Act II",
    "sourceNote": "Original teaching exercise derived from PRD §7, not dialogue from the play.",
    "symbolismIds": [
      "S15"
    ],
    "verification": "Making/gift/discovery sequence corroborated; exact needle timing is not asserted or required."
  },
  {
    "id": "P2",
    "title": "Examine the alleged motive",
    "reward": "landMotiveExamined",
    "availableAt": "court-02",
    "evidenceIds": [
      "property-note",
      "giles-allegation",
      "court-motive-claim"
    ],
    "solution": [
      "observation",
      "allegation",
      "inference",
      "scrutiny-not-proof"
    ],
    "hints": [
      "Compare what the invented diagram shows with what Giles alleges.",
      "An observation describes the note; an allegation makes an unproved claim; an inference draws a conclusion.",
      "The constructed transfer is an observation within an invented artifact; Giles offers an allegation; the court draws an inference. Motive invites scrutiny, not a verdict."
    ],
    "explanation": "The constructed transfer is an observation within an invented artifact; Giles offers an allegation; the court draws an inference. Motive invites scrutiny, not a verdict.",
    "basis": "interpretation",
    "actReference": "Act III",
    "sourceNote": "Original teaching exercise derived from PRD §7, not dialogue from the play.",
    "symbolismIds": [
      "S16"
    ],
    "verification": "Original reasoning exercise; quotation excerpts have separate source records."
  },
  {
    "id": "P3",
    "title": "Test the court’s rule",
    "reward": "courtContradiction",
    "availableAt": "court-04",
    "evidenceIds": [
      "accusation-rule",
      "defense-rule",
      "defense-statement"
    ],
    "solution": [
      "accusation-confirms",
      "defense-confirms",
      "no-disproof"
    ],
    "hints": [
      "Compare the accusation rule with the defense rule.",
      "Ask what response, if any, the procedure would allow to count against guilt.",
      "A rule that treats both accusation and defense as guilt allows no disproof. Identifying that contradiction challenges the rule, not just one verdict."
    ],
    "explanation": "A rule that treats both accusation and defense as guilt allows no disproof. Identifying that contradiction challenges the rule, not just one verdict.",
    "basis": "interpretation",
    "actReference": "Act III",
    "sourceNote": "Original teaching exercise derived from PRD §7, not dialogue from the play.",
    "symbolismIds": [
      "S18"
    ],
    "verification": "Original reasoning exercise; quotation excerpts have separate source records."
  }
];
