/* ===========================================================
   DATABASE: Makeup Products
   area: Face | Eyes | Lips | Tools
   =========================================================== */
const DB_MAKEUP_PRODUCTS = [
  { id:"mp01", name:"Hydrating Primer", category:"Primer", area:"Face", icon:"droplet", suitableFor:["dry","sensitive","normal"], tags:[], desc:"Smooths skin and helps makeup last while adding hydration." },
  { id:"mp02", name:"Mattifying Primer", category:"Primer", area:"Face", icon:"shield", suitableFor:["oily","combination"], tags:[], desc:"Controls shine and minimizes pores before foundation." },
  { id:"mp03", name:"Lightweight Foundation (Buildable)", category:"Foundation", area:"Face", icon:"droplets", suitableFor:["all"], tags:[], desc:"Sheer-to-medium coverage that looks like skin." },
  { id:"mp04", name:"Full-Coverage Foundation", category:"Foundation", area:"Face", icon:"layers", suitableFor:["all"], tags:[], desc:"For events or coverage of redness/pigmentation." },
  { id:"mp05", name:"Creamy Concealer", category:"Concealer", area:"Face", icon:"droplet", suitableFor:["dry","normal","sensitive"], tags:[], desc:"Brightens under-eyes without settling into fine lines." },
  { id:"mp06", name:"Matte Concealer", category:"Concealer", area:"Face", icon:"shield", suitableFor:["oily","combination"], tags:[], desc:"Long-wear coverage for blemishes and spots." },
  { id:"mp07", name:"Setting Powder (Translucent)", category:"Powder", area:"Face", icon:"sparkles", suitableFor:["oily","combination","all"], tags:["talc"], desc:"Locks makeup in place and controls midday shine." },
  { id:"mp08", name:"Cream Blush", category:"Blush", area:"Face", icon:"heart", suitableFor:["dry","normal"], tags:[], desc:"Dewy flush of color, blends with fingertips." },
  { id:"mp09", name:"Powder Blush", category:"Blush", area:"Face", icon:"heart", suitableFor:["oily","combination"], tags:["talc"], desc:"Buildable color that lasts through the day." },
  { id:"mp10", name:"Bronzer", category:"Bronzer", area:"Face", icon:"sun", suitableFor:["all"], tags:[], desc:"Adds warmth and definition to cheekbones and jaw." },
  { id:"mp11", name:"Liquid Highlighter", category:"Highlighter", area:"Face", icon:"sparkle", suitableFor:["dry","normal"], tags:[], desc:"Dewy glow on cheekbones, brow bone, and cupid's bow." },
  { id:"mp12", name:"Powder Highlighter", category:"Highlighter", area:"Face", icon:"sparkles", suitableFor:["oily","combination"], tags:["talc"], desc:"Subtle shimmer without adding extra oil." },
  { id:"mp13", name:"Neutral Eyeshadow Palette", category:"Eyeshadow", area:"Eyes", icon:"palette", suitableFor:["all"], tags:[], desc:"Everyday matte and shimmer shades for any look." },
  { id:"mp14", name:"Pencil Eyeliner", category:"Eyeliner", area:"Eyes", icon:"paintbrush", suitableFor:["all"], tags:[], desc:"Easy to smudge for a soft definition look." },
  { id:"mp15", name:"Liquid Eyeliner", category:"Eyeliner", area:"Eyes", icon:"paintbrush", suitableFor:["all"], tags:[], desc:"Sharp, precise line for a winged eye." },
  { id:"mp16", name:"Volumizing Mascara", category:"Mascara", area:"Eyes", icon:"sparkles", suitableFor:["all"], tags:[], desc:"Lifts and thickens lashes for an everyday look." },
  { id:"mp17", name:"Waterproof Mascara", category:"Mascara", area:"Eyes", icon:"shield", suitableFor:["all"], tags:[], desc:"Long-wear formula resistant to humidity and tears." },
  { id:"mp18", name:"Brow Pencil", category:"Eyebrows", area:"Eyes", icon:"paintbrush", suitableFor:["all"], tags:[], desc:"Fills sparse areas with hair-like strokes." },
  { id:"mp19", name:"Tinted Brow Gel", category:"Eyebrows", area:"Eyes", icon:"sparkle", suitableFor:["all"], tags:[], desc:"Sets brows in place with a natural tint." },
  { id:"mp20", name:"Matte Lipstick", category:"Lipstick", area:"Lips", icon:"smile", suitableFor:["oily","combination","all"], tags:[], desc:"Long-wearing, full-pigment color." },
  { id:"mp21", name:"Hydrating Lipstick / Tinted Balm", category:"Lipstick", area:"Lips", icon:"heart", suitableFor:["dry","sensitive"], tags:[], desc:"Color with built-in moisture for dry lips." },
  { id:"mp22", name:"Lip Gloss", category:"Lip Gloss", area:"Lips", icon:"sparkle", suitableFor:["all"], tags:[], desc:"Shiny finish, great alone or layered over lipstick." },
  { id:"mp23", name:"Lip Liner", category:"Lip Liner", area:"Lips", icon:"paintbrush", suitableFor:["all"], tags:[], desc:"Defines and prevents lip color from bleeding." },
  { id:"mp24", name:"Setting Spray", category:"Setting Spray", area:"Face", icon:"spray-can", suitableFor:["all"], tags:["alcohol-denat"], desc:"Final step to lock makeup in place all day." },
  { id:"mp25", name:"Makeup Sponge (Latex-Free)", category:"Tool", area:"Tools", icon:"droplet", suitableFor:["all"], tags:[], desc:"Blends base products seamlessly; wash after every use." },
  { id:"mp26", name:"Synthetic Makeup Brush Set", category:"Tool", area:"Tools", icon:"paintbrush", suitableFor:["all"], tags:[], desc:"Cruelty-free bristles for precise blending of powders and creams." },
  { id:"mp27", name:"Makeup Remover (Micellar/Oil-Based)", category:"Remover", area:"Face", icon:"droplets", suitableFor:["all"], tags:[], desc:"Always remove makeup fully before bed — never sleep in it." }
];
