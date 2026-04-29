import { Link } from "react-router-dom";
import { NAV_LINKS } from "./Navbar";

export const Footer = () => (
  <footer className="bg-ink-soft border-t border-border mt-32">
    <div className="container-editorial py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="md:col-span-2">
        <h3 className="font-serif text-3xl md:text-4xl text-bone leading-tight">
          Let's design<br />something timeless.
        </h3>
        <Link to="/contact" className="mt-6 inline-block story-link text-bone text-sm tracking-[0.2em] uppercase">
          Start a project →
        </Link>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Studio</p>
        <ul className="space-y-2 text-bone/80 text-sm">
          {NAV_LINKS.slice(0, 7).map((l) => (
            <li key={l.to}><Link to={l.to} className="story-link">{l.label}</Link></li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Contact</p>
        <p className="text-bone/80 text-sm leading-relaxed">
          12 Rue de Sèvres<br />75007 Paris, France<br /><br />
          hello@lumiere.studio<br />+33 1 42 22 88 88
        </p>
      </div>
    </div>
    <div className="container-editorial py-6 border-t border-border flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground">
      <p>© {new Date().getFullYear()} LUMIÈRE INTERIORS. All rights reserved.</p>
      <p className="tracking-[0.2em] uppercase">Designed in Paris · Built worldwide</p>
    </div>
  </footer>
);
