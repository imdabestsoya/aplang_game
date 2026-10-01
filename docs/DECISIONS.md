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

## Session 03 — Authored content and source boundary

- Move the one-card content into test fixtures; production consumes four chapter modules and content version `narrative-3`. Incompatible saves use existing explicit recovery; no guessed migration.
- Retain two available story actions per card. Puzzle rewards change labeled variants but reading evidence never silently grants a solution. P1–P3 data and clues exist; interactive exercises belong to Session 04.
- Derive quotation triggers from history so refresh and chapter replay remain consistent. Withhold all exact text pending edition verification.
- Maintain symbolism in JSON, expose typed records through `symbolism.ts`, and generate Markdown. Build rejects stale output and invalid narrative content.
- Distinguish graph/engine card reachability from final balance proofs. Session 03 does not certify all-ending witnesses, two clean resistance paths, or recoverable mistakes.

## Session 04 — Puzzle interactions and deterministic balance

- Use native labeled select controls rather than drag-only ordering. Show all required clue records in each exercise; inspection is helpful but never a prerequisite that can block an answer or story choice.
- Retain `narrative-3` and save format 1: no card effects, IDs, reward rules, or saved-state shape changed. Only UI, clearer graduated hints, and validation were added. Unfinished form selections are local UI state; solved flags and hint levels remain persisted.
- Search 85,337 mechanically distinct states with solved and skipped puzzle branches. Wrong answers and hints are equivalent for meter/flag reachability; every witness is also replayed with wrong submissions and all hints. No effect tuning was necessary.
- Save four ending routes plus a second clean resistance route differing only at the first choice. The latter recovers from endorsing an unconfirmed report without falsely naming anyone, surviving at R=14/H=0 versus the primary R=4/H=0. Both survive every earlier threshold.
- Generate exact walkthrough tables from the saved choices and production labels; tests reject stale traces or prose tables. Source verification remains separate from solvability.

## Session 05 — Accessible visual rhetoric

- Author decorative SVG geometry directly in React. All clue meaning remains in text. Enclosure uses outer stripes and fixed-size illustrations, never narrower reading columns; the warm resistance treatment retains bars and the tragic-outcome explanation.
- Use a native labeled dialog for the shared symbolism registry. Explicit reveal warns about spoilers during play; Escape/Close restores the opener. Source basis and deferred status remain visible rather than implying every literary claim is verified.
- Ambience is optional synthesized low tonal murmuring. Each page load requires explicit enable, even when saved mute is off. Persistent mute controls the master gain; OS and saved reduced-motion preferences independently disable decorative movement. Captions never disappear when sound is off or unavailable.
- Keep engine effects, save versions and route fixtures unchanged. Focus after Continue/replay/restart moves after React commits, with ending focus going to its heading.
- Add dark-on-parchment focus and control-border tokens for contrast, with no new symbolism. Tested pairs and remaining review limits are in `docs/ACCESSIBILITY.md`.
- Zoom testing exposed a modal whose viewport-unit maximum height could put its header outside the zoomed viewport. Constrain it with fixed insets instead. Test qualitative meters in their actual display rather than matching numbers in the hidden symbolism register.

## Session 06 — Release audit boundary

- Keep the release explicitly incomplete while Q1–Q5 and precise needle chronology remain unverified. A publisher introduction is not a substitute for the requested play passages. Source access was requested; no exact words/pages were invented.
- Implement S33 using checked author/archive/Senate context, and S34 as an explicitly hypothetical comparison with limits. Keep optional external source links separate from offline gameplay.
- Add an explicit Skip optional passage control for Q2 and restore focus to its summary. Extract quotation presentation so verified records can eventually display with accurate status.
- Test a whole resistance route using real sequential keyboard navigation and a separate narrow touch route with networking disabled after load. The tests do not inject game state. Preserve all engine effects, fixtures and save contracts.
- Verify a disposable clean copy of the uncommitted working tree rather than claiming the old HEAD contains the deliverable. Use an empty dependency directory with cached lockfile packages for reproducibility.
- Distinguish automated checks and editorial/screenshot inspection from independent human, screen-reader, physical-device, audio-listening and reader-timing evidence. Those unperformed reviews remain explicit in the release checklist.
