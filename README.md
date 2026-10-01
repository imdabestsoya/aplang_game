# The Weight: Escape the Court’s Logic

A planned browser-based narrative puzzle game inspired by Arthur Miller’s *The Crucible*. Play as John Proctor through four chapters, evidence puzzles, and consequential choices. This is an unofficial educational, interpretive adaptation; moral resistance is distinct from physical survival.

**Current state:** a runnable one-card foundation. Inspect a report, make one of two decisions, read its consequence, and review the journal. This is not the complete game; saves, puzzles, endings, and the other 15 cards remain for later sessions.

## Run locally

Use Node **22.23.3** (pinned in `.nvmrc`) and npm **10.9.9**. With a Node version manager, select that version; on this machine a verified local runtime is also available:

```sh
export PATH="$PWD/.tools/node-v22.23.3-darwin-x64/bin:$PATH"
npm ci
npm run dev
```

The `.tools` runtime is ignored and is not included in a checkout; other contributors must install Node. Open the local URL printed by Vite. Production preview: `npm run build`, then `npm run preview`.

```sh
npm run check
export PLAYWRIGHT_BROWSERS_PATH="$PWD/.tools/browsers"
npx playwright install chromium
npm run test:e2e
```

See [commands](docs/COMMANDS.md) for cache/browser setup and production-preview testing. Tests currently cover this one-card sample, not the full game's ending routes.

## Continue implementation

In your coding-agent chat, send `Run session 2` (or `/session 2` if the client accepts it). Alternatively, from this directory:

```sh
python3 scripts/session.py 2 --print
python3 scripts/session.py 2
```

The first command prints the prompt; the second launches installed Codex with it. Read [custom commands](.codex/commands/README.md) for portability details. Session 02 builds the full deterministic engine and persistence on this foundation.

## Project references

- [Contributor guide](AGENTS.md) and [agent context](.codex/claude.md)
- [PRD](docs/PRD.md): preserved specification; original supplied copy remains at `The_Weight_PRD.md`
- [Current status](docs/STATUS.md), [six-session playbook](docs/PLAYBOOK.md), and [handoff protocol](docs/HANDOFF_PROTOCOL.md)
- [Commands and verification](docs/COMMANDS.md), [decisions](docs/DECISIONS.md), and [source tracking](docs/SOURCES.md)
- [Walkthrough](docs/WALKTHROUGH.md) and [symbolism register plan](docs/SYMBOLISM.md)
- [GitHub connection checklist](docs/GITHUB.md)

## Controls and content note

Use Tab and Enter/Space or tap the controls. Inspect the report, choose an action, and open the journal. “Restart sample” clears this in-memory run. Refresh also resets it: saving is not implemented yet. No audio or motion is used; hint and persistent settings controls arrive in later sessions.

Themes include coercion, false accusations, imprisonment, and references to execution, without graphic violence. Direct quotations remain unavailable development content until verified against a reliable edition. No backend, accounts, or runtime service credentials are planned.
