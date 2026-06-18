/* ===========================================================
   DATABASE: Preferences ("what she/he likes")
   group "makeup-style" maps directly to a DB_MAKEUP_TUTORIALS key
   group "routine-style" tunes how many steps/actives the engine shows
   =========================================================== */
const DB_PREFERENCES = [
  { id:"natural-organic", name:"Natural / Organic Products", group:"product-style" },
  { id:"fragrance-free", name:"Fragrance-Free Products", group:"product-style" },
  { id:"vegan-cruelty-free", name:"Vegan & Cruelty-Free", group:"product-style" },
  { id:"budget-friendly", name:"Budget-Friendly Picks", group:"product-style" },
  { id:"minimal-routine", name:"Minimal, Quick Routine", group:"routine-style" },
  { id:"full-routine", name:"Full Multi-Step Routine", group:"routine-style" },
  { id:"makeup-everyday-natural", name:"Everyday Natural Makeup", group:"makeup-style", tutorialId:"everyday-natural" },
  { id:"makeup-office-professional", name:"Office / Professional Makeup", group:"makeup-style", tutorialId:"office-professional" },
  { id:"makeup-glam-evening", name:"Bold Glam / Evening Makeup", group:"makeup-style", tutorialId:"glam-evening" },
  { id:"makeup-no-makeup", name:"No-Makeup Makeup Look", group:"makeup-style", tutorialId:"no-makeup-makeup" }
];
