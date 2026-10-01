# Walkthrough — Pending Implementation

A one-card sample exists; no complete game or validated ending route exists yet. Do not use this document as evidence of solvability.

Session 04 must replace this placeholder with exact card IDs/choices, evidence interactions, puzzle submissions, and hint/replay behavior. Include all four ending witnesses, at least two clean resistance routes, and one recoverable single-choice mistake. Link saved fixtures and record the test command/result that reproduces each path (PRD §§7–8, 16).

Session 06 must replay the walkthrough from initial state without debug overrides and confirm it matches the shipped UI. Explain that “A Name Preserved” represents moral resistance rather than physical escape, and distinguish the Within the System variants by actual player actions.

## Session 01 sample (not an ending route)

1. Start the app and optionally select “Inspect the household report.” Inspection does not change meters.
2. “Ask who witnessed the alleged witchcraft” changes R/H from 65/25 to 61/19 (Accepted / Uneasy). Alternatively, “Support Parris’s call to trust the report” produces 71/33 (Accepted / Rumors spreading).
3. Read the consequence and open Journal to see exactly one decision plus any examined evidence.
4. Select “Restart sample” to clear this run. Refresh also resets because persistence is not implemented.

These four paths (two choices, with/without inspection) pass `npm run test:routes`. Browser tests cover inspection, both choices, journal, restart, and keyboard interaction. Numbers here explain tests; they are hidden in standard play.
