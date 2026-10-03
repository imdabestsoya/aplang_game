import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

/** Native modal focus containment; mounted inside the fullscreen game element. */
export function GameDialog({ title, children, onClose, dismissible = true, corner }: { title: string; children: ReactNode; onClose: () => void; dismissible?: boolean; corner?: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const element = dialog.current!;
    element.showModal();
    heading.current?.focus();
    return () => element.close();
  }, []);
  useEffect(() => { heading.current?.focus(); }, [title]);
  function close() { dialog.current?.close(); onClose(); }
  return <dialog ref={dialog} className="game-dialog" aria-labelledby="game-dialog-title" onKeyDown={event => {
    if (event.key !== 'Tab') return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), summary, a[href], [tabindex="0"]')).filter(el => el.getClientRects().length > 0);
    const first = controls[0]; const last = controls.at(-1);
    if (!first || !last) { event.preventDefault(); heading.current?.focus(); return; }
    if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement as HTMLElement))) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && (document.activeElement === last || !controls.includes(document.activeElement as HTMLElement))) { event.preventDefault(); first.focus(); }
  }} onCancel={event => { event.preventDefault(); if (dismissible) close(); }}>
    <header className="game-dialog-header"><h2 id="game-dialog-title" tabIndex={-1} ref={heading}>{title}</h2>{dismissible && <button onClick={close} aria-label="Close popup">✕</button>}</header>
    <div className="game-dialog-body">{corner && <div className="dialog-corner">{corner}</div>}{children}</div>
    {dismissible && <footer className="game-dialog-footer"><button onClick={close}>Back to game <kbd>Esc</kbd></button></footer>}
  </dialog>;
}
