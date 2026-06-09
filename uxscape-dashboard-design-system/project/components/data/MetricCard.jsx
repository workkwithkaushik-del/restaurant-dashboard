import React from "react";

/**
 * MetricCard — the metric-row tile. White card with a coloured stripe
 * inset to the left edge. Big number, label above, supporting delta below.
 *
 * accent: "green" | "blue" | "amber" | "coral" | "purple"
 */
const ACCENT_VAR = {
  green: "var(--accent-green)",
  blue: "var(--accent-blue)",
  amber: "var(--accent-amber)",
  coral: "var(--accent-coral)",
  purple: "var(--accent-purple)",
};

export function MetricCard({ label, value, change, accent = "green", style, ...rest }) {
  const stripe = ACCENT_VAR[accent] || ACCENT_VAR.green;
  return (
    <article
      style={{
        minHeight: 128,
        flex: "1 1 0",
        minWidth: 0,
        padding: 18,
        border: "1px solid var(--border-subtle)",
        borderRadius: 8,
        background: "var(--surface-card)",
        boxShadow: "var(--shadow-card)",
        display: "grid",
        alignContent: "space-between",
        position: "relative",
        overflow: "hidden",
        wordBreak: "break-word",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          position: "absolute",
          inset: "0 auto 0 0",
          width: 5,
          background: stripe,
        }}
      />
      <span
        style={{
          color: "var(--muted)",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {label}
      </span>
      <strong
        style={{
          fontSize: "clamp(24px, 3vw, 34px)",
          lineHeight: 1,
          fontWeight: 800,
          color: "var(--text-primary)",
        }}
      >
        {value}
      </strong>
      {change && (
        <p
          style={{
            margin: 0,
            color: "var(--text-success)",
            fontSize: 13,
            fontWeight: 800,
          }}
        >
          {change}
        </p>
      )}
    </article>
  );
}
