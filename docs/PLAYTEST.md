> **Premise update (2026-10-03):** This document contains historical card/travel checks. The active game is [Town Judge](PRD.md); use its [handoff](handoffs/town-judge.md) for current verification. Old route and supply checks are not release requirements for the judge game.

# Human Playtest Record

## Trail migration scope — 2026-10-02

For the active trail PRD §3/§17, use first-run25–40min and replay10–20min targets. The earlier card-game form below is historical; Session 13 updates its procedures for the completed journey. No human results exist yet.

Status: **not performed**. This form closes evidence gaps; blank fields are not passes. Do not enter passwords, student names or other personal information.

## Run locally

Install dependencies with `npm ci`, then run `npm run play` and open the printed URL. On this machine, first use the local Node PATH documented in README. Keep the terminal open. For a phone on a trusted local network, explicitly bind preview with `npm run preview -- --host 0.0.0.0`; use the printed network URL and stop the server afterward.

## Record observed results

| Check | Procedure | Actual result / device / date |
|---|---|---|
| First run | Start a new game without the walkthrough. Record elapsed reading/play time and interruptions. Target: 15–25 minutes. | Not measured |
| Replay | Follow a known route; record elapsed time. Target: 5–10 minutes. | Not measured |
| Learning | After the ending, explain one mechanic, object and color choice using a specific decision. Record the response in the reviewer’s own words. | Not collected |
| Screen reader | Use VoiceOver or NVDA with keyboard only. Inspect evidence, solve a puzzle, hear a consequence, open/close symbolism, reach an ending. Note missing names, repeated announcements and lost focus. | Not performed |
| Physical touch | On a phone, complete a route; open native selects, disclosures and settings. Note clipped text or unreachable controls. | Not performed |
| Zoom | Set browser-menu zoom to 200%; where available also use text-only zoom. Check story, puzzles, source links and the symbolism dialog. | Not performed |
| Audio | With speakers/headphones, explicitly enable sound, mute/unmute, hide the tab and reach the confession desk. Confirm silence where expected and comfortable volume. | Not performed |

Record issues with the card/control name, steps, expected behavior and actual behavior. Fix issues and repeat affected checks. Update `RELEASE_CHECKLIST.md` only from observed results; quote locations are reviewed separately in `SOURCES.md`.

## First-time tutorial review

Use a fresh browser profile to see the tutorial before gameplay. Ask the player to explain the first-leg objective, demonstrate arrows/WASD and E (or touch), close an observation, find the journal, and choose pace/rations before travel. Confirm they understand reading costs no time, forecasts disclose costs, and the current playable journey ends at Proctor farm. Record confusing wording and time spent on each lesson. Verify Settings → Replay tutorial preserves progress. Human observations are still to be collected.

## Automatic winter courthouse review

The current game delivers hearings automatically: complete the tutorial, watch the petitioner approach, then choose a ruling or adjourn. Check that each next day brings a new visitor without needing Resume hearing. That control is only for returning after adjournment. Inspect evidence in the records room and petition gallery before committing a ruling.

Check the courtroom windows for falling snow, then enable reduced motion and verify the snowfall is static. Automated desktop/touch results are recorded in [courthouse handoff](handoffs/courthouse-arrivals.md); human visual comfort observations can be added here.

## Live meter verification

Reputation and Hysteria are now visible as labeled 0–100 bars in the HUD and modal hearings. The result shows signed changes from the previous ruling. Automated desktop and 360px touch checks verified starting values (62/30), accusation results (71/51, +9/+21), reload persistence, a subsequent defense (-16 Reputation), and no page overflow. Both fullscreen/layout checks also passed. Lint, typecheck through production build, and content/asset validation passed. Game rules were not changed.

## Scenario quotations

All eight daily hearing popups now display a relevant passage from the user-supplied Crucible quotations, speaker/act attribution, and an original explanation of its connection to the case. Results retain scenario and decision-triggered quotations without duplicates. Lint, production build/typecheck and content/asset checks passed. Four desktop/touch browser checks passed, verifying the expected quotation through all eight hearings and retaining accusation/hysteria triggers. Act references remain provisional as previously documented.

## Copy review

Revised all eight scenarios and their outcomes, evidence descriptions, tutorial, hints, quote explanations and interface messages for grammar and natural phrasing. A source scan found no em dashes in active judge copy. The supplied quotation text is unchanged. Lint, build/typecheck and content/asset checks passed; complete eight-hearing victory playthroughs passed on desktop and 360px touch after updating the evidence-choice labels in the browser tests.
