# Session 12: Courthouse polish and accessibility audit

Status: **Pending audit; visual features already implemented**. Updated for the current Town Judge goal.

## Objective and PRD references

Use `docs/PRD.md`, `docs/STATUS.md` and `docs/PLAYBOOK.md`. The active game has eight binary judge hearings, automatic visitors, a snowy courthouse, visible Reputation/Hysteria meters, evidence-based victory, Shame and scenario quotations. Preserve natural copy without em dashes. No travel, supplies, carts or itinerary systems belong in active gameplay.

The previous plan is preserved in `docs/session-history/session-12.md`; it is not executable scope. Historical completion does not certify the current release.

## Prerequisites

Read the current implementation and Session 11 results. Complete independent checks if a source or human review remains unavailable; carry the missing evidence forward. Preserve the working game, user edits and existing saves. Do not restart or renumber the project.

## Work checklist

- [ ] Review bench, visitor approach, witness stand, records/gallery scenes and snow through framed windows. Preserve pixel style and room movement.
- [ ] Audit visible labeled meters, keyboard/modal focus, touch targets, fullscreen, 360px layouts and 200% zoom. Inspect actual screenshots.
- [ ] Verify static snow/arrival under reduced motion, optional audio enable/mute and escalating tempo. Run available screen-reader/device checks and label unavailable human checks.

## Expected files touched

src/rendering/, src/components/, src/styles/, tests/e2e/judge.spec.ts, docs/ACCESSIBILITY.md, docs/ART_DIRECTION.md, docs/PLAYTEST.md. Update `docs/STATUS.md`, `docs/PLAYTEST.md` when relevant and `docs/handoffs/session-12.md`. These are candidate paths, not a requirement to edit working code.

## Verification

Run `python3 scripts/verify_scaffold.py`. For code changes, run targeted tests and `npm run check`; for UI/save changes, build and run `E2E_PORT=4183 E2E_PREVIEW=1 npm run test:e2e` with the configured Node/browser environment. Documentation-only work needs link/launcher verification, not an invented app-test result. Record exact commands and distinguish historical tests, current judge checks and human observations.

## Acceptance criteria

- [ ] Petitioners, windows and snow are readable; popups and controls remain inside the viewport.
- [ ] Keyboard/touch/zoom/fullscreen tests pass; numeric values and deltas are accessible without color alone.
- [ ] Reduced motion and optional sound work without changing rules; human-review limitations remain explicit.
- [ ] The handoff records what was checked, what changed, actual results, unresolved review items and the next session. Do not claim pre-existing work was implemented again.
