import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";
import { UNSPLASH } from "@/lib/data";

const LOGOS = ["AESOP", "HERMÈS", "DIPTYQUE", "LE LABO", "AESOP", "AMAN", "CARTIER", "LORO PIANA", "OFFICINE GENERALE"];
const TESTIMONIALS = [
  { quote: "LUMIÈRE understood our brand before we did. The result is the most photographed boutique we've ever opened.", name: "Camille Bourdon", role: "Creative Director, Maison Verre", img: UNSPLASH.team3 },
  { quote: "A studio of taste, restraint, and astonishing patience.", name: "James Hartley", role: "Founder, Atelier Laurent", img: UNSPLASH.team1 },
  { quote: "They turned 280 m² into a cathedral of stillness.", name: "Mira Okafor", role: "Private Client", img: UNSPLASH.team4 },
];

export default function Clients() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <PageTransition>
      <section className="pt-32 pb-16 container-editorial">
        <SectionLabel>SELECTED CLIENTS</SectionLabel>
        <h1 className="font-serif text-bone text-5xl md:text-8xl mt-4">In good company.</h1>
      </section>

      <section className="overflow-hidden py-12 border-y border-border">
        <div className="flex gap-16 marquee-track whitespace-nowrap">
          {[...LOGOS, ...LOGOS, ...LOGOS].map((l, idx) => (
            <span key={idx} className="font-serif text-3xl md:text-5xl text-bone/40 hover:text-gold transition-colors duration-500">{l}</span>
          ))}
        </div>
      </section>

      <section className="container-editorial py-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center min-h-[60vh]">
        <div className="md:col-span-4">
          <AnimatePresence mode="wait">
            <motion.img
              key={i} src={TESTIMONIALS[i].img} alt={TESTIMONIALS[i].name}
              loading="lazy"
              initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-[3/4] object-cover"
            />
          </AnimatePresence>
        </div>
        <div className="md:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <blockquote className="font-serif italic text-bone text-3xl md:text-5xl leading-[1.2]">
                "{TESTIMONIALS[i].quote}"
              </blockquote>
              <div className="mt-8">
                <p className="font-serif text-bone text-xl">{TESTIMONIALS[i].name}</p>
                <p className="text-xs uppercase tracking-[0.25em] text-gold mt-1">{TESTIMONIALS[i].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2 mt-12">
            {TESTIMONIALS.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} className={`h-px transition-all duration-500 ${idx === i ? "w-12 bg-gold" : "w-6 bg-bone/30"}`} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
