# Gestion des rôles — préparation sécurisée

## Objectif
Préparer l'application pour appliquer les droits selon `public.profiles.role` sans exposer de clé secrète côté navigateur.

## Rôles prévus
- Formateur Master : accès complet.
- RH : gestion des utilisateurs et fonctionnalités RH autorisées.
- Responsable d'agence : accès limité à son agence.

## Principes de sécurité
1. Le navigateur utilise uniquement la clé Supabase publishable.
2. Aucune `service_role` / secret key ne doit être ajoutée au code client.
3. Le rôle affiché par l'interface doit être lu depuis `public.profiles` pour l'utilisateur connecté.
4. Les permissions sensibles doivent être protégées par RLS/policies côté Supabase, pas uniquement par masquage de boutons.
5. Les modifications de code doivent être testées sur une branche dédiée avant fusion dans `main`.

## État actuel
Le compte de test possède le rôle `Formateur Master`. La prochaine modification de `index.html` devra charger le profil après authentification et centraliser les règles d'accès avant d'adapter les menus.
