import { ContactForm } from '@/components/ContactForm';
import { SectionHeading } from '@/components/SectionHeading';

const navItems = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'services', label: 'Services' },
  { id: 'diagnostic', label: 'Diagnostic' },
  { id: 'tarifs', label: 'Tarifs' },
  { id: 'zone', label: 'Zone' },
  { id: 'avis', label: 'Avis' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' }
];

const services = [
  {
    icon: 'F',
    title: 'Freins',
    text: `Réglage des freins mécaniques, remplacement de plaquettes, contrôle des disques et vérification du freinage avant remise en circulation.`
  },
  {
    icon: 'P',
    title: 'Pneus et chambres à air',
    text: `Réparation de crevaison, remplacement de chambre à air, montage de pneu plein ou gonflable selon compatibilité du modèle.`
  },
  {
    icon: 'B',
    title: 'Batterie',
    text: `Contrôle de charge, diagnostic d’autonomie, vérification des connectiques et conseils de remplacement si la batterie est en fin de vie.`
  },
  {
    icon: 'C',
    title: 'Contrôleur',
    text: `Analyse des symptômes électriques, recherche de panne sur contrôleur et vérification des connexions liées à l’accélération.`
  },
  {
    icon: 'M',
    title: 'Moteur',
    text: `Contrôle du moteur roue, bruit anormal, perte de puissance, câblage et diagnostic des composants associés.`
  },
  {
    icon: 'E',
    title: 'Éclairage',
    text: `Remise en état des feux avant et arrière, contrôle des commandes, câbles, connecteurs et éléments de visibilité.`
  },
  {
    icon: 'T',
    title: 'Potence',
    text: `Réglage du jeu, contrôle du pliage, serrage, vérification de sécurité et correction des vibrations inhabituelles.`
  },
  {
    icon: 'R',
    title: 'Entretien et révision',
    text: `Révision générale, serrages, pression, nettoyage technique, inspection des points de sécurité et recommandations d’usage.`
  }
];

const diagnosticSteps = [
  {
    title: 'Écoute du besoin',
    text: `Vous décrivez la panne, les circonstances et le comportement de la trottinette.`
  },
  {
    title: 'Contrôle visuel et sécurité',
    text: `Les éléments critiques sont inspectés : freinage, pneus, potence, câbles, connectiques et éclairage.`
  },
  {
    title: 'Tests ciblés',
    text: `Des tests simples permettent d’orienter le diagnostic sur la batterie, le contrôleur, le moteur ou les accessoires.`
  },
  {
    title: 'Devis clair',
    text: `Une estimation est proposée avant réparation. Le devis final dépend toujours du diagnostic réel.`
  }
];

const symptoms = [
  'La trottinette ne démarre plus ou se coupe en roulant',
  'Autonomie fortement réduite ou charge instable',
  'Freinage bruyant, mou ou moins efficace',
  'Crevaison, pneu usé ou vibration inhabituelle',
  'Code erreur, accélération irrégulière ou perte de puissance',
  'Jeu dans la potence, pliage difficile ou sensation d’instabilité'
];

const tariffs = [
  { service: 'Diagnostic initial', price: 'À partir de 19 €', detail: 'Contrôle de base, échange sur les symptômes et orientation de réparation.' },
  { service: 'Crevaison ou chambre à air', price: 'À partir de 29 €', detail: 'Main-d’œuvre indicative, pièces selon modèle en supplément.' },
  { service: 'Réglage freinage', price: 'À partir de 25 €', detail: 'Réglage câble, contrôle disque et essai fonctionnel.' },
  { service: 'Remplacement plaquettes', price: 'À partir de 35 €', detail: 'Hors pièces, selon compatibilité et accessibilité.' },
  { service: 'Contrôle batterie', price: 'À partir de 39 €', detail: 'Vérification charge, connectiques et premiers tests d’autonomie.' },
  { service: 'Entretien complet', price: 'À partir de 59 €', detail: 'Révision sécurité, serrages, pneus, freins et recommandations.' }
];

const reviews = [
  {
    name: 'Claire M.',
    text: `Ma trottinette freinait très mal. Bobrepar a expliqué le problème simplement et la réparation a été rapide. Le contact était clair du début à la fin.`
  },
  {
    name: 'Nassim B.',
    text: `Très bon échange pour une panne de batterie. J’ai apprécié le diagnostic posé avant de proposer une intervention plus coûteuse.`
  },
  {
    name: 'Julie R.',
    text: `Crevaison réparée et conseils utiles pour éviter de rouler sous-gonflé. Service sérieux, propre et rassurant.`
  }
];

