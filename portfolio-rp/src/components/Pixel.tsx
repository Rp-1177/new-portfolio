import { useEffect, useState } from 'react';
import { SPRITE } from '../data/content';

// parado, meia, aberta, meia
const SEQ = [SPRITE.idle, ...SPRITE.talk, ...SPRITE.talk.slice(0, -1).reverse()];

export function Pixel({ talking }: { talking: boolean }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    [...SEQ, SPRITE.jump].forEach((src) => { new Image().src = src; });
  }, []);

  useEffect(() => {
    if (!talking) { setFrame(0); return; }
    const t = setInterval(() => setFrame((f) => (f + 1) % SEQ.length), 140);
    return () => clearInterval(t);
  }, [talking]);

  return <img className="spr" src={SEQ[frame]} width={395} height={420} alt="" />;
}