import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
const css = readFileSync(new URL('../../src/styles/tokens.css', import.meta.url), 'utf8');
const tokens = Object.fromEntries([...css.matchAll(/--([\w-]+):\s*(#[\da-f]{6})/gi)].map(m => [m[1], m[2]]));
function luminance(hex: string) {
  const channels = hex.slice(1).match(/../g)!.map(c => parseInt(c, 16) / 255).map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}
function ratio(a: string, b: string) { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }
const pairs = [
  ['parchment', 'charcoal'], ['muted', 'charcoal'], ['blue', 'charcoal'], ['gold', 'charcoal'],
  ['parchment', 'panel'], ['muted', 'panel'], ['gold', 'panel'], ['charcoal', 'parchment'], ['oxblood', 'parchment'],
  ['paper-muted', 'parchment'], ['parchment', 'dawn'], ['gold', 'dawn'], ['muted', 'dawn'], ['blue', 'dawn'],
] as const;
it.each(pairs)('%s on %s meets AA for normal text', (fg, bg) => expect(ratio(tokens[fg], tokens[bg])).toBeGreaterThanOrEqual(4.5));
it('focus rings and form boundaries remain distinguishable on their backgrounds', () => {
  expect(ratio(tokens['paper-focus'], tokens.parchment)).toBeGreaterThanOrEqual(3);
  expect(ratio(tokens.blue, tokens.charcoal)).toBeGreaterThanOrEqual(3);
  expect(ratio(tokens['paper-border'], tokens.parchment)).toBeGreaterThanOrEqual(3);
});
