import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "./Navbar";

export const Footer = () => {
  const loc = useLocation();
  const customName = new URLSearchParams(loc.search).get("name")?.trim();
  const pathname = loc.pathname.replace(/^\/|\/$/g, "");
  const isCustomPathName =
    pathname &&
    !pathname.includes("/") &&
    !NAV_LINKS.some((link) => link.to.toLowerCase() === `/${pathname.toLowerCase()}`) &&
    pathname.toLowerCase() !== "contact";

  const [storedName, setStoredName] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("lumiere-brand-name");
  });

  useEffect(() => {
    const nextName = customName || (isCustomPathName ? pathname : null);
    if (!nextName) return;
    window.localStorage.setItem("lumiere-brand-name", nextName);
    setStoredName(nextName);
  }, [customName, isCustomPathName, pathname]);

  const brandName = customName || (isCustomPathName ? pathname : storedName) || "LUMIÈRE";

  return (
    <footer className="bg-ink-soft border-t border-border mt-32">
      <div className="container-editorial py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:pr-6 md:col-span-5">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            {brandName.toUpperCase()} 
          </p>
          <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-bone leading-tight max-w-lg">
            <span className="block">Let's design</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl">something timeless.</span>
          </h3>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-3 text-bone text-sm uppercase tracking-[0.2em] story-link"
          >
            Start a project →
          </Link>
        </div>

        <div className="space-y-3 md:col-span-2">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Studio</p>
          <ul className="space-y-3 text-bone/80 text-sm">
            {NAV_LINKS.filter((l) => ["/about", "/projects", "/services", "/process"].includes(l.to)).map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="story-link block">
                  {l.to === "/about" ? "About Us" : l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 md:col-span-3">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Contact</p>
          <address className="not-italic text-bone/80 text-sm leading-relaxed space-y-3">
            <div>
              12 Rue de Sèvres 75007 Paris, France
            </div>
            <div>
              hello@domain.com<br />+00 0 00 000 0000
            </div>
          </address>
        </div>

        <div className="space-y-4 md:col-span-2">
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
          <p>© {new Date().getFullYear()} {brandName.toUpperCase()} . All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Designed in Paris · Built worldwide</p>
        </div>
      </div>
    </footer>
  );
};
