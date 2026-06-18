/* ===========================================================
   DATABASE: Hair Types & Scalp Conditions
   washPerWeek: recommended number of washes per week (base)
   =========================================================== */
const DB_HAIR_TYPES = [
  { id:"straight", name:"Straight Hair", icon:"wind", washPerWeek:3, tip:"Oil travels down straight strands fast, so roots get greasy quicker than curly hair." },
  { id:"wavy", name:"Wavy Hair", icon:"wind", washPerWeek:3, tip:"Wash with lukewarm water and let waves air-dry or diffuse to keep natural texture." },
  { id:"curly", name:"Curly Hair", icon:"wind", washPerWeek:2, tip:"Curly hair is naturally drier — over-washing strips curls of needed oils, causing frizz." },
  { id:"coily", name:"Coily / Very Curly Hair", icon:"wind", washPerWeek:1, tip:"Co-wash between full washes and seal ends with oil to prevent breakage." },
  { id:"oily-scalp", name:"Oily Scalp", icon:"droplet", washPerWeek:4, tip:"An oily scalp needs more frequent washing regardless of strand texture — focus shampoo at the roots only." },
  { id:"dry-scalp", name:"Dry / Flaky Scalp", icon:"droplets", washPerWeek:2, tip:"Use a moisturizing, sulfate-free shampoo and avoid hot water which worsens flaking." },
  { id:"dandruff-prone", name:"Dandruff-Prone Scalp", icon:"circle-x", washPerWeek:3, tip:"Use an anti-dandruff shampoo with zinc pyrithione or ketoconazole 2-3x/week, alternate with a gentle shampoo." },
  { id:"color-treated", name:"Color-Treated / Chemically Processed", icon:"sparkles", washPerWeek:2, tip:"Wash less often with cool water and sulfate-free, color-safe shampoo to preserve color and strength." },
  { id:"fine-thin", name:"Fine / Thin Hair", icon:"wind", washPerWeek:3, tip:"Use lightweight, volumizing formulas — heavy conditioners can weigh fine hair down." },
  { id:"thick-coarse", name:"Thick / Coarse Hair", icon:"layers", washPerWeek:2, tip:"Focus conditioner on mid-lengths to ends; thick hair holds moisture longer at the roots." }
];
