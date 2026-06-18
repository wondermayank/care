/* ===========================================================
   HOME page rendering (icons + stats + welcome-back banner)
   =========================================================== */
document.addEventListener("DOMContentLoaded", function(){
  const i1 = document.getElementById("how-icon-1");
  const i2 = document.getElementById("how-icon-2");
  const i3 = document.getElementById("how-icon-3");
  if(i1) i1.innerHTML = icon("user", "icon-lg");
  if(i2) i2.innerHTML = icon("shield", "icon-lg");
  if(i3) i3.innerHTML = icon("calendar", "icon-lg");

  const stats = [
    { icon:"droplet", count: DB_SKIN_PRODUCTS.length, label:"Skin Care Products" },
    { icon:"wind", count: DB_HAIR_PRODUCTS.length, label:"Hair Care Products" },
    { icon:"bath", count: DB_BATH_PRODUCTS.length, label:"Bath & Body Products" },
    { icon:"palette", count: DB_MAKEUP_PRODUCTS.length, label:"Makeup Products" }
  ];
  const grid = document.getElementById("stats-grid");
  if(grid){
    grid.innerHTML = stats.map(s => `
      <div class="card text-center">
        <div style="color:var(--primary); display:flex; justify-content:center; margin-bottom:var(--sp-sm);">${icon(s.icon,"icon-lg")}</div>
        <div class="display-sm">${s.count}</div>
        <div class="caption mt-md">${s.label}</div>
      </div>
    `).join("");
  }

  const current = chStoreGetCurrentProfile();
  const banner = document.getElementById("welcome-back");
  if(current && banner){
    banner.classList.remove("hidden");
    banner.innerHTML = `
      <p class="body-md mb-sm"><strong>Welcome back, ${current.name}.</strong> You already have a saved care plan.</p>
      <div class="flex gap-sm" style="flex-wrap:wrap;">
        <a href="index.html" class="btn btn-primary btn-sm">View My Plan</a>
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('quiz-section').scrollIntoView({behavior:'smooth'})">Start Over / New Profile</button>
      </div>
    `;
  }
});
