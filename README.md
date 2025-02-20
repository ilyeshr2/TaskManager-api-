# Application de Gestion de Tâches - NativeScript avec Vue.js

## Description
Cette application mobile développée avec NativeScript et Vue.js permet aux utilisateurs de gérer leurs tâches quotidiennes. Elle offre des fonctionnalités d'inscription, de connexion sécurisée, et de gestion complète des tâches (création, consultation, modification, suppression). L'application communique avec une API REST développée dans le cadre du TP2 pour la gestion des données et l'authentification.

## Fonctionnalités principales
- Inscription et authentification des utilisateurs
- Gestion des tokens JWT pour la sécurité
- Création de tâches avec titre, description et date d'échéance
- Affichage de la liste des tâches de l'utilisateur
- Mise à jour des informations des tâches
- Suppression de tâches
- Interface utilisateur intuitive et responsive

## Technologies utilisées
- NativeScript
- Vue.js
- API REST (Node.js/Express)
- JWT pour l'authentification
- MySQL pour la base de données

## Prérequis
- Node.js (version 14 ou supérieure)
- NativeScript CLI (installation globale)
- Android SDK (pour le développement Android)
- Xcode (pour le développement iOS - macOS uniquement)
- Un serveur API REST fonctionnel (backend du TP2)

## Installation

### 1. Cloner le dépôt
```bash
git clone [URL_DU_DEPOT]
cd [NOM_DU_PROJET]
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration
Assurez-vous que votre serveur API REST est en cours d'exécution. Par défaut, l'application est configurée pour se connecter à `http://10.0.2.2:3000/api` (adresse locale pour l'émulateur Android). Vous devrez peut-être modifier cette URL dans le fichier `app/services/api.js` en fonction de votre configuration.

## Exécution de l'application

### Sur un émulateur Android
```bash
ns run android
```

### Sur un émulateur iOS (macOS uniquement)
```bash
ns run ios
```

### Sur un appareil physique
Connectez votre appareil et exécutez :
```bash
ns run android --device
# ou
ns run ios --device
```

## Structure du projet

```
app/
├── components/        # Composants Vue.js
│   ├── Login.vue      # Écran de connexion
│   ├── Register.vue   # Écran d'inscription
│   └── Tasks.vue      # Gestion des tâches
├── services/
│   └── api.js         # Service de communication avec l'API
└── app.js             # Point d'entrée de l'application
```

## Fonctionnalités détaillées

### Authentification
- **Inscription** : Les utilisateurs peuvent créer un compte avec un nom d'utilisateur, un email et un mot de passe.
- **Connexion** : Les utilisateurs peuvent se connecter avec leur email et mot de passe.
- **Gestion des tokens** : L'application stocke le token JWT pour les requêtes authentifiées.

### Gestion des tâches
- **Création** : Les utilisateurs peuvent créer de nouvelles tâches avec un titre, une description et une date d'échéance.
- **Affichage** : Les tâches sont affichées dans une liste ordonnée.
- **Mise à jour** : Les utilisateurs peuvent modifier les détails d'une tâche existante.
- **Suppression** : Les utilisateurs peuvent supprimer des tâches.

## API Routes

L'application interagit avec les points de terminaison suivants :

### Utilisateurs
- `POST /api/users/register` - Inscription d'un nouvel utilisateur
- `POST /api/users/login` - Connexion d'un utilisateur

### Tâches
- `GET /api/tasks` - Récupération de toutes les tâches de l'utilisateur
- `POST /api/tasks` - Création d'une nouvelle tâche
- `PUT /api/tasks/:id` - Mise à jour d'une tâche
- `DELETE /api/tasks/:id` - Suppression d'une tâche

## Sécurité
- Toutes les requêtes aux endpoints protégés incluent le token JWT dans l'en-tête `Authorization`.
- Les mots de passe sont hashés avec bcrypt avant d'être stockés dans la base de données.
- Les routes sensibles sont protégées par un middleware d'authentification.

## Développement futur
- Ajout de la gestion des catégories de tâches
- Implémentation des notifications pour les tâches à échéance proche
- Ajout d'un mode hors ligne avec synchronisation
- Support multilingue
