import { useEffect } from "react";

const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrownRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export function useKonami(onUnlock: () => void) {
    useEffect(() => {
        let pos = 0;
        const onKey = (e: KeyboardEvent) => {
        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        pos = key === CODE[pos] ? pos + 1 : key === CODE[0] ? 1 : 0;
        if (pos === CODE.length) {
            pos = 0;
            onUnlock();
        }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    }, [onUnlock]);
}