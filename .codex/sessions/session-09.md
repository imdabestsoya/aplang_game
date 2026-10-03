# Session 09: Judge integration and save audit

Status: **Pending audit; implementation already exists**. Updated for the current Town Judge goal.

## Objective and PRD references

Use `docs/PRD.md`, `docs/STATUS.md` and `docs/PLAYBOOK.md`. The active game has eight binary judge hearings, automatic visitors, a snowy courthouse, visible Reputation/Hysteria meters, evidence-based victory, Shame and scenario quotations. Preserve natural copy without em dashes. No travel, supplies, carts or itinerary systems belong in active gameplay.

The previous plan is preserved in `docs/session-history/session-09.md`; it is not executable scope. Historical completion does not certify the current release.

## Prerequisites

The current judge game is playable. Read the town-judge and courthouse-arrivals handoffs, STATUS.md and recent PLAYTEST.md entries. Preserve the working game, user edits and existing saves. Do not restart or renumber the project.

## Work checklist

- [ ] Audit automatic arrivals after tutorial, next day, reload and restart. Verify adjournment does not repeatedly reopen hearings or block evidence collection.
- [ ] Check exact meters and signed deltas in HUD/popups, duplicate rulings, threshold handling and isolated saves.
- [ ] Exercise corrupt/denied storage and missing-art fallback. Fix demonstrated defects without rebuilding features.

## Expected files touched

src/components/JudgeApp.tsx, src/rendering/TrailWorld.tsx, src/persistence/judge/, tests/unit/judge.test.ts, tests/e2e/judge.spec.ts. Update `docs/STATUS.md`, `docs/PLAYTEST.md` when relevant and `docs/handoffs/session-09.md`. These are candidate paths, not a requirement to edit working code.

## Verification

Run `python3 scripts/verify_scaffold.py`. For code changes, run targeted tests and `npm run check`; for UI/save changes, build and run `E2E_PORT=4183 E2E_PREVIEW=1 npm run test:e2e` with the configured Node/browser environment. Documentation-only work needs link/launcher verification, not an invented app-test result. Record exact commands and distinguish historical tests, current judge checks and human observations.

## Acceptance criteria

- [ ] All eight hearings arrive automatically on desktop/touch; adjournment and recovery remain usable.
- [ ] Refresh and duplicate input cannot apply a ruling twice; meters match saved engine state.
- [ ] Old save namespaces survive, and recovery requires no reset of unrelated progress.
- [ ] The handoff records what was checked, what changed, actual results, unresolved review items and the next session. Do not claim pre-existing work was implemented again.
