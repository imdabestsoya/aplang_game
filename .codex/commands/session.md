# /session [session number]

## Input
Accept 1-13, including 01-09. "Run session N" is equivalent. All active plan files use docs/PRD.md. Sessions 01-08 are historical baselines; 09-13 are the current judge-game audit sequence. Without a number, use the in-progress session or next pending session in docs/STATUS.md, initially 09.

## Execution
1. Read AGENTS.md, .codex/claude.md, docs/STATUS.md, docs/PLAYBOOK.md, docs/HANDOFF_PROTOCOL.md, the latest handoff and the selected plan.
2. Inspect Git and existing changes. Preserve work and saves. Never dispatch docs/session-history plans or restore retired travel requirements.
3. For an explicitly requested historical Session 01-08, audit the corresponding current judge foundation and fix demonstrated gaps only. Do not rebuild completed features.
4. For Session 09-13, check actual prerequisites and mark the audit in progress. Implement necessary fixes, not the entire existing game again. Complete independent work while source/human evidence remains unavailable.
5. Run the plan's verification. Separate current judge checks from historical route tests and actual human review.
6. Update status, decisions and affected documentation. Append a dated current-goal audit to docs/handoffs/session-NN.md without overwriting historical evidence.
7. Mark complete only when the plan's acceptance criteria are met. Record missing reviews and the next session. Stop after the requested session unless several were requested.

## Completion
The active PRD and Session 13 define release review. Historical approvals cannot certify the current game. No commit, push, deployment or new remote is implied.
