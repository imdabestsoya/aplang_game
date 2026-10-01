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
