import { useState, useMemo } from "react";
import { menuItems, menuCategories } from "../../data/menuData";
import { formatCurrency } from "../../utils/helpers";
import { Panel } from "../../components/design-system/data/Panel";
import { SummaryCard } from "../../components/design-system/data/SummaryCard";
import { Modal } from "../../components/design-system/feedback/Modal";
import { ViewTabs } from "../../components/design-system/forms/ViewTabs";
import { RangeSwitch } from "../../components/design-system/forms/RangeSwitch";
import { MiniMeter } from "../../components/design-system/data/MiniMeter";
import { Button } from "../../components/design-system/core/Button";

const badgeColors = {
  Bestseller: { bg: "var(--coral-soft)", color: "var(--coral)" },
  Premium: { bg: "var(--purple-soft)", color: "var(--purple)" },
  "Chef's Pick": { bg: "var(--green-soft)", color: "var(--green)" },
  Seasonal: { bg: "var(--amber-soft)", color: "var(--amber)" },
  Heritage: { bg: "var(--blue-soft)", color: "var(--blue)" },
  Vegan: { bg: "var(--green-soft)", color: "var(--green)" },
  Vegetarian: { bg: "var(--green-soft)", color: "var(--green)" },
};

export default function MenuPanel({ role, searchQuery = "" }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid | analytics
  const [sortBy, setSortBy] = useState("popular"); // popular | price | margin | rating

  const filtered = useMemo(() => {
    let items = menuItems;
    if (activeCategory !== "All") items = items.filter(i => i.category === activeCategory);
    if (searchQuery) items = items.filter(i => JSON.stringify(i).toLowerCase().includes(searchQuery.toLowerCase()));
    if (sortBy === "popular") items = [...items].sort((a, b) => b.dailyOrders - a.dailyOrders);
    if (sortBy === "price") items = [...items].sort((a, b) => b.price - a.price);
    if (sortBy === "margin") items = [...items].sort((a, b) => b.margin - a.margin);
    if (sortBy === "rating") items = [...items].sort((a, b) => b.rating - a.rating);
    return items;
  }, [activeCategory, searchQuery, sortBy]);

  // Analytics aggregates
  const analytics = useMemo(() => {
    const items = activeCategory === "All" ? menuItems : menuItems.filter(i => i.category === activeCategory);
    return {
      totalItems: items.length,
      totalDailyOrders: items.reduce((s, i) => s + i.dailyOrders, 0),
      totalWeeklyRevenue: items.reduce((s, i) => s + i.weeklyRevenue, 0),
      avgMargin: Math.round(items.reduce((s, i) => s + i.margin, 0) / items.length),
      avgRating: (items.reduce((s, i) => s + i.rating, 0) / items.length).toFixed(1),
      topItem: [...items].sort((a, b) => b.dailyOrders - a.dailyOrders)[0],
      highestMargin: [...items].sort((a, b) => b.margin - a.margin)[0],
      trending: [...items].sort((a, b) => b.trend - a.trend)[0],
    };
  }, [activeCategory]);

  return (
    <>
      <Panel style={{ gridColumn: "1 / -1", padding: 0, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "24px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p className="eyebrow" style={{ margin: 0 }}>Restaurant Chain</p>
            <h2 style={{ fontSize: 24, margin: "4px 0 0", fontFamily: "var(--font-serif)", fontWeight: 800, color: "var(--text-primary)" }}>Luxury Café Menu</h2>
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4, fontWeight: 500 }}>
              {analytics.totalItems} items · {analytics.totalDailyOrders} daily orders · Avg {analytics.avgRating}★
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <RangeSwitch
              options={[
                { value: "grid", label: "☰ Menu" },
                { value: "analytics", label: "📊 Analytics" }
              ]}
              value={viewMode}
              onChange={setViewMode}
              style={{ height: 38 }}
            />
            <select 
              value={sortBy} 
              onChange={e => setSortBy(e.target.value)} 
              style={{ height: 38, border: "1px solid var(--border-subtle)", borderRadius: 8, padding: "0 14px", fontSize: 13, fontWeight: 700, background: "var(--input-bg)", color: "var(--text-primary)", fontFamily: "var(--font-sans)", outline: "none" }}
            >
              <option value="popular">Most Popular</option>
              <option value="price">Highest Price</option>
              <option value="margin">Best Margin</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ padding: "16px 24px 0" }}>
          <ViewTabs
            options={["All", ...menuCategories].map(cat => ({ value: cat, label: cat }))}
            value={activeCategory}
            onChange={setActiveCategory}
            style={{ flexWrap: "wrap", width: "100%" }}
          />
        </div>

        {/* Analytics Cards Row */}
        {viewMode === "analytics" && (
          <div style={{ padding: "16px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))", gap: 12 }}>
            <SummaryCard label="Weekly Revenue" value={formatCurrency(analytics.totalWeeklyRevenue)} tone="green" />
            <SummaryCard label="Daily Orders" value={analytics.totalDailyOrders} tone="blue" />
            <SummaryCard label="Avg Margin" value={`${analytics.avgMargin}%`} tone="purple" />
            <SummaryCard label="Avg Rating" value={`${analytics.avgRating} ★`} tone="amber" />
            <SummaryCard label="Top Seller" value={analytics.topItem?.name || ""} detail={`${analytics.topItem?.dailyOrders}/day`} tone="coral" />
            <SummaryCard label="Trending" value={analytics.trending?.name || ""} detail={`+${analytics.trending?.trend}%`} tone="green" />
          </div>
        )}

        {/* Menu Grid */}
        <div style={{ padding: "16px 24px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: 16 }}>
          {filtered.map(item => (
            <MenuCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} role={role} />
          ))}
          {filtered.length === 0 && (
            <p style={{ color: "var(--text-muted)", gridColumn: "1 / -1", textAlign: "center", padding: 40, fontFamily: "var(--font-sans)", fontWeight: 500 }}>No items match your search.</p>
          )}
        </div>
      </Panel>

      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} role={role} />
      )}
    </>
  );
}

