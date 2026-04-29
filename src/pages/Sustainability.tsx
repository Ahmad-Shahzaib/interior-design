import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";
import { UNSPLASH } from "@/lib/data";

const Ring = ({ value, label }: { value: number; label: string }) => {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const C = 2 * Math.PI * 70;
  return (
    <div className="flex flex-col items-center text-center">
      <svg ref={ref} viewBox="0 0 160 160" className="w-40 h-40">
        <circle cx="80" cy="80" r="70" stroke="hsl(var(--border))" strokeWidth="2" fill="none" />
        <motion.circle
          cx="80" cy="80" r="70" stroke="hsl(var(--gold))" strokeWidth="2" fill="none"
          strokeLinecap="round" transform="rotate(-90 80 80)"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={inView ? { strokeDashoffset: C - (C * value) / 100 } : {}}
          transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }}
        />
        <text x="80" y="88" textAnchor="middle" className="fill-bone font-serif" fontSize="32">{value}%</text>
      </svg>
      <p className="text-xs uppercase tracking-[0.25em] text-bone/70 mt-4">{label}</p>
    </div>
  );
};

const SECTIONS = [
  { img: UNSPLASH.wood, title: "Sourced responsibly", text: "FSC-certified timber, traceable stone, and partnerships with mills that pay a living wage." },
  { img: UNSPLASH.brass, title: "Made to last", text: "We design for repair, not replacement. Every piece specified to outlive its first life." },
  { img: UNSPLASH.marble, title: "Local first", text: "Where possible, all artisans live within 200 km of the project. Travel is the most expensive material." },
];

export default function Sustainability() {
  return (
    <PageTransition>
      <section className="pt-32 pb-16 container-editorial">
        <SectionLabel>STEWARDSHIP</SectionLabel>
        <h1 className="font-serif text-bone text-5xl md:text-8xl mt-4">Designing slowly,<br />deliberately.</h1>
      </section>

      <section className="container-editorial py-16 grid grid-cols-2 md:grid-cols-4 gap-12">
        <Ring value={92} label="FSC timber" />
        <Ring value={78} label="Local artisans" />
        <Ring value={65} label="Recycled content" />
        <Ring value={100} label="Carbon offset" />
      </section>

      {SECTIONS.map((s, i) => (
        <section key={i} className={`container-editorial py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center`}>
          <motion.img
            src={s.img} alt={s.title} loading="lazy"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className={`aspect-[4/3] object-cover ${i % 2 ? "md:order-2" : ""}`}
          />
          <div>
            <p className="font-serif text-gold text-2xl">0{i + 1}</p>
            <h2 className="font-serif text-bone text-4xl md:text-5xl mt-2">{s.title}</h2>
            <p className="text-bone/70 mt-6 text-lg leading-relaxed">{s.text}</p>
          </div>
        </section>
      ))}
    </PageTransition>
  );
}
