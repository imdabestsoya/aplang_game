import type { JudgeState } from '../engine/judge/game';

/** The same live state is visible in the HUD and inside modal hearings. */
export function JudgeMeters({ state }: { state: JudgeState }) {
  const previous = state.history.at(-2) ?? { reputation: 62, hysteria: 30 };
  const showChange = state.phase !== 'explore';
  return <div className="judge-meters" aria-label="Reputation and hysteria">
    {(['reputation', 'hysteria'] as const).map(kind => {
      const value = state[kind];
      const change = value - previous[kind];
      const label = kind === 'reputation' ? 'Reputation' : 'Hysteria';
      const danger = kind === 'reputation' ? value <= 25 : value >= 80;
      return <div key={kind} className={`judge-meter ${kind} ${danger ? 'meter-danger' : ''}`}>
        <div className="meter-caption"><strong>{label}</strong><span>{value}/100{showChange && <small> ({change > 0 ? '+' : ''}{change})</small>}</span></div>
        <div className="meter-track" role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} aria-valuetext={`${value} out of 100${showChange ? `; last ruling ${change > 0 ? 'plus ' : ''}${change}` : ''}`}><span style={{ width: `${value}%` }}/></div>
      </div>;
    })}
  </div>;
}
