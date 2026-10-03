import { useEffect, useRef, useState } from 'react';
import { trailContent } from '../content/trail';
import { inspect, move, nearby } from '../engine/trail/exploration';
import type { Direction } from '../engine/trail/exploration';
import { loadJourney, saveJourney, newJourney } from '../persistence/trail/journey';
import { destination, forecast, standing, transition } from '../engine/trail/journey';
import type { Action, Journey, Pace, Ration } from '../engine/trail/journey';
import { JourneyControls } from './JourneyControls';
import { GameDialog } from './GameDialog';
import { EncounterControls } from './EncounterControls';
import { eventTitles, itineraries } from '../content/trail/itineraries';
import { Tutorial } from './Tutorial';
import { TrailWorld } from '../rendering/TrailWorld';
import '../styles/trail.css';

const directions: Record<string, Direction> = { ArrowUp: 'north', w: 'north', ArrowDown: 'south', s: 'south', ArrowLeft: 'west', a: 'west', ArrowRight: 'east', d: 'east' };
type Panel = 'encounter' | 'tutorial' | 'journey' | 'objects' | 'observation' | 'journal' | 'settings' | 'ending' | null;

export default function TrailApp() {
  const [loaded] = useState(loadJourney);
  const [introduced, setIntroduced] = useState(() => {
    try { return localStorage.getItem('the-weight:trail:tutorial:v1') === 'complete'; } catch { return false; }
  });
  const [journey, setJourney] = useState(loaded.state);
  const current = useRef(journey);
  const game = useRef<HTMLElement>(null);
  const world = useRef<HTMLElement>(null);
  const map = trailContent.landmarks.find(m => m.id === journey.landmark)!;
  const state = journey.exploration[map.id];
  const supplies = journey.resources;
  const social = standing(supplies);
  const [pace, setPace] = useState<Pace>('steady');
  const [ration, setRation] = useState<Ration>('full');
  const [animation, setAnimation] = useState(false);
  const animationLock = useRef(false);
  const [risk, setRisk] = useState<Action | null>(null);
  const [canSave, setCanSave] = useState(loaded.canSave);
  const [issue, setIssue] = useState(loaded.issue);
  const [panel, setPanel] = useState<Panel>(!introduced ? 'tutorial' : loaded.issue ? 'settings' : loaded.state.phase === 'ended' ? 'ending' : loaded.state.pending ? 'encounter' : null);
  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState('Arrow keys / WASD: move · E: inspect · Journey: prepare & travel');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [systemMotion, setSystemMotion] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [fullscreen, setFullscreen] = useState(false);
  const item = map.interactions.find(i => i.id === selected);
  const onRoad = journey.phase === 'travel' || journey.phase === 'pending' || animation;

  useEffect(() => {
    world.current?.focus();
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSystemMotion(query.matches);
    const syncFullscreen = () => setFullscreen(document.fullscreenElement === game.current);
    query.addEventListener('change', update);
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => { query.removeEventListener('change', update); document.removeEventListener('fullscreenchange', syncFullscreen); };
  }, []);
  function store(next: Journey) {
    if (canSave) { const error = saveJourney(next); if (error) { setIssue(error); setCanSave(false); } }
    current.current = next; setJourney(next);
  }
  function finishTutorial() {
    if (!introduced) {
      try { localStorage.setItem('the-weight:trail:tutorial:v1', 'complete'); } catch { /* Optional preference; gameplay still works. */ }
      setIntroduced(true);
      setPanel(issue ? 'settings' : journey.phase === 'ended' ? 'ending' : journey.pending ? 'encounter' : null);
      world.current?.focus();
    } else closePanel();
  }
  function closePanel() { setPanel(null); setRisk(null); world.current?.focus(); }
  function stopAnimation() { animationLock.current = false; setAnimation(false); }
  useEffect(() => {
    if (!animation) return;
    const timer = window.setTimeout(stopAnimation, 4000);
    const visibility = () => { if (document.hidden) stopAnimation(); };
    document.addEventListener('visibilitychange', visibility);
    return () => { window.clearTimeout(timer); document.removeEventListener('visibilitychange', visibility); };
  }, [animation]);
  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement === game.current) await document.exitFullscreen();
      else if (game.current?.requestFullscreen) await game.current.requestFullscreen();
      else setMessage('Fullscreen is unavailable in this browser. The game already fits this window.');
    } catch { setMessage('Fullscreen could not open. You can keep playing in this window.'); }
  }
  function act(action: Action, confirmed = false) {
    if (animationLock.current) return;
    const result = forecast(current.current, action);
    if (result.error) { setMessage(result.error); return; }
    if (result.severe && !confirmed) { setRisk(action); return; }
    const next = transition(current.current, action, journey.revision);
    if (next.error) { setMessage(next.error); return; }
    store(next.state); setRisk(null); setSelected(null);
    const arrived = next.state.landmark !== journey.landmark;
    setMessage(arrived ? `Arrived at ${trailContent.landmarks.find(m => m.id === next.state.landmark)?.title}. Explore or prepare for the road.` : result.text);
    if (['travel', 'depart', 'respond', 'checkpoint'].includes(action.type)) closePanel();
    if (next.state.pending) { setRation(next.state.pending.ration); setPanel('encounter'); }
    if (next.state.phase === 'ended') setPanel('ending');
    if (action.type === 'travel' && !next.state.pending && !reducedMotion && !systemMotion) { animationLock.current = true; setAnimation(true); }
  }
  function walk(direction: Direction) {
    if (panel || current.current.phase !== 'landmark' || animationLock.current) return;
    const previous = current.current.exploration[map.id];
    const next = move(previous, direction, map);
    store({ ...current.current, exploration: { ...current.current.exploration, [map.id]: next } });
    const objects = nearby(next, map);
    setMessage(next.x === previous.x && next.y === previous.y ? 'The way is blocked.' : objects.length ? `${objects.map(i => i.title).join(', ')} · Press E to inspect` : 'Arrow keys / WASD: move · E: inspect');
  }
  function examine(id: string) {
    if (current.current.phase !== 'landmark' || animationLock.current) return;
    const next = inspect(current.current.exploration[map.id], id, map);
    store({ ...current.current, exploration: { ...current.current.exploration, [map.id]: next } });
    setSelected(id); setPanel('observation'); setMessage('Observation recorded. Day and supplies unchanged.');
  }
  function interact() {
    if (panel || current.current.phase !== 'landmark' || animationLock.current) return;
    const object = nearby(current.current.exploration[map.id], map)[0];
    if (object) examine(object.id); else setMessage('Move closer to an object, or open Objects to inspect by name.');
  }
  const title = risk ? 'Review the risk' : panel === 'encounter' ? eventTitles[journey.pending?.encounter ?? ''] ?? 'Encounter' : panel === 'observation' ? item?.title ?? 'Observation' : panel === 'journey' ? 'Journey & supplies' : panel === 'objects' ? 'Objects nearby' : panel === 'journal' ? 'Trail journal' : panel === 'ending' ? 'The journey stops' : 'Settings & help';

  return <main ref={game} className="game-shell" aria-label="The Weight — 8-bit game" onKeyDown={event => {
    if (panel || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target instanceof HTMLElement && event.target.closest('input, select, textarea, dialog')) return;
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (directions[key]) { event.preventDefault(); walk(directions[key]); }
    else if (key === 'e' && !event.repeat) { event.preventDefault(); interact(); }
    else if (key === 'Enter' && event.target === world.current) { event.preventDefault(); interact(); }
  }}>
    <header className="game-header"><h1>THE WEIGHT <span>THE SALEM TRAIL</span></h1><div className="game-header-actions">{issue && <button onClick={() => setPanel('settings')}>Save warning</button>}<button onClick={toggleFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}><svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d={fullscreen ? 'M3 8h5V3M16 3v5h5M21 16h-5v5M8 21v-5H3' : 'M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5'} /></svg><span> {fullscreen ? 'Exit fullscreen' : 'Fullscreen'}</span></button></div></header>
    <dl className="trail-hud" aria-label="Journey supplies">{Object.entries({ Day: supplies.day, Food: supplies.food, Stamina: supplies.stamina, Cart: supplies.condition, Coins: supplies.coins, Kits: supplies.kits }).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <section ref={world} tabIndex={0} className="game-world" aria-label={onRoad ? 'Country road' : `Explore ${map.title}`} onPointerDown={event => { if (event.target === event.currentTarget || event.target instanceof HTMLCanvasElement) world.current?.focus(); }}>
      <div className="game-location"><span>{onRoad ? 'ON THE ROAD' : map.id === 'L1' ? 'ACT I · THE WHISPER' : 'ACT II · THE HEARTH'}</span><strong>{onRoad ? `${journey.remaining} units to ${destination(journey)}` : map.title}</strong></div>
      <div className="world-canvas"><TrailWorld state={state} map={map} traveling={onRoad} reducedMotion={reducedMotion || systemMotion || (journey.phase === 'travel' && !animation)} /></div>
      {animation ? <div className="game-context"><button onClick={stopAnimation}>Skip travel animation</button></div> : journey.phase === 'landmark' ? <div className="game-touch" aria-label="Movement controls">{(['west', 'north', 'south', 'east'] as const).map((d, i) => <button key={d} aria-label={`Move ${d}`} onClick={() => walk(d)}>{['←', '↑', '↓', '→'][i]}</button>)}<button onClick={interact}>E · Interact</button></div> : <div className="game-context"><button onClick={() => setPanel(journey.phase === 'ended' ? 'ending' : journey.pending ? 'encounter' : 'journey')}>{journey.phase === 'ended' ? 'View outcome' : journey.pending ? 'Resolve encounter' : 'Plan next day'}</button></div>}
    </section>
    <p role="status" className="game-status">{message}</p>
    <nav className="game-toolbar" aria-label="Game menu"><button onClick={() => setPanel(journey.phase === 'ended' ? 'ending' : journey.pending ? 'encounter' : 'journey')}>Journey</button><button disabled={journey.phase !== 'landmark' || animation} onClick={() => setPanel('objects')}>Objects</button><button onClick={() => setPanel('journal')}>Journal</button><button onClick={() => setPanel('settings')}>Settings</button></nav>
    {panel === 'tutorial' && <Tutorial onFinish={finishTutorial} onClose={introduced ? closePanel : undefined} />}
    {panel && panel !== 'tutorial' && <GameDialog title={title} onClose={closePanel}>
      {risk ? <><p>{forecast(journey, risk).text}</p><p>{forecast(journey, risk).state.causes.join(', ') || 'Supplies will be critically low or town fear near rupture.'} This action may end the journey.</p>{risk.type === 'respond' && forecast(journey, risk).state.flags.falseAccusation && !journey.flags.falseAccusation && <p>This repeats an unsupported accusation and closes the clean resistance route. Cancel to keep your current record.</p>}<button onClick={() => act(risk, true)}>Confirm risky action</button><button onClick={() => setRisk(null)}>Keep current supplies</button></> : <>
        {panel === 'encounter' && <EncounterControls journey={journey} ration={ration} setRation={setRation} act={act} />}
        {panel === 'observation' && item && <><p className="trail-kicker">FIELD NOTES · RECORDED</p><p>{item.body}</p><details><summary>Source and interpretation</summary><p>{item.basis} · {item.actReference}. {item.sourceNote}</p></details></>}
        {panel === 'objects' && <div className="trail-objects">{map.interactions.map((object, index) => <button key={object.id} onClick={() => examine(object.id)}><span>0{index + 1} · {object.title}</span><small>{state.inspected.includes(object.id) ? 'Recorded in journal' : 'Inspect and record'}</small></button>)}</div>}
        {panel === 'journey' && <JourneyControls journey={journey} pace={pace} ration={ration} setPace={setPace} setRation={setRation} act={act} busy={animation} />}
        {panel === 'journal' && <><p>Itinerary: {itineraries.find(i => i.id === journey.variant)?.name}</p><p>◇ Public standing: <strong>{social.reputation}</strong><br/>⚑ Town fear: <strong>{social.hysteria}</strong></p><p>Standing is not a measure of integrity.</p>{trailContent.landmarks.map(landmark => <section key={landmark.id}><h3>{landmark.title}</h3>{(journey.exploration[landmark.id]?.inspected ?? []).length === 0 && <p>No observations yet.</p>}{(journey.exploration[landmark.id]?.inspected ?? []).map(id => { const entry = landmark.interactions.find(i => i.id === id)!; return <p key={id}><strong>{entry.title}.</strong> {entry.body}</p>; })}</section>)}<details><summary>Journey log · {journey.log.length} actions</summary>{journey.log.map((entry, i) => <p key={i}>{entry}</p>)}</details></>}
        {panel === 'settings' && <><button onClick={() => setPanel('tutorial')}>Replay tutorial</button>{issue && <section><p role="alert">{issue}</p>{!canSave && <button onClick={() => { const error = saveJourney(journey); setIssue(error); setCanSave(!error); }}>Replace only the trail save</button>}</section>}<label className="trail-motion"><input type="checkbox" checked={reducedMotion} onChange={e => { setReducedMotion(e.target.checked); if (e.target.checked) stopAnimation(); }} /> Reduce scene motion</label><h3>Controls</h3><p>Arrow keys or WASD move John. E or Enter inspects a nearby object. Escape closes a popup. Use the direction buttons for touch, or Objects to inspect by name. Reading and menus never advance time.</p><h3>About this journey</h3><p>An unofficial educational adaptation of Arthur Miller’s The Crucible. The journey, cart, supplies, room layouts and observation prose are invented. Themes include coercion, false accusations, imprisonment and references to execution.</p><p>Travel through Proctor farm and the meetinghouse yard to the field boundary is playable, including encounters and the damaged bridge. Full story scenes and the remaining journey are still in development.</p></>}
        {panel === 'ending' && <><h3>{journey.causes[0]}</h3><p>{journey.causes.join(' · ')}. This is not a judgment of moral worth.</p><button disabled={!journey.checkpoint} onClick={() => act({ type: 'checkpoint' })}>Restore landmark checkpoint</button><button onClick={() => { stopAnimation(); store(newJourney()); setSelected(null); closePanel(); setMessage('A new journey begins. Arrow keys to move; E to inspect.'); }}>Start a new first leg</button></>}
      </>}
    </GameDialog>}
  </main>;
}
