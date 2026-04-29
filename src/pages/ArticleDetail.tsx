import { Link, useParams } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ARTICLES } from "@/lib/data";

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = ARTICLES.find((a) => a.slug === slug) || ARTICLES[0];
  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);
  const { scrollYProgress } = useScroll();

  return (
    <PageTransition>
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-gold origin-left z-[150]" style={{ scaleX: scrollYProgress }} />

      <section className="relative h-[80vh] overflow-hidden">
        <img src={article.img} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-0 flex items-end pb-16 container-editorial">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">{article.category} · {article.date} · {article.read}</p>
            <h1 className="font-serif text-bone text-5xl md:text-8xl mt-4 max-w-4xl leading-[1.05]">{article.title}</h1>
          </div>
        </div>
      </section>

      <article className="container-editorial max-w-3xl py-24 text-bone/80 text-lg leading-relaxed space-y-6">
        <p>{article.excerpt}</p>
        <p>
          The most affecting interiors are not the ones with the most. They are the ones with the rightness —
          a single chair where you didn't expect one, a wall left honest, a lamp warm enough to read by but not
          to shout.
        </p>
        <blockquote className="font-serif italic text-bone text-3xl md:text-5xl py-8 border-l-2 border-gold pl-8 my-12">
          "A room is finished when nothing more can be removed without harm."
        </blockquote>
        <p>
          We work in seasons, not weeks. We let materials rest before they're chosen. We resist the algorithm
          of trend. The result, we hope, is something that feels less like a project and more like a place that
          was always there.
        </p>
        <p>
          To live well is to live slowly. To design well is to design as though the room will outlive us — and quietly,
          gently, hold whoever follows.
        </p>
      </article>

      <section className="container-editorial py-24 border-t border-border">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8">Continue reading</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((a) => (
            <Link to={`/journal/${a.slug}`} key={a.slug} className="block group" data-cursor="view">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={a.img} alt={a.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold mt-4">{a.category}</p>
              <h3 className="font-serif text-bone text-2xl mt-2">{a.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
