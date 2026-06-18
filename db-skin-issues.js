/* ===========================================================
   DATABASE: Skin Issues / Concerns
   =========================================================== */
const DB_SKIN_ISSUES = [
  {
    id: "acne",
    name: "Acne & Breakouts",
    icon: "circle-x",
    goodIngredients: ["salicylic-acid", "benzoyl-peroxide", "niacinamide", "tea-tree"],
    avoid: ["heavy-oils", "comedogenic-silicones"],
    tip: "Spot-treat at night, never pick or pop blemishes, change pillowcases twice a week."
  },
  {
    id: "pigmentation",
    name: "Dark Spots & Pigmentation",
    icon: "sun",
    goodIngredients: ["vitamin-c", "niacinamide", "alpha-arbutin", "spf"],
    avoid: ["sun-exposure-without-spf"],
    tip: "Daily SPF is non-negotiable — pigmentation gets worse without it, no matter what else you use."
  },
  {
    id: "dryness",
    name: "Dryness & Flaking",
    icon: "droplets",
    goodIngredients: ["hyaluronic-acid", "ceramides", "glycerin", "squalane"],
    avoid: ["sulfates", "alcohol-denat"],
    tip: "Layer a hydrating serum under moisturizer and apply to slightly damp skin to lock in water."
  },
  {
    id: "wrinkles",
    name: "Fine Lines & Wrinkles",
    icon: "clock",
    goodIngredients: ["retinol", "peptides", "vitamin-c", "spf"],
    avoid: ["harsh-physical-scrubs"],
    tip: "Introduce retinol slowly — 2 nights a week at first — and always pair with sunscreen by day."
  },
  {
    id: "dark-circles",
    name: "Dark Circles",
    icon: "moon",
    goodIngredients: ["caffeine", "vitamin-k", "peptides"],
    avoid: ["rubbing-eye-area"],
    tip: "Keep a cold eye cream/roller in the fridge and gently pat (never rub) the under-eye area."
  },
  {
    id: "redness",
    name: "Redness & Sensitivity",
    icon: "shield",
    goodIngredients: ["centella-asiatica", "ceramides", "panthenol"],
    avoid: ["fragrance", "essential-oils", "alcohol-denat", "physical-scrubs"],
    tip: "Less is more — a 3-step routine (cleanse, soothe, moisturize) calms reactive skin best."
  },
  {
    id: "large-pores",
    name: "Large Pores",
    icon: "layers",
    goodIngredients: ["niacinamide", "salicylic-acid", "clay"],
    avoid: ["heavy-pore-clogging-oils"],
    tip: "Pores can't shrink permanently, but regular gentle exfoliation keeps them from looking clogged."
  },
  {
    id: "dullness",
    name: "Dullness & Uneven Texture",
    icon: "sparkles",
    goodIngredients: ["vitamin-c", "aha", "exfoliating-acids"],
    avoid: ["over-exfoliating"],
    tip: "A weekly gentle exfoliation plus daily vitamin C brings back radiance faster than heavy makeup coverage."
  }
];
