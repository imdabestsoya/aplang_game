# The Weight: Escape the Court's Logic

## 1. Agent brief

Build a browser-based narrative puzzle game inspired by Arthur Miller's *The Crucible*. Use this PRD to initialize a repository, then create a handoff protocol, executable command reference, and a multi-session implementation playbook before implementing the game.

The game should feel like escaping a system of manufactured reality: Salem's court turns fear into evidence, disagreement into guilt, and survival into complicity. The player escapes this logic by recognizing contradictions and refusing to reproduce it. No literal computer simulation, futuristic weapons, or characters from *The Matrix* are required.

**Deliverable scope:** a complete, locally runnable single-player game plus the documentation and tests needed for another coding session to continue reliably. Do not deploy or create an external repository unless separately instructed.

## 2. Source, priorities, and design decisions

Primary supplied source: `Crucible Project Brainstorming(1).pdf`, two pages. It proposes “The Weight,” binary decisions, hidden Reputation and Town Hysteria meters, resentments, fear, shame, five quotation triggers, and an almost unwinnable moral trap.

User requirements also establish challenging but achievable play, characters from the play, references to its objects, extensive symbolism, and an explicit record of every symbolic and parallel choice.

Resolve source alternatives as follows:

| Issue | Product decision | Reason |
|---|---|---|
| Salem or a modern setting | Salem, represented through an abstract court interface | Keeps Miller's characters and objects central; modern resonance belongs in the debrief |
| Ordinary citizen or named protagonist | John Proctor is the playable character | Meets the request to use characters from the book and anchors the final name/confession choice |
| Unwinnable or solvable | A narrow, testable moral-resistance ending is achievable | Preserves pressure while satisfying the explicit request for solvability |
| Meaning of escape | Escape from the court's definition of truth and personal worth | Avoids implying that a puzzle can undo the play's tragedy |
| Physical survival | Separate from moral resistance | A surviving player can remain complicit; resistance does not guarantee survival |
| Shame badge | A neutral record of a specific action and its consequence | Encourages reflection without calling the player a bad person |
| Format | A 2D card-and-evidence game | Feasible scope with meaningful choices and literary analysis |

This is an **interpretive adaptation**, not an exact replay of the play or a historical simulation. Invented meetings, evidence combinations, numerical rules, and alternate outcomes must be labeled. Do not imply that a character's allegation is an established fact.

## 3. Audience, purpose, and success

- **Audience:** high-school readers, AP Lang classmates, and a teacher evaluating rhetorical choices.
- **Purpose:** let players experience how public reputation, private resentment, and institutional power reward harmful choices.
- **Argument:** hysteria grows through ordinary choices under pressure; accepting the court's premises can perpetuate injustice even when it seems protective.
- **Target session:** 15–25 minutes for a first run, excluding optional analysis; 5–10 minutes to replay a known route.
- **Success:** a player can explain how one mechanic, one object, and one color choice support the argument, using their own decisions as examples.
- **Difficulty target:** at least one guaranteed resistance route; no random failure; hints make completion possible without knowledge of an arbitrary code.

## 4. MVP and exclusions

### Must ship

1. Four chapters containing 16 principal decision cards, four per chapter.
2. Exactly two story choices per card; inspect, journal, hints, and settings are separate utility controls.
3. Two hidden numerical meters with readable qualitative feedback.
4. Three evidence puzzles that change later options or consequences.
5. Four reachable endings with an explanation of the player's causal path.
6. A journal containing evidence, decisions, and optional graduated hints.
7. A spoiler-aware “Symbolism and Parallels” view, generated from the same records used in documentation.
8. Five quotation slots, with verified text and source metadata required before final release.
9. Keyboard and touch support, reduced motion, mute, local saving, and restart.
10. Repository documentation, deterministic route tests, and a full walkthrough.

### Outside MVP

3D movement, combat, procedural dialogue, generative-AI services, multiplayer, accounts, analytics, voice acting, a modern-school campaign, and literal supernatural proof. No actual witchcraft should explain the accusations.

## 5. Characters and narrative structure

Use original paraphrased dialogue except for the five separately tracked quotations. Never present invented lines as Miller's words.

