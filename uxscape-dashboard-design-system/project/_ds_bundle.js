/* @ds-bundle: {"format":3,"namespace":"UXscapeDashboardDesignSystem_6e71f2","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"BrandMark","sourcePath":"components/core/BrandMark.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"StatusPill","sourcePath":"components/core/StatusPill.jsx"},{"name":"MetricCard","sourcePath":"components/data/MetricCard.jsx"},{"name":"MiniMeter","sourcePath":"components/data/MiniMeter.jsx"},{"name":"Panel","sourcePath":"components/data/Panel.jsx"},{"name":"SummaryCard","sourcePath":"components/data/SummaryCard.jsx"},{"name":"FeedbackCard","sourcePath":"components/feedback/FeedbackCard.jsx"},{"name":"Modal","sourcePath":"components/feedback/Modal.jsx"},{"name":"UsageGuideBanner","sourcePath":"components/feedback/UsageGuideBanner.jsx"},{"name":"GuideStep","sourcePath":"components/feedback/UsageGuideBanner.jsx"},{"name":"WarningBanner","sourcePath":"components/feedback/WarningBanner.jsx"},{"name":"CommandInput","sourcePath":"components/forms/CommandInput.jsx"},{"name":"FieldSelect","sourcePath":"components/forms/FieldSelect.jsx"},{"name":"RangeSwitch","sourcePath":"components/forms/RangeSwitch.jsx"},{"name":"ViewTabs","sourcePath":"components/forms/ViewTabs.jsx"},{"name":"Hero","sourcePath":"components/navigation/Hero.jsx"},{"name":"LiveDot","sourcePath":"components/navigation/Hero.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"SidebarDivider","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"SidebarLabel","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"SidebarItem","sourcePath":"components/navigation/SidebarItem.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"a4b226e7ab08","components/core/Badge.jsx":"cf1260ab289a","components/core/BrandMark.jsx":"6a12fa1e6eff","components/core/Button.jsx":"bc94fa0bfdbf","components/core/Eyebrow.jsx":"ef0422b22e7b","components/core/IconButton.jsx":"9511f45cf155","components/core/StatusPill.jsx":"895c6c1bb13a","components/data/MetricCard.jsx":"025232ddf288","components/data/MiniMeter.jsx":"b3e1911ac6e3","components/data/Panel.jsx":"5c3b9de48998","components/data/SummaryCard.jsx":"d1fe67c45806","components/feedback/FeedbackCard.jsx":"1f665ece4ab4","components/feedback/Modal.jsx":"991d86c5e23a","components/feedback/UsageGuideBanner.jsx":"2f118f1100de","components/feedback/WarningBanner.jsx":"3e5353738f9c","components/forms/CommandInput.jsx":"4dcbd3ff3f29","components/forms/FieldSelect.jsx":"ab63a17df747","components/forms/RangeSwitch.jsx":"be3edd4dc6da","components/forms/ViewTabs.jsx":"245b078f3559","components/navigation/Hero.jsx":"289cb1eb1682","components/navigation/Sidebar.jsx":"c1349a77c8b6","components/navigation/SidebarItem.jsx":"bae3be996ab4","restaurant_dashboard_ui_kit/app.jsx":"c3f5e2df5c9c","restaurant_dashboard_ui_kit/data.js":"17f26678eff1","restaurant_dashboard_ui_kit/parts/DonutChart.jsx":"5d73900edd02","restaurant_dashboard_ui_kit/parts/Icon.jsx":"4bc18d8c93d3","restaurant_dashboard_ui_kit/parts/KitSidebar.jsx":"f074a7b03f11","restaurant_dashboard_ui_kit/parts/OutletTable.jsx":"4eafe5377945","restaurant_dashboard_ui_kit/parts/ReviewTicker.jsx":"a2d1559bd852","restaurant_dashboard_ui_kit/parts/TrendChart.jsx":"cfab90ad638d","restaurant_dashboard_ui_kit/screens/ChefOverview.jsx":"a34c201f91a9","restaurant_dashboard_ui_kit/screens/RegionalOverview.jsx":"30882c77e47b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.UXscapeDashboardDesignSystem_6e71f2 = window.UXscapeDashboardDesignSystem_6e71f2 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Avatar — round monogram. Default uses the green→teal gradient
 * (sidebar profile). variant="brand" uses the amber-yellow brand
 * gradient (logo mark / outlet rank bubble).
 */
function Avatar({
  initials,
  size = 36,
  variant = "user",
  style,
  ...rest
}) {
  const variants = {
    user: {
      background: "linear-gradient(135deg, var(--green), #2dd4bf)",
      color: "#fff"
    },
    brand: {
      background: "var(--brand-mark-bg)",
      color: "var(--brand-mark-fg)",
      boxShadow: "var(--shadow-mark)"
    },
    soft: {
      background: "var(--green-soft)",
      color: "var(--green)"
    }
  };
  const v = variants[variant] || variants.user;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      width: size,
      height: size,
      borderRadius: variant === "brand" ? 8 : "50%",
      display: "grid",
      placeItems: "center",
      fontWeight: 900,
      fontSize: Math.round(size * 0.36),
      flexShrink: 0,
      fontFamily: "var(--font-sans)",
      ...v,
      ...style
    }
  }, rest), initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small uppercase tag, used for tag-style auto-classifications
 * (`#ColdFood`, `#QualityRisk`, `#Praise`). Smaller and squarer than
 * StatusPill, with a slight border in the same hue.
 */
