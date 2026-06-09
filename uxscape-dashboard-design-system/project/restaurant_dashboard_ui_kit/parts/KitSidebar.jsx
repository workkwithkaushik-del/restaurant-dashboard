// Sidebar — composed using DS primitives + raw layout
function KitSidebar({ role, view, onRole, onView }) {
  const ns = window.UXscapeDashboardDesignSystem_6e71f2;
  const { Sidebar, SidebarDivider, SidebarLabel, SidebarItem, BrandMark, Avatar, IconButton, LiveDot } = ns;
  const { roles, views } = window.kitData;
  const activeRole = roles.find((r) => r.id === role);

  return (
    <Sidebar>
      <IconButton tone="dark" size="sm" aria-label="Collapse sidebar">
        <Icon name="panel-left-close" size={18} />
      </IconButton>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "4px 0",
          minHeight: 48,
          flexShrink: 0,
        }}
      >
        <BrandMark initials="RC" />
        <div>
          <strong style={{ display: "block", fontSize: 14, lineHeight: 1.2, color: "#fff" }}>
            Restaurant Chain
          </strong>
          <span style={{ display: "block", color: "var(--sidebar-muted)", fontSize: 11, marginTop: 2 }}>
            Dashboard
          </span>
        </div>
      </div>

      <SidebarDivider />
      <SidebarLabel>Switch role</SidebarLabel>
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {roles.map((r) => (
          <SidebarItem
            key={r.id}
            icon={<Icon name={r.iconName} size={18} />}
            active={role === r.id}
            onClick={() => onRole(r.id)}
          >
            {r.label}
          </SidebarItem>
        ))}
      </nav>

      <SidebarDivider />
      <SidebarLabel>Navigation</SidebarLabel>
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {views.map((v) => (
          <SidebarItem
            key={v.id}
            icon={<Icon name={v.iconName} size={18} />}
            active={view === v.id}
            onClick={() => onView(v.id)}
          >
            <span style={{ textTransform: "capitalize" }}>{v.id}</span>
          </SidebarItem>
        ))}
      </nav>

      <SidebarDivider />
      <SidebarLabel>System</SidebarLabel>
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <SidebarItem icon={<Icon name="bell" size={18} />}>Notifications</SidebarItem>
        <SidebarItem icon={<Icon name="settings" size={18} />}>Settings</SidebarItem>
        <SidebarItem icon={<Icon name="help-circle" size={18} />}>Help & Support</SidebarItem>
      </nav>

      <div
        style={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          paddingTop: 8,
          flexShrink: 0,
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #2a3d35",
            background: "transparent",
            color: "#8ca299",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Icon name="moon" size={16} />
          <span>Dark Mode</span>
        </button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 10px",
            color: "#8ca299",
            fontSize: 11,
          }}
        >
          <LiveDot size={7} />
          <span>Live · Synced 42s ago</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: 10,
            borderRadius: 10,
            background: "#182521",
            border: "1px solid #2a3d35",
          }}
        >
          <Avatar initials="KP" size={36} />
          <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            <strong style={{ display: "block", fontSize: 13, color: "#fff" }}>
              Kaushik Patil
            </strong>
            <span style={{ display: "block", color: "#8ca299", fontSize: 11 }}>
              {activeRole?.label}
            </span>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

window.KitSidebar = KitSidebar;
