# Session 09 — Atomic encounters and persistence

**Superseded, not completed:** the user replaced travel with the town-judge game on 2026-10-03. Read `docs/PRD.md` and `docs/handoffs/town-judge.md`. The following plan is historical and refers to `docs/PRD-v2-trail.md`; do not execute it against the active judge game.

## Objective and PRD references

Implement v2 PRD §16 milestone 03 using active `docs/PRD.md`, §§7–8, 10, 15. Continue this repository; preserve Sessions 01–06 and existing user work. Read `docs/ART_DIRECTION.md` and the latest handoff.

## Prerequisites

Session 08 passes complete-leg and resource tests.

## Work checklist

- [ ] Implement stable atomic phases and persisted pending event transactions: base costs, threshold evaluation, optional response, arrival, clamp/history/save. Stop queued effects after terminal thresholds.
- [ ] Implement leg-3 crossing on both routes: delay with normal rations/H+2, assistance3 coins, or ford condition−10/stamina−5. Offer checkpoint recovery if all options are unsafe.
- [ ] Author eight named itinerary variants selecting at most three events/run, one/leg, at fixed progress thresholds; seed once, persist identity/fired IDs; no rest/jail event loops.
- [ ] Define all eight §8 templates with prerequisites, exact bounded effects, cooldowns and source/symbolism metadata. Deterministically skip events with no survivable choice; record reason.
- [ ] Version trail saves, validate all fields, preserve old card saves, handle quota/corruption/incompatibility and memory-only play. Persist before showing pending choices; block time-advancing actions until resolved.

## Expected files touched

src/engine/{events,transactions,crossing}*, src/content/{events,itineraries}*, src/persistence/, tests/{unit,e2e}/. Also update `docs/STATUS.md`, `docs/COMMANDS.md`, relevant decisions and `docs/handoffs/session-09.md`. Paths are anticipated, not permission to overwrite unrelated changes.

## Verification

Run `python3 scripts/verify_scaffold.py` and targeted unit/route checks, then `npm run check`. For UI or persistence changes build and run `E2E_PREVIEW=1 npm run test:e2e`; exercise the user flow without developer overrides. Record exact commands/results, visual evidence and unavailable human/source checks. Run content/asset validators once introduced in Session 07; never claim their absence is a pass.

## Acceptance criteria

- [ ] Refresh during each transaction phase neither double-charges nor rerolls; duplicate actions reject safely.
- [ ] Crossing/event/arrival effects occur once and follow threshold precedence H100→R0→physical failure.
- [ ] All eight variants meet schedule/effect bounds; evidence cannot be lost or accusations forced.
- [ ] Corrupt/blocked storage and incompatible legacy saves offer explicit recovery without overwriting unrelated progress.
- [ ] Status and Session 09 handoff contain results, open gates and next three actions.