function Badge({
  tone = "neutral",
  children,
  style,
  ...rest
}) {
  const tones = {
    success: {
      bg: "rgba(16,185,129,0.08)",
      fg: "#1b7f63",
      border: "rgba(16,185,129,0.25)"
    },
    warning: {
      bg: "rgba(249,115,22,0.10)",
      fg: "#a66500",
      border: "rgba(249,115,22,0.25)"
    },
    danger: {
      bg: "rgba(239,68,68,0.10)",
      fg: "#b93028",
      border: "rgba(239,68,68,0.25)"
    },
    info: {
      bg: "rgba(58,91,220,0.08)",
      fg: "var(--blue)",
      border: "rgba(58,91,220,0.22)"
    },
    neutral: {
      bg: "rgba(120,113,108,0.06)",
      fg: "var(--muted)",
      border: "var(--line)"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "2.5px 7px",
      borderRadius: 4,
      fontSize: 9,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      border: `1px solid ${t.border}`,
      background: t.bg,
      color: t.fg,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/BrandMark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BrandMark — the rounded-square amber-gradient tile holding the
 * two-letter monogram. Used in the sidebar brand lockup and mobile
 * header.
 */
function BrandMark({
  initials = "RC",
  size = 40,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), initials);
}
Object.assign(__ds_scope, { BrandMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/BrandMark.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Button({
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
    whiteSpace: "nowrap"
  };
  const variants = {
    primary: {
      background: "var(--ink)",
      color: "var(--panel)",
      boxShadow: "var(--shadow-button)"
    },
    secondary: {
      background: "var(--green-soft)",
      color: "var(--green)"
    },
    link: {
      background: "transparent",
      color: "var(--green)"
    },
    mini: {
      background: "var(--ink)",
      color: "var(--panel)"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    className: className,
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow — uppercase, heavy-weight, green, with wide tracking.
 * Sits above an h2 inside every panel-heading. The pattern is
 * "eyebrow = category, h2 = thing being shown".
 */
function Eyebrow({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("p", _extends({
    style: {
      margin: 0,
      color: "var(--text-success)",
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — square icon-only button.
 * tone="default" for light surfaces, tone="dark" for the sidebar.
 */
function IconButton({
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
    flexShrink: 0
  };
  const tones = {
    default: {
      border: "1px solid var(--line)",
      background: "var(--panel)",
      color: "var(--muted)"
    },
    dark: {
      border: "1px solid #2a3d35",
      background: "transparent",
      color: "#8ca299"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    className: className,
    style: {
      ...base,
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatusPill — rounded-full label that maps a semantic tone to a
 * soft bg + saturated fg pair. The single most-used label affordance
 * in the dashboard (outlet health, order status, banner level).
 */
function StatusPill({
  tone = "success",
  children,
  style,
  ...rest
}) {
  const tones = {
    success: {
      bg: "var(--status-success-bg)",
      fg: "var(--status-success-fg)"
    },
    warning: {
      bg: "var(--status-warning-bg)",
      fg: "var(--status-warning-fg)"
    },
    danger: {
      bg: "var(--status-danger-bg)",
      fg: "var(--status-danger-fg)"
    },
    info: {
      bg: "var(--status-info-bg)",
      fg: "var(--status-info-fg)"
    },
    neutral: {
      bg: "var(--status-neutral-bg)",
      fg: "var(--status-neutral-fg)"
    }
  };
  const t = tones[tone] || tones.success;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      width: "fit-content",
      borderRadius: 999,
      background: t.bg,
      color: t.fg,
      padding: "5px 10px",
      fontSize: 12,
      fontWeight: 850,
      whiteSpace: "nowrap",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/data/MetricCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MetricCard — the metric-row tile. White card with a coloured stripe
 * inset to the left edge. Big number, label above, supporting delta below.
 *
 * accent: "green" | "blue" | "amber" | "coral" | "purple"
 */
const ACCENT_VAR = {
  green: "var(--accent-green)",
  blue: "var(--accent-blue)",
  amber: "var(--accent-amber)",
  coral: "var(--accent-coral)",
  purple: "var(--accent-purple)"
};
function MetricCard({
  label,
  value,
  change,
  accent = "green",
  style,
  ...rest
}) {
  const stripe = ACCENT_VAR[accent] || ACCENT_VAR.green;
  return /*#__PURE__*/React.createElement("article", _extends({
    style: {
      minHeight: 128,
      flex: "1 1 0",
      minWidth: 0,
      padding: 18,
      border: "1px solid var(--border-subtle)",
      borderRadius: 8,
      background: "var(--surface-card)",
      boxShadow: "var(--shadow-card)",
      display: "grid",
      alignContent: "space-between",
      position: "relative",
      overflow: "hidden",
      wordBreak: "break-word",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: "0 auto 0 0",
      width: 5,
      background: stripe
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--muted)",
      fontSize: 13,
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: "clamp(24px, 3vw, 34px)",
      lineHeight: 1,
      fontWeight: 800,
      color: "var(--text-primary)"
    }
  }, value), change && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--text-success)",
      fontSize: 13,
      fontWeight: 800
    }
  }, change));
}
Object.assign(__ds_scope, { MetricCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MetricCard.jsx", error: String((e && e.message) || e) }); }

// components/data/MiniMeter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MiniMeter — a small horizontal progress meter with a green→mint
 * gradient fill. Used in outlet rows, chef cards, and inventory levels.
 *
 * value: 0–100
 */
function MiniMeter({
  value = 0,
  label,
  suffix,
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "grid",
      gap: 6,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), (label || suffix) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      color: "var(--muted)",
      fontSize: 12,
      fontWeight: 700
    }
  }, label && /*#__PURE__*/React.createElement("span", null, label), suffix && /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-primary)"
    }
  }, suffix)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: 999,
      background: "#e8eee9",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      display: "block",
      height: "100%",
      width: `${pct}%`,
      background: "var(--chart-meter-fill)",
      borderRadius: "inherit"
    }
  })));
}
Object.assign(__ds_scope, { MiniMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MiniMeter.jsx", error: String((e && e.message) || e) }); }

// components/data/Panel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Panel — generic white card surface. Use as the outer wrapper of
 * any dashboard panel (chart, outlet list, feedback list).
 *
 * If `eyebrow` and/or `title` are provided, renders the standard
 * panel-heading at the top with optional `action` on the right.
 */
function Panel({
  eyebrow,
  title,
  action,
  padding = 20,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      padding,
      border: "1px solid var(--border-subtle)",
      borderRadius: 8,
      background: "var(--surface-card)",
      boxShadow: "var(--shadow-card)",
      minWidth: 0,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), (eyebrow || title || action) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: 18,
      flexWrap: "wrap",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 2,
      minWidth: 0
    }
  }, eyebrow && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--text-success)",
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: "0.08em",
      textTransform: "uppercase"
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 19,
      lineHeight: 1.15,
      fontWeight: 850,
      color: "var(--text-primary)"
    }
  }, title)), action), children);
}
Object.assign(__ds_scope, { Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Panel.jsx", error: String((e && e.message) || e) }); }

// components/data/SummaryCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SummaryCard — the "rolled-up KPI" card with a soft diagonal tint
 * overlay. Used in the graph-summary panel beside the chart.
 * Big value, uppercase label, single line of supporting detail.
 *
 * tone="green" sets the value text colour (the brand only does this on
 * the leading metric of a summary group); other tones keep ink text.
 */
const OVERLAY = {
  green: "linear-gradient(135deg, rgba(8,120,93,0.10), transparent 54%)",
  blue: "linear-gradient(135deg, rgba(58,91,220,0.12), transparent 54%)",
  amber: "linear-gradient(135deg, rgba(240,167,47,0.16), transparent 54%)",
  purple: "linear-gradient(135deg, rgba(118,82,217,0.13), transparent 54%)"
};
const VALUE_FG = {
  green: "var(--text-success)",
  blue: "var(--accent-blue)",
  amber: "#a66500",
  purple: "var(--accent-purple)"
};
function SummaryCard({
  label,
  value,
  detail,
  tone = "green",
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("article", _extends({
    style: {
      minHeight: 126,
      padding: 18,
      border: "1px solid var(--border-subtle)",
      borderRadius: 8,
      background: "var(--surface-card)",
      boxShadow: "var(--shadow-card)",
      display: "grid",
      alignContent: "space-between",
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      content: "''",
      position: "absolute",
      inset: 0,
      background: OVERLAY[tone] || OVERLAY.green,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      color: "var(--muted)",
      fontSize: 12,
      fontWeight: 900,
      letterSpacing: "0.08em",
      textTransform: "uppercase"
    }
  }, label), /*#__PURE__*/React.createElement("strong", {
    style: {
      position: "relative",
      fontSize: "clamp(24px, 3vw, 34px)",
      lineHeight: 1,
      fontWeight: 800,
      color: VALUE_FG[tone] || "var(--text-primary)"
    }
  }, value), detail && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      position: "relative",
      color: "var(--muted)",
      fontSize: 13,
      lineHeight: 1.35
    }
  }, detail), children);
}
Object.assign(__ds_scope, { SummaryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/SummaryCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/FeedbackCard.jsx
try { (() => {
/**
 * FeedbackCard — single review ticker card. Header row: user + rating
 * + auto-detected #tag badge. Body: the review text. Footer: time.
 */
function FeedbackCard({
  user,
  rating = 0,
  badge,
  content,
  time,
  style
}) {
  const stars = "★".repeat(rating) + "☆".repeat(Math.max(0, 5 - rating));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      background: "var(--wash)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 10,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      transition: "transform .2s ease, border-color .2s ease",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 13,
      color: "var(--text-primary)"
    }
  }, user), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--amber)"
    }
  }, stars), badge)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: "var(--muted)",
      lineHeight: 1.45
    }
  }, content), time && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: "var(--muted)",
      display: "block",
      textAlign: "right"
    }
  }, time));
}
Object.assign(__ds_scope, { FeedbackCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/FeedbackCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Modal.jsx
try { (() => {
/**
 * Modal — centred dialog with blurred ink overlay. Always shows a
 * Cancel + primary CTA pair in the footer.
 */
function Modal({
  open,
  onClose,
  title,
  children,
  ctaText = "Confirm",
  onCta,
  cancelText = "Cancel",
  width = 400
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(20, 33, 28, 0.4)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: "var(--surface-card)",
      padding: 32,
      borderRadius: 16,
      border: "1px solid var(--border-subtle)",
      width,
      maxWidth: "90%",
      boxShadow: "0 24px 60px rgba(0,0,0,0.1)"
    }
  }, title && /*#__PURE__*/React.createElement("h2", {
    style: {
      marginBottom: 24,
      fontSize: 24,
      fontWeight: 850
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      minHeight: 42,
      borderRadius: 8,
      border: 0,
      padding: "0 16px",
      background: "var(--green-soft)",
      color: "var(--green)",
      fontWeight: 800,
      fontSize: 14,
      cursor: "pointer"
    }
  }, cancelText), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (onCta) onCta();
      if (onClose) onClose();
    },
    style: {
      minHeight: 42,
      borderRadius: 8,
      border: 0,
      padding: "0 16px",
      background: "var(--ink)",
      color: "var(--panel)",
      fontWeight: 800,
      fontSize: 14,
      boxShadow: "var(--shadow-button)",
      cursor: "pointer"
    }
  }, ctaText))));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Modal.jsx", error: String((e && e.message) || e) }); }

