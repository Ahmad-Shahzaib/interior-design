import { motion, LayoutGroup } from "framer-motion";
import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";
import { UNSPLASH } from "@/lib/data";

const MATERIALS = [
  { id: "marble", name: "Marble", img: UNSPLASH.marble, note: "Nero Marquina · Calacatta · Travertino" },
  { id: "wood", name: "Wood", img: UNSPLASH.wood, note: "Walnut · Oak · Smoked ash" },
  { id: "concrete", name: "Concrete", img: UNSPLASH.concrete, note: "Polished · Pigmented · Board-formed" },
  { id: "brass", name: "Brass", img: UNSPLASH.brass, note: "Brushed · Patinated · Polished" },
];

const PALETTE = [
  { name: "Ink", hex: "#0a0a0a" },
  { name: "Bone", hex: "#f1ece1" },
  { name: "Gold", hex: "#c9a96a" },
  { name: "Stone", hex: "#928a7d" },
  { name: "Espresso", hex: "#3a2a20" },
  { name: "Linen", hex: "#dcd2bf" },
];

export default function Materials() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <PageTransition>
      <section className="pt-32 pb-16 container-editorial">
        <SectionLabel>SUBSTANCE</SectionLabel>
        <h1 className="font-serif text-bone text-5xl md:text-8xl mt-4">Materials & finishes.</h1>
      </section>

      <LayoutGroup>
        <section className="container-editorial grid grid-cols-1 md:grid-cols-2 gap-4 pb-24">
          {MATERIALS.map((m) => (
            <motion.button
              layoutId={`mat-${m.id}`}
              key={m.id}
              onClick={() => setActive(m.id)}
              className="relative aspect-[4/3] overflow-hidden group"
              data-cursor="view"
            >
              <img src={m.img} alt={m.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/20 transition-colors" />
              <div className="absolute bottom-6 left-6 text-left">
                <p className="font-serif text-bone text-4xl">{m.name}</p>
                <p className="text-xs uppercase tracking-[0.25em] text-bone/70 mt-1">{m.note}</p>
              </div>
            </motion.button>
          ))}
        </section>

        {active && (
          <motion.div
            className="fixed inset-0 z-[300] bg-ink/95 flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div layoutId={`mat-${active}`} className="relative w-[90vw] h-[80vh]">
              <img src={MATERIALS.find(m => m.id === active)!.img} alt="" className="w-full h-full object-cover" />
              <div className="absolute bottom-8 left-8">
                <p className="font-serif text-bone text-7xl">{MATERIALS.find(m => m.id === active)!.name}</p>
              </div>
              <button className="absolute top-4 right-4 text-bone text-sm">CLOSE ✕</button>
            </motion.div>
          </motion.div>
        )}
      </LayoutGroup>

      <section className="container-editorial py-24">
        <SectionLabel>PALETTE</SectionLabel>
        <h2 className="font-serif text-bone text-4xl md:text-6xl mt-4 mb-12">A house palette.</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {PALETTE.map((c) => (
            <motion.div
              key={c.name}
              whileHover={{ y: -8 }}
              className="aspect-square relative overflow-hidden"
              style={{ backgroundColor: c.hex }}
            >
              <div className="absolute bottom-2 left-2 text-xs uppercase tracking-[0.2em]" style={{ color: c.hex === "#0a0a0a" ? "#f1ece1" : "#0a0a0a" }}>
                {c.name}<br /><span className="opacity-70">{c.hex}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
