import { useCallback, useRef, useState } from "react";
import { Motes } from "./components/Motes";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Games } from "./components/Games";
import { Contact } from "./components/Contact";
import { ThemeButton } from "./components/ThemeButton";
import { Assistant } from "./components/Assistant";
import { useActiveSection } from "./hooks/useActiveSection";

export default function App() {
  const active = useActiveSection();
  const [toast, setToast] = useState('');
  const timer = useRef<number | undefined>(undefined);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(''), 3200);
  }, []);

  return (
    <>
    <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Motes /> <Assistant />
      <div className="slash" aria-hidden="true" />

      <header className="top">
        <div className="wrap top__row">
          <a className="top__brand" href="#inicio">Dev</a>
          <nav aria-label="Principal">
            <ul className="nav">
              {(['sobre', 'projetos', 'jogos', 'contato'] as const).map((id) => (
                <li key={id}>
                  <a
                    className="nav__link sel"
                    href={`#${id}`}
                    aria-current={active === id ? 'true' : undefined}
                  >
                    {id[0].toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="conteudo" tabIndex={-1}>
        <Hero onToast={showToast} />
        <About />
        <Projects />
        <Games />
        <Contact />
      </main>

      <footer className="foot">
        <div className="wrap foot__row">
          <p>Feito com React, TypeScript e Motion.</p>
          <p className="foot__hint">Dica: ↑ ↑ ↓ ↓ ? ? ? ? B A</p>
          <ThemeButton />
        </div>
      </footer>

      <div className={`toast${toast ? ' is-on' : ''}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}