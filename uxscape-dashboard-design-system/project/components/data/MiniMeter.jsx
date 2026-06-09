import React from "react";

/**
 * MiniMeter — a small horizontal progress meter with a green→mint
 * gradient fill. Used in outlet rows, chef cards, and inventory levels.
 *
 * value: 0–100
 */
export function MiniMeter({ value = 0, label, suffix, style, ...rest }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      style={{
        display: "grid",
        gap: 6,
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {(label || suffix) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "var(--muted)",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {label && <span>{label}</span>}
          {suffix && <b style={{ color: "var(--text-primary)" }}>{suffix}</b>}
        </div>
      )}
      <div
        style={{
          height: 8,
          borderRadius: 999,
          background: "#e8eee9",
          overflow: "hidden",
        }}
      >
        <i
          style={{
            display: "block",
            height: "100%",
            width: `${pct}%`,
            background: "var(--chart-meter-fill)",
            borderRadius: "inherit",
          }}
        />
      </div>
    </div>
  );
}
