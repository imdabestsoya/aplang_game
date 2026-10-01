import { useState } from 'react';
import type { NarrativePuzzle, NarrativeEvidence } from '../content/narrativeTypes';
import { puzzleForms } from '../content/puzzleForms';
import type { Action, GameState } from '../engine/types';

export function EvidencePuzzle({ puzzle, evidence, state, dispatch, disabled }: {
  puzzle: NarrativePuzzle; evidence: readonly NarrativeEvidence[]; state: GameState;
  dispatch: (action: Action) => void; disabled: boolean;
}) {
  const fields = puzzleForms[puzzle.id];
  const solved = state.solvedPuzzleIds.includes(puzzle.id);
  const [answers, setAnswers] = useState<string[]>(() => solved ? [...puzzle.solution] : fields.map(() => ''));
  const hintLevel = state.hintLevels[puzzle.id] ?? 0;
  return <section className="evidence-detail" aria-label={`${puzzle.id}: ${puzzle.title}`}>
    <h2>{puzzle.title}</h2>
    <p>Examine these clues before answering. Hints and retries do not change your standing or prevent resistance.</p>
    <p className="source-note">{puzzle.verification}</p>
    {evidence.filter(e => puzzle.evidenceIds.includes(e.id)).map(e => <details key={e.id}>
      <summary>{e.title} — {e.classification}</summary><p>{e.body}</p><p className="source-note">{e.sourceNote}</p>
    </details>)}
    <form onSubmit={event => { event.preventDefault(); dispatch({ type: 'solve', puzzleId: puzzle.id, answer: answers, revision: state.revision }); }}>
      {fields.map((field, index) => <div className="puzzle-field" key={field.label}>
        <label htmlFor={`${puzzle.id}-answer-${index}`}>{field.label}</label>
        <select id={`${puzzle.id}-answer-${index}`} aria-describedby={answers[index] ? `${puzzle.id}-selection-${index}` : undefined} required value={answers[index]} disabled={disabled || solved} onChange={event => setAnswers(answers.map((answer, i) => i === index ? event.target.value : answer))}>
          <option value="">Choose an answer</option>
          {field.options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        {answers[index] && <p className="puzzle-selection" id={`${puzzle.id}-selection-${index}`}>{field.options.find(option => option.value === answers[index])?.label}</p>}
      </div>)}
      <button className="text-button" disabled={disabled || solved} type="submit">Check reasoning</button>
    </form>
    <button className="text-button" disabled={disabled || solved || hintLevel === 3} onClick={() => dispatch({ type: 'hint', puzzleId: puzzle.id, revision: state.revision })}>Hint {Math.min(hintLevel + 1, 3)} of 3</button>
    {puzzle.hints.slice(0, hintLevel).map((hint, index) => <p key={hint}><strong>Hint {index + 1}:</strong> {hint}</p>)}
    <p role="status" aria-live="polite">{solved ? `Reasoning established. ${puzzle.explanation}` : state.puzzleFeedback}</p>
    {solved && <p>Your sourced response is now available among the two story choices below.</p>}
  </section>;
}
