import { ABOUT, SHEET } from "../data/content";

export function About() {
    return (
        <section className="section" id="sobre">
            <div className="wrap about">
                <div className="about__text">
                    <h2 className="h2">{ABOUT.title}</h2>
                    {ABOUT.paragraphs.map((p) => (
                        <p key={p}>{p}</p>
                    ))}
                </div>

                <aside className="sheet" aria-label="Resumo técnico">
                    {SHEET.map((g) => (
                        <div className="sheet__group" key={g.title}>
                            <h3>{g.title}</h3>
                            <p>{g.items.join(', ')}</p>
                        </div>
                    ))}
                </aside>
            </div>
        </section>
    );
}