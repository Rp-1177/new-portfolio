import { useCallback, useEffect, useRef, useState } from "react";
import { blip } from "../lib/sound";

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useSpeaker() {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [talking, setTalking] = useState(false);
  const [hopKey, setHopKey] = useState(0); // muda a cada fala para reiniciar o pulo
  const [hopping, setHopping] = useState(false);
  const run = useRef(0);
  const closeTimer = useRef<number | undefined>(undefined);

  const hush = useCallback(() => {
    clearTimeout(closeTimer.current);
    run.current++;
    setTalking(false);
    setOpen(false);
  }, []);

  const say = useCallback(async (str: string) => {
    clearTimeout(closeTimer.current);
    const id = ++run.current;
    setOpen(true);
    setHopKey((k) => k + 1);
    setHopping(true);
    setTimeout(() => setHopping(false), 700);
    setTalking(true);

    if (prefersReduced()) {
      setText(str);
    } else {
      for (let i = 1; i <= str.length; i++) {
        if (run.current !== id) return; // outra fala começou
        setText(str.slice(0, i));
        if (str[i - 1] !== '  ') blip(430); // voz um pouco mais aguda que a da caixa do hero
        await new Promise((r) => setTimeout(r, /[.,!?:]/.test(str[i - 1]) ? 180 : 22));
      }
    }
    if (run.current !== id) return;
    setTalking(false);
    closeTimer.current = window.setTimeout(hush, 5000 + str.length * 45);
  }, [hush]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return { text, open, talking, hopKey, hopping, say, hush };
}