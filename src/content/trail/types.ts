export interface Source { basis: 'canonical' | 'interpretation' | 'invented'; actReference: string; sourceNote: string; symbolismIds: string[] }
export interface Effects { food?: number; stamina?: number; condition?: number; coins?: number; kits?: number; reputation?: number; hysteria?: number }
export interface Action { id: string; label: string; costs: Effects; deltas: Effects; flags: Record<string, boolean>; nextPhase: 'landmark' | 'travel' | 'event' | 'jail' | 'ended' }
export interface Route { id: string; origin: string; destination: string; length: number; arrivalEffects: Effects; obstacle: string | null; eventThresholds: number[] }
export interface Encounter extends Source { id: string; mandatory: boolean; conditions: Record<string, boolean>; dialogue: string; actions: Action[] }
export interface Puzzle extends Source { id: string; clues: string[]; solution: string[]; feedback: string; hints: string[]; resultFlag: string }
export interface Symbol { id: string; decision: string; rationale: string; basis: Source['basis']; implementationReferences: string[]; status: 'implemented' | 'partial' | 'planned' }
export interface PixelAsset { width: number; height: number; palette: Record<string, string>; pixels: string[] }
export interface Asset { id: string; path: string; width: number; height: number; frameWidth: number; frameHeight: number; frames: number; palette: string[]; creator: string; license: string; placeholder: boolean; replacementOwner: string | null }
export interface Interaction extends Source { id: string; title: string; x: number; y: number; body: string; encounterId: string }
export interface Landmark { id: string; title: string; assetId: string; width: number; height: number; spawn: { x: number; y: number }; walkable: string[]; interactions: Interaction[] }
export interface TrailContent { version: string; firstLandmark: string; landmarks: Landmark[]; routes: Route[]; encounters: Encounter[]; puzzles: Puzzle[]; symbols: Symbol[]; assets: Asset[] }
