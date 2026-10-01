# Human Playtest Record

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
