# Guide d'intégration Notion avec Vercel

Ce document explique comment intégrer votre database Notion pour récupérer les événements dynamiquement sur votre site web hébergé sur Vercel.

## Architecture

Le site récupérera les événements depuis Notion via une fonction serverless Vercel qui expose une API sécurisée. Le frontend appellera cette API et générera dynamiquement les cartes d'événements.

```
Notion Database → Serverless Function (Vercel) → Frontend JavaScript → HTML Events Section
```

## Structure des fichiers

```
website-le-looper/
├── api/
│   └── notion-events.js    # Fonction serverless
├── index.html
├── script.js
├── package.json
├── vercel.json (optionnel)
└── NOTION_INTEGRATION.md (ce fichier)
```

## 1. Créer la fonction serverless

Créez le fichier `api/notion-events.js` :

```javascript
const { Client } = require('@notionhq/client');

module.exports = async (req, res) => {
  // CORS headers pour permettre les requêtes depuis le frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  // Gérer les requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Seulement GET autorisé
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialiser le client Notion avec le token secret
    const notion = new Client({
      auth: process.env.NOTION_SECRET,
    });

    // ID de votre database Notion
    const databaseId = process.env.NOTION_DATABASE_ID;

    // Récupérer les événements depuis Notion
    const response = await notion.databases.query({
      database_id: databaseId,
      // Trier par date (croissant pour "à venir", décroissant pour "passé")
      sorts: [
        {
          property: 'Date', // Nom de votre propriété Date dans Notion
          direction: 'ascending',
        },
      ],
    });

    // Transformer les résultats Notion en format simple
    const events = response.results.map(page => {
      const properties = page.properties;
      
      return {
        id: page.id,
        titre: properties.Titre?.title?.[0]?.plain_text || '',
        date: properties.Date?.date?.start || null,
        statut: properties.Statut?.select?.name || '',
        description: properties.Description?.rich_text?.[0]?.plain_text || '',
        lieu: properties.Lieu?.rich_text?.[0]?.plain_text || '',
        lieuUrl: properties['Lieu URL']?.url || null,
        heure: properties.Heure?.rich_text?.[0]?.plain_text || '',
        lienFormat: properties['Lien Format']?.url || null,
        lienInfo: properties['Lien Info']?.url || null,
        lienArchive: properties['Lien Archive']?.url || null,
      };
    });

    // Séparer les événements par statut
    const eventsByStatus = {
      'en reflexion': events.filter(e => e.statut === 'en reflexion'),
      'à venir': events.filter(e => e.statut === 'à venir'),
      'passé': events.filter(e => e.statut === 'passé'),
    };

    return res.status(200).json(eventsByStatus);

  } catch (error) {
    console.error('Erreur Notion API:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de la récupération des événements',
      details: error.message 
    });
  }
};
```

## 2. Configuration Vercel (optionnel)

Créez le fichier `vercel.json` à la racine du projet pour configurer le timeout :

```json
{
  "functions": {
    "api/notion-events.js": {
      "maxDuration": 10
    }
  }
}
```

## 3. Variables d'environnement sur Vercel

### Dans le dashboard Vercel :

1. Allez dans votre projet → **Settings** → **Environment Variables**
2. Ajoutez les variables suivantes :
   - `NOTION_SECRET` : votre token secret Notion (commence par `secret_`)
   - `NOTION_DATABASE_ID` : l'ID de votre database (32 caractères)

### Comment obtenir ces valeurs :

#### Token secret Notion :
1. Allez sur https://www.notion.so/my-integrations
2. Cliquez sur **"New integration"** ou sélectionnez une intégration existante
3. Donnez un nom à votre intégration (ex: "Le Looper Website")
4. Copiez le **"Internal Integration Token"** (commence par `secret_`)
5. C'est votre `NOTION_SECRET`

#### Database ID :
1. Ouvrez votre database Notion dans le navigateur
2. Regardez l'URL : `https://www.notion.so/VOTRE-DATABASE-ID?v=...`
3. L'ID est la partie entre `https://www.notion.so/` et `?v=...`
4. C'est une chaîne de 32 caractères (avec des tirets)
5. C'est votre `NOTION_DATABASE_ID`

## 4. Permissions Notion

Pour que votre intégration puisse accéder à votre database :

1. Allez sur votre database Notion
2. Cliquez sur les **"..."** en haut à droite
3. Sélectionnez **"Connections"** ou **"Add connections"**
4. Recherchez et sélectionnez votre intégration (celle que vous venez de créer)
5. Vérifiez que l'intégration a bien accès à la database

