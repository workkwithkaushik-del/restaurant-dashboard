import { useDashboardData } from "./hooks/useDashboardData";
import { toast } from 'sonner';
import { Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { roles, views, roleBrief } from "./data/mockData";
import { fetchOutlets, fetchInventory, fetchChefs, fetchLiveOrders, fetchFeedback, fetchCampaigns, fetchViralCampaigns, fetchAnalytics } from "./services/api";
import { formatCurrency, getTodayString, get30DaysAgoString, getSeedFromDate } from "./utils/helpers";
import { Sidebar, SidebarDivider, SidebarLabel } from "./components/design-system/navigation/Sidebar";
import { SidebarItem } from "./components/design-system/navigation/SidebarItem";
import { BrandMark } from "./components/design-system/core/BrandMark";
import { Avatar } from "./components/design-system/core/Avatar";
import { StatusPill } from "./components/design-system/core/StatusPill";
import { Badge } from "./components/design-system/core/Badge";
import { Hero, LiveDot } from "./components/design-system/navigation/Hero";
import { UsageGuideBanner as DSUsageGuideBanner, GuideStep } from "./components/design-system/feedback/UsageGuideBanner";
import { ViewTabs } from "./components/design-system/forms/ViewTabs";
import { FieldSelect } from "./components/design-system/forms/FieldSelect";
import { RangeSwitch } from "./components/design-system/forms/RangeSwitch";
import { CommandInput } from "./components/design-system/forms/CommandInput";
import { Button as DSButton } from "./components/design-system/core/Button";
import { MetricCard } from "./components/design-system/data/MetricCard";
import { SummaryCard as DSummaryCard } from "./components/design-system/data/SummaryCard";
import { Panel } from "./components/design-system/data/Panel";
import { MiniMeter } from "./components/design-system/data/MiniMeter";
import { Modal } from "./components/design-system/feedback/Modal";
import Staff from "./features/workforce/Staff";
import WorkforceManagementPanel from "./features/workforce/WorkforceManagementPanel";
import VendorPerformancePanel from "./features/procurement/VendorPerformancePanel";
import MenuPanel from "./features/menu/MenuPanel";
import { useWebSocketSimulation } from "./hooks/useWebSocketSimulation";
import { Moon, Sun, PanelLeftClose, PanelLeft, LayoutDashboard, UtensilsCrossed, ShoppingCart, Package, Users, MessageSquare, MapPin, ChefHat, TrendingUp, Building2, Menu as MenuIcon, Bell, Settings, HelpCircle, Info, X, CalendarDays, Store, ArrowRight, ShieldAlert } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Bar, Area, XAxis, YAxis, Tooltip, Legend, BarChart } from 'recharts';

function Button({ variant, size, children, className = "", style, ...props }) {
  if (variant === "destructive") {
    return (
      <DSButton
        variant="mini"
        className={className}
        style={{
          background: "var(--status-danger-bg)",
          color: "var(--status-danger-fg)",
          border: "1px solid var(--border-strong)",
          minHeight: size === "xs" ? 26 : 32,
          fontSize: size === "xs" ? 11 : 13,
          padding: size === "xs" ? "0 8px" : "0 10px",
          fontWeight: 800,
          ...style
        }}
        {...props}
      >
        {children}
      </DSButton>
    );
  }
  return (
    <DSButton
      variant={variant === "secondary" ? "secondary" : variant === "mini" ? "mini" : "primary"}
      className={className}
      style={{
        minHeight: size === "xs" ? 26 : undefined,
        fontSize: size === "xs" ? 11 : undefined,
        padding: size === "xs" ? "0 8px" : undefined,
        ...style
      }}
      {...props}
    >
      {children}
    </DSButton>
  );
}

function UsageGuideBanner({ selectedDate, selectedOutlet, getTodayString }) {
  const [dismissed, setDismissed] = useState(() => {
    const saved = sessionStorage.getItem('aroma_guide_dismissed');
    return saved === 'true';
  });

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('aroma_guide_dismissed', 'true');
  };

  if (dismissed) return null;

  const isToday = selectedDate === getTodayString();
  const isSpecificOutlet = selectedOutlet !== 'all';
  const allSet = isToday && isSpecificOutlet;

  return (
    <DSUsageGuideBanner
      tone={allSet ? "success" : "warning"}
      icon={<Info size={20} />}
      title={allSet ? '✓ Dashboard configured correctly' : 'Quick Setup — Get accurate data'}
      onDismiss={handleDismiss}
      steps={
        allSet ? null : (
          <>
            <GuideStep status={isToday ? "done" : "pending"} icon={<CalendarDays size={16} />}>
              {isToday ? "Date is set to today ✓" : "Step 1: Set the date to today's date"}
            </GuideStep>
            <span style={{ color: "var(--muted)", display: "inline-flex", alignItems: "center" }}>
              <ArrowRight size={14} />
            </span>
            <GuideStep status={isSpecificOutlet ? "done" : "pending"} icon={<Store size={16} />}>
              {isSpecificOutlet ? "Outlet selected ✓" : "Step 2: Select a specific outlet"}
            </GuideStep>
            <span style={{ color: "var(--muted)", display: "inline-flex", alignItems: "center" }}>
              <ArrowRight size={14} />
            </span>
            <GuideStep status="info">
              Then switch back to "All Outlets" for combined view
            </GuideStep>
          </>
        )
      }
    >
      {allSet 
        ? 'You\'re viewing live data for a specific outlet. You can now switch to "All Outlets" for a combined view if needed.'
        : 'For accurate, real-time numbers please follow these steps:'
      }
    </DSUsageGuideBanner>
  );
}

