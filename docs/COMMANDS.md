# Command Reference

Run from the repository root. Application scripts now implement PRD §13. Verified on macOS 12.7.6 x64 with Node 22.23.3, npm 10.9.9, Playwright 1.56.1, and Chromium 141.0.7390.37. `.nvmrc` pins Node; `package-lock.json` pins dependencies.

## Environment

Use your Node version manager with `.nvmrc`, or this machine’s ignored local runtime:

```sh
export PATH="$PWD/.tools/node-v22.23.3-darwin-x64/bin:$PATH"
export npm_config_cache="$PWD/.npm-cache"
export PLAYWRIGHT_BROWSERS_PATH="$PWD/.tools/browsers"
```

The local runtime/browser folders are not shipped in Git. New checkouts need Node installed. Browser installation is separate from npm dependency installation:

```sh
npm ci
npx playwright install chromium
```

Use the same `PLAYWRIGHT_BROWSERS_PATH` for installation and tests. If omitted, Playwright uses its normal user cache instead. Playwright is pinned because 1.63.0 rejected Chromium on macOS 12; 1.56.1 installed and ran successfully. Revisit the pin when upgrading the OS; the browser installer notes that its macOS 12 FFmpeg build is frozen.

## Application commands and observed results

Application verification below was refreshed in Session 02 on 2026-09-30. Dependency installation evidence remains from Session 01 because no dependencies changed. See the [Session 02 handoff](handoffs/session-02.md) and [Foundation handoff](handoffs/session-01.md).

| Command | Purpose / prerequisites | Observed result |
|---|---|---|
| `npm install` | Initial dependencies/lockfile; Node/npm and registry access | Passed; lockfile created, later browser compatibility pin applied |
| `npm ci` | Clean install from matching package/lockfile | Passed after final dependency selection; 180 packages installed |
| `npm run dev` | Vite development server; dependencies installed | Passed via browser flows on 127.0.0.1:4173; ordinary launch prints its URL |
| `npm run build` | Typecheck and production bundle in dist/ | Passed |
| `npm run preview` | Serve existing dist/ | Passed via production browser flows; screenshots captured on port 4174 |
| `npm run lint` | ESLint, TypeScript and React rules; zero warnings | Passed |
| `npm run typecheck` | Strict TypeScript checks | Passed |
| `npm run test -- --run` | Vitest unit suite once | 50 tests passed |
| `npm run test:routes` | Foundation paths and synthetic multi-chapter engine witnesses | 11 tests passed; not full-narrative balance proofs |
| `npm run test:e2e` | Start dev server; run desktop and 360px touch Chromium projects | 18 tests passed |
| `E2E_PREVIEW=1 npm run test:e2e` | Same browser flows against production build | 18 tests passed against final build; build first |
| `npm run check` | Lint → types → unit → routes → build | Passed for Session 02; E2E remains separate |

The browser suite covers real keyboard tab order, both choices, inspection, consequence/journal, rapid duplicate clicks, refresh, explicit continuation, replay, restart, preferences, corrupt/incompatible saves, denied storage, write-quota errors, and narrow layout. Engine fixtures cover threshold precedence, sign/refuse outcomes, evidence variants, free hints/solutions, chapter snapshots, and save hydration. Full narrative and final ending witnesses remain Sessions 03–04 work.

## Recovery

- `node`/`npm` missing: select `.nvmrc` through your version manager or export the existing local runtime PATH above.
- Lockfile mismatch: review intentional dependency changes and run `npm install`; never remove the lockfile merely to hide a mismatch.
- Missing browser executable: finish `npm ci`, then run the browser-install command with the same cache environment as tests. Do not install browsers concurrently with `npm ci`, which replaces node_modules.
- Port in use: stop the conflicting process or select a different port for interactive dev/preview. Tests intentionally require free port 4173 and never reuse an unknown server.
- Sandbox `listen EPERM`: local browser checks require permission to bind localhost and launch Chromium; run them in a permitted local terminal. In this session the approved retry succeeded.
- Test/build failure: fix the specific assertion/type/lint issue and rerun its check; skipped or empty suites do not establish a gate.

## Agent workflow commands

| Command | Purpose | Observed result |
|---|---|---|
| `python3 scripts/session.py 3 --print` | Print next session prompt without launching | Launcher verified during bootstrap |
| `python3 scripts/session.py 3` | Launch authenticated Codex; requires CLI on PATH | Dispatch stub tested; no nested agent launched |
| `python3 scripts/verify_scaffold.py` | Validate workflow plans/links/launcher | Passed at bootstrap and Session 01 baseline |
| `git status --short --branch` | Inspect branch and dirty files | main tracking origin/main; validation base 1480466; Session 02 changes listed in handoff |
| `git diff --check` | Tracked patch whitespace check | Passed for Session 02 |

See [custom commands](../.codex/commands/README.md) for `/session N`, `/handoff`, `/verify`, and [GitHub connection](GITHUB.md). Session 02 does not push or deploy. Local origin is now configured; see `docs/GITHUB.md`.

## Save debugging

The browser stores `the-weight.run` (format 1, content version `foundation-2`) and `the-weight.settings` separately. Refresh hydrates validated state without redispatching choices. Replay restores the selected checkpoint and discards later history; restart writes a fresh run without clearing preferences or unrelated keys. Different host/port combinations have separate storage.

