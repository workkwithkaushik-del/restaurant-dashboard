import React from "react";

/**
 * StatusPill — rounded-full label that maps a semantic tone to a
 * soft bg + saturated fg pair. The single most-used label affordance
 * in the dashboard (outlet health, order status, banner level).
 */
export function StatusPill({ tone = "success", children, style, ...rest }) {
  const tones = {
    success: { bg: "var(--status-success-bg)", fg: "var(--status-success-fg)" },
    warning: { bg: "var(--status-warning-bg)", fg: "var(--status-warning-fg)" },
    danger:  { bg: "var(--status-danger-bg)",  fg: "var(--status-danger-fg)"  },
    info:    { bg: "var(--status-info-bg)",    fg: "var(--status-info-fg)"    },
    neutral: { bg: "var(--status-neutral-bg)", fg: "var(--status-neutral-fg)" },
  };
  const t = tones[tone] || tones.success;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        width: "fit-content",
        borderRadius: 999,
        background: t.bg,
        color: t.fg,
        padding: "5px 10px",
        fontSize: 12,
        fontWeight: 850,
        whiteSpace: "nowrap",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
