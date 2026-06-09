import React from "react";

/**
 * RangeSwitch — segmented control. Active segment fills with green,
 * inactive segments are muted text on transparent. Used for time
 * range (Today / Week / Month) and similar bucketed switches.
 */
export function RangeSwitch({
  options = [],
  value,
  onChange,
  ariaLabel,
  style,
  className = "",
  ...rest
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={className}
      style={{
        height: 42,
        display: "flex",
        gap: 4,
        padding: 4,
        border: "1px solid var(--border-subtle)",
        borderRadius: 8,
        background: "var(--input-bg)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {options.map((opt) => {
        const v = typeof opt === "string" ? opt : opt.value;
        const l = typeof opt === "string" ? opt : opt.label;
        const active = v === value;
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange && onChange(v)}
            style={{
              minHeight: 32,
              border: 0,
              borderRadius: 6,
              padding: "0 12px",
              background: active ? "var(--accent-green)" : "transparent",
              color: active ? "var(--panel)" : "var(--muted)",
              fontWeight: 800,
              fontSize: 13,
              cursor: "pointer",
              transition: "var(--transition-hover)",
            }}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
