import { useRef, useState } from 'react';
import { evidence, firstCard } from './content/foundation';
import { choose, initialState, inspectEvidence } from './engine/foundation';
import { Status } from './components/Status';

export default function App() {
  const [state, setState] = useState(() => initialState(firstCard.id));
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const decision = state.history[0];

  function restart() {
    setState(initialState(firstCard.id));
    setEvidenceOpen(false);
    setJournalOpen(false);
    titleRef.current?.focus();
  }

  return (
    <>
      <a className="skip-link" href="#story">Skip to the story</a>
      <header className="masthead">
        <a className="wordmark" href="#story" aria-label="The Weight, go to story">THE WEIGHT<span>Escape the court’s logic</span></a>
        <span className="edition">A Crucible adaptation</span>
      </header>
      <main id="story">
        <div className="chapter-line"><span>Chapter I</span><span>The Whisper</span></div>
        <div className="game-layout">
          <section className="story-panel" aria-labelledby="story-title">
            <p className="eyebrow">Parris’s household · You are John Proctor</p>
            <h1 id="story-title" ref={titleRef} tabIndex={-1}>{firstCard.title}</h1>
            <p className="speaker">{firstCard.speaker}</p>
            <p className="dialogue">{firstCard.body}</p>
            <p className="adaptation-label">Invented dialogue · inspired by Act I, not a quotation</p>

            <div className="evidence-section">
              <p className="eyebrow">Examine before you decide</p>
              <button className="inspect-button" aria-expanded={evidenceOpen} aria-controls="evidence-detail" onClick={() => {
                setEvidenceOpen(!evidenceOpen);
                setState((current) => inspectEvidence(current, firstCard, evidence.id));
              }}><span aria-hidden="true">↗</span> Inspect the household report</button>
              <div id="evidence-detail" hidden={!evidenceOpen} className="evidence-detail">
                <h2>{evidence.title}</h2>
                <p className="classification">{evidence.classification}</p>
                <p>{evidence.body}</p>
                <p className="source-note">{evidence.sourceNote}</p>
              </div>
            </div>

            <fieldset className="choices" disabled={!!decision}>
              <legend>What will you lend your voice to?</legend>
              {firstCard.choices.map((choice, index) => (
                <button key={choice.id} className="choice-button" onClick={() => setState((current) => choose(current, firstCard, choice.id))}>
                  <span aria-hidden="true" className="choice-index">0{index + 1}</span>
                  <span>{choice.label}</span><span aria-hidden="true">→</span>
                </button>
              ))}
            </fieldset>
            <div role="status" aria-atomic="true" className={decision ? 'consequence' : ''}>
              {decision && <><h2>The consequence</h2><p>{decision.consequence}</p></>}
            </div>
            {decision && <div className="sample-end"><p>You’ve reached the end of this one-card sample. The rest of the story is still being made. Progress is not saved yet.</p><button className="text-button" onClick={restart}>Restart sample</button></div>}
          </section>

          <aside className="journal-panel" aria-label="Standing and journal">
            <p className="eyebrow">The town is listening</p>
            <Status reputation={state.reputation} hysteria={state.hysteria} />
            <p className="status-note">Public standing is not a measure of integrity.</p>
            <button className="journal-toggle" aria-expanded={journalOpen} aria-controls="journal" onClick={() => setJournalOpen(!journalOpen)}>Journal <span>{state.history.length} decision{state.history.length === 1 ? '' : 's'}</span></button>
            <section id="journal" hidden={!journalOpen} aria-label="Your journal">
              <h2>What you carry</h2>
              <h3>Evidence examined</h3>
              {state.evidenceIds.length ? <p>{evidence.title} — source unconfirmed.</p> : <p>No evidence examined yet.</p>}
              <h3>Your decisions</h3>
              {decision ? <ol><li><strong>{decision.label}</strong><p>{decision.consequence}</p></li></ol> : <p>Your decisions will be recorded here.</p>}
            </section>
            <div className="margin-note"><span aria-hidden="true">I.</span><p>A claim can travel farther than the evidence behind it.</p></div>
          </aside>
        </div>
      </main>
      <footer>
        <p>One-card preview · An unofficial educational adaptation of Arthur Miller’s <cite>The Crucible</cite>.</p>
        <details><summary>Content & adaptation note</summary><p>The planned story includes coercion, false accusations, imprisonment, and references to execution; no graphic violence. This scene is invented and does not reproduce Miller’s dialogue. The game explores moral resistance, not a promise of physical escape.</p></details>
      </footer>
    </>
  );
}