An unreadable/incompatible save remains intact until the player chooses replacement. “Keep save and play without saving” leaves it untouched. A quota error retains live state but may leave an older disk save; the warning explains that refresh risk. Do not use localStorage.clear() as a recovery shortcut. When modifying state/content contracts, update the appropriate version and test the recovery flow.

## Session 03 observations — 2026-09-30

`npm run docs:symbolism` regenerates `docs/SYMBOLISM.md` from the shared JSON registry. `npm run docs:check` rejects stale generated output; `npm run test:content` runs the eight narrative validity/trigger/reachability checks. Both are included in the production build.

`npm run check` passed lint, typecheck, 58 unit checks, 11 route checks, build-time narrative validation and Vite production build. Development Playwright passed 20 desktop/narrow tests. A first browser run exposed an ambiguous classification selector, corrected to an exact match. Existing synthetic route tests remain distinct from Session 04 final-balance witnesses.

Production content uses `narrative-3` with unchanged save format 1. Old sample saves require explicit replacement or play without saving. No automatic migration is attempted.

Final verification recorded 2026-10-01: `E2E_PREVIEW=1 npm run test:e2e` passed all 20 production-preview browser tests; `python3 scripts/verify_scaffold.py` and `git diff --check` passed. Session changes remain uncommitted; no push was performed.

## Session 04 observations — 2026-10-01

`npm run test:routes` now searches the real narrative graph and replays saved witnesses. It checks four endings, two clean resistance routes, recovery from one initial mistake, all intermediate thresholds, free wrong answers/hints, and exact trace/walkthrough agreement. The search visits 85,337 distinct mechanical states with puzzles solved or skipped.

To intentionally regenerate witnesses and `docs/ROUTES.md` after a reviewed content change, run `UPDATE_WITNESSES=1 npm run test:routes`, inspect the diffs, then run without that variable. Fixtures live in `tests/routes/fixtures/narrative.json`; generation never changes production effects.

`npm run check` passed lint/types, 58 unit and 13 route checks, build-time narrative validation, generated-doc checks and production build. Development browser evidence comprises the existing 20 passing flows plus four complete puzzle-route flows. Keyboard tests use native select type-ahead on this macOS Chromium installation; no developer state is injected.

Content version remains `narrative-3`, format 1. Solved puzzles and hints persist; unfinished form selections do not. Literary release checks remain open.

Final Session 04 verification: the full production-preview suite passed **24 tests**. Screenshot review caught pale puzzle-button text and clipped selected answers on narrow screens; scoped dark button text and wrapped selected-answer summaries fixed both. Lint/build and the four production puzzle-route checks passed again after those corrections. Desktop/narrow puzzle screenshots were inspected; controls, full selected-answer text, hints and explanations are readable. Scaffold verification and `git diff --check` pass. All Session 04 acceptance gates are complete; source verification and independent classroom playtesting remain later release gates. Changes remain uncommitted.

## Session 05 observations — 2026-10-01

`npm run check` passes 73 unit tests (including 15 palette contrast checks), 13 route tests, lint/types, generated symbolism validation and the production build. Engine effects, saves and all five witness fixtures are unchanged.

`tests/e2e/presentation.spec.ts` covers explicit spoiler reveal, registry content, dialog focus restoration, audio gesture gating/failure/mute/silence, OS and saved reduced motion, and 360px/200% CSS zoom. Real AudioContext master gain is observed in the success test; physical speaker output is not audited. The initial suite caught an offscreen modal header under zoom and a hidden-register false positive in an overly broad numeric-text test. The 14 affected development-browser checks passed after fixes.

See `docs/ACCESSIBILITY.md` for measured color pairs, screenshot paths and explicit limitations. No new package dependency or external asset download was required.

Final verification: `E2E_PREVIEW=1 npm run test:e2e` passed all **32 production-browser checks** on desktop and narrow screens. `python3 scripts/verify_scaffold.py` and `git diff --check` pass. Selected screenshot evidence is saved under `docs/screenshots/session-05/`. Session 05 acceptance gates are complete; the explicitly listed source and independent accessibility/classroom reviews remain Session 06 work.

## Session 06 clean-copy audit — 2026-10-01

A disposable copy of tracked and nonignored current working-tree files was created at `/private/tmp/the-weight-session06-jg4xyppa`; `.git`, node_modules, tools/caches and dist were not copied. This includes uncommitted work and is not a new Git revision.

Using Node 22.23.3/npm 10.9.9, `npm ci --offline --cache /Users/krishbehl/aplang_game/.npm-cache --no-audit --no-fund` installed 180 packages. `npm run check` passed lint/types, **74 unit + 13 route tests**, nine build-time content tests, generated-doc checks and production build. `E2E_PREVIEW=1 npm run test:e2e` passed **34 tests** against that copy’s production preview. Playwright automatically ran `npm run preview -- --port 4173 --strictPort`.

Browser environment: Playwright 1.56.1, Chromium/headless-shell 141.0.7390.37 revision 1194, macOS 12.7.6 x86_64. Local browser path was `/Users/krishbehl/aplang_game/.tools/browsers`. Normal contributors can use `npm ci` online and the documented browser installation; cached install was a reproducibility check, not a required distribution of `.tools` or `.npm-cache`.

`tests/e2e/release.spec.ts` completes resistance through keyboard or narrow-touch controls after disabling networking. No external runtime request is made. Human reader timing and independent accessibility review remain unmeasured; see `docs/RELEASE_CHECKLIST.md`. Literary source gates remain open despite passing technical checks.
