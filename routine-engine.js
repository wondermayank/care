/* ===========================================================
   ROUTINE ENGINE — pure rule-based logic, no external API.
   Reads only from the local DB_* arrays/objects.
   =========================================================== */

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

function hasTag(product, unsuitable){
  return (product.tags || []).some(t => unsuitable.includes(t));
}
function matchesSkin(product, skinType){
  return product.suitableFor.includes("all") || product.suitableFor.includes(skinType);
}
function pickProduct(list, { category, skinType, unsuitable, prefer }){
  let pool = list.filter(p => p.category === category && matchesSkin(p, skinType) && !hasTag(p, unsuitable));
  if(prefer){
    const preferred = pool.filter(prefer);
    if(preferred.length) pool = preferred;
  }
  return pool[0] || list.find(p => p.category === category && !hasTag(p, unsuitable)) || null;
}

function buildSkinCarePlan(profile){
  const { skinType, skinIssues, unsuitable, preferences } = profile;
  const minimal = preferences.includes("minimal-routine");

  const cleanser = pickProduct(DB_SKIN_PRODUCTS, { category:"Cleanser", skinType, unsuitable });
  const moisturizer = pickProduct(DB_SKIN_PRODUCTS, { category:"Moisturizer", skinType, unsuitable });
  const sunscreen = pickProduct(DB_SKIN_PRODUCTS, { category:"Sunscreen", skinType, unsuitable });

  const amSerum = pickProduct(DB_SKIN_PRODUCTS, {
    category:"Serum", skinType, unsuitable,
    prefer: p => (skinIssues.includes("pigmentation") || skinIssues.includes("dullness")) ? p.name.includes("Vitamin C") : p.name.includes("Niacinamide")
  });
  const pmSerum = pickProduct(DB_SKIN_PRODUCTS, {
    category:"Serum", skinType, unsuitable,
    prefer: p => skinIssues.includes("redness") ? p.name.includes("Centella") : p.name.includes("Hyaluronic")
  });

  let eyeCream = null;
  if(skinIssues.includes("dark-circles")) eyeCream = pickProduct(DB_SKIN_PRODUCTS, { category:"Eye Cream", skinType, unsuitable, prefer:p=>p.name.includes("Caffeine") });
  else if(skinIssues.includes("wrinkles")) eyeCream = pickProduct(DB_SKIN_PRODUCTS, { category:"Eye Cream", skinType, unsuitable, prefer:p=>p.name.includes("Peptide") });

  // Decide the weekly "active treatment" slot — only one active family per night to avoid combining strong actives
  let treatment = null, treatmentDays = [], treatmentLabel = "";
  if(skinIssues.includes("acne") && !unsuitable.includes("benzoyl-peroxide")){
    treatment = pickProduct(DB_SKIN_PRODUCTS, { category:"Spot Treatment", skinType, unsuitable });
    treatmentDays = [0,2,4]; treatmentLabel = "Spot treatment (3x/week)";
  } else if((skinIssues.includes("wrinkles") || preferences.includes("full-routine")) && !unsuitable.includes("retinol") && skinType !== "sensitive"){
    treatment = pickProduct(DB_SKIN_PRODUCTS, { category:"Serum", skinType, unsuitable, prefer:p=>p.name.includes("Retinol") });
    if(treatment && !treatment.name.includes("Retinol")) treatment = null;
    treatmentDays = [0,3]; treatmentLabel = "Retinol night (2x/week)";
  } else if((skinIssues.includes("dullness") || skinIssues.includes("large-pores")) && !unsuitable.includes("aha") && skinType !== "sensitive" && skinType !== "dry"){
    treatment = pickProduct(DB_SKIN_PRODUCTS, { category:"Exfoliant", skinType, unsuitable, prefer:p=>p.name.includes("AHA") });
    treatmentDays = [1,4]; treatmentLabel = "Exfoliating night (2x/week)";
  }
  if(!treatment && !minimal){
    treatment = pickProduct(DB_SKIN_PRODUCTS, { category:"Exfoliant", skinType, unsuitable, prefer:p=>p.name.includes("Enzyme") });
    treatmentDays = [5]; treatmentLabel = "Gentle exfoliation (1x/week)";
  }

  const mask = minimal ? null : pickProduct(DB_SKIN_PRODUCTS, {
    category:"Mask", skinType, unsuitable,
    prefer: p => (skinType === "oily" || skinType === "combination") ? p.name.includes("Clay") : p.name.includes("Hydrating")
  });

  const week = DAYS.map((day, i) => {
    const am = [];
    if(cleanser) am.push({ label: cleanser.name, icon: cleanser.icon });
    if(amSerum) am.push({ label: amSerum.name, icon: amSerum.icon });
    if(eyeCream) am.push({ label: eyeCream.name, icon: eyeCream.icon });
    if(moisturizer) am.push({ label: moisturizer.name, icon: moisturizer.icon });
    if(sunscreen) am.push({ label: sunscreen.name, icon: sunscreen.icon });

    const pm = [];
    if(cleanser) pm.push({ label: cleanser.name, icon: cleanser.icon });
    if(treatment && treatmentDays.includes(i)){
      pm.push({ label: treatment.name, icon: treatment.icon, isActive:true });
    } else if(pmSerum){
      pm.push({ label: pmSerum.name, icon: pmSerum.icon });
    }
    if(eyeCream) pm.push({ label: eyeCream.name, icon: eyeCream.icon });
    if(mask && i === 6) pm.push({ label: mask.name, icon: mask.icon, isActive:true });
    if(moisturizer) pm.push({ label: moisturizer.name, icon: moisturizer.icon });

    return { day, am, pm };
  });

  const skinTypeObj = DB_SKIN_TYPES.find(s => s.id === skinType);
  const doList = [...(skinTypeObj ? skinTypeObj.do : [])];
  const dontList = [...(skinTypeObj ? skinTypeObj.dont : [])];
  const issueTips = skinIssues.map(id => DB_SKIN_ISSUES.find(s => s.id === id)).filter(Boolean);
  issueTips.forEach(issue => doList.push(issue.tip));
  const avoidNames = unsuitable.map(id => {
    const u = DB_UNSUITABLE_ITEMS.find(x => x.id === id);
    return u ? `Avoid products containing ${u.name}` : null;
  }).filter(Boolean);

  return { week, doList, dontList: [...dontList, ...avoidNames], treatmentLabel, products: { cleanser, moisturizer, sunscreen, amSerum, pmSerum, eyeCream, treatment, mask } };
}

