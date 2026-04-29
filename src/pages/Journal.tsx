import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";
import { ARTICLES } from "@/lib/data";

const ParallaxImg = ({ src, alt, ratio = "aspect-[4/3]" }: { src: string; alt: string; ratio?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${ratio}`}>
      <motion.img src={src} alt={alt} loading="lazy" style={{ y }} className="absolute inset-0 w-full h-[120%] object-cover" />
    </div>
  );
};

const TAGS = ["All", "Philosophy", "Materials", "Lighting", "Trends"];

export default function Journal() {
  return (
    <PageTransition>
      <section className="pt-32 pb-12 container-editorial">
        <SectionLabel>JOURNAL</SectionLabel>
        <h1 className="font-serif text-bone text-5xl md:text-8xl mt-4">Notes from the studio.</h1>
        <div className="flex flex-wrap gap-6 mt-8">
          {TAGS.map((t) => (
            <button key={t} className="story-link text-xs uppercase tracking-[0.25em] text-bone/70 hover:text-bone">{t}</button>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-32 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Hero article 60% */}
        <Link to={`/journal/${ARTICLES[0].slug}`} className="lg:col-span-7 group" data-cursor="view">
          <ParallaxImg src={ARTICLES[0].img} alt={ARTICLES[0].title} ratio="aspect-[16/11]" />
          <p className="text-xs uppercase tracking-[0.25em] text-gold mt-6">{ARTICLES[0].category} · {ARTICLES[0].date}</p>
          <h2 className="font-serif text-bone text-4xl md:text-6xl mt-3 leading-[1.05]">{ARTICLES[0].title}</h2>
          <p className="text-bone/70 mt-4 max-w-xl">{ARTICLES[0].excerpt}</p>
        </Link>

        <div className="lg:col-span-5 space-y-10">
          {ARTICLES.slice(1).map((a) => (
            <Link to={`/journal/${a.slug}`} key={a.slug} className="block group" data-cursor="view">
              <ParallaxImg src={a.img} alt={a.title} ratio="aspect-[16/10]" />
              <p className="text-xs uppercase tracking-[0.25em] text-gold mt-4">{a.category} · {a.date}</p>
              <h3 className="font-serif text-bone text-2xl md:text-3xl mt-2 group-hover:text-gold transition-colors">{a.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
