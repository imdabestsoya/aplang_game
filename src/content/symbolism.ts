import records from './symbolism.json';
import type { SymbolismRecord } from './narrativeTypes';
// JSON is the single maintained registry, also consumed by the documentation generator.
export const symbolism = records as readonly SymbolismRecord[];
