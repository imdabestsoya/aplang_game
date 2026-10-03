import { quotes } from '../content/judge';
import type { QuoteId } from '../content/judge';
export function QuoteCorner({ ids }: { ids: readonly QuoteId[] }) {
  if(!ids.length)return null;
  return <aside className="judge-quote" aria-label="Words from The Crucible" aria-live="polite">{ids.map(id=><blockquote key={id}><p>“{quotes[id].text}”</p><cite>{quotes[id].speaker} · {quotes[id].act}</cite></blockquote>)}</aside>;
}
