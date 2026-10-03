# Session 05 — Visual Rhetoric and Symbolism

Historical card-game session: PRD references below resolve to `docs/PRD-v1-card.md`. New trail implementation starts at Session 07; preserve this plan and its recorded evidence.

## Objective and PRD references

Make the complete playable loop communicate its literary argument accessibly. Read PRD §§3, 9–11, and 16 (Narrative, symbolism, usability). Preserve Session 04’s route proofs.

## Prerequisites

Session 04’s puzzles, witnesses, and recovery gates pass. The shared symbolism registry exists. Run `npm run check` and inspect current browser flows before UI changes.

## Work checklist

- [x] Create original CSS/SVG object illustrations for poppet/needle, ledger, seal, candle, confession/name, and bars as appropriate; document provenance and interpretation.
- [x] Apply palette tokens and typography with tested foreground/background contrast. Record accessibility-driven shade changes without inventing symbolism.
- [x] Implement pressure/narrowing decoration without reducing legibility, hit targets, or critical information. Never imply supernatural proof or physical rescue at the resistance ending.
- [x] Complete journal history, non-color qualitative warnings, postgame numerical/causal audit, and spoiler-aware symbolism reveal using the shared registry.
- [x] Generate documentation from that same registry and validate every content ID. Account for all S01–S36 as implemented or explicitly deferred with reasons; add records for new meaningful choices.
- [x] Add optional ambience only after interaction, equivalent captions/text, persistent mute/reduced-motion settings, and silent confession-desk treatment. Avoid flashing or timed decisions.
- [x] Verify semantic headings, dialogs/focus restoration, live announcements, visible focus, 44px target aim, 200% zoom, and a 360px viewport.

## Expected files touched

`src/styles/`, `src/components/`, original assets under `src/assets/` or `public/`, `src/content/symbolism.ts`, persistent settings, documentation generation scripts, `tests/e2e/`, `docs/SYMBOLISM.md`, `docs/SOURCES.md` (asset provenance), and shared session records.

## Verification

Run `npm run check` and `npm run test:e2e`. Manually exercise keyboard-only play, narrow touch layout, zoom, reduced motion, mute, spoiler reveal, and focus restoration. Record tested color pairs and contrast results. Compare generated documentation with the registry and re-run route witnesses after any content changes.

## Acceptance criteria

- [x] Every meaningful symbolic design has a record; all used IDs resolve and S01–S36 statuses are explicit.
- [x] Documentation and in-game explanations derive from one maintained registry.
- [x] Information never depends on color, animation, or sound alone; settings persist.
- [x] Tested layouts retain readable text and usable controls at 360px/200% zoom.
- [x] Existing ending witnesses still pass; UI/browser checks pass.
- [x] Screenshots/manual evidence and unresolved accessibility issues are recorded in `docs/handoffs/session-05.md`.