function DashboardEmptyState({ selectedDate, selectedOutlet, getTodayString, roleLabel }) {
  const isToday = selectedDate === getTodayString();
  const isSpecificOutlet = selectedOutlet !== 'all';
  
  return (
    <div 
      className="panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        textAlign: 'center',
        background: 'var(--hero-status-bg)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 12,
        boxShadow: 'var(--shadow-panel)',
        minHeight: 400,
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <span aria-hidden="true" style={{ content: "''", position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(8,120,93,0.05), transparent 60%)", pointerEvents: "none" }} />
      
      {/* Decorative Icon */}
      <div 
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'var(--wash)',
          border: '1px solid var(--border-subtle)',
          display: 'grid',
          placeItems: 'center',
          marginBottom: 24,
          color: 'var(--green)',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <Store size={40} />
      </div>

      <p style={{ margin: '0 0 8px', color: 'var(--text-success)', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        Setup Required
      </p>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, margin: '0 0 12px', color: 'var(--text-primary)', fontWeight: 600 }}>
        Configure Dashboard Scope
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: 460, fontSize: 14, lineHeight: 1.5, margin: '0 0 32px' }}>
        To view live telemetry, revenue tracking, and workforce audits for the {roleLabel} Dashboard, please configure the filters in the control panel above.
      </p>

      {/* Guide Steps Card */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          width: '100%',
          maxWidth: 420,
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 8,
          padding: 20,
          textAlign: 'left',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div 
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: isToday ? 'var(--green-soft)' : 'var(--wash)',
              border: '1px solid var(--border-subtle)',
              display: 'grid',
              placeItems: 'center',
              fontSize: 12,
              fontWeight: 800,
              color: isToday ? 'var(--text-success)' : 'var(--text-muted)'
            }}
          >
            {isToday ? "✓" : "1"}
          </div>
          <div style={{ flex: 1 }}>
            <strong style={{ display: 'block', fontSize: 13, color: 'var(--text-primary)' }}>Set Date to Today</strong>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              {isToday ? `Date is set to today (${selectedDate})` : "Change date filter above to today's date"}
            </span>
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--border-subtle)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div 
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: isSpecificOutlet ? 'var(--green-soft)' : 'var(--wash)',
              border: '1px solid var(--border-subtle)',
              display: 'grid',
              placeItems: 'center',
              fontSize: 12,
              fontWeight: 800,
              color: isSpecificOutlet ? 'var(--text-success)' : 'var(--text-muted)'
            }}
          >
            {isSpecificOutlet ? "✓" : "2"}
          </div>
          <div style={{ flex: 1 }}>
            <strong style={{ display: 'block', fontSize: 13, color: 'var(--text-primary)' }}>Select a Specific Outlet</strong>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              {isSpecificOutlet ? "Specific outlet selected" : "Switch 'All Outlets' filter above to a specific branch"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { role, activeView } = useParams();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('aroma_sidebar');
    return saved !== null ? saved === 'true' : true;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect mobile viewport for sidebar behavior
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 900px)').matches);
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 900px)');
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // On mobile, sidebar drawer always shows full (not collapsed)
  const sidebarCollapsed = isMobile ? false : !sidebarOpen;

  // Close mobile drawer when navigating
  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  useEffect(() => { localStorage.setItem('aroma_sidebar', String(sidebarOpen)); }, [sidebarOpen]);
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  const toggleSidebar = () => setSidebarOpen(s => !s);
  useWebSocketSimulation(role);

  const { outlets, inventory, chefs, liveOrders, feedback, campaigns, viralCampaigns, weeklyTrend, dayParts, isLoading: isDataLoading } = useDashboardData();

  const navigate = useNavigate();
  const setRole = (newRole) => {
    localStorage.setItem('aroma_role', newRole);
    navigate(`/${newRole}/overview`);
    setMobileMenuOpen(false);
  };
  const setActiveView = (newView) => {
    navigate(`/${role}/${newView}`);
    setMobileMenuOpen(false);
  };
  const [selectedDate, setSelectedDate] = useState(() => localStorage.getItem('aroma_date') || getTodayString());
  const isHistorical = selectedDate !== getTodayString();
  const dateMultiplier = useMemo(() => getSeedFromDate(selectedDate), [selectedDate]);

  const roleTabMap = {
    strategy:   ["overview", "menu", "feedback"],
    chef:       ["overview", "menu", "orders", "inventory"],
    restaurant: ["overview", "menu", "orders", "inventory", "staff", "feedback"],
    regional:   ["overview", "menu", "orders", "inventory", "staff", "feedback"],
  };

  const roleIcons = { regional: <Building2 size={18} />, restaurant: <MapPin size={18} />, chef: <ChefHat size={18} />, strategy: <TrendingUp size={18} /> };
  const viewIcons = { overview: <LayoutDashboard size={18} />, menu: <UtensilsCrossed size={18} />, orders: <ShoppingCart size={18} />, inventory: <Package size={18} />, staff: <Users size={18} />, feedback: <MessageSquare size={18} /> };

  const roleLabel = roles.find((r) => r.id === role)?.label || "Dashboard";

  const [ordersData, setOrdersData] = useState(() => {
    const saved = localStorage.getItem('aroma_ordersData');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (!ordersData && liveOrders.length > 0) {
      setOrdersData(liveOrders);
    }
  }, [liveOrders, ordersData]);
  const [selectedOutlet, setSelectedOutlet] = useState(() => localStorage.getItem('aroma_outlet') || "all");
  const [timeRange, setTimeRange] = useState(() => localStorage.getItem('aroma_timeRange') || "Today");
  const [dismissedAlerts, setDismissedAlerts] = useState(() => {
    const saved = localStorage.getItem('aroma_dismissedAlerts');
    return saved ? JSON.parse(saved) : [];
  });
  const [showExportModal, setShowExportModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isToday = selectedDate === getTodayString();
  const isSpecificOutlet = selectedOutlet !== "all";
  const isConfigured = isToday && isSpecificOutlet;

  // Persist state changes to localStorage
  // role is synced in setRole manually to avoid unnecessary re-renders
  useEffect(() => { localStorage.setItem('aroma_date', selectedDate); }, [selectedDate]);
  useEffect(() => { localStorage.setItem('aroma_outlet', selectedOutlet); }, [selectedOutlet]);
  useEffect(() => { localStorage.setItem('aroma_timeRange', timeRange); }, [timeRange]);
  useEffect(() => { localStorage.setItem('aroma_ordersData', JSON.stringify(ordersData)); }, [ordersData]);
  useEffect(() => { localStorage.setItem('aroma_dismissedAlerts', JSON.stringify(dismissedAlerts)); }, [dismissedAlerts]);

  // Auto-reset to overview if the current tab becomes hidden due to role/date change
  useEffect(() => {
    const allowedForRole = roleTabMap[role] ?? views;
    const isTabHidden =
      !allowedForRole.includes(activeView) ||
      (isHistorical && ["orders", "inventory", "staff"].includes(activeView));
    if (isTabHidden && activeView) navigate(`/${role}/overview`, { replace: true });
  }, [role, activeView, isHistorical, navigate]);

  const filterByQuery = (item) => !searchQuery || JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase());

  const filteredOutlets = useMemo(() => {
    let result = selectedOutlet === "all" ? outlets : outlets.filter((outlet) => outlet.id === selectedOutlet);
    return result.filter(filterByQuery);
  }, [selectedOutlet, searchQuery]);

  const scopedInventory = useMemo(() => {
    let result = selectedOutlet === "all" ? inventory : inventory.filter((item) => item.outlet === (outlets.find((o) => o.id === selectedOutlet)?.name));
    return result.filter(filterByQuery);
  }, [selectedOutlet, searchQuery]);

  const scopedOrders = useMemo(() => {
    let result = selectedOutlet === "all" ? (ordersData || []) : (ordersData || []).filter((order) => order.outlet === (outlets.find((o) => o.id === selectedOutlet)?.name));
    return result.filter(filterByQuery);
  }, [selectedOutlet, searchQuery, ordersData]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrdersData((prev) => prev.map((order) => order.id === orderId ? { ...order, status: newStatus } : order));
  };

  const timeMultiplier = timeRange === "Week" ? 7 : timeRange === "Month" ? 30 : 1;

  const totals = useMemo(
    () => {
      const base = filteredOutlets.reduce(
        (acc, outlet) => ({
          sales: acc.sales + outlet.sales,
          orders: acc.orders + outlet.orders,
          dineIn: acc.dineIn + outlet.dineIn,
          delivery: acc.delivery + outlet.delivery,
          liveQueue: acc.liveQueue + outlet.liveQueue,
          staff: acc.staff + outlet.staff,
          margin: acc.margin + outlet.margin,
          prep: acc.prep + outlet.prep,
          rating: acc.rating + outlet.rating,
          stockHealth: acc.stockHealth + outlet.stockHealth,
          nps: acc.nps + outlet.nps,
          labor: acc.labor + outlet.labor,
          reservations: acc.reservations + outlet.reservations,
        }),
        { sales: 0, orders: 0, dineIn: 0, delivery: 0, liveQueue: 0, staff: 0, margin: 0, prep: 0, rating: 0, stockHealth: 0, nps: 0, labor: 0, reservations: 0 }
      );
      return {
        sales: base.sales * timeMultiplier,
        orders: base.orders * timeMultiplier,
        dineIn: base.dineIn * timeMultiplier,
        delivery: base.delivery * timeMultiplier,
        liveQueue: base.liveQueue,
        staff: base.staff,
        margin: base.margin,
        prep: base.prep,
        rating: base.rating,
        stockHealth: base.stockHealth,
        nps: base.nps,
        labor: base.labor,
        reservations: base.reservations * timeMultiplier,
      };
    },
    [filteredOutlets, timeMultiplier]
  );

  const average = (key, decimals = 0) => (totals[key] / filteredOutlets.length).toFixed(decimals);
  const selectedOutletLabel =
    selectedOutlet === "all"
      ? "All outlets"
      : outlets.find((outlet) => outlet.id === selectedOutlet)?.name;
  const criticalAlerts = scopedInventory
    .filter((item) => item.status !== "Healthy" && !dismissedAlerts.includes(item.id))
    .slice(0, 4);



  if (isDataLoading) {
    return (
      <div style={{display: 'flex', height: '100vh', width: '100vw', background: 'var(--bg)', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16}}>
        <div style={{width: 40, height: 40, border: '3px solid var(--line)', borderTopColor: 'var(--brand)', borderRadius: '50%', animation: 'spin 1s linear infinite'}}></div>
        <p style={{color: 'var(--muted)', fontWeight: 500}}>Syncing Data with Servers...</p>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <main className={`shell${sidebarOpen ? '' : ' sidebar-collapsed'}`}>
      {/* Mobile Header */}
      <div className="mobile-header">
        <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <BrandMark initials="RC" size={34} />
          <div className="brand__text">
            <strong>Restaurant Chain</strong>
            <span style={{ color: "var(--sidebar-muted)" }}>Dashboard</span>
          </div>
        </div>
        <button className="mobile-hamburger" onClick={() => setMobileMenuOpen(true)}>
          <MenuIcon size={20} />
        </button>
      </div>

      {/* Mobile Overlay */}
      <div className={`sidebar-overlay${mobileMenuOpen ? ' visible' : ''}`} onClick={() => setMobileMenuOpen(false)} />

      <Sidebar collapsed={sidebarCollapsed} className={mobileMenuOpen ? 'mobile-open' : ''}>
        {/* Toggle Button — always visible */}
        <button 
          className="sidebar-toggle" 
          onClick={toggleSidebar} 
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          style={{
            width: "100%",
            height: 40,
            border: "1px solid var(--sidebar-line)",
            borderRadius: 8,
            background: "transparent",
            color: "var(--sidebar-muted)",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            transition: "all 0.2s",
            flexShrink: 0,
            marginBottom: 4,
          }}
        >
          {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
        </button>

        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "4px 0",
            minHeight: 48,
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <BrandMark initials="RC" />
          {sidebarCollapsed ? null : (
            <div style={{ whiteSpace: "nowrap" }}>
              <strong style={{ display: "block", fontSize: 14, lineHeight: 1.2, color: "#fff" }}>
                Restaurant Chain
              </strong>
              <span style={{ display: "block", color: "var(--sidebar-muted)", fontSize: 11, marginTop: 2 }}>
                Dashboard
              </span>
            </div>
          )}
        </div>

        <SidebarDivider />

        {/* Role Switcher */}
        <SidebarLabel collapsed={sidebarCollapsed}>Switch Role</SidebarLabel>
        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {roles.map((item) => (
            <SidebarItem
              key={item.id}
              icon={roleIcons[item.id]}
              active={role === item.id}
              collapsed={sidebarCollapsed}
              onClick={() => { setRole(item.id); closeMobileMenu(); }}
              title={item.label}
            >
              {item.label}
            </SidebarItem>
          ))}
        </nav>

        <SidebarDivider />

        {/* Page Navigation */}
        <SidebarLabel collapsed={sidebarCollapsed}>Navigation</SidebarLabel>
        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {(roleTabMap[role] ?? views)
            .filter(view => !(isHistorical && ["orders", "inventory", "staff"].includes(view)))
            .map(view => (
              <SidebarItem
                key={view}
                icon={viewIcons[view]}
                active={activeView === view}
                collapsed={sidebarCollapsed}
                onClick={() => { setActiveView(view); closeMobileMenu(); }}
                title={view}
              >
                <span style={{ textTransform: 'capitalize' }}>{view}</span>
              </SidebarItem>
            ))}
        </nav>

        <SidebarDivider />

        {/* Utilities */}
        <SidebarLabel collapsed={sidebarCollapsed}>System</SidebarLabel>
        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <SidebarItem icon={<Bell size={18} />} collapsed={sidebarCollapsed} title="Notifications">
            Notifications
          </SidebarItem>
          <SidebarItem icon={<Settings size={18} />} collapsed={sidebarCollapsed} title="Settings">
            Settings
          </SidebarItem>
          <SidebarItem icon={<HelpCircle size={18} />} collapsed={sidebarCollapsed} title="Help & Support">
            Help & Support
          </SidebarItem>
        </nav>

        {/* Footer: Theme + Status + Profile */}
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
            onClick={toggleTheme}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid var(--sidebar-line)",
              background: "transparent",
              color: "var(--sidebar-muted)",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {!sidebarCollapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 10px",
              color: "var(--sidebar-muted)",
              fontSize: 11,
            }}
          >
            {isHistorical ? (
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#8ca299', display: 'inline-block', flexShrink: 0 }} />
            ) : (
              <LiveDot size={7} />
            )}
            {!sidebarCollapsed && (
              <span>{isHistorical ? "EOD Snapshot" : "Live · Synced 42s ago"}</span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: 10,
              borderRadius: 10,
              background: "var(--sidebar-panel)",
              border: "1px solid var(--sidebar-line)",
            }}
          >
            <Avatar initials="KP" size={36} />
            {!sidebarCollapsed && (
              <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                <strong style={{ display: "block", fontSize: 13, color: "#fff" }}>
                  Kaushik Patil
                </strong>
                <span style={{ display: "block", color: "var(--sidebar-muted)", fontSize: 11 }}>
                  {roleLabel}
                </span>
              </div>
            )}
          </div>
        </div>
      </Sidebar>

      <section className="workspace">
        <Hero
          eyebrow={isHistorical ? `Historical Data: ${new Date(selectedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}` : `Today, ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`}
          title={`${roleLabel} Dashboard`}
          status={
            <>
              {isHistorical ? (
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#8ca299', display: 'inline-block', flexShrink: 0 }} />
              ) : (
                <LiveDot size={7} />
              )}
              <div style={{ display: "grid", gap: 3 }}>
                <b style={{ fontSize: 14 }}>{selectedOutletLabel}</b>
                <span style={{ color: "var(--muted)", fontSize: 12 }}>
                  {timeRange} view · {isHistorical ? "EOD Summary" : "live sync on"}
                </span>
              </div>
            </>
          }
        >
          {roleBrief[role]}
        </Hero>

        {/* Usage Guide Banner */}
        {isConfigured && (
          <UsageGuideBanner selectedDate={selectedDate} selectedOutlet={selectedOutlet} getTodayString={getTodayString} />
        )}

        <section
          className="navigation-bar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
            padding: 10,
            border: "1px solid var(--border-subtle)",
            borderRadius: 8,
            background: "var(--hero-status-bg)",
            boxShadow: "var(--shadow-panel)",
            flexWrap: "wrap",
          }}
          aria-label="Dashboard navigation and filters"
        >
          <ViewTabs
            className="desktop-only-tabs"
            options={(roleTabMap[role] ?? views)
              .filter(view => {
                if (isHistorical && ["orders", "inventory", "staff"].includes(view)) return false;
                return true;
              })}
            value={activeView}
            onChange={setActiveView}
          />

          {/* Mobile/tablet: show current tab label + hint to use sidebar */}
          <div className="mobile-current-tab">
            <span className="mobile-current-tab__icon">{viewIcons[activeView]}</span>
            <span className="mobile-current-tab__label">{activeView}</span>
            <span className="mobile-current-tab__hint">Use ☰ menu to switch tabs</span>
          </div>

          <div className="toolbar-controls" style={{ display: "flex", alignItems: "flex-end", gap: 10, flexWrap: "wrap" }}>
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ color: "var(--muted)", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Date
              </span>
              <input 
                type="date" 
                max={getTodayString()} 
                min={get30DaysAgoString()}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  height: 36,
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 6,
                  padding: "0 12px",
                  background: "var(--panel)",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-sans)",
                }}
              />
            </label>
            <FieldSelect
              label="Outlet"
              value={selectedOutlet}
              onChange={(e) => setSelectedOutlet(e.target.value)}
              size="sm"
            >
              <option value="all">All outlets</option>
              {outlets.map((outlet) => (
                <option value={outlet.id} key={outlet.id}>
                  {outlet.name}
                </option>
              ))}
            </FieldSelect>
            <RangeSwitch
              options={["Today", "Week", "Month"]}
              value={timeRange}
              onChange={setTimeRange}
            />
          </div>
        </section>

        {isConfigured ? (
          <>
            <section
              className="command-bar"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: 10,
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                background: "var(--hero-status-bg)",
              }}
              aria-label="Search and report actions"
            >
              <CommandInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Try: low stock at Lake Road, delayed orders, chef score"
              />
              <DSButton variant="secondary" onClick={() => setShowExportModal(true)}>
                Export report
              </DSButton>
            </section>

            {activeView === "overview" && (
              <Overview
                role={role}
                totals={totals}
                average={average}
                filteredOutlets={filteredOutlets}
                criticalAlerts={criticalAlerts}
                setDismissedAlerts={setDismissedAlerts}
                setActiveView={setActiveView}
                scopedOrders={scopedOrders}
                isHistorical={isHistorical}
                dateMultiplier={dateMultiplier}
                selectedDate={selectedDate}
              />
            )}
            {activeView === "orders" && <Orders orders={scopedOrders} role={role} updateOrderStatus={updateOrderStatus} />}
            {activeView === "inventory" && <Inventory items={scopedInventory} role={role} />}
            {activeView === "staff" && <Staff role={role} selectedOutlet={selectedOutlet} searchQuery={searchQuery} outlets={outlets} chefs={chefs} />}
            {activeView === "menu" && <MenuPanel role={role} searchQuery={searchQuery} />}
            {activeView === "feedback" && <Feedback selectedOutlet={selectedOutlet} searchQuery={searchQuery} />}
          </>
        ) : (
          <DashboardEmptyState
            selectedDate={selectedDate}
            selectedOutlet={selectedOutlet}
            getTodayString={getTodayString}
            roleLabel={roleLabel}
          />
        )}
      </section>

      <Modal 
        isOpen={showExportModal} 
        onClose={() => setShowExportModal(false)}
        title="Export Report"
        ctaText="Download"
        onCtaClick={() => {
          import('./utils/exportUtils').then(module => {
            module.generateMasterSchedulePDF(outlets, chefs);
          });
          setShowExportModal(false);
        }}
      >
        <FieldSelect
          label="Format"
          style={{ marginBottom: 16 }}
        >
          <option>PDF (Executive Summary)</option>
          <option>CSV (Raw Data)</option>
          <option>Excel (Financials)</option>
        </FieldSelect>
        <p style={{color: 'var(--muted)', fontSize: 13}}>The export will include all data within the currently selected scope ({selectedOutletLabel}, {timeRange}).</p>
      </Modal>
    </main>
  );
}

