# Sources and Verification

PRD §§2, 5, 7, and 10 define source obligations. The supplied PRD is a product specification, not independent verification of Miller’s words or historical claims.

## Current source status — 2026-10-01 follow-up

The user authorized best-knowledge quotation locations and will review any corrections. This permits local play with labeled drafts; it is not evidence of exact assigned-edition verification. The original PRD is unchanged. Historical entries below describe earlier attempts and are superseded by this section where noted.

| Slot | Speaker / act | Current evidence |
|---|---|---|
| Q1 | John Proctor / IV | Short excerpt checked in the [Holt, Rinehart and Winston selection](https://fhs.trusd.net/documents/Library/the%20crucible.pdf#page=30), printed p. 249 (PDF page 30). Permission credit appears on PDF page 1; publication year/ISBN not identified. |
| Q2 | Abigail Williams / I | Short draft excerpt; corroborated in the [online transcription](https://www.culliton.org/uploads/3/4/4/2/34421062/the_crucible_unknown.pdf#page=37), PDF page 37. Edition unidentified. |
| Q3 | John Proctor / II | Same transcription, PDF page 146. Edition unidentified. |
| Q4 | Deputy Governor Danforth / III | Same transcription, PDF page 175. Edition unidentified. |
| Q5 | John Proctor / II | Same transcription, PDF page 146. Edition unidentified. |

Checked by the implementation agent on 2026-10-01. Only brief excerpts are embedded (22 words total); longer passages remain external reading. The unidentified transcription has visible transcription errors elsewhere, so it is corroboration, not licensed-edition certification. Q2–Q5 retain null edition/page/verifiedAt fields and a `draft` status. PDF viewer locations above are navigation aids, not invented edition pages. All sources are linked from passage panels. Context is original interpretation, visibly separate from the excerpts. No full play or textbook is bundled.

P1 no longer asserts an exact insertion time. Mary’s account is represented with its initial uncertainty; see transcription PDF pages 143–144. The puzzle orders making, gift, and later evidentiary use, retaining the publisher-guide-supported sequence. It does not equate an allegation with observation. Assigned-edition review remains useful, but unsupported precise timing is no longer a required answer.

The brainstorming PDF and assigned classroom edition remain unavailable. The invented ledger, scene condensations, alternative outcomes and original visual/audio assets retain their provenance labels. Contextual sources and previous audit history follow.

## Session 01 content and assets

`tests/fixtures/foundation.ts` (original sample, now test-only) contains an invented Parris/Proctor encounter and an invented household report, each labeled with `basis`, `actReference`, and source notes. The text uses no direct Miller quotations and makes no witchcraft allegation into a fact. Act I is a thematic reference, not a claim that the encounter occurs verbatim in the play. The first choice asks for a witness; the second endorses an unconfirmed report without naming an accused person, so neither sets `falseAccusation`.

All visuals are original CSS typography, borders, and layout using system fonts; no downloaded art, fonts, audio, or third-party visual assets. Quotation slots Q1–Q5 remain tracked above, unverified and not rendered. Persistent settings, source-complete narrative, and final attribution review remain later-session work.

## Session 02 source status

No additional Miller quotations or historical claims were added. Generic ending explanations implement the PRD’s interpretive distinctions; they are original game prose, not direct quotations. Synthetic fixture cards/puzzle tokens are test-only content. Q1–Q5 and the other literary checks above remain unverified; mechanics completion does not imply classroom readiness.

## Session 03 narrative source audit — 2026-09-30

All 16 cards contain original adaptation prose, act references, source notes, and explicit chronology adjustments. Evidence separates observations, allegations, and inferences. The property ledger is invented; Giles’s motive claim is not treated as established fact. Named speakers were checked against the PRD guardrails. Q1–Q5 now have machine-readable records in `src/content/quotations.ts`: exact text, edition, page, source URL, and verification date remain null. The panels identify passages without supplying invented quotations.

The [Penguin Random House teacher guide by Laura Reis Mayer](https://images.penguinrandomhouse.com/promo_image/9780142437339_5079.pdf), printed **guide page 10** (PDF index 9), was inspected on 2026-09-30. Its Act Two summary corroborates Mary sewing and giving Elizabeth the doll before Cheever discovers the needle. This is a guide page, **not a page in an assigned play edition**. It does not settle the precise needle-placement account. P1, the needle record, and Mary’s account remain explicitly provisional until the assigned edition is checked. No guide wording was copied into dialogue.

Quotation placements: Q1 confession and every ending; Q2 optional Chapter I panel with a visible violence notice and close-to-skip behavior; Q3 first crossing from below 80 to at least 80, otherwise court consequence/debrief; Q4 court binary-rule card; Q5 first false accusation, otherwise ending debrief. Trigger state derives from recorded decisions and rewinds with replay. Exact quotation verification and historical parallels still block classroom release.

## Session 04 source boundary

The three exercises are now interactive. P1 visibly labels the supplied needle-placement timeline as provisional; adding a working ordering control does not verify the literary claim. P2 retains the invented-ledger label and distinction between allegation and proof. P3 uses original paraphrases. All Q1–Q5 records remain unverified. No new external assets or quotations were added.

## Session 05 original visual and audio assets — 2026-10-01

`src/components/StoryObjects.tsx` contains original hand-authored SVG geometry for the poppet/needle, constructed ledger, court seal, candle, confession paper/pen, and jail bars. CSS supplies the outer pressure frame, accumulating journal marks, restrained warm ending background and decorative seal movement. No external images, fonts, recordings or generative-image assets were used. The illustrations are decorative and hidden from assistive technology; all evidence remains readable prose. None supplies supernatural proof or depicts physical rescue.

`src/audio/ambience.ts` synthesizes quiet, slowly varying tonal layers locally with Web Audio. There is no speech or third-party recording. The layers interpret collective pressure (S23), with always-visible descriptions and explicit enable/mute controls; the confession desk and endings fade silent (S25). Existing system fonts remain in use.

S01–S32 and S35–S36 now have explicit implementation records. S33/S34 remain deferred until Session 06 verifies historical wording and comparison limits. No new historical facts or direct literary quotations were added. The in-game guide exposes the same basis, act reference, source note, status and verification text as the generated register.

## Session 06 verification attempt — 2026-10-01

No assigned play edition or brainstorming PDF was found in the workspace. The user was asked for the edition/ISBN or the path to an authorized local copy. The [official publisher excerpt for ISBN 9780142437339](https://penguinrandomhousehighereducation.com/book/?isbn=9780142437339) was inspected: the accessible material contains introductory discussion and a contents list, not the five requested play passages or the needle-placement scene. It does not verify their exact wording. Q1–Q5 therefore retain null text, edition, page and verification date. The earlier teacher-guide check supports gift-before-discovery, not the precise needle account. No transcription from an unverified quote site was substituted.

### Contextual panel evidence

The new `src/content/context.ts` records checked dates and direct links. All panel wording is original summary or explicitly hypothetical reflection:

| Source | Supported claim | Verification boundary |
|---|---|---|
| [Miller’s 1996 essay](https://www.newyorker.com/magazine/1996/10/21/why-i-wrote-the-crucible) | Congressional investigations influenced his writing | Author’s retrospective account; not independent verification of each dramatic scene |
| [University of Virginia archive overview](https://salem.lib.virginia.edu/overview.html) | The archive’s reported deaths during the 1692–1693 events | Historical proceedings are distinguished from dramatic characters and game outcomes |
| [Senate Historical Office](https://www.senate.gov/about/powers-procedures/investigations/mccarthy-and-army-mccarthy-hearings.htm) | McCarthy investigations in 1953–1954 and December 1954 censure | Different institutions/procedures from Salem; no claim that the histories are equivalent |

S33 is now implemented using that checked context. S34 is an expressly invented rumor thought experiment, with no allegation about a modern individual, platform or event. The panel states differences in power, process, scale and consequences and rejects equating all criticism with persecution. No additional direct quotations were copied. Independent classroom review remains open.

### Original attempt’s unresolved literary gates (superseded above)

- **Q1:** Proctor soul/name, proposed Act IV; exact wording, punctuation, edition/page and surrounding context unverified.
- **Q2:** Abigail parental violence, proposed Act I; same verification gaps; notice/Skip behavior implemented.
- **Q3:** children/keys/vengeance, proposed Act II; same gaps; first-crossing and fallback placements tested.
- **Q4:** Danforth binary loyalty, proposed Act III; same gaps; court placement tested.
- **Q5:** accuser’s presumed holiness, proposed Act II; same gaps; first-accusation/fallback behavior tested.
- **P1:** Mary’s precise needle-placement account remains provisional. Final wording must be checked against licensed play text before classroom release.

The scene meetings, numerical effects, document combinations and alternate outcomes remain labeled inventions/interpretations. Their labeling has been audited; exact play-scene fidelity is not claimed to have been independently verified.
