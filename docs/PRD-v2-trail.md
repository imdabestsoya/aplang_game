# The Weight: The Salem Trail

## Product requirements document — 2D 8-bit edition

Version: 2.0 · Status: implementation specification · Date: October 2, 2026

## 1. Instruction to the coding agent

Build a complete browser game that reimagines **The Weight**, an educational adaptation of Arthur Miller's *The Crucible*, as a **2D, 8-bit-style travel and survival game inspired by The Oregon Trail**.

Travel, preparation, supplies, changing conditions, and encounters must drive play. This is a replacement for the earlier card-first design, not a pixel-art skin over a sequence of dialogue cards. The player should regularly see John Proctor and his horse cart moving through a pixel landscape, choose how to travel, arrive at playable landmarks, manage resources, and face consequences carried forward from earlier decisions.

Use this document to initialize or adapt a repository and create `AGENTS.md`, a handoff protocol, a command reference, and a multi-session playbook. This document is self-contained; the earlier PRD is background only. The current task is specification creation, not evidence that a game, repository, or deployment already exists.

**Working title:** The Weight: The Salem Trail.
**Genre:** turn-based journey survival, narrative exploration, and evidence puzzles.
**Target:** desktop browser with keyboard and mouse; responsive touch controls.
**Length:** 25–40 minutes for a first run; 10–20 minutes for replay.
**Audience:** high-school readers and an AP Lang classroom.

## 2. Creative direction and sources

Inputs are the supplied `Crucible Project Brainstorming(1).pdf`, the earlier `The_Weight_PRD.md`, and the request to turn the entire game into a 2D 8-bit game inspired by *The Oregon Trail*.

Retain the themes of reputation, resentment, fear, coerced judgment, integrity, and escape from a system that manufactures its own truth. Retain characters and important objects from Miller's play. Replace the original four-chapter card loop with four journey acts, five travel legs, six landmarks, and a final jail sequence.

The design borrows the general idea of preparing for a journey, choosing pace and supplies, crossing obstacles, and surviving consequential encounters. Use original code, pixel art, music, interface composition, event writing, and title treatment. Do not copy a specific Oregon Trail game's assets, text, maps, soundtrack, or screen layouts.

“8-bit” specifies an aesthetic: crisp low-resolution sprites, a restricted palette, simple animation, and sparse chiptune sound. It does not require emulating historical hardware.

### Literary framing

This is a **fictional journey through Miller's Salem**, not a claim that John took this route with these supplies. The itinerary, horse cart, route lengths, days, logistics, and some meetings are invented to express the play's conflicts. An opening note and the source ledger must say so.

The goal is to reach the court with a considered understanding of the accusations, then confront its demand for conformity. The final jail scene follows a clearly labeled time jump. Finding evidence does not erase the trial, automatically save Elizabeth, or make Danforth admit error. Moral resistance can be a successful outcome without physical escape.

Do not reproduce westward settlement, frontier conquest, caricatured Indigenous enemies, actual witchcraft, or a literal computer-simulation reveal. The connection to “escaping the matrix” is recognizing and resisting a self-reinforcing system of belief.

## 3. Product pillars

1. **A journey you can see:** original animated sprites, scrolling travel scenes, a branching route map, and small explorable landmarks.
2. **Preparation matters:** food, stamina, money, cart condition, pace, and time create clear tradeoffs.
3. **Pressure has two forms:** visible physical scarcity and partly hidden social judgment.
4. **Reasoning matters more than reflexes:** inspect objects, compare testimony, and choose what to repeat or challenge.
5. **Challenging but solvable:** no unavoidable random death, invisible instant-failure traps, or requirements to memorize the play.
6. **Every rhetorical choice is explainable:** the game and documentation share a complete symbolism register.

## 4. MVP scope

### Required

