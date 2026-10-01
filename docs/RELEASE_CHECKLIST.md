# Classroom Release Checklist

Updated: 2026-10-01, follow-up. **Ready for local play; classroom validation is incomplete.** Run `npm run play` after dependency installation. The user authorized best-knowledge quotation locations with later correction. That changes what may ship for local review, not what has been independently verified.

## Release gate disposition

| Original blocker | Disposition | Remaining evidence |
|---|---|---|
| Q1–Q5 exact passages | Q1 short excerpt verified; Q2–Q5 supplied as explicitly labeled, source-corroborated drafts under the user’s instruction | Assigned-edition check of Q2–Q5 remains deferred to the user; not marked passed |
| P1 exact needle placement | Resolved in gameplay by correcting the claim: no exact placement time asserted or required; Mary’s testimony preserves uncertainty | Edition-specific editorial review can still improve wording |
| Independent accessibility/classroom review | Automated evidence strengthened; **human review still open** | Screen-reader use, physical touch/audio, browser-menu zoom and reader observations require actual people/devices |
| Timing and learning outcome | Reflection prompts implemented; **measurement still open** | Real first-run/replay timing and learner explanation; do not substitute automation time |

Use [PLAYTEST.md](PLAYTEST.md) to record the outstanding observations. No human outcome, physical-device observation or waiver of those checks has been invented. These open classroom validation gates do not prevent local play. The original PRD remains unchanged.

## PRD §16 evidence matrix

“Pass” below denotes the named technical/inspection evidence, not a blanket release certification.

| Requirement | Status | Evidence / limitation |
|---|---|---|
| M1: R=0, H=100, simultaneous threshold precedence | Pass | `tests/unit/engine.test.ts`; saved route fixtures; H=100 precedence retained |
| M2: Exactly-once choice effects after load/rapid clicks | Pass | Engine revision rejection; unit save tests; persistence browser flows |
| M3: Free inspection/hints and valid resistance | Pass | Unit tests; every witness replayed with wrong answers and all hints |
| M4: Four reproducible ending routes | Pass | `tests/routes/fixtures/narrative.json`, production transition replay |
| M5: Two resistance routes and recoverable mistake | Pass | Two routes differ at the first choice; all intermediate meters/flags asserted |
| M6: No unavailable-item softlocks; reachable graph | Pass | 85,337-state search includes solved/skipped exercises; all 16 cards reached; no nonterminal dead ends |
| M7: Final sign/refuse cannot bypass thresholds | Pass | Final-choice and simultaneous-threshold unit cases |
| N1: 16 cards, three puzzles, consequences | Pass | Content validation, full route/browser execution |
| N2: Play’s named speakers; John protagonist | Pass within authored adaptation | Speaker allowlist, labeled original dialogue, editorial review; assigned-edition fidelity remains for review |
| N3: Five verified quotations OR explicitly incomplete release | Classroom validation explicitly incomplete | Q1 checked; Q2–Q5 draft excerpts user-authorized for local play; trigger/fallback tests retained |
| N4: Fact/interpretation/invention distinctions | Pass for revised claims | Per-record metadata; invented ledger/alleged motive; sourced context; P1 no longer asserts precise needle timing |
| N5: Resolved symbolism IDs and explicit S01–S36 status | Pass | Content validation; all IDs represented; S33/S34 now have sourced/hypothetical contextual implementations |
| N6: One shared registry for UI/docs | Pass | `symbolism.json` drives typed UI and generated Markdown; stale-doc check |
| N7: Causal ending audit without moralizing survival/death | Pass | Distinct ending explanations and per-choice audit; informed refusal preserves tragic fate |
| U1: Complete keyboard and narrow touch play | Automated pass; independent review open | Offline full route via Tab/type-ahead/Enter; 360px story controls tapped, native select values exercised; no debug game state |
| U2: Motion/mute/contrast/focus/non-color status | Automated pass; independent review open | 15 contrast tests; real audio gain/gesture tests; OS and saved motion preferences; zoom/dialog/ending focus; written danger cues |
| U3: Refresh and corrupt/blocked-storage fallback | Pass | Browser reload, quota/security failure, recovery/opt-out, replay and restart cases |
| U4: Fresh install and build | Pass from disposable clean copy | `npm ci --offline` installed 180 packages into empty node_modules; full check/build passed from copied working-tree files |
| U5: No credentials/runtime AI/external service | Pass | Full routes after network disabled; zero external requests; source links optional |
| U6: README setup/controls/content/links | Pass | README rewritten for current game, release status, exact commands, controls and content note |
| U7: Final reproducible handoff and limitations | Pass | [Session 06 handoff](handoffs/session-06.md), source records and this matrix |

## Prior clean-copy environment and procedure

- macOS 12.7.6 (21H1320), x86_64; Node 22.23.3, npm 10.9.9.
- Playwright 1.56.1, Chromium/headless-shell 141.0.7390.37, revision 1194.
- Clean copy: `/private/tmp/the-weight-session06-jg4xyppa`, copied tracked and nonignored working-tree files, excluding `.git`, ignored tools/caches, dependencies and build output. This is a snapshot of **uncommitted work**, not a new Git commit or a claim that HEAD contains it.
- Install used cached package tarballs, with no existing node_modules: `npm ci --offline --cache /Users/krishbehl/aplang_game/.npm-cache --no-audit --no-fund`.
- `npm run check`: lint/types, **74 unit + 13 route tests**, generated symbolism check, nine build-time content tests and production build passed.
- Browser preview is started by Playwright’s webServer using `npm run preview -- --port 4173 --strictPort`. **34 production-browser tests passed**, including both offline routes. Results are recorded in the handoff.

## Follow-up verification

Final check results are recorded in the Session 06 handoff after the follow-up run. Added coverage checks doubled default text sizing, source links and accessible control names. Relative font units preserve text enlargement. This remains automated evidence.

## Sources and timing boundaries

The earlier publisher excerpt was insufficient. A licensed school-hosted textbook selection now verifies Q1; a separate unidentified transcription corroborates Q2–Q5 and Mary’s account without establishing edition provenance. The checked postgame context links Miller’s retrospective essay, UVA’s Salem archive and the Senate Historical Office; modern rumor is framed as a hypothetical, not a claim about an actual incident. See [source evidence](SOURCES.md).

Human first-run/replay timing and independent learning/accessibility outcomes remain unmeasured. No automated duration is substituted for them. A future reviewer should follow [the exact walkthrough](WALKTHROUGH.md), record actual reader times and issues, then update this checklist only from observed results.
