# UXscape Dashboard Design System

A practical design system for **multi-outlet operations dashboards** — the kind of dense, real-time control panels used by restaurant chains, retail operators, and field-ops teams to monitor revenue, inventory, staff, and customer sentiment across multiple locations from one screen.

The system is extracted from the **Restaurant Chain Dashboard** (codename *AromaLabs*), a Vite + React app that presents four role-scoped views (Regional Manager, Restaurant Manager, Head Chef, Strategy) of the same underlying multi-outlet data. Read more in `restaurant_dashboard_ui_kit/README.md`.

## Sources

- **Codebase** — `restaurant dashboard/` (mounted locally; private). Stack: Vite, React 18, react-router 7, @tanstack/react-query, recharts, lucide-react, sonner. Brand strings inside the app refer to it as both *Restaurant Chain Dashboard* (the title) and *AromaLabs* (used in mock content like `#AromaLabsVibe`).
- **No Figma** was attached. All foundations come from the codebase's `src/index.css` (~2,400 lines) and the inline `style={…}` props in `App.jsx`.

## What this product does

A single React app that delivers four scoped views of the same underlying multi-outlet data:

| Role | Brief (verbatim from the codebase) |
|---|---|
| Regional Manager | Track outlet health, revenue, alerts, and live service risk from one screen. |
| Restaurant Manager | Run the floor with stock, orders, staff load, and customer issues in one place. |
| Head Chef | Monitor tickets, prep speed, station load, and food quality without digging through reports. |
| Strategy | Spot campaign opportunities, pricing signals, and expansion patterns across outlets. |

Each role sees the same chrome — sidebar, hero band, navigation bar with date / outlet / time-range filters, command bar, six possible tab views (Overview, Menu, Orders, Inventory, Staff, Feedback) — but a different *metric row* and a different mix of panels below.

## Content Fundamentals

The voice is **operational, terse, and slightly formal** — built for someone scanning a wall of numbers, not reading a marketing page. Tone is informative, not aspirational.

- **Case** — Titles use *Sentence case* ("Revenue and order trend", "Day-part contribution", "Outlet health"), never Title Case. Eyebrows above titles are **ALL CAPS** with `0.08em` tracking ("PERFORMANCE", "DEMAND MIX", "LEAKAGE ANALYSIS"). Button labels are sentence case ("Export report", "Inspect", "Open orders").
- **Person** — Mostly impersonal / third-person ("Track outlet health…", "Spot campaign opportunities…"). Occasionally direct second-person when guiding ("You're viewing live data for a specific outlet"). Never first-person.
- **Numbers** — Currency uses ₹ with `en-IN` grouping (`₹1,23,400`). Percentages always with the `%` sign and no space. Deltas are signed (`+13.4%`, `-12%`). Time is short (`11 min`, `18 min`, `42s ago`). NPS is a bare integer with the word "NPS" beside it (`68 NPS`).
- **Status copy** — Single words or short verbs in pill chips: *Healthy / Watch / At Risk / Preparing / Ready / Cooking / Delayed / Critical*. Microcopy beneath uses sentences ("Final daily total", "All resolved").
- **Eyebrows** are *thematic categories*, not the metric name. The metric name is the `<h2>`. Example: eyebrow "PERFORMANCE", h2 "Revenue and order trend".
- **Emoji** — Used sparingly and only for **success confirmation** (`✓ Dashboard configured correctly`). Never decorative. Never in headings. The unicode star `★` / `☆` is used inline for ratings.
- **Hashtags** — Used inside the feedback ticker as auto-detected tags: `#ColdFood`, `#QualityRisk`, `#Praise`, `#Standard`. The marketing brand voice that *creates* hashtags reads more casual (`#AromaLabsVibe`).
- **Search placeholder** is *demonstrative*, telling the user what they can search rather than what to type: *"Try: low stock at Lake Road, delayed orders, chef score"*.
- **Empty / guidance copy** is direct and step-numbered. The setup banner literally says "Step 1: …", "Step 2: …" with an arrow and a "Then…" tail.

The result reads less like a SaaS product and more like a **calm operations tool** — short labels, dense numbers, status pills doing the work that long sentences would in a marketing site.

## Visual Foundations

