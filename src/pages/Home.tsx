import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { PageTransition } from "@/components/PageTransition";
import { NoiseMesh } from "@/components/three/NoiseMesh";
import { SectionLabel } from "@/components/SectionLabel";
import { Counter } from "@/components/Counter";
import { IMG, PROJECTS, UNSPLASH } from "@/lib/data";
import { ArrowRight } from "lucide-react";

const HEADING = ["WE DESIGN", "LIVING POETRY"];
const MARQUEE = [UNSPLASH.i1, UNSPLASH.i2, UNSPLASH.i3, UNSPLASH.i4, UNSPLASH.i5, UNSPLASH.i6, UNSPLASH.i7, UNSPLASH.i8];

const Word = ({ children, delay }: { children: string; delay: number }) => (
  <span className="inline-block overflow-hidden align-bottom">
    <motion.span
      initial={{ y: "110%" }} animate={{ y: "0%" }}
      transition={{ duration: 1, delay, ease: [0.76, 0, 0.24, 1] }}
      className="inline-block"
    >
      {children}&nbsp;
    </motion.span>
  </span>
);

const RevealWord = ({ progress, range, children }: { progress: any; range: [number, number]; children: string }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }} className="inline-block mr-3 text-bone">{children}</motion.span>;
};

const RevealLine = ({ text }: { text: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 30%"] });
  const words = text.split(" ");
  return (
    <div ref={ref} className="font-serif text-3xl md:text-6xl leading-tight text-balance">
      {words.map((w, i) => (
        <RevealWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</RevealWord>
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-80"><NoiseMesh /></div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink pointer-events-none" />

        {/* floating thumbs */}
        <motion.img
          src={IMG.p1}
          alt="Interior detail"
          className="hidden md:block absolute left-8 top-1/3 w-44 h-60 object-cover shadow-editorial animate-float-slow"
          style={{ rotate: "-6deg" }}
          initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 1.2 }}
        />
        <motion.img
          src={IMG.p2}
          alt="Interior detail"
          className="hidden md:block absolute right-8 top-1/4 w-40 h-56 object-cover shadow-editorial animate-float-slow"
          style={{ rotate: "5deg", animationDelay: "2s" }}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 1.4 }}
        />

        <div className="container-editorial relative z-10 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <SectionLabel>LUMIÈRE INTERIORS — EST. 2009</SectionLabel>
          </motion.div>
          <h1 className="mt-6 font-serif text-bone text-[12vw] md:text-[8vw] leading-[0.95] tracking-tight">
            {HEADING.map((line, li) => (
              <span key={li} className="block">
                {line.split(" ").map((w, wi) => <Word key={wi} delay={0.8 + (li * line.split(" ").length + wi) * 0.12}>{w}</Word>)}
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-8 text-bone/70 max-w-xl mx-auto"
          >
            A Paris-based studio composing residential, hospitality and retail interiors that breathe.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="mt-10 flex justify-center gap-4">
            <Link to="/projects" className="group inline-flex items-center gap-3 px-8 py-4 bg-bone text-ink text-xs uppercase tracking-[0.25em]">
              Our work <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/contact" className="inline-flex items-center px-8 py-4 border border-bone/40 text-bone text-xs uppercase tracking-[0.25em] hover:bg-bone hover:text-ink transition-colors duration-500">
              Start a project
            </Link>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-20 overflow-hidden">
        <div className="container-editorial mb-10 flex justify-between items-end">
          <SectionLabel>SELECTED FRAMES</SectionLabel>
          <Link to="/projects" className="story-link text-bone text-xs uppercase tracking-[0.2em]">All projects →</Link>
        </div>
        <div className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-6 snap-x">
          {MARQUEE.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ rotate: -2, y: -8 }}
              transition={{ duration: 0.4 }}
              className="relative shrink-0 w-[80vw] md:w-[28vw] aspect-[3/4] snap-center group overflow-hidden"
              data-cursor="view"
            >
              <img src={src} alt={`Frame ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <span className="absolute top-4 left-4 font-serif text-bone/70 text-sm">{String(i + 1).padStart(2, "0")}</span>
              <span className="absolute inset-0 flex items-center justify-center font-serif text-bone text-[14rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {i + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CINEMATIC TEXT */}
      <section className="py-32 md:py-48 container-editorial">
        <RevealLine text="Space is not just space. It is emotion, memory, and the slow architecture of how we choose to live." />
      </section>

      {/* FEATURED PROJECTS */}
      <section className="container-editorial pb-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <SectionLabel>FEATURED</SectionLabel>
            <h2 className="font-serif text-4xl md:text-6xl text-bone mt-4">Recent work.</h2>
          </div>
          <Link to="/projects" className="story-link text-bone text-xs uppercase tracking-[0.2em] hidden md:block">View archive →</Link>
        </div>
        <div className="grid grid-cols-12 gap-6">
          {PROJECTS.slice(0, 3).map((p, i) => (
            <Link
              key={p.slug}
              to={`/project/${p.slug}`}
              data-cursor="view"
              className={`group relative overflow-hidden ${i === 0 ? "col-span-12 md:col-span-8 aspect-[16/10]" : i === 1 ? "col-span-12 md:col-span-4 md:row-span-2 aspect-[3/4] md:aspect-auto" : "col-span-12 md:col-span-8 aspect-[16/9]"}`}
            >
              <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-xs uppercase tracking-[0.25em] text-gold">{p.category}</p>
                <h3 className="font-serif text-3xl md:text-5xl text-bone mt-2">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="container-editorial py-32 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <Counter to={200} suffix="+" label="Projects" />
          <Counter to={15} label="Years" />
          <Counter to={40} label="Awards" />
          <Counter to={8} label="Countries" />
        </div>
      </section>
    </PageTransition>
  );
}
