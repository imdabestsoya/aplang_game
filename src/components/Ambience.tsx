import { useEffect, useRef, useState } from 'react';
import { createAmbience } from '../audio/ambience';

export function Ambience({ muted, hysteria, silent }: { muted: boolean; hysteria: number; silent: boolean }) {
  const audio = useRef<ReturnType<typeof createAmbience> | null>(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const update = () => audio.current?.set(hysteria, muted || silent || document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, [muted, silent, hysteria, started]);
  useEffect(() => () => { audio.current?.close(); audio.current = null; }, []);
  async function start() {
    try {
      audio.current ??= createAmbience();
      await audio.current.resume();
      audio.current.set(hysteria, muted || silent || document.hidden);
      setStarted(true);
    } catch { audio.current?.close(); audio.current = null; setFailed(true); }
  }
  const caption = silent ? 'Silence at the confession desk and after the ending.' : hysteria >= 70 ? 'Several low layers overlap; collective pressure is rising.' : hysteria >= 35 ? 'A second low layer joins the room’s murmur.' : 'A single low murmur beneath the room.';
  return <div className="ambience" data-audio-state={failed ? 'unavailable' : !started ? 'not-started' : muted || silent ? 'silent' : 'playing'}>
    <p className="sound-caption">Sound description: {caption}</p>
    {!started && !failed && <button className="text-button" disabled={muted} onClick={() => void start()}>Enable optional ambience</button>}
    {started && <p>{muted ? 'Sound muted.' : silent ? 'Ambience is silent here.' : 'Ambience enabled. Use Mute sound to stop it.'}</p>}
    {failed && <p>Audio is unavailable. The sound description carries the same information.</p>}
  </div>;
}
