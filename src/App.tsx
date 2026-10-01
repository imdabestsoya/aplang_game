import { useLayoutEffect, useRef, useState } from 'react';
import { HistoricalContext } from './components/HistoricalContext';
import { QuotationPanel } from './components/QuotationPanel';
import { StoryObjects } from './components/StoryObjects';
import { SymbolismGuide } from './components/SymbolismGuide';
import { Ambience } from './components/Ambience';
import { EvidencePuzzle } from './components/EvidencePuzzle';
import { content, chapterNames } from './content';
import { visibleQuotations } from './content/quotations';
import { currentCard, resolveChoice } from './engine/transition';
import { Status } from './components/Status';
import { useGame } from './persistence/useGame';

export default function App() {
  const game = useGame(content);
  const { state } = game;
  const card = content.cards.find(c => c.id === currentCard(state, content).id)!;
  const [evidenceOpen, setEvidenceOpen] = useState<string | null>(null);
  const [journalOpen, setJournalOpen] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const endingRef = useRef<HTMLHeadingElement>(null);
  const focusAfterTransition = useRef(false);
  useLayoutEffect(() => {
    if (focusAfterTransition.current) { (state.phase === 'ended' ? endingRef : titleRef).current?.focus(); focusAfterTransition.current = false; }
  }, [state.currentCardId, state.phase, state.revision]);
  const decision = state.history.at(-1);
  const reports = content.evidence.filter((item) => card.evidenceIds.includes(item.id));

  function reset(chapter?: number) {
    focusAfterTransition.current = true;
    game.dispatch(chapter === undefined
      ? { type: 'restart', revision: state.revision }
      : { type: 'replay', chapter, revision: state.revision });
    setEvidenceOpen(null);
  }

  return (
    <div className="game-shell" data-chapter={card.chapter} data-pressure={state.hysteria >= 80 ? 'high' : 'ordinary'} data-ending={state.phase === 'ended' ? state.ending?.id : undefined} data-reduced-motion={game.settings.reducedMotion} data-muted={game.settings.muted}>
      <a className="skip-link" href="#story">Skip to the story</a>
      <header className="masthead">
        <a className="wordmark" href="#story" aria-label="The Weight, go to story">THE WEIGHT<span>Escape the court’s logic</span></a>
        <span className="edition">A Crucible adaptation</span>
      </header>
      <main id="story">
        <div className="chapter-line"><span>Chapter {card.chapter}</span><span>{chapterNames[card.chapter - 1]}</span></div>
        {game.storageIssue && <p role="alert" className="storage-note">{game.storageIssue}</p>}
        {game.needsRecovery && <section aria-label="Save recovery" className="recovery">
          <h2>Choose how to continue</h2>
          <button onClick={() => game.recover(true)}>Start a new game</button>
          <button onClick={() => game.recover(false)}>Keep save and play without saving</button>
        </section>}
        {game.actionError && <p role="alert">{game.actionError}</p>}
        <div className="game-layout">
          <section className="story-panel" aria-labelledby="story-title">
            <p className="eyebrow">{card.location} · You are John Proctor</p>
            <h1 id="story-title" ref={titleRef} tabIndex={-1}>{card.title}</h1>
            <StoryObjects chapter={card.chapter} final={!!card.final} />
            <p className="speaker">{card.speaker}</p>
            <p className="dialogue">{card.body}</p>
            <p className="adaptation-label">Original adaptation dialogue · {card.actReference}, not a quotation</p>
            <details><summary>Scene source and chronology</summary><p>{card.sourceNote}</p><p>{card.chronologyNote}</p><p>Source status: {card.sourceStatus}</p></details>
            {reports.map(report => <div className="evidence-section" key={report.id}>
              <button className="inspect-button" aria-expanded={evidenceOpen === report.id} aria-controls={`evidence-${report.id}`} disabled={game.needsRecovery} onClick={() => {
                setEvidenceOpen(evidenceOpen === report.id ? null : report.id);
                game.dispatch({ type: 'inspect', cardId: card.id, evidenceId: report.id, revision: state.revision });
              }}>{report.id === 'household-report' ? 'Inspect the household report' : `Inspect ${report.title}`}</button>
              <div id={`evidence-${report.id}`} hidden={evidenceOpen !== report.id} className="evidence-detail">
                <h2>{report.title}</h2><p className="classification">{report.classification}</p><p>{report.body}</p>
                <p className="source-note">{report.basis} · {report.actReference} · {report.verification}. {report.sourceNote}</p>
              </div>
            </div>)}
            {visibleQuotations(state, content).map(q => <QuotationPanel key={q.id} quotation={q} />)}
            {content.puzzles.filter(p => card.puzzleIds?.includes(p.id)).map(puzzle => <EvidencePuzzle key={`${puzzle.id}-${state.checkpoints.length}-${state.history.length}`} puzzle={puzzle} evidence={content.evidence} state={state} dispatch={game.dispatch} disabled={state.phase !== 'choice' || game.needsRecovery} />)}
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
              focusAfterTransition.current = true;
              game.dispatch({ type: 'continue', revision: state.revision });
              setEvidenceOpen(null);

            }}>Continue</button>}
            {state.phase === 'ended' && state.ending && <section aria-label="Your ending">
              <h2 ref={endingRef} tabIndex={-1}>{state.ending.title}</h2><p>{state.ending.explanation}</p>
              <p>Reputation: {state.reputation} · Hysteria: {state.hysteria}</p>
              <p>Adapted outcome · Acts III–IV. Resistance is a moral outcome, not a promise of physical escape.</p>
              <h3>How your choices led here</h3><ol>{state.history.map(d => <li key={d.cardId}>{d.label}: reputation {d.before.reputation} → {d.after.reputation}; hysteria {d.before.hysteria} → {d.after.hysteria}. {d.consequence}</li>)}</ol>
              <HistoricalContext />
              <section aria-label="Reflect on your choices">
                <h3>What will you take from the record?</h3>
                <p>Explain one rule that changed your decisions, one object whose meaning changed, and one color choice that shaped your reading. Use an example from your run.</p>
                <p>On replay, compare an earlier choice with a different response. What changed in the outcome, and what remained outside your control?</p>
              </section>
            </section>}
            {state.phase === 'sample-complete' && <div className="sample-end"><p>You’ve reached the end of this one-card sample. This is not a game ending. The rest of the story is still being made.</p></div>}
            <button className="text-button" disabled={game.needsRecovery} onClick={() => reset()}>Restart game</button>
          </section>
          <aside className="journal-panel" aria-label="Standing and journal">
            <p className="eyebrow">The town is listening</p>
            <Status reputation={state.reputation} hysteria={state.hysteria} />
            {!state.ending && state.hysteria >= 80 && <p className="danger-note">Near rupture: another increase in panic may end the run.</p>}
            {!state.ending && state.reputation > 0 && state.reputation <= 24 && <p className="danger-note">Under suspicion: further loss of standing may bring condemnation.</p>}
            <p className="status-note">Public standing is not a measure of integrity.</p>
            <button className="journal-toggle" aria-expanded={journalOpen} aria-controls="journal" onClick={() => setJournalOpen(!journalOpen)}>Journal <span>{state.history.length} decision{state.history.length === 1 ? '' : 's'}</span></button>
            <section id="journal" hidden={!journalOpen} aria-label="Your journal">
              <h2>What you carry</h2>
              {state.flags.falseAccusation && <p className="storage-note">An earlier false accusation has closed the clean resistance route. Replay that chapter to reconsider your choice.</p>}
              <h3>Evidence examined</h3>
              {state.evidenceIds.length ? state.evidenceIds.map((id) => <p key={id}>{content.evidence.find((item) => item.id === id)?.title} — {content.evidence.find((item) => item.id === id)?.classification}.</p>) : <p>No evidence examined yet.</p>}
              <h3>Reasoning established</h3>
              {content.puzzles.map(puzzle => <p key={puzzle.id}>{puzzle.title}: {state.solvedPuzzleIds.includes(puzzle.id) ? 'examined' : state.history.some(d => d.cardId === puzzle.availableAt) ? 'not examined — replay its chapter to revisit the evidence exercise' : 'not yet examined'}.</p>)}
              <h3>Your decisions</h3>
              {state.history.length ? <ol>{state.history.map((entry) => <li key={entry.cardId}><span className="ink-mark" aria-hidden="true">/ </span><strong>{entry.label}</strong><p>{entry.consequence}</p></li>)}</ol> : <p>Your decisions will be recorded here.</p>}
              <h3>Replay a chapter</h3>
              <p>Replay restores the chapter’s starting state and discards everything after it.</p>
              {state.checkpoints.map((point) => <button className="text-button" key={point.chapter} disabled={game.needsRecovery} onClick={() => reset(point.chapter)}>Replay chapter {point.chapter}</button>)}
            </section>
            <details className="settings"><summary>Settings</summary>
              <label><input type="checkbox" checked={game.settings.muted} onChange={(event) => game.updateSettings({ ...game.settings, muted: event.target.checked })} /> Mute sound</label>
              <label><input type="checkbox" checked={game.settings.reducedMotion} onChange={(event) => game.updateSettings({ ...game.settings, reducedMotion: event.target.checked })} /> Reduce motion</label>
              <p>Sound is optional and starts only when enabled. Reduced motion also respects your device preference.</p>

              {game.settingsIssue && <p role="alert">{game.settingsIssue}</p>}
            </details>
<Ambience muted={game.settings.muted} hysteria={state.hysteria} silent={!!card.final || state.phase === 'ended'} />
            <SymbolismGuide ended={state.phase === 'ended'} />
            <div className="margin-note"><span aria-hidden="true">I.</span><p>A claim can travel farther than the evidence behind it.</p></div>
          </aside>
        </div>
      </main>
      <footer>
        <p>An unofficial educational adaptation of Arthur Miller’s <cite>The Crucible</cite>.</p>
        <details><summary>Content & adaptation note</summary><p>The story includes coercion, false accusations, imprisonment, and references to execution; no graphic violence. Scene dialogue is original adaptation prose. Passage panels contain brief excerpts with source and review labels. The game explores moral resistance, not a promise of physical escape.</p></details>
      <p>Edition-specific review of four short excerpts is pending; source details accompany each passage.</p>
      </footer>
    </div>
  );
}
