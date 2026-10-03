# Session 10 — Complete landmarks and story

## Objective and PRD references

Implement v2 PRD §16 milestone 04 using active `docs/PRD.md`, §§2, 5–6, 9–10, 12–15. Continue this repository; preserve Sessions 01–06 and existing user work. Read `docs/ART_DIRECTION.md` and the latest handoff.

## Prerequisites

Session 09 passes atomicity, scheduling and persistence gates.

## Work checklist

- [ ] Author all six landmarks/five legs/four acts with 3–5 clear interactions per map and exactly 16 mandatory encounters (four/act); preserve named-cast boundaries and adapted itinerary labels.
- [ ] Migrate existing puzzle reasoning and source records into landmark interactions; map v1 flags explicitly to poppetUnderstood, landExamined and courtContradiction rather than silently changing old saves.
- [ ] Keep critical evidence outside cargo; provide leave-without-inspecting warning and persistent journal summaries. Wrong answers/hints are free and fully keyboard accessible.
- [ ] Implement courtroom proceedings and labeled jail time jump; freeze physical systems at surviving court arrival. Refusal stays selectable with zero meter delta; ending classification respects earlier thresholds.
- [ ] Move the trail to the primary entry once a full playable run works; retain useful old tests/history. Adapt Q1–Q5 once-per-run triggers and replay semantics with explicit draft/verified metadata.
- [ ] Migrate symbolism meanings deliberately, especially S13/S26; extend registry to S52 with honest implemented/partial/deferred status and shared generated documentation.

## Expected files touched

src/App.tsx, src/content/{landmarks,encounters,puzzles,quotations,symbolism}*, src/components/, src/engine/endings*, tests/{unit,routes,e2e}/, docs/{SOURCES,SYMBOLISM,WALKTHROUGH}.md. Also update `docs/STATUS.md`, `docs/COMMANDS.md`, relevant decisions and `docs/handoffs/session-10.md`. Paths are anticipated, not permission to overwrite unrelated changes.

## Verification

Run `python3 scripts/verify_scaffold.py` and targeted unit/route checks, then `npm run check`. For UI or persistence changes build and run `E2E_PREVIEW=1 npm run test:e2e`; exercise the user flow without developer overrides. Record exact commands/results, visual evidence and unavailable human/source checks. Run content/asset validators once introduced in Session 07; never claim their absence is a pass.

## Acceptance criteria

- [ ] A normal run traverses all five legs/six landmarks and reaches final sign/refuse without debug state.
- [ ] All encounters and puzzles are reachable; missed optional inspection never permanently blocks critical evidence.
- [ ] Jail reading does not drain physical resources; all quotations trigger at most once per run.
- [ ] Main play visibly travels and explores, rather than reskinning the old card stack; every record has source and symbol metadata.
- [ ] Status and Session 10 handoff contain results, open gates and next three actions.
