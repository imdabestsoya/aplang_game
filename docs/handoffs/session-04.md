# Session 04 — Evidence Puzzles and Balance

## Attempt

2026-10-01. Implements PRD §§6–8, 12 and 16: playable reasoning exercises and deterministic route proofs. Final verification is recorded below.

## Completed work

- P1 orders the supplied poppet timeline and separates possession from intent. P2 classifies observation, allegation and inference. P3 identifies the court’s circular handling of accusation and defense.
- Every exercise exposes its clues, labeled native select controls, three graduated hints, penalty-free retry, and a solved explanation. All cards retain two story actions; solving visibly changes the relevant response label.
- Journal records reasoning progress and explains how to revisit a missed exercise. Existing false-accusation warnings and chapter replay remain available.
- Exhaustive search visits 85,337 distinct mechanical states, branching over puzzle solutions/skips and both choices. All cards are reached; no nonterminal dead ends exist. Wrong submissions and hints are meter/flag-equivalent branches, verified by replay.
- Saved five reproducible witnesses: all four endings plus a second clean resistance route. Each includes exact card/choice/puzzle inputs and per-step meters, flags, selected variant, label and ending. Every witness replays with wrong answers and all hints.
- The recovery witness differs from the primary resistance witness at exactly one choice: initially endorsing the unconfirmed household report. It never falsely names anyone and survives without replay. Primary resistance finishes at R=4/H=0; recovery at R=14/H=0. No card-effect tuning was needed.

## Changed files

`src/components/EvidencePuzzle.tsx`, `src/content/puzzleForms.ts`, puzzles/validation, `src/App.tsx`, and styles implement the interface. `tests/routes/search.ts`, `narrative.test.ts`, `walkthrough.ts`, and `fixtures/narrative.json` implement reproducible balance evidence. `tests/e2e/puzzles.spec.ts` verifies the real keyboard flows, wrong answers, hints, refresh and replay. `docs/ROUTES.md` is generated from production content and witnesses; `docs/WALKTHROUGH.md` explains normal play. Shared status, commands, decisions, symbolism and agent guides are updated.

## Git state

Branch `main`, HEAD `ed08925`. Session 03’s uncommitted implementation and documentation were present at the start and preserved. Session 04 adds to that working tree. No commit, push, deployment or remote changes are part of this session.

## Commands and observed results

Working directory: `/Users/krishbehl/aplang_game`. Local Node 22.23.3/npm 10.9.9; Playwright 1.56.1 with the existing ignored Chromium installation.

| Command | Result |
|---|---|
| Baseline `npm run test:routes` and `npm run test:content` | 11 route + 8 content checks passed |
| `UPDATE_WITNESSES=1 npm run test:routes` | Generated witnesses and exact route tables; 13 route checks passed |
| `npm run check` | Lint/types; 58 unit + 13 route checks; generated symbolism and content validation; production build passed |
| Development browser flows | Existing 20 checks passed; targeted four complete puzzle/keyboard route checks passed after fixes |

Browser debugging corrected an ESM JSON import attribute and explicit label associations. The macOS Chromium runner does not drive native popup arrows as expected; a minimal native-select reproduction confirmed keyboard type-ahead works. Final puzzle tests use native type-ahead plus Enter to submit, without state injection or developer mode.

## Working user flow and walkthrough review

Use `npm run dev`, then follow [exact routes](../ROUTES.md). Each exercise appears before its relevant choice and repeats all required clues. Use Check reasoning; retries and hints never spend meters. Refresh retains solved flags and hints. Replay chapter 2 restores its start and makes P1 available to solve again.

The two resistance walkthroughs were followed through real browser controls via Playwright on desktop and 360px viewports; this is automated browser evidence, not a separate human playtest. Final independent classroom walkthrough review remains Session 06 work.

## Known limitations and source checks

Unfinished form selections reset on refresh; saved solutions and hint levels remain. Content version stays `narrative-3`, save format 1, because effects, IDs, rewards and saved-state structure did not change. Existing Session 03 saves remain compatible.

P1’s precise needle-placement detail remains explicitly provisional. Q1–Q5 text/edition/pages and historical parallels remain unverified; no quotation text was invented. Mechanical solvability does not establish source accuracy. Session 05’s visual/audio presentation and Session 06’s classroom release audit remain unfinished.

## Decisions and next three actions

See [decisions](../DECISIONS.md) for controls, compatibility and search assumptions.

1. Run Session 05 for accessible visual rhetoric, sound/motion preferences and the shared symbolism interface.
2. Preserve witness fixtures and regenerate them only after intentional content changes; inspect resulting route/trace differences.
3. Obtain the assigned edition to verify quotations and needle chronology before Session 06 release approval.

Final Session 04 verification: the full production-preview suite passed **24 tests**. Screenshot review caught pale puzzle-button text and clipped selected answers on narrow screens; scoped dark button text and wrapped selected-answer summaries fixed both. Lint/build and the four production puzzle-route checks passed again after those corrections. Desktop/narrow puzzle screenshots were inspected; controls, full selected-answer text, hints and explanations are readable. Scaffold verification and `git diff --check` pass. All Session 04 acceptance gates are complete; source verification and independent classroom playtesting remain later release gates. Changes remain uncommitted.