**Mood.** Warm, organic, slightly under-saturated. The page itself sits on a **green/amber two-stop wash** (`var(--workspace-bg)`) — not white, not gray, not blue. Cards are white-on-wash with a very soft long shadow. Sidebars are nearly black (`#101916`). The combined effect is closer to a *kitchen countertop* than a typical dashboard.

**Palette.**
- One neutral spine: ink `#14211c` → muted `#68766f` → line `#dce5de` → wash `#f4f7f1`. Greenish, never blue-gray.
- One primary accent: **deep forest green** `#08785d`. Used for live indicators, success states, primary CTAs in soft variant, link buttons, sliders, range-switch active.
- Four supporting accents — each as a saturated value + a soft tint pair: `green / amber / coral / blue / purple`. They appear as: metric-card left stripes, status pills, summary-card subtle gradient overlays, and chart bar fills.
- The **brand mark** (logo tile) uses a separate amber-yellow gradient `#ffe08a → #f0a72f` over near-black — the *only* gradient that's strongly chromatic; everything else is restrained.

**Type.** Inter at heavy weights. Display (`h1`) goes up to 48px at `font-weight: 900`. Panel headings (`h2`) are 19px at `850`. Numeric metrics use `clamp(24px, 3vw, 34px)` at `800`. Eyebrows are 11px / `800` / uppercase / `0.08em` tracking and coloured `var(--green)`. Body sits at 13–15px. No serif. No mono outside numeric value displays inside the commodity sliders (where mono gives the readout a "terminal" feel).

**Spacing.** Not strictly 4px. Common stops are `4 / 6 / 8 / 10 / 12 / 14 / 16 / 18 / 22 / 26`. Card padding is **18px** for metric / summary cards, **20px** for panels. Workspace gutter is **26px**. Most internal gaps are **12px**.

**Backgrounds.** No imagery, no hand illustration, no repeating patterns. The brand's "background system" is:
1. The body's two-axis subtle radial-ish gradient (green NW, amber SE) over the wash.
2. The hero card's diagonal three-stop gradient (white → pale green → pale amber) inside a green-tinted border.
3. The sidebar's flat near-black (no gradient).
4. Summary cards add a *barely-there* tinted diagonal overlay (`linear-gradient(135deg, rgba(accent, 0.1-0.16), transparent 54%)`) — never strong enough to compete with the value text on top.

**Borders.** Always **1px solid `var(--line)`** for separations and card outlines. Hero cards use a **green-tinted border** (`rgba(8, 120, 93, 0.18)`) to signal the live/active zone. Critical warning cards switch to **1.5px** `#ef4444`. Sidebar borders use `#2a3d35`.

**Corner radii.** 6 / 8 / 10 / 12 / 16 / 999 (pill). Default is **8px** for cards, panels, buttons, inputs, range switches. Modal is 16px. Status badges/pills are 999px. Metric stripes are 4–5px wide bars *inset to the card edge*, not corners.

**Shadows.** Three roles, all warm (green-tinted black, not pure black):
- `0 22px 60px rgba(20, 33, 28, 0.09)` — card / panel default. Wide, soft, low-opacity.
- `0 14px 36px rgba(20, 33, 28, 0.06)` — secondary surfaces (nav bar, command bar).
- `0 18px 38px rgba(20, 33, 28, 0.24)` — dark popovers (tooltips). These tooltips are themed differently from cards: black background, white text, green eyebrow.
- `0 14px 28px rgba(20, 33, 28, 0.18)` — primary buttons (dark on light, with a lifted feel).
- Inner shadows are not used.

**Hover & press.**
- Buttons & nav items: background tints darker, no scale change.
- Chart bars: `translateY(-8px)` + `saturate(1.12)` + a tooltip pop. The brand likes a small lift on interactive chart elements.
- Sidebar nav: hover swaps bg from transparent to `#1a2a25`; active state adds a border (`#3a5a4c`) on top of the hover bg.
- Cards: feedback-ticker cards lift `translateY(-1px)` and brighten the border.
- No "press" shrink. No ripples.

