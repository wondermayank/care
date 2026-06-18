/* ===========================================================
   DATABASE: Skin Care Products
   tags: ingredient/trait tags used to cross-check against DB_UNSUITABLE_ITEMS
   suitableFor: skin type ids | "all"
   helpsWith: skin issue ids
   step: AM | PM | both
   freq: daily | 2x-week | 1x-week | 3x-week
   =========================================================== */
const DB_SKIN_PRODUCTS = [
  { id:"sp01", name:"Gentle Foaming Cleanser", category:"Cleanser", icon:"droplets", suitableFor:["oily","combination","normal"], helpsWith:["acne","large-pores"], tags:["sulfates"], step:"both", freq:"daily", desc:"Light foaming gel that clears excess oil without over-stripping." },
  { id:"sp02", name:"Cream Hydrating Cleanser", category:"Cleanser", icon:"droplets", suitableFor:["dry","sensitive","normal"], helpsWith:["dryness","redness"], tags:[], step:"both", freq:"daily", desc:"Non-foaming, fragrance-free cream cleanser that keeps the skin barrier intact." },
  { id:"sp03", name:"Micellar Water", category:"Cleanser", icon:"droplet", suitableFor:["all"], helpsWith:["dullness"], tags:[], step:"PM", freq:"daily", desc:"Quick no-rinse first cleanse to lift makeup and SPF before your main cleanser." },
  { id:"sp04", name:"Balancing Toner (Alcohol-Free)", category:"Toner", icon:"spray-can", suitableFor:["combination","normal","oily"], helpsWith:["large-pores"], tags:[], step:"both", freq:"daily", desc:"Preps skin and balances pH after cleansing, no drying alcohol." },
  { id:"sp05", name:"Niacinamide 5% Serum", category:"Serum", icon:"droplet", suitableFor:["oily","combination","normal"], helpsWith:["acne","large-pores","pigmentation","dullness"], tags:[], step:"both", freq:"daily", desc:"Controls oil, fades marks, and strengthens the skin barrier." },
  { id:"sp06", name:"Vitamin C Brightening Serum", category:"Serum", icon:"sun", suitableFor:["all"], helpsWith:["pigmentation","dullness","wrinkles"], tags:[], step:"AM", freq:"daily", desc:"Antioxidant protection plus brightening — always follow with SPF." },
  { id:"sp07", name:"Hyaluronic Acid Serum", category:"Serum", icon:"droplets", suitableFor:["dry","normal","sensitive","combination"], helpsWith:["dryness"], tags:[], step:"both", freq:"daily", desc:"Deeply hydrating humectant serum, apply on damp skin." },
  { id:"sp08", name:"Retinol Night Serum 0.3%", category:"Serum", icon:"moon", suitableFor:["normal","oily","combination"], helpsWith:["wrinkles","acne","dullness"], tags:["retinol"], step:"PM", freq:"2x-week", desc:"Anti-aging and texture-renewing — start slow, 2 nights a week." },
  { id:"sp09", name:"Centella (Cica) Soothing Serum", category:"Serum", icon:"leaf", suitableFor:["sensitive","dry","normal"], helpsWith:["redness","dryness"], tags:[], step:"both", freq:"daily", desc:"Calms redness and repairs the skin barrier, fragrance-free." },
  { id:"sp10", name:"Salicylic Acid 2% Treatment", category:"Spot Treatment", icon:"droplet", suitableFor:["oily","combination"], helpsWith:["acne","large-pores"], tags:["salicylic-acid"], step:"PM", freq:"3x-week", desc:"Unclogs pores and reduces breakouts — use only where needed." },
  { id:"sp11", name:"Benzoyl Peroxide 2.5% Spot Gel", category:"Spot Treatment", icon:"circle-check", suitableFor:["oily","combination","normal"], helpsWith:["acne"], tags:["benzoyl-peroxide"], step:"PM", freq:"3x-week", desc:"Targeted overnight treatment for active blemishes." },
  { id:"sp12", name:"Gel Moisturizer (Oil-Free)", category:"Moisturizer", icon:"droplets", suitableFor:["oily","combination"], helpsWith:["acne"], tags:[], step:"both", freq:"daily", desc:"Lightweight hydration that won't add shine." },
  { id:"sp13", name:"Rich Barrier Cream", category:"Moisturizer", icon:"layers", suitableFor:["dry","sensitive"], helpsWith:["dryness","redness"], tags:[], step:"both", freq:"daily", desc:"Ceramide-rich cream that locks in moisture for hours." },
  { id:"sp14", name:"Daily Lightweight Moisturizer", category:"Moisturizer", icon:"droplet", suitableFor:["normal","combination"], helpsWith:["dullness"], tags:[], step:"both", freq:"daily", desc:"Balanced everyday hydration for normal skin." },
  { id:"sp15", name:"Mineral SPF 50 Sunscreen", category:"Sunscreen", icon:"sun", suitableFor:["sensitive","all"], helpsWith:["pigmentation","wrinkles"], tags:[], step:"AM", freq:"daily", desc:"Zinc-oxide based, gentle, no white cast — the single most important step." },
  { id:"sp16", name:"Lightweight Gel SPF 50", category:"Sunscreen", icon:"sun", suitableFor:["oily","combination"], helpsWith:["pigmentation"], tags:[], step:"AM", freq:"daily", desc:"Matte-finish daily sunscreen that layers well under makeup." },
  { id:"sp17", name:"Clay Detox Mask", category:"Mask", icon:"layers", suitableFor:["oily","combination"], helpsWith:["large-pores","acne"], tags:[], step:"PM", freq:"1x-week", desc:"Draws out excess oil and impurities — limit to once weekly." },
  { id:"sp18", name:"Hydrating Sheet Mask", category:"Mask", icon:"droplets", suitableFor:["dry","normal","sensitive"], helpsWith:["dryness","dullness"], tags:[], step:"PM", freq:"1x-week", desc:"15-minute moisture boost, fragrance-free formula." },
  { id:"sp19", name:"Gentle Enzyme Exfoliant", category:"Exfoliant", icon:"sparkles", suitableFor:["sensitive","dry","normal"], helpsWith:["dullness"], tags:[], step:"PM", freq:"1x-week", desc:"Fruit-enzyme based, polishes skin without harsh scrubbing." },
  { id:"sp20", name:"AHA/BHA Exfoliating Toner", category:"Exfoliant", icon:"sparkles", suitableFor:["oily","combination","normal"], helpsWith:["dullness","large-pores","acne"], tags:["aha"], step:"PM", freq:"2x-week", desc:"Resurfaces texture and unclogs pores — never combine with retinol same night." },
  { id:"sp21", name:"Caffeine Eye Cream", category:"Eye Cream", icon:"moon", suitableFor:["all"], helpsWith:["dark-circles"], tags:[], step:"both", freq:"daily", desc:"De-puffs and brightens the under-eye area, pat gently to apply." },
  { id:"sp22", name:"Peptide Eye Cream", category:"Eye Cream", icon:"sparkle", suitableFor:["normal","dry","sensitive"], helpsWith:["wrinkles","dark-circles"], tags:[], step:"PM", freq:"daily", desc:"Firming eye treatment to soften fine lines over time." },
  { id:"sp23", name:"Lip Sleeping Mask", category:"Lip Care", icon:"heart", suitableFor:["all"], helpsWith:["dryness"], tags:[], step:"PM", freq:"daily", desc:"Overnight balm for soft, hydrated lips." }
];
