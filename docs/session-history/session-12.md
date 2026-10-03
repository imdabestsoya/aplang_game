# Session 12 — Pixel art, sound and accessibility

## Objective and PRD references

Implement v2 PRD §16 milestone 06 using active `docs/PRD.md`, §§11–14, 17. Continue this repository; preserve Sessions 01–06 and existing user work. Read `docs/ART_DIRECTION.md` and the latest handoff.

## Prerequisites

Session 11 passes balance and checkpoint gates; Session 07 visual direction already established.

## Work checklist

- [ ] Complete original John directional sprites, nine character sprite/portrait sets, horse/cart strip, road/woods/field tiles, six landmarks, jail and every listed prop/resource icon.
- [ ] Use 16px tiles, 16×24/32 characters, 48×48 portraits, cart≤64×40, four-frame walks/two-frame idles. Validate dimensions, palette, frames and provenance; eliminate release-blocking placeholders.
- [ ] Polish parallax travel, increasing enclosure/sky pressure, warm but enclosed resistance ending and consistent pixel borders. Keep HTML prose readable and avoid copying Oregon Trail composition or assets.
- [ ] Add original sparse chiptune/hoof-wheel cues, explicit enable/mute and near-silence at desk. Provide text equivalents; reduced motion uses static snapshots.
- [ ] Implement large text, instant dialogue and optional numeric social meters with no ending penalty. Audit focus, dialog behavior, keyboard/HTML alternatives, 44px targets, contrast and 360px/200% layouts.
- [ ] Complete S01–S52 implementation references, generated register, spoiler gating and debrief; capture screenshots and review asset consistency.

## Expected files touched

public/assets/, src/rendering/, src/audio/, src/styles/, src/components/, src/content/{assets,symbolism}*, tests/{unit,e2e}/, docs/{ART_DIRECTION,ACCESSIBILITY,SYMBOLISM,SOURCES}.md. Also update `docs/STATUS.md`, `docs/COMMANDS.md`, relevant decisions and `docs/handoffs/session-12.md`. Paths are anticipated, not permission to overwrite unrelated changes.

## Verification

Run `python3 scripts/verify_scaffold.py` and targeted unit/route checks, then `npm run check`. For UI or persistence changes build and run `E2E_PREVIEW=1 npm run test:e2e`; exercise the user flow without developer overrides. Record exact commands/results, visual evidence and unavailable human/source checks. Run content/asset validators once introduced in Session 07; never claim their absence is a pass.

## Acceptance criteria

- [ ] All required art is original, coherent and manifest-validated; no undisclosed placeholder remains.
- [ ] Animation/audio are optional and cannot change state; no canvas-only essential interactions.
- [ ] Every S01–S52 entry resolves to implementation and appears in the shared debrief.
- [ ] Automated full-route keyboard/touch, zoom/settings/focus/contrast checks pass; unperformed human reviews remain explicitly open.
- [ ] Status and Session 12 handoff contain results, open gates and next three actions.
