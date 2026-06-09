A square icon-only button used for sidebar toggles, modal close, and dense toolbar utilities — always 32–40px with a 1px border and a Lucide icon centred. Reach for this instead of `Button` whenever the affordance is purely an icon.

```jsx
import { IconButton } from "components/core/IconButton";
import { X } from "lucide-react";

<IconButton aria-label="Close" onClick={onClose}>
  <X size={16} />
</IconButton>
```

Variants:
- `tone="default"` — line border, ink icon on white. Use for utility buttons in light surfaces.
- `tone="dark"` — sidebar / dark-surface variant: line `#2a3d35` border, muted icon, hover fills with the active row colour.
- `size="sm" | "md"` — 32px or 40px square.
