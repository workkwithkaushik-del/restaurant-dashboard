import React from "react";

/**
 * SummaryCard — the "rolled-up KPI" card with a soft diagonal tint
 * overlay. Used in the graph-summary panel beside the chart.
 * Big value, uppercase label, single line of supporting detail.
 *
 * tone="green" sets the value text colour (the brand only does this on
 * the leading metric of a summary group); other tones keep ink text.
 */
const OVERLAY = {
  green:  "linear-gradient(135deg, rgba(8,120,93,0.10), transparent 54%)",
  blue:   "linear-gradient(135deg, rgba(58,91,220,0.12), transparent 54%)",
  amber:  "linear-gradient(135deg, rgba(240,167,47,0.16), transparent 54%)",
  purple: "linear-gradient(135deg, rgba(118,82,217,0.13), transparent 54%)",
};

const VALUE_FG = {
  green: "var(--text-success)",
  blue:  "var(--accent-blue)",
  amber: "#a66500",
  purple: "var(--accent-purple)",
};

export function SummaryCard({
  label,
  value,
  detail,
  tone = "green",
  children,
  style,
  ...rest
}) {
  return (
    <article
      style={{
        minHeight: 126,
        padding: 18,
        border: "1px solid var(--border-subtle)",
        borderRadius: 8,
        background: "var(--surface-card)",
        boxShadow: "var(--shadow-card)",
        display: "grid",
        alignContent: "space-between",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      <span
        aria-hidden="true"
        style={{
          content: "''",
          position: "absolute",
          inset: 0,
          background: OVERLAY[tone] || OVERLAY.green,
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          position: "relative",
          color: "var(--muted)",
          fontSize: 12,
          fontWeight: 900,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <strong
        style={{
          position: "relative",
          fontSize: "clamp(24px, 3vw, 34px)",
          lineHeight: 1,
          fontWeight: 800,
          color: VALUE_FG[tone] || "var(--text-primary)",
        }}
      >
        {value}
      </strong>
      {detail && (
        <p
          style={{
            margin: 0,
            position: "relative",
            color: "var(--muted)",
            fontSize: 13,
            lineHeight: 1.35,
          }}
        >
          {detail}
        </p>
      )}
      {children}
    </article>
  );
}
