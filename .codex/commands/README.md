# Project Commands

These are repository instructions, not installed native slash commands. If a client intercepts /session, send "Run session 9".

| Request | Definition | Result |
|---|---|---|
| /session N | [session.md](session.md) | Run one current-goal plan; 09-13 are pending audits |
| /resume | [resume.md](resume.md) | Continue the in-progress or next pending judge audit |
| /handoff | [handoff.md](handoff.md) | Record progress without beginning another session |
| /verify | [verify.md](verify.md) | Check the current implementation and workflow |

## Launcher

Use `python3 scripts/session.py 9 --print` to print the prompt, or `python3 scripts/session.py 9` to open the installed Codex CLI. Do not launch another CLI inside an active agent session; execute the plan directly.

Accepts 1-13, including 01-09. Every active plan uses docs/PRD.md. Sessions 01-08 are historical baselines; explicitly running one audits the current foundation instead of rebuilding it. Old plans in docs/session-history are not executable scope. Authentication/model settings remain those of the client; no global configuration is changed.
