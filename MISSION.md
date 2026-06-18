# Care Helper — Project Mission & Bug Report

## What This Project Is

**Care Helper** is a fully client-side beauty routine web app.  
No server, no account, no cloud — everything runs in the browser using `localStorage`.

Users complete a short quiz (name, gender, skin type, skin concerns, hair type, allergens/avoid list, preferences) and get a personalised:
- Weekly skincare table (AM + PM steps for every day)
- Do's and Don'ts tailored to their skin type and issues
- Hair wash schedule with product picks and a step-by-step wash-day guide
- Makeup tutorial matched to their preferred style (natural / office / glam / no-makeup)
- Bath & personal care product picks

All data is stored under two `localStorage` keys: `careHelperUsers` (multi-profile dictionary) and `careHelperCurrentUser`.

---

## File Structure

| File | Role |
|---|---|
| `home.html` | Landing page + quiz |
| `index.html` | Dashboard (personalised care plan output) |
| `products.html` | Full product library with category filter + search |
| `style.css` | Global design system (Light blue + white, dark-mode ready) |
| `icons.js` | Lucide-style inline SVG icon registry + `icon()` helper |
| `store.js` | localStorage read/write helpers |
| `nav.js` | Shared header rendering |
| `theme.js` | Dark/light toggle + loading screen |
| `quiz.js` | Multi-step quiz wizard (home.html only) |
| `home.js` | Home page extras: icon rendering, stats grid, welcome-back banner |
| `dashboard.js` | Dashboard rendering (reads plan from routine engine, fills index.html) |
| `routine-engine.js` | Pure rule-based plan builder — `buildFullPlan(profile)` |
| `db-skin-types.js` | 5 skin types with do/don't lists |
| `db-skin-issues.js` | 8 skin concerns with tips |
| `db-unsuitable-items.js` | 20 allergen / avoid items |
| `db-skin-products.js` | 23 skincare products |
| `db-hair-types.js` | 10 hair/scalp types |
| `db-hair-products.js` | 14 hair care products |
| `db-bath-products.js` | 13 bath & body products |
| `db-personal-care.js` | 12 personal care products |
| `db-makeup-products.js` | 27 makeup products |
| `db-makeup-tutorials.js` | 4 makeup tutorials (everyday-natural, office-professional, glam-evening, no-makeup-makeup) |
| `db-preferences.js` | 10 preference options (product style, routine pace, makeup style) |

---

## Bugs Found & Fixed

### BUG 1 — `dashboard.html` does not exist (CRITICAL — app completely broken)

**Root cause:** The project has three HTML files: `home.html`, `index.html`, and `products.html`.  
`index.html` is the dashboard (it has `data-page="dashboard"` and loads `dashboard.js`).  
No `dashboard.html` file was ever created, but **six places** in the codebase link to it.

**Broken references:**

| File | Line/Context | Wrong | Correct |
|---|---|---|---|
| `quiz.js` | `qSubmit()` redirect | `dashboard.html` | `index.html` |
| `nav.js` | "My Routine" nav link | `dashboard.html` | `index.html` |
| `home.js` | "View My Plan" button | `dashboard.html` | `index.html` |
| `index.html` | Footer "My Routine" link | `dashboard.html` | `index.html` |

**Fix:** Changed all four occurrences to `index.html`.

---

### BUG 2 — Nav "Home" links to `index.html` instead of `home.html` (navigation broken)

**Root cause:** `nav.js` hard-codes `href: "index.html"` for the "Home" nav item.  
`index.html` is the dashboard, not the home page. The home/quiz page is `home.html`.  
This means clicking "Home" in the nav bar lands on the dashboard (or redirects to quiz if no profile exists), never on the actual landing page.

Additionally, `index.html`'s own brand logo and footer "Home" links point to `index.html` (itself) instead of `home.html`.

**Fix:** 
- `nav.js` "Home" href → `home.html`
- `index.html` brand `href` → `home.html`
- `index.html` footer "Home" → `home.html`
- `index.html` footer "Edit my answers" → `home.html?edit=true` (was `index.html?edit=true` which has no quiz)

---

### BUG 3 — Missing icon `brush-cleaning` in `icons.js` (silent fallback to `sparkle`)

**Root cause:** `db-personal-care.js` uses `icon:"brush-cleaning"` for `pc12` (Facial Cleansing Brush).  
`icons.js` has no `"brush-cleaning"` key. The `icon()` helper falls back silently to `"sparkle"`.  
The icon rendered is meaningless for a cleansing brush tool.

**Fix:** Added a `"brush-cleaning"` SVG entry to `icons.js` (a circular brush / cleaning wand icon).

---

## Design System Notes

- **Primary colour:** `#6699FB` (light blue) / dark-mode: `#89B4FF`
- **Font:** Inter (Google Fonts, 300/400/600/700)
- **Sections alternate:** `section--light` (white) / `section--parchment` (#F5F5FF) / `section--dark` (navy)
- **Cards:** subtle shadow, `var(--r-md)` radius, `var(--surface-card)` background
- **Chips:** pill-shaped toggle buttons for quiz answers
- **Routine table:** `<table class="routine-table">` with AM/PM columns, active-step highlighting

---

## How The Routine Engine Works

`buildFullPlan(profile)` calls four sub-builders:

1. **`buildSkinCarePlan`** — picks cleanser, moisturiser, sunscreen, AM serum, PM serum, optional eye cream, weekly active treatment (spot/retinol/AHA), optional mask. Builds a 7-day `week[]` array with `{ am: [...steps], pm: [...steps] }` per day.

2. **`buildHairPlan`** — picks shampoo, conditioner, hair oil, leave-in, heat protectant (skipped if user listed heat-styling as unsuitable). Returns wash frequency and wash-day step list.

3. **`buildMakeupPlan`** — finds the user's makeup-style preference, looks up the matching tutorial in `DB_MAKEUP_TUTORIALS`, and attaches a product recommendation to each tutorial step.

4. **`buildBathAndCarePlan`** — picks body wash, lotion, scrub, deodorant from `DB_BATH_PRODUCTS`; filters `DB_PERSONAL_CARE` for suitable items.

Product selection uses `pickProduct()` which filters by category + skin type + allergen tags, then applies an optional `prefer` predicate for smarter matching (e.g. Vitamin C serum for pigmentation/dullness concerns).
