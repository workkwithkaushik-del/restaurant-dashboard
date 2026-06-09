// RegionalOverview — the dashboard's marquee screen.
function RegionalOverview({ selectedOutlet, onInspect }) {
  const ns = window.UXscapeDashboardDesignSystem_6e71f2;
  const {
    MetricCard,
    SummaryCard,
    Panel,
    StatusPill,
    Button,
  } = ns;
  const { outlets, weeklyTrend, dayParts, reviews, fmtINR } = window.kitData;

  const scoped =
    selectedOutlet === "all"
      ? outlets
      : outlets.filter((o) => o.id === selectedOutlet);
  const totals = scoped.reduce(
    (a, o) => ({
      sales: a.sales + o.sales,
      orders: a.orders + o.orders,
    }),
    { sales: 0, orders: 0 }
  );
  const avgNps = Math.round(scoped.reduce((s, o) => s + o.nps, 0) / scoped.length);
  const avgRating = (scoped.reduce((s, o) => s + o.rating, 0) / scoped.length).toFixed(1);
  const avgStock = Math.round(scoped.reduce((s, o) => s + o.stockHealth, 0) / scoped.length);

  return (
    <React.Fragment>
      {/* metric row */}
      <section
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <MetricCard label="Net sales" value={fmtINR(totals.sales)} change="+13.4% vs last week" accent="green" />
        <MetricCard label="Orders" value={totals.orders.toLocaleString("en-IN")} change="268 delivery orders" accent="blue" />
        <MetricCard label="Live queue" value={58} change="tickets being prepared" accent="amber" />
        <MetricCard label="CX score" value={`${avgNps} NPS`} change={`${avgRating} avg rating`} accent="coral" />
        <MetricCard label="Stock health" value={`${avgStock}%`} change="1 alert open" accent="purple" />
      </section>

      {/* main 3-col grid */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.7fr) minmax(0, 0.85fr)",
          gap: 16,
        }}
      >
        <Panel
          eyebrow="Performance"
          title="Revenue and order trend"
          action={<StatusPill tone="success">Healthy trajectory</StatusPill>}
          style={{ gridColumn: "span 2", minHeight: 374 }}
        >
          <TrendChart points={weeklyTrend} />
          <div
            style={{
              borderTop: "1px solid var(--border-subtle)",
              marginTop: 10,
              paddingTop: 14,
              display: "flex",
              alignItems: "baseline",
              gap: 8,
            }}
          >
            <b style={{ fontSize: 20, fontWeight: 900 }}>
              {fmtINR(Math.round(totals.sales / 7))}
            </b>
            <span style={{ color: "var(--muted)", fontSize: 13 }}>
              average daily sales for selected scope
            </span>
          </div>
        </Panel>

        <Panel eyebrow="Demand mix" title="Day-part contribution" style={{ minHeight: 374 }}>
          <DonutChart
            slices={dayParts}
            centerLabel={totals.orders.toLocaleString("en-IN")}
            centerSub="orders"
          />
          <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
            {dayParts.map((d) => (
              <div
                key={d.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "10px 1fr auto",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <i
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: d.color,
                  }}
                />
                <span style={{ fontSize: 13, color: "var(--muted)" }}>{d.label}</span>
                <b style={{ fontSize: 13 }}>{d.value}%</b>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      {/* summary row */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 12,
        }}
      >
        <SummaryCard
          label="Sales"
          value={fmtINR(totals.sales)}
          detail={`${fmtINR(Math.round(totals.sales / 7))} avg daily`}
          tone="green"
        />
        <SummaryCard
          label="Fulfilled"
          value={(totals.orders - 58).toLocaleString("en-IN")}
          detail="95% of orders completed or closed"
          tone="blue"
        />
        <SummaryCard
          label="Unfulfilled"
          value={58}
          detail="2 delayed orders need attention"
          tone="amber"
        />
        <SummaryCard
          label="Est. P&L"
          value={fmtINR(Math.round(totals.sales * 0.26 - totals.sales * 0.032))}
          detail="26% margin after service leakage"
          tone="purple"
        />
      </section>

      {/* outlet health table */}
      <Panel
        eyebrow="Outlet health"
        title="Performance & Risk Monitor"
        action={<Button variant="link">Open orders →</Button>}
      >
        <OutletTable outlets={outlets} onInspect={onInspect} />
      </Panel>

      {/* leakage + feedback */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 16,
        }}
      >
        <Panel
          eyebrow="Leakage analysis"
          title="Aggregator channel conversion"
          action={<StatusPill tone="warning">9.2% drop-off</StatusPill>}
        >
          <FunnelBars
            stages={[
              { label: "Received",       count: 1000, fill: "var(--blue)"   },
              { label: "Accepted",       count: 920,  fill: "var(--green)"  },
              { label: "Kitchen cancel", count: 45,   fill: "var(--amber)"  },
              { label: "Logi drop-off",  count: 12,   fill: "var(--coral)"  },
            ]}
          />
        </Panel>

        <Panel
          eyebrow="Real-time reviews feed"
          title="Customer sentiment matrix"
          action={<StatusPill tone="info">Active stream</StatusPill>}
        >
          <ReviewTicker items={reviews} />
        </Panel>
      </section>
    </React.Fragment>
  );
}

function FunnelBars({ stages }) {
  const max = Math.max(...stages.map((s) => s.count));
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {stages.map((s) => (
        <div key={s.label} style={{ display: "grid", gap: 6 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "var(--muted)",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            <span>{s.label}</span>
            <b style={{ color: "var(--text-primary)" }}>
              {s.count.toLocaleString("en-IN")}
            </b>
          </div>
          <div
            style={{
              height: 18,
              borderRadius: 6,
              background: "#e8eee9",
              overflow: "hidden",
            }}
          >
            <i
              style={{
                display: "block",
                height: "100%",
                width: `${(s.count / max) * 100}%`,
                background: s.fill,
                borderRadius: "inherit",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

window.RegionalOverview = RegionalOverview;
