import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Counter = ({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0; const start = performance.now(); const dur = 1800;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
      <div className="font-serif text-5xl md:text-7xl text-bone">{n}{suffix}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
    </motion.div>
  );
};
