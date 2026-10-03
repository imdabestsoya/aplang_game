# Session 13 — Trail release and classroom audit

## Objective and PRD references

Implement v2 PRD §16 milestone 07 using active `docs/PRD.md`, §§3–4, 13–18. Continue this repository; preserve Sessions 01–06 and existing user work. Read `docs/ART_DIRECTION.md` and the latest handoff.

## Prerequisites

Session 12 implementation gates pass; obtain reliable literary text and real review evidence where available.

## Work checklist

- [ ] Verify all five quote excerpts, speaker/act/context/punctuation and only checked edition pages; carry forward sources and user-authorized drafts without promoting them to verified by assumption.
- [ ] Audit each §17 bullet: real journey/exploration, counts, eight-variant witnesses, atomic effects, no softlocks, pixel quality, accessibility, source distinctions and S52 coverage.
- [ ] Run independent keyboard/touch/screen-reader alternatives and real device/audio/browser zoom checks; record actual observations. Measure first-time25–40min and replay10–20min targets and learner reflections without fabricating results.
- [ ] Perform disposable clean-copy npm ci/check/build/preview and production browser flows; test offline runtime, no credentials and save/checkpoint recovery.
- [ ] Finalize README, exact walkthrough, asset/source records, commands, release checklist and handoff. Fix introduced defects; list specific missing evidence if classroom release remains blocked.

## Expected files touched

docs/{RELEASE_CHECKLIST,PLAYTEST,README,WALKTHROUGH,SOURCES,ACCESSIBILITY,STATUS,COMMANDS}.md (README at root), docs/handoffs/session-13.md, focused src/tests fixes. Also update `docs/STATUS.md`, `docs/COMMANDS.md`, relevant decisions and `docs/handoffs/session-13.md`. Paths are anticipated, not permission to overwrite unrelated changes.

## Verification

Run `python3 scripts/verify_scaffold.py` and targeted unit/route checks, then `npm run check`. For UI or persistence changes build and run `E2E_PREVIEW=1 npm run test:e2e`; exercise the user flow without developer overrides. Record exact commands/results, visual evidence and unavailable human/source checks. Run content/asset validators once introduced in Session 07; never claim their absence is a pass.

## Acceptance criteria

- [ ] Every PRD §17 gate has observed evidence or a specific unmet entry; mark release complete only when required gates pass.
- [ ] All five quotations and required historical/literary claims are verified for release.
- [ ] Clean install/check/build and complete production browser flows pass; all eight variants retain their witnesses.
- [ ] Real timing/accessibility outcomes and limitations are recorded; another contributor can reproduce the build and routes without chat history.
- [ ] Status and Session 13 handoff contain results, open gates and next three actions.
