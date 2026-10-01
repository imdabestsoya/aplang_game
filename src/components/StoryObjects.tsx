// Original geometric illustrations; decorative, never evidence of supernatural events.
export function StoryObjects({ chapter, final }: { chapter: number; final: boolean }) {
  return <div className="scene-objects" aria-hidden="true">
    <svg aria-hidden="true" viewBox="0 0 520 130" fill="none" stroke="currentColor" strokeWidth="1.5" focusable="false">
      <path className="object-rule" d="M10 112H510" />
      <g className="candle-object" transform="translate(26 8)">
        <path d="M14 92h52M24 87h32V39H24zM32 39v-6M23 52c9 8 17-6 33 1" />
        <path className="candle-flame" d="M39 31c-16-8-2-19 0-26 10 13 13 20 0 26Z" />
      </g>
      {chapter === 1 && <g transform="translate(170 7)">
        <path d="M0 4h158v88H0zM12 16h134v64H12zM29 34h102M29 46h71M29 60h86" />
        <path d="m10 101 138-2M22 108l104-4" />
      </g>}
      {chapter === 2 && <g transform="translate(200 0)">
        <circle cx="38" cy="26" r="16" /><path d="m28 42-25 19 8 12 20-12-8 46h18l6-30 8 30h18L58 61l20 12 8-12-30-19Z" />
        <path strokeDasharray="3 4" d="M43 45v26M25 27h26" />
        <path d="m77 18 41 68M74 13l5 8M79 13l-5 4" />
      </g>}
      {chapter === 3 && <g>
        <g transform="translate(128 15)"><path d="M0 0h138v86H0zM12 16h112M12 34h112M12 52h112M12 70h112M45 16v54M89 16v54" /></g>
        <g className="court-seal" transform="translate(337 58)"><text y="59" textAnchor="middle" stroke="none" fill="currentColor" fontSize="11" letterSpacing="3">COURT</text><circle r="39" /><circle r="31" /><path d="M-21 15h42M-17 10V-9h34v19M-24-13 0-27l24 14ZM-8-6v15M8-6v15" /></g>
      </g>}
      {chapter === 4 && <g>
        <path className="jail-bars" d="M122 4v100M145 4v100M370 4v100M393 4v100" />
        <path d="M186 12h136v90H186zM201 29h104M201 40h76M201 51h98M201 82h102" />
        <path d="m327 36 29-27 7 8-31 25-11 4Z" />
        {final && <path strokeDasharray="2 4" d="M206 75h82" />}
      </g>}
      <path className="object-rule" d="M459 42v60M473 25v77M487 8v94" />
    </svg>
  </div>;
}
