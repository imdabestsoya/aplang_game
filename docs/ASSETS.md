# Trail Asset Inventory

Sessions 07–08 implement two landmarks and the first travel scene (PRD §§11, 15). Machine-readable inventory: `src/content/trail/foundation.json`, `assets`. All files below are original, hand-authored indexed-pixel data rendered into Canvas; no downloaded art, fonts or image generation service is used.

| Asset | File | Dimensions / frames | State |
|---|---|---|---|
| Parris room | `public/assets/trail/parris-room.json` | 320×180; one frame | Original interim scene; Session 12 owns final review |
| Proctor farm | `public/assets/trail/proctor-farm.json` | 320×180; one frame | Original interim scene; Session 12 final review |
| Country road | `public/assets/trail/country-road.json` | 320×180; one frame | Original interim travel layer; Session 12 final review |
| Horse/cart | `public/assets/trail/horse-cart.json` | 256×40; four 64×40 frames | Original interim strip; Session 12 final review |
| John | `public/assets/trail/john.json` | 96×128 atlas; 16×32 frames; six per direction × four directions | Two idle and four walk frames per direction; Session 12 owns final review |

Each pixel file records width, height, a one-character color-key palette and one string per row. `.` is transparent. Edit the indexed data and manifest together; run `npm run validate:assets`. The validator checks paths/files, actual dimensions, known colors, palette values, atlas tiling/frame counts, creator/license descriptions, placeholder flags and replacement owners. The content validator also rejects missing implementation references. Original ownership/provenance is recorded; no third-party license is asserted.

The world uses 20×11 tiles (320×176) inside a 320×180 canvas, with four spare pixels rather than distorting a 20×12 map. Collision data independently defines walkable floor and furniture; every object has a reachable approach and a named HTML alternative. Canvas integer scaling is used when it fits; narrower views fit without smoothing.

Nine other character sets, remaining four landmarks, jail, final travel tiles, portraits, resource icons and sound remain future-session deliverables. Passing this five-asset manifest is not certification of that complete inventory. The retired card UI and its synthesized audio controller are removed from the active app. Historical asset references do not describe current playable content.
