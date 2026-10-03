# Session 08 — Journey loop and supplies

## Objective and PRD references

Implement v2 PRD §16 milestone 02 using active `docs/PRD.md`, §§5–7, 11, 14–15. Continue this repository; preserve Sessions 01–06 and existing user work. Read `docs/ART_DIRECTION.md` and the latest handoff.

## Prerequisites

Session 07 passes renderer/schema/interaction gates.

## Work checklist

- [x] Implement route selection forecasts: 4-unit road with R−3 arrival, 6-unit detour, shared destination; introduce travel phase and exact resource initial values/caps.
- [x] Implement careful/steady/forced pace, full/sparse/no-food policies, short-day full charges and H+2/day. Block unaffordable selected policies; offer explicit alternatives.
- [x] Implement landmark rest/repair and L2/L3 trade with exact prices/caps, no selling, no credit and no daily cost for repair or shopping.
- [x] Animate the horse/cart for 3–5 seconds after a committed travel action; skipping/reduced motion/tab changes consume the same snapshot, never advance state twice.
- [x] Expose supplies/day/progress and qualitative social status in HTML HUD; forecast direct costs and confirm severe selected risks; make one complete L1→L2 leg playable.

## Expected files touched

src/engine/travel*, src/content/routes*, src/rendering/, src/components/{Travel*,Supplies*,Route*}, tests/{unit,e2e}/. Also update `docs/STATUS.md`, `docs/COMMANDS.md`, relevant decisions and `docs/handoffs/session-08.md`. Paths are anticipated, not permission to overwrite unrelated changes.

## Verification

Run `python3 scripts/verify_scaffold.py` and targeted unit/route checks, then `npm run check`. For UI or persistence changes build and run `E2E_PREVIEW=1 npm run test:e2e`; exercise the user flow without developer overrides. Record exact commands/results, visual evidence and unavailable human/source checks. Run content/asset validators once introduced in Session 07; never claim their absence is a pass.

## Acceptance criteria

- [x] One complete road or detour reaches L2; departure and arrival each apply exactly once.
- [x] Pace, ration, rest, repair, trade and caps match §7 including no-food and short final day.
- [x] Skip, reduced motion and frame-rate variation produce identical simulation results.
- [x] Projected direct costs are readable before confirmation; no reading/menu action consumes days.
- [x] Status and Session 08 handoff contain results, open gates and next three actions.

## Completion evidence

2026-10-02: complete. See `docs/handoffs/session-08.md` for94 unit/13 route/48 browser passes, screenshots, save migration and remaining later-session boundaries.
