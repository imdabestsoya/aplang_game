# Session 00 — Planning Bootstrap

## Attempt

- Date: 2026-09-30
- Status: complete (planning only; Session 01 has not begun)
- Objective: prepare the requested repository-local Codex context, session commands, handoffs, and six implementation plans using PRD §§12–16.

## Completed work

Initialized local Git on `main`. Preserved the supplied PRD and copied it unchanged to `docs/PRD.md`. Added the general `.codex/claude.md` guide, explicit command routing through AGENTS, a portable session launcher, dedicated plans for all six PRD milestones, handoff protocol/template, and project records. Application work remains assigned to Session 01.

## Changed files

- Updated `AGENTS.md` with current structure and command dispatch; preserved its contributor-guide purpose.
- Added `.codex/claude.md`, `.codex/commands/{README,session,handoff,verify}.md`, `.codex/templates/handoff.md`, and `.codex/sessions/session-01.md` through `session-06.md`.
- Added `scripts/session.py` and `scripts/verify_scaffold.py` for launching/validating workflow scaffolding.
- Added `README.md`, `.gitignore`, and `docs/{PRD,STATUS,COMMANDS,PLAYBOOK,HANDOFF_PROTOCOL,DECISIONS,SOURCES,SYMBOLISM,WALKTHROUGH,GITHUB}.md` plus this handoff.
- Left the pre-existing `The_Weight_PRD.md` unchanged.

## Git state

- Branch: `main`.
- HEAD at verification: none; no commits yet.
- Dirty state: bootstrap files are untracked; nothing staged.
- Commit created: none. No remote configured and no push attempted.

## Commands and observed results

All commands ran from repository root unless stated otherwise.

| Command/check | Observed result |
|---|---|
| `git init -b main` | First sandbox attempt denied filesystem access; approved elevated retry initialized local repository |
| `codex --help` | Exit 0; confirms prompt argument and `-C`; emitted a nonfatal PATH-alias warning |
| `command -v codex`, `command -v python3` | Available on bootstrap PATH |
| `command -v node`, `command -v gh` | Not available on bootstrap PATH |
| Launcher subprocess checks (Python inline) | Six session numbers and zero-padded forms passed; invalid inputs rejected; external working directory resolved correctly |
| Temporary Codex stub | Received repository root and selected plan prompt; missing CLI produced actionable error; no live agent launched |
| PRD byte comparison (Python inline) | Supplied file and docs copy identical |
| Session-section/link/whitespace scan (Python inline) | Required sections present; no whitespace findings; initially only this not-yet-written handoff link was pending |
| `python3 scripts/verify_scaffold.py` | Exit 0; session inputs, prompt selection, dispatch, missing CLI, plan sections, and all documentation links passed |
| Final PRD parity/new-file whitespace check (Python inline) | Exit 0; PRD byte-identical and scaffold files free of trailing whitespace |
| `git diff --check` | Exit 0; tracked diff empty, so new-file whitespace was checked separately |
| `git status --short --branch`, `git remote -v` | No commits on main; only intended untracked project paths; no remote |
| npm/application/browser checks | Not run: app/package/runtime not scaffolded |

## Working user flow

Send `Run session 1` (or `/session 1` where accepted), or run `python3 scripts/session.py 1`. Preview the exact prompt with `--print`. The live launcher requires an authenticated Codex CLI; only dispatch was tested. No playable application exists.

## Known issues and reproduction

Native clients may intercept unknown slash commands: use `Run session 1` or the launcher. Node/npm and `gh` are absent from the current PATH. A shell running outside the IDE may also need Codex added to PATH; the printed prompt works in the IDE without that setup.

## Unresolved source checks

Q1–Q5 exact text/context, poppet scene chronology, and historical parallels remain unverified. The brainstorming PDF and assigned edition are unavailable locally; see `docs/SOURCES.md`.

## Decisions and rationale

See `docs/DECISIONS.md`: separate bootstrap from runnable Foundation; keep six PRD session numbers; use explicit repository-local command routing; preserve the original PRD snapshot; choose runtime versions in Session 01.

## Next three concrete actions

1. Establish GitHub URL or owner/name/visibility and follow `docs/GITHUB.md`.
2. Execute `.codex/sessions/session-01.md`, starting with Node/npm setup.
3. Verify Foundation acceptance gates and write `docs/handoffs/session-01.md` before Engine work.

## Acceptance criteria still unmet

All implementation and release gates from PRD §16 remain unmet. Session 00’s planning completion does not imply any runnable skeleton, mechanics, source verification, or release readiness.
