# The Weight — Town Judge

Active specification, 2026-10-03. The user's judge-game request supersedes the travel design preserved in [PRD-v2-trail.md](PRD-v2-trail.md). Keep the established pixel art, collision, arrow/WASD movement, touch controls, fullscreen and in-game popups. No journey, supplies or travel survival appear in the active game.

## Premise and objective
An ordinary resident becomes the local judge of an isolated town. Across eight daily hearings, neighbors use accusations to seize land, repeat rumors and settle grudges. Each hearing has exactly two rulings. Stop the hunt without condemnation or town collapse.

## Visible pressures
Reputation starts at 62; Hysteria at 30. Show labeled Reputation and Hysteria bars with exact 0–100 values in the top HUD and inside hearing popups. Update directly from state after each ruling and show signed changes in the result. This user-requested visibility supersedes the original hidden-meter requirement. Unsupported defense costs substantial reputation. Endorsing accusations raises fear and earns a permanent Shame badge. Reputation zero condemns the judge; Hysteria 100 destroys the town. Reading and moving cost nothing. Each committed ruling has a consequence popup before the next day.

## Discoverable victory
Investigate the chamber, records room and petition gallery. Connect financial interest, copied testimony and an old grievance in the Record. Supported defense costs less standing and lowers fear. Use the connected evidence to open questioning on day four, publish the record and secure public witnesses on day six, then refuse the final false confession. The town can challenge the accusation process using independently checkable records. One earlier false accusation can be publicly corrected; its Shame badge stays. A late accusation cannot be quietly erased. Five of 256 binary plans win with full investigation; none win without it. This is a designed game balance, not a historical probability.

## Presentation and quotations
All actions remain inside the pixel-game viewport. E/Enter interactions open accessible modal popups. First-time players complete a four-part tutorial, replayable in Settings. Optional original sound quickens with fear; subtle title distortion respects reduced motion. Sound begins only after explicit activation.

Use the five user-supplied Crucible quotations in small upper-corner text: Abigail on introduction, Proctor on false accusations, Proctor at first Hysteria crossing 80, Danforth on attempted neutrality, and Proctor on the false-confession ending. Preserve encountered quotes in Record. Wording is user supplied; act references remain provisional pending edition review. Cases and townspeople are invented, not Miller quotations.

## Persistence and acceptance
Use isolated `the-weight:judge:v1` saves; preserve earlier namespaces. Invalid saves require explicit replacement. Storage denial leaves the game playable in memory. Validate pure transitions, all ruling plans, quote triggers, save recovery, desktop/touch play, modal focus, fullscreen and a complete victory. Human audio comfort, screen-reader and edition review remain separate from automated checks.

## Automatic courthouse hearings
Petitioners walk from the courthouse entrance to the judge each morning; their binary hearing opens automatically after arrival. The tutorial, other open dialogs and background tabs must not cause a ruling. Adjournment permits free investigation; Resume hearing returns to the same unresolved case. Continuing a day returns the judge to the bench for the next petitioner. Restart/reload must still deliver the unresolved hearing.

The chamber contains a judicial bench, witness stand and public seating. The records room and covered petition gallery replace farm scenery. Framed windows show a snowy landscape with falling pixel snow; reduced motion makes the snow and arrivals static. The existing movement and saved evidence remain intact.

Every daily hearing also carries a required scenario quote, speaker/act attribution and a short original explanation of its relevance. Reuse the supplied quotations where themes recur: private vengeance for land/grudge cases, scrutiny of accusers for testimony/public-record cases, Danforth’s loyalty trap for neutrality and the clerk, and Proctor’s name for the final confession. Results retain the scenario quote alongside any distinct triggered quote, without duplicates.
