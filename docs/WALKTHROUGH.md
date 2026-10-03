> **Premise update (2026-10-03):** This document contains historical card/travel checks. The active game is [Town Judge](PRD.md); use its [handoff](handoffs/town-judge.md) for current verification. Old route and supply checks are not release requirements for the judge game.

# Walkthrough

## Trail migration scope — 2026-10-02

The routes below describe the existing card game. Trail walkthroughs will be authored in Sessions 10–11 after real simulation witnesses exist; do not use old routes as v2 proofs.

The [verified narrative routes](ROUTES.md) list exact puzzle submissions, displayed story choices, and per-step meters for all four endings. They are generated from production content and the saved witnesses in `tests/routes/fixtures/narrative.json`. `npm run test:routes` searches the real graph, replays the inputs, compares every trace, and rejects stale walkthrough output.

## Play and reason

Start a new game, inspect the records, choose one of the two story actions, read the consequence, then Continue. P1 appears on the fourth Needle card; P2 on the second Court card; P3 on the fourth Court card. Each exercise repeats every required clue in an accessible disclosure. Use keyboard-native select controls and Check reasoning. Incorrect submissions have no penalty; all three hints are free, with the last explaining the solution. You can continue without solving; the unsourced story action remains available and labeled.

After solving, the corresponding story action explicitly changes to a sourced response. Complete all three exercises without a false accusation, survive the thresholds, and refuse the final confession for **A Name Preserved**. This is moral resistance, not physical escape. Signing instead yields the confession variant of **Within the System**; refusing without the prerequisites yields an explanation of the unresolved record.

## Recover and replay

The second saved resistance route changes only the first choice to **Support Parris’s call to trust the report**. All later choices and puzzle answers match the primary route. It survives without replay, proving that a nonterminal mistake need not ruin the run. See the exact sequence and final values in [routes](ROUTES.md).

A false accusation closes clean resistance and prompts a journal warning. Use **Replay chapter N** to restore that chapter’s starting state and discard later decisions. Puzzle solutions and hints earned later are removed; solve again when revisiting. **Restart game** begins from the normal 65/25 state. Both preserve your separate Settings preferences.

## Save behavior and source limits

Refresh preserves solved puzzles, hint levels, consequences and chapter progress. An unfinished form’s selections are not saved; reselect them after refresh. Corrupt/incompatible saves require explicit replacement or play without saving. Storage failure still permits in-memory play.

Q1 is a checked short excerpt; Q2–Q5 are draft excerpts with act references and source links, pending the user’s edition review. P1 does not require an exact needle-placement time. Mechanical route proofs do not establish literary source accuracy or classroom release readiness. Session 06 still needs final independent walkthrough and source review.

## Visual and sound controls

Original object illustrations are decorative; all evidence is written out. **Reveal symbolism (spoilers)** opens the shared register, including implementation and source status. Close guide or Escape restores focus to the reveal control. After an ending, **Explore symbolism** exposes the same register without the in-play spoiler warning.

**Enable optional ambience** starts quiet synthesized layers only after that action. **Mute sound** and **Reduce motion** persist in Settings; OS reduced-motion also disables decoration. Captions describe the same pressure and remain visible when muted. The confession desk and all endings are silent; illustrations and the ending text retain the distinction between moral resistance and physical escape.

## Postgame context and optional passage

Q2 opens behind a violence notice and offers **Skip optional passage**, which closes the panel and returns focus to its summary. After an ending, expand **Context and limits of comparison** for sourced historical summaries and a labeled hypothetical modern-rumor comparison. Source links are optional; the game works offline after loading. These summaries do not verify the withheld play quotations.
