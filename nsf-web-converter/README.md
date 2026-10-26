# NSF Web Converter

Le code source complet est dans [`source/`](./source/).

Le projet convertit des fichiers IBM/HCL Lotus Notes `.nsf` directement dans le navigateur via WebAssembly et `sherlock-nsf-parser`, sans upload serveur.

## Utiliser ce projet

Télécharge ou clone ce dépôt, puis copie le contenu du dossier `nsf-web-converter/source/` dans un nouveau dépôt GitHub dédié.

Le workflow `source/.github/workflows/deploy-pages.yml` est prévu pour fonctionner lorsque le contenu de `source/` se trouve à la racine de ce nouveau dépôt.

Le ZIP binaire n’est volontairement pas conservé ici : l’intégration utilisée pour l’upload binaire n’a pas garanti l’intégrité de l’archive. Le code source, lui, a été vérifié avec les SHA Git de chaque fichier.
