import { useEffect, useRef, useState } from 'react';
import { trailContent } from '../content/trail';
import type { Landmark, PixelAsset } from '../content/trail/types';
import type { Exploration } from '../engine/trail/exploration';
import { drawCourtroom, drawPetitioner } from './courtroom';
import { validatePixels } from '../content/trail/validation';

const paintedAssets = new Map<string, HTMLCanvasElement>();

function paint(data: PixelAsset) {
  const canvas = document.createElement('canvas'); canvas.width = data.width; canvas.height = data.height;
  const ctx = canvas.getContext('2d')!;
  data.pixels.forEach((row, y) => [...row].forEach((color, x) => { if (data.palette[color] !== 'transparent') { ctx.fillStyle = data.palette[color]; ctx.fillRect(x, y, 1, 1); } }));
  return canvas;
}
export function TrailWorld({ state, reducedMotion, map, traveling = false, courtDay, arriving = false, onArrival }: { courtDay?: number; arriving?: boolean; onArrival?: () => void; state: Exploration; reducedMotion: boolean; map: Landmark; traveling?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const snapshot = useRef(state);
  const [issue, setIssue] = useState<string | null>(null);
  useEffect(() => { snapshot.current = state; }, [state]);
  useEffect(() => {
    const canvas = ref.current!;
    const container = canvas.parentElement!;
    const resize = () => { const scale = Math.min(container.clientWidth / 320, container.clientHeight / 180); const fit = scale >= 1 ? Math.floor(scale) : scale; canvas.style.width = `${Math.max(0, fit) * 320}px`; };
    const observer = new ResizeObserver(resize); observer.observe(container); resize();
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const controller = new AbortController(); let animation = 0; let disposed = false;
    const canvas = ref.current!; const ctx = canvas.getContext('2d')!;
    Promise.all(trailContent.assets.map(async asset => {
      const cached = paintedAssets.get(asset.id);
      if (cached) return [asset.id, cached] as const;
      const response = await fetch(asset.path, { signal: controller.signal });
      if (!response.ok) throw new Error('Missing scene artwork');
      const pixels = await response.json() as PixelAsset;
      if (validatePixels(pixels, asset).length) throw new Error('Invalid scene artwork');
      const painted = paint(pixels); paintedAssets.set(asset.id, painted);
      return [asset.id, painted] as const;
    })).then(entries => {
      if (disposed) return;
      const images = Object.fromEntries(entries); let previous = ''; let movedAt = 0; let arrivalStart: number | null = null; let announced = false;
      function draw(time: number) {
        const s = snapshot.current; const position = `${s.x},${s.y}`;
        if (position !== previous) { movedAt = time; previous = position; }
        const frame = reducedMotion ? 0 : time - movedAt < 240 ? 2 + Math.floor((time - movedAt) / 60) % 4 : Math.floor(time / 1200) % 2;
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, 320, 180);
        if (courtDay) drawCourtroom(ctx, map.id, time, reducedMotion);
        else ctx.drawImage(images[map.assetId], 0, 0);
        if (courtDay && map.id === 'chamber') {
          arrivalStart ??= time;
          const progress = arriving ? Math.min(1, (time - arrivalStart) / (reducedMotion ? 250 : 2400)) : 1;
          const targetX = map.spawn.x * 16 + 8; const targetY = map.spawn.y * 16 + 48;
          const visualProgress = reducedMotion ? 1 : progress;
          drawPetitioner(ctx, Math.round(160 + (targetX - 160) * visualProgress), Math.round(164 + (targetY - 164) * visualProgress), courtDay, arriving && progress < 1, time, reducedMotion);
          canvas.dataset.arrival = arriving && progress < 1 ? 'approaching' : 'waiting';
          if (arriving && progress === 1 && !announced) { announced = true; onArrival?.(); }
        }
        canvas.dataset.weather = courtDay ? (reducedMotion ? 'snow-still' : 'snow-falling') : 'none';
        const direction = ['south', 'north', 'west', 'east'].indexOf(s.direction);
        ctx.drawImage(images.john, frame * 16, direction * 32, 16, 32, s.x * 16, s.y * 16 - 16, 16, 32);
        map.interactions.forEach((item, index) => {
          const x = item.x * 16 + 8; const y = item.y * 16 - 12;
          ctx.fillStyle = s.inspected.includes(item.id) ? '#365866' : '#171719'; ctx.fillRect(x - 5, y - 7, 11, 12);
          ctx.fillStyle = '#f2e6cc'; ctx.font = '9px monospace'; ctx.textAlign = 'center'; ctx.fillText(String(index + 1), x, y + 2);
        });
        if (traveling) {
          ctx.drawImage(images['country-road'], 0, 0);
          const offset = reducedMotion ? 0 : Math.floor(time / 90) % 80;
          for (let x = -80; x < 400; x += 80) { ctx.fillStyle = '#4b4a40'; ctx.fillRect(x - offset, 84, 5, 47); ctx.fillStyle = '#343a3b'; ctx.fillRect(x - offset - 10, 63, 25, 30); }
          const cartFrame = reducedMotion ? 0 : Math.floor(time / 150) % 4;
          ctx.drawImage(images['horse-cart'], cartFrame * 64, 0, 64, 40, 124, 119, 64, 40);
        }
        canvas.dataset.ready = 'true'; animation = requestAnimationFrame(draw);
      }
      animation = requestAnimationFrame(draw);
    }).catch(error => { if (!disposed && error.name !== 'AbortError') {setIssue('The scene artwork is unavailable. Open Objects in the game menu to keep exploring.');if(arriving)onArrival?.();} });
    return () => { disposed = true; controller.abort(); cancelAnimationFrame(animation); };
  }, [reducedMotion, map, traveling, courtDay, arriving, onArrival]);
  return <><canvas ref={ref} width={320} height={180} aria-hidden="true" />{issue && <p role="alert">{issue}</p>}</>;
}
