# Session 02 — Deterministic Engine and Saves

## Attempt

- Date: 2026-09-30
- Status: complete
- Objective: implement PRD §§6–8, 11–12, and 16 mechanics contracts, persistent run/settings data, replay, and regression coverage.

## Completed work

Added a pure revision-checked transition engine with atomic/clamped effects, immutable journal entries, explicitly labeled evidence variants, free inspection/hints/puzzle submissions, and chapter snapshots. Choices hold on their consequence until Continue. All four ending rules are implemented, including H=100 precedence, simultaneous condemnation detail, final sign/refuse checks, and distinct unresolved-resistance/confession explanations. The five reasoning/action flags cannot be erased by subsequent choices; replay/restart restores earlier state.

Added versioned run serialization, structural/reference/history/flag validation, direct snapshot hydration without redispatching choices, explicit corrupt/incompatible-save recovery, and in-memory fallback for storage denial/quota errors. Separate settings survive restart and replay. React event handling updates its current-state reference synchronously before saving, so rapid events cannot consume the same revision twice; storage writes do not occur in render or state-updater callbacks.

The public sample now supports refresh/resume, explicit Continue, journal replay, restart, and persistent mute/reduced-motion preferences. No audio/animation was introduced. The rest of the narrative remains unimplemented; synthetic engine fixtures are test-only.

## Changed files

- Engine: `src/engine/types.ts`, new `content.ts`, `transition.ts`, `endings.ts`; `foundation.ts` now retains qualitative label helpers only.
- Persistence: new `src/persistence/{storage,validation}.ts` and `useGame.ts`.
- Integration: `src/content/foundation.ts`, `src/App.tsx`, `src/styles/main.css`.
- Tests: updated Foundation unit/route/browser suites; new `tests/fixtures/engine.ts`, `tests/unit/{engine,persistence}.test.ts`, `tests/routes/engine.test.ts`, and `tests/e2e/persistence.spec.ts`.
- Documentation: README, status, command reference, decisions, source/symbolism/walkthrough notes, GitHub state correction, agent context, Session 02 checklist, and this handoff.
- No dependency, lockfile, runtime, PRD, or unrelated user-file changes. The worktree was clean at session start.

## Git state

- Branch: `main`, tracking `origin/main`.
- HEAD and recorded origin/main at start/verification: `1480466`.
- Origin: `https://github.com/imdabestsoya/aplang_game.git` (corrects stale bootstrap documentation).
- Dirty state at verification: only this session’s engine, persistence, UI, tests, and documentation changes; no pre-existing user edits.
- The completed increment is prepared for a local commit; the resulting hash is reported in the session response/Git log, not embedded recursively in this handoff. No remote push or deployment is part of this session.

## Commands and observed results

Repository root; Node 22.23.3/npm 10.9.9 via README PATH export, browser cache via `PLAYWRIGHT_BROWSERS_PATH="$PWD/.tools/browsers"`.

| Command / check | Observed result |
|---|---|
| `npm run test -- --run` (baseline) | 20 Foundation tests passed |
| `npm run check` (final implementation) | Passed: lint, strict types, 50 unit tests, 11 route tests, production build |
| `npm run test:e2e` | 18 tests passed on dev server, desktop and 360px touch projects |
| `E2E_PREVIEW=1 npm run test:e2e` | 18 tests passed against final production build after save-validation/inspection refinements |
| `git diff --check` | Passed |
| `python3 scripts/verify_scaffold.py` | Passed: command dispatch, plan sections, and documentation links |
| Source/new-file whitespace scan | Passed |
| PRD byte comparison | Canonical copy and original remain identical |

Unit tests cover thresholds/clamping including both final actions, refusal prerequisites, duplicate/stale/invalid actions, evidence variants without silent substitution, free hints/answers/inspection, replay, save phases, corrupt/incompatible data, inconsistent flags/history, and unavailable storage. Eleven route tests comprise five sample contracts plus six synthetic multi-chapter witnesses (including both Within the System variants). Synthetic routes save/load after each decision; hints do not disqualify resistance.

Browser tests exercise real keyboard navigation, both choices, rapid repeated clicks, equivalent saved state after refresh, consequence acknowledgement, evidence/journal, replay, restart, preference persistence, unrelated storage preservation, corrupt/incompatible save replacement, declining replacement, denied storage, and quota failure. No application checks failed. Nonfatal terminal color-environment warnings remain tooling output only.

No dependency reinstall was needed: package manifests/lockfile are unchanged and the Foundation clean-install evidence still applies. Full assistive-technology/contrast/zoom and story-balance release audits are not claimed.

## Working user flow

1. Run `npm run dev` with the documented Node PATH. Inspect the report and select either action.
2. Refresh: the same consequence, meters, history, and examined evidence return without applying deltas again.
3. Continue acknowledges the consequence and reaches the explicit sample boundary; it is not one of the four story endings.
4. Open Journal and select Replay chapter 1 to restore its starting state. Restart game creates a fresh run. Both preserve Settings preferences.
5. For bad saves, choose explicit replacement or keep the old save while playing without persistence. Storage errors leave live gameplay usable.

## Known issues and reproduction

- Only one authored card is shipped. Multi-chapter and terminal behavior are exercised through test fixtures, not final story witnesses. Adding the narrative will also require updating the current chapter/location presentation and multi-evidence/puzzle UI.
- Save compatibility is explicit: schema format 1 and content version `foundation-2`; changing state/content contracts requires a version decision. No migrations are implemented.
- Storage is local to each browser origin; changing port/host changes the save location. Simultaneous tabs are not synchronized. A failed write may leave an older save on disk; the warning states the refresh risk.
- Final graph enumeration, two distinct full-narrative resistance routes, recoverable story mistake, authored puzzles/hints, generated symbolism registry/view, and complete release accessibility checks remain later sessions.
- Playwright remains pinned for macOS 12 as documented; no toolchain change was made.

## Unresolved source checks

Q1–Q5 remain unverified and absent from UI. Poppet chronology and historical parallels remain unverified. No new direct quotes or claims were added. Generic ending text is original interpretive game prose; synthetic fixture text is test-only. See `docs/SOURCES.md`.

## Decisions and rationale

See `docs/DECISIONS.md` for action revisions, consequence/ending phases, monotonic flags, explicit variant IDs, save format/content versions, recovery, separate settings, and fixture scope. `docs/SYMBOLISM.md` notes S10/S11/S13/S14/S36 progress without adding unsupported symbolic claims.

## Next three concrete actions

1. Run Session 03’s baseline, then expand `src/content/` to four chapters and 16 cards with source/basis metadata and stable IDs.
2. Wire complete chapter/evidence presentation, Q1–Q5 placeholder records/triggers, and the shared symbolism registry/document generator; review the content/save version.
3. Add count/reference/reachability validation, run the checks, and record remaining source/balance work in `docs/handoffs/session-03.md`.

## Acceptance criteria still unmet

None for Session 02. Final narrative, puzzle interface, authentic ending witness/balance proof, source verification, and release QA remain Sessions 03–06. Do not label the game complete or classroom-ready.
