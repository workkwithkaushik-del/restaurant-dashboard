// ChefOverview — Head Chef variant. Same chrome, different metric row
// and a kitchen-load focused panel beneath.
function ChefOverview() {
  const ns = window.UXscapeDashboardDesignSystem_6e71f2;
  const { MetricCard, Panel, StatusPill, MiniMeter } = ns;
  const { weeklyTrend, fmtINR } = window.kitData;

  const chefs = [
    { name: "Aarav Mehta", role: "Head Chef",   outlet: "Central Square", station: "Hot line", score: 96, prep: 15, quality: 4.9, tickets: 42, load: 78 },
    { name: "Riya Nair",   role: "Sous Chef",   outlet: "Lake Road",     station: "Grill",    score: 88, prep: 19, quality: 4.6, tickets: 38, load: 86 },
    { name: "Kabir Sethi", role: "Line Chef",   outlet: "Campus Gate",   station: "Fryer",    score: 91, prep: 16, quality: 4.8, tickets: 34, load: 72 },
    { name: "Nisha Rao",   role: "Pastry Lead", outlet: "Central Square", station: "Dessert",  score: 84, prep: 22, quality: 4.5, tickets: 29, load: 69 },
  ];

  return (
    <React.Fragment>
      <section style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <MetricCard label="Net sales"    value={fmtINR(599000)} change="+13.4% vs last week" accent="green" />
        <MetricCard label="Orders"        value="1,096" change="268 delivery orders" accent="blue" />
        <MetricCard label="Live queue"    value="58" change="tickets being prepared" accent="amber" />
        <MetricCard label="CX score"      value="64 NPS" change="4.6 avg rating" accent="coral" />
        <MetricCard label="Avg. prep"     value="18 min" change="target 18 min" accent="purple" />
      </section>

      <Panel
        eyebrow="Performance"
        title="Revenue and order trend"
        action={<StatusPill tone="success">Healthy trajectory</StatusPill>}
      >
        <TrendChart points={weeklyTrend} />
      </Panel>

      <Panel eyebrow="Kitchen" title="Chef performance & station load">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          {chefs.map((c) => (
            <div
              key={c.name}
              style={{
                minHeight: 236,
                padding: 18,
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                background: "var(--surface-card)",
                boxShadow: "var(--shadow-card)",
                display: "grid",
                gap: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div style={{ display: "grid", gap: 4 }}>
                  <b style={{ fontSize: 15 }}>{c.name}</b>
                  <span style={{ color: "var(--muted)", fontSize: 12 }}>{c.role}</span>
                  <span style={{ color: "var(--muted)", fontSize: 12 }}>{c.outlet} · {c.station}</span>
                </div>
                <b
                  style={{
                    width: 42,
                    height: 42,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 8,
                    background: "var(--green-soft)",
                    color: "var(--green)",
                    fontSize: 16,
                    fontWeight: 900,
                  }}
                >
                  {c.score}
                </b>
              </div>
              <p style={{ color: "var(--green)", fontWeight: 850, margin: 0, fontSize: 13 }}>
                {c.quality}★ quality · {c.prep} min avg prep
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                <MiniMeter value={c.load} label="Station load" suffix={`${c.load}%`} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "var(--muted)",
                    fontSize: 12,
                  }}
                >
                  <span>Tickets today</span>
                  <b style={{ color: "var(--text-primary)" }}>{c.tickets}</b>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </React.Fragment>
  );
}

window.ChefOverview = ChefOverview;
