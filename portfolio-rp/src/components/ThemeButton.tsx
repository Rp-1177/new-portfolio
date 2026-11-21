import { useEffect, useState } from 'react';

const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

// Botão "Modo vermelho" (toque e teclado) + código secreto
export function ThemeButton() {
  const [red, setRed] = useState(false);

  function toggle() {
    const root = document.documentElement;
    const on = root.dataset.theme === 'p';
    if (on) delete root.dataset.theme; else root.dataset.theme = 'p';
    setRed(!on);
  }

  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      // e.code vale para qualquer layout de teclado e para B/A maiúsculos ou minúsculos
      pos = e.code === CODE[pos] ? pos + 1 : e.code === CODE[0] ? 1 : 0;
      if (pos === CODE.length) {
        pos = 0;
        const root = document.documentElement;
        const on = root.dataset.theme === 'p';
        if (on) delete root.dataset.theme; else root.dataset.theme = 'p';
        setRed(!on);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <button className="theme-btn sel" type="button" aria-pressed={red} onClick={toggle}>
      Modo vermelho
    </button>
  );
}
