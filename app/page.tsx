const services = [
  { title: 'Panne', text: 'Recherche de panne, code erreur, coupure en roulant ou trottinette qui ne démarre plus.' },
  { title: 'Crevaison', text: 'Réparation ou remplacement de chambre à air, pneu plein ou pneu gonflable selon le modèle.' },
  { title: 'Freins', text: 'Réglage, plaquettes, disque, câble et contrôle du freinage pour rouler en sécurité.' },
  { title: 'Batterie', text: 'Contrôle de charge, autonomie, connectiques et conseils avant remplacement.' },
  { title: 'Moteur', text: 'Diagnostic moteur roue, perte de puissance, bruit anormal ou problème d’accélération.' },
  { title: 'Entretien complet', text: 'Révision, serrages, sécurité, nettoyage technique et conseils personnalisés.' }
];

const tarifs = [
  ['Diagnostic', 'à partir de 19 €'],
  ['Réglage freins', 'à partir de 25 €'],
  ['Crevaison', 'à partir de 29 €'],
  ['Entretien complet', 'à partir de 59 €'],
  ['Batterie / moteur', 'sur devis'],
  ['Intervention à domicile', 'selon secteur']
];

export default function Home() {
  return (
    <main>
      <header className="header">
        <a className="brand" href="#accueil"><span>Bob’</span>Répar</a>
        <nav>
          <a href="#services">Services</a>
          <a href="#atelier">Atelier</a>
          <a href="#tarifs">Tarifs</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="accueil" className="hero section">
        <div className="heroText">
          <p className="eyebrow">Île de Nantes • trottinettes électriques</p>
          <h1>Votre spécialiste de la réparation de trottinettes électriques.</h1>
          <p className="lead">
            Bob’Répar remet votre trottinette en état rapidement pour que vous puissiez reprendre la route en toute sécurité.
          </p>
          <p>
            Panne, crevaison, freins, batterie, moteur ou entretien complet : diagnostic clair, réparation soignée et conseils personnalisés.
          </p>
          <div className="actions">
            <a className="button primary" href="mailto:bobrepare44@gmail.com">Contacter Bob’Répar</a>
            <a className="button secondary" href="#tarifs">Voir les tarifs</a>
          </div>
          <ul className="proofs">
            <li>Atelier situé sur l’Île de Nantes</li>
            <li>Diagnostic & réparations</li>
            <li>Service rapide et soigné</li>
            <li>Conseils personnalisés</li>
          </ul>
        </div>
        <div className="heroVisual" aria-label="Illustration trottinette">
          <div className="badge">Service rapide</div>
          <div className="scooter"><span className="wheel left"/><span className="wheel right"/><span className="deck"/><span className="bar"/><span className="handle"/></div>
        </div>
      </section>

      <section id="services" className="section">
        <p className="eyebrow">Réparations</p>
        <h2>On s’occupe des pannes les plus fréquentes.</h2>
        <div className="grid">
          {services.map((service) => (
            <article className="card" key={service.title}>
              <span>{service.title}</span>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="atelier" className="section split">
        <div>
          <p className="eyebrow">Atelier</p>
          <h2>Passez chez Bob’Répar et redonnez un coup de boost à votre trottinette.</h2>
          <p>
            L’atelier est situé sur l’Île de Nantes. Vous pouvez venir sur rendez-vous, ou demander une intervention à domicile lorsque la panne le permet.
          </p>
        </div>
        <div className="photoGrid">
          <div>Atelier</div>
          <div>Diagnostic</div>
          <div>Réparation</div>
        </div>
      </section>

      <section id="tarifs" className="section">
        <p className="eyebrow">Tarifs</p>
        <h2>Des repères simples avant devis final.</h2>
        <div className="tarifs">
          {tarifs.map(([label, price]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{price}</strong>
            </article>
          ))}
        </div>
        <p className="note">Les tarifs sont indicatifs et peuvent varier selon le modèle, les pièces et l’état de la trottinette.</p>
      </section>

      <section id="contact" className="section contact">
        <p className="eyebrow">Contact</p>
        <h2>Envoyez une photo, le modèle et la panne.</h2>
        <p>Contact par Instagram : Bob Répare. Téléphone bientôt disponible.</p>
        <a className="button primary" href="mailto:bobrepare44@gmail.com">bobrepare44@gmail.com</a>
        <div className="hashtags">#BobRepar #TrottinetteElectrique #ReparationTrottinette #IleDeNantes #Nantes</div>
      </section>
    </main>
  );
}
