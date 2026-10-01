// Original synthesized texture: no recordings, speech, downloads, or randomness
// in gameplay. S23 represents overlapping pressure, never a clue or a timer.
export function createAmbience() {
  const context = new AudioContext();
  const volume = context.createGain();
  volume.gain.value = 0;
  volume.connect(context.destination);
  const layers = [97, 131, 173].map((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine'; oscillator.frequency.value = frequency;
    gain.gain.value = 0;
    oscillator.connect(gain); gain.connect(volume); oscillator.start();
    const pulse = context.createOscillator();
    const depth = context.createGain();
    pulse.frequency.value = .13 + index * .07; depth.gain.value = .9;
    pulse.connect(depth); depth.connect(oscillator.frequency); pulse.start();
    return { oscillator, gain, pulse };
  });
  return {
    resume: () => context.resume(),
    set(hysteria: number, silent: boolean) {
      const now = context.currentTime;
      volume.gain.cancelScheduledValues(now);
      volume.gain.setTargetAtTime(silent ? 0 : .3, now, .12);
      layers.forEach(({ gain }, i) => {
        gain.gain.cancelScheduledValues(now);
        gain.gain.setTargetAtTime(i === 0 || hysteria >= i * 35 ? .022 : 0, now, .25);
      });
    },
    close() { layers.forEach(l => { l.oscillator.stop(); l.pulse.stop(); }); void context.close(); },
  };
}
