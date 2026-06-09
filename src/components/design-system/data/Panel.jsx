import React from "react";

/**
 * Panel — generic white card surface. Use as the outer wrapper of
 * any dashboard panel (chart, outlet list, feedback list).
 *
 * If `eyebrow` and/or `title` are provided, renders the standard
 * panel-heading at the top with optional `action` on the right.
 */
export function Panel({
  eyebrow,
  title,
  action,
  padding = 20,
  children,
  style,
  ...rest
}) {
  return (
    <section
      style={{
        padding,
        border: "1px solid var(--border-subtle)",
        borderRadius: 8,
        background: "var(--surface-card)",
        boxShadow: "var(--shadow-card)",
        minWidth: 0,
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {(eyebrow || title || action) && (
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 18,
            flexWrap: "wrap",
            minWidth: 0,
          }}
        >
          <div style={{ display: "grid", gap: 2, minWidth: 0 }}>
            {eyebrow && (
              <p
                style={{
                  margin: 0,
                  color: "var(--text-success)",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                style={{
                  margin: 0,
                  fontSize: 19,
                  lineHeight: 1.15,
                  fontWeight: 850,
                  color: "var(--text-primary)",
                }}
              >
                {title}
              </h2>
            )}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
