# Multi-session Handoff Protocol

Implements PRD §14. The [playbook](PLAYBOOK.md) defines deliverables; [STATUS.md](STATUS.md) is the short, authoritative progress record. Detailed history lives in `docs/handoffs/`.

## Start a session

1. Read `AGENTS.md`, `.codex/claude.md`, status, the latest handoff linked there, and the selected dedicated session plan.
2. Read its PRD sections. Inspect `git status --short --branch`, `git branch --show-current`, and `git log -1 --oneline`. A repository without commits has no HEAD; record that accurately.
3. Preserve unrelated changes. Check prerequisite gates using actual files and prior test evidence; stale evidence may need a targeted rerun.
4. State the session deliverable and run the smallest baseline for the affected area. Record missing prerequisites instead of fabricating results.
5. Mark the selected session `in progress` in status. Implement a coherent increment, logging decisions as needed.

## End or interrupt a session

1. Run the relevant checks and record exact commands, working directory, outcomes, and manual observations. Clearly identify anything incomplete.
2. Update status, command observations, decisions, source verification, and symbolism when affected. Check acceptance boxes only when evidence exists.
3. Copy the [handoff template](../.codex/templates/handoff.md) into `docs/handoffs/session-NN.md`. Use `session-00.md` for this planning bootstrap. On retries, append a dated attempt and preserve earlier history.
4. Record branch, verified HEAD, and dirty state. If committing, inspect and stage only intended files, use a concise imperative message, and record the resulting hash in the user-facing report. Do not invent a hash or recursively amend merely to embed a commit’s own hash in itself.
5. Set status to complete only if every exit gate passes; otherwise record `in progress` or `blocked`, the blocker, and exact next steps. Link the latest handoff and list the next three concrete actions.

Session boundaries do not require new approvals. If the user requested one session, stop after it; if they requested several, proceed through satisfied dependencies. Source access can block release without blocking mechanics work. Never overwrite another contributor’s changes or claim uncommitted files are saved in Git.
