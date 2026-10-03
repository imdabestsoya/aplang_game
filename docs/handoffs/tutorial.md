# Pre-game tutorial

2026-10-02. User requested a tutorial before launching that summarizes the game, teaches controls and explains the objective.

## Implementation

`src/components/Tutorial.tsx` provides five in-game lessons: premise/current objective, keyboard/touch movement and interaction, observation popups/journal, route/pace/ration choices, then supplies/recovery and a first-action checklist. The current goal is explicitly reaching Proctor farm; the wider story is described as future content.

First play opens the tutorial before controls are available. Next/Previous review lessons; Start game appears on the final lesson. Initial Escape cannot bypass onboarding. Start returns keyboard focus to the world. Settings → Replay tutorial supports normal Close/Escape dismissal and changes no journey progress.

`GameDialog.tsx` now optionally disables dismissal for initial onboarding while preserving accessible focus handling. Tutorial completion uses the separate `the-weight:trail:tutorial:v1` preference. It never changes journey resources or saves. Storage failures still allow completion and memory-only play; returning visits may show the tutorial again if completion could not persist. Existing saved journeys are preserved.

README, decisions and the human playtest form document onboarding. Existing browser suites identify returning players explicitly; separate first-time tests walk through the actual tutorial, enlarged-text layout, start focus, replay, refresh and blocked storage.

## Verification

`npm run check` passed94 unit tests,13 retained route tests, lint/types, validators and build. Production browser run:18 passed, including all4 new tutorial checks. The2 preexisting storage-failure checks initially expected recovery before onboarding; updated their flow to finish the tutorial and reran both successfully (2 passed in5.7s). All20 current browser cases now have passing results. Final lint, scaffold/link and whitespace checks passed. Reviewed200% text screenshots at desktop/360px in `docs/screenshots/tutorial/`. Human learner observations are not claimed. No commits or publication.

## Next steps

Continue Session09. Keep tutorial instructions aligned with future controls/objectives as later legs arrive. Use the tutorial section in `docs/PLAYTEST.md` to gather actual learner feedback.
