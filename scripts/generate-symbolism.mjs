import { URL } from 'node:url';
import process from 'node:process';
import { readFileSync, writeFileSync } from 'node:fs';
const records = JSON.parse(readFileSync(new URL('../src/content/symbolism.json', import.meta.url), 'utf8'));
const document = '# Historical Card Symbolism Register\n\nThis register describes the retired interface; its file locations and implementation statuses are historical. The current 8-bit register is in `src/content/trail/foundation.json`.\n\nGenerated from `src/content/symbolism.json`; run `npm run docs:symbolism` after editing the registry. All interpretations are adaptation decisions, not claims of authorial intent.\n\n' + records.map(r => `## ${r.id} — ${r.choice}\n\n${r.meaning}\n\nImplementation: ${r.implementation}\n\nStatus: **${r.status}**. ${r.remaining}\n\nLocations: ${r.locations.map(p => '`' + p + '`').join(', ')}.\n\nBasis: ${r.basis}; ${r.actReference}. ${r.sourceNote}\n\nVerification: ${r.verification}\n`).join('\n');
const path = new URL('../docs/SYMBOLISM.md', import.meta.url);
if (process.argv.includes('--check')) {
  if (readFileSync(path, 'utf8') !== document) throw new Error('Symbolism documentation is stale. Run npm run docs:symbolism.');
} else writeFileSync(path, document);
