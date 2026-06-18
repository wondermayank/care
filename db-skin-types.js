/* ===========================================================
   DATABASE: Skin Types
   =========================================================== */
const DB_SKIN_TYPES = [
  {
    id: "oily",
    name: "Oily",
    icon: "droplet",
    description: "Skin produces excess sebum, often shiny by midday, prone to enlarged pores and breakouts.",
    do: ["Use a gel or foam cleanser twice daily", "Use oil-free, non-comedogenic moisturizer", "Use clay or charcoal mask 1-2x/week"],
    dont: ["Skip moisturizer thinking it reduces oil", "Over-wash (more than 2x/day strips skin and triggers more oil)", "Use heavy, butter-based creams"]
  },
  {
    id: "dry",
    name: "Dry",
    icon: "droplets",
    description: "Skin feels tight, may flake or look dull, lacks natural oils and needs extra hydration.",
    do: ["Use a creamy, hydrating cleanser", "Apply rich moisturizer while skin is still damp", "Use a hydrating mask 1-2x/week"],
    dont: ["Use foaming cleansers with sulfates", "Use alcohol-based toners", "Over-exfoliate (max once a week)"]
  },
  {
    id: "combination",
    name: "Combination",
    icon: "layers",
    description: "Oily T-zone (forehead, nose, chin) with normal-to-dry cheeks; needs balanced, zone-specific care.",
    do: ["Use a gentle balancing cleanser", "Apply lighter gel moisturizer on T-zone, richer cream on cheeks", "Use multi-masking (clay on T-zone, hydrating on cheeks)"],
    dont: ["Use one heavy product all over the face", "Ignore the drier areas", "Over-exfoliate the oily zone alone"]
  },
  {
    id: "normal",
    name: "Normal",
    icon: "gauge",
    description: "Well-balanced skin — not too oily or dry, few sensitivities, smooth texture.",
    do: ["Maintain a simple cleanse-moisturize-SPF routine", "Use antioxidant serum in the morning", "Exfoliate gently 1-2x/week to maintain glow"],
    dont: ["Over-complicate with too many active ingredients at once", "Skip sunscreen", "Skip patch-testing new products"]
  },
  {
    id: "sensitive",
    name: "Sensitive",
    icon: "shield",
    description: "Skin reacts easily with redness, itching, or stinging to new products, fragrance, or weather changes.",
    do: ["Patch-test every new product for 48 hours", "Use fragrance-free, minimal-ingredient products", "Use lukewarm water, never hot"],
    dont: ["Use products with added fragrance, alcohol, or essential oils", "Combine multiple strong actives (retinol + AHA/BHA) at once", "Use physical scrubs with rough granules"]
  }
];
