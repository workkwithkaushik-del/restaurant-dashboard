import React from "react";

/**
 * FeedbackCard — single review ticker card. Header row: user + rating
 * + auto-detected #tag badge. Body: the review text. Footer: time.
 */
export function FeedbackCard({ user, rating = 0, badge, content, time, style }) {
  const stars = "★".repeat(rating) + "☆".repeat(Math.max(0, 5 - rating));
  return (
    <div
      style={{
        padding: 14,
        background: "var(--wash)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        transition: "transform .2s ease, border-color .2s ease",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: 13,
            color: "var(--text-primary)",
          }}
        >
          {user}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: "var(--amber)" }}>{stars}</span>
          {badge}
        </div>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 12,
          color: "var(--muted)",
          lineHeight: 1.45,
        }}
      >
        {content}
      </p>
      {time && (
        <span
          style={{
            fontSize: 10,
            color: "var(--muted)",
            display: "block",
            textAlign: "right",
          }}
        >
          {time}
        </span>
      )}
    </div>
  );
}
