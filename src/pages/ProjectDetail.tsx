import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { PROJECTS, UNSPLASH } from "@/lib/data";

const GALLERY = [UNSPLASH.i1, UNSPLASH.i2, UNSPLASH.i3, UNSPLASH.i4, UNSPLASH.i5];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Before/after slider
  const [pos, setPos] = useState(50);

  // Drag scroll
  const dragRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = dragRef.current; if (!el) return;
    let down = false; let startX = 0; let scrollLeft = 0;
    const md = (e: PointerEvent) => { down = true; startX = e.pageX; scrollLeft = el.scrollLeft; };
    const mu = () => { down = false; };
    const mm = (e: PointerEvent) => { if (!down) return; el.scrollLeft = scrollLeft - (e.pageX - startX); };
    el.addEventListener("pointerdown", md); window.addEventListener("pointerup", mu); el.addEventListener("pointermove", mm);
    return () => { el.removeEventListener("pointerdown", md); window.removeEventListener("pointerup", mu); el.removeEventListener("pointermove", mm); };
  }, []);

  const related = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <PageTransition>
      <section ref={heroRef} className="relative h-[100vh] overflow-hidden">
        <motion.img src={project.img} alt={project.title} className="absolute inset-0 w-full h-[130%] object-cover" style={{ y }} />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="absolute inset-0 flex items-end pb-20">
          <div className="container-editorial">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">{project.category} · {project.year}</p>
            <h1 className="font-serif text-bone text-6xl md:text-9xl leading-none mt-4">{project.title}</h1>
          </div>
        </div>
      </section>

      <section className="container-editorial grid grid-cols-1 lg:grid-cols-3 gap-12 py-24">
        <div className="lg:col-span-2 text-bone/80 text-lg leading-relaxed">
          <p>
            {project.title} occupies {project.area} in {project.location}. The brief: a quiet residence
            for a collector who reads at night. Our response: a palette of stone, walnut, and brass —
            anchored by a single, slow-burning chandelier.
          </p>
          <p className="mt-6">
            We worked with local artisans for every fixed surface, sourced linens from a third-generation
            Tuscan mill, and commissioned three pieces from emerging European sculptors.
          </p>
        </div>
        <aside className="border-l border-border pl-8 space-y-6 text-sm">
          {[
            ["Scope", project.scope],
            ["Year", project.year],
            ["Location", project.location],
            ["Area", project.area],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{k}</p>
              <p className="text-bone mt-1">{v}</p>
            </div>
          ))}
        </aside>
      </section>

      {/* Drag gallery */}
      <section className="py-16">
        <div className="container-editorial mb-6 flex justify-between items-end">
          <h2 className="font-serif text-bone text-3xl md:text-5xl">Inside the project.</h2>
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">← drag →</span>
        </div>
        <div ref={dragRef} data-cursor="drag" className="flex gap-4 overflow-x-auto px-6 md:px-12 select-none cursor-grab active:cursor-grabbing scrollbar-none">
          {GALLERY.map((src, i) => (
            <img key={i} src={src} alt={`Gallery ${i + 1}`} loading="lazy" draggable={false} className="shrink-0 h-[70vh] aspect-[4/5] object-cover" />
          ))}
        </div>
      </section>

      {/* Before/After */}
      <section className="container-editorial py-24">
        <h2 className="font-serif text-bone text-3xl md:text-5xl mb-8">Before · After.</h2>
        <div className="relative w-full aspect-[16/9] overflow-hidden select-none">
          <img src={UNSPLASH.i9} alt="Before" className="absolute inset-0 w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
            <img src={project.img} alt="After" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${100 / (pos / 100)}%` }} />
          </div>
          <div className="absolute top-0 bottom-0 w-px bg-bone" style={{ left: `${pos}%` }}>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-bone text-ink flex items-center justify-center text-xs">↔</div>
          </div>
          <input
            type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)}
            className="absolute inset-0 w-full opacity-0 cursor-ew-resize"
          />
        </div>
      </section>

      {/* Related */}
      <section className="container-editorial py-24">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8">Related</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((p) => (
            <Link key={p.slug} to={`/project/${p.slug}`} data-cursor="view" className="group relative aspect-[4/5] overflow-hidden block">
              <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gold">{p.category}</p>
                <p className="font-serif text-bone text-2xl">{p.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