// components/feedback/UsageGuideBanner.jsx
try { (() => {
/**
 * UsageGuideBanner — left-bordered tinted banner with a circular icon,
 * title, sub copy, and an optional row of step chips. tone="warning"
 * uses amber, tone="success" uses green.
 */
function UsageGuideBanner({
  tone = "warning",
  icon,
  title,
  children,
  steps,
  onDismiss,
  style
}) {
  const palette = tone === "success" ? {
    border: "var(--green)",
    bg: "var(--green-soft)",
    iconBg: "var(--green)",
    overlay: "linear-gradient(135deg, rgba(8,120,93,0.08), transparent 60%)"
  } : {
    border: "var(--amber)",
    bg: "var(--amber-soft)",
    iconBg: "var(--amber)",
    overlay: "linear-gradient(135deg, rgba(240,167,47,0.08), transparent 60%)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 14,
      padding: "16px 18px",
      border: `1px solid ${palette.border}`,
      borderLeft: `4px solid ${palette.border}`,
      borderRadius: 10,
      background: palette.bg,
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: palette.overlay,
      pointerEvents: "none"
    }
  }), icon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flexShrink: 0,
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: palette.iconBg,
      color: "#fff",
      display: "grid",
      placeItems: "center"
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      position: "relative"
    }
  }, title && /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      fontSize: 14,
      fontWeight: 850,
      color: "var(--text-primary)",
      marginBottom: 4
    }
  }, title), children && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: "var(--muted)",
      lineHeight: 1.45
    }
  }, children), steps && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 12,
      flexWrap: "wrap"
    }
  }, steps)), onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "Dismiss",
    style: {
      position: "relative",
      flexShrink: 0,
      width: 32,
      height: 32,
      border: "1px solid var(--border-subtle)",
      borderRadius: 8,
      background: "var(--surface-card)",
      color: "var(--muted)",
      display: "grid",
      placeItems: "center",
      cursor: "pointer"
    }
  }, "\u2715"));
}

/**
 * GuideStep — single chip used inside UsageGuideBanner's `steps` row.
 * status: "pending" | "done" | "info"
 */
function GuideStep({
  status = "pending",
  icon,
  children
}) {
  const palette = status === "done" ? {
    border: "var(--green)",
    bg: "var(--green-soft)",
    color: "var(--green)"
  } : status === "info" ? {
    border: "var(--border-subtle)",
    bg: "transparent",
    color: "var(--muted)",
    dashed: true
  } : {
    border: "var(--amber)",
    bg: "rgba(240,167,47,0.08)",
    color: "#9a6100"
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 14px",
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 700,
      whiteSpace: "nowrap",
      border: `1px ${palette.dashed ? "dashed" : "solid"} ${palette.border}`,
      background: palette.bg,
      color: palette.color,
      fontFamily: "var(--font-sans)"
    }
  }, icon, children);
}
Object.assign(__ds_scope, { UsageGuideBanner, GuideStep });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/UsageGuideBanner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/WarningBanner.jsx
try { (() => {
/**
 * WarningBanner — compact one-line red banner used inside panels
 * to flag a critical condition (e.g. margin under 60%).
 */
function WarningBanner({
  icon,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
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
      ...style
    }
  }, icon, /*#__PURE__*/React.createElement("div", null, children));
}
Object.assign(__ds_scope, { WarningBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/WarningBanner.jsx", error: String((e && e.message) || e) }); }

// components/forms/CommandInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CommandInput — the brand's signature search bar. A green uppercase
 * "SEARCH" / "ASK" label sits inside the input on the left, followed
 * by the field. Sits in the command-bar with an action button.
 *
 * Pass `label="SEARCH"` to change the inner label; default is "Search".
 */
function CommandInput({
  label = "Search",
  placeholder,
  value,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 44,
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: 10,
      border: "1px solid var(--border-subtle)",
      borderRadius: 8,
      background: "var(--input-bg)",
      padding: "0 12px",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-success)",
      fontSize: 12,
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "0.06em"
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    style: {
      width: "100%",
      border: 0,
      color: "var(--text-primary)",
      background: "transparent",
      outline: "none",
      fontSize: 14
    }
  }, rest)));
}
Object.assign(__ds_scope, { CommandInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/CommandInput.jsx", error: String((e && e.message) || e) }); }

// components/forms/FieldSelect.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FieldSelect — labelled select. Label is the brand's
 * uppercase-muted form micro-label. Select is 36–42px tall depending
 * on `size`.
 */
function FieldSelect({
  label,
  value,
  onChange,
  children,
  size = "md",
  style,
  ...rest
}) {
  const h = size === "sm" ? 36 : 42;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "grid",
      gap: 6,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--muted)",
      fontSize: 12,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.04em"
    }
  }, label), /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    onChange: onChange,
    style: {
      minHeight: h,
      borderRadius: 8,
      border: "1px solid var(--border-subtle)",
      background: "var(--input-bg)",
      color: "var(--text-primary)",
      padding: "0 36px 0 14px",
      fontSize: 14,
      fontWeight: 600,
      appearance: "none",
      backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='%2368766f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M4 6l4 4 4-4'/></svg>\")",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 12px center"
    }
  }, rest), children));
}
Object.assign(__ds_scope, { FieldSelect });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FieldSelect.jsx", error: String((e && e.message) || e) }); }

// components/forms/RangeSwitch.jsx
try { (() => {
/**
 * RangeSwitch — segmented control. Active segment fills with green,
 * inactive segments are muted text on transparent. Used for time
 * range (Today / Week / Month) and similar bucketed switches.
 */
function RangeSwitch({
  options = [],
  value,
  onChange,
  ariaLabel,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": ariaLabel,
    style: {
      height: 42,
      display: "flex",
      gap: 4,
      padding: 4,
      border: "1px solid var(--border-subtle)",
      borderRadius: 8,
      background: "var(--input-bg)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, options.map(opt => {
    const v = typeof opt === "string" ? opt : opt.value;
    const l = typeof opt === "string" ? opt : opt.label;
    const active = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      type: "button",
      onClick: () => onChange && onChange(v),
      style: {
        minHeight: 32,
        border: 0,
        borderRadius: 6,
        padding: "0 12px",
        background: active ? "var(--accent-green)" : "transparent",
        color: active ? "var(--panel)" : "var(--muted)",
        fontWeight: 800,
        fontSize: 13,
        cursor: "pointer",
        transition: "var(--transition-hover)"
      }
    }, l);
  }));
}
Object.assign(__ds_scope, { RangeSwitch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RangeSwitch.jsx", error: String((e && e.message) || e) }); }

// components/forms/ViewTabs.jsx
try { (() => {
/**
 * ViewTabs — the dark-pill tab control used for view switching
 * (Overview / Menu / Orders / …). Active tab flips to ink with
 * white text; inactive tabs are muted.
 */
function ViewTabs({
  options = [],
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      width: "fit-content",
      padding: 4,
      border: "1px solid var(--border-subtle)",
      borderRadius: 8,
      background: "var(--input-bg)",
      display: "flex",
      gap: 4,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, options.map(opt => {
    const v = typeof opt === "string" ? opt : opt.value;
    const l = typeof opt === "string" ? opt : opt.label;
    const active = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(v),
      style: {
        minHeight: 36,
        border: 0,
        borderRadius: 6,
        padding: "0 15px",
        background: active ? "var(--ink)" : "transparent",
        color: active ? "var(--panel)" : "var(--muted)",
        textTransform: "capitalize",
        fontWeight: 800,
        fontSize: 13,
        cursor: "pointer",
        transition: "var(--transition-hover)"
      }
    }, l);
  }));
}
Object.assign(__ds_scope, { ViewTabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ViewTabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Hero.jsx
try { (() => {
/**
 * Hero — the big top-of-page band. Renders an eyebrow + h1 + body
 * paragraph on the left, and an optional status capsule on the
 * right. Default styling matches the brand's `--hero-bg` gradient.
 */
function Hero({
  eyebrow,
  title,
  children,
  status,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 22,
      border: "1px solid var(--border-success)",
      borderRadius: 8,
      background: "var(--hero-bg)",
      boxShadow: "var(--shadow-card)",
      padding: 22,
      overflow: "hidden",
      wordBreak: "break-word",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      minWidth: 0
    }
  }, eyebrow && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 9px",
      color: "var(--text-success)",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase"
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-serif)",
      fontSize: "clamp(34px, 4.4vw, 58px)",
      lineHeight: 1.02,
      fontWeight: 600,
      letterSpacing: "-0.015em"
    }
  }, title), children && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--muted)",
      marginTop: 12,
      fontSize: 16,
      lineHeight: 1.5
    }
  }, children)), status && /*#__PURE__*/React.createElement("div", {
    "aria-label": "Current dashboard scope",
    style: {
      minWidth: 210,
      display: "flex",
      alignItems: "center",
      gap: 12,
      border: "1px solid var(--border-success)",
      borderRadius: 8,
      background: "var(--hero-status-bg)",
      padding: 12
    }
  }, status));
}

