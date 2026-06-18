/* ===========================================================
   NAV — shared header rendering across all pages
   =========================================================== */
function chRenderNav(activePage){
  const brand = document.querySelector(".brand");
  if(brand){
    brand.innerHTML = icon("sparkles") + " Care Helper";
  }
  const navLinks = document.getElementById("nav-links");
  if(navLinks){
    const links = [
      { href: "index.html", label: "Home", key: "home" },
      { href: "dashboard.html", label: "My Routine", key: "dashboard" },
      { href: "products.html", label: "Product Library", key: "products" }
    ];
    navLinks.innerHTML = links.map(l =>
      `<a href="${l.href}" class="nav-link${l.key===activePage ? ' active' : ''}">${l.label}</a>`
    ).join("") + `<button id="theme-toggle-btn" class="theme-toggle" onclick="chToggleTheme()" aria-label="Toggle dark mode"></button>`;
  }
  chRenderThemeIcon();
}
document.addEventListener("DOMContentLoaded", function(){
  chRenderNav(document.body.getAttribute("data-page"));
});
