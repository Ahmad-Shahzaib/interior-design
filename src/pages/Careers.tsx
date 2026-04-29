import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";
import { UNSPLASH } from "@/lib/data";

const JOBS = [
  { role: "Senior Interior Designer", location: "Paris", type: "Full-time", desc: "Lead residential and hospitality projects from concept to completion. 8+ years experience." },
  { role: "FF&E Specialist", location: "Milan", type: "Full-time", desc: "Source, specify and procure furniture, fixtures, and equipment for global projects." },
  { role: "Junior Architect", location: "Paris", type: "Full-time", desc: "Support design development and produce drawings under the direction of senior staff." },
  { role: "Project Coordinator", location: "Tokyo", type: "Full-time", desc: "Coordinate trades, schedules, and on-site quality control for hospitality projects." },
  { role: "Studio Internship", location: "Paris", type: "6 months", desc: "Hands-on involvement across all departments. Architecture or design students preferred." },
];

const CULTURE = [UNSPLASH.i7, UNSPLASH.i9, UNSPLASH.i6];

export default function Careers() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <PageTransition>
      <section className="pt-32 pb-16 container-editorial">
        <SectionLabel>JOIN US</SectionLabel>
        <h1 className="font-serif text-bone text-5xl md:text-8xl mt-4">Careers.</h1>
        <p className="text-bone/70 max-w-2xl mt-6 text-lg">
          We are a small studio that grows slowly. When we do hire, we hire for taste, patience, and a long view.
        </p>
      </section>

      <section className="container-editorial pb-24">
        {JOBS.map((j, i) => {
          const active = open === i;
          return (
            <div key={j.role} className="border-t border-border last:border-b">
              <button onClick={() => setOpen(active ? null : i)} className="w-full py-6 flex items-center justify-between text-left">
                <div>
                  <p className="font-serif text-bone text-2xl md:text-4xl">{j.role}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-gold mt-2">{j.location} · {j.type}</p>
                </div>
                <span className="text-bone">{active ? <Minus /> : <Plus />}</span>
              </button>
              <motion.div initial={false} animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }} transition={{ duration: 0.5 }} className="overflow-hidden">
                <div className="pb-8 max-w-2xl">
                  <p className="text-bone/70 leading-relaxed">{j.desc}</p>
                  <button className="mt-6 px-6 py-3 bg-bone text-ink text-xs uppercase tracking-[0.25em]">Apply</button>
                </div>
              </motion.div>
            </div>
          );
        })}
      </section>

      <section className="container-editorial pb-32">
        <SectionLabel>CULTURE</SectionLabel>
        <h2 className="font-serif text-bone text-4xl md:text-6xl mt-4 mb-12">Inside the studio.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CULTURE.map((src, i) => (
            <div key={i} className="overflow-hidden aspect-[3/4]" data-cursor="view">
              <img src={src} alt={`Culture ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" />
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
