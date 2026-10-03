# Salem Trail Art and Interaction Direction

Implementation brief for active PRD §§3, 6, 11–12, 14. This is a design contract, not a claim that assets already exist. Sessions 07/08 establish the look; Session 12 finishes it.

## Screen composition

Use a centered game frame with a compact pixel-lettered title, map/location line and HTML resource HUD. The world occupies the main upper panel; a parchment interaction panel beneath it holds prose and clearly labeled actions. On desktop, put journal/map controls in a narrow side rail; at 360px stack them below the scene. Give the scene room to read rather than surrounding it with dashboard tiles. Keep weather, cart movement and visible landmarks central to play.

Render the world at 320×180 logical pixels with smoothing disabled and nearest-neighbor CSS scaling. Prefer integer scale and letterboxing; fit proportionally on narrow screens. Nominal 20×12 maps exceed the canvas vertically: use a restrained camera or document a 20×11 visible tile area, never distort tiles. Long text, resource labels and choices stay in scalable HTML.

## Palette and pixel language

Use charcoal ground, parchment panels, oxblood accusation accents, tarnished-gold status, muted-blue inspection and ember warning details from §12. Validate actual contrast pairs; preserve existing accessible supporting shades where suitable. Use separate respectful skin tones without moral coding. Draw consistent hard pixel edges, stepped silhouettes and sparse highlights; no glossy gradients or smooth vector characters in the world.

John must remain distinguishable from the cart and background at native scale. Use 16px tiles, 16×24/32 characters, 48×48 portraits, horse/cart ≤64×40, four-frame walks and two-frame idles. Every asset has path, dimensions, frames, palette and creator/license metadata. Generate original deterministic pixel assets or draw them directly; never copy Oregon Trail sprites or screen compositions.

## Scene progression

- Parris house: tight interior, candle, doorway, notice and uneasy faces.
- Proctor farm: warm timber, worktable, poppet and domestic distance.
- Meetinghouse yard: noticeboard, public scrutiny and supply counter.
- Field boundary: fence, ledger and conflicting ownership claims.
- Court approach: narrowing road, repeating seals and sparse scenery.
- Courtroom: symmetrical enclosing benches and authority elevated visually.
- Jail: near-still scene, confession desk and candle; dawn after resistance does not open the bars.

Travel shows John and horse/cart on a side-view road with independently scrolling fence/tree/sky layers. Reduced motion freezes the scene and updates written progress. Animation skipping never changes simulation outcomes.

## Interaction and review

Arrow/WASD movement and E/Enter interaction are optional shortcuts to named HTML controls. Include touch direction/Interact controls and a nearby-interactions list; never require pixel hunting. Focus rings, 44px targets, settings for large text/instant dialogue/numeric meters, readable forecasts and text equivalents are mandatory. Audio is optional, original and restrained; silence at the final desk matters more than a victory jingle.

Capture desktop, 360px, 200% text/zoom, landmark, travel, court and ending screenshots as features land. Review crispness, composition, readable hierarchy, crowding and focus. Track S01–S52 implementation honestly; functional layout choices need no invented symbolic meaning.

## Session 07 implementation

The first Parris-room scene and John atlas now establish the visual direction: flat pixel timber, window, hearth, report table, rug and satchel, with a parchment observation panel and object-list rail. See [asset inventory](ASSETS.md). The implemented map is20×11 tiles with4 spare canvas pixels. Nearest-neighbor scaling uses integer multiples where available and fits at360px. Header typography currently uses a local monospace/system face with stepped shadow; the final pixel heading treatment belongs to Session12.

## Session 08 implementation

Original indexed pixels add a timber farm, country-road layer and four-frame horse/cart strip. Travel uses a side view with separately moving foreground trees; the distant skyline stays still. Reduced motion presents the same committed progress statically. HTML controls expose route totals and daily forecasts; essential words are never painted into the canvas. All five assets remain openly interim pending Session12 review.

## User-directed viewport update

The latest user direction supersedes the earlier external side rail/parchment page layout. Present one window-filling game: HUD and controls frame the pixel world; object descriptions, journal, settings and preparation open as parchment overlays inside it. Keep the page itself stationary, preserve scalable text and allow scrolling within long popups. Fullscreen expands this same game element and its descendants.
