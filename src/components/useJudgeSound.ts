import { useEffect, useRef, useState } from 'react';
export function useJudgeSound(fear:number,ended:boolean) {
  const ctx=useRef<AudioContext|null>(null);const [enabled,setEnabled]=useState(false);const [issue,setIssue]=useState('');
  useEffect(()=>{if(!enabled||ended)return;let note=0;const audio=ctx.current!;
    const timer=window.setInterval(()=>{if(document.hidden||audio.state!=='running')return;const oscillator=audio.createOscillator();const gain=audio.createGain();oscillator.type='triangle';oscillator.frequency.value=[164.81,196,174.61,fear>=80?207.65:220][note++%4];gain.gain.setValueAtTime(0,audio.currentTime);gain.gain.linearRampToValueAtTime(.025,audio.currentTime+.02);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.19);oscillator.connect(gain);gain.connect(audio.destination);oscillator.start();oscillator.stop(audio.currentTime+.2);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};},850-fear*5);
    return ()=>window.clearInterval(timer);
  },[enabled,fear,ended]);
  useEffect(()=>()=>{void ctx.current?.close();},[]);
  async function toggle() {
    if(enabled){setEnabled(false);await ctx.current?.suspend();return;}
    try{ctx.current??=new AudioContext();await ctx.current.resume();setEnabled(true);setIssue('');}
    catch{setIssue("Sound could not start. The meters and warnings will still work.");}
  }
  return {enabled,toggle,caption:issue||(ended?"The music stops when the game ends.":enabled?"The music gets faster as Hysteria rises.":"Sound is off. You can still follow the meters and read every warning.")};
}
