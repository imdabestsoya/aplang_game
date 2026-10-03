> **Premise update (2026-10-03):** This document contains historical card/travel checks. The active game is [Town Judge](PRD.md); use its [handoff](handoffs/town-judge.md) for current verification. Old route and supply checks are not release requirements for the judge game.

# Salem Trail Release Checklist

Active PRD §17; updated 2026-10-02. **Full trail release remains incomplete; Session07 foundation is implemented.** The [prior card checklist](RELEASE_CHECKLIST-v1-card.md) is preserved separately. Prior tests do not certify new travel systems. Session 13 records final evidence; earlier sessions fill their gates as implemented.

| Gate | Owner | Required evidence | Status |
|---|---|---|---|
| Real redesign | 07–10 | Visible original player/cart; travel, preparation and explorable landmarks determine progress, not a card reskin | Open |
| Complete content | 10 | Five legs, six landmarks, four acts, 16 mandatory encounters, three puzzles and jail | Open |
| Variant fairness | 11 | Eight variants × two clean resistance witnesses differing in route/pace; no debug overrides | Open |
| Strategies | 11 | Road and detour viable; useful rest/trade; forced pace not universally optimal; recoverable mistake | Open |
| Endings | 11 | Five ending witnesses, threshold precedence and simultaneous cause audit | Open |
| Resource edges | 08–11 | No-food, exhaustion, broken cart, unaffordable trade, caps and full short-day cost | Open |
| Atomicity | 09 | Daily/crossing/event/arrival effects once; pending-event reload neither recharges nor rerolls | Open |
| No softlocks | 09–11 | Safe event choice or deterministic skip; permanent critical evidence; checkpoint recovery | Open |
| Frozen jail | 10 | No physical depletion after surviving court arrival | Open |
| Pixel fidelity | 07,12 | Crisp original assets, manifest and screenshots; 360px/200% readable HTML | Open |
| Access | 12–13 | Complete keyboard/touch/assistive alternatives; settings, focus, contrast, mute/motion | Open |
| Simulation independence | 08–13 | Skipped animations, low frame rate and tab changes preserve outcomes | Open |
| Reader timing | 13 | Observed first run25–40min and replay10–20min; record outcomes and learning reflection | Unmeasured |
| Literary verification | 13 | All five passages and required claims verified; Q2–Q5 drafts remain explicit until checked | Open |
| Sources and symbolism | 10–13 | Invention/interpretation/canon distinguished; all S01–S52 linked and in debrief | Open |
| Delivery | 13 | Current source/asset/walkthrough/commands/handoff docs; clean npm ci/check/build/preview and browser flows | Open |

For every pass record date, environment, command or reviewer procedure and evidence path. Never use automation time as reader timing or promote placeholders to verified assets/quotations. Existing permission for provisional quote locations supports development; it does not establish source verification. No release declaration until required gates pass.

## Session07 evidence

One pixel landmark, four objects, original interim art, HTML alternatives and isolated exploration saves are implemented. Clean install/build and83 unit/13 route/42 browser checks pass. See [handoff](handoffs/session-07.md) and [assets](ASSETS.md). This satisfies the Session07 foundation gate only; all full-journey gates above remain open.

## Session08 evidence

The first road/detour leg, exact resource rules, preparation/trade, severe-risk forecasts and simulation-independent animation are implemented.94 unit and13 route checks pass. See [Session08 handoff](handoffs/session-08.md) for final browser results and screenshots. These demonstrate first-leg behavior only: full-route event atomicity, variant fairness, checkpoints, final art and classroom review remain open above.

## User-requested 8-bit-only viewport

The card interface is retired. The current game is the sole experience at `/` and `/trail`, with E-triggered observations, game menus and recovery inside modal overlays, arrow controls and native fullscreen. See [viewport handoff](handoffs/game-viewport.md). This changes presentation and browser coverage; it does not mark the remaining story, event or classroom gates complete.
