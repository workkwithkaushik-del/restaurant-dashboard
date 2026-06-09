import React from "react";

/**
 * UsageGuideBanner — left-bordered tinted banner with a circular icon,
 * title, sub copy, and an optional row of step chips. tone="warning"
 * uses amber, tone="success" uses green.
 */
export function UsageGuideBanner({
  tone = "warning",
  icon,
  title,
  children,
  steps,
  onDismiss,
  style,
}) {
  const palette =
    tone === "success"
      ? {
          border: "var(--green)",
          bg: "var(--green-soft)",
          iconBg: "var(--green)",
          overlay: "linear-gradient(135deg, rgba(8,120,93,0.08), transparent 60%)",
        }
      : {
          border: "var(--amber)",
          bg: "var(--amber-soft)",
          iconBg: "var(--amber)",
          overlay: "linear-gradient(135deg, rgba(240,167,47,0.08), transparent 60%)",
        };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        padding: "16px 18px",
        border: `1px solid ${palette.border}`,
        borderLeft: `4px solid ${palette.border}`,
        borderRadius: 10,
        background: palette.bg,
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: palette.overlay,
          pointerEvents: "none",
        }}
      />
      {icon && (
        <div
          style={{
            position: "relative",
            flexShrink: 0,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: palette.iconBg,
            color: "#fff",
            display: "grid",
            placeItems: "center",
          }}
        >
          {icon}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
        {title && (
          <strong
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 850,
              color: "var(--text-primary)",
              marginBottom: 4,
            }}
          >
            {title}
          </strong>
        )}
        {children && (
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: "var(--muted)",
              lineHeight: 1.45,
            }}
          >
            {children}
          </p>
        )}
        {steps && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 12,
              flexWrap: "wrap",
            }}
          >
            {steps}
          </div>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            position: "relative",
            flexShrink: 0,
            width: 32,
            height: 32,
            border: "1px solid var(--border-subtle)",
            borderRadius: 8,
            background: "var(--surface-card)",
            color: "var(--muted)",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

/**
 * GuideStep — single chip used inside UsageGuideBanner's `steps` row.
 * status: "pending" | "done" | "info"
 */
export function GuideStep({ status = "pending", icon, children }) {
  const palette =
    status === "done"
      ? { border: "var(--green)", bg: "var(--green-soft)", color: "var(--green)" }
      : status === "info"
      ? { border: "var(--border-subtle)", bg: "transparent", color: "var(--muted)", dashed: true }
      : { border: "var(--amber)", bg: "rgba(240,167,47,0.08)", color: "#9a6100" };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 700,
        whiteSpace: "nowrap",
        border: `1px ${palette.dashed ? "dashed" : "solid"} ${palette.border}`,
        background: palette.bg,
        color: palette.color,
        fontFamily: "var(--font-sans)",
      }}
    >
      {icon}
      {children}
    </span>
  );
}
