import { useRef } from 'react';
import type { QuotationSlot } from '../content/narrativeTypes';
export function QuotationPanel({ quotation: q }: { quotation: QuotationSlot }) {
  const panel = useRef<HTMLDetailsElement>(null);
  const heading = useRef<HTMLElement>(null);
  return <details ref={panel}>
    <summary ref={heading}>{q.id}: {q.passage} — {q.status === 'verified' ? 'verified short excerpt' : q.status === 'draft' ? 'short excerpt; edition review pending' : 'quotation verification pending'}{q.contentNotice ? ' (optional; references to parental violence)' : ''}</summary>
    {q.contentNotice && <><p>{q.contentNotice}</p><button className="text-button" onClick={() => { if (panel.current) panel.current.open = false; heading.current?.focus(); }}>Skip optional passage</button></>}
    <p>{q.context}</p><p>{q.speaker} · {q.actReference}</p>
    {q.text ? <blockquote>{q.text}</blockquote> : <p>Quotation text withheld until the assigned edition is verified.</p>}
    <p className="source-note">{q.sourceNote}</p>
    {q.edition && <p className="source-note">{q.edition}{q.page ? ` · p. ${q.page}` : ''}{q.verifiedAt ? ` · Checked ${q.verifiedAt}` : ''}</p>}
    {q.sourceUrl && <p><a href={q.sourceUrl} target="_blank" rel="noreferrer">Read {q.id} source (opens a new tab)</a></p>}
  </details>;
}
