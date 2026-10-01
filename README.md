# The Weight: Escape the Court’s Logic

A planned browser-based narrative puzzle game inspired by Arthur Miller’s *The Crucible*. Play as John Proctor through four chapters, evidence puzzles, and consequential choices. This is an unofficial educational, interpretive adaptation; moral resistance is distinct from physical survival.

**Current state:** a one-card sample backed by the deterministic engine, versioned saves, chapter replay, and persistent preferences. Inspect a report, choose, read the consequence, then Continue. Refresh resumes the run. The full story and puzzle UI are not implemented; ending rules are tested with synthetic routes, not claimed as finished narrative balance.

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

See [commands](docs/COMMANDS.md) for cache/browser setup and production-preview testing. Tests cover the sample, persistence/recovery, and synthetic multi-chapter ending routes. Full-story witnesses remain Session 04 work.

## Continue implementation

In your coding-agent chat, send `Run session 3` (or `/session 3` if the client accepts it). Alternatively, from this directory:

```sh
python3 scripts/session.py 3 --print
python3 scripts/session.py 3
```

The first command prints the prompt; the second launches installed Codex with it. Read [custom commands](.codex/commands/README.md) for portability details. Session 03 authors the complete 16-card narrative against the engine contracts.

## Project references

- [Contributor guide](AGENTS.md) and [agent context](.codex/claude.md)
- [PRD](docs/PRD.md): preserved specification; original supplied copy remains at `The_Weight_PRD.md`
- [Current status](docs/STATUS.md), [six-session playbook](docs/PLAYBOOK.md), and [handoff protocol](docs/HANDOFF_PROTOCOL.md)
- [Commands and verification](docs/COMMANDS.md), [decisions](docs/DECISIONS.md), and [source tracking](docs/SOURCES.md)
- [Walkthrough](docs/WALKTHROUGH.md) and [symbolism register plan](docs/SYMBOLISM.md)
- [GitHub connection checklist](docs/GITHUB.md)

## Controls and content note

Use Tab and Enter/Space or tap the controls. Inspect, choose, read the consequence, then select Continue. Journal records decisions and evidence; its Replay button restores a chapter’s starting state and discards later progress. “Restart game” clears the run. Settings persist mute/reduced-motion preferences separately, so replay/restart preserves them. This sample has no audio or animation.

Progress saves after each accepted action. Unreadable or incompatible saves offer an explicit replacement or play-without-saving option; the existing save is preserved until replacement is chosen. Storage failures show a warning and allow in-memory play. Progress is local to the browser origin (host and port), so dev and preview URLs may have separate saves. Three-level hint and puzzle-answer handling exists in the engine; authored puzzles and their interface arrive in Session 04.

Themes include coercion, false accusations, imprisonment, and references to execution, without graphic violence. Direct quotations remain unavailable development content until verified against a reliable edition. No backend, accounts, or runtime service credentials are planned.
