# The Weight — Repository Context

## Purpose and source of truth

Build a locally runnable, single-player educational adaptation of Arthur Miller’s *The Crucible*: John Proctor resists the court’s manufactured logic through evidence and consequential decisions. This is interpretive fiction, not historical simulation. Success means moral resistance, not guaranteed physical survival.

Read [AGENTS.md](../AGENTS.md), [PRD](../docs/PRD.md), [status](../docs/STATUS.md), the latest [handoff](../docs/handoffs/), and the selected [session plan](sessions/). Explicit user instructions take priority; preserve PRD requirements and record approved changes. This file supplies shared context; root `AGENTS.md` explicitly routes agents here rather than relying on automatic discovery of `claude.md`.

## Architecture

The stack is TypeScript, React, Vite, plain CSS tokens, Vitest, and Playwright (PRD §12). The 16-card narrative includes three interactive evidence exercises, saved ending witnesses, quotation placeholders, original illustrations, optional described ambience and a shared symbolism guide on top of the deterministic engine, saves, and replay. Session 06 audits classroom readiness and unresolved source/accessibility checks. Use Node 22.23.3/npm 10.9.9 and the npm lockfile; see `docs/COMMANDS.md` for setup, results, and save-version contracts.

- `src/engine/`: pure, deterministic transitions and ending resolution.
- `src/content/`: declarative cards, evidence, quotations, symbolism, and source metadata.
- `src/components/`, `src/styles/`: accessible UI and palette tokens.
- `src/persistence/`: versioned saves with safe recovery and in-memory fallback.
- `tests/{unit,routes,e2e}/`: state, graph traversal, and user flows.
- `.codex/`: agent context, command definitions, dedicated session plans, and handoff template.
- `docs/`: authoritative project status, command reference, handoff protocol, decisions, and literary documentation.

Session 06's technical audit passed from a disposable clean copy. Classroom release remains incomplete pending exact Q1–Q5 verification, precise needle chronology, and independent classroom/accessibility review. Resume using `docs/RELEASE_CHECKLIST.md` and `docs/handoffs/session-06.md`; do not infer source accuracy from passing automated tests.

## Invariants

Preserve PRD §§4–8: four chapters, 16 principal cards, exactly two available story choices per card, three reasoning puzzles, and four reachable endings. Evidence may change a labeled choice or its effects; never silently substitute an action or softlock progression. Hints and inspection incur no meter penalty.

Start Reputation at 65 and Hysteria at 25; clamp both to 0–100. Follow §6 resolution order. H=100 takes precedence over R=0, including on the final choice. Apply effects once. No random failure or hidden morality score. Prove at least two resistance routes and a recoverable mistake (§16).

Use original paraphrased dialogue, `basis`, `actReference`, and source notes (§10). Keep Q1–Q5 as labeled placeholders until actually verified. Track every meaningful symbolic choice against the shared S01–S36 registry (§9); generate documentation and UI from one maintained record. Preserve keyboard access, readable contrast, non-color cues, reduced motion, mute, and spoiler controls (§11).

## Workflow

Use [commands](commands/README.md), [playbook](../docs/PLAYBOOK.md), and [handoff protocol](../docs/HANDOFF_PROTOCOL.md). `/session N` means implement that session through its exit gates, not merely describe it. Complete one requested session unless the user requests more. Resume partial work without resetting files or checked evidence. Record exact checks and unresolved gates. Never mark unrun checks as passing.

No deployment or external repository creation is part of an implementation session. GitHub connection is a separate user-directed step. Preserve unrelated work and inspect diffs before staging or committing.
