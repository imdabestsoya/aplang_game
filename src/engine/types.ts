export interface SourceNote {
  basis: 'canonical' | 'interpretation' | 'invented';
  actReference: string;
  sourceNote: string;
}

export interface Meters { reputation: number; hysteria: number }
export interface Flags {
  poppetProvenance: boolean;
  landMotiveExamined: boolean;
  courtContradiction: boolean;
  falseAccusation: boolean;
  signedFalseConfession: boolean;
}
export type PuzzleFlag = 'poppetProvenance' | 'landMotiveExamined' | 'courtContradiction';
export interface Requirements { evidenceIds?: readonly string[]; flags?: Partial<Flags> }
export interface ChoiceEffects {
  label: string;
  deltas: Meters;
  flags: Partial<Flags>;
  consequence: string;
}
export interface ChoiceVariant extends ChoiceEffects { id: string; requirements: Requirements }
export interface Choice extends ChoiceEffects {
  id: string;
  variants?: readonly ChoiceVariant[];
  nextCardId: string | null;
  finalAction?: 'sign' | 'refuse';
}
export interface Card extends SourceNote {
  id: string;
  chapter: number;
  speaker: string;
  title: string;
  body: string;
  evidenceIds: readonly string[];
  puzzleIds?: readonly string[];
  final?: boolean;
  choices: readonly [Choice, Choice];
  symbolismIds: readonly string[];
}
export interface Evidence extends SourceNote {
  id: string;
  title: string;
  classification: string;
  body: string;
}
export interface Puzzle {
  id: string;
  reward: PuzzleFlag;
  solution: readonly string[];
  hints: readonly [string, string, string];
  explanation: string;
}
export interface Content {
  version: string;
  firstCardId: string;
  cards: readonly Card[];
  evidence: readonly Evidence[];
  puzzles: readonly Puzzle[];
}
export interface Ending {
  id: 'condemned' | 'town-rupture' | 'name-preserved' | 'within-system';
  title: string;
  variant: 'threshold' | 'resistance' | 'confession' | 'unresolved-resistance';
  condemnation: boolean;
  explanation: string;
}
export interface Decision {
  cardId: string;
  choiceId: string;
  variantId: string | null;
  label: string;
  before: Meters;
  after: Meters;
  consequence: string;
  symbolismIds: readonly string[];
  nextCardId: string | null;
}
export interface RunState extends Meters {
  currentCardId: string;
  phase: 'choice' | 'consequence' | 'ended' | 'sample-complete';
  evidenceIds: readonly string[];
  flags: Flags;
  history: readonly Decision[];
  hintLevels: Record<string, number>;
  solvedPuzzleIds: readonly string[];
  puzzleFeedback: string | null;
  ending: Ending | null;
}
export interface Checkpoint { chapter: number; state: RunState }
export interface GameState extends RunState {
  revision: number;
  checkpoints: readonly Checkpoint[];
}
export type Action = { revision: number } & (
  | { type: 'choose'; cardId: string; choiceId: string; variantId: string | null }
  | { type: 'continue' }
  | { type: 'inspect'; cardId: string; evidenceId: string }
  | { type: 'hint'; puzzleId: string }
  | { type: 'solve'; puzzleId: string; answer: readonly string[] }
  | { type: 'replay'; chapter: number }
  | { type: 'restart' }
);
export interface TransitionResult { state: GameState; error: string | null }