- One playable protagonist: John Proctor; one original horse-and-cart sprite set.
- Four narrative acts, five travel legs, six explorable landmarks, and a final jail scene.
- Two route alternatives per travel leg; both converge at the next required landmark.
- At least 16 mandatory narrative encounters, distributed four per act.
- Eight reusable travel-event templates with bounded, reproducible scheduling.
- Three reasoning puzzles, one scripted crossing obstacle, one trading interface, and rest/repair actions.
- Visible food, stamina, coins, condition, day, and progress; qualitative Reputation and Hysteria.
- Five ending families, including physical journey failure and moral resistance.
- Save/resume, landmark checkpoints, replay, journal, hints, and a complete symbolism/debrief view.
- Original pixel art and audio or original placeholder assets with an explicit replacement plan.
- Five verified quotation slots, source tracking, tests, walkthrough, and agent documentation.

### Excluded

Combat, hunting/shooting, platform jumping, reflex-based river crossings, real-time survival timers, individual companion death simulation, procedural worlds, multiplayer, accounts, backend services, paid APIs, and generative dialogue. Do not expand into a large open world.

## 5. World, route, and characters

The map is schematic and explicitly not to geographic scale. “Route units” measure game progress; do not present them as historical miles. Day numbers measure this invented journey and are not dates of the actual proceedings.

| Act | Landmark and journey | Required narrative work |
|---|---|---|
| I — The Whisper | L1 Parris's house; leg 1 to L2 Proctor farm | Rumors, Parris's status concerns, Abigail's pressure, preparation |
| II — The Needle | L2; leg 2 to L3 meetinghouse yard; leg 3 to L4 disputed field boundary | Elizabeth and Mary, poppet provenance, Rebecca's vulnerability, Giles's allegation |
| III — The Court Road | L4; leg 4 to L5 court approach; leg 5 to L6 courtroom | Land reasoning, pressured witnesses, Danforth's rules, closed-circle puzzle |
| IV — The Name | Court aftermath and jail after a labeled time jump | Hale's doubt, consequences of prior accusations, Elizabeth's perspective, final confession |

For each leg: the public road is **4 route units** and imposes **R−3 on arrival**, representing official scrutiny. The wooded detour is **6 route units**, with no automatic reputation cost. Neither route skips essential evidence or landmarks. The detour costs more time and food but can preserve public standing. State these forecasts before departure.

The crossing occurs once on leg 3. Place the same authored obstacle on both alternatives, with different scenery if useful. This is a structural game choice, not a geographic claim.

### Named cast

| Character | Role and boundary |
|---|---|
| John Proctor | Player; compromised reputation and agency; not an uncomplicated hero |
| Elizabeth Proctor | Domestic trust and final reflection; not a passive collectible or party statistic |
| Mary Warren | Poppet testimony and vulnerability to pressure |
| Abigail Williams | Coercive accusation; do not make trauma an automatic cause of cruelty |
| Reverend Parris | Public standing and institutional self-protection |
| Reverend Hale | Learning and doubt without the power to reset the system |
| Giles Corey | Land allegation and resistance; claim is not proof |
| Thomas Putnam | Alleged material interest; do not assert every allegation as established fact |
| Rebecca Nurse | Integrity without guaranteed protection |
| Deputy Governor Danforth | Institutional authority and the trap of binary loyalty |

Named speaking characters must come from the play. A generic supply counter may use interface text without inventing a named speaking merchant. Encounter locations and temporary character appearances must be marked as adaptations. Do not put the entire cast in a traveling party or permit random deaths that contradict the story.

## 6. Main gameplay loop

1. At a landmark, explore a small tile map, inspect objects, speak to characters, and view supplies.
2. Pick the next route and view its length, scrutiny, and obstacle forecast.
3. Select pace and ration policy; optionally trade, rest, or repair where available.
4. Press **Travel one day**. Animate the cart for 3–5 seconds, then resolve one atomic turn.
5. If an encounter occurs, pause for two or three clearly labeled actions and show the consequence.
6. Update the route, resources, journal, social feedback, and save.
7. Arrive at the next landmark when remaining route distance reaches zero; resolve arrival costs once.
8. At the courtroom, complete required proceedings; transition to the final act and confession decision.

Animation is presentation only. Time never passes while reading, walking around a landmark, inspecting, solving puzzles, or using menus. Travel animation can be skipped without changing the result.