**Animation.**
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` for layout (sidebar collapse) — Material-style smooth ease.
- Speed: 120–300ms. Hover transitions live around 160–200ms.
- The system has **two specific decorative animations** worth knowing:
  - `orange-pulse` (1.8s ease-in-out) on the KDS "active station" segment — soft amber breathing background.
  - `crimson-pulse` (2s ease-in-out) on escalated/SLA-breaching orders — a fading red box-shadow ring around the card.
  - `guideSlideIn` (`0.4s`) when banners appear.
- No bounces, no parallax, no scroll-tied effects.

**Transparency & blur.**
- Modal overlay: `rgba(20, 33, 28, 0.4)` + `backdrop-filter: blur(8px)`.
- Sidebar mobile overlay: `rgba(0,0,0,0.5)` + `blur(4px)`.
- The hero status pill, navigation bar, and command bar use a *translucent white* (`rgba(255, 255, 255, 0.74)`) so the body wash glows through faintly.
- Otherwise opaque.

**Imagery vibe.** None in the product. If you add any, they should be **warm, natural-light, slightly-grainy food photography** — never bluish-tech, never illustrated, never iconographic.

**Cards.** A "card" in this system means: white bg, 1px solid `var(--line)` border, 8px radius, default card shadow, 18–20px padding. Metric cards get a **4–5px coloured stripe inset to the left edge** as their only visual variant (`green / blue / amber / coral / purple`). Summary cards add a soft diagonal tint overlay matching the accent.

**Layout rules.**
- The sidebar is **sticky**, full-height, never scrolls with the page. Default 260px, collapses to 72px.
- The workspace uses a 3-column dashboard grid `1.15fr 0.7fr 0.85fr` on wide screens, collapsing to two then one column at 1180px and 900px.
- Hero is always full-width, always first.
- The navigation bar and command bar sit directly below the hero, before any content.
- Metric row spans full width and always shows 4 metrics.
- Modal sits centred, 400–640px wide, never edge-bleeds.

## Iconography

The product uses **[lucide-react](https://lucide.dev)** exclusively. Stroke icons at **18–20px**, default stroke weight. No filled icons. No emoji as functional icons (only `✓` for confirmation status, plus the unicode star `★` / `☆` for ratings).

In this design system we re-link Lucide via its CDN so consumers don't need npm. See `assets/icons/README.md`. Icons used in the source codebase that you'll see in components and the UI kit:

`Moon, Sun, PanelLeftClose, PanelLeft, LayoutDashboard, UtensilsCrossed, ShoppingCart, Package, Users, MessageSquare, MapPin, ChefHat, TrendingUp, Building2, Menu, Bell, Settings, HelpCircle, Info, X, CalendarDays, Store, ArrowRight, ShieldAlert, Search, Download, Filter, MoreHorizontal`.

**Custom logo mark.** The product's brand mark is a rounded-square tile (40×40, 8px radius) with the *amber-yellow gradient* (`#ffe08a → #f0a72f`), holding the two-letter wordmark (default `RC`) in `font-weight: 900` near-black. The tile has its own warm glow shadow `0 12px 30px rgba(240, 167, 47, 0.28)`. See `assets/brand/`.

---

## Index

```
styles.css                    ← consumer entry (CSS @imports below)
tokens/
  colors.css                  ← :root + [data-theme="dark"], 110+ tokens
  typography.css              ← font stacks, weights, sizes, semantic roles
  spacing.css                 ← spacing scale, radii, shadows, motion
  fonts.css                   ← Inter via Google Fonts
  base.css                    ← html/body reset + h1/h2 defaults
guidelines/                   ← foundation @dsCard specimens
components/
  core/                       ← Button, IconButton, Badge, StatusPill, Avatar, EyeBrow
  data/                       ← MetricCard, SummaryCard, OutletRow, MiniMeter
  forms/                      ← FieldSelect, RangeSwitch, ViewTabs, CommandInput
  feedback/                   ← Modal, UsageGuideBanner, WarningBanner, FeedbackCard
  navigation/                 ← Sidebar, SidebarItem, Hero, BrandMark
assets/
  brand/                      ← logo mark, favicon
  icons/                      ← Lucide CDN reference
restaurant_dashboard_ui_kit/  ← interactive UI kit recreation
SKILL.md                      ← Agent-compatible skill manifest
```

Open the **Design System** tab to see the foundation specimens. Open `restaurant_dashboard_ui_kit/index.html` to see the assembled product.
