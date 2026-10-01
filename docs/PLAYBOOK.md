# Implementation Playbook

This expands PRD §15 without changing scope. Bootstrap (Session 00) creates planning infrastructure only; it does **not** satisfy Session 01’s runnable one-card requirement (§13).

Start with `/session 1`, `Run session 1`, or `python3 scripts/session.py 1`. See [command behavior](../.codex/commands/README.md). Each session can span multiple chats; resume from [status](STATUS.md) and the latest handoff.

| Session | Dedicated plan | Prerequisites | Exit evidence |
|---|---|---|---|
| 01 — Foundation | [session-01.md](../.codex/sessions/session-01.md) | Bootstrap; Node/npm available or installed | Clean install, working card, typecheck/build |
| 02 — Engine | [session-02.md](../.codex/sessions/session-02.md) | 01 complete | Transition, terminal, persistence tests |
| 03 — Narrative | [session-03.md](../.codex/sessions/session-03.md) | 02 complete | 16 reachable cards; valid references and source metadata |
| 04 — Evidence and balance | [session-04.md](../.codex/sessions/session-04.md) | 03 complete | Four ending witnesses; two resistance routes; recovery |
| 05 — Visual rhetoric | [session-05.md](../.codex/sessions/session-05.md) | 04 complete | Shared symbolism output; accessible visuals and settings |
| 06 — Classroom readiness | [session-06.md](../.codex/sessions/session-06.md) | 05 complete; source access for release | Full PRD §16 audit, browser QA, verified sources |

Every plan includes tasks, anticipated files, verification, and acceptance criteria. Paths can evolve with logged reasons. All sessions update `docs/STATUS.md`, `docs/COMMANDS.md`, and their handoff; update decisions, sources, and symbolism when relevant. Follow [HANDOFF_PROTOCOL.md](HANDOFF_PROTOCOL.md).

Use checkboxes in the plans as evidence-backed gates. The status table records overall progress; neither replaces test results. Finish mechanics and available QA even if licensed text is unavailable, but keep the release incomplete. Do not add multiplayer, accounts, analytics, AI services, deployment, or other excluded scope (PRD §4).
