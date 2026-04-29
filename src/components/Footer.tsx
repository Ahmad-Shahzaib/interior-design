import { Link } from "react-router-dom";
import { NAV_LINKS } from "./Navbar";

export const Footer = () => (
  <footer className="bg-ink-soft border-t border-border mt-32">
    <div className="container-editorial py-16 md:py-20 grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_minmax(0,0.8fr)] gap-8">
      <div className="md:pr-6">
        <h3 className="font-serif text-3xl md:text-4xl text-bone leading-tight max-w-lg">
          Let's design<br />something timeless.
        </h3>
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center gap-3 text-bone text-sm uppercase tracking-[0.2em] story-link"
        >
          Start a project →
        </Link>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Studio</p>
        <ul className="space-y-3 text-bone/80 text-sm">
          {NAV_LINKS.slice(0, 7).map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="story-link block">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Contact</p>
        <address className="not-italic text-bone/80 text-sm leading-relaxed space-y-3">
          <div>
            12 Rue de Sèvres<br />75007 Paris, France
          </div>
          <div>
            hello@lumiere.studio<br />+33 1 42 22 88 88
          </div>
        </address>
      </div>

      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Get in touch</p>
        <p className="text-bone/80 text-sm leading-relaxed">
          Ready to talk about your next interior project?
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-full border border-bone/20 bg-bone/5 px-5 py-3 text-sm uppercase tracking-[0.18em] text-bone transition hover:bg-bone/10"
        >
          Contact us
        </Link>
      </div>
    </div>

    <div className="container-editorial border-t border-border py-4 md:py-5">
      <div className="flex flex-col gap-3 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} LUMIÈRE INTERIORS. All rights reserved.</p>
        <p className="tracking-[0.2em] uppercase">Designed in Paris · Built worldwide</p>
      </div>
    </div>
  </footer>
);
