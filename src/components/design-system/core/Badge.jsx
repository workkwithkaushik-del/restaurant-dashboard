import React from "react";

/**
 * Badge — small uppercase tag, used for tag-style auto-classifications
 * (`#ColdFood`, `#QualityRisk`, `#Praise`). Smaller and squarer than
 * StatusPill, with a slight border in the same hue.
 */
export function Badge({ tone = "neutral", children, style, ...rest }) {
  const tones = {
    success: { bg: "rgba(16,185,129,0.08)",  fg: "#1b7f63", border: "rgba(16,185,129,0.25)" },
    warning: { bg: "rgba(249,115,22,0.10)",  fg: "#a66500", border: "rgba(249,115,22,0.25)" },
    danger:  { bg: "rgba(239,68,68,0.10)",   fg: "#b93028", border: "rgba(239,68,68,0.25)"  },
    info:    { bg: "rgba(58,91,220,0.08)",   fg: "var(--blue)", border: "rgba(58,91,220,0.22)" },
    neutral: { bg: "rgba(120,113,108,0.06)", fg: "var(--muted)", border: "var(--line)" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2.5px 7px",
        borderRadius: 4,
        fontSize: 9,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        border: `1px solid ${t.border}`,
        background: t.bg,
        color: t.fg,
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
