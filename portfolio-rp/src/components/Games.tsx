import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { GAMES } from "../data/content";

function Art({ id }: { id: string}) {
    switch(id) {
        case 'undertale':
            return <div className="game-art art-dialog" aria-hidden="true"><div className="a-box"><i /><i /><i className="short" /><span className="caret" /></div></div>;
        case 'persona':
            return <div className="game-art art-slash" aria-hidden="true"><i /><i /><i /></div>;
        case 'pokemon':
            return <div className="game-art art-menu" aria-hidden="true"><i className="on" /><i /><i /><i /></div>;
        default:
            return <div className="game-art art-light" aria-hidden="true"><b /><i /><i /><i /><i /><i /><i /></div>;
    }
}

export function Games() {
    const [active, setActive] = useState(GAMES[0].id);
    const game = GAMES.find((g) => g.id === active)!;

    function onKey(e: React.KeyboardEvent, i: number) {
    const last = GAMES.length - 1;
    let n: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = i === last ? 0 : i + 1;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = i === 0 ? last : i - 1;
    if (n === null) return;
    e.preventDefault();
    setActive(GAMES[n].id);
    document.getElementById(`t-${GAMES[n].id}`)?.focus();
  }

  return (
    <section className="section" id="jogos">
      <div className="wrap">
        <h2 className="h2 h2--wide">Ideias que nasceram nos jogos e chegaram ao código</h2>
        <div className="games">
          <div className="game-list" role="tablist" aria-label="Jogos" aria-orientation="vertical">
            {GAMES.map((g, i) => (
              <button
                key={g.id}
                id={`t-${g.id}`}
                className="game-btn sel"
                role="tab"
                type="button"
                aria-selected={active === g.id}
                aria-controls={`g-${g.id}`}
                tabIndex={active === g.id ? 0 : -1}
                onClick={() => setActive(g.id)}
                onMouseEnter={() => setActive(g.id)}
                onKeyDown={(e) => onKey(e, i)}
              >
                {g.name}
              </button>
            ))}
          </div>

          <div className="game-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={game.id}
                className="game-panel"
                role="tabpanel"
                id={`g-${game.id}`}
                aria-labelledby={`t-${game.id}`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
              >
                <Art id={game.id} />
                <h3 className="game-title">{game.title}</h3>
                <p>{game.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}