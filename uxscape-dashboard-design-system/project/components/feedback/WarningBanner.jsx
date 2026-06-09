import React from "react";

/**
 * WarningBanner — compact one-line red banner used inside panels
 * to flag a critical condition (e.g. margin under 60%).
 */
export function WarningBanner({ icon, children, style }) {
  return (
    <div
      style={{
        background: "rgba(239,68,68,0.08)",
        border: "1px solid rgba(239,68,68,0.18)",
        color: "#b93028",
        padding: "12px 16px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      {icon}
      <div>{children}</div>
    </div>
  );
}