/**
 * LiveDot — green pulsing dot used in hero status and sidebar
 * "Live · Synced 42s ago" rows.
 */
function LiveDot({
  size = 9,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      background: "#63d297",
      boxShadow: "0 0 0 5px rgba(99, 210, 151, 0.12)",
      display: "inline-block",
      flexShrink: 0,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Hero, LiveDot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Hero.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Sidebar.jsx
try { (() => {
/**
 * Sidebar — the dark left rail. Sticky, full-height, near-black,
 * 260px wide (72px when collapsed via `collapsed` prop). Children
 * are arranged top-to-bottom; the brand uses dividers and labels
 * to group them.
 *
 * Renders nothing special by itself — compose with SidebarBrand,
 * SidebarItem, SidebarDivider, SidebarLabel, SidebarProfile.
 */
function Sidebar({
  collapsed = false,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "sticky",
      top: 0,
      height: "100vh",
      width: collapsed ? 72 : 260,
      background: "var(--sidebar-bg)",
      color: "var(--sidebar-text)",
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 6,
      overflow: "hidden",
      overflowY: "auto",
      transition: "var(--transition-sidebar)",
      zIndex: 100,
      flexShrink: 0,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, children);
}
function SidebarDivider() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--sidebar-line-soft)",
      margin: "6px 0",
      flexShrink: 0
    }
  });
}
function SidebarLabel({
  children,
  collapsed = false
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
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
      lineHeight: 1.4
    }
  }, children);
}
Object.assign(__ds_scope, { Sidebar, SidebarDivider, SidebarLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarItem.jsx
try { (() => {
/**
 * SidebarItem — single nav row. Icon left, label right; collapses
 * to icon-only when `collapsed`. `active` flips the bg + adds a
 * subtle border.
 */
function SidebarItem({
  icon,
  children,
  active = false,
  collapsed = false,
  title,
  onClick,
  style
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
    fontFamily: "var(--font-sans)"
  };
  const activeStyle = active ? {
    background: "var(--sidebar-item-active-bg)",
    borderColor: "var(--sidebar-item-active-border)",
    color: "var(--sidebar-text)"
  } : null;
  return /*#__PURE__*/React.createElement("button", {
    title: title,
    onClick: onClick,
    style: {
      ...base,
      ...activeStyle,
      ...style
    },
    onMouseEnter: e => {
      if (!active) {
        e.currentTarget.style.background = "var(--sidebar-item-hover-bg)";
        e.currentTarget.style.color = "var(--sidebar-text)";
      }
    },
    onMouseLeave: e => {
      if (!active) {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "var(--sidebar-item)";
      }
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: 20,
      height: 20,
      display: "grid",
      placeItems: "center"
    }
  }, icon), !collapsed && /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, children));
}
Object.assign(__ds_scope, { SidebarItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarItem.jsx", error: String((e && e.message) || e) }); }

// restaurant_dashboard_ui_kit/app.jsx
try { (() => {
// Top-level UI kit app — wires Sidebar + Hero + filters + the active
// role's overview screen, plus a global Inspect modal.
function App() {
  const ns = window.UXscapeDashboardDesignSystem_6e71f2;
  const {
    Hero,
    LiveDot,
    FieldSelect,
    RangeSwitch,
    ViewTabs,
    CommandInput,
    Button,
    UsageGuideBanner,
    GuideStep,
    Modal,
    StatusPill
  } = ns;
  const {
    roles,
    views,
    outlets,
    fmtINR
  } = window.kitData;
  const [role, setRole] = React.useState("regional");
  const [view, setView] = React.useState("overview");
  const [date, setDate] = React.useState(() => new Date().toISOString().slice(0, 10));
  const [outlet, setOutlet] = React.useState("all");
  const [range, setRange] = React.useState("Today");
  const [search, setSearch] = React.useState("");
  const [exportOpen, setExportOpen] = React.useState(false);
  const [inspectOutlet, setInspectOutlet] = React.useState(null);
  const [bannerDismissed, setBannerDismissed] = React.useState(false);
  const activeRole = roles.find(r => r.id === role);
  const today = new Date().toISOString().slice(0, 10);
  const isToday = date === today;
  const isSpecificOutlet = outlet !== "all";
  const allSet = isToday && isSpecificOutlet;
  const outletLabel = outlet === "all" ? "All outlets" : outlets.find(o => o.id === outlet)?.name;
  const overview = role === "chef" ? /*#__PURE__*/React.createElement(ChefOverview, null) : /*#__PURE__*/React.createElement(RegionalOverview, {
    selectedOutlet: outlet,
    onInspect: setInspectOutlet
  });
  return /*#__PURE__*/React.createElement("main", {
    style: {
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "260px minmax(0, 1fr)"
    }
  }, /*#__PURE__*/React.createElement(KitSidebar, {
    role: role,
    view: view,
    onRole: setRole,
    onView: setView
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 26,
      display: "grid",
      alignContent: "start",
      gap: 16,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Hero, {
    eyebrow: `Today, ${new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })}`,
    title: `${activeRole.label} Dashboard`,
    status: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LiveDot, null), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: 3
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        fontSize: 14
      }
    }, outletLabel), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--muted)",
        fontSize: 12
      }
    }, range, " view \xB7 live sync on")))
  }, activeRole.brief), !bannerDismissed && /*#__PURE__*/React.createElement(UsageGuideBanner, {
    tone: allSet ? "success" : "warning",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "info",
      size: 20,
      color: "#fff"
    }),
    title: allSet ? "✓ Dashboard configured correctly" : "Quick Setup — Get accurate data",
    steps: allSet ? null : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GuideStep, {
      status: isToday ? "done" : "pending",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "calendar-days",
        size: 16
      })
    }, isToday ? "Date is set to today ✓" : "Step 1: Set the date to today's date"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--muted)",
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 14
    })), /*#__PURE__*/React.createElement(GuideStep, {
      status: isSpecificOutlet ? "done" : "pending",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "store",
        size: 16
      })
    }, isSpecificOutlet ? "Outlet selected ✓" : 'Step 2: Select a specific outlet'), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--muted)",
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 14
    })), /*#__PURE__*/React.createElement(GuideStep, {
      status: "info"
    }, "Then switch back to \"All Outlets\" for combined view")),
    onDismiss: () => setBannerDismissed(true)
  }, allSet ? `You're viewing live data for ${outletLabel}. You can now switch back to "All Outlets" for a combined view.` : "For accurate, real-time numbers please follow these steps:"), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 14,
      padding: 10,
      border: "1px solid var(--border-subtle)",
      borderRadius: 8,
      background: "var(--hero-status-bg)",
      boxShadow: "var(--shadow-panel)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(ViewTabs, {
    options: views.map(v => v.id),
    value: view,
    onChange: setView
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "grid",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--muted)",
      fontSize: 12,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.04em"
    }
  }, "Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: date,
    onChange: e => setDate(e.target.value),
    style: {
      height: 36,
      border: "1px solid var(--border-subtle)",
      borderRadius: 6,
      padding: "0 12px",
      background: "var(--panel)",
      color: "var(--text-primary)",
      fontFamily: "var(--font-sans)"
    }
  })), /*#__PURE__*/React.createElement(FieldSelect, {
    label: "Outlet",
    value: outlet,
    onChange: e => setOutlet(e.target.value),
    size: "sm"
  }, /*#__PURE__*/React.createElement("option", {
    value: "all"
  }, "All outlets"), outlets.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.id,
    value: o.id
  }, o.name))), /*#__PURE__*/React.createElement(RangeSwitch, {
    options: ["Today", "Week", "Month"],
    value: range,
    onChange: setRange
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: 10,
      border: "1px solid var(--border-subtle)",
      borderRadius: 8,
      background: "var(--hero-status-bg)"
    }
  }, /*#__PURE__*/React.createElement(CommandInput, {
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: "Try: low stock at Lake Road, delayed orders, chef score"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => setExportOpen(true)
  }, "Export report")), view === "overview" ? overview : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 60,
      border: "1px dashed var(--border-subtle)",
      borderRadius: 8,
      color: "var(--muted)",
      textAlign: "center",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-primary)",
      textTransform: "capitalize"
    }
  }, view), " ", "view \u2014 not recreated in this kit. Use Overview to see all components in context."), /*#__PURE__*/React.createElement(Modal, {
    open: exportOpen,
    onClose: () => setExportOpen(false),
    title: "Export Report",
    ctaText: "Download",
    onCta: () => {}
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "grid",
      gap: 6,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--muted)",
      fontSize: 12,
      fontWeight: 800
    }
  }, "Format"), /*#__PURE__*/React.createElement("select", {
    style: {
      width: "100%",
      border: "1px solid var(--border-subtle)",
      background: "var(--panel)",
      color: "var(--text-primary)",
      padding: "10px 14px",
      borderRadius: 8
    }
  }, /*#__PURE__*/React.createElement("option", null, "PDF (Executive Summary)"), /*#__PURE__*/React.createElement("option", null, "CSV (Raw Data)"), /*#__PURE__*/React.createElement("option", null, "Excel (Financials)"))), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--muted)",
      fontSize: 13,
      margin: 0
    }
  }, "The export will include all data within the currently selected scope (", outletLabel, ", ", range, ").")), /*#__PURE__*/React.createElement(Modal, {
    open: !!inspectOutlet,
    onClose: () => setInspectOutlet(null),
    title: inspectOutlet ? `${inspectOutlet.name} — Full Health Report` : "",
    ctaText: "Flag for Review",
    onCta: () => {},
    width: 560
  }, inspectOutlet && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 14px",
      background: "var(--wash)",
      borderRadius: 8
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    tone: "success"
  }, "Healthy"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--muted)"
    }
  }, "Composite health score across stock, margin, NPS, and growth")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Field, {
    k: "Manager",
    v: inspectOutlet.manager
  }), /*#__PURE__*/React.createElement(Field, {
    k: "Area",
    v: inspectOutlet.area
  }), /*#__PURE__*/React.createElement(Field, {
    k: "Net sales (today)",
    v: fmtINR(inspectOutlet.sales)
  }), /*#__PURE__*/React.createElement(Field, {
    k: "Growth",
    v: `+${inspectOutlet.growth}%`
  }), /*#__PURE__*/React.createElement(Field, {
    k: "Margin",
    v: `${inspectOutlet.margin}%`
  }), /*#__PURE__*/React.createElement(Field, {
    k: "NPS",
    v: inspectOutlet.nps
  }), /*#__PURE__*/React.createElement(Field, {
    k: "Stock health",
    v: `${inspectOutlet.stockHealth}%`
  }), /*#__PURE__*/React.createElement(Field, {
    k: "Avg prep",
    v: `${inspectOutlet.prep} min`
  }))))));
}
function Field({
  k,
  v
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 12px",
      border: "1px solid var(--border-subtle)",
      borderRadius: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--muted)",
      fontSize: 11,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.06em"
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: 15,
      fontWeight: 800,
      color: "var(--text-primary)"
    }
  }, v));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "restaurant_dashboard_ui_kit/app.jsx", error: String((e && e.message) || e) }); }

