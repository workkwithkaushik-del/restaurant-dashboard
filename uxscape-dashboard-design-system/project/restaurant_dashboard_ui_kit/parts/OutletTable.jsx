// OutletTable — the brand's outlet health & risk monitor row list.
function OutletTable({ outlets, onInspect }) {
  const ns = window.UXscapeDashboardDesignSystem_6e71f2;
  const { StatusPill, Button } = ns;
  const { fmtINR } = window.kitData;

  const health = (o) => {
    let s = 0;
    if (o.stockHealth >= 80) s += 2; else if (o.stockHealth >= 65) s += 1;
    if (o.margin >= 26) s += 2; else if (o.margin >= 22) s += 1;
    if (o.nps >= 65) s += 2; else if (o.nps >= 55) s += 1;
    if (o.growth >= 15) s += 2; else if (o.growth >= 8) s += 1;
    if (s >= 7) return { tone: "success", label: "Healthy" };
    if (s >= 4) return { tone: "warning", label: "Watch" };
    return { tone: "danger", label: "At Risk" };
  };

  return (
    <div style={{ display: "grid" }}>
      {[...outlets]
        .sort((a, b) => b.sales - a.sales)
        .map((o, i) => {
          const h = health(o);
          return (
            <div
              key={o.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "14px 0",
                borderBottom:
                  i === outlets.length - 1 ? "0" : "1px solid var(--border-subtle)",
              }}
            >
              <strong
                style={{
                  width: 34,
                  height: 34,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 8,
                  background: "var(--green-soft)",
                  color: "var(--green)",
                  fontSize: 14,
                  fontWeight: 900,
                }}
              >
                {i + 1}
              </strong>
              <div style={{ flex: 2, minWidth: 160 }}>
                <b style={{ display: "block", fontSize: 14 }}>{o.name}</b>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>
                  {o.area} · {o.manager}
                </span>
              </div>
              <StatusPill tone={h.tone} style={{ minWidth: 72, textAlign: "center", justifyContent: "center" }}>
                {h.label}
              </StatusPill>
              <div style={{ flex: 1, textAlign: "right" }}>
                <b style={{ display: "block" }}>{fmtINR(o.sales)}</b>
                <span style={{ fontSize: 12, color: "var(--green)" }}>
                  +{o.growth}% growth
                </span>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <b style={{ display: "block" }}>{o.margin}%</b>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>Margin</span>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <b style={{ display: "block" }}>{o.nps} NPS</b>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>
                  {o.rating}★ rating
                </span>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <b
                  style={{
                    display: "block",
                    color:
                      o.stockHealth < 70
                        ? "var(--coral)"
                        : o.stockHealth < 80
                        ? "var(--amber)"
                        : "var(--green)",
                  }}
                >
                  {o.stockHealth}%
                </b>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>
                  Stock health
                </span>
              </div>
              <Button variant="mini" onClick={() => onInspect(o)}>
                Inspect
              </Button>
            </div>
          );
        })}
    </div>
  );
}

window.OutletTable = OutletTable;