| Character | Game function | Interpretive guardrail |
|---|---|---|
| John Proctor | Player; reputation, compromised authority, and name/confession conflict | Do not present him as morally flawless |
| Elizabeth Proctor | Trust, strained domestic relationships, and the poppet accusation | Give her perspective and agency beyond being evidence for John |
| Abigail Williams | Coercion and the power of accusation | Fear and self-interest can coexist; avoid a one-dimensional monster |
| Mary Warren | Poppet provenance and pressure to conform | Testimony can change under coercion |
| Deputy Governor Danforth | Court procedure and binary loyalty demands | Evidence does not automatically make an institution admit error |
| Reverend Hale | Authority followed by doubt | Changing one's mind has consequences and limitations |
| Reverend Parris | Institutional standing and self-protection | Avoid equating all religious belief with dishonesty |
| Giles Corey | Land grievance and resistance under pressure | Distinguish his claims from proven motives |
| Thomas Putnam | Property interest implicated in accusations | Present the land motive as an allegation/interpretation |
| Rebecca Nurse | Integrity without institutional protection | Innocence must not become a magical defense |

### Chapter I — The Whisper

Setting: Parris's household and a symbolic town notice board. Teach inspect → decide → consequence → journal. Four cards establish rumor, institutional status, Abigail's pressure, and whether John demands a source. The final card unlocks the first evidence exercise.

### Chapter II — The Needle

Setting: the Proctor household. Four cards center on the poppet, Mary's account, Elizabeth's accusation, and whether circumstantial evidence is treated as proof. Completing the provenance puzzle prepares a later evidence-based response; it does not automatically prevent Elizabeth's arrest.

### Chapter III — The Court

Setting: a narrowing courtroom. Four cards involve Giles's allegation, the cost of corroboration, Mary's vulnerability, and Danforth's either/or rule. A sourced challenge carries less reputational harm than an unsupported denial. The institution can still reject it.

### Chapter IV — The Name

Setting: jail and the confession desk. Four cards revisit the consequences of earlier accusations, Hale's changing position, the treatment of a confession, and John's final choice. Reflection connects the route to the title's moral weight.

Scene order is an adaptation. Content records must identify the play act that motivates each scene and any changes to chronology.

## 6. Core loop and rules

1. Read a card and identify its speaker.
2. Inspect available objects or statements, without a time penalty.
3. Select one of two explicitly worded actions.
4. Apply meter changes and flags exactly once.
5. Show a brief consequence and qualitative meter feedback.
6. Update the journal, save progress, and check terminal conditions.

### State

| Field | Starting value | Rule |
|---|---:|---|
| Reputation (`R`) | 65 | 0–100; public standing, not virtue |
| Hysteria (`H`) | 25 | 0–100; collective panic |
| Evidence | Empty set | Stable evidence IDs; inspection never consumes an item |
| Decision history | Empty list | Card, choice, before/after state, consequence, symbolism IDs |
| Flags | False unless specified | Includes `poppetProvenance`, `landMotiveExamined`, `courtContradiction`, `falseAccusation`, `signedFalseConfession` |

No third hidden morality score. Ethical consequences are represented by explicit actions and flags.

**Initial balancing ranges:** an accusation may give R +6 to +10 and H +8 to +12; unsupported defense may cost R 8–12 and reduce H 0–3; a sourced challenge may cost R 3–6 and reduce H 5–9. These are tuning defaults, not universal rewards. Every card must store its exact effects. Context can differ, but feedback must explain why.

Qualitative feedback appears after each choice. Reputation labels: 1–24 “Under suspicion,” 25–49 “Watched,” 50–74 “Accepted,” 75–100 “Favored.” Hysteria labels: 0–24 “Uneasy,” 25–49 “Rumors spreading,” 50–79 “Fear governs,” 80–99 “Near rupture.” Zero reputation and 100 hysteria are terminal, not ordinary bands.

Numeric values are hidden during standard play but visible in the postgame audit and developer mode. Do not make players infer critical danger from color alone.

### Resolution order

Validate action → apply its effects atomically → clamp meters → record action → show consequence → resolve ending → save. If H reaches 100 and R reaches 0 on the same turn, show Town Rupture with a condemnation detail. Otherwise H=100 takes precedence over R=0. Only evaluate a final-choice ending if neither threshold ending applies.

Do not allow missing evidence to softlock progression. Each card has two available actions; evidence changes a labeled action or its documented effects. Choosing a missing-evidence strategy must never silently substitute another action.

## 7. Evidence puzzles

Puzzles evaluate reasoning rather than trivia. All necessary clues appear before the relevant choice. Wrong submissions provide feedback and allow retry without meter penalties.