// restaurant_dashboard_ui_kit/data.js
try { (() => {
// Trimmed mock data, copied from restaurant dashboard/src/data/mockData.js
// Used only for visual fidelity — no real filtering, sorting or seeding.

const outlets = [{
  id: "central",
  name: "Central Square",
  area: "Old City",
  manager: "Meera Joshi",
  sales: 238000,
  orders: 426,
  growth: 14.8,
  rating: 4.7,
  nps: 68,
  prep: 18,
  stockHealth: 82,
  margin: 28
}, {
  id: "lake",
  name: "Lake Road",
  area: "Lake Road",
  manager: "Dev Iyer",
  sales: 194000,
  orders: 352,
  growth: 8.6,
  rating: 4.5,
  nps: 59,
  prep: 21,
  stockHealth: 68,
  margin: 24
}, {
  id: "campus",
  name: "Campus Gate",
  area: "University Zone",
  manager: "Ananya Shah",
  sales: 167000,
  orders: 318,
  growth: 19.4,
  rating: 4.6,
  nps: 64,
  prep: 16,
  stockHealth: 74,
  margin: 26
}];
const roles = [{
  id: "regional",
  label: "Regional Manager",
  iconName: "building-2",
  brief: "Track outlet health, revenue, alerts, and live service risk from one screen."
}, {
  id: "restaurant",
  label: "Restaurant Manager",
  iconName: "map-pin",
  brief: "Run the floor with stock, orders, staff load, and customer issues in one place."
}, {
  id: "chef",
  label: "Head Chef",
  iconName: "chef-hat",
  brief: "Monitor tickets, prep speed, station load, and food quality without digging through reports."
}, {
  id: "strategy",
  label: "Strategy",
  iconName: "trending-up",
  brief: "Spot campaign opportunities, pricing signals, and expansion patterns across outlets."
}];
const views = [{
  id: "overview",
  iconName: "layout-dashboard"
}, {
  id: "menu",
  iconName: "utensils-crossed"
}, {
  id: "orders",
  iconName: "shopping-cart"
}, {
  id: "inventory",
  iconName: "package"
}, {
  id: "staff",
  iconName: "users"
}, {
  id: "feedback",
  iconName: "message-square"
}];
const weeklyTrend = [{
  label: "8 AM",
  height: 42,
  sales: 32000,
  orders: 58
}, {
  label: "9 AM",
  height: 48,
  sales: 38000,
  orders: 66
}, {
  label: "10 AM",
  height: 45,
  sales: 36000,
  orders: 61
}, {
  label: "11 AM",
  height: 56,
  sales: 47000,
  orders: 78
}, {
  label: "12 PM",
  height: 63,
  sales: 59000,
  orders: 94
}, {
  label: "1 PM",
  height: 60,
  sales: 55000,
  orders: 88
}, {
  label: "2 PM",
  height: 71,
  sales: 68000,
  orders: 104
}, {
  label: "3 PM",
  height: 76,
  sales: 72000,
  orders: 111
}, {
  label: "4 PM",
  height: 82,
  sales: 81000,
  orders: 126
}, {
  label: "5 PM",
  height: 89,
  sales: 92000,
  orders: 142
}, {
  label: "6 PM",
  height: 96,
  sales: 104000,
  orders: 158
}, {
  label: "7 PM",
  height: 104,
  sales: 118000,
  orders: 173
}];
const dayParts = [{
  label: "Breakfast",
  value: 24,
  color: "#1b7f63"
}, {
  label: "Lunch",
  value: 31,
  color: "#f0a72f"
}, {
  label: "Evening",
  value: 28,
  color: "#e35b4f"
}, {
  label: "Late",
  value: 17,
  color: "#3a5bdc"
}];
const reviews = [{
  id: "cm-1",
  user: "Harsh M. (Zomato)",
  rating: 2,
  note: "The food arrived extremely cold and was 20 minutes late!",
  time: "10 min ago",
  tag: "ColdFood",
  tagTone: "warning"
}, {
  id: "cm-2",
  user: "Priya S. (Swiggy)",
  rating: 1,
  note: "The chicken patty inside was uncooked and raw in the center! High quality risk.",
  time: "15 min ago",
  tag: "QualityRisk",
  tagTone: "danger"
}, {
  id: "cm-3",
  user: "Vikram K. (Direct)",
  rating: 5,
  note: "Outstanding taste! The coffee blend is super aromatic, packed neatly.",
  time: "25 min ago",
  tag: "Praise",
  tagTone: "success"
}, {
  id: "cm-4",
  user: "Aisha R. (Zomato)",
  rating: 2,
  note: "Order got delayed and fries were late and cold.",
  time: "40 min ago",
  tag: "ColdFood",
  tagTone: "warning"
}, {
  id: "cm-5",
  user: "Rohan D. (Swiggy)",
  rating: 4,
  note: "Loved the packing but delivery could have been slightly faster.",
  time: "1h ago",
  tag: "Praise",
  tagTone: "success"
}];
const fmtINR = n => "₹" + Math.round(n).toLocaleString("en-IN", {
  maximumFractionDigits: 0
});
Object.assign(window, {
  kitData: {
    outlets,
    roles,
    views,
    weeklyTrend,
    dayParts,
    reviews,
    fmtINR
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "restaurant_dashboard_ui_kit/data.js", error: String((e && e.message) || e) }); }

// restaurant_dashboard_ui_kit/parts/DonutChart.jsx
try { (() => {
// DonutChart — pure SVG donut with green→amber→coral→blue slices,
// matching the brand's day-part contribution panel.
function DonutChart({
  slices,
  centerLabel,
  centerSub
}) {
  const radius = 72;
  const stroke = 17;
  const cx = 90,
    cy = 90;
  const circumference = 2 * Math.PI * radius;
  const total = slices.reduce((s, x) => s + x.value, 0);
  let offset = 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 200,
      height: 200,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 180,
    height: 180,
    viewBox: "0 0 180 180",
    style: {
      overflow: "visible"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: radius,
    fill: "none",
    stroke: "#e8eee9",
    strokeWidth: stroke
  }), slices.map((s, i) => {
    const len = s.value / total * circumference;
    const el = /*#__PURE__*/React.createElement("circle", {
      key: s.label,
      cx: cx,
      cy: cy,
      r: radius,
      fill: "none",
      stroke: s.color,
      strokeWidth: stroke,
      strokeDasharray: `${len} ${circumference - len}`,
      strokeDashoffset: -offset,
      strokeLinecap: "round",
      transform: `rotate(-90 ${cx} ${cy})`,
      style: {
        transition: "all .3s ease"
      }
    });
    offset += len;
    return el;
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "grid",
      placeItems: "center",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 30,
      lineHeight: 1,
      fontWeight: 850,
      color: "var(--text-primary)"
    }
  }, centerLabel), centerSub && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--muted)",
      fontSize: 13,
      fontWeight: 850,
      marginTop: 4
    }
  }, centerSub))));
}
window.DonutChart = DonutChart;
})(); } catch (e) { __ds_ns.__errors.push({ path: "restaurant_dashboard_ui_kit/parts/DonutChart.jsx", error: String((e && e.message) || e) }); }

