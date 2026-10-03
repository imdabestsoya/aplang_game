# Session 06 — Classroom Readiness and Release Audit

Historical card-game session: PRD references below resolve to `docs/PRD-v1-card.md`. New trail implementation starts at Session 07; preserve this plan and its recorded evidence.

## Objective and PRD references

Verify the complete local educational deliverable against every requirement in PRD §16. Read §§2–3, 8–11, and 13–16. Release here means classroom-ready local files; deployment is not included.

## Prerequisites

Session 05’s implementation and accessible UI gates pass. Read all source limitations and the walkthrough. Obtain the assigned edition or reliable licensed text for quotation verification. Missing source access blocks release, not remaining functional QA.

## Work checklist

- [ ] Verify Q1–Q5 exact wording, punctuation, speaker, act, and context. Record edition/page only when checked, with verification date and evidence. Implement and check every trigger and fallback from §10.
- [ ] Verify poppet chronology, scene adaptations, and historical claims. Distinguish Miller’s Salem, historical Salem, McCarthyism, and modern rumor; explain limits of parallels.
- [x] Confirm attribution, unofficial educational adaptation statement, content note/skip control, and original-versus-quoted dialogue distinctions.
- [x] Audit all mechanics gates: threshold precedence, exactly-once effects, no penalty for hints, four ending witnesses, two clean resistance routes, recoverable mistake, no softlocks, final-choice ordering.
- [ ] Run complete keyboard and narrow-touch playthroughs, 200% zoom, focus/dialog/live-region checks, reduced motion, mute, contrast, refresh, corrupt/blocked storage, replay, and restart.
- [x] Validate 16 cards, three puzzles, all symbolism statuses, causal ending audits, and spoiler behavior. Test with no runtime network services.
- [x] Perform a clean dependency install/build and preview from a fresh checkout or disposable clean copy. Record exact environment and browser versions.
- [x] Finish README setup/controls/content note, exact walkthrough, generated symbolism, source notes, and final acceptance report. Observe first-run/replay timing against §3 targets when practical; report unmeasured timing honestly.

## Expected files touched

`src/content/quotations.ts` and source metadata, focused bug fixes in UI/engine/persistence, `tests/e2e/`, route/unit regressions when needed, `README.md`, `docs/{SOURCES,WALKTHROUGH,SYMBOLISM,COMMANDS,STATUS}.md`, `docs/RELEASE_CHECKLIST.md`, and `docs/handoffs/session-06.md`.

## Verification

Run `npm ci`, `npm run check`, `npm run test:e2e`, and `npm run preview`. Record manual evidence against each PRD §16 bullet in `docs/RELEASE_CHECKLIST.md`; build success alone does not establish literary or accessibility accuracy. Reproduce walkthrough/witness routes from initial state without developer overrides.

## Acceptance criteria

- [ ] Every PRD §16 requirement has passing evidence or an explicit unmet entry; no unresolved required gate remains for release completion.
- [ ] All five quotations and required literary/historical claims are verified; no placeholder is presented as final text.
- [ ] Fresh install/build, full automated checks, and manual keyboard/touch/accessibility/storage flows pass.
- [x] README, walkthrough, source record, symbolism, and final handoff enable another session to reproduce the result.
- [x] Status explicitly declares classroom readiness only if all gates pass. Otherwise name exact blocked quotation/claim/check and finish all independent work.

## Audit — 2026-10-01

Technical audit passed: clean-copy install/build, 74 unit tests, 13 route tests and 34 production-browser tests, including complete offline keyboard and emulated narrow-touch routes. Historical context and comparison limits are implemented and sourced; Q2 has an explicit skip control. Source verification remains partial: Q1–Q5 exact passages and precise P1 needle chronology require an assigned edition or reliable licensed text. Independent accessibility/classroom review and reader timing remain unperformed; automated CSS zoom and touch emulation do not satisfy those manual checks. **Release remains incomplete.** See the [acceptance matrix](../../docs/RELEASE_CHECKLIST.md) and [handoff](../../docs/handoffs/session-06.md) for evidence and resumption steps.

## Local-play follow-up — 2026-10-01

The user authorized best-knowledge quote locations and later correction. Q1 now has a checked short excerpt; Q2–Q5 contain labeled, source-corroborated drafts, without invented edition/page metadata. P1 no longer asserts exact needle timing. `npm run play` builds and serves the game. Relative text sizing and reflection prompts are implemented. Checks passed: 74 unit, 13 route and 36 production-browser tests. Local play is ready; the human review and timing gates remain unperformed, with steps in `docs/PLAYTEST.md`. Earlier evidence above is retained as history, not the current quotation status.
