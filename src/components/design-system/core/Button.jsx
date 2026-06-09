import React from "react";

/**
 * Button — the primary brand button in two visual variants
 * plus a quiet link form.
 *
 * variant:
 *   "primary"   — dark filled, white text, deep shadow (default action)
 *   "secondary" — soft green tint, green text (positive secondary)
 *   "link"      — transparent, green text, no padding shadow
 *   "mini"      — small dark filled, used inline inside table/outlet rows
 */
export function Button({
  variant = "primary",
  children,
  type = "button",
  disabled = false,
  className = "",
  style,
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: variant === "mini" ? 32 : 42,
    borderRadius: 8,
    padding: variant === "link" ? "0 4px" : variant === "mini" ? "0 10px" : "0 16px",
    border: 0,
    fontWeight: 800,
    fontSize: 14,
    fontFamily: "var(--font-sans)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "var(--transition-hover)",
    whiteSpace: "nowrap",
  };

  const variants = {
    primary: {
      background: "var(--ink)",
      color: "var(--panel)",
      boxShadow: "var(--shadow-button)",
    },
    secondary: {
      background: "var(--green-soft)",
      color: "var(--green)",
    },
    link: {
      background: "transparent",
      color: "var(--green)",
    },
    mini: {
      background: "var(--ink)",
      color: "var(--panel)",
    },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
      style={{ ...base, ...variants[variant], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
