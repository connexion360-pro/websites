const services = ['Diagnostic rapide','Freins et securite','Pneus et crevaisons','Intervention a domicile'];

export default function Home() {
  return (
    <main className="page">
      <nav className="nav"><img src="/logo-placeholder.svg" alt="Bob Repare"/><div><a href="#services">Services</a><a href="#atelier">Atelier</a><a href="#tarifs">Tarifs</a><a href="#contact">Contact</a></div></nav>
      <section className="hero"><div><p className="eyebrow">Trottinettes electriques a Nantes</p><h1>Bob Repare remet votre trottinette sur la route.</h1><p>Atelier sur l ile de Nantes, diagnostic clair, reparations sur rendez-vous et intervention a domicile quand la panne le permet.</p><div className="actions"><a className="primary" href="mailto:bobrepare44@gmail.com">Demander un diagnostic</a><a className="secondary" href="#tarifs">Voir les tarifs</a></div></div><div className="visual"><div className="wheel one"/><div className="deck"/><div className="wheel two"/><div className="bar"/></div></section>
      <section id="services" className="section"><p className="eyebrow">Services</p><h2>Des reparations simples, claires et efficaces.</h2><div className="grid">{services.map((service) => <article key={service}><span>Bob Repare</span><h3>{service}</h3><p>Une prise en charge transparente, un devis avant intervention et un controle avant restitution.</p></article>)}</div></section>
      <section id="atelier" className="atelier"><div><p className="eyebrow">Atelier</p><h2>Un point de reparation pratique sur l ile de Nantes.</h2><p>Vous pouvez venir a l atelier sur rendez-vous ou demander une intervention a domicile. Envoyez une photo, le modele et la panne pour recevoir une premiere orientation.</p></div><div className="photos"><div>Atelier</div><div>Reparations</div><div>Pieces</div></div></section>
      <section id="tarifs" className="section"><p className="eyebrow">Tarifs</p><h2>Tarifs indicatifs</h2><div className="prices"><article><span>Diagnostic</span><strong>a partir de 19 euros</strong></article><article><span>Reglage freins</span><strong>a partir de 15 euros</strong></article><article><span>Revision securite</span><strong>a partir de 39 euros</strong></article><article><span>Pneu ou chambre a air</span><strong>sur devis</strong></article></div></section>
      <footer id="contact" className="footer"><strong>Bob Repare</strong><a href="mailto:bobrepare44@gmail.com">bobrepare44@gmail.com</a><span>Instagram : Bob Repare</span><span>Telephone : bientot disponible</span></footer>
    </main>
  );
}
