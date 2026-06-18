/* ===========================================================
   QUIZ WIZARD — collects profile answers, then redirects to dashboard
   =========================================================== */
const GENDER_OPTIONS = [
  { id:"female", name:"Female", icon:"venus" },
  { id:"male", name:"Male", icon:"mars" },
  { id:"non-binary", name:"Non-binary", icon:"users" },
  { id:"prefer-not-to-say", name:"Prefer not to say", icon:"user" }
];

let QUIZ_STEPS = [];
let qState = { step: 0, answers: { name:"", gender:null, skinType:null, skinIssues:[], hairType:null, unsuitable:[], preferences:[] } };

function buildQuizSteps(){
  QUIZ_STEPS = [
    { key:"name", title:"Let's set up your plan", subtitle:"Pick a name for your profile — this stays only in your own browser, no account or email needed.", type:"name" },
    { key:"gender", title:"What's your gender?", subtitle:"Helps tailor the tone of advice — entirely optional.", type:"single", options: GENDER_OPTIONS, required:false },
    { key:"skinType", title:"What's your skin type?", subtitle:"Pick what best matches how your skin usually feels by midday.", type:"single", options: DB_SKIN_TYPES.map(s=>({id:s.id,name:s.name,icon:s.icon})), required:true },
    { key:"skinIssues", title:"Any skin concerns?", subtitle:"Select all that apply, or skip if you don't have any in particular.", type:"multi", options: DB_SKIN_ISSUES.map(s=>({id:s.id,name:s.name,icon:s.icon})), required:false },
    { key:"hairType", title:"What's your hair & scalp type?", subtitle:"Pick the closest match — this sets your recommended wash frequency.", type:"single", options: DB_HAIR_TYPES.map(h=>({id:h.id,name:h.name,icon:h.icon})), required:true },
    { key:"unsuitable", title:"Anything NOT suitable for you?", subtitle:"Allergies, sensitivities, or ingredients/products you want the plan to avoid completely.", type:"multi", options: DB_UNSUITABLE_ITEMS.map(u=>({id:u.id,name:u.name})), required:false },
    { key:"preferences", title:"What do you like?", subtitle:"This shapes your routine pace and your makeup tutorial style.", type:"grouped", required:false },
    { key:"review", title:"Review your answers", type:"review" }
  ];
}

function qAnswer(key){ return qState.answers[key]; }
function qIsSelected(key, id){
  const v = qState.answers[key];
  return Array.isArray(v) ? v.includes(id) : v === id;
}
function qToggleSingle(key, id){ qState.answers[key] = id; renderQuizStep(); }
function qToggleMulti(key, id){
  const arr = qState.answers[key];
  const idx = arr.indexOf(id);
  if(idx >= 0) arr.splice(idx,1); else arr.push(id);
  renderQuizStep();
}
function qToggleGrouped(groupKey, id, group){
  const arr = qState.answers.preferences;
  if(group === "makeup-style"){
    DB_PREFERENCES.filter(p=>p.group==="makeup-style").forEach(p=>{
      const i = arr.indexOf(p.id); if(i>=0) arr.splice(i,1);
    });
    arr.push(id);
  } else {
    const idx = arr.indexOf(id);
    if(idx >= 0) arr.splice(idx,1); else arr.push(id);
  }
  renderQuizStep();
}

function qCanProceed(){
  const step = QUIZ_STEPS[qState.step];
  if(step.type === "name") return qState.answers.name.trim().length > 0;
  if(step.required) return !!qState.answers[step.key];
  return true;
}

function renderProgressDots(){
  const dots = document.getElementById("progress-dots");
  if(!dots) return;
  dots.innerHTML = QUIZ_STEPS.map((s,i) => `<span class="${i===qState.step?'is-active':''}"></span>`).join("");
}

function chipHtml(opt, selected, onclickJs){
  return `<button type="button" class="chip${selected?' is-selected':''}" onclick="${onclickJs}">${opt.icon ? icon(opt.icon) : ""}${opt.name}</button>`;
}