| ID | Material | Required reasoning and solution | Reward |
|---|---|---|---|
| P1: Poppet provenance | Poppet, needle, Mary's account, accusation record | Order the game's supplied events: Mary makes the poppet and places the needle while sewing; the poppet reaches Elizabeth; the object is later interpreted as evidence against her. Select “possession alone does not establish intent.” Verify scene details against the play before authoring final wording | `poppetProvenance=true`; unlock a sourced challenge |
| P2: The land ledger | Giles's allegation, a property-interest note, and a court claim | Classify each item as observation, allegation, or inference. Correct conclusion: a possible material motive merits scrutiny but is not proved solely by the allegation. The ledger itself is an invented visualization | `landMotiveExamined=true`; expose the difference between motive and proof |
| P3: The closed circle | Original paraphrases of court rules and a defense statement | Connect the rule that accusation establishes suspicion with the rule that defending the accused creates suspicion. Identify that the procedure treats counterargument as confirmation, preventing meaningful disproof | `courtContradiction=true`; unlock the informed final refusal |

Three hint levels per puzzle: direct attention → explain the relationship → show the solution with reasoning. Hints do not invalidate an ending. The walkthrough must list exact submissions, not merely say “solve the puzzle.”

## 8. Endings and fairness

| Ending | Trigger | Meaning |
|---|---|---|
| Condemned | R reaches 0 before another ending | Public rejection is not proof of wrongdoing |
| Town Rupture | H reaches 100 | Protective individual choices can accumulate into collective destruction |
| A Name Preserved | Reach the final refusal with all three puzzle flags, no false accusation, no signed false confession, R>0, H<100 | Successful moral escape; Proctor's tragic fate is acknowledged without a graphic depiction or a claim that he physically escapes |
| Within the System | Reach the last card without meeting resistance conditions, or accept the final false confession | Material survival or opposition without full resistance; epilogue must distinguish the actual actions rather than label all such routes equally |

Final informed refusal is available when all resistance prerequisites are satisfied. When they are not, the refusal choice remains possible but leads to a specifically written unresolved-resistance variant of Within the System. Warn in the journal when a prior false accusation has closed the clean resistance route; allow chapter replay.

Before content is declared complete, the agent must enumerate or search the deterministic decision graph and save at least one witness route to each ending. Prove the resistance route uses no false accusations, survives every intermediate threshold, and does not require debug state. Tune card effects until this holds. At least one single-choice mistake must remain recoverable. Avoid a single exact click sequence as the only viable resistance route.

Chapter replay restores the chapter-start state and discards later history. Restart clears run data only after an explicit user action. No timed decisions and no random meter effects.

## 9. Complete symbolism and parallel register

These are intentional design interpretations, not claims that Miller assigned these exact meanings or colors. Every later meaningful design addition must extend this register. Purely practical decisions may be marked “functional; no symbolic claim.”

