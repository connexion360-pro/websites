const services = [
  { icon: '⚡', title: 'Panne', text: 'Recherche de panne, coupure en roulant, trottinette qui ne démarre plus et codes erreurs.' },
  { icon: '◉', title: 'Pneus', text: 'Crevaison, chambre à air, pneu plein ou pneu gonflable selon le modèle.' },
  { icon: '▣', title: 'Freins', text: 'Réglage, resserrage, plaquettes, disque, frein à câble ou hydraulique.' },
  { icon: '▰', title: 'Batterie', text: 'Contrôle de charge, autonomie, connectiques et diagnostic avant remplacement.' },
  { icon: '⌁', title: 'Contrôleur', text: 'Diagnostic contrôleur, accélération irrégulière, coupures, perte de puissance et codes erreurs.' },
  { icon: '◎', title: 'Moteur', text: 'Diagnostic moteur roue, bruit anormal, perte de puissance ou problème d’accélération.' },
  { icon: '✦', title: 'Écran & câblage', text: 'Contrôle afficheur, gâchette, connecteurs, câbles et éléments électriques visibles.' },
  { icon: '✚', title: 'Entretien', text: 'Révision, serrages, sécurité, nettoyage technique et conseils personnalisés.' }
];

const tarifs = [
  { label: 'Diagnostic < 500W', price: '20 €', detail: 'Recherche de panne, contrôle de base et orientation de réparation.' },
  { label: 'Diagnostic > 500W', price: '60 €', detail: 'Diagnostic renforcé pour modèles puissants et pannes complexes.' },
  { label: 'Crevaison', price: '30 €', detail: 'Changement de chambre à air. Pneu en supplément si nécessaire.' },
  { label: 'Frein à câble', price: '15 €', detail: 'Réglage, contrôle et resserrage du frein à câble.' },
  { label: 'Frein double', price: '20 €', detail: 'Réglage et contrôle du freinage double.' },
  { label: 'Hydraulique simple', price: '30 €', detail: 'Réglage et contrôle d’un frein hydraulique simple.' },
  { label: 'Hydraulique double', price: '40 €', detail: 'Réglage et contrôle d’un freinage hydraulique double.' },
  { label: 'Remplacement plaquettes', price: '15 €', detail: 'Si les plaquettes sont déjà en votre possession.' },
  { label: 'Plaquettes vendues', price: '+5 €', detail: 'Supplément si les plaquettes sont fournies par Bob’Répar.' },
  { label: 'Main d’œuvre < 500W', price: '20 €', detail: 'Main d’œuvre hors pièces pour trottinette inférieure à 500W.' },
  { label: 'Main d’œuvre > 500W', price: '60 €', detail: 'Main d’œuvre hors pièces pour trottinette supérieure à 500W.' },
  { label: 'Entretien complet', price: '50 €', detail: 'Contrôle général, resserrage, nettoyage et conseils personnalisés.' }
];

const steps = [
  { number: '01', title: 'Diagnostic', text: 'On identifie l’origine de la panne avant toute intervention.' },
  { number: '02', title: 'Réparation', text: 'Freins, pneus, batterie, moteur, contrôleur ou connectique.' },
  { number: '03', title: 'Restitution', text: 'La trottinette est contrôlée avant de reprendre la route.' }
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
    answer: 'Une intervention à domicile est possible selon la panne, le secteur et le planning. Envoyez une photo, le modèle et les symptômes.'
  },
  {
    question: 'Les pièces sont-elles comprises dans les tarifs ?',
    answer: 'Les tarifs affichés concernent le service ou la main d’œuvre indiquée. Les pièces, pneus ou consommables peuvent être facturés en supplément.'
  }
];

const contactLinks = [
  { label: 'Téléphone', value: '07 44 14 53 19', href: 'tel:+33744145319', icon: '☎' },
  { label: 'WhatsApp', value: 'Écrire sur WhatsApp', href: 'https://wa.me/33744145319', icon: '✆' },
  { label: 'Instagram', value: '@bob.repar', href: 'https://www.instagram.com/bob.repar?igsh=MXhtOWRqeWl0MzRibg==', icon: '◎' },
  { label: 'Facebook', value: 'Page Bob’Répar', href: 'https://www.facebook.com/share/1AaP5fsixz/', icon: 'f' },
  { label: 'Snapchat', value: 'bobrepar', href: 'https://www.snapchat.com/add/bobrepar?share_id=lG7EWtiueWQ&locale=fr-FR', icon: '👻' },
  { label: 'AlloVoisins', value: 'Profil Bob’Répar', href: 'https://www.allovoisins.com/p/bobrepar?from=offreurs&utm_source=product_transactionnel&utm_medium=share&utm_campaign=profile', icon: 'AV' },
  { label: 'Nextdoor', value: 'Voir le profil', href: 'https://fr.nextdoor.com/!SJJZQW', icon: 'N' }
];

