/* ===========================================================
   THEME + LOADING SCREEN — shared across all pages
   =========================================================== */
(function(){
  const saved = localStorage.getItem("theme");
  if(saved === "dark"){ document.documentElement.setAttribute("data-theme","dark"); }
})();

function chToggleTheme(){
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  if(isDark){
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme","light");
  } else {
    document.documentElement.setAttribute("data-theme","dark");
    localStorage.setItem("theme","dark");
  }
  chRenderThemeIcon();
}
function chRenderThemeIcon(){
  const btn = document.getElementById("theme-toggle-btn");
  if(!btn) return;
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  btn.innerHTML = isDark ? icon("sun") : icon("moon");
  btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

function chHideLoadingScreen(){
  const el = document.getElementById("loading-screen");
  if(el) el.classList.add("hide");
}
document.addEventListener("DOMContentLoaded", function(){
  chRenderThemeIcon();
  chHideLoadingScreen();
});
setTimeout(chHideLoadingScreen, 1500);
