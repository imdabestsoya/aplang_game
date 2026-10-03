# Automatic courthouse hearings

## User request
Have people come to the judge automatically, update the environment for the judge premise, and add house windows with falling snow. This extends the active Town Judge PRD; travel remains retired.

## Changes
`JudgeApp` now schedules a visual petitioner arrival after the tutorial, on a new day, and when resuming an unresolved saved day. The renderer opens the hearing after the visitor reaches the bench. Open dialogs pause arrivals. Adjournment keeps the same case available through Resume hearing without repeatedly interrupting investigation. Restart resets arrival state; consequences and endings remain explicit. Missing scene assets fall back to the hearing instead of blocking progress.

`courtroom.ts` draws original pixel courtroom, archive and petition-gallery scenery, furniture, a winter landscape behind two framed windows, falling snow, and different petitioner coat colors. Reduced motion freezes snow and places the petitioner directly at the bench. `TrailWorld` retains the existing judge sprite, input/collision support and fullscreen Canvas behavior. Next-day transitions return to the bench and preserve evidence. Existing judge saves keep their namespace and schema.

Updated tutorial and docket explain automatic hearings and adjournment. Active PRD/status record the new flow.

## Verification
`npm run check`: lint, typecheck, 124 unit tests, 13 retained historical route tests, content/asset checks and production build passed. All 10 desktop/360px touch browser scenarios passed, including eight automatically delivered hearings, victory, chaos, reload, restart, adjournment, fullscreen, storage failure and reduced motion. All four targeted browser checks also passed after the final petitioner-spacing/reload refinement. Final desktop and touch screenshots were visually reviewed. Screenshots are saved under `docs/screenshots/courthouse-arrivals/`.

No deployment, commit or push performed. Human audio comfort and quotation-edition checks remain as previously documented; neither is changed by this visual/flow update.