World movement uses arrows/WASD, interaction uses E/Enter, and menu controls are visible. Optional touch direction controls accompany a visible Interact button. Provide a keyboard-accessible list of interactable objects as an alternative to precise sprite navigation.

## 7. Resource rules and balance contract

These are implementation starting values, subject to logged tuning and route verification. Do not call them balanced until simulations and playtesting support that claim.

| Resource | Initial | Bounds and meaning |
|---|---:|---|
| Food | 24 portions | Integer 0–40; John and horse combined abstraction, explicitly not a nutritional model |
| Stamina | 80 | 0–100; ability to continue, not moral courage |
| Cart condition | 90 | 0–100; equipment readiness |
| Coins | 12 | Nonnegative integer; invented generic currency units |
| Repair kits | 2 | Integer 0–4 |
| Reputation R | 65 | Hidden 0–100, with qualitative labels |
| Hysteria H | 25 | Hidden 0–100, with qualitative labels |
| Day | 1 | Increases only on travel, rest, or delay days |

### Travel pace

| Pace | Progress/day | Stamina change | Condition change |
|---|---:|---:|---:|
| Careful | 1 unit | −2 | 0 |
| Steady | 2 units | −5 | −2 |
| Forced | 3 units | −12 | −5 |

Progress is capped at remaining distance. A short final travel day still pays the full daily cost, disclosed in the forecast.

### Rations

- Full: consume 2 portions per advancing day; no additional stamina penalty.
- Sparse: consume 1 portion per advancing day; stamina −4 in addition to other costs.
- When the selected ration cannot be afforded, block confirmation and offer an explicit alternative. Going without food consumes 0 and costs an additional 12 stamina; never silently switch policies.
- Rest: consume the chosen ration, add one day, recover 16 stamina before the ration modifier. No movement or cart damage. Hysteria still advances.
- Repair: spend one kit to recover 25 condition, capped at 100; available only at landmarks and costs no day. Limited kits prevent infinite repair.
- Trade at L2 and L3: 1 coin buys 3 food, 3 coins buy one repair kit. Purchases are capped by inventory capacity and money. No selling loop, credit, or negative balances. Supply access never requires accusing someone.

Every advancing day adds H+2. No day cost for mandatory dialogue or puzzles. On reaching the court, travel systems freeze permanently; prison scenes do not keep consuming food or raising H for elapsed reading time.

### Social rules

Qualitative R: 1–24 Under suspicion; 25–49 Watched; 50–74 Accepted; 75–100 Favored. H: 0–24 Uneasy; 25–49 Rumors spreading; 50–79 Fear governs; 80–99 Near rupture. Always use text and an icon, not color alone.

Initial encounter templates: repeat an accusation R+7/H+8; unsupported defense R−7/H−1; sourced challenge R−3/H−5; reserve judgment R−2/H+1. Authors may vary these values with an explicit reason and exact per-choice data. The mandatory final refusal has no meter delta; classify the ending from the state already reached.

No morality meter. Record specific flags such as `falseAccusation`, `poppetUnderstood`, `landExamined`, `courtContradiction`, and `signedFalseConfession`. Show when an action closes the clean resistance route, with an opportunity to return to a checkpoint. Hints never invalidate success.

## 8. Obstacles, encounters, and randomness

### One scripted crossing

At leg 3, a damaged bridge offers:

- Wait for repair: one delay day, chosen rations, H+2, no movement or pace damage.
- Hire assistance: spend 3 coins and cross without extra time or damage.
- Take the shallow ford: condition −10 and stamina −5, no extra day.

All costs are visible. The obstacle resolves once and then travel continues. No probability of drowning and no reflex test. If no choice is survivable, offer the last landmark checkpoint instead of a disabled-action dead end.

### Eight travel-event templates

