# Restaurant Chain Dashboard — UI Kit

A high-fidelity, interactive recreation of the *Regional Manager Overview* screen of the source codebase. Demonstrates how to compose the UXscape primitives into a real product surface.

- Sidebar with role switch + view nav + profile card
- Hero band with eyebrow + h1 + live status capsule
- Setup banner (warning → success on outlet selection)
- Filter bar (date input, outlet select, range switch)
- Command bar (signature green-label search + export action)
- 4 KPI metric cards
- Revenue + order trend chart panel (interactive bars with tooltips)
- Day-part contribution donut + legend
- Outlet health & risk monitor table with `StatusPill` health
- Day-part chart, summary cards, "Inspect" modal

Open `index.html` to interact. The kit reads tokens from `../styles.css` and components from `../_ds_bundle.js`.

## Files

- `index.html` — shell that mounts every piece below.
- `app.jsx` — top-level state + role switching + screen composition.
- `screens/RegionalOverview.jsx` — the regional manager overview.
- `screens/ChefOverview.jsx` — the head-chef overview variant (same chrome, different metric row + panels).
- `parts/Sidebar.jsx`, `parts/TrendChart.jsx`, `parts/DonutChart.jsx`, `parts/OutletTable.jsx`, `parts/SummaryRow.jsx`, `parts/Icon.jsx` — composed pieces.
- `data.js` — the mock data, copied & trimmed from `restaurant dashboard/src/data/mockData.js`.

The kit is illustrative — search and filter inputs are stubs that don't really filter data, but every visual state of the screen is real.