function MenuCard({ item, onSelect, role }) {
  const badge = badgeColors[item.badge];
  return (
    <div 
      onClick={onSelect}
      style={{ 
        border: "1px solid var(--border-subtle)", 
        borderRadius: 12, 
        background: "var(--surface-card)", 
        padding: 18, 
        cursor: "pointer", 
        transition: "all 0.25s", 
        display: "flex", 
        flexDirection: "column", 
        gap: 12,
        fontFamily: "var(--font-sans)",
        boxShadow: "var(--shadow-card)"
      }}
      onMouseOver={e => { e.currentTarget.style.borderColor = "var(--green)"; }}
      onMouseOut={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
    >
      {/* Top Row: Badge + Price */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {item.badge && badge ? (
          <span style={{ fontSize: 10, fontWeight: 850, padding: "3px 8px", borderRadius: 4, background: badge.bg, color: badge.color, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {item.badge}
          </span>
        ) : <span />}
        <span style={{ fontSize: 16, fontWeight: 900, color: "var(--green)", whiteSpace: "nowrap" }}>₹{item.price}</span>
      </div>

      {/* Title */}
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, lineHeight: 1.3, color: "var(--text-primary)", fontFamily: "var(--font-serif)" }}>{item.name}</h3>
        <p style={{ fontSize: 11, color: "var(--text-muted)", margin: "2px 0 0", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>{item.category}</p>
      </div>

      {/* Description */}
      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0, flex: 1 }}>{item.description}</p>

      {/* Quick Stats */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", borderTop: "1px solid var(--line)", paddingTop: 10 }}>
        <MiniStat label="Daily" value={item.dailyOrders} />
        <MiniStat label="Rating" value={`${item.rating}★`} />
        <MiniStat label="Margin" value={`${item.margin}%`} />
        <MiniStat label="Trend" value={`${item.trend > 0 ? "+" : ""}${item.trend}%`} color={item.trend > 0 ? "var(--green)" : "var(--coral)"} />
      </div>

      {/* Allergens */}
      {item.allergens.length > 0 && (
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {item.allergens.map(a => (
            <span key={a} style={{ fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 4, background: "var(--coral-soft)", color: "var(--coral)", textTransform: "uppercase", letterSpacing: "0.02em" }}>{a}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value, color }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <span style={{ fontSize: 9, color: "var(--text-muted)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 850, color: color || "var(--text-primary)" }}>{value}</span>
    </div>
  );
}

function ItemDetailModal({ item, onClose, role }) {
  const [activeTab, setActiveTab] = useState("sop");
  const badge = badgeColors[item.badge];

  return (
    <Modal 
      open={true} 
      onClose={onClose} 
      title={item.name}
      width={680}
      ctaText="Done"
      cancelText="Close"
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: -20, marginBottom: 16 }}>
        <span style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 600 }}>{item.category} · ₹{item.price}</span>
        {item.badge && badge && (
          <span style={{ fontSize: 9, fontWeight: 850, padding: "2px 8px", borderRadius: 4, background: badge.bg, color: badge.color, textTransform: "uppercase" }}>{item.badge}</span>
        )}
      </div>

      <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{item.description}</p>

      {/* Tab Switcher */}
      <ViewTabs
        options={[
          { value: "sop", label: "📋 SOP" },
          { value: "analytics", label: "📊 Analytics" },
          { value: "ingredients", label: "🧂 Ingredients" }
        ]}
        value={activeTab}
        onChange={setActiveTab}
        style={{ marginBottom: 20 }}
      />

      {/* Tab Content */}
      <div style={{ minHeight: 200 }}>
        {activeTab === "sop" && <SOPView item={item} />}
        {activeTab === "analytics" && <AnalyticsView item={item} />}
        {activeTab === "ingredients" && <IngredientsView item={item} />}
      </div>
    </Modal>
  );
}

function SOPView({ item }) {
  return (
    <div>
      <p style={{ fontSize: 12, fontWeight: 850, color: "var(--green)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        Standard Operating Procedure — {item.sop.length} steps
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {item.sop.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 0", borderBottom: i < item.sop.length - 1 ? "1px solid var(--line)" : "none" }}>
            <span style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--green-soft)", color: "var(--green)", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 12, flexShrink: 0 }}>{i + 1}</span>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--text-primary)" }}>{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsView({ item }) {
  const dailyRevenue = item.dailyOrders * item.price;
  const dailyProfit = Math.round(dailyRevenue * item.margin / 100);
  const weeklyProfit = Math.round(item.weeklyRevenue * item.margin / 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(130px, 100%), 1fr))", gap: 10 }}>
        <StatBlock label="Daily Orders" value={item.dailyOrders} accent="blue" />
        <StatBlock label="Daily Revenue" value={formatCurrency(dailyRevenue)} accent="green" />
        <StatBlock label="Daily Profit" value={formatCurrency(dailyProfit)} accent="purple" />
        <StatBlock label="Weekly Revenue" value={formatCurrency(item.weeklyRevenue)} accent="green" />
        <StatBlock label="Weekly Profit" value={formatCurrency(weeklyProfit)} accent="purple" />
        <StatBlock label="Margin" value={`${item.margin}%`} accent="amber" />
        <StatBlock label="Rating" value={`${item.rating} ★`} accent="amber" />
        <StatBlock label="Growth Trend" value={`${item.trend > 0 ? "+" : ""}${item.trend}%`} accent={item.trend > 0 ? "green" : "coral"} />
      </div>

      {/* Performance Bar */}
      <div style={{ border: "1px solid var(--border-subtle)", borderRadius: 10, padding: 16, background: "var(--wash)" }}>
        <p style={{ fontSize: 11, fontWeight: 800, color: "var(--text-muted)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.04em" }}>Performance Index</p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <PerfBar label="Popularity" value={Math.min(item.dailyOrders / 1.5, 100)} />
          <PerfBar label="Profitability" value={item.margin} />
          <PerfBar label="Customer Love" value={item.rating * 20} />
          <PerfBar label="Growth" value={Math.min(item.trend * 4, 100)} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <InfoChip icon="🕐" label="Peak Hour" value={item.peakHour} />
        <InfoChip icon="📍" label="Top Outlet" value={item.topOutlet} />
        <InfoChip icon="📈" label="Trend" value={`${item.trend > 0 ? "↑" : "↓"} ${Math.abs(item.trend)}% week-over-week`} />
      </div>
    </div>
  );
}

function IngredientsView({ item }) {
  return (
    <div>
      <p style={{ fontSize: 12, fontWeight: 850, color: "var(--blue)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        Ingredients & Allergens
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {item.ingredients.map((ing, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: "1px solid var(--border-subtle)", borderRadius: 8, background: "var(--surface-inset)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", flexShrink: 0 }} />
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{ing}</span>
          </div>
        ))}
      </div>
      {item.allergens.length > 0 && (
        <>
          <p style={{ fontSize: 11, fontWeight: 800, color: "var(--coral)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>⚠ Allergen Warning</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {item.allergens.map(a => (
              <span key={a} style={{ fontSize: 11, fontWeight: 800, padding: "6px 12px", borderRadius: 6, background: "var(--coral-soft)", color: "var(--coral)", textTransform: "uppercase" }}>{a}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function StatBlock({ label, value, accent }) {
  return (
    <div style={{ padding: "12px 14px", borderRadius: 8, border: "1px solid var(--border-subtle)", background: `var(--${accent}-soft)` }}>
      <p style={{ fontSize: 9, fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", margin: 0, letterSpacing: "0.05em" }}>{label}</p>
      <strong style={{ fontSize: 16, fontWeight: 900, color: `var(--${accent})`, display: "block", marginTop: 4 }}>{value}</strong>
    </div>
  );
}

function PerfBar({ label, value }) {
  return (
    <div style={{ flex: "1 1 120px" }}>
      <MiniMeter value={value} label={label} suffix={`${Math.round(value)}%`} />
    </div>
  );
}

function InfoChip({ icon, label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 8, border: "1px solid var(--border-subtle)", background: "var(--wash)", fontSize: 12 }}>
      <span>{icon}</span>
      <span style={{ fontWeight: 800, color: "var(--text-muted)" }}>{label}:</span>
      <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{value}</span>
    </div>
  );
}
