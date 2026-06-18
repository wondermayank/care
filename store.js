/* ===========================================================
   STORE — simple localStorage-backed "users database".
   No API/server: this is the persistence layer for the app.
   =========================================================== */
const STORE_USERS_KEY = "careHelperUsers";
const STORE_CURRENT_KEY = "careHelperCurrentUser";

function chStoreGetUsers(){
  try{ return JSON.parse(localStorage.getItem(STORE_USERS_KEY) || "{}"); }
  catch(e){ return {}; }
}
function chStoreSaveProfile(profile){
  const users = chStoreGetUsers();
  users[profile.name.toLowerCase()] = profile;
  localStorage.setItem(STORE_USERS_KEY, JSON.stringify(users));
  localStorage.setItem(STORE_CURRENT_KEY, profile.name.toLowerCase());
}
function chStoreGetProfile(name){
  const users = chStoreGetUsers();
  return users[(name||"").toLowerCase()] || null;
}
function chStoreGetCurrentProfile(){
  const name = localStorage.getItem(STORE_CURRENT_KEY);
  return name ? chStoreGetProfile(name) : null;
}
function chStoreSetCurrent(name){
  localStorage.setItem(STORE_CURRENT_KEY, (name||"").toLowerCase());
}
function chStoreClearCurrent(){
  localStorage.removeItem(STORE_CURRENT_KEY);
}
