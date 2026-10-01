import { content } from '../../src/content';
import { puzzleForms } from '../../src/content/puzzleForms';
import type { Witness } from './search';

export function renderWalkthrough(data: { states: number; witnesses: Record<string, Witness> }) {
  let text = '# Verified Narrative Routes\n\nGenerated from production content and saved witnesses by `UPDATE_WITNESSES=1 npm run test:routes`. Do not edit by hand. These are spoilers. Start a new game for each route; read each consequence and select Continue. No developer mode, save edits, or chapter replay is needed.\n\n';
  text += `The search examined ${data.states.toLocaleString('en-US')} distinct decision states, with puzzles solved or skipped. All 16 cards are reachable and no nonterminal dead ends were found. Wrong answers and hints preserve the same meters and flags; tests replay every witness with a wrong answer and all three hints at each solved puzzle.\n\n`;
  text += '## Exact puzzle submissions\n\nOpen the clue disclosures above each exercise. Select these answers, then Check reasoning. Each exercise has three optional hints. A wrong answer permits retry without penalty. P1 orders making, gift and evidentiary use; exact needle timing is not part of the answer.\n\n';
  for (const puzzle of content.puzzles) {
    text += `### ${puzzle.id} — ${puzzle.title}\n\nAt card \`${puzzle.availableAt}\`:\n\n`;
    puzzleForms[puzzle.id].forEach((field, i) => { text += `- **${field.label}:** ${field.options.find(o => o.value === puzzle.solution[i])!.label}\n`; });
    text += `\n${puzzle.explanation}\n\n`;
  }
  for (const [id, witness] of Object.entries(data.witnesses)) {
    if (id === 'recoverable-mistake') continue;
    text += `## ${id}\n\n| Card | Puzzle before choice | Exact story choice | R after | H after |\n|---|---|---|---:|---:|\n`;
    witness.steps.forEach((step, i) => {
      const card = content.cards.find(c => c.id === step.cardId)!;
      const choice = card.choices.find(c => c.id === step.choiceId)!;
      const selected = choice.variants?.find(v => v.id === witness.trace[i].variantId) ?? choice;
      text += `| ${card.id}: ${card.title} | ${step.puzzleAnswers.map(p => p.puzzleId).join(', ') || 'Skip / none'} | ${selected.label} | ${witness.trace[i].reputation} | ${witness.trace[i].hysteria} |\n`;
    });
    text += '\n';
  }
  const recovery = data.witnesses['recoverable-mistake'];
  text += `## Recoverable mistake and second resistance route\n\nFollow **name-preserved**, changing only the first choice to **Support Parris’s call to trust the report**. This endorses an unconfirmed rumor but names nobody falsely. Use the same puzzle submissions and all remaining choices. You still reach A Name Preserved, at R=${recovery.trace.at(-1)!.reputation}, H=${recovery.trace.at(-1)!.hysteria}. Every intermediate state remains nonterminal. This is recovery through later reasoning, without replay. Full per-step traces for both routes are in \`tests/routes/fixtures/narrative.json\`.\n\nA false accusation is different: the journal explicitly closes clean resistance. Open Journal and Replay the chapter where you accused someone. Replay restores that chapter’s starting flags, hints and evidence, discarding later decisions. Repeating the reasoning exercise earns its reward again.\n`;
  return text;
}
