import type { Meters } from '../engine/types';
import { hysteriaLabel, reputationLabel } from '../engine/foundation';

export function Status({ reputation, hysteria }: Meters) {
  return (
    <dl className="status-strip" aria-label="Your standing and the town">
      <div><dt>Your reputation</dt><dd>{reputationLabel(reputation)}</dd></div>
      <div><dt>Town hysteria</dt><dd>{hysteriaLabel(hysteria)}</dd></div>
    </dl>
  );
}
