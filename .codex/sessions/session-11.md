# Session 11: Balance and discoverability audit

Status: **Pending audit; winning paths already tested**. Updated for the current Town Judge goal.

## Objective and PRD references

Use `docs/PRD.md`, `docs/STATUS.md` and `docs/PLAYBOOK.md`. The active game has eight binary judge hearings, automatic visitors, a snowy courthouse, visible Reputation/Hysteria meters, evidence-based victory, Shame and scenario quotations. Preserve natural copy without em dashes. No travel, supplies, carts or itinerary systems belong in active gameplay.

The previous plan is preserved in `docs/session-history/session-11.md`; it is not executable scope. Historical completion does not certify the current release.

## Prerequisites

Read the current implementation and Session 10 results. Complete independent checks if a source or human review remains unavailable; carry the missing evidence forward. Preserve the working game, user edits and existing saves. Do not restart or renumber the project.

## Work checklist

- [ ] Reproduce the 256 binary-plan enumeration with and without prepared evidence. Check four outcomes and one early accusation corrected without erasing Shame.
- [ ] Test late accusations, neutrality, incomplete records and thresholds. Record the scope of search rather than claiming every possible exploration state was exhausted.
- [ ] Evaluate whether the tutorial and clues explain the public-record victory. Use actual unfamiliar-player observations where available; do not invent timings or retune merely to meet retired travel targets.

## Expected files touched

src/engine/judge/, tests/unit/judge.test.ts, tests/e2e/judge.spec.ts, docs/WALKTHROUGH.md, docs/PLAYTEST.md. Update `docs/STATUS.md`, `docs/PLAYTEST.md` when relevant and `docs/handoffs/session-11.md`. These are candidate paths, not a requirement to edit working code.

## Verification

Run `python3 scripts/verify_scaffold.py`. For code changes, run targeted tests and `npm run check`; for UI/save changes, build and run `E2E_PORT=4183 E2E_PREVIEW=1 npm run test:e2e` with the configured Node/browser environment. Documentation-only work needs link/launcher verification, not an invented app-test result. Record exact commands and distinguish historical tests, current judge checks and human observations.

## Acceptance criteria

- [ ] Current baseline is five winning prepared plans and zero unprepared plans; any authorized tuning has new evidence.
- [ ] All four outcomes have reproducible paths; no decision bypass or irreversible evidence lock is found in the tested scope.
- [ ] Win clues and one-mistake recovery are documented; missing human observations are clearly identified.
- [ ] The handoff records what was checked, what changed, actual results, unresolved review items and the next session. Do not claim pre-existing work was implemented again.
