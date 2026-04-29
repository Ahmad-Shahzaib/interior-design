import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { NoiseMesh } from "@/components/three/NoiseMesh";
import { SectionLabel } from "@/components/SectionLabel";
import { Counter } from "@/components/Counter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { IMG, PROJECTS, UNSPLASH } from "@/lib/data";
import { ArrowRight } from "lucide-react";

const HEADING = ["WE DESIGN", "LIVING POETRY"];
const MARQUEE = [UNSPLASH.i1, UNSPLASH.i2, UNSPLASH.i3, UNSPLASH.i4, UNSPLASH.i5, UNSPLASH.i6, UNSPLASH.i7, UNSPLASH.i8];
const PORTFOLIO_FEED = [IMG.p1, IMG.p2, IMG.p3, UNSPLASH.i10, UNSPLASH.i11, UNSPLASH.i12];
const SPECIALISATIONS = ["Residential", "Hospitality", "Commercial", "Home Office"];

const TESTIMONIALS = [
  { quote: "Working with Lumière felt effortless. The design delivered exactly the calm luxury we wanted.", name: "Camille Bourdon", role: "Creative Director, Maison Verre", img: UNSPLASH.team3 },
  { quote: "They translated our brief into a home that feels both warm and impeccably composed.", name: "James Hartley", role: "Founder, Atelier Laurent", img: UNSPLASH.team1 },
  { quote: "Every detail was considered. The finished space feels personal and timeless.", name: "Mira Okafor", role: "Private Client", img: UNSPLASH.team4 },
];

const FAQ = [
  { question: "How much does it cost?", answer: "Each project is unique, but we begin with a tailored scope based on your brief and budget. A discovery call helps us align on cost before design begins." },
  { question: "Do you work remotely?", answer: "Yes. We can work remotely for concept and procurement, while maintaining local site oversight through trusted partners and regular updates." },
  { question: "How long does a project take?", answer: "Typical residential and office projects take 12–18 weeks from concept to handover, depending on scale and procurement lead times." },
];

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

const BeforeAfter = () => {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden select-none rounded-3xl border border-border bg-ink">
      <img src={UNSPLASH.i9} alt="Before" className="absolute inset-0 w-full h-full object-cover grayscale" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={IMG.p1} alt="After" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${100 / (pos / 100)}%` }} />
      </div>
      <div className="absolute inset-y-0 w-px bg-bone/80" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-bone text-ink flex items-center justify-center text-xs">↔</div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(+e.target.value)}
        className="absolute inset-0 w-full opacity-0 cursor-ew-resize"
      />
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

      {/* SPECIALISATIONS */}
      <section className="container-editorial py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <SectionLabel>SPECIALISATIONS</SectionLabel>
            <h2 className="font-serif text-bone text-3xl md:text-5xl mt-4">We design rooms for the life you live.</h2>
          </div>
          <p className="max-w-xl text-bone/70 text-sm md:text-base">
            We design Residential, Hospitality, Commercial and Home Office spaces with the same attentiveness to atmosphere, materials and function.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIALISATIONS.map((type) => (
            <div key={type} className="rounded-[2rem] border border-border bg-ink/80 p-8 text-center">
              <p className="font-serif text-bone text-2xl md:text-3xl">{type}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BEFORE/AFTER */}
      <section className="container-editorial py-24">
        <div className="flex flex-col gap-6 md:gap-0 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <SectionLabel>PROOF OF VALUE</SectionLabel>
            <h2 className="font-serif text-bone text-3xl md:text-5xl mt-4">Before & After Slider</h2>
          </div>
          <p className="max-w-xl text-bone/70 text-sm md:text-base">
            Interior designers' biggest proof of value. A before/after of a real room transformation is more convincing than any text. Clients love it.
          </p>
        </div>
        <BeforeAfter />
      </section>

      {/* TESTIMONIALS */}
      <section className="container-editorial py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <SectionLabel>REVIEWS</SectionLabel>
            <h2 className="font-serif text-bone text-3xl md:text-5xl mt-4">Trusted by clients who value calm, considered interiors.</h2>
          </div>
          <p className="max-w-xl text-bone/70 text-sm md:text-base">
            Social proof matters in a trust-based service like interior design. These brief quotes help clients feel confident before they reach out.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div key={idx} className="rounded-[2rem] border border-border bg-ink/80 p-8 flex flex-col gap-6">
              <p className="font-serif italic text-bone text-xl leading-relaxed">“{testimonial.quote}”</p>
              <div className="flex items-center gap-4">
                <img src={testimonial.img} alt={testimonial.name} className="h-16 w-16 rounded-full object-cover" />
                <div>
                  <p className="font-serif text-bone text-base">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-gold">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-editorial py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-serif text-bone text-3xl md:text-5xl mt-4">Answers to the questions that stop people from enquiring.</h2>
          </div>
          <p className="max-w-xl text-bone/70 text-sm md:text-base">
            We address cost, process and remote work upfront so the path to enquiry feels clear and confident.
          </p>
        </div>
        <Accordion type="single" collapsible className="space-y-4 rounded-[2rem] border border-border bg-ink/80 p-6">
          {FAQ.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="rounded-3xl bg-ink/70">
              <AccordionTrigger className="px-6">
                <span className="text-base md:text-lg text-bone">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6">
                <p className="text-sm leading-relaxed text-bone/70">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* PORTFOLIO FEED */}
      <section className="container-editorial py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <SectionLabel>PORTFOLIO</SectionLabel>
            <h2 className="font-serif text-bone text-3xl md:text-5xl mt-4">Visual work that shows what we do.</h2>
          </div>
          <p className="max-w-xl text-bone/70 text-sm md:text-base">
            Interior design is highly visual. This curated grid of recent rooms builds credibility and keeps people on the page longer.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {PORTFOLIO_FEED.map((src, idx) => (
            <div key={idx} className="overflow-hidden rounded-3xl bg-ink h-44 md:h-52">
              <img src={src} alt={`Portfolio ${idx + 1}`} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-bone">
        <div className="container-editorial flex flex-col items-center justify-center text-center gap-6">
          <p className="text-sm uppercase tracking-[0.35em] text-ink/60">Ready to begin?</p>
          <h2 className="font-serif text-4xl md:text-6xl text-ink max-w-3xl">Book a free consultation and see how we can transform your space.</h2>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-ink px-10 py-5 text-sm uppercase tracking-[0.3em] text-bone transition hover:bg-ink/90"
          >
            Book a Free Consultation
          </Link>
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
