# Session 01 — Foundation

## Attempt

- Date: 2026-09-30
- Status: complete
- Objective: runnable one-card React/TypeScript/Vite foundation, tooling, tests, and documented continuation. PRD §§1–4, 6, 9, 11–15.

## Completed work

Implemented the inspect → decide → consequence → journal loop with two actions, a source-labeled invented scene, hidden numeric meters, readable qualitative standing, and explicit sample restart. Pure typed state operations live separately from UI/content. Both actions work without inspection; repeated submissions cannot create a second decision. Original CSS uses PRD palette tokens and responsive semantic controls. No audio, animation, secrets, or runtime services are present.

Installed an official SHA-256-verified Node 22.23.3 archive locally under ignored `.tools/` (npm 10.9.9); no global installation or profile edits. Added every required npm command, strict TypeScript, ESLint, Vitest, Playwright, and one npm lockfile. All Foundation gates passed.

## Changed files

- Added `package.json`, `package-lock.json`, `.nvmrc`, `index.html`, `tsconfig.json`, Vite/Vitest/Playwright configs, and `eslint.config.js`.
- Added `src/main.tsx`, `src/App.tsx`, `src/engine/{types,foundation}.ts`, `src/content/foundation.ts`, `src/components/Status.tsx`, and `src/styles/{main,tokens}.css`.
- Added `tests/unit/foundation.test.ts`, `tests/routes/foundation.test.ts`, and `tests/e2e/foundation.spec.ts`.
- Updated `.gitignore`, README, AGENTS, `.codex/claude.md`, Session 01 checklist, status, commands, decisions, sources, symbolism, and walkthrough notes.
- Preserved the existing bootstrap workflow, original PRD, and canonical PRD without requirement changes. Local runtime, npm cache, browser binaries, build output, and screenshots are ignored.

## Git state

- Branch: `main`.
- HEAD at verification: none; repository has no commits.
- Dirty state: existing bootstrap files plus new implementation files remain untracked; nothing staged. No unrelated tracked changes existed.
- Commit created: none. No remote, push, or deployment.

## Commands and observed results

Working directory: repository root. Runtime commands used the local PATH and cache exports in `docs/COMMANDS.md`.

| Command/check | Observed result |
|---|---|
| `python3 scripts/verify_scaffold.py` (baseline) | Passed |
| Official Node index/archive/checksum download | Sandbox DNS failed initially; approved network retry succeeded; SHA-256 verified before extraction |
| `node --version` / runtime index npm version | v22.23.3 / 10.9.9 |
| Initial npm installs | Passed; package-lock created |
| Initial latest Playwright browser install | Failed: Chromium unsupported on macOS 12 by Playwright 1.63.0 |
| `npm install -D --save-exact @playwright/test@1.56.1 @types/node@22` | Passed; compatible browser pin and runtime-matching types; audit reported zero vulnerabilities at installation |
| `npx playwright install chromium` with local browser cache | Passed: Chromium/headless shell 141.0.7390.37; frozen FFmpeg warning for macOS 12 |
| Final `npm ci` | Passed; 180 packages installed from lockfile |
| `npm run check` | Passed: ESLint, strict types, 20 unit tests, five one-card route tests, production build |
| `npm run test:e2e` first sandbox run | Server bind denied with listen EPERM; required approved local-server/browser execution |
| `npm run test:e2e` approved retry | Four tests passed against dev server: desktop + 360px touch |
| `E2E_PREVIEW=1 npm run test:e2e` | Four tests passed against production preview |
| `npm run preview -- --port 4174 --strictPort` plus Chromium screenshot script | Preview rendered; desktop/mobile screenshots captured and visually inspected |
| Text contrast calculation | Six actual foreground/background combinations exceed 4.5:1; values in symbolism notes |
| Final `python3 scripts/verify_scaffold.py` | Passed: launcher, plans, and documentation links |
| Final PRD parity / new-file whitespace scan | Passed; supplied and canonical PRD remain byte-identical |
| `git diff --check` / `git check-ignore` | Clean tracked diff; runtime, cache, build, and dependencies confirmed ignored |

One browser-install attempt overlapped clean installation and found the executable temporarily absent; rerunning after `npm ci` resolved it. This was tooling sequencing, not an application failure.

## Working user flow

Select Node using `.nvmrc` or export the local runtime PATH documented in README, run `npm ci`, then `npm run dev`. Open the printed local URL. Inspect the household report, choose either action, read the consequence and updated qualitative standing, open the journal, and restart the sample. Tab/Enter controls work; both choices were exercised through browser tests. Refresh resets this in-memory foundation.

Visual review: desktop has readable story/journal columns; 360px uses a single column with expanded evidence wrapping cleanly. Local inspection artifacts: `.tools/screenshots/foundation-desktop.png` and `foundation-mobile.png` (ignored; not required checkout artifacts).

## Known issues and reproduction

- Refresh after deciding resets the sample; saving is deliberately Session 02 work.
- `nextCardId: null` ends the sample only; threshold/final ending resolution is not implemented. Do not treat this as a full engine or ending proof.
- Remaining 15 cards, three puzzles, hints, persistent settings, replay, generated symbolism UI/docs, and final source verification are not implemented.
- Latest Playwright’s browser requires a newer OS; keep the compatibility pin on this machine. Full browser/assistive-technology/200% zoom audits remain Sessions 05–06.
- Fresh shells may not have Node on PATH. `.tools` is local only; other machines need their own Node installation and browser setup.

## Unresolved source checks

Q1–Q5 remain unverified and unrendered; no direct quotation was invented. Poppet chronology and historical parallels remain unverified. The foundation dialogue and household report are explicitly invented; Act I is only their thematic basis. See `docs/SOURCES.md`.

## Decisions and rationale

See `docs/DECISIONS.md`: isolated runtime, compatible Playwright pin, one-card engine boundary, exact deltas, explicit false-accusation semantics, and no placeholder settings controls. See `docs/SYMBOLISM.md` for implemented palette/layout choices and deferred register work.

## Next three concrete actions

1. Run Session 02’s unit baseline and expand `src/engine/` with terminal precedence, complete transitions, and ending contracts.
2. Add versioned saves and storage failure/recovery in `src/persistence/`, with restart/replay/settings separation.
3. Add the Session 02 unit/browser regressions and update status plus `docs/handoffs/session-02.md`.

## Acceptance criteria still unmet

None for Session 01. All later-session requirements remain pending; especially full-engine terminal/save coverage, final graph/ending witnesses, verified quotations, complete accessibility audit, and classroom release. GitHub connection remains a separate pending task.
