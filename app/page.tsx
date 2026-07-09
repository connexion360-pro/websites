const services = [
  { title: 'Panne', text: 'Recherche de panne, code erreur, coupure en roulant ou trottinette qui ne démarre plus.' },
  { title: 'Crevaison', text: 'Réparation ou remplacement de chambre à air, pneu plein ou pneu gonflable selon le modèle.' },
  { title: 'Freins', text: 'Réglage, plaquettes, disque, câble et contrôle du freinage pour rouler en sécurité.' },
  { title: 'Batterie', text: 'Contrôle de charge, autonomie, connectiques et conseils avant remplacement.' },
  { title: 'Contrôleur', text: 'Diagnostic du contrôleur, accélération irrégulière, coupures, perte de puissance et lecture des codes erreurs.' },
  { title: 'Moteur', text: 'Diagnostic moteur roue, perte de puissance, bruit anormal ou problème d’accélération.' },
  { title: 'Entretien complet', text: 'Révision, serrages, sécurité, nettoyage technique et conseils personnalisés.' }
];

const tarifs = [
  { label: 'Diagnostic trottinette < 500W', price: '20 €', detail: 'Recherche de panne, contrôle de base et orientation de réparation.' },
  { label: 'Diagnostic trottinette > 500W', price: '60 €', detail: 'Diagnostic renforcé pour modèles puissants et pannes plus complexes.' },
  { label: 'Crevaison / chambre à air', price: '30 €', detail: 'Changement de chambre à air. Le pneu est en supplément si nécessaire.' },
  { label: 'Frein à câble', price: '15 €', detail: 'Réglage, contrôle et resserrage du frein à câble.' },
  { label: 'Frein double', price: '20 €', detail: 'Réglage et contrôle du freinage double.' },
  { label: 'Frein hydraulique simple', price: '30 €', detail: 'Réglage et contrôle d’un frein hydraulique simple.' },
  { label: 'Frein hydraulique double', price: '40 €', detail: 'Réglage et contrôle d’un freinage hydraulique double.' },
  { label: 'Remplacement plaquettes', price: '15 €', detail: 'Si les plaquettes sont déjà en votre possession.' },
  { label: 'Plaquettes vendues', price: '+5 €', detail: 'Supplément si les plaquettes sont fournies par Bob’Répar.' },
  { label: 'Main d’œuvre trott < 500W', price: '20 €', detail: 'Main d’œuvre hors pièces pour trottinette inférieure à 500W.' },
  { label: 'Main d’œuvre trott > 500W', price: '60 €', detail: 'Main d’œuvre hors pièces pour trottinette supérieure à 500W.' },
  { label: 'Entretien / révision / nettoyage', price: '50 €', detail: 'Contrôle général, resserrage, nettoyage et conseils personnalisés.' }
];

const photos = [
  { label: 'Atelier Bob’Répar', src: '/photos/atelier-orange-noir.png' },
  { label: 'Diagnostic batterie', src: '/photos/batterie-trottinette.png' },
  { label: 'Trottinette en atelier', src: '/photos/trottinette-atelier.png' },
  { label: 'Outillage professionnel', src: '/photos/outillage-atelier.png' },
  { label: 'Disques de frein', src: '/photos/disques-frein-portrait.png' },
  { label: 'Trottinette sportive', src: '/photos/trottinette-exterieur.png' },
  { label: 'Pièces détachées', src: '/photos/pieces-detachees.png' },
  { label: 'Pièces de freinage', src: '/photos/disques-frein.jpg' }
];

const brands = ['Xiaomi', 'Ninebot', 'Segway', 'Dualtron', 'Speedway', 'Kaabo', 'Vsett', 'Minimotors', 'Inokim', 'E-Twow', 'Wispeed', 'UrbanGlide', 'Navee', 'Kugoo', 'Nami', 'Teverun'];

const faqs = [
  {
    question: 'Quelles marques de trottinettes acceptez-vous ?',
    answer: 'Bob’Répar accepte toutes les marques de trottinettes électriques, en fonction de la disponibilité des pièces et de la faisabilité de la réparation.'
  },
  {
    question: 'Faut-il prendre rendez-vous ?',
    answer: 'Oui, il est préférable de prendre contact avant de passer afin de prévoir un créneau de diagnostic ou de réparation.'
  },
  {
    question: 'Pouvez-vous intervenir à domicile ?',
    answer: 'Une intervention à domicile est possible selon la panne, le secteur et le planning. Le plus simple est d’envoyer une photo, le modèle et les symptômes.'
  },
  {
    question: 'Les pièces sont-elles comprises dans les tarifs ?',
    answer: 'Les tarifs affichés concernent le service ou la main d’œuvre indiquée. Les pièces, pneus ou consommables peuvent être facturés en supplément selon le modèle.'
  }
];

const contactLinks = [
  { label: 'Téléphone', value: '07 44 14 53 19', href: 'tel:+33744145319', icon: '☎' },
  { label: 'WhatsApp', value: 'Écrire sur WhatsApp', href: 'https://wa.me/33744145319', icon: '✆' },
  { label: 'Instagram', value: '@bob.repar', href: 'https://www.instagram.com/bob.repar?igsh=MXhtOWRqeWl0MzRibg==', icon: '◎' },
  { label: 'Facebook', value: 'Page Bob’Répar', href: 'https://www.facebook.com/share/1AaP5fsixz/', icon: 'f' },
  { label: 'Post Facebook', value: 'Publication à partager', href: 'https://www.facebook.com/share/p/1CqQQPG5i5/', icon: 'f+' },
  { label: 'Snapchat', value: 'bobrepar', href: 'https://www.snapchat.com/add/bobrepar?share_id=lG7EWtiueWQ&locale=fr-FR', icon: '👻' },
  { label: 'AlloVoisins', value: 'Profil Bob’Répar', href: 'https://www.allovoisins.com/p/bobrepar?from=offreurs&utm_source=product_transactionnel&utm_medium=share&utm_campaign=profile', icon: 'AV' },
  { label: 'Nextdoor', value: 'Voir le profil', href: 'https://fr.nextdoor.com/!SJJZQW', icon: 'N' }
];

