# Session 03 — Complete Narrative

## Objective and PRD references

Author the complete four-chapter, 16-card narrative with traceable literary metadata. Read PRD §§2–5, 7, 9–10, 12, and 16 (Narrative and symbolism).

## Prerequisites

Session 02’s transition, persistence, and ending contracts are verified. Read current content types, source status, and symbolism plan. Run existing unit/content tests before editing.

## Work checklist

- [ ] Write four principal cards per chapter: The Whisper, The Needle, The Court, The Name. Use John Proctor as protagonist and the PRD’s character guardrails.
- [ ] Give each card exactly two available actions, exact effects, requirements/variants, consequences, next IDs, evidence IDs, and symbolism IDs (§12).
- [ ] Supply `basis: canonical | interpretation | invented`, `actReference`, and source notes for narrative records; identify chronology changes and distinguish allegations from facts.
- [ ] Populate all evidence/clues needed for P1–P3 before their relevant choices. Mark the land ledger as invented; verify poppet chronology before final wording.
- [ ] Create Q1–Q5 records with status, speaker, act, source/edition/page fields, placement, and context. Keep unavailable wording as explicit development placeholders; do not invent quotes or pages. Track proposed triggers/fallbacks from §10.
- [ ] Establish `src/content/symbolism.ts` (or equivalent) as the shared S01–S36 record; generate `docs/SYMBOLISM.md` from it and later reuse it in the UI.
- [ ] Add content validation for unique IDs, references, two-choice cardinality, metadata, chapter counts, and graph reachability. Test endings’ distinct causal narratives and the closed-resistance warning.

## Expected files touched

`src/content/{cards,evidence,quotations,symbolism}.ts` or chapter modules, content validation/generation scripts, journal and ending components, `tests/unit/`, `tests/routes/`, `docs/SOURCES.md`, `docs/SYMBOLISM.md`, and shared session records.

## Verification

Run `npm run check` with content validation integrated into tests/build. Traverse all cards and references, then manually read all consequences for causal consistency and character voice. Record source checks separately from automated validity. Do not claim balance complete before Session 04’s solver witnesses.

## Acceptance criteria

- [ ] Exactly 16 principal cards across four chapters; each reachable and offering two story choices.
- [ ] All referenced IDs resolve; all narrative entries include required metadata.
- [ ] All named speakers come from the play; original dialogue is labeled as adaptation.
- [ ] Five quotation slots have correct planned triggers/fallbacks and honest verification status.
- [ ] S01–S36 are represented in one maintained registry with implementation/deferred status.
- [ ] Checks pass; unresolved literary verification and balance work appear in `docs/handoffs/session-03.md`.