function renderQuizStep(){
  renderProgressDots();
  const step = QUIZ_STEPS[qState.step];
  const card = document.getElementById("quiz-card");
  let body = "";

  if(step.type === "name"){
    body = `
      <h2 class="display-sm mb-sm">${step.title}</h2>
      <p class="body-light mb-md">${step.subtitle}</p>
      <div class="field">
        <label for="quiz-name-input">Your name</label>
        <input id="quiz-name-input" type="text" placeholder="e.g. Asha" value="${qState.answers.name.replace(/"/g,'&quot;')}" oninput="qState.answers.name=this.value" />
      </div>
      <p class="caption" id="name-hint"></p>
    `;
  } else if(step.type === "single"){
    body = `
      <h2 class="display-sm mb-sm">${step.title}</h2>
      <p class="body-light mb-md">${step.subtitle}</p>
      <div class="chip-group">
        ${step.options.map(o => chipHtml(o, qIsSelected(step.key,o.id), `qToggleSingle('${step.key}','${o.id}')`)).join("")}
      </div>
    `;
  } else if(step.type === "multi"){
    body = `
      <h2 class="display-sm mb-sm">${step.title}</h2>
      <p class="body-light mb-md">${step.subtitle}</p>
      <div class="chip-group">
        ${step.options.map(o => chipHtml(o, qIsSelected(step.key,o.id), `qToggleMulti('${step.key}','${o.id}')`)).join("")}
      </div>
    `;
  } else if(step.type === "grouped"){
    const groups = [
      { key:"product-style", label:"Product Style" },
      { key:"routine-style", label:"Routine Pace" },
      { key:"makeup-style", label:"Makeup Style" }
    ];
    body = `
      <h2 class="display-sm mb-sm">${step.title}</h2>
      <p class="body-light mb-md">${step.subtitle}</p>
      ${groups.map(g => `
        <p class="label-uppercase mb-sm" style="margin-top:var(--sp-md);">${g.label}</p>
        <div class="chip-group mb-md">
          ${DB_PREFERENCES.filter(p=>p.group===g.key).map(p =>
            chipHtml({id:p.id,name:p.name}, qState.answers.preferences.includes(p.id), `qToggleGrouped('preferences','${p.id}','${g.key}')`)
          ).join("")}
        </div>
      `).join("")}
    `;
  } else if(step.type === "review"){
    const a = qState.answers;
    const skin = DB_SKIN_TYPES.find(s=>s.id===a.skinType);
    const hair = DB_HAIR_TYPES.find(h=>h.id===a.hairType);
    const issues = a.skinIssues.map(id => DB_SKIN_ISSUES.find(s=>s.id===id)?.name).filter(Boolean);
    const avoid = a.unsuitable.map(id => DB_UNSUITABLE_ITEMS.find(u=>u.id===id)?.name).filter(Boolean);
    const prefs = a.preferences.map(id => DB_PREFERENCES.find(p=>p.id===id)?.name).filter(Boolean);
    const gender = GENDER_OPTIONS.find(g=>g.id===a.gender);
    body = `
      <h2 class="display-sm mb-sm">${step.title}</h2>
      <p class="body-light mb-md">Here's what we'll build your plan from. You can change any of this later.</p>
      <div class="card mb-sm"><strong>Name:</strong> ${a.name || "—"}</div>
      <div class="card mb-sm"><strong>Gender:</strong> ${gender ? gender.name : "Not specified"}</div>
      <div class="card mb-sm"><strong>Skin type:</strong> ${skin ? skin.name : "—"}</div>
      <div class="card mb-sm"><strong>Skin concerns:</strong> ${issues.length ? issues.join(", ") : "None selected"}</div>
      <div class="card mb-sm"><strong>Hair & scalp type:</strong> ${hair ? hair.name : "—"}</div>
      <div class="card mb-sm"><strong>Avoiding:</strong> ${avoid.length ? avoid.join(", ") : "Nothing specified"}</div>
      <div class="card mb-sm"><strong>Preferences:</strong> ${prefs.length ? prefs.join(", ") : "None selected"}</div>
    `;
  }

  const isFirst = qState.step === 0;
  const isReview = step.type === "review";
  const nextLabel = isReview ? "Generate My Care Plan" : "Next";
  const nextAction = isReview ? "qSubmit()" : "qGoNext()";
  const disabled = (!isReview && !qCanProceed()) ? "disabled" : "";

  card.innerHTML = body + `
    <div class="flex justify-between mt-lg" style="gap:var(--sp-sm);">
      <button class="btn btn-secondary" onclick="qGoBack()" ${isFirst ? "disabled" : ""}>Back</button>
      <button class="btn btn-primary" onclick="${nextAction}" ${disabled}>${nextLabel}</button>
    </div>
  `;

  if(step.type === "name"){
    const input = document.getElementById("quiz-name-input");
    input.addEventListener("input", function(){
      qState.answers.name = this.value;
      const hint = document.getElementById("name-hint");
      const existing = chStoreGetProfile(this.value);
      hint.textContent = existing ? `A saved profile for "${existing.name}" was found — continuing will load and let you update those answers.` : "";
      document.querySelector('#quiz-card .btn-primary').removeAttribute("disabled");
      if(!this.value.trim()) document.querySelector('#quiz-card .btn-primary').setAttribute("disabled","disabled");
    });
  }
}

function qGoNext(){
  if(!qCanProceed()) return;
  if(qState.step === 0){
    const existing = chStoreGetProfile(qState.answers.name);
    if(existing){
      qState.answers = JSON.parse(JSON.stringify(existing));
    }
  }
  qState.step = Math.min(qState.step + 1, QUIZ_STEPS.length - 1);
  renderQuizStep();
  document.getElementById("quiz-section").scrollIntoView({behavior:"smooth", block:"start"});
}
function qGoBack(){
  qState.step = Math.max(qState.step - 1, 0);
  renderQuizStep();
}
function qSubmit(){
  const profile = {
    name: qState.answers.name.trim() || "Guest",
    gender: qState.answers.gender,
    skinType: qState.answers.skinType,
    skinIssues: qState.answers.skinIssues,
    hairType: qState.answers.hairType,
    unsuitable: qState.answers.unsuitable,
    preferences: qState.answers.preferences,
    updatedAt: new Date().toISOString()
  };
  chStoreSaveProfile(profile);
  window.location.href = "dashboard.html";
}

document.addEventListener("DOMContentLoaded", function(){
  buildQuizSteps();
  if(new URLSearchParams(window.location.search).get("edit") === "true"){
    const current = chStoreGetCurrentProfile();
    if(current) qState.answers = JSON.parse(JSON.stringify(current));
  }
  renderQuizStep();
});
