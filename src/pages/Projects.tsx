import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";
import { PROJECTS } from "@/lib/data";

const FILTERS = ["All", "Residential", "Commercial", "Hospitality", "Retail"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const items = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  return (
    <PageTransition>
      <section className="pt-32 pb-12 container-editorial">
        <SectionLabel>ARCHIVE</SectionLabel>
        <h1 className="font-serif text-bone text-5xl md:text-8xl mt-4">Projects.</h1>
      </section>

      <div className="container-editorial flex flex-wrap gap-3 pb-12">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 text-xs uppercase tracking-[0.2em] border transition-all duration-300 ${
              filter === f ? "bg-bone text-ink border-bone" : "border-border text-bone/70 hover:border-bone"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <LayoutGroup>
        <motion.div layout className="container-editorial grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
          <AnimatePresence mode="popLayout">
            {items.map((p) => (
              <motion.div
                layout
                key={p.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
              >
                <Link to={`/project/${p.slug}`} data-cursor="view" className="group relative block aspect-[4/5] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                  <span className="absolute inset-2 border border-gold/0 group-hover:border-gold/70 transition-all duration-700 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs uppercase tracking-[0.25em] text-gold">{p.category} · {p.year}</p>
                    <h3 className="font-serif text-bone text-2xl md:text-3xl mt-1">{p.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </PageTransition>
  );
}