// restaurant_dashboard_ui_kit/parts/Icon.jsx
try { (() => {
// Icon — Lucide UMD wrapper. Re-creates a <span> with <i data-lucide>.
function Icon({
  name,
  size = 18,
  color,
  style
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !window.lucide) return;
    ref.current.innerHTML = "";
    const el = document.createElement("i");
    el.setAttribute("data-lucide", name);
    el.style.width = size + "px";
    el.style.height = size + "px";
    if (color) el.style.color = color;
    ref.current.appendChild(el);
    window.lucide.createIcons();
  }, [name, size, color]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: "inline-flex",
      lineHeight: 0,
      ...style
    }
  });
}
window.Icon = Icon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "restaurant_dashboard_ui_kit/parts/Icon.jsx", error: String((e && e.message) || e) }); }

// restaurant_dashboard_ui_kit/parts/KitSidebar.jsx
try { (() => {
// Sidebar — composed using DS primitives + raw layout
function KitSidebar({
  role,
  view,
  onRole,
  onView
}) {
  const ns = window.UXscapeDashboardDesignSystem_6e71f2;
  const {
    Sidebar,
    SidebarDivider,
    SidebarLabel,
    SidebarItem,
    BrandMark,
    Avatar,
    IconButton,
    LiveDot
  } = ns;
  const {
    roles,
    views
  } = window.kitData;
  const activeRole = roles.find(r => r.id === role);
  return /*#__PURE__*/React.createElement(Sidebar, null, /*#__PURE__*/React.createElement(IconButton, {
    tone: "dark",
    size: "sm",
    "aria-label": "Collapse sidebar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "panel-left-close",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "4px 0",
      minHeight: 48,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(BrandMark, {
    initials: "RC"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      fontSize: 14,
      lineHeight: 1.2,
      color: "#fff"
    }
  }, "Restaurant Chain"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      color: "var(--sidebar-muted)",
      fontSize: 11,
      marginTop: 2
    }
  }, "Dashboard"))), /*#__PURE__*/React.createElement(SidebarDivider, null), /*#__PURE__*/React.createElement(SidebarLabel, null, "Switch role"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, roles.map(r => /*#__PURE__*/React.createElement(SidebarItem, {
    key: r.id,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: r.iconName,
      size: 18
    }),
    active: role === r.id,
    onClick: () => onRole(r.id)
  }, r.label))), /*#__PURE__*/React.createElement(SidebarDivider, null), /*#__PURE__*/React.createElement(SidebarLabel, null, "Navigation"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, views.map(v => /*#__PURE__*/React.createElement(SidebarItem, {
    key: v.id,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: v.iconName,
      size: 18
    }),
    active: view === v.id,
    onClick: () => onView(v.id)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: "capitalize"
    }
  }, v.id)))), /*#__PURE__*/React.createElement(SidebarDivider, null), /*#__PURE__*/React.createElement(SidebarLabel, null, "System"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(SidebarItem, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "bell",
      size: 18
    })
  }, "Notifications"), /*#__PURE__*/React.createElement(SidebarItem, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "settings",
      size: 18
    })
  }, "Settings"), /*#__PURE__*/React.createElement(SidebarItem, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "help-circle",
      size: 18
    })
  }, "Help & Support")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      paddingTop: 8,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
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
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "moon",
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, "Dark Mode")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 10px",
      color: "#8ca299",
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement(LiveDot, {
    size: 7
  }), /*#__PURE__*/React.createElement("span", null, "Live \xB7 Synced 42s ago")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: 10,
      borderRadius: 10,
      background: "#182521",
      border: "1px solid #2a3d35"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: "KP",
    size: 36
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "hidden",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      fontSize: 13,
      color: "#fff"
    }
  }, "Kaushik Patil"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      color: "#8ca299",
      fontSize: 11
    }
  }, activeRole?.label)))));
}
window.KitSidebar = KitSidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "restaurant_dashboard_ui_kit/parts/KitSidebar.jsx", error: String((e && e.message) || e) }); }

// restaurant_dashboard_ui_kit/parts/OutletTable.jsx
try { (() => {
// OutletTable — the brand's outlet health & risk monitor row list.
function OutletTable({
  outlets,
  onInspect
}) {
  const ns = window.UXscapeDashboardDesignSystem_6e71f2;
  const {
    StatusPill,
    Button
  } = ns;
  const {
    fmtINR
  } = window.kitData;
  const health = o => {
    let s = 0;
    if (o.stockHealth >= 80) s += 2;else if (o.stockHealth >= 65) s += 1;
    if (o.margin >= 26) s += 2;else if (o.margin >= 22) s += 1;
    if (o.nps >= 65) s += 2;else if (o.nps >= 55) s += 1;
    if (o.growth >= 15) s += 2;else if (o.growth >= 8) s += 1;
    if (s >= 7) return {
      tone: "success",
      label: "Healthy"
    };
    if (s >= 4) return {
      tone: "warning",
      label: "Watch"
    };
    return {
      tone: "danger",
      label: "At Risk"
    };
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid"
    }
  }, [...outlets].sort((a, b) => b.sales - a.sales).map((o, i) => {
    const h = health(o);
    return /*#__PURE__*/React.createElement("div", {
      key: o.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "14px 0",
        borderBottom: i === outlets.length - 1 ? "0" : "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        width: 34,
        height: 34,
        display: "grid",
        placeItems: "center",
        borderRadius: 8,
        background: "var(--green-soft)",
        color: "var(--green)",
        fontSize: 14,
        fontWeight: 900
      }
    }, i + 1), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 2,
        minWidth: 160
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        display: "block",
        fontSize: 14
      }
    }, o.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--muted)"
      }
    }, o.area, " \xB7 ", o.manager)), /*#__PURE__*/React.createElement(StatusPill, {
      tone: h.tone,
      style: {
        minWidth: 72,
        textAlign: "center",
        justifyContent: "center"
      }
    }, h.label), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        display: "block"
      }
    }, fmtINR(o.sales)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--green)"
      }
    }, "+", o.growth, "% growth")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        display: "block"
      }
    }, o.margin, "%"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--muted)"
      }
    }, "Margin")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        display: "block"
      }
    }, o.nps, " NPS"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--muted)"
      }
    }, o.rating, "\u2605 rating")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        display: "block",
        color: o.stockHealth < 70 ? "var(--coral)" : o.stockHealth < 80 ? "var(--amber)" : "var(--green)"
      }
    }, o.stockHealth, "%"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--muted)"
      }
    }, "Stock health")), /*#__PURE__*/React.createElement(Button, {
      variant: "mini",
      onClick: () => onInspect(o)
    }, "Inspect"));
  }));
}
window.OutletTable = OutletTable;
})(); } catch (e) { __ds_ns.__errors.push({ path: "restaurant_dashboard_ui_kit/parts/OutletTable.jsx", error: String((e && e.message) || e) }); }

