import React from "react";

/**
 * Hero — the big top-of-page band. Renders an eyebrow + h1 + body
 * paragraph on the left, and an optional status capsule on the
 * right. Default styling matches the brand's `--hero-bg` gradient.
 */
export function Hero({ eyebrow, title, children, status, style }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 22,
        border: "1px solid var(--border-success)",
        borderRadius: 8,
        background: "var(--hero-bg)",
        boxShadow: "var(--shadow-card)",
        padding: 22,
        overflow: "hidden",
        wordBreak: "break-word",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      <div style={{ maxWidth: 820, minWidth: 0 }}>
        {eyebrow && (
          <p
            style={{
              margin: "0 0 9px",
              color: "var(--text-success)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </p>
        )}
        {title && (
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(34px, 4.4vw, 58px)",
              lineHeight: 1.02,
              fontWeight: 600,
              letterSpacing: "-0.015em",
            }}
          >
            {title}
          </h1>
        )}
        {children && (
          <p
            style={{
              color: "var(--muted)",
              marginTop: 12,
              fontSize: 16,
              lineHeight: 1.5,
            }}
          >
            {children}
          </p>
        )}
      </div>
      {status && (
        <div
          aria-label="Current dashboard scope"
          style={{
            minWidth: 210,
            display: "flex",
            alignItems: "center",
            gap: 12,
            border: "1px solid var(--border-success)",
            borderRadius: 8,
            background: "var(--hero-status-bg)",
            padding: 12,
          }}
        >
          {status}
        </div>
      )}
    </header>
  );
}

/**
 * LiveDot — green pulsing dot used in hero status and sidebar
 * "Live · Synced 42s ago" rows.
 */
export function LiveDot({ size = 9, style }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#63d297",
        boxShadow: "0 0 0 5px rgba(99, 210, 151, 0.12)",
        display: "inline-block",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}
