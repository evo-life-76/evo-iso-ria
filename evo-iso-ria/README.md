# Evo ISO RIA — Base interface

Première base fonctionnelle de l'outil d'isométrie RIA.

## Inclus dans cette version

- Page de connexion avec logo tête sprinkler, sans nom de marque
- Compte ADMIN et comptes USER
- Menu Admin pour créer, activer, désactiver et supprimer des utilisateurs
- Tous les utilisateurs voient tous les chantiers
- Liste des chantiers et recherche
- Plusieurs isométries par chantier
- Création d'un chantier depuis la création d'une isométrie
- Éditeur isométrique simple avec grille et alignement automatique
- Outils Tuyau, RIA, Vanne, sélection et suppression
- Propriétés DN, longueur, matériau et altitude
- Sauvegarde automatique dans le navigateur
- Duplication et suppression d'une isométrie
- Export PDF A3 style plan technique

## Connexion de démonstration

- E-mail : `admin@ria.local`
- Mot de passe : `Admin123!`

> Cette première livraison utilise le stockage local du navigateur pour permettre de tester immédiatement toute l'interface. La prochaine étape consiste à brancher PostgreSQL/Prisma, sécuriser les mots de passe et remplacer ce stockage local par les API SQL.

## Installation locale

```bash
npm install
npm run dev
```

Ouvrir ensuite `http://localhost:3000`.

## Installation sur GitHub

1. Décompresser le ZIP.
2. Ouvrir le dépôt GitHub.
3. Cliquer sur **Add file** puis **Upload files**.
4. Glisser tout le contenu du dossier décompressé, pas le dossier lui-même.
5. Cliquer sur **Commit changes**.

## Vérification de production

```bash
npm install
npm run build
npm start
```
