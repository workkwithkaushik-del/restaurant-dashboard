// Top-level UI kit app — wires Sidebar + Hero + filters + the active
// role's overview screen, plus a global Inspect modal.
function App() {
  const ns = window.UXscapeDashboardDesignSystem_6e71f2;
  const {
    Hero,
    LiveDot,
    FieldSelect,
    RangeSwitch,
    ViewTabs,
    CommandInput,
    Button,
    UsageGuideBanner,
    GuideStep,
    Modal,
    StatusPill,
  } = ns;
  const { roles, views, outlets, fmtINR } = window.kitData;

  const [role, setRole] = React.useState("regional");
  const [view, setView] = React.useState("overview");
  const [date, setDate] = React.useState(() => new Date().toISOString().slice(0, 10));
  const [outlet, setOutlet] = React.useState("all");
  const [range, setRange] = React.useState("Today");
  const [search, setSearch] = React.useState("");
  const [exportOpen, setExportOpen] = React.useState(false);
  const [inspectOutlet, setInspectOutlet] = React.useState(null);
  const [bannerDismissed, setBannerDismissed] = React.useState(false);

  const activeRole = roles.find((r) => r.id === role);
  const today = new Date().toISOString().slice(0, 10);
  const isToday = date === today;
  const isSpecificOutlet = outlet !== "all";
  const allSet = isToday && isSpecificOutlet;
  const outletLabel =
    outlet === "all"
      ? "All outlets"
      : outlets.find((o) => o.id === outlet)?.name;

  const overview =
    role === "chef"
      ? <ChefOverview />
      : <RegionalOverview selectedOutlet={outlet} onInspect={setInspectOutlet} />;

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "260px minmax(0, 1fr)",
      }}
    >
      <KitSidebar role={role} view={view} onRole={setRole} onView={setView} />

      <section
        style={{
          padding: 26,
          display: "grid",
          alignContent: "start",
          gap: 16,
          minWidth: 0,
        }}
      >
        <Hero
          eyebrow={`Today, ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`}
          title={`${activeRole.label} Dashboard`}
          status={
            <React.Fragment>
              <LiveDot />
              <div style={{ display: "grid", gap: 3 }}>
                <b style={{ fontSize: 14 }}>{outletLabel}</b>
                <span style={{ color: "var(--muted)", fontSize: 12 }}>
                  {range} view · live sync on
                </span>
              </div>
            </React.Fragment>
          }
        >
          {activeRole.brief}
        </Hero>

        {!bannerDismissed && (
          <UsageGuideBanner
            tone={allSet ? "success" : "warning"}
            icon={<Icon name="info" size={20} color="#fff" />}
            title={allSet ? "✓ Dashboard configured correctly" : "Quick Setup — Get accurate data"}
            steps={
              allSet
                ? null
                : (
                  <React.Fragment>
                    <GuideStep
                      status={isToday ? "done" : "pending"}
                      icon={<Icon name="calendar-days" size={16} />}
                    >
                      {isToday ? "Date is set to today ✓" : "Step 1: Set the date to today's date"}
                    </GuideStep>
                    <span style={{ color: "var(--muted)", display: "inline-flex" }}>
                      <Icon name="arrow-right" size={14} />
                    </span>
                    <GuideStep
                      status={isSpecificOutlet ? "done" : "pending"}
                      icon={<Icon name="store" size={16} />}
                    >
                      {isSpecificOutlet ? "Outlet selected ✓" : 'Step 2: Select a specific outlet'}
                    </GuideStep>
                    <span style={{ color: "var(--muted)", display: "inline-flex" }}>
                      <Icon name="arrow-right" size={14} />
                    </span>
                    <GuideStep status="info">
                      Then switch back to "All Outlets" for combined view
                    </GuideStep>
                  </React.Fragment>
                )
            }
            onDismiss={() => setBannerDismissed(true)}
          >
            {allSet
              ? `You're viewing live data for ${outletLabel}. You can now switch back to "All Outlets" for a combined view.`
              : "For accurate, real-time numbers please follow these steps:"}
          </UsageGuideBanner>
        )}

        {/* Filter bar */}
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
            padding: 10,
            border: "1px solid var(--border-subtle)",
            borderRadius: 8,
            background: "var(--hero-status-bg)",
            boxShadow: "var(--shadow-panel)",
            flexWrap: "wrap",
          }}
        >
          <ViewTabs
            options={views.map((v) => v.id)}
            value={view}
            onChange={setView}
          />
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, flexWrap: "wrap" }}>
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ color: "var(--muted)", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Date
              </span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  height: 36,
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 6,
                  padding: "0 12px",
                  background: "var(--panel)",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-sans)",
                }}
              />
            </label>
            <FieldSelect
              label="Outlet"
              value={outlet}
              onChange={(e) => setOutlet(e.target.value)}
              size="sm"
            >
              <option value="all">All outlets</option>
              {outlets.map((o) => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </FieldSelect>
            <RangeSwitch
              options={["Today", "Week", "Month"]}
              value={range}
              onChange={setRange}
            />
          </div>
        </section>

        {/* Command bar */}
        <section
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: 10,
            border: "1px solid var(--border-subtle)",
            borderRadius: 8,
            background: "var(--hero-status-bg)",
          }}
        >
          <CommandInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Try: low stock at Lake Road, delayed orders, chef score"
          />
          <Button variant="secondary" onClick={() => setExportOpen(true)}>
            Export report
          </Button>
        </section>

        {view === "overview" ? (
          overview
        ) : (
          <div
            style={{
              padding: 60,
              border: "1px dashed var(--border-subtle)",
              borderRadius: 8,
              color: "var(--muted)",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            <strong style={{ color: "var(--text-primary)", textTransform: "capitalize" }}>
              {view}
            </strong>{" "}
            view — not recreated in this kit. Use Overview to see all components in context.
          </div>
        )}

        <Modal
          open={exportOpen}
          onClose={() => setExportOpen(false)}
          title="Export Report"
          ctaText="Download"
          onCta={() => {}}
        >
          <label style={{ display: "grid", gap: 6, marginBottom: 16 }}>
            <span style={{ color: "var(--muted)", fontSize: 12, fontWeight: 800 }}>
              Format
            </span>
            <select
              style={{
                width: "100%",
                border: "1px solid var(--border-subtle)",
                background: "var(--panel)",
                color: "var(--text-primary)",
                padding: "10px 14px",
                borderRadius: 8,
              }}
            >
              <option>PDF (Executive Summary)</option>
              <option>CSV (Raw Data)</option>
              <option>Excel (Financials)</option>
            </select>
          </label>
          <p style={{ color: "var(--muted)", fontSize: 13, margin: 0 }}>
            The export will include all data within the currently selected scope ({outletLabel}, {range}).
          </p>
        </Modal>

        <Modal
          open={!!inspectOutlet}
          onClose={() => setInspectOutlet(null)}
          title={inspectOutlet ? `${inspectOutlet.name} — Full Health Report` : ""}
          ctaText="Flag for Review"
          onCta={() => {}}
          width={560}
        >
          {inspectOutlet && (
            <div style={{ display: "grid", gap: 14 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  background: "var(--wash)",
                  borderRadius: 8,
                }}
              >
                <StatusPill tone="success">Healthy</StatusPill>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>
                  Composite health score across stock, margin, NPS, and growth
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field k="Manager" v={inspectOutlet.manager} />
                <Field k="Area" v={inspectOutlet.area} />
                <Field k="Net sales (today)" v={fmtINR(inspectOutlet.sales)} />
                <Field k="Growth" v={`+${inspectOutlet.growth}%`} />
                <Field k="Margin" v={`${inspectOutlet.margin}%`} />
                <Field k="NPS" v={inspectOutlet.nps} />
                <Field k="Stock health" v={`${inspectOutlet.stockHealth}%`} />
                <Field k="Avg prep" v={`${inspectOutlet.prep} min`} />
              </div>
            </div>
          )}
        </Modal>
      </section>
    </main>
  );
}

function Field({ k, v }) {
  return (
    <div
      style={{
        padding: "10px 12px",
        border: "1px solid var(--border-subtle)",
        borderRadius: 8,
      }}
    >
      <div style={{ color: "var(--muted)", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {k}
      </div>
      <div style={{ marginTop: 4, fontSize: 15, fontWeight: 800, color: "var(--text-primary)" }}>
        {v}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
