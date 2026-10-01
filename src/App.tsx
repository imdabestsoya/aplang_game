import { useRef, useState } from 'react';
import { content } from './content/foundation';
import { currentCard, resolveChoice } from './engine/transition';
import { Status } from './components/Status';
import { useGame } from './persistence/useGame';

export default function App() {
  const game = useGame(content);
  const { state } = game;
  const card = currentCard(state, content);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const decision = state.history.at(-1);
  const report = content.evidence.find((item) => card.evidenceIds.includes(item.id));

  function reset(chapter?: number) {
    game.dispatch(chapter === undefined
      ? { type: 'restart', revision: state.revision }
      : { type: 'replay', chapter, revision: state.revision });
    setEvidenceOpen(false);
    titleRef.current?.focus();
  }

  return (
    <div data-reduced-motion={game.settings.reducedMotion} data-muted={game.settings.muted}>
      <a className="skip-link" href="#story">Skip to the story</a>
      <header className="masthead">
        <a className="wordmark" href="#story" aria-label="The Weight, go to story">THE WEIGHT<span>Escape the court’s logic</span></a>
        <span className="edition">A Crucible adaptation</span>
      </header>
      <main id="story">
        <div className="chapter-line"><span>Chapter {card.chapter}</span><span>The Whisper</span></div>
        {game.storageIssue && <p role="alert" className="storage-note">{game.storageIssue}</p>}
        {game.needsRecovery && <section aria-label="Save recovery" className="recovery">
          <h2>Choose how to continue</h2>
          <button onClick={() => game.recover(true)}>Start a new game</button>
          <button onClick={() => game.recover(false)}>Keep save and play without saving</button>
        </section>}
        {game.actionError && <p role="alert">{game.actionError}</p>}
        <div className="game-layout">
          <section className="story-panel" aria-labelledby="story-title">
            <p className="eyebrow">Parris’s household · You are John Proctor</p>
            <h1 id="story-title" ref={titleRef} tabIndex={-1}>{card.title}</h1>
            <p className="speaker">{card.speaker}</p>
            <p className="dialogue">{card.body}</p>
            <p className="adaptation-label">Invented dialogue · inspired by Act I, not a quotation</p>
            {report && <div className="evidence-section">
              <p className="eyebrow">Examine before you decide</p>
              <button className="inspect-button" aria-expanded={evidenceOpen} aria-controls="evidence-detail" disabled={game.needsRecovery} onClick={() => {
                setEvidenceOpen(!evidenceOpen);
                game.dispatch({ type: 'inspect', cardId: card.id, evidenceId: report.id, revision: state.revision });
              }}><span aria-hidden="true">↗</span> Inspect the household report</button>
              <div id="evidence-detail" hidden={!evidenceOpen} className="evidence-detail">
                <h2>{report.title}</h2>
                <p className="classification">{report.classification}</p>
                <p>{report.body}</p>
                <p className="source-note">{report.sourceNote}</p>
              </div>
            </div>}
            <fieldset className="choices" disabled={state.phase !== 'choice' || game.needsRecovery}>
              <legend>What will you lend your voice to?</legend>
              {card.choices.map((base, index) => {
                const choice = resolveChoice(state, base);
                return <button key={choice.id} className="choice-button" onClick={() => game.dispatch({ type: 'choose', cardId: card.id, choiceId: choice.id, variantId: choice.variantId, revision: state.revision })}>
                  <span aria-hidden="true" className="choice-index">0{index + 1}</span>
                  <span>{choice.label}</span><span aria-hidden="true">→</span>
                </button>;
              })}
            </fieldset>
            <div role="status" aria-atomic="true" className={decision && state.phase !== 'choice' ? 'consequence' : ''}>
              {decision && state.phase !== 'choice' && <><h2>The consequence</h2><p>{decision.consequence}</p></>}
            </div>
            {state.phase === 'consequence' && <button className="text-button" onClick={() => {
              game.dispatch({ type: 'continue', revision: state.revision });
              setEvidenceOpen(false);
              titleRef.current?.focus();
            }}>Continue</button>}
            {state.phase === 'ended' && state.ending && <section aria-label="Your ending">
              <h2>{state.ending.title}</h2><p>{state.ending.explanation}</p>
              <p>Reputation: {state.reputation} · Hysteria: {state.hysteria}</p>
            </section>}
            {state.phase === 'sample-complete' && <div className="sample-end"><p>You’ve reached the end of this one-card sample. This is not a game ending. The rest of the story is still being made.</p></div>}
            <button className="text-button" disabled={game.needsRecovery} onClick={() => reset()}>Restart game</button>
          </section>
          <aside className="journal-panel" aria-label="Standing and journal">
            <p className="eyebrow">The town is listening</p>
            <Status reputation={state.reputation} hysteria={state.hysteria} />
            <p className="status-note">Public standing is not a measure of integrity.</p>
            <button className="journal-toggle" aria-expanded={journalOpen} aria-controls="journal" onClick={() => setJournalOpen(!journalOpen)}>Journal <span>{state.history.length} decision{state.history.length === 1 ? '' : 's'}</span></button>
            <section id="journal" hidden={!journalOpen} aria-label="Your journal">
              <h2>What you carry</h2>
              {state.flags.falseAccusation && <p className="storage-note">An earlier false accusation has closed the clean resistance route. Replay that chapter to reconsider your choice.</p>}
              <h3>Evidence examined</h3>
              {state.evidenceIds.length ? state.evidenceIds.map((id) => <p key={id}>{content.evidence.find((item) => item.id === id)?.title} — source unconfirmed.</p>) : <p>No evidence examined yet.</p>}
              <h3>Your decisions</h3>
              {state.history.length ? <ol>{state.history.map((entry) => <li key={entry.cardId}><strong>{entry.label}</strong><p>{entry.consequence}</p></li>)}</ol> : <p>Your decisions will be recorded here.</p>}
              <h3>Replay a chapter</h3>
              <p>Replay restores the chapter’s starting state and discards everything after it.</p>
              {state.checkpoints.map((point) => <button className="text-button" key={point.chapter} disabled={game.needsRecovery} onClick={() => reset(point.chapter)}>Replay chapter {point.chapter}</button>)}
            </section>
            <details className="settings"><summary>Settings</summary>
              <label><input type="checkbox" checked={game.settings.muted} onChange={(event) => game.updateSettings({ ...game.settings, muted: event.target.checked })} /> Mute sound</label>
              <label><input type="checkbox" checked={game.settings.reducedMotion} onChange={(event) => game.updateSettings({ ...game.settings, reducedMotion: event.target.checked })} /> Reduce motion</label>
              <p>No sound or animation is used in this sample. Your preferences are saved for future scenes.</p>
              {game.settingsIssue && <p role="alert">{game.settingsIssue}</p>}
            </details>
            <div className="margin-note"><span aria-hidden="true">I.</span><p>A claim can travel farther than the evidence behind it.</p></div>
          </aside>
        </div>
      </main>
      <footer>
        <p>One-card preview · An unofficial educational adaptation of Arthur Miller’s <cite>The Crucible</cite>.</p>
        <details><summary>Content & adaptation note</summary><p>The planned story includes coercion, false accusations, imprisonment, and references to execution; no graphic violence. This scene is invented and does not reproduce Miller’s dialogue. The game explores moral resistance, not a promise of physical escape.</p></details>
      </footer>
    </div>
  );
}
