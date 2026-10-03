# Repository Guidelines

## Project Structure & Module Organization

The Weight uses TypeScript, React, Vite and Canvas for a viewport-filling 8-bit browser game. Read `.codex/claude.md`, `docs/PRD.md`, and `docs/STATUS.md` first. Active `docs/PRD.md` specifies the town-judge redesign; `docs/PRD-v1-card.md` preserves the earlier design. Sessions 01–08 are historical baselines; updated Sessions 09–13 audit the current judge game. Old plans live in docs/session-history/.

- `src/engine/`: pure transitions, rules, and endings.
- `src/content/`: narrative, puzzles, quotation metadata, and shared symbolism.
- `src/components/`, `src/styles/`, `src/persistence/`: UI, CSS tokens, and versioned saves.
- `src/rendering/`, `public/assets/trail/`: Canvas and indexed pixel assets; `src/audio/`: original sound.
- `tests/{unit,routes,e2e}/`: unit, route, and browser checks.
- `docs/`, `.codex/`, `scripts/`: specifications, session plans, handoffs, and tooling.

## Build, Test, and Development Commands

Use Node 22.23.3/npm 10.9.9; see `docs/COMMANDS.md` for local setup.

- `npm ci`: install locked dependencies.
- `npm run dev`: start Vite development.
- `npm run build` / `npm run preview`: build / serve production output.
- `npm run play`: build and serve in one command.
- `npm run check`: run lint, types, unit/route tests, generated-document checks, and build.
- `npm run docs:symbolism`: regenerate symbolism documentation after registry edits.

## Coding Style & Naming Conventions

Use two-space indentation, PascalCase components, and camelCase variables/functions. ESLint checks TypeScript and React; no separate formatter is configured. Keep effects declarative, IDs stable, and transitions deterministic. Preserve save compatibility and label original dialogue, inventions, and draft quotations accurately.

## Testing Guidelines

Use Vitest `*.test.ts` files and Playwright `*.spec.ts` files. Run `npm run test -- --run`, `npm run test:routes`, and `E2E_PREVIEW=1 npm run test:e2e` after building. No percentage coverage target exists. Cover threshold precedence, duplicate actions, save recovery, reachable endings, keyboard navigation, and narrow layouts. Report human reviews separately from automation.

## Commit & Pull Request Guidelines

History mixes descriptive imperative subjects with generic messages; no enforced convention exists. Prefer `Add deterministic ending resolver`. PRs should explain behavior, reference issues or PRD sections, report checks, and include UI screenshots. Preserve unrelated changes.

## Agent Workflow & Model Selection

Route `/session N` (1–13) through `.codex/commands/session.md`; follow `docs/HANDOFF_PROTOCOL.md` and record unresolved gates. `/resume`, `/handoff`, and `/verify` use their matching `.codex/commands/` files. The current interface upgrade makes `/` and `/trail` the same 8-bit game. Keep all gameplay inside the viewport and interactions in accessible modal overlays. Read `docs/handoffs/town-judge.md`; do not resume the retired travel plan. Preserve 01–06 history. Use Astra with light reasoning for analysis and implementation; use Sol with medium reasoning for repetitive work. If unavailable, disclose the limitation rather than claiming a model switch.
