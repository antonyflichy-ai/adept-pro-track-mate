# Test branche feat/secure-role-access

## Test Formateur Master
1. Se connecter avec le compte réel.
2. Vérifier que le badge `Formateur Master` apparaît à côté de l'e-mail.
3. Vérifier les 4 accès : Nouveaux entrants, Tuteurs, Agences, Planning.
4. Se déconnecter.

## Sécurité
- Un faux identifiant doit rester bloqué.
- Aucun secret Supabase ne doit être présent dans le code client.
- Si `profiles` ne contient pas le profil de l'utilisateur, l'application doit refuser l'accès.

## Important
Cette branche est une branche de test. Ne pas fusionner vers `main` avant validation manuelle.
