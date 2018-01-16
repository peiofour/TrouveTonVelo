# Trouve ton Vélo

Application permettant de géolocaliser les stations de vélib' partout en France ! De nombreuses infos concernant celles-ci sont affichées telles que le nombre de vélos disponible, le nombre d'emplacements libres, mais aussi de nombreuses statistiques sur l'utilisation des vélib' en France (Heure de pointe par exemple).

## Installation
1. Cloner le projet
2. npm install
3. Créer un fichier `.env` et copier le contenu du fichier `.env.exemple` (Vous pouvez ensuite supprimer celui-ci)
4. Ajouter sa clé API JCDécaux (Disponible à l'adresse : https://developer.jcdecaux.com)
5. Ajouter sa clé Google Maps JavaScript API (Disponible à l'adresse : https://developers.google.com/maps/documentation/javascript/?hl=fr)
6. Ajouter les informations de connexion à la base de données MongoDB dans le fichier `db/config.json`

## Lancement
```
npm start
```