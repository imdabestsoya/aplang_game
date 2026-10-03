# 8-bit-only game viewport

## Request and scope

2026-10-02. User explicitly requested removal of the card experience and all external gameplay panels, E-triggered in-game popups, fullscreen and arrow-key movement. `/resume` continues this request, not Session09. This supersedes the earlier plan to preserve two playable interfaces until Session10.

## Changes

- `/` and `/trail` now render only TrailApp. Removed retired App, card UI components, card stylesheet, audio controller and React save hook. Pure narrative/source modules and their rule tests remain development references for later trail story work; no old-game code is imported by the production entry.
- One viewport contains the Canvas world, supplies HUD, location, touch controls, announcements and game menu. Document scrolling is disabled. Canvas scales against both available dimensions.
- Observations, Objects, Journey, Journal, Settings, recovery and outcomes open inside the game. Long menus scroll internally. Native dialogs plus explicit Tab/Shift+Tab wrapping contain focus; headings receive focus and Escape/Close returns to the world.
- Arrow keys/WASD move John and E/Enter inspect. Menus suppress background movement. Touch controls and named object alternatives remain available.
- Native fullscreen targets the entire game element, including dialogs. The button tracks fullscreen changes; rejection/unavailability has an in-game message. Windowed play already fits the viewport.
- Resource transitions and journey save schemas are unchanged; old namespaces remain untouched. Animation, skip and reload preserve outcomes.
- Removed obsolete browser tests for the retired UI and replaced them with current game viewport tests. Unit/route reference tests remain intact.

## Verification

Complete. `npm run check` passed94 unit tests,13 retained narrative route tests, lint/types, generated-document checks, content/assets validators and build. Final production browser suite:16 passed in32.9 seconds (desktop and360px touch). Final lint/build and scaffold/whitespace checks passed. Screenshots are in `docs/screenshots/game-viewport/` (world, travel, observation popup and200% journal). Commands: `npm run check`; `E2E_PORT=4183 E2E_PREVIEW=1 npm run test:e2e`; `python3 scripts/verify_scaffold.py`; `git diff --check`. Port4183 avoids interrupting an existing preview at4173. E2E_PORT is now configurable and validated.

Browser coverage: arrow/E popup, no time cost while reading, focus containment/return, popup containment in real fullscreen, fullscreen exit, saved observations/reload, touch,360px and200% text, save corruption/blocked storage, denied fullscreen, road and detour, animation modes, farm trade/rest and risk confirmation.

First browser attempt:14 passed and2 caught focus leaving the modal for browser chrome after Tab. Added explicit focus wrapping. Screenshot review also caught an unsupported fullscreen glyph and a cramped Interact label; replaced the glyph with a small inline icon and widened the label.

## Boundaries and continuation

Only the first leg is playable. Events, remaining story, final art, literary checks and human classroom/accessibility review remain Sessions09–13 work. This UI request does not complete those sessions. Motion settings remain tab-local as before.

Next: Session09's atomic encounters and pending-state persistence. Keep future menus and dialogue inside the game. Do not restore the retired card interface.

Existing uncommitted scaffolding and Sessions07–08 work were preserved. No Git commit, push, reset, remote change or deployment. Retired interface files with preexisting edits were copied before removal to `/private/tmp/the-weight-retired-interface`; historical documents remain in the repository.