| ID | Choice | Symbolism or parallel | Implementation |
|---|---|---|---|
| S01 | Title: The Weight | Pressure of judgment, accumulated complicity, and an echo of Giles's pressing | Title, journal accumulation, late-game explanation; no physical-pressure minigame |
| S02 | Charcoal `#171719` | Institutional enclosure and restricted agency | Background and court frame; never a moral coding of skin or people |
| S03 | Parchment `#F2E6CC` | Written testimony appears durable and authoritative even when unreliable | Evidence cards; distinguish claim from fact in labels |
| S04 | Oxblood `#8B2936` | Accusation, danger, and the human cost of panic | Accusation stamp and danger borders; pair with text/icon |
| S05 | Tarnished gold `#B58A45` | Reputation, status, and the temptation of institutional approval | Reputation emblem; no implication that gold means ethically correct |
| S06 | Muted blue `#6F9CAB` | Examination, doubt, and distance from immediate panic | Inspect and evidence links; evidence can still be incomplete |
| S07 | Bone white `#FAF5E9` | The court's claimed purity, undercut by its actions | Court seals; do not use universal white=good coding |
| S08 | Ember amber `#C87738` | The crucible as a vessel of heat and testing | Subtle frame near crisis; no triumphant purification imagery |
| S09 | Restrained dawn color at resistance ending | Internal clarity within continuing loss | Slightly warmer light; do not remove bars or suggest physical rescue |
| S10 | Hidden numbers | Citizens cannot fully measure public judgment | Qualitative warnings remain clear; reveal arithmetic after play |
| S11 | Reputation separate from integrity | Social approval is not moral worth | Harmful actions can increase R |
| S12 | Short-term rewards for accusation | Self-preservation reproduces the system | R rises while H rises; consequences name affected characters |
| S13 | Two action buttons | Danforth's coercive binary framing | Evidence changes what can be argued inside that frame |
| S14 | Evidence inspection | Critical reading interrupts automatic acceptance | Inspect before judging; no “evidence solves everything” ending |
| S15 | Poppet and needle | An ordinary domestic object becomes incriminating through interpretation | P1; no supernatural animation |
| S16 | Land ledger | Private economic interest may hide behind public righteousness | P2; mark ledger as invented and motives as alleged |
| S17 | Signed confession and name | Institutional control over identity and public memory | Final desk and explicit sign/refuse choice; a signature is not a magic key |
| S18 | Court seal | Procedure can lend authority to unsupported claims | Repeated stamp; classify claims separately from verified evidence |
| S19 | Jail bars and narrowing margins | The loss of options under institutional pressure | Decorative borders only; never reduce legibility or hit targets |
| S20 | Candle | Fragile access to understanding | Inspection motif; never a countdown |
| S21 | Accumulating ink marks | Past decisions persist and acquire weight | Journal consequences remain visible; avoid branding the player as shameful |
| S22 | Repeated accusation cards | Rumor can gain apparent credibility through repetition | Repeat an identifiable claim with its original source retained |
| S23 | Gradually layered murmurs | Collective fear overwhelms individual voices | Optional audio; captions communicate the same state |
| S24 | Misaligned decorative court text | The institution's stable appearance fractures | Mild optional motion outside readable text; disabled by reduced motion |
| S25 | Silence at the confession desk | A private conscience confronts public demands | Fade ambience; do not remove needed captions or feedback |
| S26 | Serif headings and plain body text | Official formality versus accessible examination | Restrained serif titles, readable body text; no ornate handwriting for clues |
| S27 | Changing Hale dialogue | Authority can recognize its own failure | Show a shift in reasoning, not a savior who resets the system |
| S28 | Mary's changing testimony | Group pressure can overcome private knowledge | Consequences distinguish coercion from factual reliability |
| S29 | Abigail's threats | Fear can be used strategically to create conformity | Dialogue and card framing; trauma does not excuse or mechanically cause cruelty |
| S30 | Elizabeth and John's trust | Private relationships are distorted by public suspicion | Domestic scene and confession reflection; avoid a “trust meter” that quantifies love |
| S31 | Rebecca's vulnerability | Innocence alone offers little protection in a corrupt process | No automatic immunity mechanic |
| S32 | Court logic as a “matrix” | A self-reinforcing account of reality limits what can count as truth | P3 and changing journal interpretation; no literal simulation reveal |
| S33 | Salem and McCarthyism | Accusation, compelled naming, and guilt by association are recurring mechanisms | Postgame contextual panel; verify historical wording before release |
| S34 | Modern rumor circulation | Repetition, reputational sanctions, and group alignment resemble some online dynamics | Debrief comparison with explicit limits; criticism is not automatically persecution |
| S35 | Achievable but tragic resistance | Ethical agency can survive without institutional victory | A Name Preserved; clearly separate game success from physical survival |
| S36 | Replay with a visible decision history | Reflection can reveal participation in harmful systems | Compare choices and consequences without a global “good person” score |

The color values are palette tokens, not approved foreground/background pairs. Validate actual text contrast; adjust token shades if needed and record the accessibility reason without inventing new symbolism.

### Parallel limits

The debrief must explain that Salem executions, twentieth-century political persecution, and online disputes differ in power, process, scale, and consequences. The comparison concerns mechanisms, not an assertion that the events are equivalent. Present Miller's dramatic representation separately from historical Salem.

## 10. Quotations and source validation

The PDF proposes five direct quotations. Preserve five slots, but treat its transcriptions as provisional. The attached document is the source of the proposal, not independent verification of Miller's text.

| Slot | Proposed passage, identified without full transcription | Final placement |
|---|---|---|
| Q1 | Proctor's soul/name passage | Confession scene and debrief; explain that the passage expresses resistance, not endorsement of lying |
| Q2 | Abigail's account of violence against her parents | Optional contextual panel in Chapter I; retain content notice and skip control |
| Q3 | Proctor's children/keys/vengeance passage | First crossing of H=80, or court debrief if never crossed |
| Q4 | Danforth's with-the-court/against-it statement | Court binary puzzle; no third neutral story button is needed |
| Q5 | Proctor's challenge to the accuser's presumed holiness | First false accusation consequence, or relevant debrief if never triggered |