| Event | Choice pattern | Bounds |
|---|---|---|
| Rain on the road | Protect supplies or protect cart | At most 2 food or 4 condition lost |
| Loose wheel | Stop and brace it or continue carefully | At most 4 stamina or 5 condition lost |
| Rumor posted at a crossroads | Repeat it or question its source | Social effects, no forced accusation |
| Official inspection | Show records or accept extra scrutiny | At most R−4; evidence never destroyed |
| Neighbor's request for food | Share 2 portions or decline | No penalty for declining when unable to afford it |
| Conflicting accounts | Record separately or repeat the dramatic version | Provenance lesson; no arbitrary trivia |
| Shelter offered | Rest using the normal rest rule or continue | Cannot repeatedly trigger free recovery |
| Clear weather | Continue with a modest boost or preserve routine | At most +3 stamina; never essential for success |

Each template must receive exact prerequisites, choices, effects, cooldown, and narrative/source metadata during content authoring.

**MVP scheduling:** provide eight named itinerary variants. Each chooses at most three optional travel events for the entire run, no more than one per leg, triggered at fixed progress thresholds. A seed selects a variant; it does not roll repeatedly each day. Required story encounters remain fixed. This bounds possible bad luck and makes every supported schedule testable. Save the variant and triggered-event IDs; reloading cannot reroll.

Optional events must not remove unique evidence, force lies, or cause instant terminal failure with no safe choice. Filter out events whose choices are all fatal, and log the deterministic skip. No events during rest loops or jail scenes. A future fully procedural mode is outside MVP.

## 9. Exploration and evidence puzzles

Landmarks are small, single-screen top-down maps, approximately 20×12 tiles, with 3–5 obvious interactable objects each. Travel uses a side view. This combination provides visible journeys and manageable exploration without open-world scope.

Evidence is stored in a separate permanent journal, never in consumable cargo slots. Critical clues cannot be sold, eaten, damaged by weather, or permanently missed. Before leaving, warn about unexamined essential clues and permit inspection; a summary becomes available in the journal afterward.

| Puzzle | Interaction and correct reasoning | Effect |
|---|---|---|
| Poppet and needle | Inspect Mary's account, the poppet, and the accusation. Order the supplied sequence and distinguish possession from proof of harmful intent | Sets `poppetUnderstood`; unlocks sourced dialogue |
| Land and motive | Compare Giles's allegation with an invented property ledger; classify observation, allegation, and inference | Sets `landExamined`; possible motive is not proven guilt |
| Court's closed circle | Connect paraphrased rules that treat accusation as suspicion and defense as further suspicion | Sets `courtContradiction`; recognizes a procedure that resists disproof |

Verify the underlying scenes against the assigned play before final authoring. The ledger is an invented representation, clearly labeled. Puzzle interfaces use buttons/selectors as alternatives to drag-and-drop. Wrong answers have feedback and unlimited retries without survival penalties. Hints progress from attention cue to explanation to full solution.

## 10. Endings and evaluation order

| Ending | Trigger | Interpretation |
|---|---|---|
| The Road Ends | Stamina or cart condition reaches 0 before court arrival | Journey failure, never proof of moral failure; non-graphic checkpoint/retry screen |
| Condemned | R reaches 0 | Public standing is not evidence of wrongdoing |
| Salem in Rupture | H reaches 100 | Accumulated fear defeats the community |
| A Name Preserved | Final refusal; three puzzle flags; no false accusation or signed false confession; no terminal threshold | Moral success, with the play's tragic outcome acknowledged |
| Within the System | Final signing or any other nonterminal final outcome | Distinct epilogues for survival through confession and resistance after earlier compromise or incomplete understanding |

Do not pretend that failing to solve a puzzle makes a person immoral. The debrief explains understanding, choices, and harm separately. Refusal is always selectable, even when it does not meet the clean resistance conditions.

Transaction order: validate → apply the chosen action and daily costs → apply one pending event choice when required → apply arrival costs when applicable → clamp → record → evaluate thresholds → save stable state. Persist a pending event before showing it so refresh cannot repeat daily costs. While waiting for an event response, no additional actions may advance time.