const faqs = [
  {
    question: 'Combien de temps prend une réparation ?',
    answer: `Le délai dépend de la panne, de la disponibilité des pièces et du planning. Une réparation simple peut être rapide, tandis qu’un problème électrique nécessite souvent un diagnostic plus poussé.`
  },
  {
    question: 'Les pièces sont-elles fournies ?',
    answer: `Bobrepar peut proposer des pièces compatibles selon les modèles ou installer une pièce fournie par le client si elle est adaptée et sûre. La compatibilité est toujours vérifiée avant intervention.`
  },
  {
    question: 'Le devis est-il obligatoire avant réparation ?',
    answer: `Oui. Une estimation est présentée avant intervention. Le montant final peut varier si le diagnostic révèle une panne différente ou plusieurs éléments à remplacer.`
  },
  {
    question: 'Quelles marques de trottinettes sont acceptées ?',
    answer: `Le site est prévu pour rester éditable : indiquez ici les marques réellement prises en charge. Les interventions dépendent de l’accès aux pièces et à la documentation du modèle.`
  },
  {
    question: 'La sécurité est-elle contrôlée ?',
    answer: `Les points essentiels sont vérifiés lorsque cela est pertinent : freinage, serrages, potence, pneus, éclairage et état général. Une trottinette dangereuse ne doit pas être remise en circulation sans réparation adaptée.`
  },
  {
    question: 'Faut-il prendre rendez-vous ?',
    answer: `Oui, le fonctionnement conseillé est sur rendez-vous afin de prévoir un créneau de dépôt, de retrait ou de diagnostic.`
  }
];