The implementation agent must obtain the assigned edition or a reliable licensed text and verify exact wording, speaker, act, punctuation, and context. Record edition and page only when actually checked; otherwise use act references and flag the page as unverified. Keep unavailable text as a clearly marked development placeholder. Do not invent quotations or substitute paraphrases labeled as quotes. Source verification is a release gate, not a reason to stop scaffolding or mechanics development.

Each narrative entry must have `basis: canonical | interpretation | invented`, `actReference`, and a short source note. The final symbolism page must expose these distinctions. Include attribution to Arthur Miller and identify the game as an unofficial educational adaptation.

## 11. UX and accessibility

- Main screen: chapter heading, qualitative status, speaker and card, inspectable evidence, two choice buttons, journal and settings.
- Show consequences before advancing; prevent double submission while transitioning.
- Use descriptive choice labels such as “Question the source of the accusation,” never vague “good/bad” labels.
- All actions work with Tab, Enter/Space, and visible focus. Swiping is optional; buttons always remain available.
- Use semantic HTML, meaningful headings, labeled dialogs, focus restoration, and polite live announcements for consequences.
- Never communicate danger, evidence type, or success by color alone.
- Text remains usable at 200% zoom and at a 360px-wide viewport. Aim for 44px touch targets.
- Meet WCAG AA contrast targets in tested combinations; reduced-motion and mute controls persist.
- Avoid flashing. Audio starts only after interaction and is never necessary to solve a puzzle.
- Content note: coercion, false accusations, imprisonment, and references to execution; no graphic violence.
- Symbolism explanations are spoiler-gated during play; the full register and ending audit are available afterward or through an explicit reveal control.

## 12. Technical plan

Use TypeScript, React, and Vite for the client, plain CSS tokens, Vitest for state/route tests, and Playwright for browser flows. This is a chosen implementation direction, not a claim about current package versions. The coding agent must select compatible available versions, record the runtime version, and commit one package-manager lockfile.

No backend or secret keys. Keep all narrative and rules local. Prefer original CSS/SVG object illustrations with documented asset provenance.

Suggested structure:

```text
README.md
AGENTS.md
package.json
docs/
  PRD.md
  HANDOFF_PROTOCOL.md
  COMMANDS.md
  PLAYBOOK.md
  STATUS.md
  DECISIONS.md
  SYMBOLISM.md
  SOURCES.md
  WALKTHROUGH.md
  handoffs/
src/
  engine/          # pure state transitions and ending resolution
  content/         # cards, evidence, quotations, symbolism registry
  components/
  styles/
  persistence/
tests/
  unit/
  routes/
  e2e/
```

Minimum card contract: `id`, `chapter`, `speaker`, `body`, `evidenceIds`, two `choices`, `symbolismIds`, and `sourceNote`. Each choice includes `id`, `label`, declarative requirements/variants, exact deltas, flags, consequence, and next-card ID. Validate all references and unique IDs at build/test time.

Use a pure transition function; content must not mutate global state or contain arbitrary executable expressions. Serialize a versioned save after every completed transition. Restore without repeating effects. On corrupt or incompatible saves, explain the issue and offer a new game. Storage failure must not prevent in-memory play.

## 13. Repository initialization and command contract

Before adding files, inspect the workspace and existing instructions. Reuse an existing repository if present; never overwrite unrelated work. Put this specification at `docs/PRD.md` without silently changing its requirements.

The initial agent session must produce the documentation below and a runnable one-card skeleton. The following are required command interfaces to implement and verify; they are not claims that commands already exist:

```bash
npm ci
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
npm run test -- --run
npm run test:routes
npm run test:e2e
npm run check
```

`check` runs lint, type checking, unit tests, route tests, and production build. Document browser installation separately for end-to-end tests. On initial scaffold use the package installation needed to create the lockfile; subsequent clean installs use `npm ci`.

`COMMANDS.md` must state command purpose, working directory, prerequisites, actual observed result, and common recovery steps. Do not describe an unrun check as passing.

## 14. Handoff protocol the coding agent must generate

Create `AGENTS.md` as a short entry point telling a future session what to read, how to run checks, and which requirements must remain stable.

### Start of every session

