import { useCallback, useRef, useState } from "react";
import { Motes } from "./components/Motes";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Games } from "./components/Games";
import { Contact } from "./components/Contact";
import { useKonami } from "./hooks/useKonami";
import { Assistant } from "./components/Assistant";

export default function App() {
  const [toast, setToast] = useState('');
  const timer = useRef<number | undefined>(undefined);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(''), 3200);
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const on = root.dataset.theme === 'p';
    if (on) delete root.dataset.theme; else root.dataset.theme = 'p';
    showToast(on ? 'Tema original de volta.' : 'Modo vermelho ligado. Repita o código para voltar.');
  }, [showToast]);

  useKonami(toggleTheme);

  return (
    <>
      <Motes /> <Assistant />
      <div className="slash" aria-hidden="true" />

      <header className="top">
        <div className="wrap top__row">
          <a className="top__brand" href="#inicio">Dev</a>
          <nav aria-label="Principal">
            <ul className="nav">
              <li><a className="nav__link sel" href="#sobre">Sobre</a></li>
              <li><a className="nav__link sel" href="#projetos">Projetos</a></li>
              <li><a className="nav__link sel" href="#jogos">Jogos</a></li>
              <li><a className="nav__link sel" href="#contato">Contato</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Hero onToast={showToast} />
        <About />
        <Projects />
        <Games />
        <Contact />
      </main>

      <footer className="foot">
        <div className="wrap foot__row">
          <p>Feito com React, TypeScript e Motion.</p>
          <p>Dica: ↑ ↑ ↓ ↓ ? ? ? ? B A</p>
        </div>
      </footer>

      <div className={`toast${toast ? ' is-on' : ''}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}