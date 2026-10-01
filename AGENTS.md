# Repository Guidelines

## Project Structure & Module Organization

**The Weight** is a browser narrative puzzle game inspired by *The Crucible*. Read `.codex/claude.md`, `docs/PRD.md`, and `docs/STATUS.md`. A runnable one-card foundation exists; later sessions complete the game. `The_Weight_PRD.md` remains the supplied snapshot.

Follow the PRD’s planned TypeScript, React, and Vite structure:

- `src/engine/`: pure state transitions and ending resolution.
- `src/content/`: cards, evidence, quotations, and shared symbolism records.
- `src/components/`, `src/styles/`, `src/persistence/`: UI, CSS tokens, and versioned saves.
- `tests/unit/`, `tests/routes/`, `tests/e2e/`: mechanics, deterministic routes, and browser flows.
- `docs/`: specification, commands, status, decisions, walkthrough, and session handoffs.

Keep narrative and rules local; no backend or credentials. Record asset provenance.

## Build, Test, and Development Commands

Use Node 22.23.3/npm 10.9.9 (see `docs/COMMANDS.md` for local PATH setup):

- `npm ci`: install dependencies after a lockfile exists.
- `npm run dev`: start local development.
- `npm run build` / `npm run preview`: build and preview production output.
- `npm run lint` / `npm run typecheck`: check style and types.
- `npm run test -- --run`: run Vitest unit tests once.
- `npm run test:routes`: verify deterministic ending routes.
- `npm run test:e2e`: run Playwright browser flows.
- `npm run check`: run lint, typecheck, unit/route tests, and build.

Record runtime requirements, browser installation, and observed results in `docs/COMMANDS.md` when scaffolding.

## Coding Style & Naming Conventions

Use two-space indentation, PascalCase React components, and camelCase functions and variables. ESLint checks TypeScript and React rules; no separate formatter is configured. Keep transitions pure, effects declarative, and content IDs stable. Validate references and apply each choice’s effects exactly once.

## Testing Guidelines

Use `*.test.ts` for Vitest and `*.spec.ts` for Playwright. No percentage coverage target is specified. Cover threshold precedence, save/load, duplicate submissions, all four endings, two resistance routes, and a recoverable mistake. Verify keyboard and narrow-screen play.

## Commit & Pull Request Guidelines

Use concise imperative subjects, such as `Add deterministic ending resolver`; no established commit convention predates bootstrap. PRs should describe behavior, link relevant issues or PRD requirements, report actual checks, and include screenshots for UI changes.

## Session Handoffs & Content Guardrails

Treat `/session N` or `Run session N` as an instruction to execute `.codex/commands/session.md` with `.codex/sessions/session-NN.md`. `/handoff` and `/verify` use their matching command files. Read `docs/PLAYBOOK.md` and follow `docs/HANDOFF_PROTOCOL.md`. Preserve unrelated changes; record results and next actions. Preserve two story choices per card, deterministic solvability, labeled inventions, and verified quotation status.
