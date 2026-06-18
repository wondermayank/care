/* ===========================================================
   DATABASE: Makeup Tutorials (by style)
   Each step references a makeup category so the engine can
   attach a specific product recommendation from DB_MAKEUP_PRODUCTS
   =========================================================== */
const DB_MAKEUP_TUTORIALS = {
  "everyday-natural": {
    name: "Everyday Natural Look",
    icon: "sun",
    summary: "A fresh, low-effort look that evens out skin tone and enhances your features — about 10 minutes.",
    steps: [
      { title:"Prep skin", category:"Primer", detail:"Apply a thin layer of primer suited to your skin type so makeup glides on evenly." },
      { title:"Even out tone", category:"Foundation", detail:"Use a lightweight, buildable foundation — apply only where needed, blend with a damp sponge." },
      { title:"Brighten under-eyes", category:"Concealer", detail:"Dab a small amount under eyes and on any redness, blend with fingertip." },
      { title:"Set lightly", category:"Powder", detail:"Press powder only on the T-zone to control shine, skip on dry cheeks." },
      { title:"Add color", category:"Blush", detail:"Smile and apply blush to the apples of your cheeks for a natural flush." },
      { title:"Define brows", category:"Eyebrows", detail:"Fill sparse spots with light, hair-like strokes, then brush through." },
      { title:"Lift the lashes", category:"Mascara", detail:"One coat of mascara on top lashes only for an awake, natural look." },
      { title:"Tint the lips", category:"Lipstick", detail:"Dab on a hydrating tinted balm for a healthy lip flush." }
    ]
  },
  "office-professional": {
    name: "Office / Professional Look",
    icon: "shield",
    summary: "Polished and long-lasting for work — neutral tones, nothing too bold, around 15 minutes.",
    steps: [
      { title:"Prep & prime", category:"Primer", detail:"Apply primer to extend wear through a long workday." },
      { title:"Base coverage", category:"Foundation", detail:"Medium coverage foundation for a polished, even complexion on camera and in person." },
      { title:"Conceal", category:"Concealer", detail:"Conceal under-eyes and blemishes, set with a light dusting of powder." },
      { title:"Soft contour", category:"Bronzer", detail:"A light sweep of bronzer along cheekbones and jaw for subtle definition." },
      { title:"Neutral eyes", category:"Eyeshadow", detail:"Use a matte neutral shade across the lid and a slightly deeper shade in the crease." },
      { title:"Sharp liner", category:"Eyeliner", detail:"A thin line along the upper lash line for definition without drama." },
      { title:"Mascara", category:"Mascara", detail:"Two coats on top and bottom lashes for an alert, professional look." },
      { title:"Groomed brows", category:"Eyebrows", detail:"Set brows with tinted gel for a clean, structured finish." },
      { title:"Lip color", category:"Lipstick", detail:"A muted matte nude or rose shade — long-wearing for meetings." },
      { title:"Lock it in", category:"Setting Spray", detail:"Finish with setting spray so makeup survives the whole workday." }
    ]
  },
  "glam-evening": {
    name: "Glam Evening Look",
    icon: "sparkles",
    summary: "Bold, photo-ready glam for parties and events — full coverage and statement eyes/lips, 25-30 minutes.",
    steps: [
      { title:"Prime for longevity", category:"Primer", detail:"Mattifying or hydrating primer depending on skin type, to ensure all-night wear." },
      { title:"Full coverage base", category:"Foundation", detail:"Build coverage with a full-coverage foundation, layering only where needed." },
      { title:"Conceal & brighten", category:"Concealer", detail:"Conceal and highlight under the eyes and down the nose for a lifted look." },
      { title:"Set & bake", category:"Powder", detail:"Set generously, especially under the eyes, for a long-wear matte base." },
      { title:"Contour & bronze", category:"Bronzer", detail:"Sculpt cheekbones, temples, and jawline with bronzer for definition." },
      { title:"Blush", category:"Blush", detail:"Apply blush high on the cheekbones to lift the face under flash photography." },
      { title:"Highlight", category:"Highlighter", detail:"Liquid highlighter on the highest points of the face for a luminous finish." },
      { title:"Statement eyes", category:"Eyeshadow", detail:"Blend a deeper shimmer shade into the crease and lid for dramatic dimension." },
      { title:"Winged liner", category:"Eyeliner", detail:"Liquid liner for a sharp, precise wing." },
      { title:"Volume lashes", category:"Mascara", detail:"Several coats, or false lashes, for maximum volume." },
      { title:"Bold lip", category:"Lip Liner", detail:"Line lips first to prevent bleeding, then fill with a bold matte lipstick." },
      { title:"Lock it in", category:"Setting Spray", detail:"A generous mist of setting spray to make the whole look last all night." }
    ]
  },
  "no-makeup-makeup": {
    name: "No-Makeup Makeup Look",
    icon: "leaf",
    summary: "Barely-there enhancement that looks like skin, just better — under 8 minutes.",
    steps: [
      { title:"Hydrate first", category:"Primer", detail:"Hydrating primer so the minimal base looks dewy, not flat." },
      { title:"Skip or sheer base", category:"Foundation", detail:"Use only a tinted, sheer foundation or skip entirely if skin is clear." },
      { title:"Spot conceal", category:"Concealer", detail:"Only where truly needed — under eyes or one or two spots." },
      { title:"Flush of color", category:"Blush", detail:"Cream blush blended with fingers for a just-pinched-cheeks effect." },
      { title:"Groom brows", category:"Eyebrows", detail:"Brush brows up and set with clear or tinted gel — no heavy filling." },
      { title:"One coat mascara", category:"Mascara", detail:"A single coat to open up the eyes without looking done-up." },
      { title:"Lip balm tint", category:"Lipstick", detail:"A barely-there tinted balm for healthy-looking lips." }
    ]
  }
};
