import { trailContent } from '../content/trail';
import { canTrade, destination, forecast, paces, rations } from '../engine/trail/journey';
import type { Action, Journey, Pace, Ration } from '../engine/trail/journey';
export function JourneyControls({ journey, pace, ration, setPace, setRation, act, busy }: { journey: Journey; pace: Pace; ration: Ration; setPace: (p: Pace) => void; setRation: (r: Ration) => void; act: (a: Action) => void; busy: boolean }) {
  if (journey.phase === 'ended') return null;
  function choice(label: string, action: Action) {
    const f = forecast(journey, action);
    return <div className="trail-action" key={label}><p>{f.text}</p><button disabled={busy || !!f.error} onClick={() => act(action)}>{label}</button></div>;
  }
  return <section className="trail-reading trail-controls" aria-label="Journey decisions">
    <p className="trail-kicker">{journey.phase === 'travel' ? 'ON THE ROAD' : 'PREPARE THE JOURNEY'}</p>
    <h2>{journey.phase === 'travel' ? `${journey.remaining} units to ${destination(journey)}` : 'Supplies & the road ahead'}</h2>
    <div className="trail-policies"><label>Pace<select aria-label="Pace" disabled={busy} value={pace} onChange={e => setPace(e.target.value as Pace)}>{Object.keys(paces).map(p => <option key={p} value={p}>{p}</option>)}</select></label><label>Rations<select aria-label="Rations" disabled={busy} value={ration} onChange={e => setRation(e.target.value as Ration)}>{Object.keys(rations).map(r => <option key={r} value={r}>{r === 'none' ? 'No food (−12 extra stamina)' : r}</option>)}</select></label></div>
    <p>Only travel and rest advance a day. Every advancing day raises town fear by 2. Food capacity 40; kits capacity 4.</p>
    {journey.phase === 'travel' ? choice('Travel one day', { type: 'travel', pace, ration }) : <>
      <div className="trail-actions">{choice('Rest one day', { type: 'rest', ration })}{choice('Repair cart', { type: 'repair' })}</div>
      {canTrade(journey.landmark) && <><h3>Supply counter</h3><p>Full bundles only: 1 coin → 3 food; 3 coins → 1 kit. No day cost, credit or selling.</p><div className="trail-actions">{choice('Buy 3 food', { type: 'food' })}{choice('Buy 1 kit', { type: 'kit' })}</div></>}
      {trailContent.routes.filter(r => r.origin === journey.landmark).map(route => <div className="trail-route" key={route.id}><h3>{route.length === 4 ? 'Public road' : 'Woodland detour'}</h3><p>{route.length} units to {trailContent.landmarks.find(m => m.id === route.destination)?.title}. {route.length === 4 ? 'Public scrutiny: reputation −3 once on arrival.' : 'No arrival reputation cost.'} {route.obstacle ? 'Damaged bridge at progress 2: wait a day with chosen rations, hire help for 3 coins, or ford for −10 cart / −5 stamina.' : 'No scripted obstacle.'} A scheduled encounter may pause travel; its choice costs are separate from these direct costs.</p><p>At {pace} pace: {Math.ceil(route.length / paces[pace][0])} travel days; {Math.ceil(route.length / paces[pace][0]) * rations[ration][0]} food; stamina −{Math.ceil(route.length / paces[pace][0]) * (-paces[pace][1] - rations[ration][1])}; cart −{Math.ceil(route.length / paces[pace][0]) * -paces[pace][2]}; town fear +{Math.ceil(route.length / paces[pace][0]) * 2}. Final short day pays full cost.</p><p>Inspect the room before leaving; recorded observations remain saved.</p>{choice(route.length === 4 ? 'Take public road' : 'Take woodland detour', { type: 'depart', route: route.id })}</div>)}
      {journey.landmark === 'L4' && <p><strong>Current journey complete.</strong> Explore the field boundary, rest or repair. The next leg opens in a later session.</p>}
    </>}
  </section>;
}
