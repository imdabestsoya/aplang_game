# Trail Migration Setup — 2026-10-02

## Objective and completed work

Prepare the authorized 8-bit redesign under active PRD §§16–17 without resetting the built repository. Archived the original PRD and historical status/playbook/release checklist. Imported supplied v2 verbatim. Updated contributor/context/command/handoff documentation; added Sessions 07–13, a pixel-art direction brief, active status and trail acceptance matrix. Extended the launcher and its checks for 1–13 and correct historical/active PRD selection.

## Changed files

`AGENTS.md`, `.codex/` context/commands/new plans, `scripts/{session,verify_scaffold}.py`, active and archived PRD/workflow docs, README, source/accessibility/walkthrough scope notes. Existing AGENTS.md edits were incorporated; app source, dependencies, saves and prior handoffs were preserved.

## Git state

Observed branch main, HEAD `7cab345` before setup. Origin already points to `https://github.com/imdabestsoya/aplang_game.git`. Documentation and launcher changes are uncommitted. No reset, new repository, commit, push or deployment occurred. Tracking status is not a live authentication check.

## Commands and observed results

Final results are appended below after verification. Initial scaffold run caught the missing link to this handoff while it was being created; this file resolves that incomplete scaffold dependency. Local `codex --help` and the official command reference were inspected; no live nested agent was launched.

## Working user flow

Existing card game: `npm run play`. New implementation: `Run session 7`, `/session 7`, or `python3 scripts/session.py 7`. Use `--print` to preview the prompt. The launcher preserves client model/settings. Trail graphics and mechanics are planned, not implemented by this setup.

## Decisions and source gaps

Sessions07–13 map to v2 milestones01–07 so old IDs and evidence survive. Independent migration is not blocked by old Session06 review gaps. Preserve Q1's checked excerpt and Q2–Q5 draft labels. Source/human validation stays open for Session13. Proposed paths and visual direction are design choices, not claims of completed assets. See `docs/DECISIONS.md`.

## Next three concrete actions

1. Execute `.codex/sessions/session-07.md`: renderer, one explorable landmark, schemas and real validators.
2. Verify its gates, then run08 for resources, forecasts and the first travel leg.
3. Accumulate sources, screenshots and review evidence for13 while preserving the current remote.

## Acceptance criteria still unmet

No trail implementation milestone has been executed. All v2 gameplay/assets/balance/accessibility/release gates remain open. This setup's completion means the plans and launcher are ready, not that the 8-bit game is complete.

## Setup verification — 2026-10-02

- `python3 scripts/verify_scaffold.py`: passed all 1–13 dispatch cases, invalid IDs, missing plan/CLI, stub launch and documentation links.
- Launcher prompt checks for07/13 selected active PRD;06 selected archived PRD.
- Byte comparisons: active PRD exactly matches supplied 8-bit file; archived PRD exactly matches `The_Weight_PRD.md`.
- `npm run check`: lint/types, 74 unit tests, 13 route tests, generated symbolism check, nine build-time content tests and Vite production build passed. This validates the preserved card app, not unimplemented trail features.
- `git diff --check`: passed. No new dependencies or app-source changes. Browser suite not rerun for this documentation/launcher-only change; prior browser evidence is historical.