export default function Home() {
  const marqueeBrands = [...brands, ...brands];

  return (
    <main>
      <header className="navShell">
        <a className="brand" href="#accueil" aria-label="Bob’Répar - accueil">
          <img src="/logo-bob-repar.svg" alt="" aria-hidden="true" />
          <span>Bob’Répar</span>
        </a>
        <nav aria-label="Navigation principale">
          <a href="#services">Réparations</a>
          <a href="#fonctionnement">Fonctionnement</a>
          <a href="#tarifs">Tarifs</a>
          <a href="#atelier">Atelier</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="navCta" href="tel:+33744145319">Appeler</a>
      </header>

      <section id="accueil" className="hero">
        <div className="heroBackdrop" aria-hidden="true">
          <div className="tunnel tunnelOne" />
          <div className="tunnel tunnelTwo" />
          <div className="cable cableOne" />
          <div className="cable cableTwo" />
          <div className="ant antOne"><span/><span/><span/></div>
          <div className="ant antTwo"><span/><span/><span/></div>
          <div className="ant antThree"><span/><span/><span/></div>
          <div className="scooterCore">
            <div className="wheel leftWheel" />
            <div className="wheel rightWheel" />
            <div className="deck" />
            <div className="stem" />
            <div className="handle" />
            <div className="battery" />
          </div>
        </div>

        <div className="heroContent">
          <p className="eyebrow">Fourmilière mécanique • Île de Nantes</p>
          <h1>Diagnostic rapide. Réparation précise. Retour sur la route.</h1>
          <p className="lead">Une panne ne devrait pas arrêter vos trajets. Bob’Répar remet votre trottinette électrique en mouvement avec un travail minutieux, clair et fiable.</p>
          <div className="actions">
            <a className="button primary" href="tel:+33744145319">Prendre rendez-vous <span>↗</span></a>
            <a className="button secondary" href="https://wa.me/33744145319" target="_blank" rel="noreferrer">Diagnostiquer ma panne</a>
          </div>
          <div className="heroStats" aria-label="Informations clés">
            <span><strong>07 44 14 53 19</strong>Téléphone</span>
            <span><strong>Île de Nantes</strong>Atelier</span>
            <span><strong>100%</strong>Mobilité électrique</span>
          </div>
        </div>
      </section>

      <section className="brandMarquee" aria-label="Marques de trottinettes électriques">
        <div className="marqueeTrack">
          {marqueeBrands.map((brand, index) => (
            <span key={`${brand}-${index}`}>{brand}</span>
          ))}
        </div>
      </section>

      <section id="services" className="section sectionGrid">
        <div className="sectionIntro">
          <p className="eyebrow">Réparations</p>
          <h2>Notre colonie s’occupe de tout.</h2>
          <p>De la batterie aux freins, nous remettons votre trottinette en mouvement avec une approche technique, organisée et transparente.</p>
        </div>
        <div className="serviceGrid">
          {services.map((service) => (
            <article className="techCard" key={service.title}>
              <div className="iconLine"><span>{service.icon}</span></div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="fonctionnement" className="section processSection">
        <p className="eyebrow">Fonctionnement</p>
        <h2>Trois étapes. Une trajectoire claire.</h2>
        <div className="processLine">
          {steps.map((step) => (
            <article className="processCard" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="tarifs" className="section">
        <div className="sectionIntro narrow">
          <p className="eyebrow">Tarifs</p>
          <h2>Prix clairs avant intervention.</h2>
          <p>Les tarifs concernent le service ou la main d’œuvre indiquée. Les pièces, pneus ou consommables peuvent être facturés en supplément selon le modèle.</p>
        </div>
        <div className="tarifs">
          {tarifs.map((tarif) => (
            <article key={tarif.label}>
              <span>{tarif.label}</span>
              <strong>{tarif.price}</strong>
              <p>{tarif.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="atelier" className="section atelierSection">
        <div className="atelierPanel">
          <p className="eyebrow">Atelier</p>
          <h2>Une fourmilière technique sur l’Île de Nantes.</h2>
          <p>Bob’Répar accueille les trottinettes sur rendez-vous. Envoyez une photo, le modèle et les symptômes pour préparer le diagnostic.</p>
          <div className="addressCard">
            <strong>Adresse</strong>
            <span>Île de Nantes</span>
          </div>
        </div>
        <div className="labVisual" aria-hidden="true">
          <div className="labGlow" />
          <div className="labChip" />
          <div className="labBattery" />
          <div className="labAnt"><span/><span/><span/></div>
        </div>
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

      <section className="ctaBand">
        <div>
          <p>NE LAISSEZ PAS UNE PETITE PANNE BLOQUER VOS TRAJETS.</p>
          <a href="https://wa.me/33744145319" target="_blank" rel="noreferrer">Demander un devis ↗</a>
        </div>
      </section>

      <section id="contact" className="section contact">
        <p className="eyebrow">Contact</p>
        <h2>Prêt à repartir ?</h2>
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
        <a className="button primary" href="mailto:bobrepar.pro@gmail.com">bobrepar.pro@gmail.com</a>
      </section>

      <footer className="footer">
        <div>
          <a className="footerBrand" href="#accueil">Bob’Répar</a>
          <p>Réparation de trottinettes électriques sur l’Île de Nantes.</p>
        </div>
        <div className="footerInfo">
          <span>Adresse : Île de Nantes</span>
          <a href="tel:+33744145319">07 44 14 53 19</a>
          <a href="mailto:bobrepar.pro@gmail.com">bobrepar.pro@gmail.com</a>
        </div>
        <div className="footerSocials">
          {contactLinks.slice(1).map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer" key={`footer-${link.label}`} aria-label={link.label}>{link.icon}</a>
          ))}
        </div>
      </footer>
    </main>
  );
}
