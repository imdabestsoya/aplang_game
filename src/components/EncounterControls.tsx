import { encounter, forecast, safeChoices } from '../engine/trail/journey';
import { itineraries } from '../content/trail/itineraries';
import type { Action, Journey, Ration } from '../engine/trail/journey';
export function EncounterControls({ journey, ration, setRation, act }: { journey: Journey; ration: Ration; setRation: (r: Ration) => void; act: (a: Action) => void }) {
  const e = encounter(journey); const pending = journey.pending;
  if (!e || !pending) return null;
  const unsafe = !(['full', 'sparse', 'none'] as const).some(r => safeChoices(journey, r).length);
  return <section aria-label="Pending encounter">
    <p className="trail-kicker">{itineraries.find(i => i.id === journey.variant)?.name} · TRAVEL PAUSED</p>
    <p>{e.dialogue}</p><p>This travel day is already paid. Reading and reloading do not charge it again.</p>
    {(e.id === 'crossing' || e.id === 'shelter') && <label>Rations for this delay or rest<select aria-label="Encounter rations" value={ration} onChange={event => setRation(event.target.value as Ration)}><option value="full">Full — 2 food</option><option value="sparse">Sparse — 1 food, −4 stamina</option><option value="none">No food — −12 stamina</option></select></label>}
    {unsafe && <p role="alert">No choice is survivable. Restore the last landmark to prepare differently.</p>}
    {e.actions.map(c => {
      const action: Action = { type: 'respond', transaction: pending.id, choice: c.id, ration };
      const f = forecast(journey, action);
      return <div className="trail-action" key={c.id}><p>{f.text}</p>{c.flags.falseAccusation && <p>Repeating an unsupported accusation closes the clean resistance route. You can restore the landmark checkpoint.</p>}<button disabled={!!f.error || unsafe} onClick={() => act(action)}>{c.label}</button></div>;
    })}
    <button disabled={!journey.checkpoint} onClick={() => act({ type: 'checkpoint' })}>Restore landmark checkpoint</button>
    <details><summary>Source and interpretation</summary><p>{e.basis} · {e.actReference}. {e.sourceNote}</p></details>
  </section>;
}
