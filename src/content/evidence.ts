import type { NarrativeEvidence } from './narrativeTypes';
export const evidence: readonly NarrativeEvidence[] = [
  {
    "id": "household-report",
    "title": "A report without a witness",
    "classification": "Allegation · source unconfirmed",
    "body": "The household repeats a claim of witchcraft. No named witness or direct observation accompanies this report. Repetition is not proof.",
    "basis": "invented",
    "actReference": "Act I",
    "sourceNote": "Original adaptation prose based on PRD §§5, 9–10; not a quotation or a transcription of a historical document.",
    "symbolismIds": [
      "S14"
    ],
    "verification": "original-adaptation"
  },
  {
    "id": "authority-note",
    "title": "The authority of learning",
    "classification": "Interpretation",
    "body": "A learned title can lend a claim authority. Hale initially trusts his methods; later doubt does not undo their consequences.",
    "basis": "interpretation",
    "actReference": "Act I and IV",
    "sourceNote": "Original adaptation prose based on PRD §§5, 9–10; not a quotation or a transcription of a historical document.",
    "symbolismIds": [
      "S27"
    ],
    "verification": "original-adaptation"
  },
  {
    "id": "rebecca-record",
    "title": "Rebecca’s standing",
    "classification": "Interpretation",
    "body": "Rebecca’s respected standing offers no reliable protection against accusation. Reputation and evidence are different measures.",
    "basis": "interpretation",
    "actReference": "Act I and IV",
    "sourceNote": "Original adaptation prose based on PRD §§5, 9–10; not a quotation or a transcription of a historical document.",
    "symbolismIds": [
      "S31"
    ],
    "verification": "original-adaptation"
  },
  {
    "id": "source-record",
    "title": "A record of uncertainty",
    "classification": "Invented teaching record",
    "body": "Record who observed an event, who repeated it, and what remains unknown. An omitted uncertainty cannot become corroboration.",
    "basis": "invented",
    "actReference": "Act I–II",
    "sourceNote": "Original adaptation prose based on PRD §§5, 9–10; not a quotation or a transcription of a historical document.",
    "symbolismIds": [
      "S21"
    ],
    "verification": "original-adaptation"
  },
  {
    "id": "poppet",
    "title": "The poppet",
    "classification": "Object · adapted chronology",
    "body": "Mary sews a doll in court and gives it to Elizabeth before the needle is discovered in the household. The publisher guide corroborates this broad sequence; the object alone proves no intent.",
    "basis": "invented",
    "actReference": "Act II",
    "sourceNote": "Original adaptation prose based on PRD §§5, 9–10; not a quotation or a transcription of a historical document.",
    "symbolismIds": [
      "S15"
    ],
    "verification": "publisher-summary-corroborated"
  },
  {
    "id": "needle",
    "title": "The needle",
    "classification": "Object · reported testimony",
    "body": "Mary reports that she believes she inserted the needle herself. Treat this as testimony, not an observed reconstruction of the exact moment. Possession alone does not establish harmful intent.",
    "basis": "invented",
    "actReference": "Act II",
    "sourceNote": "Original adaptation prose based on PRD §§5, 9–10; not a quotation or a transcription of a historical document.",
    "symbolismIds": [
      "S15"
    ],
    "verification": "text-corroborated"
  },
  {
    "id": "mary-account",
    "title": "Mary’s account",
    "classification": "Testimony · Mary’s account",
    "body": "Mary says she made the poppet in court and gave it to Elizabeth that evening. Asked about the needle, she initially expresses uncertainty; she also says Abigail sat beside her while she made the doll. Separate her account from the conclusions others draw.",
    "basis": "invented",
    "actReference": "Act II",
    "sourceNote": "Original adaptation prose based on PRD §§5, 9–10; not a quotation or a transcription of a historical document.",
    "symbolismIds": [
      "S28"
    ],
    "verification": "text-corroborated"
  },
  {
    "id": "accusation-record",
    "title": "The accusation against Elizabeth",
    "classification": "Allegation",
    "body": "Abigail’s reported injury becomes an accusation against Elizabeth through the poppet. This is a claim of causation, not a demonstrated causal chain.",
    "basis": "invented",
    "actReference": "Act II",
    "sourceNote": "Original adaptation prose based on PRD §§5, 9–10; not a quotation or a transcription of a historical document.",
    "symbolismIds": [
      "S18"
    ],
    "verification": "original-adaptation"
  },
  {
    "id": "giles-allegation",
    "title": "Giles’s allegation",
    "classification": "Allegation",
    "body": "Giles alleges that land interests can benefit from accusations. An alleged motive deserves examination, but is not proof that a particular accusation was fabricated.",
    "basis": "invented",
    "actReference": "Act III",
    "sourceNote": "Original adaptation prose based on PRD §§5, 9–10; not a quotation or a transcription of a historical document.",
    "symbolismIds": [
      "S16"
    ],
    "verification": "original-adaptation"
  },
  {
    "id": "property-note",
    "title": "A constructed property ledger",
    "classification": "Observation · invented artifact",
    "body": "This invented ledger diagram shows that a transfer of property could benefit a neighboring owner. What is observable is the diagram’s proposed transfer, not a verified historical transaction.",
    "basis": "invented",
    "actReference": "Act III",
    "sourceNote": "Original adaptation prose based on PRD §§5, 9–10; not a quotation or a transcription of a historical document.",
    "symbolismIds": [
      "S16"
    ],
    "verification": "original-adaptation"
  },
  {
    "id": "court-motive-claim",
    "title": "The court’s inference",
    "classification": "Inference · invented teaching record",
    "body": "The court reasons that its official purpose guarantees the righteousness of an accusation. Authority does not independently establish either a witness’s motive or the truth of a claim.",
    "basis": "invented",
    "actReference": "Act III",
    "sourceNote": "Original adaptation prose based on PRD §§5, 9–10; not a quotation or a transcription of a historical document.",
    "symbolismIds": [
      "S16"
    ],
    "verification": "original-adaptation"
  },
  {
    "id": "defense-statement",
    "title": "A defense statement",
    "classification": "Invented teaching record",
    "body": "A witness withdraws an earlier claim under pressure. Compare reasons and corroboration. Treating every defense as disloyalty prevents any claim from being tested.",
    "basis": "invented",
    "actReference": "Act III",
    "sourceNote": "Original adaptation prose based on PRD §§5, 9–10; not a quotation or a transcription of a historical document.",
    "symbolismIds": [
      "S28"
    ],
    "verification": "original-adaptation"
  },
  {
    "id": "accusation-rule",
    "title": "The accusation rule",
    "classification": "Interpretation · adapted rule",
    "body": "The court treats an accusation as evidence of guilt. A testable claim would identify some possible observation that could count against it.",
    "basis": "interpretation",
    "actReference": "Act III",
    "sourceNote": "Original adaptation prose based on PRD §§5, 9–10; not a quotation or a transcription of a historical document.",
    "symbolismIds": [
      "S18"
    ],
    "verification": "original-adaptation"
  },
  {
    "id": "defense-rule",
    "title": "The defense rule",
    "classification": "Interpretation · adapted rule",
    "body": "The court treats denial or defense as further evidence of guilt. If both agreement and disagreement confirm guilt, the rule cannot be disproved.",
    "basis": "interpretation",
    "actReference": "Act III",
    "sourceNote": "Original adaptation prose based on PRD §§5, 9–10; not a quotation or a transcription of a historical document.",
    "symbolismIds": [
      "S18"
    ],
    "verification": "original-adaptation"
  },
  {
    "id": "decision-record",
    "title": "The record you carry",
    "classification": "Invented reflection aid",
    "body": "Read your actual decisions in the journal. A later refusal cannot erase an earlier false accusation. Acknowledging harm is different from claiming innocence.",
    "basis": "invented",
    "actReference": "Act IV",
    "sourceNote": "Original adaptation prose based on PRD §§5, 9–10; not a quotation or a transcription of a historical document.",
    "symbolismIds": [
      "S36"
    ],
    "verification": "original-adaptation"
  },
  {
    "id": "confession-draft",
    "title": "An unsigned confession",
    "classification": "Invented artifact",
    "body": "This adapted document asks for a public signature to a false confession. Signing protects standing within the system at a moral cost. Refusal is resistance, not a promise of physical escape.",
    "basis": "invented",
    "actReference": "Act IV",
    "sourceNote": "Original adaptation prose based on PRD §§5, 9–10; not a quotation or a transcription of a historical document.",
    "symbolismIds": [
      "S17"
    ],
    "verification": "original-adaptation"
  }
];
