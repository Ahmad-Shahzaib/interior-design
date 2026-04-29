import { useEffect, useRef, useState } from "react";

export const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"default" | "link" | "view" | "drag">("default");
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (hidden) setHidden(false);
    };

    const tick = () => {
      dot.x += (target.x - dot.x) * 0.9;
      dot.y += (target.y - dot.y) * 0.9;
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const detect = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t) return;
      if (t.closest("[data-cursor='view']") || t.tagName === "IMG") setVariant("view");
      else if (t.closest("[data-cursor='drag']")) setVariant("drag");
      else if (t.closest("a, button, [role='button'], [data-cursor='link']")) setVariant("link");
      else setVariant("default");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", detect);
    window.addEventListener("mouseleave", () => setHidden(true));
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", detect);
      cancelAnimationFrame(raf);
    };
  }, [hidden]);

  const ringSize = variant === "view" ? 64 : variant === "link" || variant === "drag" ? 60 : 32;
  const ringBg = variant === "link" || variant === "view" || variant === "drag" ? "hsl(var(--bone) / 0.15)" : "transparent";
  const label = variant === "view" ? "VIEW" : variant === "drag" ? "DRAG" : "";

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:flex items-center justify-center rounded-full border border-bone/70 transition-[width,height,background-color] duration-300 ease-out"
        style={{
          width: ringSize, height: ringSize, backgroundColor: ringBg,
          opacity: hidden ? 0 : 1, mixBlendMode: "difference",
        }}
      >
        {label && <span className="text-[10px] tracking-[0.2em] text-bone font-sans">{label}</span>}
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block w-2 h-2 rounded-full bg-bone"
        style={{ opacity: hidden || variant === "view" ? 0 : 1, mixBlendMode: "difference" }}
      />
    </>
  );
};
