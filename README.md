# The Weight: Escape the Court’s Logic

An unofficial educational adaptation of Arthur Miller’s *The Crucible*. Play as John Proctor through four chapters, 16 decision cards and three evidence puzzles. Moral resistance is distinct from physical survival; this is interpretive fiction, not a historical simulation.

**Ready for local play; classroom validation remains open.** All four chapters and endings are playable. At your request, short quotation excerpts use best-available act references, with uncertain edition details labeled for your later review. Q1 is checked against a licensed textbook selection; Q2–Q5 are corroborated drafts. Independent reader/accessibility checks remain unperformed. See the [release checklist](docs/RELEASE_CHECKLIST.md).

## Setup and local play

Use Node **22.23.3** (`.nvmrc`) and npm **10.9.9**. Install Node with your version manager, then run from this repository:

```sh
npm ci
npm run dev
```

Open the localhost URL printed by Vite. For a production build and local server in one command:

```sh
npm run play
```

Do not open `dist/index.html` directly with a file URL. The game needs a local web server but no backend, account, service credentials or runtime AI/network service. Source links are optional external reading; the game works without opening them.

This machine also has an ignored runtime: `export PATH="$PWD/.tools/node-v22.23.3-darwin-x64/bin:$PATH"`. That directory is not included in a checkout.

## Controls and saves

Use Tab and Enter/Space, or tap labeled controls. Inspect records, select one of two story actions, read the consequence, then Continue. Puzzle selects support native keyboard type-ahead. Check reasoning submits an answer; retries and all three hints have no meter penalty. Full selected answers wrap beneath the controls.

Journal records choices and explains missed reasoning or a closed resistance route. Replay restores a chapter’s starting state and discards later progress; Restart game begins again. These preserve Settings. Saves are local to the browser origin, so different ports can have separate progress. Corrupt/incompatible saves offer explicit replacement or play without saving. Unfinished form selections reset on refresh; accepted solutions and hints persist.

Enable optional ambience starts sound only after that action. Mute sound and Reduce motion persist; device reduced-motion preferences also apply. Sound descriptions remain visible when muted, and the confession desk is silent. Reveal symbolism warns about spoilers; Escape or Close guide returns focus to its opener. Endings include numerical decision audits and a sourced context panel that explains the limits of historical parallels.

## Content and attribution

Themes include coercion, false accusations, imprisonment and references to execution, without graphic violence. The optional Abigail passage has a parental-violence notice and a Skip control. Scene dialogue is original adaptation prose; brief quotation excerpts carry source and review labels. P1 distinguishes Mary’s testimony from inference and does not require an exact needle-placement time. The ledger is invented, and motive claims remain allegations. Original SVG/CSS art and synthesized audio use no downloaded assets; see [sources](docs/SOURCES.md).

## Verification and continuation

```sh
npm run check
npx playwright install chromium
npm run test:e2e
E2E_PREVIEW=1 npm run test:e2e
python3 scripts/verify_scaffold.py
```

See [commands](docs/COMMANDS.md) for browser compatibility, cache setup, and actual results. [Accessibility notes](docs/ACCESSIBILITY.md) distinguish automated checks from outstanding independent review.

Resume with `Run session 6`, or `python3 scripts/session.py 6`. Use the [human review form](docs/PLAYTEST.md) to record the remaining observations. Local play is available now; classroom validation requires that evidence.

## Project references

- [Exact walkthrough](docs/WALKTHROUGH.md), [saved routes](docs/ROUTES.md), and [generated symbolism](docs/SYMBOLISM.md)
- [Status](docs/STATUS.md), [playbook](docs/PLAYBOOK.md), and [Session 06 handoff](docs/handoffs/session-06.md)
- [PRD](docs/PRD.md), [contributor guide](AGENTS.md), and [agent context](.codex/claude.md)
- [Decisions](docs/DECISIONS.md), [handoff protocol](docs/HANDOFF_PROTOCOL.md), and [GitHub setup](docs/GITHUB.md)
