import React from "react";

/**
 * IconButton — square icon-only button.
 * tone="default" for light surfaces, tone="dark" for the sidebar.
 */
export function IconButton({
  tone = "default",
  size = "md",
  children,
  className = "",
  style,
  ...rest
}) {
  const px = size === "sm" ? 32 : 40;
  const base = {
    width: px,
    height: px,
    display: "grid",
    placeItems: "center",
    borderRadius: 8,
    cursor: "pointer",
    transition: "var(--transition-hover)",
    flexShrink: 0,
  };

  const tones = {
    default: {
      border: "1px solid var(--line)",
      background: "var(--panel)",
      color: "var(--muted)",
    },
    dark: {
      border: "1px solid #2a3d35",
      background: "transparent",
      color: "#8ca299",
    },
  };

  return (
    <button
      className={className}
      style={{ ...base, ...tones[tone], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
