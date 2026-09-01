// Adept Pro Track Mate — base d'authentification Supabase
// Ne jamais placer une clé service_role ou un mot de passe dans ce fichier.
const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';

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
