import React from "react";

/**
 * Avatar — round monogram. Default uses the green→teal gradient
 * (sidebar profile). variant="brand" uses the amber-yellow brand
 * gradient (logo mark / outlet rank bubble).
 */
export function Avatar({
  initials,
  size = 36,
  variant = "user",
  style,
  ...rest
}) {
  const variants = {
    user: {
      background: "linear-gradient(135deg, var(--green), #2dd4bf)",
      color: "#fff",
    },
    brand: {
      background: "var(--brand-mark-bg)",
      color: "var(--brand-mark-fg)",
      boxShadow: "var(--shadow-mark)",
    },
    soft: {
      background: "var(--green-soft)",
      color: "var(--green)",
    },
  };
  const v = variants[variant] || variants.user;
  return (
    <span
      style={{
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
        ...style,
      }}
      {...rest}
    >
      {initials}
    </span>
  );
}
