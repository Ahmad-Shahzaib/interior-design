import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";
import { WireCube } from "@/components/three/WireCube";
import { IMG, UNSPLASH } from "@/lib/data";
import { motion } from "framer-motion";

const GRID = [UNSPLASH.i1, UNSPLASH.i5, UNSPLASH.i9, UNSPLASH.i6, UNSPLASH.i2, UNSPLASH.i7];

export default function Studio() {
  return (
    <PageTransition>
      <section className="relative h-[90vh] overflow-hidden">
        <video
          autoPlay loop muted playsInline
          poster={IMG.studio}
          className="absolute inset-0 w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/7578553/7578553-uhd_2560_1440_30fps.mp4"
        />
        <div className="absolute inset-0 bg-ink/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center container-editorial">
          <SectionLabel>THE STUDIO</SectionLabel>
          <h1 className="font-serif text-bone text-6xl md:text-[10rem] leading-none mt-6">Come inside.</h1>
          <a href="#tour" className="mt-10 inline-block px-8 py-4 bg-bone text-ink text-xs uppercase tracking-[0.25em]">Take the tour</a>
        </div>
      </section>

      <section id="tour" className="container-editorial py-32 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {GRID.map((src, i) => (
          <motion.img
            key={i}
            src={src} alt={`Studio ${i + 1}`} loading="lazy"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.06 }}
            className={`object-cover w-full ${i % 5 === 0 ? "aspect-[4/5] lg:row-span-2 lg:aspect-auto" : "aspect-[4/3]"}`}
            data-cursor="view"
          />
        ))}
      </section>

      <section className="container-editorial py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionLabel>EVERY SPACE A VOLUME</SectionLabel>
          <h2 className="font-serif text-bone text-4xl md:text-6xl mt-4">We model rooms before we build them.</h2>
          <p className="text-bone/70 mt-6 text-lg leading-relaxed">
            Each project begins as a wireframe — a study of proportion, light, and the human path through space.
          </p>
        </div>
        <div className="aspect-square"><WireCube /></div>
      </section>
    </PageTransition>
  );
}
