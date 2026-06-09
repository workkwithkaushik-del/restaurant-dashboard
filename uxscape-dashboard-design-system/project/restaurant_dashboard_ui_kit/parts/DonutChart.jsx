// DonutChart — pure SVG donut with green→amber→coral→blue slices,
// matching the brand's day-part contribution panel.
function DonutChart({ slices, centerLabel, centerSub }) {
  const radius = 72;
  const stroke = 17;
  const cx = 90, cy = 90;
  const circumference = 2 * Math.PI * radius;
  const total = slices.reduce((s, x) => s + x.value, 0);
  let offset = 0;

  return (
    <div style={{ position: "relative", width: 200, height: 200, margin: "0 auto" }}>
      <svg width={180} height={180} viewBox="0 0 180 180" style={{ overflow: "visible" }}>
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="#e8eee9"
          strokeWidth={stroke}
        />
        {slices.map((s, i) => {
          const len = (s.value / total) * circumference;
          const el = (
            <circle
              key={s.label}
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={`${len} ${circumference - len}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              transform={`rotate(-90 ${cx} ${cy})`}
              style={{ transition: "all .3s ease" }}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          textAlign: "center",
        }}
      >
        <div>
          <strong style={{ fontSize: 30, lineHeight: 1, fontWeight: 850, color: "var(--text-primary)" }}>
            {centerLabel}
          </strong>
          {centerSub && (
            <div style={{ color: "var(--muted)", fontSize: 13, fontWeight: 850, marginTop: 4 }}>
              {centerSub}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

window.DonutChart = DonutChart;
