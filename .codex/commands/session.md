# /session [session number]

## Input

Accept exactly one number, 1–6 (leading zero optional). If omitted, report the next incomplete session from `docs/STATUS.md` and ask which to run. Reject other values without modifying files. `Run session N` has the same meaning.

## Execution

1. Read root `AGENTS.md`, `.codex/claude.md`, `docs/STATUS.md`, `docs/HANDOFF_PROTOCOL.md`, the latest handoff named in status, and `.codex/sessions/session-NN.md`.
2. Read the plan’s referenced sections in `docs/PRD.md`. Inspect Git branch, HEAD (which may not exist yet), and dirty state. Preserve existing work.
3. Check dependency gates against actual files and recorded evidence. For an incomplete earlier milestone, report the missing gate and perform only work that does not depend on it; do not pretend the requested session is complete. Resolve routine environment prerequisites within user authorization.
4. State the deliverable; run the smallest relevant baseline. Set status to `in progress`. Implement the plan, making routine decisions and recording their reasons. Expected paths are guidance, not a prohibition on necessary supporting edits.
5. Run listed verification and fix failures caused by the changes. Each acceptance checkbox needs evidence; unavailable checks remain incomplete. Never use skipped tests or placeholder assertions to satisfy a gate.
6. Update status, commands, decisions, sources, and symbolism as applicable. Follow the handoff protocol and write `docs/handoffs/session-NN.md` even when incomplete. On repeat runs, append a dated attempt rather than erasing earlier evidence.
7. Report changed behavior, checks, remaining gates, and the next session. Stop after this session unless the user requested additional sessions. A session number is a deliverable, not a mandatory new chat or approval boundary.

## Completion

Only mark complete when every required acceptance gate passes. Keep Session 06/release incomplete while any quotation or required source claim remains unverified (PRD §§10, 15–16). Do not publish, deploy, or connect a remote as a side effect of `/session`.
