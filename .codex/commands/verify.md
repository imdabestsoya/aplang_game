# /verify

Read docs/STATUS.md, docs/PRD.md and the selected judge session's acceptance criteria. Run `python3 scripts/verify_scaffold.py`, then checks appropriate to the change. `npm run check` includes types, lint, tests, build and existing content/asset validators. Production browser flows require a build and `E2E_PORT=4183 E2E_PREVIEW=1 npm run test:e2e`. Distinguish active judge coverage from historical card/travel tests. Record actual results and missing human/source reviews. Do not use the archived travel PRD as a current acceptance gate.
