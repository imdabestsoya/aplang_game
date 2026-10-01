# Project Status

Updated: 2026-09-30. This file is the authoritative short progress record.

## Current state

Session 02 is complete: the one-card sample now uses a deterministic engine, versioned run saves, chapter replay, recovery, and separate persistent preferences. The remaining narrative and puzzle UI are not built. Local `main` tracks `origin/main`; both were at `1480466` before Session 02 changes. Origin is `https://github.com/imdabestsoya/aplang_game.git`. This session does not push remotely. `docs/PRD.md` remains identical to the supplied snapshot.

| Session | Status | Gate / next action |
|---|---|---|
| 00 — Planning bootstrap | Complete | Agent guides, launcher, plans, protocol, records, local Git |
| 01 — Foundation | Complete | Clean install; lint/types/build; 20 unit + 5 route tests; dev/preview browser checks |
| 02 — Engine | Complete | 50 unit + 11 route tests; lint/types/build; 18 dev + 18 preview browser checks |
| 03 — Narrative | Ready / not started | Engine gates passed; author 16 cards and shared source/symbolism records |
| 04 — Evidence and balance | Not started | Requires 03 |
| 05 — Visual rhetoric | Not started | Requires 04 |
| 06 — Classroom readiness | Not started | Requires 05 and verified sources for release |

Latest handoff: [session-02.md](handoffs/session-02.md).

## Known prerequisites and limitations

- Node 22.23.3/npm 10.9.9 are available in ignored `.tools/`; see README for PATH setup. Playwright 1.56.1/Chromium 141 are pinned for this macOS 12 environment. `gh` remains unavailable.
- Engine and persistence checks pass. Full story, puzzle UI, final narrative route proofs, generated symbolism, and release QA remain pending.
- Saves use format 1/content version `foundation-2`; they are local to each browser origin. Unsupported saves require explicit replacement or play without saving.
- Q1–Q5, poppet scene details, and historical parallels remain unverified. The proposed brainstorming PDF and assigned edition are not in this workspace.
- GitHub origin is configured; recorded `origin/main` points to the Foundation commit. Session 02 makes no remote changes.

## Next three actions

1. Run `/session 3` or `python3 scripts/session.py 3` to author the complete narrative.
2. Populate source metadata, quotation slots, and the shared symbolism registry; adapt chapter/evidence views and review save compatibility.
3. Validate counts/references/reachability, run checks, and write `docs/handoffs/session-03.md`.
