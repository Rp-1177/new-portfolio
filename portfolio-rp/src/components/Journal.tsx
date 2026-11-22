import { useRef, type CSSProperties } from 'react';
import { JOURNAL } from '../data/content';
import { useSpeaker } from '../hooks/useSpeaker';
import { Pixel } from './Pixel';

export function Journal() {
  const ref = useRef<HTMLDialogElement>(null);
  const { text, talking, say, hush } = useSpeaker();

  function open() {
    ref.current?.showModal();
    say(JOURNAL.hello);
  }

  function close() {
    const d = ref.current;
    if (!d) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { d.close(); return; }
    d.classList.add('is-closing'); // enrola o pergaminho antes de fechar
    setTimeout(() => { d.classList.remove('is-closing'); d.close(); }, 250);
  }

  return (
    <>
      <button className="quest" type="button" onClick={open}>
        <svg className="quest__icon" viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges">
          <path fill="#6B4A2B" d="M2 2h12v12H2z" />
          <path fill="#E9DBB8" d="M4 3h9v10H4z" />
          <path fill="#B03A2E" d="M2 2h2v12H2z" />
          <path fill="#6B4A2B" d="M6 5h5v1H6zM6 7h5v1H6zM6 9h3v1H6z" />
        </svg>
        <span>
          <span className="quest__title">Abrir a Jornada do Programador</span>
          <span className="quest__sub">A minha lore até aqui</span>
        </span>
      </button>

      <dialog
        ref={ref}
        className="scroll"
        aria-labelledby="diario-titulo"
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        onCancel={(e) => { e.preventDefault(); close(); }} // Esc também enrola
        onClose={hush}
      >
        <div className="scroll__paper">
          <div className="scroll__rod" aria-hidden="true" />
          <div className="scroll__sheet">
            <h2 id="diario-titulo" className="scroll__title">{JOURNAL.title}</h2>
            <p className="scroll__lead">{JOURNAL.lead}</p>
            <ol className="scroll__chapters">
              {JOURNAL.chapters.map((c, i) => (
                <li key={c.title} style={{ '--i': i } as CSSProperties}>
                  <h3><span className="scroll__n">Capítulo {i + 1}</span>{c.title}</h3>
                  <p>{c.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="scroll__rod" aria-hidden="true" />
        </div>

        <div className="scroll__talk">
          <div className="scroll__buddy"><Pixel talking={talking} /></div>
          <p aria-hidden="true">{text}</p>
          <p className="sr" aria-live="polite">{talking ? '' : text}</p>
          <button className="scroll__close" type="button" onClick={close}>Fechar o diário</button>
        </div>
      </dialog>
    </>
  );
}