import React from "react";

/**
 * Sidebar — the dark left rail. Sticky, full-height, near-black,
 * 260px wide (72px when collapsed via `collapsed` prop). Children
 * are arranged top-to-bottom; the brand uses dividers and labels
 * to group them.
 *
 * Uses the `.sidebar` CSS class so that media-query-based responsive
 * rules (position: fixed, transform, etc.) can properly override the
 * default desktop layout on mobile.
 */
export function Sidebar({ collapsed = false, children, style, className = "", ...rest }) {
  return (
    <aside
      className={`sidebar ${className}`.trim()}
      style={{
        "--sidebar-w": collapsed ? "72px" : "260px",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </aside>
  );
}

export function SidebarDivider() {
  return (
    <div
      style={{
        height: 1,
        background: "var(--sidebar-line-soft)",
        margin: "6px 0",
        flexShrink: 0,
      }}
    />
  );
}

export function SidebarLabel({ children, collapsed = false }) {
  return (
    <p
      style={{
        fontSize: collapsed ? 0 : 10,
        fontWeight: 800,
        color: "var(--sidebar-label)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        padding: collapsed ? "4px 0" : "8px 10px 4px",
        textAlign: collapsed ? "center" : "left",
        whiteSpace: "nowrap",
        margin: 0,
        height: collapsed ? 8 : "auto",
        lineHeight: 1.4,
      }}
    >
      {children}
    </p>
  );
}