Resolve thresholds after daily base costs and again after any event or arrival effect. Precedence for simultaneous thresholds: H=100, then R=0, then physical failure. Stop processing subsequent queued effects when a terminal state is reached. On surviving court arrival, freeze physical systems and proceed to narrative resolution. Record all simultaneous causes in the ending audit.

Checkpoints at each landmark restore the full state, schedule, flags, and RNG/variant identity, discarding later history. No silent restart or forced replay from the opening.

## 11. Art and sound specification

- World canvas: 320×180 logical pixels, nearest-neighbor scaling. Use integer scale and letterboxing where space permits; narrow viewports may fit proportionally without smoothing.
- Tiles: 16×16 pixels. Character sprites: 16×24 or 16×32. Portraits: 48×48. Horse/cart: up to 64×40. These are chosen production constraints, not historic hardware requirements.
- Walk cycles: 4 frames; idle: 2 frames; no need for complex skeletal animation.
- Travel scene: dirt road, changing fences and trees, skyline, cart, and subtle depth through separately scrolling background layers.
- Landmark scenes: interactive pixel props and character sprites. No photographic backgrounds, glossy gradients, vector-smooth characters, or inconsistent asset resolutions.
- UI: pixel-styled borders and heading font; readable scalable body font. Long dialogue and controls live in HTML, not tiny canvas text.
- Sound: original sparse chiptune travel motif, restrained wheel/hoof sounds, increased dissonance during hysteria, near-silence at the final desk. Avoid cheerful death jingles.
- Reduced-motion mode replaces travel motion with a static scene and progress update. Sound always optional; meaningful cues have text equivalents.

Required asset inventory: John directional sprites, nine other named-character sprite/portrait sets, horse/cart travel strip, road/woods/field tiles, six landmark backgrounds or tile maps, jail scene, resource icons, poppet, needle, ledger, candle, seal, and confession paper. The horse and cart are invented game equipment, not canonical objects.

## 12. Full symbolism and parallel register

Everything in this table is a deliberate game interpretation. It does not assert that Miller specified this palette or these mechanics. Maintain stable IDs in content, source documentation, and the in-game symbolism view. Any additional symbolic choice must be added before release; purely functional decisions may be marked as such.

