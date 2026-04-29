import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";
import { IMG, UNSPLASH } from "@/lib/data";

const TIMELINE = [
  { year: "2009", text: "Studio founded above a bookshop in the Marais." },
  { year: "2013", text: "First international project — a private villa in Lisbon." },
  { year: "2016", text: "Hospitality division opens. Atelier Laurent debuts." },
  { year: "2019", text: "Wallpaper* names us studio of the year." },
  { year: "2022", text: "Tokyo and New York satellite offices open." },
  { year: "2024", text: "200 completed projects across 8 countries." },
];

const TEAM = [
  { name: "Élise Marchand", role: "Founder", img: UNSPLASH.team3 },
  { name: "Antoine Bellier", role: "Design Director", img: UNSPLASH.team1 },
  { name: "Sofia Renaud", role: "FF&E Lead", img: UNSPLASH.team4 },
  { name: "Marc Doré", role: "Project Director", img: UNSPLASH.team2 },
];

const PRINCIPLES = [
  { n: "01", title: "Restraint", text: "Less, but everything chosen with intention." },
  { n: "02", title: "Material truth", text: "Brass that ages. Stone that remembers. Linen that breathes." },
  { n: "03", title: "Time", text: "We design for the second decade, not the first photograph." },
];

export default function About() {
  return (
    <PageTransition>
      <section className="pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 container-editorial">
        <motion.img
          src={IMG.about}
          alt="Studio at work"
          loading="lazy"
          initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="aspect-[3/4] object-cover w-full"
        />
        <div className="flex flex-col justify-center">
          <SectionLabel>ABOUT THE STUDIO</SectionLabel>
          <h1 className="font-serif text-bone text-5xl md:text-7xl mt-6 leading-[1.05]">
            A studio of slow design.
          </h1>
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, delay: 0.4 }}
            className="origin-left h-px w-full bg-bone/40 my-10"
          />
          <p className="text-bone/70 text-lg leading-relaxed">
            Founded in Paris in 2009, LUMIÈRE INTERIORS composes spaces the way poets compose lines —
            attentive to weight, light, silence, and the unspoken hours that follow.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="container-editorial py-32">
        <SectionLabel>FIFTEEN YEARS</SectionLabel>
        <h2 className="font-serif text-4xl md:text-6xl text-bone mt-4 mb-16">A short chronology.</h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.65,0,0.35,1] }}
              className={`relative grid grid-cols-2 gap-8 mb-12 ${i % 2 ? "" : ""}`}
            >
              <div className={i % 2 ? "text-right" : "col-start-2"}>
                <p className="font-serif text-gold text-3xl">{item.year}</p>
                <p className="text-bone/70 mt-2 max-w-sm">{item.text}</p>
              </div>
              <span className="absolute left-1/2 top-2 w-3 h-3 rounded-full bg-gold -translate-x-1/2" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="container-editorial py-32">
        <SectionLabel>THE TEAM</SectionLabel>
        <h2 className="font-serif text-4xl md:text-6xl text-bone mt-4 mb-16">Four hands. One eye.</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((t) => (
            <div key={t.name} className="group relative overflow-hidden aspect-[3/4]" data-cursor="view">
              <img src={t.img} alt={t.name} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink to-transparent">
                <div className="overflow-hidden">
                  <p className="font-serif text-bone text-2xl translate-y-8 group-hover:translate-y-0 transition-transform duration-500">{t.name}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-bone/70 mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="container-editorial py-32 grid grid-cols-1 md:grid-cols-3 gap-12">
        {PRINCIPLES.map((p) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <p className="font-serif text-gold text-7xl">{p.n}</p>
            <h3 className="font-serif text-bone text-3xl mt-4">{p.title}</h3>
            <p className="text-bone/60 mt-3 leading-relaxed">{p.text}</p>
          </motion.div>
        ))}
      </section>
    </PageTransition>
  );
}
