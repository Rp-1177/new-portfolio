import { CONTACT } from "../data/content";

export function Contact() {
    return (
        <section className="section section--last" id="contato">
            <div className="wrap">
                <h2 className="h2 h2--wide">Vamos conversar</h2>
                <p className="lead">
                    Estou em busca da minha primeira oportunidade como Desenvolvedor Full Stack Júnior. Se você tem uma oportunidade, quer conhecer meu trabalho ou simplesmente trocar uma ideia sobre tecnologia, será um prazer conversar! 
                </p>

                <ul className="contact">
                    {CONTACT.map((c) => (
                        <li key={c.label}>
                            <a
                                className="big sel"
                                href={c.href}
                                download={c.download ? true : undefined}
                                {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}
                            >
                                {c.label}
                                <span className="big__sub">{c.sub}</span><span className="sr"> (abre em nova aba)</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}