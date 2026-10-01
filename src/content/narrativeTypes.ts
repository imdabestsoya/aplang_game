import type { Card, Evidence, Puzzle, SourceNote } from '../engine/types';

export interface NarrativeCard extends Card {
  location: string;
  chronologyNote: string;
  sourceStatus: 'adaptation' | 'provisional';
  unlocksPuzzleIds?: readonly string[];
}
export interface NarrativeEvidence extends Evidence {
  symbolismIds: readonly string[];
  verification: 'original-adaptation' | 'publisher-summary-corroborated' | 'text-corroborated' | 'edition-check-pending';
}
export interface NarrativePuzzle extends Puzzle, SourceNote {
  title: string;
  evidenceIds: readonly string[];
  symbolismIds: readonly string[];
  availableAt: string;
  verification: string;
}
export interface SymbolismRecord extends SourceNote {
  id: string;
  choice: string;
  meaning: string;
  implementation: string;
  locations: readonly string[];
  status: 'implemented' | 'partial' | 'deferred';
  verification: string;
  remaining: string;
}
export interface QuotationSlot extends SourceNote {
  id: string;
  passage: string;
  speaker: string;
  text: string | null;
  status: 'unverified' | 'draft' | 'verified';
  edition: string | null;
  page: string | null;
  sourceUrl: string | null;
  verifiedAt: string | null;
  context: string;
  trigger:
    | { kind: 'card'; cardId: string }
    | { kind: 'first-hysteria-crossing'; threshold: number }
    | { kind: 'first-false-accusation' };
  debrief: 'always' | 'if-not-triggered' | 'never';
  contentNotice?: string;
}
