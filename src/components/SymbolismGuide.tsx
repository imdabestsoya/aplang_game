import { useRef } from 'react';
import { symbolism } from '../content/symbolism';

export function SymbolismGuide({ ended }: { ended: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  return <section className="symbolism-launcher" aria-label="Symbolism guide">
    <h2>Reading the design</h2>
    {!ended && <p>This guide discusses later scenes and endings. Open it only if you want spoilers.</p>}
    <button className="text-button" ref={trigger} onClick={() => dialog.current?.showModal()}>{ended ? 'Explore symbolism' : 'Reveal symbolism (spoilers)'}</button>
    <dialog ref={dialog} aria-labelledby="symbolism-title" onClose={() => trigger.current?.focus()}>
      <div className="dialog-heading"><h2 id="symbolism-title">Symbolism and adaptation</h2><button className="text-button" autoFocus onClick={() => dialog.current?.close()}>Close guide</button></div>
      <p>These are design interpretations, not claims about Miller’s intentions. The game is an unofficial educational adaptation of Arthur Miller’s <cite>The Crucible</cite>. Deferred entries describe unfinished work.</p>
      {symbolism.map(record => <details key={record.id}>
        <summary>{record.id} — {record.choice}</summary>
        <h3>Interpretation</h3><p>{record.meaning}</p>
        <p>{record.implementation}</p>
        <p><strong>Basis:</strong> {record.basis} · {record.actReference}</p><p>{record.sourceNote}</p>
        <p><strong>Status:</strong> {record.status}. {record.remaining}</p><p><strong>Verification:</strong> {record.verification}</p>
      </details>)}
    </dialog>
  </section>;
}
