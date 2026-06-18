/* ===========================================================
   DASHBOARD — renders the full personalized care plan.
   Reads the current profile from the store, runs the routine
   engine, and populates every section of index.html.
   =========================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const profile = chStoreGetCurrentProfile();

  if (!profile) {
    // No profile saved — redirect to the home/quiz page
    window.location.href = "home.html";
    return;
  }

  const plan = buildFullPlan(profile);

  renderProfileSummary(profile);
  renderSkinCareRoutine(plan.skinPlan);
  renderDosDonts(plan.skinPlan);
  renderHairSection(plan.hairPlan);
  renderMakeupSection(plan.makeupPlan);
  renderBathSection(plan.bathPlan);

  // Show all sections now that they're populated
  ["routine-section", "dodont-section", "hair-section", "makeup-section", "bath-section"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove("hidden");
  });
});

/* ---- Profile summary banner ---- */
function renderProfileSummary(profile) {
  const el = document.getElementById("profile-summary");
  if (!el) return;

  const skinType = DB_SKIN_TYPES.find(s => s.id === profile.skinType);
  const hairType = DB_HAIR_TYPES.find(h => h.id === profile.hairType);
  const issueNames = (profile.skinIssues || [])
    .map(id => DB_SKIN_ISSUES.find(s => s.id === id)?.name)
    .filter(Boolean);

  el.innerHTML = `
    <div class="flex items-center gap-md" style="flex-wrap:wrap; justify-content:space-between;">
      <div>
        <p class="label-uppercase" style="color:var(--primary);">Your Care Plan</p>
        <h1 class="display-md mt-sm">Hi, ${profile.name} ${icon("sparkles")}</h1>
        <p class="body-light mt-sm" style="max-width:520px;">
          ${skinType ? `<strong>${skinType.name} skin</strong>` : ""}
          ${issueNames.length ? " · " + issueNames.join(" · ") : ""}
          ${hairType ? ` · <strong>${hairType.name}</strong>` : ""}
        </p>
        <p class="caption mt-sm" style="color:var(--muted);">
          Last updated ${new Date(profile.updatedAt || Date.now()).toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" })}
        </p>
      </div>
      <div class="flex gap-sm" style="flex-wrap:wrap; align-items:center;">
        <a href="home.html?edit=true" class="btn btn-secondary btn-sm">${icon("edit")} Edit Answers</a>
        <a href="products.html" class="btn btn-secondary btn-sm">${icon("grid")} Product Library</a>
      </div>
    </div>
  `;
}

/* ---- Weekly skincare routine table ---- */
function renderSkinCareRoutine(skinPlan) {
  const table = document.getElementById("routine-table");
  const note  = document.getElementById("treatment-note");
  if (!table) return;

  const { week, treatmentLabel } = skinPlan;

  const headerRow = `
    <thead>
      <tr>
        <th style="text-align:left; padding:var(--sp-sm) var(--sp-md);">Day</th>
        <th style="text-align:left; padding:var(--sp-sm) var(--sp-md);">Morning ${icon("sun")}</th>
        <th style="text-align:left; padding:var(--sp-sm) var(--sp-md);">Evening ${icon("moon")}</th>
      </tr>
    </thead>
  `;

  const rows = week.map(({ day, am, pm }) => {
    const stepHtml = steps => steps.map(s => `
      <span class="routine-step${s.isActive ? " is-active" : ""}">
        ${icon(s.icon || "sparkle")} ${s.label}
      </span>`).join("");
    return `
      <tr>
        <td class="routine-day">${day}</td>
        <td class="routine-steps">${stepHtml(am)}</td>
        <td class="routine-steps">${stepHtml(pm)}</td>
      </tr>`;
  }).join("");

  table.innerHTML = `${headerRow}<tbody>${rows}</tbody>`;

  if (note && treatmentLabel) {
    note.textContent = `★ Active treatment this week: ${treatmentLabel}. Never combine retinol and AHA/BHA on the same night.`;
  }
}

/* ---- Do's and Don'ts ---- */
function renderDosDonts(skinPlan) {
  const doEl   = document.getElementById("do-list");
  const dontEl = document.getElementById("dont-list");
  if (!doEl || !dontEl) return;

  const itemHtml = (text, type) => `
    <div class="card mb-sm flex gap-xs items-start" style="padding:var(--sp-sm) var(--sp-md);">
      <span style="color:var(--${type === "do" ? "success" : "error"}); flex-shrink:0; margin-top:2px;">${icon(type === "do" ? "check" : "x")}</span>
      <span class="body-sm">${text}</span>
    </div>`;

  doEl.innerHTML   = (skinPlan.doList   || []).map(t => itemHtml(t, "do")).join("");
  dontEl.innerHTML = (skinPlan.dontList || []).map(t => itemHtml(t, "dont")).join("");
}

