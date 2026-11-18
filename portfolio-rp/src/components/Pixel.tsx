import { useEffect, useState } from "react";
import { SPRITE } from "../data/content";

export function Pixel({ talking }: { talking: boolean }) {
  const [frame, setFrame] = useState(0);
  const frames = [SPRITE.idle, ...SPRITE.talk];

  useEffect(() => {
    if (!talking || frames.length < 2) { setFrame(0); return; }
    const t = setInterval(() => setFrame((f) => (f + 1) % frames.length), 140);
    return () => clearInterval(t);
  }, [talking, frames.length]);

  return <img className="spr" src={frames[frame]} width={395} height={420} alt="" />;
}