# Session 05 — Visual Rhetoric and Symbolism

## Attempt

2026-10-01. Implements PRD §§3, 9–11 and 16. Presentation is complete for this milestone; literary and classroom release review remain separate gates.

## Completed work

- Original decorative SVG objects: poppet/needle, constructed ledger, seal, candle, confession paper/pen and bars. Fixed outer lines suggest enclosure without narrowing the reading column. Crisis adds an amber border, written danger warning and slow decorative seal tilt. Resistance adds restrained warm charcoal while keeping bars and the tragic-outcome explanation.
- The spoiler-gated native dialog reads the shared S01–S36 registry, including basis, act reference, source notes, verification and deferred status. Documentation is generated from those same records. S33/S34 are explicitly deferred for verified historical/contextual review; all other entries have implementations and paths.
- Optional original synthesized ambience starts only after Enable optional ambience. Text descriptions remain visible regardless of sound. Persistent mute fades master volume; the confession desk and endings are silent. Saved and OS reduced-motion preferences disable decoration independently.
- Continue/restart/replay focus the updated heading after rendering; endings focus the ending heading. Escape/Close restores the symbolism opener. Existing journal history, closed-resistance warning and numerical ending audit remain intact.
- Palette tests cover normal-text pairs and functional boundaries. Darker paper-focus and form-border shades improve contrast without new symbolic claims. The guide layout was corrected after 200% zoom testing exposed an offscreen close control.

## Changed files and preserved work

New components: `src/components/StoryObjects.tsx`, `SymbolismGuide.tsx`, `Ambience.tsx`; synthesized audio: `src/audio/ambience.ts`. Updated `src/App.tsx`, CSS tokens/styles, symbolism registry, and registry validation. Added contrast and presentation tests; extended full-route browser checks for ending focus and retained bars. Updated generated symbolism, sources/provenance, commands, accessibility notes, guides and session records.

Session 03/04 changes already present in the working tree were preserved. Card effects, puzzle solutions, engine rules, save versions and saved route fixtures did not change.

## Git state

Branch `main`, HEAD `ed08925` at verification. Existing uncommitted Session 03/04 work plus Session 05 changes remain in the working tree. No commit, push, deployment or remote modification was performed.

## Commands and observed results

Working directory `/Users/krishbehl/aplang_game`; local Node 22.23.3/npm 10.9.9 and Playwright 1.56.1/Chromium 141.

| Command | Observed result |
|---|---|
| Baseline `npm run check` | 58 unit + 13 route tests, lint/types and build passed |
| Final `npm run check` | 73 unit + 13 route tests, lint/types, registry/docs checks and build passed |
| Development browser suite | Initial 28 passed; zoom close control and an overbroad hidden-number assertion failed. After fixes, all 14 affected presentation/foundation tests passed |

The 85,337-state route search and five saved witnesses still pass unchanged. Browser checks use real UI controls and the actual Web Audio gain for successful playback; a separate failure test makes AudioContext unavailable. No game-state injection is used for presentation or route checks.

## Visual evidence and review limits

[Accessibility notes](../ACCESSIBILITY.md) record tested color pairs, zoom methodology, focus behavior and remaining review scope. Selected screenshots are in `docs/screenshots/session-05/`: `zoom-200.png`, `symbolism-guide.png`, `court-pressure-360.png`, and `confession-desk.png`.

Screenshots were visually inspected for readable content, bounded decoration, visible controls, and source-status disclosures. The 200% check uses Chromium CSS page zoom; it exposed and verified a genuine layout correction but is not a browser-menu/text-only-zoom certification. Keyboard flows, mute, motion, replay and focus are browser automation evidence. No separate screen-reader session, physical speaker listening test, or independent human playtest was performed; those limitations remain explicit for Session 06.

## Working user flow

Play normally or follow [verified routes](../ROUTES.md). Inspect clues and observe object illustrations without treating them as additional evidence. Enable optional ambience if wanted, then use Settings for mute/reduced motion. Open Reveal symbolism (spoilers), inspect an entry’s meaning and source status, and Close/Escape back to the opener. After an ending, Explore symbolism opens the same register; the audit still explains every choice’s numeric effect.

## Unresolved sources and release review

Q1–Q5 exact text/edition/pages remain unverified; P1’s precise needle placement is explicitly provisional. S33/S34 historical comparison wording awaits verification and limits-of-comparison review. No new direct quotations, external art, fonts or recordings were added. See [sources](../SOURCES.md).

## Next three actions

1. Run Session 06 to audit classroom readiness, independent walkthroughs and remaining browser/assistive-technology checks.
2. Obtain the assigned edition and verify Q1–Q5 plus the precise needle chronology; retain placeholders until verified.
3. Verify contextual parallels before implementing S33/S34, then repeat release checks without changing proven mechanics inadvertently.

Final verification: `E2E_PREVIEW=1 npm run test:e2e` passed all **32 production-browser checks** on desktop and narrow screens. `python3 scripts/verify_scaffold.py` and `git diff --check` pass. Selected screenshot evidence is saved under `docs/screenshots/session-05/`. Session 05 acceptance gates are complete; the explicitly listed source and independent accessibility/classroom reviews remain Session 06 work.
