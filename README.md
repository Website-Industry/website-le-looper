# Le Looper - Site Vitrine

Site vitrine statique pour **Le Looper**, un collectif informel de création musicale numérique à Toulouse.

## 🎵 À propos

Le Looper est une communauté toulousaine qui rassemble des passionné·es de création musicale numérique autour de la pratique, des rencontres et de la transmission. Le site présente le projet, ses valeurs, et invite à rejoindre la communauté via Discord.

## 🚀 Déploiement

Ce site est hébergé sur **Vercel**. Il s'agit d'un site statique (HTML/CSS/JS vanilla) qui ne nécessite aucune configuration particulière.


## 📁 Structure du projet

```
.
├── index.html          # Page d'accueil / Landing page
├── manifesto.html      # Page manifeste & valeurs
├── styles.css          # Feuille de style principale
├── script.js           # JavaScript (navigation, liens, etc.)
├── README.md           # Ce fichier
└── LICENSE             # Licence du projet
```

## ⚙️ Configuration

Avant le déploiement, mettre à jour les URLs dans `script.js` :

```javascript
const CONFIG = {
    DISCORD_INVITE_URL: "https://discord.gg/TON_INVITATION",
    INSTAGRAM_URL: "https://instagram.com/TONCOMPTE"
};
```

## 🛠️ Technologies

- **HTML5** sémantique
- **CSS3** moderne (variables CSS, flexbox, grid)
- **JavaScript** vanilla (ES6+)
- Aucune dépendance externe

## ✨ Fonctionnalités

- ✅ Navigation responsive avec menu burger mobile
- ✅ Smooth scroll pour les ancres (respecte `prefers-reduced-motion`)
- ✅ Liens Discord configurables
- ✅ Liens Instagram configurables
- ✅ Année automatique dans le footer
- ✅ Design sobre avec touches créatives
- ✅ Accessibilité (RGAA) : navigation clavier, focus visible, ARIA
- ✅ SEO de base : meta tags, Open Graph

## 📱 Responsive

Le site est **mobile-first** et s'adapte à tous les écrans :
- Mobile (< 768px)
- Tablette (768px - 1024px)
- Desktop (> 1024px)

## ♿ Accessibilité

Le site respecte les bonnes pratiques d'accessibilité (RGAA) :
- Navigation au clavier fonctionnelle
- Focus visible sur tous les éléments interactifs
- Attributs ARIA appropriés
- Contraste respecté
- Respect de `prefers-reduced-motion`
- Structure HTML sémantique

## 🎨 Personnalisation

Les couleurs, espacements et typographie sont définis via des variables CSS dans `styles.css` :

```css
:root {
    --color-primary: #6366f1;
    --color-secondary: #8b5cf6;
    /* ... */
}
```

## 📝 Contenu

Le contenu est directement intégré dans les fichiers HTML. Pour modifier le texte :
- `index.html` : contenu de la landing page
- `manifesto.html` : contenu du manifeste

## 🔒 Licence

Voir le fichier `LICENSE` pour les détails. Ce projet est propriétaire et ne peut pas être réutilisé sans autorisation, mais les contributions pour améliorer le site sont les bienvenues.

## 🤝 Contribution

Les contributions pour améliorer le site sont les bienvenues ! Pour proposer des modifications :
1. Ouvrir une issue pour discuter des changements
2. Proposer une pull request avec les modifications
3. Les contributions seront évaluées et intégrées si elles correspondent aux objectifs du projet

## 📧 Contact

Pour toute question concernant le site ou le projet Le Looper, rejoignez le Discord (lien à configurer dans `script.js`).

---

**Le Looper** - Création musicale numérique à Toulouse  
*Rejoins la boucle* 🎵

