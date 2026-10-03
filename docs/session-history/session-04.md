# Session 04 — Evidence Puzzles and Balance

Historical card-game session: PRD references below resolve to `docs/PRD-v1-card.md`. New trail implementation starts at Session 07; preserve this plan and its recorded evidence.

## Objective and PRD references

Complete the reasoning loop and prove fair, deterministic reachability. Read PRD §§6–8, 12, and 16 (Mechanics), using §7’s exact puzzle reasoning.

## Prerequisites

Session 03’s 16-card graph and metadata validation pass; Session 02’s engine remains stable. Read current card effects and run `npm run test:routes` plus content tests as a baseline.

## Work checklist

- [x] Implement P1 ordering/provenance and “possession alone does not establish intent”; P2 observation/allegation/inference classification; P3 accusation/defense circularity.
- [x] Add three graduated hints per puzzle and feedback with penalty-free retry. Keep puzzles accessible without drag-only interactions; show all necessary clues before decisions.
- [x] Connect puzzle flags to explicitly labeled sourced responses and the informed final refusal. Preserve two available story actions even with missing evidence.
- [x] Search/enumerate the real decision graph, including puzzle outcomes and flags; detect dead ends and unreachable cards. Save reproducible card/choice/puzzle inputs as fixtures, with per-step state traces.
- [x] Tune effects until all four endings have witnesses, at least two distinct clean resistance routes survive every intermediate threshold, and a nonterminal single-choice mistake is demonstrably recoverable.
- [x] Assert witnesses start from normal initial state with no debug mutation, false accusation, or signed false confession on resistance paths. Hints must remain valid.
- [x] Explain closed resistance paths in the journal and support chapter replay. Document exact submissions and card choices in the walkthrough, including a recovery example.

## Expected files touched

`src/components/` puzzle/journal controls, `src/content/` puzzles and card effects, `src/engine/` validation if necessary, `tests/routes/`, witness fixtures under `tests/routes/fixtures/`, `tests/unit/`, `tests/e2e/`, `docs/WALKTHROUGH.md`, balance decisions, and shared session records.

## Verification

Run `npm run test:routes`, `npm run check`, and puzzle/replay browser flows via `npm run test:e2e`. Replay saved witnesses using production transitions; manually follow the walkthrough without developer mode. Check wrong answers and hints never change meters or invalidate resistance.

## Acceptance criteria

- [x] All three puzzles work with retry, hints, and keyboard controls; no missing-evidence softlocks.
- [x] Four saved ending witnesses pass against actual content.
- [x] Two distinct valid resistance routes and one recoverable mistake are proven with traces.
- [x] Graph traversal detects unreachable cards/dead ends; threshold precedence still passes.
- [x] Exact walkthrough matches tested submissions and choices.
- [x] Checks and witness locations appear in `docs/handoffs/session-04.md`.