function Overview({ role, totals: liveTotals, average: liveAverage, filteredOutlets, criticalAlerts: liveAlerts, setDismissedAlerts, setActiveView, scopedOrders, isHistorical, dateMultiplier, selectedDate }) {
  const { outlets, inventory, chefs, liveOrders, feedback, campaigns, viralCampaigns, weeklyTrend, dayParts } = useDashboardData();
  const totals = useMemo(() => {
    if (!isHistorical) return liveTotals;
    return {
      sales: Math.round(liveTotals.sales * dateMultiplier),
      orders: Math.round(liveTotals.orders * dateMultiplier),
      liveQueue: 0,
      delivery: Math.round(liveTotals.delivery * dateMultiplier),
    };
  }, [liveTotals, isHistorical, dateMultiplier]);

  const average = useCallback((key, decimals = 0) => {
    if (!isHistorical) return liveAverage(key, decimals);
    const liveVal = Number(liveAverage(key, decimals));
    const newVal = liveVal * (0.9 + (dateMultiplier - 0.8) / 2);
    return newVal.toFixed(decimals);
  }, [liveAverage, isHistorical, dateMultiplier]);

  const criticalAlerts = isHistorical ? [] : liveAlerts;

  const showStrategy = role === "strategy";
  const showChef = role === "chef";
  const fulfilledOrders = Math.max(totals.orders - totals.liveQueue, 0);
  const fulfillmentRate = Math.round((fulfilledOrders / Math.max(totals.orders, 1)) * 100);
  const delayedOrders = scopedOrders.filter((order) => order.status === "Delayed").length;
  const averageMargin = Number(average("margin"));
  const grossProfit = Math.round((totals.sales * averageMargin) / 100);
  const serviceLeakage = Math.round(totals.sales * 0.032);
  const netPnl = grossProfit - serviceLeakage;

  const [oilPrice, setOilPrice] = useState(165); // default ₹165/L
  const [lpgPrice, setLpgPrice] = useState(2000); // default ₹2000/cylinder
  const [rawCostShift, setRawCostShift] = useState(15); // default +15%

  const oilFactor = oilPrice / 165;
  const lpgFactor = lpgPrice / 2000;
  const shiftFactor = 1 + (rawCostShift / 100);

  const projectedCOGS = (0.05 * oilFactor) + (0.05 * lpgFactor) + (0.20 * shiftFactor);
  const projectedMargin = 1 - projectedCOGS;
  const isMarginCritical = projectedMargin < 0.60;

  const [inspectModalOpen, setInspectModalOpen] = useState(false);
  const [selectedOutletForInspect, setSelectedOutletForInspect] = useState(null);

  const metricRow = (
    <section className="metric-row" key="metrics">
      {isHistorical ? (
        role === "chef" ? (
          <>
            <Metric title="Total Ingredients Used" value={`${Math.round(420 * dateMultiplier)} lbs`} change="EOD final tally" accent="blue" />
            <Metric title="Total Tickets Prepped" value={totals.orders} change="100% completed" accent="green" />
            <Metric title="EOD Wastage Rate" value={`${average("wastage", 1) || "1.4"}%`} change="End of shift" accent="orange" />
            <Metric title="Avg Prep Time" value={`${average("prep")} min`} change="Daily average" accent="purple" />
          </>
        ) : role === "restaurant" ? (
          <>
            <Metric title="EOD Net Sales" value={formatCurrency(totals.sales)} change="Final daily total" accent="green" />
            <Metric title="Total Footfall" value={Math.round(totals.orders * 1.8)} change="Guests served" accent="blue" />
            <Metric title="Final CX Score" value={`${average("nps")} NPS`} change={`${average("rating", 1)} avg rating`} accent="red" />
            <Metric title="Staff Shift Hours" value={Math.round(142 * dateMultiplier)} change="Total hours logged" accent="purple" />
          </>
        ) : role === "regional" ? (
          <>
            <Metric title="EOD Net Sales" value={formatCurrency(totals.sales)} change="Across all outlets" accent="green" />
            <Metric title="Total Orders" value={totals.orders.toLocaleString("en-IN")} change="100% fulfillment" accent="blue" />
            <Metric title="Audit Success Rate" value={`${Math.min(Math.round(98 * dateMultiplier), 100)}%`} change="Daily checks" accent="purple" />
            <Metric title="Critical Incidents" value="0" change="All resolved" accent="red" />
          </>
        ) : (
          <>
            <Metric title="EOD Net Sales" value={formatCurrency(totals.sales)} change="Final daily total" accent="green" />
            <Metric title="Total Ad Spend" value={formatCurrency(Math.round(25000 * dateMultiplier))} change="Daily budget" accent="orange" />
            <Metric title="Blended CAC" value={`₹${Math.round(145 * (2 - dateMultiplier))}`} change="Cost per acquisition" accent="purple" />
            <Metric title="Active Campaigns" value="4" change="Running normally" accent="blue" />
          </>
        )
      ) : (
        <>
          <Metric title="Net sales" value={formatCurrency(totals.sales)} change="+13.4% vs last week" accent="green" />
          {role === "strategy" ? (
            <>
              <Metric title="Avg. CAC" value="₹145" change="-12% vs last month" accent="green" />
              <Metric title="Social Reach" value="1.2M" change="Instagram & TikTok" accent="purple" />
            </>
          ) : (
            <>
              <Metric title="Orders" value={totals.orders.toLocaleString("en-IN")} change={`${totals.delivery} delivery orders`} accent="blue" />
              <Metric title="Live queue" value={totals.liveQueue} change="tickets being prepared" accent="orange" />
            </>
          )}
          <Metric title="CX score" value={`${average("nps")} NPS`} change={`${average("rating", 1)} avg rating`} accent="red" />
          {role === "strategy" ? (
             <Metric title="Est. Margin" value={`${averageMargin}%`} change="Net profit estimate" accent="purple" />
          ) : (
             <Metric title={showChef ? "Avg. prep" : "Stock health"} value={showChef ? `${average("prep")} min` : `${average("stockHealth")}%`} change={showChef ? "target 18 min" : `${criticalAlerts.length} alerts open`} accent="purple" />
          )}
        </>
      )}
    </section>
  );

  const chartPanel = (
    <Panel 
      eyebrow="Performance" 
      title={role === "strategy" ? "Expansion signal" : "Revenue and order trend"} 
      action={<StatusPill tone="success">{isHistorical ? "Final EOD data" : "Healthy trajectory"}</StatusPill>}
      style={{ gridColumn: role === 'chef' ? '1 / -1' : 'span 2' }}
      key="chart"
    >
      <div className="combo-chart" aria-label="Sales trend chart">
        {weeklyTrend.map((point) => (
          <span
            className="chart-bar"
            style={{ height: `${point.height}%` }}
            key={point.label}
            tabIndex="0"
            aria-label={`${point.label}: ${formatCurrency(point.sales)}, ${point.orders} orders`}
          >
            <i />
            <b className="chart-tooltip">
              <em>{point.label}</em>
              {formatCurrency(point.sales)}
              <small>{point.orders} orders</small>
            </b>
          </span>
        ))}
      </div>
      <div className="chart-footer">
        <b>{formatCurrency(Math.round(totals.sales / 7))}</b>
        <span>{isHistorical ? "average daily sales — historical period" : "average daily sales for selected scope"}</span>
      </div>
    </Panel>
  );

  const commodityMatrixPanel = (
    <Panel 
      eyebrow="Real-Time Procurement Modeling"
      title="Commodity Pricing & Gross Margin Sensitivity"
      action={
        <StatusPill tone={isMarginCritical ? 'danger' : 'success'}>
          {isMarginCritical ? "High Cost Exposure" : "Optimal Margin Range"}
        </StatusPill>
      }
      style={{ gridColumn: role === 'strategy' ? '1 / -1' : 'span 2', borderColor: isMarginCritical ? 'var(--status-danger-fg)' : 'var(--border-subtle)' }}
      key="commodity-matrix"
    >
      {isMarginCritical && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, background: 'var(--status-danger-bg)', border: '1px solid var(--border-subtle)', borderRadius: 8, marginBottom: 16, fontSize: 13, color: 'var(--status-danger-fg)' }}>
          <ShieldAlert size={18} />
          <span><strong>Critical Margin Alert:</strong> Gross margin is under 60% due to commodity inflation. Please review recipe yield metrics and apply menu cost corrections immediately.</span>
        </div>
      )}

      <div className="commodity-matrix-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 20 }}>
        {/* Left Layout Pane: Sliders Input Array */}
        <div className="commodity-left" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="commodity-slider-group" style={{ display: 'grid', gap: 6 }}>
            <label htmlFor="oil-slider" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
              <span>Frying Oil (Commercial)</span>
              <span className="val" style={{ color: 'var(--green)' }}>₹{oilPrice} / L</span>
            </label>
            <input
              id="oil-slider"
              type="range"
              min="110"
              max="220"
              value={oilPrice}
              onChange={(e) => setOilPrice(Number(e.target.value))}
              style={{ accentColor: 'var(--green)' }}
            />
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Standard baseline: ₹165 per Litre</span>
          </div>

          <div className="commodity-slider-group" style={{ display: 'grid', gap: 6 }}>
            <label htmlFor="lpg-slider" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
              <span>LPG Cylinder (19kg Commercial)</span>
              <span className="val" style={{ color: 'var(--green)' }}>₹{lpgPrice}</span>
            </label>
            <input
              id="lpg-slider"
              type="range"
              min="1500"
              max="2500"
              value={lpgPrice}
              onChange={(e) => setLpgPrice(Number(e.target.value))}
              style={{ accentColor: 'var(--green)' }}
            />
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Standard baseline: ₹2000 per Cylinder</span>
          </div>

          <div className="commodity-slider-group" style={{ display: 'grid', gap: 6 }}>
            <label htmlFor="raw-slider" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
              <span>Veg & Protein Raw Cost Shift</span>
              <span className="val" style={{ color: 'var(--green)' }}>{rawCostShift > 0 ? `+${rawCostShift}` : rawCostShift}%</span>
            </label>
            <input
              id="raw-slider"
              type="range"
              min="-15"
              max="45"
              value={rawCostShift}
              onChange={(e) => setRawCostShift(Number(e.target.value))}
              style={{ accentColor: 'var(--green)' }}
            />
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Standard baseline: +15% raw market inflation</span>
          </div>

          <div style={{ marginTop: '10px', background: 'var(--wash)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Projected COGS:</span>
              <strong style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{Math.round(projectedCOGS * 100)}%</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Projected Gross Margin:</span>
              <strong style={{ fontSize: '12px', color: isMarginCritical ? 'var(--text-danger)' : 'var(--text-success)' }}>{Math.round(projectedMargin * 100)}%</strong>
            </div>
          </div>
        </div>

        {/* Right Layout Pane: Recharts ComposedChart */}
        <div className="commodity-right">
          <ResponsiveContainer width="100%" height={230}>
            <ComposedChart
              data={[
                { name: "Current", COGS: Math.round(projectedCOGS * 100), Margin: Math.round(projectedMargin * 100) },
                { name: "Scenario A (+5%)", COGS: Math.min(Math.round(projectedCOGS * 1.05 * 100), 100), Margin: Math.max(Math.round((1 - projectedCOGS * 1.05) * 100), 0) },
                { name: "Scenario B (-5%)", COGS: Math.round(projectedCOGS * 0.95 * 100), Margin: Math.round((1 - projectedCOGS * 0.95) * 100) },
                { name: "Target", COGS: 35, Margin: 65 }
              ]}
              margin={{ top: 10, right: 10, bottom: 5, left: -20 }}
            >
              <XAxis dataKey="name" stroke="var(--muted)" style={{ fontSize: '10px' }} tickLine={false} />
              <YAxis stroke="var(--muted)" style={{ fontSize: '10px' }} tickLine={false} />
              <Tooltip
                contentStyle={{ background: 'var(--panel)', border: '1px solid var(--line)', color: 'var(--ink)' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: 10 }} />
              <Bar dataKey="COGS" name="COGS %" fill="rgba(120, 113, 108, 0.4)" radius={[4, 4, 0, 0]} />
              <Area type="monotone" dataKey="Margin" name="Gross Margin %" fill="rgba(8, 120, 93, 0.15)" stroke="var(--green)" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Panel>
  );

  const leakageFeedbackPanel = (
    <div className="leakage-feedback-panel" key="leakage-feedback" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 20 }}>
      {/* Left Layout Element: Conversion Funnel */}
      <Panel 
        eyebrow="Leakage Analysis" 
        title="Aggregator Channel Conversion Funnel" 
        action={<StatusPill tone="warning">9.2% Drop-off Rate</StatusPill>}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <div style={{ flex: 1, minHeight: 240, marginTop: 12 }}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              layout="vertical"
              data={[
                { stage: "1. Received", count: 1000, fill: "var(--accent-blue)" },
                { stage: "2. Accepted", count: 920, fill: "var(--green)" },
                { stage: "3. Kitchen Cancel", count: 45, fill: "var(--accent-amber)" },
                { stage: "4. Logi Drop-off", count: 12, fill: "var(--accent-coral)" }
              ]}
              margin={{ top: 10, right: 20, bottom: 5, left: 10 }}
            >
              <XAxis type="number" stroke="var(--muted)" style={{ fontSize: '10px' }} />
              <YAxis dataKey="stage" type="category" stroke="var(--muted)" style={{ fontSize: '10px' }} tickLine={false} />
              <Tooltip
                contentStyle={{ background: 'var(--panel)', border: '1px solid var(--line)', color: 'var(--ink)' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Bar dataKey="count" name="Transactions" radius={[0, 4, 4, 0]} fill="var(--accent-blue)">
                {/* Individual segment fills */}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      {/* Right Layout Element: Scrollable Customer Feedback ticker */}
      <Panel 
        eyebrow="Real-Time Reviews Feed" 
        title="Aggregator Customer Sentiment Matrix" 
        action={<StatusPill tone="success">Active Stream</StatusPill>}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <div className="feedback-ticker" style={{ maxHeight: 250, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingRight: 4 }}>
          {[
            { id: "cm-1", user: "Harsh M. (Zomato)", rating: 2, note: "The food arrived extremely cold and was 20 minutes late!", date: "10 min ago" },
            { id: "cm-2", user: "Priya S. (Swiggy)", rating: 1, note: "The chicken patty inside was uncooked and raw in the center! High quality risk.", date: "15 min ago" },
            { id: "cm-3", user: "Vikram K. (Direct)", rating: 5, note: "Outstanding taste! The coffee blend is super aromatic, packed neatly.", date: "25 min ago" },
            { id: "cm-4", user: "Aisha R. (Zomato)", rating: 2, note: "Order got delayed and fries were late and cold.", date: "40 min ago" },
            { id: "cm-5", user: "Rohan D. (Swiggy)", rating: 4, note: "Loved the packing but delivery could have been slightly faster.", date: "1h ago" }
          ].map((review) => {
            // Inline scanner for failure keywords
            const lowerNote = review.note.toLowerCase();
            let badgeText = "";
            let badgeTone = "neutral";
            
            if (lowerNote.includes("cold") || lowerNote.includes("late")) {
              badgeText = "#ColdFood";
              badgeTone = "warning";
            } else if (lowerNote.includes("raw") || lowerNote.includes("uncooked")) {
              badgeText = "#QualityRisk";
              badgeTone = "danger";
            } else if (review.rating >= 4) {
              badgeText = "#Praise";
              badgeTone = "success";
            } else {
              badgeText = "#Standard";
              badgeTone = "neutral";
            }
            
            return (
              <div key={review.id} className="feedback-ticker-card" style={{ padding: 12, border: '1px solid var(--border-subtle)', borderRadius: 8, background: 'var(--wash)' }}>
                <div className="feedback-ticker-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span className="feedback-ticker-card__user" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{review.user}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: '11px', color: 'var(--gold)' }}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                    <Badge tone={badgeTone}>{badgeText}</Badge>
                  </div>
                </div>
                <p className="feedback-ticker-card__content" style={{ margin: '0 0 6px 0', fontSize: 12.5, color: 'var(--text-secondary)' }}>{review.note}</p>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', textAlign: 'right' }}>{review.date}</span>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );

  const mixPanel = (
    <Panel eyebrow="Demand mix" title="Day-part contribution" key="mix">
      <DonutChart total={totals.orders} dayParts={dayParts} />
      <div className="legend-list">
        {dayParts.map((item) => (
          <div key={item.label}>
            <i style={{ background: item.color }} />
            <span>{item.label}</span>
            <b>{item.value}%</b>
          </div>
        ))}
      </div>
    </Panel>
  );

  const summaryPanel = (() => {
    const aggregatorData = [
      { name: "Zomato", value: Math.round(totals.sales * 0.45), color: "#f43f5e" },
      { name: "Swiggy", value: Math.round(totals.sales * 0.35), color: "#f97316" },
      { name: "Direct", value: Math.round(totals.sales * 0.20), color: "#10b981" }
    ];
    const dominantChannel = aggregatorData.reduce((prev, current) => (prev.value > current.value) ? prev : current).name;

    return (
      <div className="graph-summary-panel" aria-label="Graph summary" key="summary" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, gridColumn: '1 / -1' }}>
        <article className="summary-card" style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-card)', boxShadow: 'var(--shadow-card)', display: 'flex', position: 'relative', overflow: 'hidden', padding: 18, borderRadius: 8, gridColumn: 'span 2' }}>
          <span aria-hidden="true" style={{ content: "''", position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(8,120,93,0.10), transparent 54%)", pointerEvents: "none" }} />
          <div style={{ flex: 1, minWidth: 0, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: 4, fontWeight: 900 }}>Sales</span>
              <strong style={{ display: 'block', fontSize: '24px', fontWeight: '800', margin: '2px 0', color: 'var(--text-primary)' }}>{formatCurrency(totals.sales)}</strong>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.3' }}>
              {isHistorical ? "Final EOD revenue" : `${formatCurrency(Math.round(totals.sales / 7))} avg daily`}
            </p>
          </div>
          <div className="aggregator-doughnut-container" style={{ position: 'relative', width: 90, height: 90, marginLeft: 16 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={aggregatorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={28}
                  outerRadius={38}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {aggregatorData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="aggregator-doughnut-overlay" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>
              <strong style={{ color: 'var(--text-primary)', fontWeight: 800 }}>{dominantChannel}</strong>
              <span style={{ color: 'var(--text-muted)', fontSize: 8 }}>Lead</span>
            </div>
          </div>
        </article>
        <SummaryCard
          label={isHistorical ? "Orders Fulfilled" : "Fulfilled"}
          value={fulfilledOrders.toLocaleString("en-IN")}
          detail={`${fulfillmentRate}% of orders completed or closed`}
          tone="blue"
        />
        {!isHistorical ? (
          <SummaryCard
            label="Unfulfilled"
            value={totals.liveQueue.toLocaleString("en-IN")}
            detail={`${delayedOrders} delayed order${delayedOrders === 1 ? "" : "s"} needs attention`}
            tone="amber"
          />
        ) : (
          <SummaryCard
            label="EOD Wastage Est."
            value={`${Math.round(totals.orders * 0.04)} items`}
            detail="Estimated based on historical run-rate"
            tone="amber"
          />
        )}
        <SummaryCard
          label="Est. P&L"
          value={formatCurrency(netPnl)}
          detail={`${averageMargin}% margin after ${formatCurrency(serviceLeakage)} service leakage`}
          tone="purple"
          style={{ gridColumn: 'span 2' }}
        />
      </div>
    );
  })();

  const getOutletHealthStatus = (outlet) => {
    let score = 0;
    if (outlet.stockHealth >= 80) score += 2; else if (outlet.stockHealth >= 65) score += 1;
    if (outlet.margin >= 26) score += 2; else if (outlet.margin >= 22) score += 1;
    if (outlet.nps >= 65) score += 2; else if (outlet.nps >= 55) score += 1;
    if (outlet.growth >= 15) score += 2; else if (outlet.growth >= 8) score += 1;
    if (score >= 7) return { label: "Healthy", color: "var(--green)", cls: "positive" };
    if (score >= 4) return { label: "Watch", color: "var(--orange)", cls: "warning" };
    return { label: "At Risk", color: "var(--red)", cls: "critical" };
  };

  const outletPanel = (
    <Panel 
      eyebrow="Outlet health" 
      title="Performance & Risk Monitor" 
      key="outlet"
      style={{ gridColumn: '1 / -1' }}
      action={!isHistorical && <DSButton variant="link" onClick={() => setActiveView("orders")}>Open orders</DSButton>}
    >
      <div className="outlet-list">
        {[...filteredOutlets]
          .sort((a, b) => b.sales - a.sales)
          .map((outlet, index) => {
            const health = getOutletHealthStatus(outlet);
            return (
              <div className="outlet-row" key={outlet.id} style={{display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderBottom: '1px solid var(--line)'}}>
                <strong style={{minWidth: 20, color: 'var(--muted)', fontSize: 13}}>{index + 1}</strong>
                <div style={{flex: 2, minWidth: 160}}>
                  <b style={{display:'block', color: 'var(--text-primary)'}}>{outlet.name}</b>
                  <span style={{fontSize: 12, color: 'var(--text-muted)'}}>{outlet.area} · {outlet.manager}</span>
                </div>
                <StatusPill tone={health.cls === "positive" ? "success" : health.cls === "warning" ? "warning" : "danger"} style={{ minWidth: 80, justifyContent: 'center' }}>
                  {health.label}
                </StatusPill>
                <div style={{flex: 1, textAlign: 'right'}}>
                  <b style={{display:'block', color: 'var(--text-primary)'}}>{formatCurrency(outlet.sales)}</b>
                  <span style={{fontSize: 12, color: 'var(--green)'}}>+{outlet.growth}% growth</span>
                </div>
                <div style={{flex: 1, textAlign: 'center'}}>
                  <b style={{display:'block', color: 'var(--text-primary)'}}>{outlet.margin}%</b>
                  <span style={{fontSize: 12, color: 'var(--text-muted)'}}>Margin</span>
                </div>
                <div style={{flex: 1, textAlign: 'center'}}>
                  <b style={{display:'block', color: 'var(--text-primary)'}}>{outlet.nps} NPS</b>
                  <span style={{fontSize: 12, color: 'var(--text-muted)'}}>{outlet.rating}★ rating</span>
                </div>
                <div style={{flex: 1, textAlign: 'center'}}>
                  <b style={{display:'block', color: outlet.stockHealth < 70 ? 'var(--status-danger-fg)' : outlet.stockHealth < 80 ? 'var(--status-warning-fg)' : 'var(--text-success)'}}>{outlet.stockHealth}%</b>
                  <span style={{fontSize: 12, color: 'var(--text-muted)'}}>Stock health</span>
                </div>
                <DSButton variant="mini" onClick={() => { setSelectedOutletForInspect(outlet); setInspectModalOpen(true); }}>Inspect</DSButton>
              </div>
            );
          })}
      </div>

      <Modal
        open={inspectModalOpen}
        onClose={() => setInspectModalOpen(false)}
        title={`${selectedOutletForInspect?.name} — Full Health Report`}
        width={640}
        ctaText="Flag for Review"
        onCta={() => toast.success(`${selectedOutletForInspect?.name} flagged for regional review.`)}
      >
        {selectedOutletForInspect && (() => {
          const h = getOutletHealthStatus(selectedOutletForInspect);
          return (
            <div style={{display: 'grid', gap: 16}}>
              <div style={{display:'flex', alignItems:'center', gap: 12, padding: '10px 14px', background: 'var(--wash)', borderRadius: 8, marginBottom: 4, border: '1px solid var(--border-subtle)'}}>
                <StatusPill tone={h.cls === "positive" ? "success" : h.cls === "warning" ? "warning" : "danger"}>{h.label}</StatusPill>
                <span style={{fontSize: 13, color: 'var(--text-muted)'}}>Composite health score across stock, margin, NPS, and growth</span>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))', gap: 12}}>
                <Metric title="Net Sales" value={formatCurrency(selectedOutletForInspect.sales)} change={`+${selectedOutletForInspect.growth}% growth`} accent="green" />
                <Metric title="Net Margin" value={`${selectedOutletForInspect.margin}%`} change="After COGS & labour" accent="purple" />
                <Metric title="Customer NPS" value={`${selectedOutletForInspect.nps}`} change={`${selectedOutletForInspect.rating}★ avg rating`} accent="blue" />
                <Metric title="Stock Health" value={`${selectedOutletForInspect.stockHealth}%`} change={selectedOutletForInspect.stockHealth < 70 ? "⚠️ Critical — reorder now" : selectedOutletForInspect.stockHealth < 80 ? "Low — monitor closely" : "Adequate"} accent={selectedOutletForInspect.stockHealth < 70 ? "red" : selectedOutletForInspect.stockHealth < 80 ? "orange" : "green"} />
                <Metric title="Avg. Prep Time" value={`${selectedOutletForInspect.prep} min`} change="Target: 18 min" accent={selectedOutletForInspect.prep > 20 ? "red" : "green"} />
                <Metric title="Labor Efficiency" value={`${selectedOutletForInspect.labor}%`} change="Orders/staff ratio" accent={selectedOutletForInspect.labor < 85 ? "orange" : "green"} />
              </div>
              <div style={{background: 'var(--wash)', padding: '12px 14px', borderRadius: 8, fontSize: 13, color: 'var(--text-muted)', border: '1px solid var(--border-subtle)'}}>
                <b style={{color: 'var(--text-primary)', display:'block', marginBottom: 4}}>Manager on Duty</b>
                {selectedOutletForInspect.manager} · {selectedOutletForInspect.area} · {selectedOutletForInspect.staff} staff active · {selectedOutletForInspect.reservations} reservations today
              </div>
            </div>
          );
        })()}
      </Modal>
    </Panel>
  );


  const renderOpsTelemetryBanner = () => {
    if (showChef) {
      return (
        <div style={{ background: 'linear-gradient(135deg, rgba(8,120,93,0.04) 0%, rgba(58,91,220,0.04) 100%)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '14px 16px', margin: '4px 0 12px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--green)' }}>Live Kitchen SLA Compliance</span>
            <span style={{ fontSize: '12px', fontWeight: '850', color: 'var(--green)' }}>94.8% (Target: 92%)</span>
          </div>
          <div style={{ width: '100%', height: 6, background: 'var(--line)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: '94.8%', height: '100%', background: 'var(--green)', borderRadius: 3 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10, marginTop: 2 }}>
            {[
              { label: "Avg Prep Speed", val: "17.2 mins", detail: "target 18 mins", color: "var(--blue)" },
              { label: "Active Prep Load", val: "143 tickets", detail: "86% capacity", color: "var(--amber)" },
              { label: "Busiest Station", val: "Grill Station", detail: "42% order share", color: "var(--purple)" },
              { label: "Chef Brigade", val: "4 Active", detail: "100% on duty", color: "var(--green)" }
            ].map((item) => (
              <div key={item.label} style={{ background: 'var(--surface-card)', padding: '10px', borderRadius: 6, border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>{item.label}</span>
                <strong style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text-primary)', display: 'block' }}>{item.val}</strong>
                <span style={{ fontSize: '9px', color: item.color, fontWeight: '700' }}>{item.detail}</span>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      const activeCount = criticalAlerts.length;
      return (
        <div style={{ background: 'linear-gradient(135deg, rgba(240,167,47,0.04) 0%, rgba(58,91,220,0.04) 100%)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '14px 16px', margin: '4px 0 12px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: activeCount > 0 ? 'var(--amber)' : 'var(--green)' }}>Overall Inventory Health</span>
            <span style={{ fontSize: '12px', fontWeight: '850', color: activeCount > 0 ? 'var(--amber)' : 'var(--green)' }}>{activeCount > 0 ? '92.4% (Attention needed)' : '100% (All optimal)'}</span>
          </div>
          <div style={{ width: '100%', height: 6, background: 'var(--line)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${Math.max(60, 100 - activeCount * 8)}%`, height: '100%', background: activeCount > 0 ? 'var(--amber)' : 'var(--green)', borderRadius: 3 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10, marginTop: 2 }}>
            {[
              { label: "Procurement Index", val: "92.4%", detail: "target 95%", color: "var(--blue)" },
              { label: "Active shortages", val: `${activeCount} items`, detail: activeCount > 0 ? "reorder in progress" : "all optimal", color: activeCount > 0 ? "var(--coral)" : "var(--green)" },
              { label: "Inbound supply", val: "3 pending", detail: "deliveries today", color: "var(--amber)" },
              { label: "Auto-reorder status", val: "Active", detail: "automated sync", color: "var(--green)" }
            ].map((item) => (
              <div key={item.label} style={{ background: 'var(--surface-card)', padding: '10px', borderRadius: 6, border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>{item.label}</span>
                <strong style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text-primary)', display: 'block' }}>{item.val}</strong>
                <span style={{ fontSize: '9px', color: item.color, fontWeight: '700' }}>{item.detail}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  const opsPanel = (
    <Panel 
      eyebrow={showChef ? "Kitchen control" : "Priority queue"} 
      title={showChef ? "Station performance" : "Action required"} 
      key="ops"
      action={<StatusPill tone="danger">{criticalAlerts.length} open</StatusPill>}
      style={{ gridColumn: (role === 'regional' || role === 'chef') ? '1 / -1' : 'span 2', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 12, height: '100%' }}
    >
      {renderOpsTelemetryBanner()}
      <div className="action-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 12 }}>
        {(showChef ? chefs : criticalAlerts).map((item) => (
          <div className="action-item" key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', border: '1px solid var(--border-subtle)', borderRadius: 8, background: 'var(--wash)' }}>
            <span className={showChef ? "status-dot good" : "status-dot alert"} style={{ width: 8, height: 8, borderRadius: '50%', background: showChef ? 'var(--green)' : 'var(--status-danger-fg)' }} />
            <div style={{ flex: 1 }}>
              <b style={{ display: 'block', fontSize: 13.5, color: 'var(--text-primary)' }}>{showChef ? item.name : item.item}</b>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {showChef
                  ? `${item.station} - ${item.prep} min prep - ${item.tickets} tickets`
                  : `${item.outlet} - ${item.level}% stock - reorder ${item.reorder}`}
              </span>
            </div>
            {!showChef && (
              <DSButton variant="mini" onClick={() => setDismissedAlerts((current) => [...current, item.id])}>
                Done
              </DSButton>
            )}
          </div>
        ))}
        {!showChef && criticalAlerts.length === 0 && <p className="empty-state" style={{ gridColumn: '1 / -1', color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', padding: 20 }}>All visible alerts are reviewed.</p>}
      </div>
    </Panel>
  );

  const ordersPanel = (
    <Panel 
      eyebrow="Live service" 
      title="Order queue" 
      key="orders"
      action={<DSButton variant="link" onClick={() => setActiveView("orders")}>Manage queue</DSButton>}
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
    >
      <div className="compact-orders" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {scopedOrders.slice(0, 3).map((order) => {
          const isSlaBreached = order.elapsedTime && order.targetSlaTime && (order.elapsedTime > order.targetSlaTime);
          return (
            <div key={order.id} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '14px', borderRadius: 8, border: isSlaBreached ? '1px solid var(--status-danger-fg)' : '1px solid var(--border-subtle)', background: 'var(--surface-card)', boxShadow: 'var(--shadow-card)', transition: 'all 0.3s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className={`order-status ${order.status.toLowerCase()}`} />
                  <b style={{ color: 'var(--text-primary)' }}>{order.id}</b>
                </div>
                <strong style={{ color: 'var(--text-primary)' }}>{order.eta}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>{order.outlet} · {order.items} items</p>
                {isSlaBreached && (
                  <Button 
                    variant="destructive" 
                    size="xs"
                    onClick={() => toast.error(`SLA Alert! Order ${order.id} escalated to Floor Manager.`)}
                  >
                    Escalate
                  </Button>
                )}
              </div>
              
              {/* Stacked KDS Department Track */}
              <div className="kds-track">
                {(() => {
                  let s1 = "queue", s2 = "queue", s3 = "queue";
                  if (order.status === "Preparing" || order.status === "Cooking") {
                    s1 = "active";
                  } else if (order.status === "Delayed") {
                    s1 = "finished";
                    s2 = "active";
                  } else if (order.status === "Ready") {
                    s1 = "finished";
                    s2 = "finished";
                    s3 = "active";
                  } else {
                    s1 = "finished";
                    s2 = "finished";
                    s3 = "finished";
                  }
                  return (
                    <>
                      <div className={`kds-segment kds-segment--${s1}`}>Fryer</div>
                      <div className={`kds-segment kds-segment--${s2}`}>Prep</div>
                      <div className={`kds-segment kds-segment--${s3}`}>Pack</div>
                    </>
                  );
                })()}
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );

  const strategyPanel = role === "strategy" ? (
    <div key="strategy" style={{ gridColumn: '1 / -1' }}>
      <StrategyPanel />
    </div>
  ) : null;

  const demographicsPanel = role === "strategy" || role === "regional" ? (
    <div key="demographics" style={{ gridColumn: '1 / -1' }}>
      <DemographicsPanel />
    </div>
  ) : null;

  const pricingExperimentsPanel = role === "strategy" ? (
    <div key="pricing" style={{ gridColumn: '1 / -1' }}>
      <PricingExperimentsPanel />
    </div>
  ) : null;

  const viralMarketingPanel = role === "strategy" ? (
    <div key="viralMarketing" style={{ gridColumn: '1 / -1' }}>
      <ViralMarketingPanel />
    </div>
  ) : null;

  const chefPanel = role === "chef" ? (
    <div key="chefInfo" style={{ gridColumn: '1 / -1' }}>
      <ChefPanel />
    </div>
  ) : null;

  const regionalPanel = role === "regional" ? (
    <div key="regionalInfo" style={{ gridColumn: '1 / -1' }}>
      <RegionalPanel />
    </div>
  ) : null;

  const restaurantPanel = role === "restaurant" ? (
    <div key="restaurantInfo" style={{ gridColumn: '1 / -1' }}>
      <RestaurantPanel />
    </div>
  ) : null;

  const menuPerformancePanel = role === "chef" ? (
    <div key="menuPerf" style={{ gridColumn: '1 / -1' }}>
      <MenuPerformancePanel />
    </div>
  ) : null;

  const staffFloorPanel = role === "restaurant" ? (
    <div key="staffFloor" style={{ gridColumn: 'span 2', height: '100%' }}>
      <StaffFloorPanel />
    </div>
  ) : null;

  const compliancePanel = role === "regional" ? (
    <div key="compliance" style={{ gridColumn: 'span 1', height: '100%' }}>
      <CompliancePanel />
    </div>
  ) : null;

  const vendorPerformancePanel = role === "restaurant" ? (
    <div key="vendorPerformance" style={{ gridColumn: isHistorical ? '1 / -1' : 'span 1', height: '100%' }}>
      <VendorPerformancePanel />
    </div>
  ) : null;

  const workforceManagementPanel = role === "regional" ? (
    <div key="workforceManagement" style={{ gridColumn: 'span 2', height: '100%' }}>
      <WorkforceManagementPanel setActiveView={setActiveView} />
    </div>
  ) : null;

  const renderSection = (title, description, panels) => {
    const activePanels = panels.filter(panel => panel !== null && panel !== undefined && panel !== false);
    if (activePanels.length === 0) return null;
    return (
      <div className="ia-section-group" key={title}>
        <div className="ia-section-header">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="dashboard-grid">
          {activePanels}
        </div>
      </div>
    );
  };

  let layoutContent = null;
  
  if (role === "strategy") {
    layoutContent = (
      <>
        {metricRow}
        {renderSection("Strategic Growth & Market Intelligence", "Analyze brand metrics, viral campaigns, demographic trends, and experiments.", [
          demographicsPanel,
          !isHistorical && viralMarketingPanel,
          !isHistorical && strategyPanel,
          pricingExperimentsPanel
        ])}
        {renderSection("Financial Analytics & Commodity Sensitivity", "Real-time pricing sensitivities, demand mix distribution, and margin projections.", [
          chartPanel,
          mixPanel,
          commodityMatrixPanel,
          leakageFeedbackPanel
        ])}
      </>
    );
  } else if (role === "chef") {
    layoutContent = (
      <>
        {metricRow}
        {renderSection("Kitchen Control & Menu Performance", "Chefs active stations, quality scorecards, and best-selling menu performance.", [
          !isHistorical && chefPanel,
          menuPerformancePanel
        ])}
        {renderSection("Live Service Queue & Station Alerts", "Active station priorities, stock reorder alerts, and kitchen sub-assembly tickets.", [
          !isHistorical && opsPanel
        ])}
      </>
    );
  } else if (role === "restaurant") {
    layoutContent = (
      <>
        {metricRow}
        {renderSection("Floor Operations & Workforce Controls", "Outlet operating metrics, active staff efficiency on shift, and supply logistics.", [
          restaurantPanel,
          !isHistorical && staffFloorPanel,
          vendorPerformancePanel
        ])}
        {renderSection("Live Queue & Priority Alerts", "Active customer orders, station priorities, and SLA escalation alerts.", [
          !isHistorical && opsPanel,
          !isHistorical && ordersPanel
        ])}
        {renderSection("Revenue Performance & Sales Trends", "Gross sales trends, localized day-part demand mix, and aggregated channel statistics.", [
          chartPanel,
          mixPanel,
          summaryPanel
        ])}
        {renderSection("Aggregator Channel Analytics & Sentiment Loop", "Operational conversion leaks and public feedback loops ticker.", [
          leakageFeedbackPanel
        ])}
      </>
    );
  } else {
    // regional (default)
    layoutContent = (
      <>
        {metricRow}
        {renderSection("Regional Command & Compliance Hub", "Multi-outlet health summary, shift rosters, and regulatory compliance checks.", [
          regionalPanel,
          workforceManagementPanel,
          compliancePanel
        ])}
        {renderSection("Financial Analytics & Sales Trends", "Gross sales trends and localized day-part demand mix across all outlets.", [
          chartPanel,
          mixPanel,
          summaryPanel
        ])}
        {renderSection("Ranked Branch Performance Monitor", "Ranked outlet performance monitor, priority reorders, and stock health audits.", [
          outletPanel
        ])}
      </>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
      {layoutContent}
    </div>
  );
}

function Metric({ title, value, change, accent }) {
  return (
    <MetricCard
      label={title}
      value={value}
      change={change}
      accent={accent}
    />
  );
}

function SummaryCard({ label, value, detail, tone, style }) {
  return (
    <DSummaryCard
      label={label}
      value={value}
      detail={detail}
      tone={tone}
      style={style}
    />
  );
}

function DonutChart({ total, dayParts }) {
  const [activeSlice, setActiveSlice] = useState(null);
  let offset = 0;
  const active = activeSlice ?? { label: "Total", value: 100, orders: total, revenue: dayParts.reduce((sum, item) => sum + item.revenue, 0) };

  return (
    <div className="donut-chart" onMouseLeave={() => setActiveSlice(null)}>
      <svg viewBox="0 0 100 100" role="img" aria-label="Day-part contribution chart">
        <circle className="donut-chart__track" cx="50" cy="50" r="38" />
        {dayParts.map((item) => {
          const segmentOffset = offset;
          offset += item.value;
          return (
            <circle
              className={activeSlice?.label === item.label ? "donut-chart__slice active" : "donut-chart__slice"}
              cx="50"
              cy="50"
              r="38"
              key={item.label}
              pathLength="100"
              stroke={item.color}
              strokeDasharray={`${item.value} ${100 - item.value}`}
              strokeDashoffset={-segmentOffset}
              tabIndex="0"
              onFocus={() => setActiveSlice(item)}
              onMouseEnter={() => setActiveSlice(item)}
              aria-label={`${item.label}: ${item.value}%, ${item.orders} orders, ${formatCurrency(item.revenue)}`}
            />
          );
        })}
      </svg>
      <div className="donut-chart__center">
        <strong>{activeSlice ? `${active.value}%` : total}</strong>
        <span>{activeSlice ? active.label : "orders"}</span>
      </div>
      <div className="donut-tooltip">
        <b>{active.label}</b>
        <span>{active.orders} orders</span>
        <span>{formatCurrency(active.revenue)}</span>
      </div>
    </div>
  );
}

function Meter({ value, label }) {
  return <MiniMeter value={value} label={label} suffix={`${value}%`} />;
}

function Orders({ orders, role, updateOrderStatus }) {
  const { outlets, inventory, chefs, liveOrders, feedback, campaigns, viralCampaigns, weeklyTrend, dayParts } = useDashboardData();
  const [showRunnerModal, setShowRunnerModal] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");

  return (
    <Panel style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Live orders</p>
          <h2>Kitchen and delivery queue</h2>
        </div>
        {role !== "chef" && (
          <DSButton variant="secondary" onClick={() => setShowRunnerModal(true)}>Assign runner</DSButton>
        )}
      </div>
      <div className="order-board">
        {orders.map((order) => {
          const isSlaBreached = order.elapsedTime && order.targetSlaTime && (order.elapsedTime > order.targetSlaTime);
          const tone = order.status === "Ready" ? "success" : (order.status === "Preparing" || order.status === "Cooking") ? "info" : (order.status === "Delayed" || order.status === "Critical") ? "danger" : "neutral";
          return (
            <article className={`order-card ${isSlaBreached ? "order-card--escalated" : ""}`} key={order.id} style={{display: 'flex', flexDirection: 'column', gap: 8}}>
              <div className="order-card__top">
                <div>
                  <strong>{order.id}</strong>
                  <span>{order.customer}</span>
                </div>
                <StatusPill tone={tone}>{order.status}</StatusPill>
              </div>
              <div className="order-card__meta">
                <span>{order.outlet}</span>
                <span>{order.channel}</span>
                <span>{order.items} items</span>
              </div>
              
              {/* Stacked KDS Department Track */}
              <div className="kds-track" style={{ marginBottom: 4 }}>
                {(() => {
                  let s1 = "queue", s2 = "queue", s3 = "queue";
                  if (order.status === "Preparing" || order.status === "Cooking") {
                    s1 = "active";
                  } else if (order.status === "Delayed") {
                    s1 = "finished";
                    s2 = "active";
                  } else if (order.status === "Ready") {
                    s1 = "finished";
                    s2 = "finished";
                    s3 = "active";
                  } else {
                    s1 = "finished";
                    s2 = "finished";
                    s3 = "finished";
                  }
                  return (
                    <>
                      <div className={`kds-segment kds-segment--${s1}`}>Fry Station</div>
                      <div className={`kds-segment kds-segment--${s2}`}>Prep Assembly</div>
                      <div className={`kds-segment kds-segment--${s3}`}>Packaging Counter</div>
                    </>
                  );
                })()}
              </div>

              {isSlaBreached && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f87171', fontSize: 11, fontWeight: 700, padding: '4px 8px', background: 'rgba(239,68,68,0.06)', borderRadius: 6 }}>
                  <ShieldAlert size={14} />
                  <span>SLA Breached ({order.elapsedTime}m / {order.targetSlaTime}m limit)</span>
                </div>
              )}

              <div className="order-card__bottom" style={{ borderTop: '1px dashed var(--line)', paddingTop: 10, marginTop: 'auto' }}>
                <div>
                  <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>ETA Remaining</span>
                  <b>{order.eta}</b>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>Ticket Value</span>
                  <p style={{ margin: 0, fontWeight: 700, color: 'var(--green)' }}>{formatCurrency(order.value)}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <DSButton variant="mini" style={{ flex: 1 }} onClick={() => { setSelectedOrder(order); setSelectedAction(role === 'chef' ? 'Ready' : 'Ready'); setActionModalOpen(true); }}>
                  {role === 'chef' ? 'Update Status' : 'Manage Order'}
                </DSButton>
                {isSlaBreached && (
                  <Button 
                    variant="destructive" 
                    size="xs"
                    onClick={() => toast.error(`SLA Alert! Order ${order.id} escalated to Floor Manager.`)}
                  >
                    Escalate to Floor
                  </Button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <Modal 
        isOpen={showRunnerModal} 
        onClose={() => setShowRunnerModal(false)}
        title="Assign Delivery Runner"
        ctaText="Dispatch"
        onCtaClick={() => toast.success("Runner dispatched! Tracking link sent to customer.")}
      >
        <FieldSelect
          label="Select Order"
          style={{ marginBottom: 16 }}
        >
          {orders.filter(o => o.channel === 'Delivery' && o.status !== 'Delivered').map(o => (
            <option key={o.id}>{o.id} - {o.customer}</option>
          ))}
        </FieldSelect>
        <FieldSelect
          label="Available Runner"
          style={{ marginBottom: 16 }}
        >
          <option>Ramesh K. (1 min away)</option>
          <option>Suresh M. (At outlet)</option>
          <option>Karan S. (Returning in 4m)</option>
        </FieldSelect>
        <p style={{color: 'var(--muted)', fontSize: 13}}>Assigning a runner will notify them via the partner app immediately.</p>
      </Modal>

      <Modal 
        isOpen={actionModalOpen} 
        onClose={() => setActionModalOpen(false)}
        title={`${role === 'chef' ? 'Kitchen Action' : 'Manage Order'} - ${selectedOrder?.id}`}
        ctaText={role === 'chef' ? 'Confirm Action' : 'Confirm Action'}
        onCtaClick={() => {
          if (selectedAction) updateOrderStatus(selectedOrder?.id, selectedAction);
          setActionModalOpen(false);
        }}
      >
        <p style={{marginBottom: 16, fontWeight: 500}}>{selectedOrder?.customer} • {selectedOrder?.items} items</p>
        <FieldSelect
          label="Action Type"
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
          style={{ marginBottom: 16 }}
        >
          {role === 'chef' ? (
            <>
              <option value="Ready">Mark as Prepared (Ready)</option>
              <option value="Cooking">Mark as Cooking</option>
              <option value="Delayed">Report Delayed (+5m)</option>
            </>
          ) : (
            <>
              <option value="Ready">Mark as Ready</option>
              <option value="Delivered">Mark as Delivered</option>
              <option value="Cancelled">Cancel Order</option>
            </>
          )}
        </FieldSelect>
      </Modal>
    </Panel>
  );
}

function Inventory({ items, role }) {
  const { outlets, inventory, chefs, liveOrders, feedback, campaigns, viralCampaigns, weeklyTrend, dayParts } = useDashboardData();
  const inventoryValue = items.reduce((sum, item) => sum + item.value, 0);
  const [showPoModal, setShowPoModal] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <Panel style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Inventory</p>
          <h2>Stock control center</h2>
        </div>
        {role !== "chef" && (
          <DSButton variant="secondary" onClick={() => setShowPoModal(true)}>Create purchase order</DSButton>
        )}
      </div>
      <div className="inventory-summary">
        <Metric title="Inventory value" value={formatCurrency(inventoryValue)} change="selected scope" accent="green" />
        <Metric title="Critical items" value={items.filter((item) => item.status === "Critical").length} change="must reorder today" accent="coral" />
        <Metric title="Watch list" value={items.filter((item) => item.status === "Watch").length} change="below par level" accent="amber" />
      </div>
      <div className="data-table">
        <div className="table-head inventory-head" style={{gridTemplateColumns: '2fr 1.5fr 1.5fr 2fr 1fr 1fr 1fr'}}>
          <span>Item</span>
          <span>Outlet</span>
          <span>Supplier</span>
          <span>Stock</span>
          <span>Status</span>
          <span>Reorder</span>
          <span>Actions</span>
        </div>
        {items.map((item) => {
          const tone = item.status === "Healthy" ? "success" : item.status === "Watch" ? "warning" : "danger";
          return (
            <div className="table-row inventory-row" key={`${item.item}-${item.outlet}`} style={{gridTemplateColumns: '2fr 1.5fr 1.5fr 2fr 1fr 1fr 1fr', alignItems: 'center'}}>
              <span>
                <b>{item.item}</b>
                <small>{item.category}</small>
              </span>
              <span>{item.outlet}</span>
              <span>{item.supplier}</span>
              <span>
                <Meter value={item.level} label={`${item.level}%`} />
                <small>Par {item.par} {item.unit}</small>
              </span>
              <StatusPill tone={tone}>{item.status}</StatusPill>
              <span>{item.reorder}</span>
              <DSButton variant="mini" onClick={() => { setSelectedItem(item); setAuditModalOpen(true); }}>Audit</DSButton>
            </div>
          );
        })}
      </div>

      <Modal 
        isOpen={showPoModal} 
        onClose={() => setShowPoModal(false)}
        title="Create Purchase Order"
        ctaText="Send to Supplier"
        onCtaClick={() => toast.success("Purchase Order created and sent to supplier!")}
      >
        <FieldSelect
          label="Item to Restock"
          style={{ marginBottom: 16 }}
        >
          {items.map(i => (
            <option key={i.id}>{i.item} ({i.outlet}) - Current: {i.level}%</option>
          ))}
        </FieldSelect>
        <label className="field" style={{marginBottom: 16, display: 'grid', gap: 6}}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Order Quantity</span>
          <input type="number" defaultValue={50} style={{width: '100%', border: '1px solid var(--border-subtle)', background: 'var(--input-bg)', color: 'var(--text-primary)', padding: '10px 14px', borderRadius: 8, outline: 'none', fontFamily: 'var(--font-sans)'}} />
        </label>
        <p style={{color: 'var(--muted)', fontSize: 13}}>This PO will be sent directly to the registered supplier's portal.</p>
      </Modal>

      <Modal 
        isOpen={auditModalOpen} 
        onClose={() => setAuditModalOpen(false)}
        title={`Audit Stock: ${selectedItem?.item}`}
        ctaText="Submit Audit"
        onCtaClick={() => toast.success(`Stock audit submitted for ${selectedItem?.item} at ${selectedItem?.outlet}`)}
      >
        <p style={{marginBottom: 16}}>Current System Level: <strong>{selectedItem?.level}%</strong> at {selectedItem?.outlet}</p>
        <FieldSelect
          label="Action"
          style={{ marginBottom: 16 }}
        >
          <option>Log Manual Count</option>
          <option>Request Emergency Transfer</option>
          <option>Report Spoilage</option>
        </FieldSelect>
        <label className="field" style={{marginBottom: 16, display: 'grid', gap: 6}}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Actual Quantity ({selectedItem?.unit})</span>
          <input type="number" placeholder={`Par is ${selectedItem?.par}`} style={{width: '100%', border: '1px solid var(--border-subtle)', background: 'var(--input-bg)', color: 'var(--text-primary)', padding: '10px 14px', borderRadius: 8, outline: 'none', fontFamily: 'var(--font-sans)'}} />
        </label>
      </Modal>
    </Panel>
  );
}

function Feedback({ selectedOutlet, searchQuery }) {
  const { outlets, feedback } = useDashboardData();
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  
  const filterByQuery = (item) => !searchQuery || JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase());
  const outletName = outlets.find((outlet) => outlet.id === selectedOutlet)?.name;
  const visibleFeedback = (selectedOutlet === "all" ? feedback : feedback.filter((entry) => entry.outlet === outletName)).filter(filterByQuery);

  return (
    <Panel eyebrow="Customer loop" title="Structured feedback">
      <div className="feedback-list" style={{ display: 'grid', gap: 16 }}>
        {visibleFeedback.map((entry) => (
          <article className="feedback-item" key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid var(--border-subtle)', borderRadius: 8, background: 'var(--surface-card)', boxShadow: 'var(--shadow-card)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                <strong style={{ color: 'var(--text-primary)' }}>{entry.user}</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 600 }}>{entry.type} — {entry.outlet}</span>
              </div>
              <p style={{ margin: '0 0 12px 0', fontSize: 13.5, color: 'var(--text-secondary)' }}>{entry.note}</p>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ width: 140 }}>
                  <MiniMeter value={entry.sentiment} label="Sentiment" suffix={`${entry.sentiment}%`} />
                </div>
                <StatusPill tone={entry.rating <= 3 ? "warning" : "success"}>
                  {entry.rating}.0 / {entry.tag}
                </StatusPill>
              </div>
            </div>
            <DSButton variant="mini" style={{ marginLeft: 16 }} onClick={() => { setSelectedFeedback(entry); setReplyModalOpen(true); }}>Reply via SMS</DSButton>
          </article>
        ))}
      </div>

      <Modal 
        open={replyModalOpen} 
        onClose={() => setReplyModalOpen(false)}
        title={`Message ${selectedFeedback?.user}`}
        ctaText="Send SMS"
        onCta={() => toast.success(`Message sent to ${selectedFeedback?.user}!`)}
      >
        <label className="field" style={{marginBottom: 16, display: 'grid', gap: 6}}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Feedback Received</span>
          <div style={{padding: 12, background: 'var(--wash)', borderRadius: 8, fontSize: 13, border: '1px solid var(--border-subtle)', color: 'var(--text-primary)'}}>
            "{selectedFeedback?.note}"
          </div>
        </label>
        <label className="field" style={{marginBottom: 16, display: 'grid', gap: 6}}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Your Reply</span>
          <textarea rows={4} defaultValue={`Hi ${(selectedFeedback?.user?.split(' ') || [])[0] || ''}, thank you for your feedback regarding your recent ${selectedFeedback?.type?.toLowerCase() || 'order'}.`} style={{width: '100%', border: '1px solid var(--border-subtle)', background: 'var(--surface-inset)', color: 'var(--text-primary)', padding: '10px 14px', borderRadius: 8, resize: 'vertical', fontFamily: 'var(--font-sans)', outline: 'none'}} />
        </label>
        <p style={{color: 'var(--text-muted)', fontSize: 13}}>This message will be sent as an SMS to the customer's registered phone number.</p>
      </Modal>
    </Panel>
  );
}

function DemographicsPanel() {
  return (
    <Panel eyebrow="Market Insights" title="Pricing & Demographics">
      <div className="dashboard-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 16}}>
        <DSummaryCard 
          label="Central Square" 
          value="28 - 35 yrs" 
          detail="Highly receptive to premium pricing. 40% of sales from High-Income bracket." 
          tone="blue" 
        />
        <DSummaryCard 
          label="Campus Gate" 
          value="18 - 24 yrs" 
          detail="Extremely price sensitive. Combo deals drive 65% of overall volume." 
          tone="green" 
        />
        <DSummaryCard 
          label="Lake Road" 
          value="25 - 45 yrs" 
          detail="Family oriented. Weekend reservations account for 55% of weekly revenue." 
          tone="purple" 
        />
      </div>
    </Panel>
  );
}

function StrategyPanel() {
  const { campaigns } = useDashboardData();
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  return (
    <Panel eyebrow="Marketing and pricing" title="Recommended moves">
      <div className="campaign-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 16}}>
        {campaigns.map((campaign) => (
          <div key={campaign.name} style={{display: 'flex', flexDirection: 'column', gap: 10, padding: 16, border: '1px solid var(--border-subtle)', borderRadius: 8, background: 'var(--surface-card)', boxShadow: 'var(--shadow-card)'}}>
            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{campaign.outlet}</span>
            <strong style={{fontSize: 16, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', fontWeight: 800}}>{campaign.name}</strong>
            <p style={{color: 'var(--text-success)', fontWeight: 800, fontSize: 14, margin: 0}}>{campaign.impact}</p>
            <MiniMeter value={campaign.confidence} label="Confidence" suffix={`${campaign.confidence}%`} />
            <DSButton variant="secondary" style={{marginTop: 'auto', alignSelf: 'flex-start'}} onClick={() => { setSelectedStrategy(campaign); setStrategyModalOpen(true); }}>Plan Strategy</DSButton>
          </div>
        ))}
      </div>

      <Modal 
        open={strategyModalOpen} 
        onClose={() => setStrategyModalOpen(false)}
        title={`Plan: ${selectedStrategy?.name}`}
        ctaText="Approve Strategy"
        onCta={() => toast.success(`Strategy approved! Tasks assigned to ${selectedStrategy?.outlet} managers.`)}
      >
        <p style={{marginBottom: 16, fontSize: 15, fontWeight: 700, color: 'var(--text-primary)'}}>Projected Impact: {selectedStrategy?.impact}</p>
        <ul style={{paddingLeft: 20, marginBottom: 24, fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6}}>
          {selectedStrategy?.strategyDetails?.map((detail, idx) => (
            <li key={idx} style={{marginBottom: 8}}>{detail}</li>
          ))}
        </ul>
        <p style={{color: 'var(--text-muted)', fontSize: 13}}>Approving this strategy will automatically assign tasks to the respective outlet managers.</p>
      </Modal>
    </Panel>
  );
}

function PricingExperimentsPanel() {
  return (
    <Panel eyebrow="A/B Testing & Analysis" title="Pricing Experiments">
      <div className="dashboard-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 16}}>
        <DSummaryCard 
          label="Cold Brew Premium Pricing" 
          value="+18% Margin Gain" 
          detail="Test at Campus Gate: Increasing cold brew price by ₹20 resulted in only a 2% drop in volume. Strong margin opportunity to roll out globally." 
          tone="purple" 
        />
        <DSummaryCard 
          label="Burger Combo Discount" 
          value="-5% Revenue Impact" 
          detail="Test at Lake Road: Discounting the burger combo by 15% failed to drive enough volume to offset the margin loss. Revert recommended." 
          tone="amber" 
        />
        <DSummaryCard 
          label="Weekend Dessert Add-on" 
          value="+22% Attachment Rate" 
          detail="Test at Central Square: Offering a ₹100 mini-dessert add-on at checkout increased average order value significantly on weekends." 
          tone="green" 
        />
      </div>
    </Panel>
  );
}

function ViralMarketingPanel() {
  const { viralCampaigns } = useDashboardData();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  return (
    <Panel eyebrow="Growth & Scaling" title="Viral Marketing & Ad Campaigns">
      <div className="dashboard-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 16}}>
        {viralCampaigns.map((camp) => (
          <DSummaryCard 
            key={camp.id} 
            label={camp.name} 
            value={camp.metric} 
            detail={camp.summary} 
            tone={camp.color}
          >
            <DSButton variant="secondary" style={{marginTop: 16, alignSelf: 'flex-start'}} onClick={() => { setSelectedCampaign(camp); setModalOpen(true); }}>
              View Strategy Details
            </DSButton>
          </DSummaryCard>
        ))}
      </div>

      <Modal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        title={selectedCampaign?.name}
        ctaText="Approve & Deploy"
        onCta={() => toast.success(`${selectedCampaign?.name} deployed successfully to marketing platforms!`)}
      >
        <div style={{display: 'grid', gap: 16, marginBottom: 24}}>
          <MetricCard title="KPI" value={selectedCampaign?.metric?.split(': ')[1] || selectedCampaign?.metric} change={selectedCampaign?.metric?.split(': ')[0]} tone={selectedCampaign?.color} />
        </div>
        <div style={{background: 'var(--wash)', padding: 16, borderRadius: 8, marginBottom: 16, border: '1px solid var(--border-subtle)'}}>
          <h4 style={{fontSize: 14, marginBottom: 8, color: 'var(--text-primary)', fontWeight: 800, fontFamily: 'var(--font-serif)'}}>The Offer & Details</h4>
          <p style={{fontSize: 13.5, color: 'var(--text-secondary)', whiteSpace: 'pre-line', margin: 0, lineHeight: 1.5}}>{selectedCampaign?.details}</p>
        </div>
        <div style={{background: 'var(--wash)', padding: 16, borderRadius: 8, border: '1px solid var(--border-subtle)'}}>
          <h4 style={{fontSize: 14, marginBottom: 8, color: 'var(--text-primary)', fontWeight: 800, fontFamily: 'var(--font-serif)'}}>Expected Outcome</h4>
          <p style={{fontSize: 13.5, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5}}>{selectedCampaign?.metrics}</p>
        </div>
      </Modal>
    </Panel>
  );
}

function ChefPanel() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Panel 
      eyebrow="Kitchen Consistency & Supply" 
      title="Morning Briefing"
      action={<DSButton variant="secondary" onClick={() => setModalOpen(true)}>Log Quality Check</DSButton>}
    >
      <div className="dashboard-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 16, marginTop: 8}}>
        <DSummaryCard 
          label="Prep Station" 
          value="94% Consistency" 
          detail="Slight variance in vegetable cut sizes reported yesterday. Monitor today." 
          tone="blue" 
        />
        <DSummaryCard 
          label="Grill Station" 
          value="98% Consistency" 
          detail="Operating perfectly. Temperature logs are fully compliant." 
          tone="green" 
        />
        <DSummaryCard 
          label="Supply Delivery" 
          value="Arriving: 10:30 AM" 
          detail="Fresh produce and dairy inbound from local supplier. Pending QA check." 
          tone="amber" 
        />
      </div>
      <Modal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        title="Log Produce Quality Check"
        ctaText="Submit Log"
        onCta={() => toast.success("Quality check logged successfully in the supplier portal.")}
      >
        <p style={{marginBottom: 16, color: 'var(--text-secondary)'}}>Please rate the freshness of the morning delivery.</p>
        <FieldSelect
          label="Visual Rating (1-5)"
          style={{ marginBottom: 16 }}
        >
          <option>5 - Excellent</option>
          <option>4 - Good</option>
          <option>3 - Acceptable</option>
          <option>2 - Poor</option>
          <option>1 - Reject</option>
        </FieldSelect>
        <label className="field" style={{marginBottom: 16, display: 'grid', gap: 6}}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Chef Notes</span>
          <textarea rows={3} placeholder="E.g., Basil leaves slightly bruised..." style={{width: '100%', border: '1px solid var(--border-subtle)', background: 'var(--input-bg)', color: 'var(--text-primary)', padding: '10px 14px', borderRadius: 8, resize: 'vertical', outline: 'none', fontFamily: 'var(--font-sans)'}} />
        </label>
      </Modal>
    </Panel>
  );
}

function MenuPerformancePanel() {
  return (
    <Panel eyebrow="Kitchen Analytics" title="Menu Item Velocity & Prep Load">
      <div className="dashboard-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 16}}>
        <DSummaryCard 
          label="Top Mover: Iced Latte" 
          value="340 orders today" 
          detail="High volume on beverage station. Ensure espresso machines are calibrated and milk stock is rotated to front." 
          tone="blue" 
        />
        <DSummaryCard 
          label="Bottleneck: Grilled Panini" 
          value="18 min avg prep" 
          detail="Prep time is exceeding 15m target. Consider assigning an extra hand to the grill station during lunch rush." 
          tone="amber" 
        />
        <DSummaryCard 
          label="High Waste: Fresh Berries" 
          value="14% Spoilage" 
          detail="Over-prepped yesterday. Reduce morning berry prep by 20% to align with current weekly demand trend." 
          tone="coral" 
        />
      </div>
    </Panel>
  );
}

function StaffFloorPanel() {
  return (
    <Panel 
      eyebrow="Floor Management" 
      title="Live Service & Staff Load" 
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
    >
      <div className="dashboard-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 14, marginTop: 8}}>
        <DSummaryCard 
          label="Table Turnover" 
          value="42 mins avg" 
          detail="Excellent pace. Busboys are clearing tables within 2 minutes of guests leaving." 
          tone="green" 
        />
        <DSummaryCard 
          label="Staff on Floor" 
          value="12 Active" 
          detail="4 Waiters, 2 Runners, 6 Kitchen. Shift change approaching at 4 PM. No breaks pending." 
          tone="purple" 
        />
        <DSummaryCard 
          label="VIP Guests" 
          value="Table 4 & 12" 
          detail="Regular high-spenders currently seated. Ensure manager table touch-point before they leave." 
          tone="amber" 
        />
      </div>

      {/* Live Floor Service Efficiency & Shift Control telemetry banner */}
      <div style={{ background: 'linear-gradient(135deg, rgba(118,82,217,0.04) 0%, rgba(8,120,93,0.04) 100%)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '14px 16px', margin: '18px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-purple)' }}>Live Floor Service Quality index</span>
          <span style={{ fontSize: '12px', fontWeight: '850', color: 'var(--accent-purple)' }}>96.2% (Target: 90%)</span>
        </div>
        <div style={{ width: '100%', height: 6, background: 'var(--line)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: '96.2%', height: '100%', background: 'var(--accent-purple)', borderRadius: 3 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10, marginTop: 2 }}>
          {[
            { label: "Waiter Capacity", val: "4 waiters active", detail: "Avg 15 tables served", color: "var(--blue)" },
            { label: "Runners Load", val: "2 active", detail: "3.2m delivery speed", color: "var(--amber)" },
            { label: "Kitchen Cooks", val: "6 active", detail: "82% station capacity", color: "var(--green)" },
            { label: "Service Efficiency", val: "94% rating", detail: "Excellent performance", color: "var(--accent-purple)" }
          ].map((item) => (
            <div key={item.label} style={{ background: 'var(--surface-card)', padding: '10px', borderRadius: 6, border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>{item.label}</span>
              <strong style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text-primary)', display: 'block' }}>{item.val}</strong>
              <span style={{ fontSize: '9px', color: item.color, fontWeight: '700' }}>{item.detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Floor Zone Allocation Tracker */}
      <div style={{ marginTop: 8, paddingTop: 16, borderTop: '1px dashed var(--line)' }}>
        <h4 style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 12 }}>
          Live Floor Zone Allocation & Coverage
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
          {[
            { zone: "Zone A (Main Dining)", count: 5, limit: 6, pct: 83, status: "High Activity", tone: "var(--green)" },
            { zone: "Zone B (Terrace & Bar)", count: 4, limit: 4, pct: 100, status: "Optimal coverage", tone: "var(--blue)" },
            { zone: "Zone C (Express Counter)", count: 2, limit: 2, pct: 100, status: "Steady flow", tone: "var(--amber)" },
            { zone: "Zone D (VIP Lounge)", count: 1, limit: 1, pct: 100, status: "Assigned", tone: "var(--accent-purple)" }
          ].map((item) => (
            <div key={item.zone} style={{ background: 'var(--wash)', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-primary)' }}>{item.zone}</span>
                <span style={{ fontSize: '10px', fontWeight: '850', color: item.tone }}>{item.count}/{item.limit}</span>
              </div>
              <div style={{ width: '100%', height: 4, background: 'var(--line)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${item.pct}%`, height: '100%', background: item.tone, borderRadius: 2 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9px', color: 'var(--text-muted)' }}>
                <span>Shift Coverage: {item.pct}%</span>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function CompliancePanel() {
  return (
    <Panel 
      eyebrow="Audits & Standards" 
      title="Regional Compliance" 
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
    >
      <div className="dashboard-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 16, marginTop: 8}}>
        <DSummaryCard 
          label="Health & Safety Audit" 
          value="98% Average" 
          detail="All 5 regional outlets passed the surprise hygiene inspection this month. Excellent standards maintained." 
          tone="green" 
        />
        <DSummaryCard 
          label="SOP Adherence" 
          value="Lake Road - Flagged" 
          detail="Uniform policy violations reported. Needs a quick check-in with the manager during the next visit." 
          tone="amber" 
        />
        <DSummaryCard 
          label="Equipment Maintenance" 
          value="2 Pending Checks" 
          detail="Espresso machine servicing due at Campus Gate and Central Square next week. Vendor scheduled." 
          tone="purple" 
        />
      </div>
    </Panel>
  );
}

function RegionalPanel() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Panel 
      eyebrow="Regional P&L & Expansion" 
      title="Director's Overview"
      action={<DSButton variant="secondary" onClick={() => setModalOpen(true)}>Adjust Regional Budget</DSButton>}
    >
      <div className="dashboard-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 16, marginTop: 8}}>
        <DSummaryCard 
          label="Regional Profitability" 
          value="+12% vs Target" 
          detail="Region is outperforming Q2 targets. Cost of goods sold is under control." 
          tone="green" 
        />
        <DSummaryCard 
          label="New Outlet Status" 
          value="Phase 2 Construction" 
          detail="Northside Mall location is 60% complete. Target opening in 45 days." 
          tone="purple" 
        />
        <DSummaryCard 
          label="Marketing Budget" 
          value="₹1,20,000 remaining" 
          detail="Surplus budget available to reallocate to underperforming outlets." 
          tone="amber" 
        />
      </div>
      <Modal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        title="Reallocate Marketing Budget"
        ctaText="Confirm Allocation"
        onCta={() => toast.success("Budget reallocated successfully.")}
      >
        <p style={{marginBottom: 16, color: 'var(--text-secondary)'}}>Distribute the remaining ₹1,20,000 regional surplus.</p>
        <FieldSelect
          label="Target Outlet"
          style={{ marginBottom: 16 }}
        >
          <option>Central Square (Boost Weekend Footfall)</option>
          <option>Campus Gate (Sponsor College Event)</option>
          <option>Lake Road (Local Ads)</option>
        </FieldSelect>
        <label className="field" style={{marginBottom: 16, display: 'grid', gap: 6}}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Allocation Amount (₹)</span>
          <input type="number" defaultValue={50000} style={{width: '100%', border: '1px solid var(--border-subtle)', background: 'var(--input-bg)', color: 'var(--text-primary)', padding: '10px 14px', borderRadius: 8, outline: 'none', fontFamily: 'var(--font-sans)'}} />
        </label>
      </Modal>
    </Panel>
  );
}

function RestaurantPanel() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Panel 
      eyebrow="Daily Floor Targets" 
      title="Manager's Checklist"
      action={<DSButton variant="secondary" onClick={() => setModalOpen(true)}>Broadcast Alert to Floor</DSButton>}
    >
      <div className="dashboard-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 16, marginTop: 8}}>
        <DSummaryCard 
          label="Prep Target" 
          value="< 15 min avg" 
          detail="Ensure kitchen remains ahead of the lunch rush to hit the SLA target." 
          tone="blue" 
        />
        <DSummaryCard 
          label="Wastage Target" 
          value="< 2% daily limit" 
          detail="Monitor inventory spoilage. Current rate is trending at 1.8%." 
          tone="green" 
        />
        <DSummaryCard 
          label="Upsell Goal" 
          value="+15% add-ons" 
          detail="Remind staff to push the new premium dessert pairing." 
          tone="coral" 
        />
      </div>
      <Modal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        title="Broadcast Floor Alert"
        ctaText="Send to Staff App"
        onCta={() => toast.success("Alert broadcasted to all clocked-in staff devices.")}
      >
        <p style={{marginBottom: 16, color: 'var(--text-secondary)'}}>Send an immediate push notification to all waiters and runners.</p>
        <FieldSelect
          label="Alert Type"
          style={{ marginBottom: 16 }}
        >
          <option>Lunch Rush Imminent - Prep stations</option>
          <option>Push Upsell Item - Premium Dessert</option>
          <option>Kitchen Delay - Apologize to tables</option>
        </FieldSelect>
        <label className="field" style={{marginBottom: 16, display: 'grid', gap: 6}}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>Custom Note (Optional)</span>
          <textarea rows={2} placeholder="E.g., VIP table arrived at Table 4..." style={{width: '100%', border: '1px solid var(--border-subtle)', background: 'var(--input-bg)', color: 'var(--text-primary)', padding: '10px 14px', borderRadius: 8, resize: 'vertical', outline: 'none', fontFamily: 'var(--font-sans)'}} />
        </label>
      </Modal>
    </Panel>
  );
}

export default function App() {
  const defaultRole = localStorage.getItem('aroma_role') || 'regional';
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${defaultRole}/overview`} replace />} />
      <Route path="/:role/:activeView" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
