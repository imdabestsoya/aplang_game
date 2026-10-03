# Session 07 — Pixel foundation and migration

## Objective and PRD references

Implement v2 PRD §16 milestone 01 using active `docs/PRD.md`, §§1–6, 11, 14–16. Continue this repository; preserve Sessions 01–06 and existing user work. Read `docs/ART_DIRECTION.md` and the latest handoff.

## Prerequisites

Existing card game and migration scaffold; no dependency on unresolved human/source review in Session 06.

## Work checklist

- [x] Audit reusable engine/content/UI and record migration boundaries and a separate trail save namespace; retain old saves and regression coverage.
- [x] Define Route, Encounter, Action, Puzzle, Symbol and Asset contracts (§15), stable IDs and build-time validation. Add working validate:content and validate:assets commands to check; reject missing files, dimensions/frame errors and unresolved references. Do not add no-op validators.
- [x] Implement a 320×180 Canvas 2D renderer and one L1 landmark with original John sprite, scenery, collision bounds and 3–5 inspectable objects; use the art-direction composition.
- [x] Provide arrows/WASD, E/Enter, visible touch controls and an equivalent HTML interaction list. Movement/inspection never advances simulation time. Add a discoverable trail entry while preserving the existing playable path.
- [x] Create asset manifest with dimensions, frames, creator/license, placeholder status and replacement owner. Resolve 20×12 nominal maps versus 320×180 view by camera or documented 20×11 visible area; never stretch pixels.

## Expected files touched

src/{rendering,engine,content,components,persistence}/, public/assets/, scripts/validate-*.mjs or equivalent, package.json, tests/{unit,e2e}/, docs/ART_DIRECTION.md. Also update `docs/STATUS.md`, `docs/COMMANDS.md`, relevant decisions and `docs/handoffs/session-07.md`. Paths are anticipated, not permission to overwrite unrelated changes.

## Verification

Run `python3 scripts/verify_scaffold.py` and targeted unit/route checks, then `npm run check`. For UI or persistence changes build and run `E2E_PREVIEW=1 npm run test:e2e`; exercise the user flow without developer overrides. Record exact commands/results, visual evidence and unavailable human/source checks. Run content/asset validators once introduced in Session 07; never claim their absence is a pass.

## Acceptance criteria

- [x] Clean install and production build succeed; meaningful content and asset validators detect malformed fixtures.
- [x] John is visible and one landmark is explorable with object interactions by keyboard and HTML/touch alternatives.
- [x] Pixels remain crisp at desktop and 360px; readable prose stays in HTML; capture actual screenshots.
- [x] Existing app and saved progress remain accessible; no simulation time passes during movement or inspection.
- [x] Status and Session 07 handoff contain results, open gates and next three actions.

## Completed — 2026-10-02

Clean install/build; 83 unit, 13 route and 42 production-browser checks passed. Real validators reject malformed fixtures and missing assets. Screenshot evidence and remaining journey scope are recorded in `docs/handoffs/session-07.md`. Existing card gameplay and saves remain accessible. Continue with Session 08.
