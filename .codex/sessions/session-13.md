# Session 13: Judge release and classroom review

Status: **Pending final audit; no deployment implied**. Updated for the current Town Judge goal.

## Objective and PRD references

Use `docs/PRD.md`, `docs/STATUS.md` and `docs/PLAYBOOK.md`. The active game has eight binary judge hearings, automatic visitors, a snowy courthouse, visible Reputation/Hysteria meters, evidence-based victory, Shame and scenario quotations. Preserve natural copy without em dashes. No travel, supplies, carts or itinerary systems belong in active gameplay.

The previous plan is preserved in `docs/session-history/session-13.md`; it is not executable scope. Historical completion does not certify the current release.

## Prerequisites

Read the current implementation and Session 12 results. Complete independent checks if a source or human review remains unavailable; carry the missing evidence forward. Preserve the working game, user edits and existing saves. Do not restart or renumber the project.

## Work checklist

- [ ] Reconcile all Session 09-12 results with the active PRD and rewrite the active release checklist for the judge game.
- [ ] Run clean-install/build/check and production browser flows in a disposable copy where practical. Verify old progress is preserved and no secrets enter the build.
- [ ] Record actual human playtest, screen-reader, audio and edition evidence; list missing reviews individually.
- [ ] Finalize README, commands, status, walkthrough and handoff. Fix release defects within scope. Do not publish, push or create a new remote without an explicit request.

## Expected files touched

docs/RELEASE_CHECKLIST.md, docs/STATUS.md, docs/PLAYTEST.md, docs/SOURCES.md, docs/COMMANDS.md, README.md, focused src/ and tests/ fixes. Update `docs/STATUS.md`, `docs/PLAYTEST.md` when relevant and `docs/handoffs/session-13.md`. These are candidate paths, not a requirement to edit working code.

## Verification

Run `python3 scripts/verify_scaffold.py`. For code changes, run targeted tests and `npm run check`; for UI/save changes, build and run `E2E_PORT=4183 E2E_PREVIEW=1 npm run test:e2e` with the configured Node/browser environment. Documentation-only work needs link/launcher verification, not an invented app-test result. Record exact commands and distinguish historical tests, current judge checks and human observations.

## Acceptance criteria

- [ ] Every current PRD requirement has evidence or an explicit remaining gate; obsolete journey requirements are removed.
- [ ] Clean build and full production flows pass, including arrivals, evidence, meters, quotes, all endings and save recovery.
- [ ] Release is only marked ready when required reviews are complete; no fabricated human/source sign-off.
- [ ] The handoff records what was checked, what changed, actual results, unresolved review items and the next session. Do not claim pre-existing work was implemented again.