// restaurant_dashboard_ui_kit/parts/ReviewTicker.jsx
try { (() => {
// ReviewTicker — scrollable list of FeedbackCards used in the
// leakage-feedback panel.
function ReviewTicker({
  items
}) {
  const ns = window.UXscapeDashboardDesignSystem_6e71f2;
  const {
    FeedbackCard,
    Badge
  } = ns;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 280,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      paddingRight: 6
    }
  }, items.map(r => /*#__PURE__*/React.createElement(FeedbackCard, {
    key: r.id,
    user: r.user,
    rating: r.rating,
    content: r.note,
    time: r.time,
    badge: /*#__PURE__*/React.createElement(Badge, {
      tone: r.tagTone
    }, "#", r.tag)
  })));
}
window.ReviewTicker = ReviewTicker;
})(); } catch (e) { __ds_ns.__errors.push({ path: "restaurant_dashboard_ui_kit/parts/ReviewTicker.jsx", error: String((e && e.message) || e) }); }

// restaurant_dashboard_ui_kit/parts/TrendChart.jsx
try { (() => {
// TrendChart — the brand's signature interactive bar chart with
// alternating green / amber / blue bar fills and dark popover tooltips.
function TrendChart({
  points
}) {
  const {
    fmtINR
  } = window.kitData;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 260,
      display: "grid",
      gridTemplateColumns: `repeat(${points.length}, 1fr)`,
      alignItems: "end",
      gap: 10,
      padding: "16px 0 0"
    }
  }, points.map((p, i) => {
    const fill = i % 3 === 2 ? "var(--chart-amber-bar)" : i % 4 === 3 ? "var(--chart-blue-bar)" : "var(--chart-green-bar)";
    return /*#__PURE__*/React.createElement("span", {
      key: p.label,
      tabIndex: 0,
      "aria-label": `${p.label}: ${fmtINR(p.sales)}, ${p.orders} orders`,
      className: "kit-bar",
      style: {
        position: "relative",
        minHeight: 30,
        height: `${p.height}%`,
        borderRadius: "6px 6px 2px 2px",
        background: fill,
        cursor: "pointer",
        transition: "transform 160ms ease, filter 160ms ease, box-shadow 160ms ease"
      }
    }, /*#__PURE__*/React.createElement("i", {
      style: {
        position: "absolute",
        inset: "7px 7px auto 7px",
        height: 4,
        borderRadius: 99,
        background: "rgba(255, 255, 255, 0.64)"
      }
    }), /*#__PURE__*/React.createElement("b", {
      className: "kit-bar__tip",
      style: {
        position: "absolute",
        left: "50%",
        bottom: "calc(100% + 12px)",
        minWidth: 132,
        display: "grid",
        gap: 3,
        padding: 10,
        opacity: 0,
        transform: "translate(-50%, 6px)",
        transition: "opacity 160ms ease, transform 160ms ease",
        zIndex: 5,
        background: "#101916",
        color: "#fff",
        borderRadius: 8,
        border: "1px solid rgba(20,33,28,0.12)",
        boxShadow: "var(--shadow-pop)",
        pointerEvents: "none",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: 13,
        lineHeight: 1.2
      }
    }, /*#__PURE__*/React.createElement("em", {
      style: {
        color: "#9ddabb",
        fontSize: 11,
        fontStyle: "normal",
        fontWeight: 900,
        textTransform: "uppercase"
      }
    }, p.label), fmtINR(p.sales), /*#__PURE__*/React.createElement("small", {
      style: {
        color: "#c9d8d1",
        fontSize: 12
      }
    }, p.orders, " orders")));
  }), /*#__PURE__*/React.createElement("style", null, `
        .kit-bar:hover, .kit-bar:focus-visible {
          z-index: 3;
          filter: saturate(1.12);
          transform: translateY(-8px);
          box-shadow: var(--shadow-bar);
        }
        .kit-bar:hover .kit-bar__tip, .kit-bar:focus-visible .kit-bar__tip {
          opacity: 1;
          transform: translate(-50%, 0);
        }
      `));
}
window.TrendChart = TrendChart;
})(); } catch (e) { __ds_ns.__errors.push({ path: "restaurant_dashboard_ui_kit/parts/TrendChart.jsx", error: String((e && e.message) || e) }); }

// restaurant_dashboard_ui_kit/screens/ChefOverview.jsx
try { (() => {
// ChefOverview — Head Chef variant. Same chrome, different metric row
// and a kitchen-load focused panel beneath.
function ChefOverview() {
  const ns = window.UXscapeDashboardDesignSystem_6e71f2;
  const {
    MetricCard,
    Panel,
    StatusPill,
    MiniMeter
  } = ns;
  const {
    weeklyTrend,
    fmtINR
  } = window.kitData;
  const chefs = [{
    name: "Aarav Mehta",
    role: "Head Chef",
    outlet: "Central Square",
    station: "Hot line",
    score: 96,
    prep: 15,
    quality: 4.9,
    tickets: 42,
    load: 78
  }, {
    name: "Riya Nair",
    role: "Sous Chef",
    outlet: "Lake Road",
    station: "Grill",
    score: 88,
    prep: 19,
    quality: 4.6,
    tickets: 38,
    load: 86
  }, {
    name: "Kabir Sethi",
    role: "Line Chef",
    outlet: "Campus Gate",
    station: "Fryer",
    score: 91,
    prep: 16,
    quality: 4.8,
    tickets: 34,
    load: 72
  }, {
    name: "Nisha Rao",
    role: "Pastry Lead",
    outlet: "Central Square",
    station: "Dessert",
    score: 84,
    prep: 22,
    quality: 4.5,
    tickets: 29,
    load: 69
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(MetricCard, {
    label: "Net sales",
    value: fmtINR(599000),
    change: "+13.4% vs last week",
    accent: "green"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "Orders",
    value: "1,096",
    change: "268 delivery orders",
    accent: "blue"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "Live queue",
    value: "58",
    change: "tickets being prepared",
    accent: "amber"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "CX score",
    value: "64 NPS",
    change: "4.6 avg rating",
    accent: "coral"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "Avg. prep",
    value: "18 min",
    change: "target 18 min",
    accent: "purple"
  })), /*#__PURE__*/React.createElement(Panel, {
    eyebrow: "Performance",
    title: "Revenue and order trend",
    action: /*#__PURE__*/React.createElement(StatusPill, {
      tone: "success"
    }, "Healthy trajectory")
  }, /*#__PURE__*/React.createElement(TrendChart, {
    points: weeklyTrend
  })), /*#__PURE__*/React.createElement(Panel, {
    eyebrow: "Kitchen",
    title: "Chef performance & station load"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      gap: 14
    }
  }, chefs.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.name,
    style: {
      minHeight: 236,
      padding: 18,
      border: "1px solid var(--border-subtle)",
      borderRadius: 8,
      background: "var(--surface-card)",
      boxShadow: "var(--shadow-card)",
      display: "grid",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 15
    }
  }, c.name), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--muted)",
      fontSize: 12
    }
  }, c.role), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--muted)",
      fontSize: 12
    }
  }, c.outlet, " \xB7 ", c.station)), /*#__PURE__*/React.createElement("b", {
    style: {
      width: 42,
      height: 42,
      display: "grid",
      placeItems: "center",
      borderRadius: 8,
      background: "var(--green-soft)",
      color: "var(--green)",
      fontSize: 16,
      fontWeight: 900
    }
  }, c.score)), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--green)",
      fontWeight: 850,
      margin: 0,
      fontSize: 13
    }
  }, c.quality, "\u2605 quality \xB7 ", c.prep, " min avg prep"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(MiniMeter, {
    value: c.load,
    label: "Station load",
    suffix: `${c.load}%`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      color: "var(--muted)",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, "Tickets today"), /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-primary)"
    }
  }, c.tickets))))))));
}
window.ChefOverview = ChefOverview;
})(); } catch (e) { __ds_ns.__errors.push({ path: "restaurant_dashboard_ui_kit/screens/ChefOverview.jsx", error: String((e && e.message) || e) }); }

