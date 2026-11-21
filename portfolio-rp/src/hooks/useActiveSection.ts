import { useEffect, useState } from 'react';
import { SECTIONS, type SectionId } from '../data/content';

// Devolve a seção que está no meio da tela, ou null quando você está no início
export function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id as SectionId); }),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });

    const hero = document.getElementById('inicio');
    const heroIo = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(null); },
      { threshold: 0.6 },
    );
    if (hero) heroIo.observe(hero);

    return () => { io.disconnect(); heroIo.disconnect(); };
  }, []);

  return active;
}