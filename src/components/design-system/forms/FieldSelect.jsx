import React from "react";

/**
 * FieldSelect — labelled select. Label is the brand's
 * uppercase-muted form micro-label. Select is 36–42px tall depending
 * on `size`.
 */
export function FieldSelect({
  label,
  value,
  onChange,
  children,
  size = "md",
  style,
  ...rest
}) {
  const h = size === "sm" ? 36 : 42;
  return (
    <label
      style={{
        display: "grid",
        gap: 6,
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      {label && (
        <span
          style={{
            color: "var(--muted)",
            fontSize: 12,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {label}
        </span>
      )}
      <select
        value={value}
        onChange={onChange}
        style={{
          minHeight: h,
          borderRadius: 8,
          border: "1px solid var(--border-subtle)",
          background: "var(--input-bg)",
          color: "var(--text-primary)",
          padding: "0 36px 0 14px",
          fontSize: 14,
          fontWeight: 600,
          appearance: "none",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='%2368766f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M4 6l4 4 4-4'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
        }}
        {...rest}
      >
        {children}
      </select>
    </label>
  );
}
