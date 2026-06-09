// TrendChart — the brand's signature interactive bar chart with
// alternating green / amber / blue bar fills and dark popover tooltips.
function TrendChart({ points }) {
  const { fmtINR } = window.kitData;
  return (
    <div
      style={{
        height: 260,
        display: "grid",
        gridTemplateColumns: `repeat(${points.length}, 1fr)`,
        alignItems: "end",
        gap: 10,
        padding: "16px 0 0",
      }}
    >
      {points.map((p, i) => {
        const fill =
          i % 3 === 2
            ? "var(--chart-amber-bar)"
            : i % 4 === 3
            ? "var(--chart-blue-bar)"
            : "var(--chart-green-bar)";
        return (
          <span
            key={p.label}
            tabIndex={0}
            aria-label={`${p.label}: ${fmtINR(p.sales)}, ${p.orders} orders`}
            className="kit-bar"
            style={{
              position: "relative",
              minHeight: 30,
              height: `${p.height}%`,
              borderRadius: "6px 6px 2px 2px",
              background: fill,
              cursor: "pointer",
              transition: "transform 160ms ease, filter 160ms ease, box-shadow 160ms ease",
            }}
          >
            <i
              style={{
                position: "absolute",
                inset: "7px 7px auto 7px",
                height: 4,
                borderRadius: 99,
                background: "rgba(255, 255, 255, 0.64)",
              }}
            />
            <b
              className="kit-bar__tip"
              style={{
                position: "absolute",
                left: "50%",
                bottom: "calc(100% + 12px)",
                minWidth: 132,
                display: "grid",
                gap: 3,
                padding: 10,
                opacity: 0,
                transform: "translate(-50%, 6px)",
                transition: "opacity 160ms ease, transform 160ms ease",
                zIndex: 5,
                background: "#101916",
                color: "#fff",
                borderRadius: 8,
                border: "1px solid rgba(20,33,28,0.12)",
                boxShadow: "var(--shadow-pop)",
                pointerEvents: "none",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: 13,
                lineHeight: 1.2,
              }}
            >
              <em style={{ color: "#9ddabb", fontSize: 11, fontStyle: "normal", fontWeight: 900, textTransform: "uppercase" }}>
                {p.label}
              </em>
              {fmtINR(p.sales)}
              <small style={{ color: "#c9d8d1", fontSize: 12 }}>{p.orders} orders</small>
            </b>
          </span>
        );
      })}
      <style>{`
        .kit-bar:hover, .kit-bar:focus-visible {
          z-index: 3;
          filter: saturate(1.12);
          transform: translateY(-8px);
          box-shadow: var(--shadow-bar);
        }
        .kit-bar:hover .kit-bar__tip, .kit-bar:focus-visible .kit-bar__tip {
          opacity: 1;
          transform: translate(-50%, 0);
        }
      `}</style>
    </div>
  );
}

window.TrendChart = TrendChart;
