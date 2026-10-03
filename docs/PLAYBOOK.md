# Implementation Playbook

## Current goal
Maintain and finish review of the eight-day Town Judge game in docs/PRD.md. Preserve automatic visitors, winter courthouse art, movement, fullscreen popups, visible meters, evidence-based victory, Shame, supplied scenario quotes and natural copy without em dashes. Do not restore travel survival or rebuild completed features.

## Session map
| Session | Scope | Status |
|---|---|---|
| 01 | Repository foundation | Historical baseline; no rebuild |
| 02 | Rules and saves | Historical baseline; no rebuild |
| 03 | Cases and evidence | Historical baseline; no rebuild |
| 04 | Outcomes and balance | Historical baseline; no rebuild |
| 05 | Presentation and controls | Historical baseline; no rebuild |
| 06 | Release groundwork | Historical baseline; no rebuild |
| 07 | Pixel world foundation | Historical baseline; no rebuild |
| 08 | Playable judge experience | Historical baseline; no rebuild |
| 09 | Judge integration and save audit | Pending audit |
| 10 | Narrative, evidence and quotation audit | Pending audit |
| 11 | Balance and discoverability audit | Pending audit |
| 12 | Courthouse polish and accessibility audit | Pending audit |
| 13 | Judge release and classroom review | Pending audit |

## Running a session
Use `Run session 9` or `python3 scripts/session.py 9 --print`. Read the matching .codex/sessions/session-NN.md and docs/STATUS.md. Every plan includes prerequisites, work, candidate files, verification and acceptance criteria. Sessions 09-13 audit existing functionality and implement only needed fixes. An explicitly requested Session 01-08 reviews its current foundation rather than recreating the old game.

## Dependencies and completion
Run 09, then 10, 11, 12 and 13. Missing literary or human evidence does not prevent independent engineering checks; carry unresolved reviews explicitly into release review. Only mark an audit complete after its stated criteria have evidence. No session authorizes a push, deployment or new repository.

## Historical plans
Original plans are preserved under docs/session-history. Earlier handoffs remain historical evidence. Their old PRD sections, travel mechanics and test counts are not current acceptance requirements. Follow docs/HANDOFF_PROTOCOL.md and append new attempts without rewriting history.
