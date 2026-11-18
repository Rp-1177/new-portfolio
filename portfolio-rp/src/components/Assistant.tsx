import { useEffect, useRef, useState } from "react";
import { ASSIST, SECTIONS, type SectionId } from "../data/content";
import { useSpeaker } from "../hooks/useSpeaker";
import { Pixel } from "./Pixel";

export function Assistant() {
  const { text, open, talking, hopKey, hopping, say, hush } = useSpeaker();
  const [visible, setVisible] = useState(false);
  const [auto, setAuto] = useState(() => {
    try { return localStorage.getItem('buddy-auto') !== 'off'; } catch { return true; }
  });
  const current = useRef<SectionId | null>(null);
  const explained = useRef(new Set<SectionId>());
  const autoRef = useRef(auto);
  const visibleRef = useRef(false);
  autoRef.current = auto;

  function maybeExplain() {
    const id = current.current;
    if (autoRef.current && id && visibleRef.current && !explained.current.has(id)) {
      explained.current.add(id);
      say(ASSIST[id]);
    }
  }

  // Aparece quando o início da página sai da tela
  useEffect(() => {
    const hero = document.getElementById('inicio');
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => {
      const away = !e.isIntersecting;
      visibleRef.current = away;
      setVisible(away);
      if (away) maybeExplain(); else { hush(); current.current = null; }
    }, { threshold: 0.25 });
    io.observe(hero);
    return () => io.disconnect();
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
        key={hopKey}
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