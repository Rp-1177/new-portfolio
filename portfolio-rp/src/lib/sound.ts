import { useSyncExternalStore } from "react";

let ctx: AudioContext | null = null;
let enabled = false;
const listeners = new Set<() => void>();

export function setSound(on: boolean) {
  enabled = on;
  listeners.forEach((l) => l());
  if (on) blip();
}

export function blip(pitch = 340) {
  if (!enabled) return;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = pitch + Math.random() * 70; // variação pequena: soa mais "voz"
    gain.gain.setValueAtTime(0.02, ctx.currentTime);   // volume baixo
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.045);
  } catch {
    /* sem áudio disponível: segue sem som */
  }
}

// Hook para o botão: devolve [ligado, ligar/desligar]
export function useSound() {
  const on = useSyncExternalStore(
    (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
    () => enabled,
  );
  return [on, setSound] as const;
}