function buildHairPlan(profile){
  const { hairType, unsuitable, preferences } = profile;
  const hairTypeObj = DB_HAIR_TYPES.find(h => h.id === hairType) || DB_HAIR_TYPES[0];
  const shampoo = pickProduct(DB_HAIR_PRODUCTS, { category:"Shampoo", skinType: hairType, unsuitable, prefer: p => p.suitableFor.includes(hairType) });
  const conditioner = pickProduct(DB_HAIR_PRODUCTS, { category:"Conditioner", skinType: hairType, unsuitable, prefer: p => p.suitableFor.includes(hairType) });
  const oil = DB_HAIR_PRODUCTS.find(p => p.category === "Hair Oil" && p.suitableFor.includes(hairType) && !hasTag(p, unsuitable))
            || DB_HAIR_PRODUCTS.find(p => p.category === "Hair Oil" && !hasTag(p, unsuitable));
  const leaveIn = DB_HAIR_PRODUCTS.find(p => p.category === "Leave-In" && p.suitableFor.includes(hairType) && !hasTag(p, unsuitable));
  const heatProtectant = unsuitable.includes("heat-styling") ? null : DB_HAIR_PRODUCTS.find(p => p.id === "hp10");

  return { hairTypeObj, washPerWeek: hairTypeObj.washPerWeek, tip: hairTypeObj.tip, shampoo, conditioner, oil, leaveIn, heatProtectant };
}

function buildMakeupPlan(profile){
  const { skinType, unsuitable, preferences } = profile;
  const stylePref = DB_PREFERENCES.find(p => p.group === "makeup-style" && preferences.includes(p.id));
  const tutorialId = stylePref ? stylePref.tutorialId : "everyday-natural";
  const tutorial = DB_MAKEUP_TUTORIALS[tutorialId];

  const steps = tutorial.steps.map(step => {
    let product = DB_MAKEUP_PRODUCTS.find(p => p.category === step.category && matchesSkin(p, skinType) && !hasTag(p, unsuitable))
               || DB_MAKEUP_PRODUCTS.find(p => p.category === step.category && !hasTag(p, unsuitable));
    return { ...step, product };
  });

  return { tutorialId, name: tutorial.name, icon: tutorial.icon, summary: tutorial.summary, steps };
}

function buildBathAndCarePlan(profile){
  const { skinType, unsuitable } = profile;
  const bodyWash = pickProduct(DB_BATH_PRODUCTS, { category: (skinType==="oily"||skinType==="combination") ? "Body Wash" : "Body Wash", skinType, unsuitable, prefer: p => p.suitableFor.includes(skinType) });
  const lotion = pickProduct(DB_BATH_PRODUCTS, { category:"Body Lotion", skinType, unsuitable });
  const scrub = DB_BATH_PRODUCTS.find(p => p.category === "Scrub" && matchesSkin(p, skinType) && !hasTag(p, unsuitable));
  const deodorant = DB_BATH_PRODUCTS.find(p => p.category === "Deodorant" && matchesSkin(p, skinType) && !hasTag(p, unsuitable)) || DB_BATH_PRODUCTS.find(p=>p.category==="Deodorant");
  const bathItems = [bodyWash, lotion, scrub, deodorant].filter(Boolean);

  const personalCare = DB_PERSONAL_CARE.filter(p => matchesSkin(p, skinType) && !hasTag(p, unsuitable));

  return { bathItems, personalCare };
}

function buildFullPlan(profile){
  return {
    profile,
    skinPlan: buildSkinCarePlan(profile),
    hairPlan: buildHairPlan(profile),
    makeupPlan: buildMakeupPlan(profile),
    bathPlan: buildBathAndCarePlan(profile)
  };
}
