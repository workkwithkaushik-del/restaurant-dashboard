import React from "react";

/**
 * CommandInput — the brand's signature search bar. A green uppercase
 * "SEARCH" / "ASK" label sits inside the input on the left, followed
 * by the field. Sits in the command-bar with an action button.
 *
 * Pass `label="SEARCH"` to change the inner label; default is "Search".
 */
export function CommandInput({
  label = "Search",
  placeholder,
  value,
  onChange,
  style,
  ...rest
}) {
  return (
    <div
      style={{
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
        ...style,
      }}
    >
      <span
        style={{
          color: "var(--text-success)",
          fontSize: 12,
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          border: 0,
          color: "var(--text-primary)",
          background: "transparent",
          outline: "none",
          fontSize: 14,
        }}
        {...rest}
      />
    </div>
  );
}
