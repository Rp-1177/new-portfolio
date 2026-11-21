import { Fragment, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PROJECTS, type Project } from '../data/content';

const ease = [0.2, 0.8, 0.2, 1] as const;

function Tree({ text }: { text: string }) {
  return (
    <pre className="tree" aria-label="Estrutura de arquivos">
      <code>
        {text.split('\n').map((line, i) => {
          const m = line.match(/^(.*?)([\w.-]+\/)$/);
          return (
            <Fragment key={i}>
              {m ? <>{m[1]}<span className="d">{m[2]}</span></> : line}
              {'\n'}
            </Fragment>
          );
        })}
      </code>
    </pre>
  );
}

function Item({ p, open, onToggle }: { p: Project; open: boolean; onToggle: () => void }) {
  const id = `panel-${p.id}`;
  return (
    <article className="proj">
      <h3 className="proj__h">
        <button className="proj__head" type="button" aria-expanded={open} aria-controls={id} onClick={onToggle}>
          <span className="proj__name">{p.name}<span className="proj__sum">{p.summary}</span></span>
          <span className="proj__icon" aria-hidden="true">+</span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            style={{ overflow: 'hidden' }}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="proj__body">
              <div>
                <p>{p.text}</p>
                <ul className="tags" aria-label="Tecnologias">
                  {p.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <a className="link sel" href={p.href} target="_blank" rel="noopener">Abrir no GitHub<span className="sr"> (abre em nova aba)</span></a>
              </div>
              <Tree text={p.tree} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(PROJECTS[0].id);
  return (
    <section className="section" id="projetos">
      <div className="wrap">
        <h2 className="h2 h2--wide">Projetos em destaque</h2>
        <p className="lead">Conheça minhas criações, explore suas funcionalidades e descubra como foram desenvolvidas. Todos têm seus códigos disponíveis no Github.</p>
        <div className="projs">
          {PROJECTS.map((p) => (
            <Item key={p.id} p={p} open={openId === p.id} onToggle={() => setOpenId(openId === p.id ? null : p.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}