/* ---- Hair care section ---- */
function renderHairSection(hairPlan) {
  const el = document.getElementById("hair-content");
  if (!el) return;

  const { hairTypeObj, washPerWeek, tip, shampoo, conditioner, oil, leaveIn, heatProtectant } = hairPlan;

  const productCard = p => p ? `
    <div class="card flex gap-sm items-start" style="padding:var(--sp-sm) var(--sp-md);">
      <span style="color:var(--primary); flex-shrink:0;">${icon(p.icon || "droplet")}</span>
      <div>
        <p class="body-sm" style="font-weight:600;">${p.name}</p>
        <p class="caption">${p.desc || ""}</p>
      </div>
    </div>` : "";

  el.innerHTML = `
    <div class="grid grid-2">
      <div>
        <p class="body-md mb-sm">
          ${icon("calendar")} Wash <strong>${washPerWeek}×</strong> per week
        </p>
        <p class="body-sm mb-lg" style="color:var(--muted);">${tip}</p>
        <div style="display:flex; flex-direction:column; gap:var(--sp-sm);">
          ${productCard(shampoo)}
          ${productCard(conditioner)}
          ${productCard(oil)}
          ${productCard(leaveIn)}
          ${productCard(heatProtectant)}
        </div>
      </div>
      <div>
        <p class="label-uppercase mb-sm">Wash Day Steps</p>
        <ol class="body-sm" style="padding-left:var(--sp-md); display:flex; flex-direction:column; gap:var(--sp-xs);">
          ${oil ? `<li>Pre-wash: apply <strong>${oil.name}</strong> to the scalp, wait 20 min.</li>` : ""}
          <li>Wet hair with lukewarm water.</li>
          ${shampoo ? `<li>Work <strong>${shampoo.name}</strong> into the scalp, rinse thoroughly.</li>` : ""}
          ${conditioner ? `<li>Apply <strong>${conditioner.name}</strong> to mid-lengths and ends, leave 2–3 min, rinse.</li>` : ""}
          ${leaveIn ? `<li>Apply <strong>${leaveIn.name}</strong> to damp hair.</li>` : ""}
          ${heatProtectant ? `<li>Spritz <strong>${heatProtectant.name}</strong> before any heat styling.</li>` : ""}
          <li>Air-dry or diffuse on low heat.</li>
        </ol>
      </div>
    </div>
  `;
}

/* ---- Makeup section ---- */
function renderMakeupSection(makeupPlan) {
  const el = document.getElementById("makeup-content");
  if (!el) return;

  const { name, icon: tutIcon, summary, steps } = makeupPlan;

  const stepCards = steps.map((step, i) => `
    <div class="card flex gap-sm items-start" style="padding:var(--sp-sm) var(--sp-md);">
      <span class="label-uppercase" style="color:var(--primary); flex-shrink:0; min-width:24px;">${i + 1}</span>
      <div style="flex:1;">
        <p class="body-sm" style="font-weight:600;">${step.title}</p>
        <p class="caption" style="color:var(--muted);">${step.detail}</p>
        ${step.product ? `<p class="caption mt-xs" style="color:var(--primary);">${icon(step.product.icon || "sparkle")} <em>${step.product.name}</em></p>` : ""}
      </div>
    </div>`).join("");

  el.innerHTML = `
    <h2 class="display-md mt-md mb-sm">${icon(tutIcon)} ${name}</h2>
    <p class="body-light mb-lg" style="max-width:560px;">${summary}</p>
    <div style="display:flex; flex-direction:column; gap:var(--sp-sm);">
      ${stepCards}
    </div>
  `;
}

/* ---- Bath & personal care section ---- */
function renderBathSection(bathPlan) {
  const bathGrid = document.getElementById("bath-grid");
  const careGrid = document.getElementById("personal-care-grid");
  if (!bathGrid || !careGrid) return;

  const productCard = p => `
    <div class="card flex gap-xs items-start" style="padding:var(--sp-sm);">
      <span style="color:var(--primary); flex-shrink:0;">${icon(p.icon || "droplet")}</span>
      <div>
        <p class="body-sm" style="font-weight:600;">${p.name}</p>
        <p class="caption">${p.desc || ""}</p>
      </div>
    </div>`;

  bathGrid.innerHTML = (bathPlan.bathItems || []).map(productCard).join("");
  careGrid.innerHTML = (bathPlan.personalCare || []).map(productCard).join("");
}
