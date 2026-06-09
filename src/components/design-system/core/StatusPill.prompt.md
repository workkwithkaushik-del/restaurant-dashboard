A status pill — the brand's single most-used label affordance. Rounded full, soft tinted bg, saturated fg of the same hue. Always sentence case, single word or two ("Healthy", "At Risk", "Delayed", "Active Stream"). Use `tone` for semantic mapping; never invent custom colours per row.

```jsx
import { StatusPill } from "components/core/StatusPill";

<StatusPill tone="success">Healthy</StatusPill>
<StatusPill tone="warning">Watch</StatusPill>
<StatusPill tone="danger">At Risk</StatusPill>
```

Tones: `success | warning | danger | info | neutral`.