## 5. Structure de la database Notion

Votre database Notion doit avoir les propriétés suivantes :

| Propriété | Type | Description |
|-----------|------|-------------|
| `Titre` | Title | Titre de l'événement |
| `Date` | Date | Date de l'événement |
| `Statut` | Select | Statut : "en reflexion", "à venir", ou "passé" |
| `Description` | Rich Text | Description de l'événement |
| `Lieu` | Rich Text | Nom du lieu |
| `Lieu URL` | URL | Lien vers le lieu (optionnel) |
| `Heure` | Rich Text | Heure de l'événement (ex: "13h - 15h") |
| `Lien Format` | URL | Lien vers la page du format (optionnel) |
| `Lien Info` | URL | Lien vers plus d'infos (optionnel) |
| `Lien Archive` | URL | Lien vers archive/vidéo (optionnel) |

### Mapping des statuts

- **"en reflexion"** → Afficher dans la section événements avec date "En discussion"
- **"à venir"** → Afficher dans la section événements avec date formatée
- **"passé"** → Afficher dans la section archives

## 6. Dépendances

Ajoutez la dépendance Notion dans votre `package.json` :

```json
{
  "dependencies": {
    "@notionhq/client": "^2.2.15"
  }
}
```

Puis installez avec :
```bash
npm install
```

## 7. Utilisation côté frontend

Dans `script.js`, ajoutez cette fonction pour charger les événements :

```javascript
async function loadEventsFromNotion() {
  try {
    const response = await fetch('/api/notion-events');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // data contient :
    // {
    //   'en reflexion': [...],
    //   'à venir': [...],
    //   'passé': [...]
    // }
    
    renderEvents(data['à venir'], data['en reflexion']);
    renderArchives(data['passé']);
  } catch (error) {
    console.error('Erreur lors du chargement des événements:', error);
    // Fallback sur les événements statiques si nécessaire
    showError('Impossible de charger les événements depuis Notion.');
  }
}

// Fonction pour formater la date
function formatDate(dateString) {
  if (!dateString) return 'En discussion';
  
  const date = new Date(dateString);
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return date.toLocaleDateString('fr-FR', options);
}

// Fonction pour rendre les événements
function renderEvents(eventsAVenir, eventsEnReflexion) {
  const eventsList = document.querySelector('.events-list');
  if (!eventsList) return;
  
  eventsList.innerHTML = '';
  
  // Événements à venir
  eventsAVenir.forEach(event => {
    const eventCard = createEventCard(event, false);
    eventsList.appendChild(eventCard);
  });
  
  // Événements en réflexion
  eventsEnReflexion.forEach(event => {
    const eventCard = createEventCard(event, true);
    eventsList.appendChild(eventCard);
  });
}

// Fonction pour créer une carte d'événement
function createEventCard(event, isReflexion) {
  const card = document.createElement('div');
  card.className = 'event-card';
  
  const date = isReflexion ? 'En discussion' : formatDate(event.date);
  
  card.innerHTML = `
    <div class="event-date">${date}</div>
    <h3>${event.titre}</h3>
    ${event.heure ? `<p><strong>${event.heure}</strong>${event.description ? ` — ${event.description}` : ''}</p>` : ''}
    ${event.description && !event.heure ? `<p>${event.description}</p>` : ''}
    ${event.lieu ? `<p class="event-location">📍 ${event.lieuUrl ? `<a href="${event.lieuUrl}" target="_blank" rel="noopener noreferrer" class="event-location-link">${event.lieu}</a>` : event.lieu}${event.lieuUrl ? '' : `, ${event.lieu}`}</p>` : ''}
    <div class="event-links">
      ${event.lienFormat ? `<a href="${event.lienFormat}" class="event-info-link event-info-link-secondary">Découvrir le format →</a>` : ''}
      ${event.lienInfo ? `<a href="${event.lienInfo}" target="_blank" rel="noopener noreferrer" class="event-info-link">Plus d'info →</a>` : ''}
      ${!event.lienInfo && !event.lienFormat ? `<a href="#impliquer" class="event-info-link">Ça m'intéresse ! →</a>` : ''}
    </div>
  `;
  
  return card;
}

// Fonction pour rendre les archives
function renderArchives(eventsPasses) {
  const archiveList = document.querySelector('.archive-list');
  if (!archiveList) return;
  
  archiveList.innerHTML = '';
  
  eventsPasses.forEach(event => {
    const archiveItem = createArchiveItem(event);
    archiveList.appendChild(archiveItem);
  });
}

// Fonction pour créer un item d'archive
function createArchiveItem(event) {
  const item = document.createElement('div');
  item.className = 'archive-item';
  
  const date = event.date ? formatDate(event.date) : 'Date inconnue';
  
  item.innerHTML = `
    <div class="archive-date">${date}</div>
    <h4>${event.titre}</h4>
    ${event.description ? `<p>${event.description}</p>` : ''}
    <div class="archive-links">
      ${event.lienFormat ? `<a href="${event.lienFormat}" class="archive-info-link archive-info-link-secondary">Découvrir le format →</a>` : ''}
      ${event.lienArchive ? `<a href="${event.lienArchive}" target="_blank" rel="noopener noreferrer" class="archive-info-link">En savoir plus →</a>` : ''}
    </div>
  `;
  
  return item;
}

// Fonction pour afficher une erreur
function showError(message) {
  const eventsList = document.querySelector('.events-list');
  if (eventsList) {
    eventsList.innerHTML = `<div class="event-card"><p style="color: var(--color-accent);">${message}</p></div>`;
  }
}

// Appeler la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  // ... autres initialisations ...
  loadEventsFromNotion();
});
```