| ID | Decision | Meaning, parallel, and implementation boundary |
|---|---|---|
| S01 | The Weight title | Judgment, complicity, and an echo of Giles's pressing; never turn his death into a weight-stacking game |
| S02 | Charcoal `#171719` | Institutional enclosure; backgrounds and court framing, not character morality |
| S03 | Parchment `#F2E6CC` | Written records look authoritative even when unreliable; journal and claim panels |
| S04 | Oxblood `#8B2936` | Accusation and human cost; stamps and danger accents with labels |
| S05 | Tarnished gold `#B58A45` | Approval and status are tempting but not identical to goodness; reputation icon |
| S06 | Muted blue `#6F9CAB` | Inquiry and reflective distance; inspect highlights, not guaranteed truth |
| S07 | Bone white `#FAF5E9` | Court's claimed purity; official seal, not universal white=good symbolism |
| S08 | Ember `#C87738` | Heat and moral testing suggested by the title of the play; crisis accents |
| S09 | Faint dawn after resistance | Clarity alongside tragedy; no open prison gate suggesting physical escape |
| S10 | Hidden social numbers | Uncertainty of public judgment; qualitative warnings and postgame numeric audit |
| S11 | Reputation separate from integrity | Approval can rise after harm; no good-person score |
| S12 | Accusation offers short-term relief | Self-protection spreads collective danger; exact consequences in journal |
| S13 | Two choices at the confession desk | Institutional binary demand; ordinary travel may have three options |
| S14 | Inspectable objects | Critical reading resists automatic judgment; evidence does not compel institutional fairness |
| S15 | Poppet and needle | Everyday domestic objects become incriminating through interpretation; no magical effect |
| S16 | Invented property ledger | Material interests may hide behind righteous language; allegation is not proof |
| S17 | Name and confession paper | Authority seeks control of identity and public memory; final sign/refuse interaction |
| S18 | Repeated court seals | Formal procedure gives claims apparent legitimacy |
| S19 | Narrowing courtroom scenery | Agency contracts; decorative perspective changes never shrink controls or text |
| S20 | Candle beside evidence | Fragile understanding; decorative, not a consumable clue timer |
| S21 | Accumulating journal marks | Past decisions persist; records describe acts without shaming the player |
| S22 | Same rumor at several stops | Repetition can masquerade as corroboration; preserve the original source |
| S23 | Layered noise and dissonance | Collective panic overwhelms individuals; textual equivalents and mute |
| S24 | Subtle court-border misalignment | Apparent certainty fractures; optional motion outside readable text |
| S25 | Silence at the final desk | Conscience confronts public demand |
| S26 | Pixel headings, readable prose | Evokes early computer journeys while preserving close reading; replaces prior serif-heading direction |
| S27 | Hale's changing position | Authority can recognize failure without undoing it |
| S28 | Mary's pressured account | Coercion can destabilize testimony; avoid equating fear with proof of dishonesty |
| S29 | Abigail's threats | Strategic use of fear; no reductive trauma-causes-evil mechanic |
| S30 | Elizabeth and John's dialogue | Public suspicion reshapes private trust; no numerical love meter |
| S31 | Rebecca remains vulnerable | Innocence is not institutional immunity |
| S32 | Closed-circle puzzle | Escape the court's constructed account of reality; no literal digital simulation |
| S33 | McCarthyism comparison | Naming others and guilt by association; historical context must be sourced |
| S34 | Modern rumor comparison | Amplification and reputational pressure; online criticism is not automatically persecution |
| S35 | Tragic moral success | Ethical agency and survival are different outcomes |
| S36 | Checkpoint replay and audit | Reflection exposes causal participation without erasing the completed run's explanation |
| S37 | Side-scrolling travel | Progress appears straightforward while moral choices complicate it |
| S38 | Forked routes that reconverge | Tactical freedom exists inside an institutionally constrained destination |
| S39 | Public road versus detour | Visibility invites scrutiny; avoiding scrutiny costs material resources |
| S40 | Food and coins | Survival needs make pressure concrete; scarcity does not excuse every betrayal |
| S41 | Cart condition | Institutions and journeys depend on vulnerable support; mechanical damage is never divine punishment |
| S42 | Forced pace | Haste preserves time while exhausting capacity for the journey; no real-time reading pressure |
| S43 | Rest increases elapsed time | Care has costs under spreading panic; useful recovery remains viable |
| S44 | Damaged crossing | Progress demands a visible tradeoff; no arbitrary dice decide moral worth |
| S45 | Map advances toward court | Geographic progress does not guarantee justice |
| S46 | Bounded travel variation | Circumstance changes the pressure without determining the player's ethics |
| S47 | Evidence separate from cargo | Testimony and people are not commodities; no selling truth for supplies |
| S48 | Gradually sparser scenery | Social isolation grows as proceedings tighten; maintain navigational clarity |
| S49 | Darkening sky with rising H | Public fear alters atmosphere; show the same information in words |
| S50 | Original 8-bit art | Simple visual forms leave space for difficult choices; does not trivialize the victims |
| S51 | Horse-cart journey in Salem | A new connective metaphor for burdens carried toward judgment; explicitly invented |
| S52 | Survival debrief rather than high score | The meaning of a run depends on who bears its costs, not only resources remaining |

Color tokens are palette targets, not automatically approved text pairs. Adjust contrast as needed and record accessibility adjustments. Diverse skin tones belong to a separate respectful character palette and carry no moral coding.

Explain the limits of parallels: Salem executions, twentieth-century political persecution, and modern online disputes differ in power, procedure, and consequences. Compare mechanisms without treating the events as equivalent. Separate Miller's drama from historical Salem.

## 13. Quotation and source requirements

Keep five slots from the brainstorming document: Q1 Proctor's soul/name passage; Q2 Abigail's account of her parents' deaths; Q3 Proctor's children/keys/vengeance passage; Q4 Danforth's with/against-the-court passage; Q5 Proctor's challenge to the presumed holiness of accusers.