1. Read `AGENTS.md`, `docs/STATUS.md`, the latest handoff, and the current playbook session.
2. Inspect branch, current commit, and uncommitted changes. Preserve work belonging to others.
3. State the intended session deliverable and check prerequisite gates.
4. Run the smallest baseline check that establishes the area being changed is usable.

### End of every session

1. Complete a coherent increment or clearly identify what is incomplete.
2. Run relevant checks; record exact commands and observed results.
3. Update status, decision log, source status, and symbolism registry when applicable.
4. Write `docs/handoffs/session-NN.md` with the fields below.
5. Record a commit when available and appropriate; never invent a commit hash or imply uncommitted work is saved in Git.

Required handoff fields: session objective; completed work; changed files; branch/commit and dirty state; commands/results; working user flow; known issues and reproduction; unresolved source checks; decisions and rationale; next three concrete actions; acceptance criteria still unmet.

Keep `STATUS.md` brief and authoritative. Store detailed history in handoff files. A future session must be able to resume without access to this conversation.

## 15. Multi-session implementation playbook

The agent should expand this into `PLAYBOOK.md` with checklists, dependencies, and verification commands. Session boundaries describe coherent deliverables, not mandatory delays or new user approvals.

| Session | Deliverable | Exit gate |
|---|---|---|
| 01 — Foundation | Repo scaffold, documentation, tokens, one working card | Clean install, dev view, typecheck and build pass |
| 02 — Engine | Meter rules, flags, endings, journal events, versioned saves | Transition order, double-submit protection, save/load and terminal tests pass |
| 03 — Complete narrative | All 16 cards, character voices, source/basis metadata, quote slots | Every card reachable; references valid; invented material labeled |
| 04 — Evidence and balance | Three puzzles, hints, conditional responses, four endings | Solver produces ending witnesses and at least two resistance routes; recoverable mistake demonstrated |
| 05 — Visual rhetoric | Object art, palette, court pressure, audio alternatives, symbolism view | Every meaningful symbolic choice maps to a register ID; motion and sound optional |
| 06 — Classroom readiness | Source verification, responsive and keyboard QA, browser flows, full walkthrough | Release checklist below passes; remaining limitations stated |

If source access blocks Session 06, finish all available functionality and report exactly which quotation or claim remains unverified. Do not mark the release complete.

## 16. Acceptance tests and definition of done

### Mechanics

- R=0 triggers Condemned; H=100 triggers Town Rupture; simultaneous thresholds follow specified precedence.
- A choice updates state once, including after save/load and rapid repeated clicks.
- Evidence inspection and hint use do not change meters or invalidate resistance.
- All four endings have saved, reproducible witness routes.
- At least two distinct valid resistance routes exist, and one nonterminal mistake can be recovered from.
- No card depends on an unavailable item to advance; graph traversal detects unreachable cards and dead ends.
- A final sign/refuse interaction cannot bypass threshold endings.

### Narrative and symbolism

- All 16 cards and three puzzles are present with meaningful consequences.
- Every named speaking character comes from the play; no invented protagonist replaces John.
- All five quotations are verified or the release is explicitly marked incomplete.
- Object references, scene adaptations, and historical parallels distinguish fact, interpretation, and invention.
- Every register ID used in content resolves; every S01–S36 choice is implemented or explicitly deferred with a reason.
- Documentation and in-game symbolism content come from one maintained register to prevent drift.
- The ending audit explains consequences without claiming survival equals goodness or death equals failure.

### Usability and delivery

- A player can complete the game using only a keyboard and also on a narrow touch viewport.
- Reduced motion, mute, readable contrast, focus handling, and non-color status cues are verified.
- Refresh resumes the correct state; corrupt/blocked storage has a usable fallback.
- A fresh checkout installs and builds using documented commands.
- No runtime service credentials or external AI dependencies are required.
- `README.md` includes setup, controls, content note, adaptation statement, and links to walkthrough and symbolism.
- The final handoff identifies what was tested, the result, and any remaining limitations.

## 17. Instruction to the implementing agent

Start with Session 01. Make routine technical decisions autonomously and log them. Preserve the literary argument, solvability, and exhaustive symbolism record. Before expanding scope, finish the complete playable loop. Add every new symbolic or parallel choice to the shared registry with its purpose, literary basis, implementation location, and verification status. Do not silently turn the game into a trivia quiz, a generic escape room, or a story in which finding one clue makes the court just.