## 8. Déploiement sur Vercel

### Première fois :

1. **Installez Vercel CLI** (optionnel) :
   ```bash
   npm i -g vercel
   ```

2. **Connectez votre projet** :
   ```bash
   vercel login
   vercel
   ```

3. **Ou via GitHub** :
   - Poussez votre code sur GitHub
   - Allez sur https://vercel.com
   - Cliquez sur **"New Project"**
   - Importez votre repository
   - Vercel détectera automatiquement le dossier `api/`

4. **Configurez les variables d'environnement** :
   - Dans le dashboard Vercel, allez dans **Settings** → **Environment Variables**
   - Ajoutez `NOTION_SECRET` et `NOTION_DATABASE_ID`
   - Sélectionnez les environnements (Production, Preview, Development)

5. **Déployez** :
   - Si vous utilisez GitHub, chaque push déclenche un déploiement automatique
   - Sinon, utilisez `vercel --prod` pour déployer en production

### Déploiements suivants :

- Si connecté à GitHub : push automatique
- Sinon : `vercel --prod`

## 9. Test local (optionnel)

Pour tester localement avant de déployer :

1. Installez Vercel CLI : `npm i -g vercel`
2. Créez un fichier `.env.local` à la racine :
   ```
   NOTION_SECRET=secret_votre_token
   NOTION_DATABASE_ID=votre_database_id
   ```
3. Lancez le serveur de développement :
   ```bash
   vercel dev
   ```
4. Accédez à http://localhost:3000

## Points importants

1. **CORS** : La fonction inclut les headers CORS pour permettre les requêtes depuis votre domaine
2. **Variables d'environnement** : Utilisez toujours `process.env.NOTION_SECRET` (jamais de valeurs en dur dans le code)
3. **Gestion d'erreurs** : La fonction retourne des erreurs HTTP appropriées
4. **Format de réponse** : JSON structuré par statut pour faciliter le rendu côté frontend
5. **Sécurité** : Le token Notion reste secret côté serveur, jamais exposé au client

## Dépannage

### Erreur 401 (Unauthorized)
- Vérifiez que `NOTION_SECRET` est correct dans les variables d'environnement Vercel
- Vérifiez que votre intégration Notion a bien accès à la database

### Erreur 404 (Not Found)
- Vérifiez que `NOTION_DATABASE_ID` est correct
- Vérifiez que l'intégration est bien connectée à la database dans Notion

### Erreur 500 (Internal Server Error)
- Vérifiez les logs Vercel dans le dashboard
- Vérifiez que les noms des propriétés dans Notion correspondent à ceux dans le code
- Vérifiez que les types de propriétés sont corrects

### Les événements ne s'affichent pas
- Ouvrez la console du navigateur (F12) pour voir les erreurs
- Vérifiez que l'endpoint `/api/notion-events` répond correctement
- Vérifiez que les statuts dans Notion sont exactement : "en reflexion", "à venir", "passé"

## Ressources

- [Documentation Notion API](https://developers.notion.com/)
- [Documentation Vercel Functions](https://vercel.com/docs/functions)
- [Notion Integrations](https://www.notion.so/my-integrations)



