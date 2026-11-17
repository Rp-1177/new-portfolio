import { useCallback, useRef, useState } from 'react';

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useTypewriter() {
    const [shown, setShown] = useState('');
    const [typing, setTyping] = useState(false);
    const timer = useRef<number | undefined>(undefined);
    const run = useRef(0);
    const full = useRef('');
    const done = useRef<(() => void) | undefined>(undefined);

    const say = useCallback((text: string, speed = 24) => {
        return new Promise<void>((resolve) => {
            clearTimeout(timer.current);
            done.current?.();
            done.current = resolve;
            full.current = text;
            const id = ++run.current

            if (prefersReduced()) {
                setShown(text);
                setTyping(false);
                return resolve();
            }

            setTyping(true);
            let i = 0;
            const step = () => {
                if (id !== run.current) return;
                i++;
                setShown(text.slice(0,i));
                if (i >= text.length) {
                    setTyping(false);
                    return resolve();
                }
                const pause = /[.,!?:]/.test(text[i - 1]) ? 200 : speed;
                timer.current = window.setTimeout(step, pause);
            };
            step();
        });
    }, []);

    // Clicar na caixa termina a frase na hora
    const skip = useCallback(() => {
        run.current++;
        clearTimeout(timer.current);
        setShown(full.current);
        setTyping(false);
        done.current?.();
    }, []);

    return { shown, typing, say, skip };
}