import { useEffect, useRef } from 'react';

type Mote = { x: number; y: number; s: number; v: number; p: number };

export function Motes() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, raf = 0, frame = 0, rgb = '143,232,226';
    let list: Mote[] = [];

    const readColor = () => {
      const hex = getComputedStyle(document.documentElement).getPropertyValue('--alma').trim().replace('#', '');
      if (hex.length === 6) rgb = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(',');
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.round((w * h) / 22000));
      list = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        s: Math.random() < 0.8 ? 2 : 3,
        v: 0.12 + Math.random() * 0.3,
        p: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      if (frame++ % 30 === 0) readColor(); // acompanha a troca de tema
      ctx.clearRect(0, 0, w, h);
      for (const m of list) {
        const a = 0.12 + 0.3 * (0.5 + 0.5 * Math.sin(t / 900 + m.p));
        ctx.fillStyle = `rgba(${rgb},${a})`;
        ctx.fillRect(Math.round(m.x + Math.sin(t / 2500 + m.p) * 14), Math.round(m.y), m.s, m.s);
        if (!reduce) {
          m.y -= m.v;
          if (m.y < -4) { m.y = h + 4; m.x = Math.random() * w; }
        }
      }
    };

    const loop = (t: number) => { draw(t); raf = requestAnimationFrame(loop); };

    resize();
    if (reduce) draw(0); else raf = requestAnimationFrame(loop);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas id="motes" ref={ref} aria-hidden="true" />;
}