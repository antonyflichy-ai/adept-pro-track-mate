# Modification finale — contrôle d'accès par rôle

## Statut

Cette proposition est préparée sur la branche `feat/final-role-access` uniquement. **`main` n'est pas modifié par cette préparation.**

## Validation effectuée en TEST

- Authentification Supabase : OK
- Lecture de `profiles` : OK après `GRANT SELECT ON public.profiles TO authenticated`
- Profil `Formateur Master` : OK
- Mauvais identifiants : refusés
- Déconnexion : OK
- RLS : conservé

## Modification à intégrer dans l'application

Le contrôle de profil doit utiliser uniquement les colonnes réellement présentes dans `public.profiles` :

```js
async function chargerProfil(user){
  const {data,error}=await sb.from('profiles')
    .select('id,role,agency')
    .eq('id',user.id)
    .maybeSingle();
  if(error){
    console.error('Erreur lecture profil:',error);
    return null;
  }
  return data;
}
```

Le contrôle d'accès doit refuser l'utilisateur si aucun profil n'est trouvé et conserver la vérification du rôle.

## Base de données

La lecture de la table par le client authentifié nécessite :

```sql
GRANT SELECT ON public.profiles TO authenticated;
```

**Ne pas désactiver RLS et ne pas accorder ce droit à `anon`.**

## Déploiement

Aucun déploiement de cette proposition n'est effectué depuis cette branche. La fusion vers `main` doit rester une étape séparée après revue finale.
