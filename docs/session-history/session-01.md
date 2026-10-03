# Session 01 — Foundation

Historical card-game session: PRD references below resolve to `docs/PRD-v1-card.md`. New trail implementation starts at Session 07; preserve this plan and its recorded evidence.

## Objective and PRD references

Deliver a locally runnable one-card skeleton and usable development tooling. Read PRD §§1–4, 9, 11–15; use §§6 and 12 for the initial state/content boundary. Bootstrap documentation is already present; adapt it rather than replacing it.

## Prerequisites

- Read status, Session 00 handoff, and repository instructions.
- Inspect existing files and Git state; preserve the original PRD and existing plans.
- Obtain a compatible Node/npm runtime. Neither was on PATH during bootstrap. Record actual versions and pin the runtime (for example `.nvmrc` and `package.json` engines).

## Work checklist

- [x] Scaffold React, TypeScript, and Vite in this populated repository without overwriting documentation. Choose compatible current versions and commit one `package-lock.json` when committing is appropriate.
- [x] Configure lint, typecheck, Vitest, route-test selection, and Playwright; implement every PRD §13 script, including `check` in the prescribed order. Do not pass empty suites as evidence of completed features.
- [x] Add an initial typed card, exactly two descriptive choices, inspectable evidence, speaker, qualitative status, consequence, and journal entry. Keep state transitions separate from UI.
- [x] Add palette tokens from §9, basic semantic layout, visible focus, and accessible controls. Numeric meters stay hidden in standard play.
- [x] Add a meaningful initial-state/choice smoke test and a browser smoke flow; reserve full engine and route proofs for Sessions 02–04 and state that limitation.
- [x] Update README setup/controls, command prerequisites and results, runtime decisions, source placeholders, and handoff.

## Expected files touched

`package.json`, `package-lock.json`, `.nvmrc`, `index.html`, `vite.config.ts`, `tsconfig*.json`, lint configuration, `playwright.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/engine/`, `src/content/`, `src/components/`, `src/styles/`, `tests/unit/`, `tests/routes/`, `tests/e2e/`, `.gitignore`, `README.md`, and shared session records. Supporting config filenames may follow the selected tool versions.

## Verification

Use `npm install` for initial lockfile creation, then verify `npm ci`. Run `npm run typecheck`, `npm run build`, and the newly configured checks. Open `npm run dev` and `npm run preview` and exercise the card by keyboard. Install required Playwright browsers separately and record the exact command in `docs/COMMANDS.md`.

## Acceptance criteria

- [x] A clean install succeeds with documented runtime and lockfile.
- [x] Development and preview show one working card; each choice yields one consequence and a journal entry.
- [x] Typecheck and production build pass; lint and meaningful scaffold tests pass.
- [x] All required script interfaces exist; command results and incomplete later coverage are stated honestly.
- [x] No secrets/backend/external AI runtime dependencies; source and asset placeholders are labeled.
- [x] `docs/handoffs/session-01.md` records evidence and Session 02 prerequisites; status reflects actual gates.

## Completion evidence — 2026-09-30

Completed; see [Session 01 handoff](../../docs/handoffs/session-01.md). Final clean install and aggregate check passed: 20 unit tests, five foundation route tests, lint, types, and build. Four browser tests passed on the dev server and four on production preview, including keyboard and 360px touch flows. Desktop/mobile screenshots were inspected. Playwright 1.56.1 is pinned for macOS 12. Full-game mechanics and release gates remain later-session work.
