# Session 11 — Balance proofs and checkpoints

## Objective and PRD references

Implement v2 PRD §16 milestone 05 using active `docs/PRD.md`, §§7–10, 17. Continue this repository; preserve Sessions 01–06 and existing user work. Read `docs/ART_DIRECTION.md` and the latest handoff.

## Prerequisites

Session 10 passes the full-run narrative gate.

## Work checklist

- [ ] Implement all five ending families, distinct compromise epilogues and causal audits including simultaneous failure causes.
- [ ] Complete landmark checkpoints restoring resources, route, flags, event schedule/identity, fired IDs, pending state and history. Discard later history explicitly without silent restart.
- [ ] Build automated state search for every one of eight variants. Save at least two resistance witnesses per variant differing in route or pace, without false accusations/debug overrides.
- [ ] Demonstrate public-road and detour viability, useful rest and trade, forced pace not universally optimal, and at least one recoverable logistics mistake.
- [ ] Exercise no-food/exhaustion/broken-cart/simultaneous thresholds, unaffordable trade, full charge on short day and no-safe-crossing recovery. Log any tuned values and regenerate real witnesses/walkthroughs.

## Expected files touched

tests/routes/{search*,fixtures/*,walkthrough*}, tests/unit/, src/engine/, src/content/, src/persistence/, docs/{ROUTES,WALKTHROUGH,DECISIONS}.md. Also update `docs/STATUS.md`, `docs/COMMANDS.md`, relevant decisions and `docs/handoffs/session-11.md`. Paths are anticipated, not permission to overwrite unrelated changes.

## Verification

Run `python3 scripts/verify_scaffold.py` and targeted unit/route checks, then `npm run check`. For UI or persistence changes build and run `E2E_PREVIEW=1 npm run test:e2e`; exercise the user flow without developer overrides. Record exact commands/results, visual evidence and unavailable human/source checks. Run content/asset validators once introduced in Session 07; never claim their absence is a pass.

## Acceptance criteria

- [ ] Eight variants each have two distinct reproducible clean-resistance routes; all five endings have saved witnesses.
- [ ] Search reports no nonterminal softlocks and records state-space scope/limits, not unsubstantiated exhaustive claims.
- [ ] Rest, trading, both routes and a recoverable mistake have concrete evidence; hints do not invalidate outcomes.
- [ ] Checkpoint replay restores full variant/transaction identity and cannot duplicate rewards or bypass failure.
- [ ] Status and Session 11 handoff contain results, open gates and next three actions.
