# Bobrepar

Site vitrine professionnel Next.js pour Bobrepar, spécialisé dans la réparation et l’entretien de trottinettes électriques.

Emplacement prévu : Documents/Bobrepar.

## Important

Les dépendances ne sont pas installées automatiquement. Ce projet contient uniquement les fichiers sources et la déclaration des dépendances dans package.json. Aucun dossier node_modules, aucune clé secrète, aucun backend et aucun service externe ne sont fournis.

## Technologies

- Next.js avec App Router
- TypeScript
- React
- CSS global responsive et accessible
- Formulaire de contact côté client, non connecté

## Installation manuelle

Depuis un terminal, placez-vous dans le dossier du projet :

bash
cd Documents/Bobrepar


Installez ensuite manuellement les dépendances :

bash
npm install


## Lancement en développement

bash
npm run dev


Ouvrez ensuite :

text
http://localhost:3000


## Build de production

bash
npm run build


Puis, après un build réussi :

bash
npm run start


## Contenu du site

La page d’accueil contient des sections par ancres :

- Accueil avec hero professionnel
- Services : freins, pneus, batterie, contrôleur, moteur, éclairage, potence, entretien
- Diagnostic avec étapes et symptômes fréquents
- Tarifs indicatifs
- Zone d’intervention éditable sans adresse inventée
- Avis fictifs non vérifiés
- FAQ
- Contact avec formulaire non connecté et coordonnées fictives éditables

## Formulaire de contact

Le formulaire est volontairement non connecté. Il effectue une validation simple dans le navigateur avec React, empêche l’envoi réel et n’appelle aucune API, aucun service e-mail et aucun backend.

## Vérifications réalisées

- Les fichiers essentiels Next.js sont présents : package.json, next.config.ts, tsconfig.json, app/layout.tsx, app/page.tsx, app/globals.css et README.md.
- Les imports correspondent aux fichiers générés : app/page.tsx importe components/ContactForm.tsx et components/SectionHeading.tsx.
- Le projet ne dépend d’aucun asset absent : aucune image, police distante ou fichier public requis.
- Le formulaire n’est connecté à aucun service externe et ne contient aucun secret.
- Les dépendances sont déclarées dans package.json mais ne sont pas installées automatiquement.
