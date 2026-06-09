---
name: uxscape-dashboard-design
description: Use this skill to generate well-branded interfaces and assets for the UXscape Dashboard Design System — a multi-outlet operations dashboard system (sample product: Restaurant Chain Dashboard). Either for production or throwaway prototypes / mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping ops dashboards, KPI surfaces, charts, status pills, banners, and dark-rail sidebars.
user-invocable: true
---

# UXscape Dashboard Design System Skill

Read `readme.md` at the root of this skill — it has the full **Visual Foundations** and **Content Fundamentals** sections, plus an index pointing to tokens, components, and the UI kit.

## When invoked

If creating visual artifacts (slides, mocks, throwaway prototypes, marketing pages), copy `styles.css` and `tokens/` out and build static HTML files for the user to view. Reference `assets/brand/mark.svg` for the logo. Lucide icons are available via the CDN URLs already used inside `guidelines/brand-iconography.html`.

If working on production code, copy the `components/` files into the consumer codebase and read each component's `.prompt.md` (when present) and `.d.ts` for the props contract. The token file is just CSS — drop `styles.css` into the consumer's global stylesheet entry.

If the user invokes this skill with no other guidance, ask them what they want to build or design, ask follow-up questions (audience, fidelity, single screen vs. flow, light/dark), then act as an expert designer who outputs HTML artifacts *or* production code, depending on their need.

## Hard rules

- **Background:** never use a flat white page background. The brand's surface is `var(--workspace-bg)` (green NW + amber SE wash). Cards sit on top of that.
- **Sidebar:** always dark (`var(--sidebar-bg)` = `#101916`) — even in light mode. Sidebar text and icons use the dedicated `--sidebar-*` tokens, *not* the page text tokens.
- **Buttons:** primary is `var(--ink)` filled (dark on light). Secondary is `var(--green-soft)` filled with green text. Don't use a "blue" primary.
- **Status pills:** always use a soft+saturated semantic pair from `--status-*`. Never invent a fresh hue per row.
- **Eyebrows:** every panel heading uses an uppercase `--text-success` (green) eyebrow *above* the h2. The eyebrow is the *category* ("PERFORMANCE"); the h2 is the *thing being shown* ("Revenue and order trend").
- **Numeric format:** currency is `₹` + `en-IN` grouping (`₹1,23,400`). Deltas signed. NPS is a bare integer + the word `NPS`.
- **Icons:** Lucide only, 18-20px, stroke only, `currentColor` fill. Never use emoji as a functional icon (only `✓` for confirmation states).
- **Imagery:** the source product uses no imagery. If you must add any, use warm natural-light food photography, never blue-tech, never illustrated.

## Quick wins

- New dashboard surface? Start by copy-pasting the structure from `restaurant_dashboard_ui_kit/index.html` — hero, banner, filter bar, command bar, metric row, content grid. Then swap the screen body.
- KPI tile? Use `MetricCard` with an `accent` (`green / blue / amber / coral / purple`).
- Rolled-up KPI with subtle tint? Use `SummaryCard`.
- Health label? `StatusPill tone="success|warning|danger|info|neutral"`.
- Section header inside a panel? Eyebrow above h2 — both are available via `<Panel eyebrow="..." title="...">`.