export default function HomePage() {
  return (
    <>
      <a className='skip-link' href='#contenu'>Aller au contenu principal</a>

      <header className='site-header'>
        <a className='brand' href='#accueil' aria-label='Bobrepar - retour à l’accueil'>
          <span className='brand-mark' aria-hidden='true'>B</span>
          <span className='brand-text'>
            <strong>Bobrepar</strong>
            <small>Atelier trottinettes électriques</small>
          </span>
        </a>

        <nav className='main-nav' aria-label='Navigation principale'>
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id='contenu'>
        <section id='accueil' className='hero-section' aria-labelledby='hero-title'>
          <div className='hero-content'>
            <p className='eyebrow'>Réparation et entretien de trottinettes électriques</p>
            <h1 id='hero-title'>Remettez votre trottinette en route avec un diagnostic clair.</h1>
            <p className='hero-lead'>
              Bobrepar accompagne les utilisateurs de trottinettes électriques avec une approche professionnelle : comprendre la panne, sécuriser le véhicule et proposer une réparation adaptée sans surprise.
            </p>
            <div className='hero-actions' aria-label='Actions principales'>
              <a className='button button-primary' href='#diagnostic'>Demander un diagnostic</a>
              <a className='button button-secondary' href='#contact'>Contacter Bobrepar</a>
            </div>
            <ul className='hero-proof' aria-label='Points forts de Bobrepar'>
              <li><span aria-hidden='true'>✓</span> Diagnostic expliqué</li>
              <li><span aria-hidden='true'>✓</span> Devis avant réparation</li>
              <li><span aria-hidden='true'>✓</span> Sécurité prioritaire</li>
            </ul>
          </div>

          <aside className='hero-card' aria-label='Aperçu des prestations'>
            <div className='hero-card-header'>
              <span className='status-dot' aria-hidden='true'></span>
              <strong>Atelier sur rendez-vous</strong>
            </div>
            <p>Freins, pneus, batterie, contrôleur, moteur, éclairage, potence et révision générale.</p>
            <div className='metric-grid'>
              <div>
                <span>8</span>
                <small>familles de services</small>
              </div>
              <div>
                <span>100%</span>
                <small>devis avant travaux</small>
              </div>
            </div>
          </aside>
        </section>

        <section id='services' className='section' aria-labelledby='services-title'>
          <SectionHeading
            eyebrow='Services'
            title='Les réparations courantes prises en charge'
            description='Une offre claire pour couvrir les pannes mécaniques, électriques et les besoins d’entretien les plus fréquents.'
          />
          <div className='service-grid'>
            {services.map((service) => (
              <article className='service-card' key={service.title}>
                <span className='service-icon' aria-hidden='true'>{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id='diagnostic' className='section section-accent' aria-labelledby='diagnostic-title'>
          <SectionHeading
            eyebrow='Diagnostic'
            title='Une méthode simple pour identifier la bonne intervention'
            description='Le diagnostic aide à éviter les remplacements inutiles et à prioriser les points de sécurité.'
          />
          <div className='diagnostic-layout'>
            <ol className='steps-list'>
              {diagnosticSteps.map((step, index) => (
                <li key={step.title}>
                  <span aria-hidden='true'>{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className='symptom-card'>
              <h3>Symptômes fréquents</h3>
              <ul>
                {symptoms.map((symptom) => (
                  <li key={symptom}>{symptom}</li>
                ))}
              </ul>
              <a className='button button-primary' href='#contact'>Décrire ma panne</a>
            </div>
          </div>
        </section>

        <section id='tarifs' className='section' aria-labelledby='tarifs-title'>
          <SectionHeading
            eyebrow='Tarifs'
            title='Prix indicatifs avant diagnostic final'
            description='Ces montants servent de repères. Ils doivent être adaptés selon les pièces, la complexité et le modèle de trottinette.'
          />
          <div className='tariff-grid'>
            {tariffs.map((tariff) => (
              <article className='tariff-card' key={tariff.service}>
                <h3>{tariff.service}</h3>
                <p className='price'>{tariff.price}</p>
                <p>{tariff.detail}</p>
              </article>
            ))}
          </div>
          <p className='note'>
            Le devis final dépend du diagnostic réel, de la disponibilité des pièces et de l’état général de la trottinette. Les prix sont indicatifs et éditables.
          </p>
        </section>

        <section id='zone' className='section split-section' aria-labelledby='zone-title'>
          <div>
            <SectionHeading
              eyebrow='Zone d’intervention'
              title='Un service local à personnaliser selon votre organisation'
              description='Cette section est volontairement éditable et ne contient pas d’adresse inventée. Ajoutez votre ville, quartier ou secteur réel avant publication.'
            />
            <p className='section-text'>
              Bobrepar peut fonctionner avec un atelier local, un dépôt sur rendez-vous, un retrait planifié ou une zone d’intervention limitée selon vos disponibilités. Les modalités exactes sont à préciser pour rester fiables et transparentes.
            </p>
          </div>
          <div className='zone-cards' aria-label='Modes de prise en charge'>
            <article>
              <h3>Atelier</h3>
              <p>Diagnostic et réparation dans un espace dédié, uniquement sur rendez-vous.</p>
            </article>
            <article>
              <h3>Dépôt et retrait</h3>
              <p>Créneau organisé à l’avance pour déposer puis récupérer la trottinette.</p>
            </article>
            <article>
              <h3>Intervention locale</h3>
              <p>Texte à adapter avec votre secteur réel, sans promettre une couverture non assurée.</p>
            </article>
          </div>
        </section>

        <section id='avis' className='section section-muted' aria-labelledby='avis-title'>
          <SectionHeading
            eyebrow='Avis'
            title='Exemples de retours clients à remplacer par vos vrais avis'
            description='Les témoignages ci-dessous sont fictifs, réalistes et non vérifiés. Ils servent uniquement à présenter la maquette.'
          />
          <div className='review-grid'>
            {reviews.map((review) => (
              <figure className='review-card' key={review.name}>
                <blockquote>{review.text}</blockquote>
                <figcaption>{review.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id='faq' className='section' aria-labelledby='faq-title'>
          <SectionHeading
            eyebrow='FAQ'
            title='Questions fréquentes'
            description='Des réponses utiles pour cadrer les délais, les pièces, les devis et la sécurité.'
          />
          <div className='faq-list'>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id='contact' className='section contact-section' aria-labelledby='contact-title'>
          <div className='contact-copy'>
            <SectionHeading
              eyebrow='Contact'
              title='Présentez votre panne et préparez le diagnostic'
              description='Le formulaire est une maquette non connectée : il vérifie les champs côté client mais ne transmet aucune donnée.'
            />
            <div className='contact-details' aria-label='Coordonnées fictives éditables'>
              <article>
                <h3>Téléphone</h3>
                <p>06 00 00 00 00</p>
                <small>Coordonnée fictive à remplacer.</small>
              </article>
              <article>
                <h3>E-mail</h3>
                <p>contact@bobrepar.example</p>
                <small>Adresse fictive utilisant un domaine réservé aux exemples.</small>
              </article>
              <article>
                <h3>Adresse</h3>
                <p>Atelier local - adresse à renseigner</p>
                <small>Aucune adresse précise n’est inventée.</small>
              </article>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className='site-footer'>
        <p>© Bobrepar. Site vitrine Next.js sans backend ni service externe connecté.</p>
        <a href='#accueil'>Retour en haut</a>
      </footer>
    </>
  );
}
