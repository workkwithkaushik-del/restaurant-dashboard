import React from "react";

/**
 * SidebarItem — single nav row. Icon left, label right; collapses
 * to icon-only when `collapsed`. `active` flips the bg + adds a
 * subtle border.
 */
export function SidebarItem({
  icon,
  children,
  active = false,
  collapsed = false,
  title,
  onClick,
  style,
}) {
  const base = {
    display: "flex",
    alignItems: "center",
    gap: collapsed ? 0 : 12,
    padding: collapsed ? 10 : "10px 12px",
    borderRadius: 8,
    border: "1px solid transparent",
    background: "transparent",
    color: "var(--sidebar-item)",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
    overflow: "hidden",
    transition: "var(--transition-hover)",
    textAlign: "left",
    width: "100%",
    justifyContent: collapsed ? "center" : "flex-start",
    fontFamily: "var(--font-sans)",
  };
  const activeStyle = active
    ? {
        background: "var(--sidebar-item-active-bg)",
        borderColor: "var(--sidebar-item-active-border)",
        color: "var(--sidebar-text)",
      }
    : null;
  return (
    <button
      title={title}
      onClick={onClick}
      style={{ ...base, ...activeStyle, ...style }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = "var(--sidebar-item-hover-bg)";
          e.currentTarget.style.color = "var(--sidebar-text)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "var(--sidebar-item)";
        }
      }}
    >
      <span
        style={{
          flexShrink: 0,
          width: 20,
          height: 20,
          display: "grid",
          placeItems: "center",
        }}
      >
        {icon}
      </span>
      {!collapsed && (
        <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          {children}
        </span>
      )}
    </button>
  );
}
