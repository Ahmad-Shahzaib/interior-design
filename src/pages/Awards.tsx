import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";

const AWARDS = [
  { name: "AD100", year: "2024", desc: "Architectural Digest's annual list of the world's top design talents." },
  { name: "Wallpaper* SOTY", year: "2023", desc: "Studio of the Year, Wallpaper* Design Awards." },
  { name: "Dezeen", year: "2023", desc: "Interior Project of the Year shortlist." },
  { name: "Frame", year: "2022", desc: "Best Hospitality Interior, Frame Awards." },
  { name: "EDIDA", year: "2022", desc: "Elle Decoration International Design Awards finalist." },
  { name: "RIBA", year: "2021", desc: "RIBA International Awards commendation." },
  { name: "Restaurant & Bar", year: "2020", desc: "European Bar of the Year." },
  { name: "ICON Awards", year: "2019", desc: "Designer of the Year, ICON Magazine." },
];

const TICKER = ["AS SEEN IN", "AD", "VOGUE LIVING", "WALLPAPER", "DEZEEN", "FRAME", "ELLE DECOR", "ICON"];

export default function Awards() {
  const [flipped, setFlipped] = useState<number | null>(null);
  return (
    <PageTransition>
      <section className="pt-32 pb-12 container-editorial">
        <SectionLabel>ACCOLADES</SectionLabel>
        <h1 className="font-serif text-bone text-5xl md:text-8xl mt-4">Awards & recognition.</h1>
      </section>

      <section className="container-editorial pb-24 grid grid-cols-2 md:grid-cols-4 gap-4">
        {AWARDS.map((a, i) => (
          <div
            key={a.name}
            className="aspect-square [perspective:1000px] cursor-pointer"
            onMouseEnter={() => setFlipped(i)}
            onMouseLeave={() => setFlipped(null)}
            onClick={() => setFlipped(flipped === i ? null : i)}
          >
            <div
              className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
              style={{ transform: flipped === i ? "rotateY(180deg)" : "rotateY(0)" }}
            >
              <div className="absolute inset-0 bg-ink-soft border border-border flex flex-col items-center justify-center p-4 text-center [backface-visibility:hidden]">
                <p className="font-serif text-bone text-3xl">{a.name}</p>
                <p className="text-xs uppercase tracking-[0.25em] text-gold mt-2">{a.year}</p>
              </div>
              <div className="absolute inset-0 bg-gold text-ink flex items-center justify-center p-6 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <p className="text-sm leading-relaxed">{a.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="overflow-hidden border-y border-border py-10">
        <div className="flex gap-12 marquee-track whitespace-nowrap">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="font-serif text-bone/60 text-5xl md:text-7xl">{t} —</span>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
