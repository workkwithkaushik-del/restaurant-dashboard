// Icon — Lucide UMD wrapper. Re-creates a <span> with <i data-lucide>.
function Icon({ name, size = 18, color, style }) {
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
  return (
    <span
      ref={ref}
      style={{ display: "inline-flex", lineHeight: 0, ...style }}
    />
  );
}

window.Icon = Icon;
