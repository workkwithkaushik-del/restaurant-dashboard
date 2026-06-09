import React from "react";

/**
 * Eyebrow — uppercase, heavy-weight, green, with wide tracking.
 * Sits above an h2 inside every panel-heading. The pattern is
 * "eyebrow = category, h2 = thing being shown".
 */
export function Eyebrow({ children, style, ...rest }) {
  return (
    <p
      style={{
        margin: 0,
        color: "var(--text-success)",
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </p>
  );
}
