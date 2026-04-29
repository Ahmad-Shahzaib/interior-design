import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { n: "01", title: "Discover", text: "Site visits, conversations, and the slow building of brief." },
  { n: "02", title: "Concept", text: "Mood, plan, and material direction in one editorial deck." },
  { n: "03", title: "Develop", text: "Detailed drawings, lighting plan, and FF&E specification." },
  { n: "04", title: "Source", text: "We commission, procure, and quality-check every piece." },
  { n: "05", title: "Build", text: "On-site coordination with trades and craftspeople." },
  { n: "06", title: "Reveal", text: "Styling, photography, and the handover of a living space." },
];

export default function Process() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
      const distance = () => track.current!.scrollWidth - window.innerWidth;
      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
      return () => tween.kill();
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <section className="pt-32 pb-12 container-editorial">
        <SectionLabel>METHOD</SectionLabel>
        <h1 className="font-serif text-bone text-5xl md:text-8xl mt-4">Our process.</h1>
      </section>

      <div ref={wrap} className="relative h-screen overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-border z-10">
          <div ref={bar} className="h-full bg-gold origin-left scale-x-0" />
        </div>
        <div ref={track} className="flex h-full items-center" style={{ width: "max-content" }}>
          {STEPS.map((s) => (
            <div key={s.n} className="w-screen h-full flex items-center justify-center px-12">
              <div className="max-w-md">
                <p className="font-serif text-gold text-[12rem] leading-none">{s.n}</p>
                <h3 className="font-serif text-bone text-5xl mt-4">{s.title}</h3>
                <p className="text-bone/70 mt-4 text-lg leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
