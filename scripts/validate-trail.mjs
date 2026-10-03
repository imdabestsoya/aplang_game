import { readFileSync, existsSync } from 'node:fs';
import { URL, fileURLToPath } from 'node:url';
import process from 'node:process';
import { validateItineraries } from '../src/content/trail/itineraries.ts';
import { validateTrail, validatePixels } from '../src/content/trail/validation.ts';
const root = new URL('../', import.meta.url);
const data = JSON.parse(readFileSync(new URL('src/content/trail/foundation.json', root), 'utf8'));
const errors = [...validateTrail(data), ...validateItineraries(data)];
if (process.argv.includes('--assets') && errors.length === 0) {
  for (const asset of data.assets) {
    try { errors.push(...validatePixels(JSON.parse(readFileSync(new URL(`public${asset.path}`, root), 'utf8')), asset)); }
    catch (error) { errors.push(`${asset.id}: cannot read asset: ${error.message}`); }
  }
}
for (const symbol of data.symbols ?? []) for (const path of symbol.implementationReferences ?? []) {
  if (path.includes('..') || !existsSync(fileURLToPath(new URL(path, root)))) errors.push(`${symbol.id}: missing implementation ${path}`);
}
if (errors.length) { process.stderr.write(errors.join('\n') + '\n'); process.exitCode = 1; }
else process.stdout.write(`PASS: trail ${process.argv.includes('--assets') ? 'assets and content' : 'content'} (${data.landmarks.length} landmark; future journey content not yet authored).\n`);