// restaurant_dashboard_ui_kit/screens/RegionalOverview.jsx
try { (() => {
// RegionalOverview — the dashboard's marquee screen.
function RegionalOverview({
  selectedOutlet,
  onInspect
}) {
  const ns = window.UXscapeDashboardDesignSystem_6e71f2;
  const {
    MetricCard,
    SummaryCard,
    Panel,
    StatusPill,
    Button
  } = ns;
  const {
    outlets,
    weeklyTrend,
    dayParts,
    reviews,
    fmtINR
  } = window.kitData;
  const scoped = selectedOutlet === "all" ? outlets : outlets.filter(o => o.id === selectedOutlet);
  const totals = scoped.reduce((a, o) => ({
    sales: a.sales + o.sales,
    orders: a.orders + o.orders
  }), {
    sales: 0,
    orders: 0
  });
  const avgNps = Math.round(scoped.reduce((s, o) => s + o.nps, 0) / scoped.length);
  const avgRating = (scoped.reduce((s, o) => s + o.rating, 0) / scoped.length).toFixed(1);
  const avgStock = Math.round(scoped.reduce((s, o) => s + o.stockHealth, 0) / scoped.length);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(MetricCard, {
    label: "Net sales",
    value: fmtINR(totals.sales),
    change: "+13.4% vs last week",
    accent: "green"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "Orders",
    value: totals.orders.toLocaleString("en-IN"),
    change: "268 delivery orders",
    accent: "blue"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "Live queue",
    value: 58,
    change: "tickets being prepared",
    accent: "amber"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "CX score",
    value: `${avgNps} NPS`,
    change: `${avgRating} avg rating`,
    accent: "coral"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "Stock health",
    value: `${avgStock}%`,
    change: "1 alert open",
    accent: "purple"
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.7fr) minmax(0, 0.85fr)",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    eyebrow: "Performance",
    title: "Revenue and order trend",
    action: /*#__PURE__*/React.createElement(StatusPill, {
      tone: "success"
    }, "Healthy trajectory"),
    style: {
      gridColumn: "span 2",
      minHeight: 374
    }
  }, /*#__PURE__*/React.createElement(TrendChart, {
    points: weeklyTrend
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-subtle)",
      marginTop: 10,
      paddingTop: 14,
      display: "flex",
      alignItems: "baseline",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 20,
      fontWeight: 900
    }
  }, fmtINR(Math.round(totals.sales / 7))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--muted)",
      fontSize: 13
    }
  }, "average daily sales for selected scope"))), /*#__PURE__*/React.createElement(Panel, {
    eyebrow: "Demand mix",
    title: "Day-part contribution",
    style: {
      minHeight: 374
    }
  }, /*#__PURE__*/React.createElement(DonutChart, {
    slices: dayParts,
    centerLabel: totals.orders.toLocaleString("en-IN"),
    centerSub: "orders"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 12,
      marginTop: 18
    }
  }, dayParts.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.label,
    style: {
      display: "grid",
      gridTemplateColumns: "10px 1fr auto",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: d.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--muted)"
    }
  }, d.label), /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 13
    }
  }, d.value, "%")))))), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(SummaryCard, {
    label: "Sales",
    value: fmtINR(totals.sales),
    detail: `${fmtINR(Math.round(totals.sales / 7))} avg daily`,
    tone: "green"
  }), /*#__PURE__*/React.createElement(SummaryCard, {
    label: "Fulfilled",
    value: (totals.orders - 58).toLocaleString("en-IN"),
    detail: "95% of orders completed or closed",
    tone: "blue"
  }), /*#__PURE__*/React.createElement(SummaryCard, {
    label: "Unfulfilled",
    value: 58,
    detail: "2 delayed orders need attention",
    tone: "amber"
  }), /*#__PURE__*/React.createElement(SummaryCard, {
    label: "Est. P&L",
    value: fmtINR(Math.round(totals.sales * 0.26 - totals.sales * 0.032)),
    detail: "26% margin after service leakage",
    tone: "purple"
  })), /*#__PURE__*/React.createElement(Panel, {
    eyebrow: "Outlet health",
    title: "Performance & Risk Monitor",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "link"
    }, "Open orders \u2192")
  }, /*#__PURE__*/React.createElement(OutletTable, {
    outlets: outlets,
    onInspect: onInspect
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.1fr 0.9fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    eyebrow: "Leakage analysis",
    title: "Aggregator channel conversion",
    action: /*#__PURE__*/React.createElement(StatusPill, {
      tone: "warning"
    }, "9.2% drop-off")
  }, /*#__PURE__*/React.createElement(FunnelBars, {
    stages: [{
      label: "Received",
      count: 1000,
      fill: "var(--blue)"
    }, {
      label: "Accepted",
      count: 920,
      fill: "var(--green)"
    }, {
      label: "Kitchen cancel",
      count: 45,
      fill: "var(--amber)"
    }, {
      label: "Logi drop-off",
      count: 12,
      fill: "var(--coral)"
    }]
  })), /*#__PURE__*/React.createElement(Panel, {
    eyebrow: "Real-time reviews feed",
    title: "Customer sentiment matrix",
    action: /*#__PURE__*/React.createElement(StatusPill, {
      tone: "info"
    }, "Active stream")
  }, /*#__PURE__*/React.createElement(ReviewTicker, {
    items: reviews
  }))));
}
function FunnelBars({
  stages
}) {
  const max = Math.max(...stages.map(s => s.count));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 14
    }
  }, stages.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      display: "grid",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      color: "var(--muted)",
      fontSize: 12,
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("span", null, s.label), /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-primary)"
    }
  }, s.count.toLocaleString("en-IN"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 18,
      borderRadius: 6,
      background: "#e8eee9",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      display: "block",
      height: "100%",
      width: `${s.count / max * 100}%`,
      background: s.fill,
      borderRadius: "inherit"
    }
  })))));
}
window.RegionalOverview = RegionalOverview;
})(); } catch (e) { __ds_ns.__errors.push({ path: "restaurant_dashboard_ui_kit/screens/RegionalOverview.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.BrandMark = __ds_scope.BrandMark;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.MetricCard = __ds_scope.MetricCard;

__ds_ns.MiniMeter = __ds_scope.MiniMeter;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.SummaryCard = __ds_scope.SummaryCard;

__ds_ns.FeedbackCard = __ds_scope.FeedbackCard;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.UsageGuideBanner = __ds_scope.UsageGuideBanner;

__ds_ns.GuideStep = __ds_scope.GuideStep;

__ds_ns.WarningBanner = __ds_scope.WarningBanner;

__ds_ns.CommandInput = __ds_scope.CommandInput;

__ds_ns.FieldSelect = __ds_scope.FieldSelect;

__ds_ns.RangeSwitch = __ds_scope.RangeSwitch;

__ds_ns.ViewTabs = __ds_scope.ViewTabs;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.LiveDot = __ds_scope.LiveDot;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.SidebarDivider = __ds_scope.SidebarDivider;

__ds_ns.SidebarLabel = __ds_scope.SidebarLabel;

__ds_ns.SidebarItem = __ds_scope.SidebarItem;

})();
