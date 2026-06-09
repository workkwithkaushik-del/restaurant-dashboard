import React from "react";

/**
 * BrandMark — the rounded-square amber-gradient tile holding the
 * two-letter monogram. Used in the sidebar brand lockup and mobile
 * header.
 */
export function BrandMark({ initials = "RC", size = 40, style, ...rest }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: Math.max(6, size * 0.2),
        display: "grid",
        placeItems: "center",
        background: "var(--brand-mark-bg)",
        color: "var(--brand-mark-fg)",
        fontWeight: 900,
        fontSize: Math.round(size * 0.35),
        boxShadow: "var(--shadow-mark)",
        flexShrink: 0,
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {initials}
    </span>
  );
}
