import type { Choice, Flags } from '../../engine/types';

export function choice(id: string, label: string, deltas: readonly [number, number], consequence: string, nextCardId: string | null, flags: Partial<Flags> = {}): Choice {
  return { id, label, deltas: { reputation: deltas[0], hysteria: deltas[1] }, flags, consequence, nextCardId };
}
