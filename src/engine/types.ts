export interface SourceNote {
  basis: 'canonical' | 'interpretation' | 'invented';
  actReference: string;
  sourceNote: string;
}

export interface Meters {
  reputation: number;
  hysteria: number;
}

export interface Flags {
  poppetProvenance: boolean;
  landMotiveExamined: boolean;
  courtContradiction: boolean;
  falseAccusation: boolean;
  signedFalseConfession: boolean;
}

export interface Choice {
  id: string;
  label: string;
  requirements: readonly string[];
  deltas: Meters;
  flags: Partial<Flags>;
  consequence: string;
  nextCardId: string | null;
}

export interface Card extends SourceNote {
  id: string;
  chapter: number;
  speaker: string;
  title: string;
  body: string;
  evidenceIds: readonly string[];
  choices: readonly [Choice, Choice];
  symbolismIds: readonly string[];
}

export interface Evidence extends SourceNote {
  id: string;
  title: string;
  classification: string;
  body: string;
}

export interface Decision {
  cardId: string;
  choiceId: string;
  label: string;
  before: Meters;
  after: Meters;
  consequence: string;
  symbolismIds: readonly string[];
}

export interface GameState extends Meters {
  currentCardId: string | null;
  evidenceIds: readonly string[];
  flags: Flags;
  history: readonly Decision[];
}
