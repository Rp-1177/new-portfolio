import { useEffect, useRef, useState } from 'react';
import { ASSIST, SECTIONS, SPRITE, type SectionId } from '../data/content';
import { useSpeaker } from '../hooks/useSpeaker';
import { Pixel } from './Pixel';

const MAX_JUMPS = 3; // depois de 3 pulos ele só aparece, sem pular

export function Assistant() {
  const { text, open, talking, hopping, say, hush } = useSpeaker();
  const [visible, setVisible] = useState(false);
  const [auto, setAuto] = useState(() => {
    try { return localStorage.getItem('buddy-auto') !== 'off'; } catch { return true; }
  });
  const btnRef = useRef<HTMLButtonElement>(null);
  const current = useRef<SectionId | null>(null);
  const explained = useRef(new Set<SectionId>());
  const autoRef = useRef(auto);
  const visibleRef = useRef(false);
  const away = useRef(false);
  const jumps = useRef(0);
  const anim = useRef<Animation | null>(null);
  autoRef.current = auto;

  function maybeExplain() {
    const id = current.current;
    if (autoRef.current && id && visibleRef.current && !explained.current.has(id)) {
      explained.current.add(id);
      say(ASSIST[id]);
    }
  }

  // Aparece/pula quando você desce e some quando volta ao topo
  useEffect(() => {
    const heroSprite = document.querySelector<HTMLElement>('.hero__sprite');
    if (!heroSprite) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const jump = (from: DOMRect) => {
      const el = btnRef.current;
      if (!el) return;
      const img = el.querySelector<HTMLImageElement>('.spr');
      const to = el.getBoundingClientRect();
      const dx = from.left - to.left;
      const dy = from.top - to.top;
      const s0 = from.width / to.width;
      const lift = Math.min(170, Math.max(70, Math.abs(dy) * 0.25));
      const keyframes: Keyframe[] = [];
      for (let i = 0; i <= 16; i++) {
        const t = i / 16;
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        keyframes.push({
          translate: `${dx * (1 - e)}px ${dy * (1 - e) - Math.sin(Math.PI * t) * lift}px`,
          scale: String(s0 + (1 - s0) * e),
          opacity: 1,
        });
      }
      const restore = img?.src;
      if (SPRITE.jump && img) img.src = SPRITE.jump;
      el.classList.add('is-air');
      const a = el.animate(keyframes, { duration: 900, easing: 'linear' });
      anim.current = a;
      a.onfinish = () => {
        anim.current = null;
        el.classList.remove('is-air');
        if (img && restore) img.src = restore;
        el.classList.add('is-land');
        setTimeout(() => el.classList.remove('is-land'), 400);
        setTimeout(maybeExplain, 350);
      };
      a.oncancel = () => {
        el.classList.remove('is-air');
        if (img && restore) img.src = restore;
      };
    };

    const setAway = (next: boolean, animate: boolean) => {
      if (next === away.current) return;
      away.current = next;
      visibleRef.current = next;
      setVisible(next);
      if (next) {
        // Mede o ponto de partida ANTES de mexer em qualquer coisa, sempre no botão atual
        const heroBtn = heroSprite.querySelector<HTMLElement>('.hero__btn');
        const from = heroBtn?.getBoundingClientRect();
        const onScreen = !!from && from.width > 0 && from.bottom > 0 && from.top < window.innerHeight;
        heroSprite.classList.add('is-away');
        // shortcut: rolagem muito rápida (topo já fora da tela) = sem pulo, só aparece
        if (animate && !reduce && jumps.current < MAX_JUMPS && onScreen) { jumps.current++; jump(from!); }
        else setTimeout(maybeExplain, 400);
      } else {
        anim.current?.cancel();
        anim.current = null;
        hush();
        current.current = null;
        heroSprite.classList.remove('is-away');
      }
    };

    // Histerese: pula ao passar de 70px e só volta abaixo de 24px
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setAway(away.current ? window.scrollY > 24 : window.scrollY > 70, true);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    setAway(window.scrollY > 70, false); // página aberta já rolada: sem pulo
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Qual seção está no meio da tela
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        current.current = e.target.id as SectionId;
        maybeExplain();
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Esc fecha o balão
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') hush(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hush]);

  function toggleAuto() {
    const next = !auto;
    setAuto(next);
    try { localStorage.setItem('buddy-auto', next ? 'on' : 'off'); } catch { /* sem armazenamento */ }
    if (!next) hush();
  }

  return (
    <aside className={`buddy${visible ? ' is-on' : ''}`} aria-label="Assistente do site">
      {open && (
        <div className="bubble">
          <p className="bubble__text" aria-hidden="true">{text}</p>
          <p className="sr" aria-live="polite">{talking ? '' : text}</p>
          <button className="bubble__mute sel" type="button" onClick={toggleAuto}>
            {auto ? 'Silenciar explicações' : 'Ativar explicações'}
          </button>
        </div>
      )}
      <button
        ref={btnRef}
        className={`buddy__btn${talking ? ' is-talk' : ''}${hopping ? ' is-hop' : ''}`}
        type="button"
        aria-label="Pedir ajuda ao assistente"
        onClick={() => (open ? hush() : say(ASSIST[current.current ?? 'hello']))}
      >
        <Pixel talking={talking} />
      </button>
    </aside>
  );
}
