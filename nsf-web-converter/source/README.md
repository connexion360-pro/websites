# NSF Web Converter

Site statique public qui convertit des fichiers IBM/HCL Lotus Notes `.nsf` directement dans le navigateur avec WebAssembly, sans upload serveur.

Le moteur NSF est [`sherlock-nsf-parser`](https://github.com/Sherlock-Forensics/sherlock-nsf-parser), sous licence Apache-2.0.

## Exports

Le ZIP généré peut contenir :

- `json/notes.json` — toutes les notes résolues, champs rendus, valeurs brutes encodées en base64, corps texte et métadonnées de pièces jointes ;
- `eml/*.eml` — un EML par note de classe `DOCUMENT`, avec pièces jointes lorsque le parseur les extrait ;
- `mbox/messages.mbox` — archive MBOX des notes de classe `DOCUMENT` ;
- `attachments/<NoteID>/...` — pièces jointes brutes ;
- `csv/notes.csv` — index de toutes les notes résolues, avec NoteID, UNID et classe ;
- `manifest.json` — SHA-256 de la source, compteurs d’extraction et avertissements.

## Confidentialité

Aucune donnée NSF n’est envoyée à un serveur par ce projet. Le navigateur charge le fichier en mémoire puis le transmet à un Web Worker qui exécute le parseur Rust compilé en WebAssembly.

Cela signifie aussi que la taille maximale dépend de la mémoire disponible dans le navigateur. Au-delà d’environ 300 Mo, l’interface affiche un avertissement ; les très gros NSF sont mieux traités avec une application locale en ligne de commande.

## Déployer gratuitement sur GitHub Pages

1. Crée un dépôt GitHub public et place tout ce projet à la racine.
2. Pousse sur la branche `main`.
3. Dans **Settings → Pages**, choisis **GitHub Actions** comme source si ce n’est pas déjà le cas.
4. Le workflow `.github/workflows/deploy-pages.yml` installe Rust + `wasm-pack`, compile le module WebAssembly et publie le dossier `web/`.
5. L’URL publique sera de la forme `https://TON-COMPTE.github.io/NOM-DU-DEPOT/`.

Aucun serveur applicatif, base de données ou hébergement payant n’est nécessaire.

## Build local

Prérequis : Rust stable et `wasm-pack`.

```bash
./build.sh
```

Puis sers le dossier `web/` avec un serveur HTTP statique. Par exemple :

```bash
python3 -m http.server 8080 --directory web
```

Ouvre ensuite `http://localhost:8080`.

> N’ouvre pas directement `web/index.html` avec `file://` : les Web Workers et WebAssembly nécessitent un serveur HTTP.

## Limites

`sherlock-nsf-parser` est encore en version pré-1.0. Il ne déchiffre pas les bases ou éléments NSF chiffrés et ne couvre pas encore chaque variante historique de segment de pièce jointe. Le manifeste signale le nombre d’entrées non résolues pour éviter de présenter une extraction partielle comme complète.

Les EML sont reconstruits à partir des champs Lotus rendus et du corps texte disponible ; ce ne sont pas nécessairement les octets MIME originaux du message.

## Sécurité

Le site est volontairement statique :

- pas de formulaire d’upload serveur ;
- pas d’analytics inclus ;
- pas de stockage local permanent ;
- pas d’appel réseau requis pendant une conversion ;
- noms de fichiers nettoyés avant insertion dans le ZIP ;
- valeurs d’en-tête EML nettoyées des retours à la ligne.

## Licences

- Ce projet : MIT (`LICENSE`).
- `sherlock-nsf-parser` : Apache-2.0. Voir `LICENSES/sherlock-nsf-parser-APACHE-2.0.txt` et `THIRD_PARTY_NOTICES.md`.
