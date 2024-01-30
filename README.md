# DailyMusic APP

Bienvenue sur DailyMusic APP, l'application qui vous connecte à vos morceaux favoris sur Spotify.

Fonctionnement : L'administrateur crée une session de vote, ajoute des chansons et les utilisateurs peuvent voter pour leurs morceaux favoris.

# Gestion des Dates

Les sessions ont une date de fin déterminée. Les résultats sont affichés un jour après cette date de fin. Deux jours après la date de fin, la session devient invisible.

Pour tester les différentes étapes des sessions de musique, vous pouvez vous rendre dans le fichier ShowSession.jsx, aux lignes 35 et 50. Vous y trouverez :

```js
// const currentDate = new Date("2024-02-01T00:00:00");
```

et

```js
const currentDate = new Date(); // Date actuelle
```

Pour simuler les différentes étapes, commentez la ligne indiquant la date actuelle et décommentez la date fictive. Cela vous permettra de visualiser les résultats comme si vous étiez à une date spécifique.

![Image code currentDate](/public/markdown.png)

## Instructions de Démarrage

### Clonage du Projet

Pour obtenir une copie du projet en vue d'une exécution sur votre machine locale, clonez le dépôt en utilisant la commande suivante :

```bash
git clone https://github.com/poulpyR2r/DailyMusic-APP
```

### Installation des Dépendances

Une fois le projet cloné, naviguez dans le dossier du projet et exécutez la commande suivante pour installer les dépendances nécessaires :

```bash
npm i
```

### Lancement de l'Application

Pour démarrer l'application, exécutez :

```bash
npm start
```

Après l'exécution de cette commande, l'application devrait être accessible via un navigateur web à l'adresse locale par défaut, généralement `http://localhost:3000`.

## Contribution

Si vous souhaitez contribuer au projet, veuillez forker le dépôt, créer une branche pour vos modifications et ouvrir une pull request pour discuter des changements que vous souhaitez apporter.