Place Q1 at the confession scene, Q2 in optional early context with a content note, Q3 at the first H≥80 crossing or debrief, Q4 in the court puzzle, and Q5 after a false accusation or in the debrief. Display each trigger once per run. Skipping a quotation animation must not skip its game consequence.

Verify exact text, speaker, act, and context against an available assigned edition or reliable text before release. Do not invent page numbers or present new dialogue as Miller's writing. Development placeholders must be clearly labeled. The PDF's proposed quotations are not independently verified merely because they appear in the brainstorm.

Every encounter and important object needs `basis: canonical | interpretation | invented`, an act reference when relevant, a source note, and symbolism IDs. Record invented chronology and itinerary openly. Include Arthur Miller attribution and an unofficial educational-adaptation statement.

## 14. Accessibility and user experience

HTML controls and text accompany the visual world. A screen-reader user can select nearby interactions, travel, solve puzzles, and reach an ending without interpreting canvas pixels. Every essential world interaction has a named HTML equivalent.

Use visible keyboard focus, dialog focus trapping/restoration, readable text at 200% zoom, minimum 44px touch targets, and tested AA contrast. Never require dragging, sound, color recognition, precise sprite movement, or rapid reactions. Settings include mute, reduced motion, large text, instant dialogue, and visible numerical social meters as an optional assistance setting with no ending penalty.

The HUD shows current landmark/route, progress, day, supplies, condition, stamina, and qualitative social states. Before a day advances, show projected direct resource costs; identify optional event effects as unknown until encountered. Confirm severe knowingly selected risks with plain wording.

The journal contains testimony with provenance, puzzle progress, route history, action consequences, and hints. Symbolism explanations are spoiler-gated until requested or postgame. Content note covers false accusations, coercion, imprisonment, and non-graphic references to execution.

## 15. Architecture and data

Use TypeScript, React, Vite, and Canvas 2D for world rendering; React owns readable UI and menus. Use a pure TypeScript simulation independent of animation. This project needs no heavyweight physics system. Resolve compatible package versions during implementation and commit one lockfile.

Canvas consumes snapshots; it never owns survival state. Pausing, frame-rate changes, tab switching, or skipping animations cannot affect outcomes. Declarative content defines encounters and conditions without arbitrary executable expressions.

Minimum save fields: schema version, phase, act, landmark, leg, route, remaining distance, day, all resources, social state, flags, evidence, solved puzzles, visited interactions, event variant, fired event IDs, pending event transaction, action history, checkpoint, and preferences. Save after each stable transition and before a pending event is presented. Handle blocked storage with in-memory play and a clear notice. Reject incompatible saves with an explanation and restart option.

Content contracts:

- `Route`: ID, origin/destination, length, arrival effects, obstacle, event thresholds.
- `Encounter`: ID, mandatory/optional, conditions, dialogue, two or three actions, effects, source metadata, symbolism IDs.
- `Action`: ID, readable label, affordability, exact costs/deltas, flags, next phase.
- `Puzzle`: clues, accepted solution, feedback, three hint levels, result flag.
- `Symbol`: ID, decision, rationale, basis, implementation references, verification status.
- `Asset`: ID, path, dimensions, palette, license/creator, animation frames.

Suggested tree:

```text
README.md
AGENTS.md
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
public/assets/{sprites,tiles,portraits,audio}/
src/{engine,content,rendering,components,persistence,styles}/
tests/{unit,routes,e2e}/
scripts/
```

## 16. Repository and multi-session handoff

Inspect the workspace and its instructions before changing files. Reuse existing work when present. If adapting a built card game, retain useful narrative and pure rules but replace the primary presentation and loop. Archive the old PRD as `docs/PRD-v1-card.md`; make this version `docs/PRD.md`. Do not assume the requested GitHub repository exists or claim any remote push without performing it.

Generate `AGENTS.md` directing each session to read the active PRD, status, current playbook task, and latest handoff. Record implementation decisions without requiring a new conversation for routine choices.

