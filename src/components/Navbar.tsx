import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/process", label: "Process" },
  { to: "/studio", label: "Studio" },
  { to: "/materials", label: "Materials" },
  { to: "/awards", label: "Awards" },
  { to: "/journal", label: "Journal" },
  { to: "/clients", label: "Clients" },
  { to: "/sustainability", label: "Sustainability" },
  { to: "/careers", label: "Careers" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? "bg-ink/85 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <nav className="container-editorial flex items-center justify-between h-20">
          <Link to="/" className="font-serif text-lg md:text-xl tracking-[0.18em] text-bone">
            {brandName}
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.slice(0, 8).map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`story-link text-xs uppercase tracking-[0.2em] font-sans transition-colors ${
                    loc.pathname === l.to ? "text-gold" : "text-bone/80 hover:text-bone"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-bone/40 text-bone text-xs uppercase tracking-[0.2em] hover:bg-bone hover:text-ink transition-colors duration-500"
            >
              Contact
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-bone"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] bg-ink"
          >
            <div className="container-editorial flex justify-between items-center h-20">
              <span className="font-serif text-lg tracking-[0.18em] text-bone">{brandName}</span>
              <button onClick={() => setOpen(false)} className="text-bone" aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <motion.ul
              className="px-8 pt-12 space-y-6"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            >
              {[...NAV_LINKS, { to: "/contact", label: "Contact" }].map((l) => (
                <motion.li
                  key={l.to}
                  variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Link to={l.to} className="font-serif text-4xl text-bone block">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
