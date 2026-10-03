# Session 01: Repository foundation

Status: **Historical baseline; already established**. Updated for the current Town Judge goal.

## Objective and PRD references

Use `docs/PRD.md`, `docs/STATUS.md` and `docs/PLAYBOOK.md`. The active game has eight binary judge hearings, automatic visitors, a snowy courthouse, visible Reputation/Hysteria meters, evidence-based victory, Shame and scenario quotations. Preserve natural copy without em dashes. No travel, supplies, carts or itinerary systems belong in active gameplay.

The previous plan is preserved in `docs/session-history/session-01.md`; it is not executable scope. Historical completion does not certify the current release.

## Prerequisites

This is a historical baseline, not a queued rebuild. If explicitly requested, audit the current judge implementation and fix only demonstrated gaps. Preserve the working game, user edits and existing saves. Do not restart or renumber the project.

## Work checklist

- [ ] Keep the existing TypeScript, React, Vite and test setup. Do not scaffold a new project.

## Expected files touched

package.json, scripts/, AGENTS.md. Update `docs/STATUS.md`, `docs/PLAYTEST.md` when relevant and `docs/handoffs/session-01.md`. These are candidate paths, not a requirement to edit working code.

## Verification

Run `python3 scripts/verify_scaffold.py`. For code changes, run targeted tests and `npm run check`; for UI/save changes, build and run `E2E_PORT=4183 E2E_PREVIEW=1 npm run test:e2e` with the configured Node/browser environment. Documentation-only work needs link/launcher verification, not an invented app-test result. Record exact commands and distinguish historical tests, current judge checks and human observations.

## Acceptance criteria

- [ ] Build tooling remains usable without replacing dependencies or resetting Git.
- [ ] The handoff records what was checked, what changed, actual results, unresolved review items and the next session. Do not claim pre-existing work was implemented again.
