# Evo ISO RIA
Application personnelle de création de plans isométriques RIA.

## Installation
1. `cp .env.example .env`
2. Configurer `DATABASE_URL` et `AUTH_SECRET`
3. `npm install`
4. `npx prisma db push`
5. `npm run db:seed`
6. `npm run dev`

Compte initial : `admin@ria.local` / `Admin123!` (à changer après le premier déploiement).

## Déploiement Render + Supabase
- Build : `npm install && npx prisma generate && npm run build`
- Start : `npm start`
- Variables : `DATABASE_URL`, `AUTH_SECRET`
