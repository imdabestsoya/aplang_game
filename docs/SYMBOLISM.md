# Symbolism and Parallels

Session 01 implements the initial scene only. The full planned register is in [PRD §9](PRD.md#9-complete-symbolism-and-parallel-register), including S01–S36, the palette, and limits of historical/modern parallels. The subset below is present in the foundation; other entries remain planned.

Session 03 must transfer the complete register into one maintained content module, including ID, choice, interpretation, literary basis, implementation location, verification status, and any explicit deferral reason. Generate this document from that module; Session 05’s in-game view must consume the same records. Do not maintain competing hand-edited copies.

Every new meaningful symbolic or parallel choice extends the register. Purely practical decisions may be marked “functional; no symbolic claim.” Actual color combinations require contrast checks; record accessibility adjustments without inventing new symbolism. These are design interpretations, not claims that Miller assigned exact meanings to colors or UI elements.

## Foundation implementation inventory

| IDs | Present behavior / location | Remaining work |
|---|---|---|
| S01 | Title and journal framing in `src/App.tsx` | Full accumulation and late-game explanation |
| S02–S06 | Charcoal layout, parchment evidence, oxblood allegation label, gold standing accents, blue inspection in `src/styles/` | Complete symbolic object/scene treatments |
| S10 | Qualitative labels only in `src/components/Status.tsx` | Postgame arithmetic/developer mode |
| S11 | Supporting the report increases standing and hysteria; UI states standing is not integrity | Complete narrative consequences |
| S13–S14 | Exactly two story choices and optional evidence inspection | Evidence-conditioned variants and puzzles |
| S26 | Georgia headings/dialogue and Arial body/controls | Final typography/accessibility audit |

S07–S09 palette tokens exist but do not establish implemented symbolism. All IDs not listed above remain pending their planned sessions. Borders, responsive columns, spacing, and the roman chapter marker are functional; no additional symbolic claim is introduced. Session 03 will transfer this inventory and the full PRD register into the shared generated source.

Measured foundation text contrast (WCAG relative-luminance formula): parchment/charcoal 14.46:1; gold/charcoal 5.70:1; blue/charcoal 5.98:1; muted text/charcoal 8.52:1; oxblood/parchment 6.87:1; source-note brown/parchment 7.06:1. These pairs exceed 4.5:1. Full UI/accessibility validation is still assigned to Sessions 05–06.

## Session 02 progress

S10 retains hidden numeric meters during ordinary play; the ending view can expose the final values, though actual ending scenes arrive with the narrative. S11/S13/S14 continue through separate flags, two always-available base choices, labeled evidence variants, and penalty-free inspection/hint mechanics. S36 now has saved decision history and chapter replay; the full comparison/debrief treatment remains pending. Restore/recovery messages, Continue, and Settings are functional controls with no new symbolism. The shared generated S01–S36 registry remains Session 03 work.
