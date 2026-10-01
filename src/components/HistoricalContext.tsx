import { historicalContext } from '../content/context';
export function HistoricalContext() {
  return <section aria-label="Context and limits of comparison">
    <h3>Context and limits of comparison</h3>
    {historicalContext.map(entry => <details key={entry.id}>
      <summary>{entry.title}</summary><p>{entry.body}</p>
      <p className="source-note">{entry.basis} · {entry.actReference}. {entry.sourceNote}</p>
      {entry.sources.map(source => <p key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} (opens a new tab)</a></p>)}
    </details>)}
  </section>;
}
