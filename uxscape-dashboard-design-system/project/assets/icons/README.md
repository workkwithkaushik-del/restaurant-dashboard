# Icons

The UXscape system uses [**Lucide**](https://lucide.dev) (`lucide-react` in React, `lucide` for vanilla web) at stroke weight 2, 18-20px, default rounded caps. Lucide is referenced via CDN here so consuming projects don't need to install the npm package.

## React usage (consumer projects)

```bash
npm install lucide-react
```

```jsx
import { Bell, ChefHat, Store } from "lucide-react";
<Bell size={18} />
```

## In design-system cards (no npm)

The `@dsCard` HTML files in this project use the `lucide` UMD build via CDN:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<i data-lucide="bell"></i>
<script>lucide.createIcons();</script>
```

## Canonical icon set used in the product

Sidebar / navigation: `LayoutDashboard, UtensilsCrossed, ShoppingCart, Package, Users, MessageSquare, MapPin, ChefHat, TrendingUp, Building2, Menu, Bell, Settings, HelpCircle, PanelLeftClose, PanelLeft`

Controls: `Moon, Sun, Search, Download, Filter, X, ArrowRight, MoreHorizontal, CalendarDays`

Status / messaging: `Info, ShieldAlert, Store`

Sizes:
- Sidebar nav items: **18px**
- Mobile hamburger / large controls: **20px**
- Inline microcopy (banner steps, badges): **14-16px**

Colour: always inherits from text colour (`currentColor`). Never tinted with an accent except inside an already-tinted container (a `StatusPill` will carry both bg + fg colour, so the icon inside picks up the fg automatically).
