# Session 02 — Deterministic Engine and Saves

## Objective and PRD references

Implement the rules underlying the complete game. Read PRD §§6–8, 11–12, and 16 (Mechanics). Full narrative balancing follows in Session 04.

## Prerequisites

Session 01’s clean install, working card, typecheck, and build gates pass. Inspect the current engine contract and tests. Run `npm run test -- --run` as the baseline.

## Work checklist

- [ ] Define typed state with R=65, H=25, stable evidence IDs, explicit flags, decision history, and no morality score. Match qualitative bands in §6.
- [ ] Implement pure transitions: validate → atomic effects → clamp → record → consequence → ending → save. Coordinate the UI so consequences remain visible before advancing.
- [ ] Enforce H=100 precedence over R=0, simultaneous condemnation detail, final-choice prerequisites, and all four ending classifications including unresolved resistance.
- [ ] Model declarative evidence variants without executing content expressions. Keep both story choices available; inspect/hints neither consume evidence nor alter meters.
- [ ] Prevent duplicate or stale submissions in engine/UI and across refresh.
- [ ] Add versioned saves, restore without replaying effects, corrupt/incompatible-save messaging, and an in-memory fallback when storage fails.
- [ ] Implement chapter snapshots/replay that discard later history, explicit restart, and persistent settings separate from run data.
- [ ] Add focused unit, route-fixture, and browser regression tests for these behaviors.

## Expected files touched

`src/engine/{types,transition,endings}.ts`, `src/persistence/`, `src/components/`, `src/App.tsx`, initial content contracts, `tests/unit/`, `tests/routes/`, `tests/e2e/`, and shared session records. Filenames may adapt to Session 01’s structure.

## Verification

Run `npm run test -- --run`, `npm run test:routes`, `npm run check`, and targeted `npm run test:e2e`. Exercise rapid repeated clicks, refresh, invalid saves, blocked storage, replay, and restart. Unit tests must cover clamp boundaries and both thresholds on the final turn. Fixture routes are not substitutes for final narrative witnesses.

## Acceptance criteria

- [ ] Boundary/precedence tests pass, including simultaneous thresholds and final-choice ordering.
- [ ] A valid action changes state exactly once; invalid/stale actions do not partially mutate it.
- [ ] Refresh restores equivalent state; corrupt or blocked storage has usable recovery.
- [ ] Hints/inspection remain free; both actions remain available.
- [ ] Chapter replay restores its starting state and discards later history; restart requires explicit action.
- [ ] Relevant automated checks pass and remaining narrative/route gaps are recorded in `docs/handoffs/session-02.md`.
