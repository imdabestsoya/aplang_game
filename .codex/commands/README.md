# Project Commands

These are repository-defined agent instructions, not a claim that Codex registers arbitrary slash commands from this folder. Root `AGENTS.md` dispatches messages using these names. If a client intercepts an unknown slash command, send `Run session 1` instead, or use the launcher below. Native command behavior depends on the client; see [official command documentation](https://learn.chatgpt.com/docs/developer-commands?surface=cli).

| Request | Definition | Behavior |
|---|---|---|
| `/session N` or `Run session N` | [session.md](session.md) | Implement/resume session 1–6 and write its handoff |
| `/handoff` | [handoff.md](handoff.md) | Record current progress and exact next steps |
| `/verify` | [verify.md](verify.md) | Run checks appropriate to the current milestone |

## Local launcher

From the repository root:

```sh
python3 scripts/session.py 1 --print
python3 scripts/session.py 1
```

`--print` prints the instruction without starting an agent. Without it, the launcher starts installed Codex interactively in this repository with the session instruction. It accepts `1`–`6` or `01`–`06`, validates the plan exists, and preserves the user’s model, authentication, and approval configuration. Python 3 is needed; Codex CLI must be on PATH for launch. No global prompts, plugins, or shell aliases are installed. Do not launch another Codex process from an already active agent; execute the plan directly.

For application commands, prerequisites, recovery, and observed checks, see [COMMANDS.md](../../docs/COMMANDS.md).
