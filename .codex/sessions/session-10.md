# Session 10: Narrative, evidence and quotation audit

Status: **Pending audit; story and copy already implemented**. Updated for the current Town Judge goal.

## Objective and PRD references

Use `docs/PRD.md`, `docs/STATUS.md` and `docs/PLAYBOOK.md`. The active game has eight binary judge hearings, automatic visitors, a snowy courthouse, visible Reputation/Hysteria meters, evidence-based victory, Shame and scenario quotations. Preserve natural copy without em dashes. No travel, supplies, carts or itinerary systems belong in active gameplay.

The previous plan is preserved in `docs/session-history/session-10.md`; it is not executable scope. Historical completion does not certify the current release.

## Prerequisites

Read the current implementation and Session 09 results. Complete independent checks if a source or human review remains unavailable; carry the missing evidence forward. Preserve the working game, user edits and existing saves. Do not restart or renumber the project.

## Work checklist

- [ ] Review all eight cases, evidence connections, hints, outcomes and tutorial for grammar, natural wording and no authored em dashes.
- [ ] Check a relevant quote and thematic explanation in every hearing. Preserve supplied wording and separate original fiction from Miller quotations.
- [ ] Check speaker, act and context against an available reliable edition; record unresolved source checks honestly. Update the judge walkthrough and source notes.

## Expected files touched

src/content/judge/, src/engine/judge/game.ts, src/components/JudgeTutorial.tsx, docs/SOURCES.md, docs/WALKTHROUGH.md, tests/e2e/judge.spec.ts. Update `docs/STATUS.md`, `docs/PLAYTEST.md` when relevant and `docs/handoffs/session-10.md`. These are candidate paths, not a requirement to edit working code.

## Verification

Run `python3 scripts/verify_scaffold.py`. For code changes, run targeted tests and `npm run check`; for UI/save changes, build and run `E2E_PORT=4183 E2E_PREVIEW=1 npm run test:e2e` with the configured Node/browser environment. Documentation-only work needs link/launcher verification, not an invented app-test result. Record exact commands and distinguish historical tests, current judge checks and human observations.

## Acceptance criteria

- [ ] All eight cases read coherently and remain binary, with matching evidence and consequences.
- [ ] Every hearing has the intended quote; trigger quotes survive without duplicates.
- [ ] Quotation verification is supported by a named source, or explicitly remains an open Session 13 review item.
- [ ] The handoff records what was checked, what changed, actual results, unresolved review items and the next session. Do not claim pre-existing work was implemented again.
