# Session 08 — Journey loop and supplies

## Attempt and scope

2026-10-02, active PRD §§5–7,10–11,14–16. Implemented one complete L1→L2 leg without restarting the repository. Branch main, observed HEAD `7cab345`; existing scaffolding and Session07 changes preserved. No commit, push, deployment or remote changes.

## Implementation

- `src/engine/trail/journey.ts`: pure transitions/forecasts, initial resources, careful/steady/forced pace, full/sparse/explicit no-food rations, capped progress/full short-day charges, H+2/day, landmark rest/repair, L2/L3 trade eligibility, threshold precedence and simultaneous causes. Revision checks reject stale actions.
- `src/components/JourneyControls.tsx`, `TrailApp.tsx`, `src/styles/trail.css`: route totals and daily costs before confirmation, qualitative standing, live supplies, severe-risk confirmation, accessible preparation/travel controls, farm trade and permanent per-landmark observations. Whole food bundles require three free slots; no partial purchase or credit.
- `src/rendering/TrailWorld.tsx`, content and three new indexed pixel assets: farm scene, country road and four-frame horse/cart. A four-second animation follows committed state. Skip, reduced motion, tab hiding and refresh cannot repeat costs. The renderer owns no survival state.
- `src/persistence/trail/journey.ts`: schema1/content `trail-journey-1`, key `the-weight:trail:journey:v1`. Read-only migration of Session07 observations if the new key is absent. Both older exploration and card saves remain untouched. Corrupt/blocked storage supports memory-only play and explicit replacement of the new key.
- New unit/browser suites cover both routes, policies, caps, stale actions, forecasts, threshold precedence, migration, animation modes, ordinary refresh, trade/rest and risk confirmation. Existing suites remain intact.

## Reproduce

Use Node22.23.3/npm10.9.9; `npm run play`, then `/trail` on the printed URL. Inspect objects, pick a route, review pace/rations and press Travel one day. Skip animation if desired. At the farm, inspect, rest, repair and buy supplies. The original complete card game remains `/`.

Steady/full public road: two travel days, day3, food20, stamina70, cart86, R62/H29. Detour: three days, day4, food18, stamina65, cart84, R65/H31. Arrival costs apply once; menus/inspection do not advance days.

## Verification

Environment: existing macOS12.7.6, local Node22.23.3/npm10.9.9, Playwright1.56.1 Chromium141.0.7390.37. PATH uses `.tools/node-v22.23.3-darwin-x64/bin`; browser cache `.tools/browsers`.

- `npm run check`: passed lint/types,94 unit tests,13 route tests, generated-document check, real content/asset validators and production build.
- `python3 scripts/verify_scaffold.py`: passed launcher/session/link checks.
- `E2E_PREVIEW=1 npm run test:e2e`: all48 passed in57.0 seconds against the final production build. Final lint, whitespace and scaffold/link checks passed.
- Screenshots: `docs/screenshots/session-08/` (travel/farm, desktop/360px). Reviewed pixel composition and readable HTML. Automated200% text checks cover both widths; no human screen-reader or physical-device review is claimed.
- No dependencies changed or installed. Clean install evidence remains Session07 evidence, not a new Session08 install claim.

## Open boundaries

No Session08 implementation blocker. Farm prose/art are original invented interim adaptations, not quotations. Full domestic evidence/story is Session10. Eight variants, pending events, bridge crossing and hardened transaction persistence are Session09. Full checkpoint recovery/balance proofs are11; current terminal screen explicitly offers a new first leg. More landmarks, final art/audio, persistent settings, source verification and human classroom evidence remain open. This first leg does not certify the full trail release.

## Next three actions

1. Run Session09 for atomic event/crossing phases, eight bounded variants and reload/duplicate-action tests.
2. Extend the journey save deliberately for pending transactions; retain read-only migration and old-key regression coverage.
3. Carry the resource witnesses, interim asset inventory and unresolved source/human checks into Sessions10–13.

## Verification correction

The added browser test initially could not resolve the exact names of selects wrapped inside labels: option text was included in their accessible names. Added explicit `Pace` and `Rations` names and reran production checks. The preceding46 browser checks passed; the final result above supersedes the failed intermediate run.

## Completion

Session08 complete; all dedicated acceptance criteria checked. Session09 is next. Final state remains uncommitted on main with the preexisting work preserved.
