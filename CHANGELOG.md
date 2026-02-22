# Changelog

Tous les changements notables du projet sont documentés dans ce fichier.

---

## [2026-02-22]

### Ajouté
- Migration vers **Astro** : configuration (`astro.config.mjs`), support TypeScript, structure `src/` (pages, layouts, composants).
- Section **Agenda** dynamique : données centralisées, répartition automatique événements à venir / archives selon la date du jour.
- Tag **« aujourd'hui »** sur l'événement du jour dans l'agenda (mise en avant visuelle de la carte).
- Lien **page Facebook** en plus du groupe (config, cartes « Où nous trouver », footer).
- Section **Ressources** dans le footer (lien Page Ressources, Fiche récap Strudel).

### Modifié
- Navigation et footer : composants Astro (`Nav.astro`, `Footer.astro`), slots layout.
- Pages migrées en `.astro` : accueil, Valeurs, Ressources, Horizon Live Coding, Workflow.
- Assets servis depuis `public/` (styles, script, images, favicon).

### Supprimé
- Ancienne stack statique : `index.html`, `valeurs.html`, `ressources.html`, `horizon-live-coding.html`, `workflow.html`, `strudel-recap.html` (racine).
- Doublons à la racine : `script.js`, `styles.css`, `favicon.png`, dossier `img/` (conservés dans `public/`).

---

## [2026-02-16]

### Modifié
- Sous-titre de la section Agenda et liens vers les événements (URLs Luma).
- Section « Découverte de Strudel.cc » dans `horizon-live-coding.html`, dates des prochains ateliers dans l'accueil.
- Hero : classe pour le style, ajustements `hero-small` dans `styles.css`.

---

## [2026-01-28]

### Modifié
- Horaire de l'événement Horizon Live Coding #2.

---

## [2026-01-19]

### Ajouté
- Images hero optimisées (thèmes clair et sombre).
- Dossiers dédiés pour les images (`hero/`, `og/`, `people/`).

### Modifié
- Structure et accessibilité du hero dans `index.html`.
- Effet parallaxe dans `script.js`, `styles.css` pour le hero et images de fond responsive.

---

## [2026-01-18]

### Ajouté
- **Vercel Web Analytics** : dépendance `@vercel/analytics`, script Insights dans les pages.
- Guide d'intégration Notion (fonction serverless Vercel, variables d'environnement, structure BDD).
- Métas Open Graph et Twitter pour le SEO et le partage sur les réseaux.
- Documentation `NOTION_INTEGRATION.md`, mise à jour `og-image.png`.

### Modifié
- Remplacement de `analytics.js` par le script Vercel Insights.
- Métas OG/Twitter corrigées (URLs, attributs image).
- `.gitignore` étendu (fichiers temporaires et de build).
- Contenu et accessibilité de `horizon-live-coding.html`, `valeurs.html`, `workflow.html`.
- `script.js` : gestion des liens, `README.md` et structure du projet.

---

## [2025-12-26]

### Ajouté
- Menus déroulants dans la nav pour « Projet » et « Formats » (HTML, CSS, JS).
- Page **Valeurs** (`valeurs.html`) : principes et valeurs du projet.
- Fichiers projet : `.gitignore`, `package.json`, `package-lock.json`.

### Modifié
- Navigation et footer : « Manifeste » remplacé par « Valeurs » sur toutes les pages.
- Section Partenaires : nouveaux témoignages, images et citations ; styles et grille responsive.

---

## [2025-12-17]

### Ajouté
- Section **Partenaires** (cartes SawUp, Music Action, La compagnie du code, Eurêkafé) avec témoignages, images et citations.
- Lien « Nous trouver » dans la navigation (toutes les pages).
- Favicon et logo (nav, hero), styles logo responsive et animations.
- Section **Où nous trouver** : cartes Discord, Instagram, Facebook + JS pour les liens.
- Carte rôle « Propositions » dans « S'impliquer », liens événements vers call-to-action.
- Section **Horizon Live Coding** : intention, principes, format, contenu potentiel ; lien depuis l'accueil.
- Page **Workflow** : présentation du format, principes, section YouTube pour les exemples.
- Inspiration « Le Séquenceur » dans le manifeste (carte dédiée avec liens).
- Liens Facebook dans le footer, call-to-action sur les infos événements.
- Styles dark mode pour les cartes ; styles pour liens d'archive et boutons secondaires.

### Modifié
- Manifeste : nouvelles sections (origine, valeurs), carte Marc Charton, grille des visions.
- Archive : suppression des liens « Archive » dans la nav, mise en avant des liens de participation.
- Contenu : suppression du terme « informel » (index, manifeste, README).
- Organisation des images en dossiers dédiés.

---

## [2025-12-17] — Premier commit

### Ajouté
- Site statique **Le Looper** : page d'accueil, manifeste, licence et fichiers associés.
- Mise en page responsive, accessibilité de base et SEO initial.
