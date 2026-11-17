import { useEffect, useRef, useState } from 'react';
import { CHOICES, SCRIPT, type Reply, type ReplyKey } from '../data/content';
import { useTypewriter } from '../hooks/useTypewriter';
import { Sprite } from './Sprite';

type Phase = 'typing' | 'choices' | 'reply';

export function Hero({ onToast }: { onToast: (msg: string) => void }) {
  const { shown, typing, say, skip } = useTypewriter();
  const [phase, setPhase] = useState<Phase>('typing');
  const [reply, setReply] = useState<Reply | null>(null);
  const [sound, setSound] = useState(false);
  const choicesRef = useRef<HTMLDivElement>(null);

  // Sequência de entrada: dispara a animação do CSS e depois escreve a primeira fala
  useEffect(() => {
    let cancelled = false;
    (async () => {
      await Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 1200))]);
      if (cancelled) return;
      document.documentElement.classList.add('is-ready');
      await new Promise((r) => setTimeout(r, 1500));
      if (cancelled) return;
      await say(SCRIPT.start);
      if (!cancelled) setPhase('choices');
    })();
    return () => { cancelled = true; };
  }, [say]);

  async function pick(key: ReplyKey) {
    const r = SCRIPT.replies[key];
    setPhase('typing');
    setReply(r);
    await say(r.text);
    setPhase('reply');
  }

  async function again() {
    setPhase('typing');
    await say(SCRIPT.again);
    setPhase('choices');
  }

  // Setas ↑ ↓ navegam entre as escolhas, como num menu de jogo
  function onChoicesKey(e: React.KeyboardEvent) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const items = Array.from(choicesRef.current?.querySelectorAll<HTMLButtonElement>('.choice') ?? []);
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    e.preventDefault();
    const next = e.key === 'ArrowDown' ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
    items[next].focus();
  }

  return (
    <section className="hero" id="inicio">
      <div className="wrap hero__grid">
        <h1 className="hero__name">
          <span className="name-line"><span>Ruan</span></span>
          <span className="name-line"><span>Pablo</span></span>
        </h1>
        <p className="hero__role">Desenvolvedor full-stack júnior</p>
        <div className="hero__sprite" aria-hidden="true"><Sprite /></div>

        <section
          className="dialog"
          aria-label="Conversa com o Ruan"
          onClick={(e) => { if (typing && !(e.target as HTMLElement).closest('button, a')) skip(); }}
        >
          <span className="dialog__who">Ruan</span>
          <button
            className="dialog__sound"
            type="button"
            aria-pressed={sound}
            onClick={() => setSound((s) => !s)}
          >
            {sound ? 'Som ligado' : 'Som desligado'}
          </button>

          <p className="dialog__text" aria-hidden="true">
            {shown}<span className="caret" />
          </p>
          {/* Leitores de tela recebem a fala completa só quando termina de digitar */}
          <p className="sr" aria-live="polite">{typing ? '' : shown}</p>

          {phase === 'choices' && (
            <div className="choices" role="group" aria-label="Escolha uma resposta" ref={choicesRef} onKeyDown={onChoicesKey}>
              {CHOICES.map((c) => (
                <button key={c.key} className="choice sel" type="button" onClick={() => pick(c.key)}>
                  {c.label}
                </button>
              ))}
            </div>
          )}

          {phase === 'reply' && reply && (
            <div className="extra">
              {reply.facts && (
                <dl className="facts">
                  {reply.facts.map(([k, v]) => (
                    <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                  ))}
                </dl>
              )}
              <div className="acts">
                {reply.actions.map((a) =>
                  a.href ? (
                    <a key={a.label} className="act sel" href={a.href}
                       {...(a.external ? { target: '_blank', rel: 'noopener' } : {})}>
                      {a.label}
                    </a>
                  ) : (
                    <button key={a.label} className="act sel" type="button" onClick={() => onToast(a.toast ?? '')}>
                      {a.label}
                    </button>
                  ),
                )}
                <button className="act act--quiet sel" type="button" onClick={again}>
                  Escolher outra resposta
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}