export default function Home() {
  const marqueeBrands = [...brands, ...brands];

  return (
    <main>
      <header className="header">
        <a
          className="brand"
          href="#accueil"
          aria-label="Bob’Répar - retour à l’accueil"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '.65rem' }}
        >
          <img
            src="/logo-bob-repar.svg"
            alt=""
            aria-hidden="true"
            style={{ width: '4.25rem', height: '3rem', objectFit: 'contain' }}
          />
          <span>Bob’</span>Répar
        </a>
        <nav>
          <a href="#services">Services</a>
          <a href="#atelier">Atelier</a>
          <a href="#galerie">Galerie</a>
          <a href="#tarifs">Tarifs</a>
          <a href="#faq">FAQ</a>
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
            Panne, crevaison, freins, batterie, moteur, contrôleur ou entretien complet : diagnostic clair, réparation soignée et conseils personnalisés.
          </p>
          <div className="actions">
            <a className="button primary" href="tel:+33744145319">Appeler Bob’Répar</a>
            <a className="button secondary" href="https://wa.me/33744145319" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <ul className="proofs">
            <li>Adresse : Île de Nantes</li>
            <li>Diagnostic & réparations</li>
            <li>Service rapide et soigné</li>
            <li>Conseils personnalisés</li>
          </ul>
        </div>
        <div className="heroVisual photoHero" style={{ backgroundImage: `linear-gradient(180deg, rgba(5,5,5,.16), rgba(5,5,5,.72)), url(${photos[0].src})` }} aria-label="Atelier Bob’Répar">
          <div className="badge">07 44 14 53 19</div>
          <div className="heroCaption">Atelier, diagnostic et réparations sur l’Île de Nantes</div>
        </div>
      </section>

      <section className="brandMarquee" aria-label="Marques de trottinettes électriques">
        <div className="marqueeTrack">
          {marqueeBrands.map((brand, index) => (
            <span key={`${brand}-${index}`}>{brand}</span>
          ))}
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
          <div className="addressCard">
            <strong>Adresse</strong>
            <span>Île de Nantes</span>
          </div>
        </div>
        <div className="photoGrid">
          {photos.slice(1, 4).map((photo) => (
            <div className="photoTile" key={photo.src} style={{ backgroundImage: `linear-gradient(180deg, rgba(5,5,5,.05), rgba(5,5,5,.72)), url(${photo.src})` }}>
              <span>{photo.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="galerie" className="section gallerySection">
        <p className="eyebrow">Galerie</p>
        <h2>L’univers Bob’Répar en images.</h2>
        <p className="galleryIntro">Atelier, batteries, freins, pièces, outils et trottinettes : une présentation visuelle du travail réalisé.</p>
        <div className="gallery">
          {photos.map((photo) => (
            <figure className="galleryCard" key={photo.src} style={{ backgroundImage: `linear-gradient(180deg, rgba(5,5,5,0), rgba(5,5,5,.78)), url(${photo.src})` }}>
              <figcaption>{photo.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="tarifs" className="section">
        <p className="eyebrow">Tarifs</p>
        <h2>Des prix clairs avant intervention.</h2>
        <div className="tarifs">
          {tarifs.map((tarif) => (
            <article key={tarif.label}>
              <span>{tarif.label}</span>
              <strong>{tarif.price}</strong>
              <p>{tarif.detail}</p>
            </article>
          ))}
        </div>
        <p className="note">Les prix indiqués correspondent à la main d’œuvre ou au service précisé. Les pièces et pneus peuvent être facturés en supplément selon le modèle.</p>
      </section>

      <section id="faq" className="section faqSection">
        <p className="eyebrow">FAQ</p>
        <h2>Questions fréquentes.</h2>
        <div className="faqGrid">
          {faqs.map((faq) => (
            <article className="faqCard" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact">
        <p className="eyebrow">Contact</p>
        <h2>Envoyez une photo, le modèle et la panne.</h2>
        <p>Adresse : Île de Nantes. Appel, WhatsApp, Instagram, Facebook, Snapchat, AlloVoisins ou Nextdoor.</p>
        <div className="contactGrid">
          {contactLinks.map((link) => (
            <a className="contactCard" href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined} key={link.label}>
              <span className="contactIcon">{link.icon}</span>
              <small>{link.label}</small>
              <strong>{link.value}</strong>
            </a>
          ))}
        </div>
        <a className="button primary" href="mailto:bobrepare44@gmail.com">bobrepare44@gmail.com</a>
        <div className="hashtags">#BobRepar #TrottinetteElectrique #ReparationTrottinette #IleDeNantes #Nantes</div>
      </section>

      <footer className="footer">
        <div>
          <a className="footerBrand" href="#accueil"><span>Bob’</span>Répar</a>
          <p>Réparation de trottinettes électriques sur l’Île de Nantes.</p>
        </div>
        <div className="footerInfo">
          <span>Adresse : Île de Nantes</span>
          <a href="tel:+33744145319">07 44 14 53 19</a>
          <a href="mailto:bobrepare44@gmail.com">bobrepare44@gmail.com</a>
        </div>
        <div className="footerSocials">
          {contactLinks.slice(1).map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer" key={`footer-${link.label}`} aria-label={link.label}>
              {link.icon}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}