Required command interfaces to implement and test:

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
npm run validate:content
npm run validate:assets
npm run check
```

`check` runs lint, typecheck, unit tests, route tests, content validation, asset validation, and build. Document any separate browser installation for end-to-end tests. Use the needed initial install to generate the lockfile; thereafter verify `npm ci` from a clean checkout. These commands are requirements, not claims of already implemented scripts.

At session end update `STATUS.md` and write `docs/handoffs/session-NN.md` containing: objective; completed work; files changed; branch/commit and dirty state; exact commands and observed results; working user journey; bugs with reproduction; source gaps; decisions; next three actions; unmet acceptance criteria. Never describe an unrun test as passing.

### Implementation playbook

| Session | Work | Exit gate |
|---|---|---|
| 01 — Foundation | Scaffold, documents, content schemas, pixel renderer, one landmark | Clean install/build; John appears and interacts with an object |
| 02 — Journey | Route map, cart animation, pace/rations, resources, arrival, rest/repair/trade | One complete travel leg works; animation skip preserves outcome |
| 03 — Encounters | Atomic turn resolution, crossing, event variants, flags, social state, save/load | Reload during pending event does not double-charge or reroll |
| 04 — Story | Six landmarks, four acts, 16 mandatory encounters, three puzzles, jail transition | Full run possible with placeholder assets and source metadata |
| 05 — Balance | Five endings, checkpoints, simulation, multiple viable strategies | All eight variants solvable; diverse resistance routes and recoverable mistake demonstrated |
| 06 — Art and sound | Complete original assets, palette, animation, chiptune, atmosphere | Consistent pixel grid; asset manifest and S01–S52 implementation mapping |
| 07 — Classroom release | Source/quote verification, accessibility, browser QA, debrief, walkthrough | Release gates below pass or specific blockers are documented |

## 17. Acceptance criteria

### The redesign is real

- Travel, route choice, preparation, and physical resources determine progress and consequences.
- Player and cart are visible in original animated pixel scenes, and landmarks support exploration.
- Main play is not a stack of reskinned cards. Dialogue opens within the journey context.
- All five travel legs, six landmarks, four acts, 16 mandatory encounters, and three puzzles are implemented.

### Logic and fairness

- For each of the eight supported event variants, an automated search finds at least two distinct successful resistance routes differing in route or pace decisions, without debug overrides or false accusations.
- At least one viable route uses a detour and one uses a public road. Rest and trading are demonstrably useful; forced pace is not universally optimal.
- Each ending has a reproducible witness route. At least one nonterminal logistics mistake is recoverable.
- A no-food day, exhausted character, broken cart, simultaneous thresholds, unaffordable trade, and short final leg day follow specified rules.
- Daily costs, obstacle effects, and arrival scrutiny each apply once. Save/load at a pending event preserves this.
- No event destroys critical evidence, forces an accusation, or removes all survivable choices through chance.
- No softlocks: failure leads to explanation and checkpoint replay; optional missed clues remain available.
- Final prison scenes do not continue physical resource depletion.

### Presentation and access

- Pixel art scales crisply; all mandatory UI remains readable on a 360px viewport and at 200% zoom.
- Keyboard, touch, screen-reader alternatives, reduced motion, and mute support a complete run.
- Skipping animation or lowering frame rate never changes the simulation.
- A representative first-time playtest targets 25–40 minutes; record observed completion time rather than asserting it.

### Literary and delivery quality

- All five quote slots are verified before release; unverified material is explicitly blocked, not fabricated.
- Canonical references, interpretation, and invention are distinguishable.
- All S01–S52 entries resolve to implementation and appear in the complete debrief; new symbolic choices are documented.
- Source, asset, walkthrough, command, handoff, and status documents are complete.
- Fresh install, checks, production build, and core browser flows pass with recorded results.

## 18. Definition of the intended experience

The player should leave remembering a journey where every day consumed something, each road exposed a different pressure, and arriving at the court was not the same as reaching justice. The final choice should connect practical survival to the larger question the game has been asking: what happens when preserving your standing requires accepting a system that harms others?
