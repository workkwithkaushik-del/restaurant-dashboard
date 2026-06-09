import React from "react";

/**
 * ViewTabs — the dark-pill tab control used for view switching
 * (Overview / Menu / Orders / …). Active tab flips to ink with
 * white text; inactive tabs are muted.
 */
export function ViewTabs({ options = [], value, onChange, style }) {
  return (
    <div
      role="tablist"
      style={{
        width: "fit-content",
        padding: 4,
        border: "1px solid var(--border-subtle)",
        borderRadius: 8,
        background: "var(--input-bg)",
        display: "flex",
        gap: 4,
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      {options.map((opt) => {
        const v = typeof opt === "string" ? opt : opt.value;
        const l = typeof opt === "string" ? opt : opt.label;
        const active = v === value;
        return (
          <button
            key={v}
            role="tab"
            aria-selected={active}
            onClick={() => onChange && onChange(v)}
            style={{
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
