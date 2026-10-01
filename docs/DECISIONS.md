# Decision Log

Record date, decision, reason, PRD basis, and consequences. Do not silently change requirements.

## 2026-09-30 — Planning bootstrap precedes Session 01

The current request initializes implementation scaffolding. Session 00 contains this preparation; Session 01 still owes the runnable skeleton required by PRD §§13 and 15. Six implementation milestones retain the PRD’s numbering.

## 2026-09-30 — Repository-local agent context and commands

Use `.codex/claude.md` for the requested general guide and root `AGENTS.md` as the explicit entry point. Keep detailed session plans under `.codex/sessions/`, with operational docs at the PRD’s `docs/` paths. A Python launcher passes the selected plan to installed Codex without global configuration; `/session N` is a documented message convention, not an assumed native registration.

## 2026-09-30 — Preserve the supplied PRD

Copy the original unchanged to `docs/PRD.md` as required by §13. Keep `The_Weight_PRD.md` as the supplied snapshot. Future approved requirement changes belong in the canonical docs copy and this log, with explicit differences from the snapshot.

## 2026-09-30 — Tooling selection remains in Foundation

Follow TypeScript/React/Vite/CSS/Vitest/Playwright (§12) and npm interfaces (§13). Select compatible versions when implementation begins rather than inventing installed tooling. Bootstrap uses available Python 3. Git is initialized locally; GitHub connection awaits a destination.

## 2026-09-30 — Foundation runtime and browser compatibility

Use Node 22.23.3/npm 10.9.9, pinned by `.nvmrc`; a SHA-256-verified official macOS x64 archive is installed under ignored `.tools/` on this machine. No global shell/runtime settings were changed. `package-lock.json` records the dependency graph. Vite’s [documented Node minimum](https://vite.dev/guide/) is satisfied.

The initial latest Playwright 1.63.0 rejected Chromium installation on macOS 12.7.6. Pin Playwright 1.56.1 and its bundled Chromium 141 for this environment; evaluate upgrading on a supported OS in a later session. Browser binaries remain ignored under `.tools/browsers`. Keep Node type definitions on the runtime’s major version. The application itself uses the selected React 19.3, Vite 8.3, TypeScript 6, and Vitest 5 packages.

## 2026-09-30 — One-card engine boundary

Implement typed content, pure inspection/choice updates, qualitative bands, immutable history, and same-card duplicate rejection as the minimum usable foundation (PRD §§6, 12–13). `nextCardId: null` marks the sample boundary, **not** any of the four game endings. Do not infer that the full engine, threshold resolution, save/load, replay, evidence variants, or route proofs are complete; Session 02/04 own those gates.

The report is an invented teaching record available without a prerequisite. Both choices remain available without inspection; asking for a source reduces hysteria, while endorsing the unconfirmed report raises it. Endorsing this general report names nobody and does not set the false-accusation flag. Dialogue is invented, source-labeled, and not a Miller quote. No audio or motion is introduced, so persistent mute/reduced-motion settings are deferred rather than represented by nonfunctional controls.

## 2026-09-30 — Session 02 transition and ending contracts

`src/engine/transition.ts` is the single pure action reducer. An action carries the observed revision; each accepted change advances it, including replay/restart. Invalid/stale actions return the same state with an error. Choices also carry the displayed variant ID so missing or changed evidence never silently substitutes a different action. Base choices are always available; declarative variants replace labels/effects when requirements match. The five PRD flags record completed reasoning or past actions and remain true until replay/restart restores an earlier snapshot.

A choice applies/clamps effects and records its consequence before calculating the ending. The UI stays in `consequence` phase until Continue; only then does it reveal an ending or advance. Saves retain that phase so refresh neither repeats effects nor skips the consequence. H=100 outranks R=0, including on sign/refuse turns; simultaneous thresholds include condemnation detail. Final cards explicitly declare sign/refuse; null next-card on the foundation remains a sample boundary, not a false game ending (PRD §§6–8).

## 2026-09-30 — Session 02 saves and recovery

Use separate localStorage keys `the-weight.run` and `the-weight.settings`. Save format 1 includes content version `foundation-2`, run state, revision, and chapter-start snapshots. Validation checks shapes, known references, meter/history consistency, flags, phases, and snapshots; hydration uses the validated snapshot directly without dispatching decisions. Content/schema changes require version review; no migration is claimed yet.

Do not overwrite unreadable or incompatible saves on mount. Ask the player to replace them explicitly or play without saving. Storage access/quota failures retain the live state and explain that refresh may restore an older save. No storage-wide clear is used. Settings remain outside run snapshots; replay discards later progress/checkpoints while keeping preferences. Saves are per browser origin; simultaneous tabs are not synchronized.

## 2026-09-30 — Engine fixtures are not the final narrative

`tests/fixtures/engine.ts` supplies synthetic multi-chapter cards and puzzle tokens to exercise all ending rules, evidence variants, hints, saves, and replay. These fixtures are never mounted in the app. The public sample still has one card; full narrative, puzzle UI, final balance/search proofs, and complete source verification remain Sessions 03–06. New utility controls/recovery framing are functional, with no new symbolic claim. No new dependencies or runtime versions were needed.
