// Adept Pro Track Mate — authentification Supabase
// La clé publishable est conçue pour être utilisée côté navigateur.
// Ne jamais placer une clé secret/service_role ni un mot de passe ici.
const SUPABASE_URL = 'https://ngdgmijmdvneqbdbqwmy.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_21Kr6md9gv-r9YCwPPYLsg_pi6X_1sA';

function authConfigReady(){ return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY); }
function utilisateurConnecte(){ return Boolean(localStorage.getItem('access_token')); }

async function connexion(email,password){
  if(!authConfigReady()) throw new Error('Supabase n’est pas encore configuré.');
  const r=await fetch(SUPABASE_URL+'/auth/v1/token?grant_type=password',{
    method:'POST',headers:{'Content-Type':'application/json','apikey':SUPABASE_ANON_KEY},
    body:JSON.stringify({email,password})
  });
  const data=await r.json();
  if(!r.ok) throw new Error(data.error_description||data.msg||'Connexion impossible.');
  localStorage.setItem('access_token',data.access_token||'');
  localStorage.setItem('refresh_token',data.refresh_token||'');
  localStorage.setItem('user_email',data.user?.email||email);
  return data;
}

function deconnexion(){
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_email');
}
