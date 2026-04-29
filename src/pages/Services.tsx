import { motion } from "framer-motion";
import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";
import { UNSPLASH } from "@/lib/data";
import { Plus, Minus } from "lucide-react";

const SERVICES = [
  { title: "Interior Design", text: "Concept, layout, and atmosphere — from first sketch to final cushion.", img: UNSPLASH.i1 },
  { title: "Space Planning", text: "Plans that prioritise circulation, light, and the slow life of rooms.", img: UNSPLASH.i2 },
  { title: "FF&E", text: "Furniture, fixtures and equipment, sourced and curated globally.", img: UNSPLASH.i3 },
  { title: "Lighting Design", text: "Layered, dimmable, scene-based lighting that follows the day.", img: UNSPLASH.i4 },
  { title: "Art Curation", text: "Bespoke art programmes from emerging and established practitioners.", img: UNSPLASH.i5 },
  { title: "Project Management", text: "Trade coordination, schedule, and on-site quality control.", img: UNSPLASH.i6 },
];

const Icon = ({ i }: { i: number }) => (
  <svg viewBox="0 0 40 40" className="w-10 h-10 text-gold">
    <motion.circle
      cx="20" cy="20" r="16" stroke="currentColor" fill="none" strokeWidth="1"
      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
      transition={{ duration: 1.2, delay: i * 0.1 }}
    />
    <motion.text x="20" y="25" textAnchor="middle" fontSize="12" fill="currentColor"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 + i * 0.1 }}
    >{String(i + 1).padStart(2, "0")}</motion.text>
  </svg>
);

export default function Services() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <PageTransition>
      <section className="pt-32 pb-16 container-editorial">
        <SectionLabel>WHAT WE DO</SectionLabel>
        <h1 className="font-serif text-bone text-5xl md:text-8xl mt-4">Services.</h1>
      </section>

      <section className="container-editorial pb-32">
        {SERVICES.map((s, i) => {
          const active = open === i;
          return (
            <div key={s.title} className="border-t border-border last:border-b">
              <button
                onClick={() => setOpen(active ? null : i)}
                className="w-full py-8 grid grid-cols-12 items-center gap-4 text-left group relative"
              >
                <span className="col-span-1 text-gold text-sm tracking-[0.2em]">{String(i + 1).padStart(2, "0")}</span>
                <span className="col-span-2 hidden md:block"><Icon i={i} /></span>
                <span className="col-span-9 md:col-span-7 font-serif text-bone text-3xl md:text-5xl relative">
                  {s.title}
                  <span className="absolute left-0 -bottom-1 h-px bg-gold transition-all duration-700 origin-left scale-x-0 group-hover:scale-x-100 w-full" />
                </span>
                <span className="col-span-2 justify-self-end text-bone">{active ? <Minus /> : <Plus />}</span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12 pt-4">
                  <p className="text-bone/70 text-lg leading-relaxed">{s.text}</p>
                  <img src={s.img} alt={s.title} loading="lazy" className="w-full aspect-[4/3] object-cover" />
                </div>
              </motion.div>
            </div>
          );
        })}
      </section>
    </PageTransition>
  );
}
