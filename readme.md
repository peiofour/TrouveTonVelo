# Trouve ton Vélo

Application permettant de géolocaliser les stations de vélib' partout en France ! De nombreuses infos concernant celles-ci sont affichées telles que le nombre de vélos disponible, le nombre d'emplacements libres, mais aussi de nombreuses statistiques sur l'utilisation des vélib' en France (Heure de pointe grâce à l'historique par exemple).

## Installation
1. Cloner le projet
2. npm install
3. Créer un fichier `.env` et copier le contenu du fichier `.env.exemple` (Vous pouvez ensuite supprimer celui-ci).
4. Ajouter sa clé API JCDécaux (Disponible à l'adresse : https://developer.jcdecaux.com).
5. Si MongoDB n'est pas installé (https://www.mongodb.com/), sinon il vous faut importer les premières données à des fins de tests. Les collections sont dans un fichier compressé dans `/db`.
6. Ajouter les informations de connexion à la base de données MongoDB dans le fichier `db/config.json`.
7. Il vous faut lancer MongoDB si celui-ci n'est pas exécuté.

## Lancement
```
npm install
npm start
```

## Documentation
L'ensemble de la documentation se trouve à l'adresse : `localhost:port/api/wiki`.