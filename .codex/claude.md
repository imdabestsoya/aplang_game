# The Weight: Repository Context

Read AGENTS.md, docs/PRD.md, docs/STATUS.md, docs/PLAYBOOK.md and the latest handoff before working.

## Current game
A local judge hears eight binary cases. Petitioners approach automatically. Players can adjourn to investigate the courthouse, records room and petition gallery. Keep the pixel art, arrow/WASD movement, touch alternatives, fullscreen, in-game popups and snow behind framed windows.

Reputation and Hysteria are visible numeric meters with signed ruling changes. Preserve Shame badges, public correction, the evidence-based victory and the four outcomes. Every hearing has a relevant supplied Crucible quote and explanation; special decisions also trigger quotes. Preserve quotation wording, identify provisional references and use natural authored copy without em dashes.

## Architecture
The entry point renders JudgeApp at / and /trail. Active code is src/content/judge, src/engine/judge, src/persistence/judge, JudgeApp/JudgeTutorial/JudgeMeters/QuoteCorner and the courtroom renderer. The judge save key is the-weight:judge:v1. Preserve earlier namespaces. Retained travel/card code and tests are historical references, not a second playable game.

## Sessions
All numbered plans now reference the active judge PRD. Sessions 01-08 describe historical foundations; do not repeat them as new implementation. Sessions 09-13 are pending audits of existing functionality. Start at 09 unless STATUS.md identifies an in-progress session. Read each plan and current evidence before changing code. Old plans are preserved in docs/session-history and must not be dispatched.

## Verification and handoff
Use docs/COMMANDS.md for Node/browser setup. Run focused checks, required repository checks for code changes, and production browser checks for UI/save changes. Record source and human review separately from automation. Follow docs/HANDOFF_PROTOCOL.md. No commit, push, deployment or remote change is implied by running a session.
