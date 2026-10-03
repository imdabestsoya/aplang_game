import type { Landmark } from '../../content/trail/types';
export type Direction = 'south' | 'north' | 'west' | 'east';
export interface Exploration { x: number; y: number; direction: Direction; inspected: string[] }
export const supplies = { day: 1, food: 24, stamina: 80, condition: 90, coins: 12, kits: 2, reputation: 65, hysteria: 25 } as const;
export function initialExploration(map: Landmark): Exploration { return { ...map.spawn, direction: 'south', inspected: [] }; }
export function move(state: Exploration, direction: Direction, map: Landmark): Exploration {
  const [dx, dy] = { north: [0, -1], south: [0, 1], west: [-1, 0], east: [1, 0] }[direction];
  const x = state.x + dx; const y = state.y + dy;
  return { ...state, direction, ...(map.walkable[y]?.[x] === '1' ? { x, y } : {}) };
}
export function inspect(state: Exploration, id: string, map: Landmark): Exploration {
  return !map.interactions.some(i => i.id === id) || state.inspected.includes(id) ? state : { ...state, inspected: [...state.inspected, id] };
}
export function nearby(state: Exploration, map: Landmark) { return map.interactions.filter(i => Math.abs(i.x - state.x) + Math.abs(i.y - state.y) <= 1); }
