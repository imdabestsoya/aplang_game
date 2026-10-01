# Walkthrough — Pending Implementation

A saved one-card sample exists; no complete story or validated full-narrative ending route exists yet. Synthetic engine routes verify ending rules without claiming final game solvability. Do not use this document as evidence of solvability.

Session 04 must replace this placeholder with exact card IDs/choices, evidence interactions, puzzle submissions, and hint/replay behavior. Include all four ending witnesses, at least two clean resistance routes, and one recoverable single-choice mistake. Link saved fixtures and record the test command/result that reproduces each path (PRD §§7–8, 16).

Session 06 must replay the walkthrough from initial state without debug overrides and confirm it matches the shipped UI. Explain that “A Name Preserved” represents moral resistance rather than physical escape, and distinguish the Within the System variants by actual player actions.

## Current sample (not an ending route)

1. Start the app and optionally select “Inspect the household report.” Inspection does not change meters.
2. “Ask who witnessed the alleged witchcraft” changes R/H from 65/25 to 61/19 (Accepted / Uneasy). Alternatively, “Support Parris’s call to trust the report” produces 71/33 (Accepted / Rumors spreading).
3. Read the consequence and open Journal to see exactly one decision plus any examined evidence.
4. Refresh to resume the same consequence without applying its effects again. Select Continue to acknowledge it and reach the sample boundary.
5. In Journal, “Replay chapter 1” restores the initial state and clears later decisions/evidence. “Restart game” also starts a fresh run. Both preserve Settings preferences.
6. If storage is unavailable, follow the visible warning; the game remains usable in memory. A corrupt/incompatible save is replaced only after selecting “Start a new game.”

These four paths (two choices, with/without inspection) pass `npm run test:routes`. Browser tests also cover refresh, rapid clicks, replay, preferences, corrupt/incompatible saves, denied storage, and write failures. Numbers here explain tests; they are hidden in standard play.
