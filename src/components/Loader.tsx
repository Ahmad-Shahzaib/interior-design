import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useBrandName } from "@/hooks/useBrandName";
import { NAV_LINKS } from "./Navbar";

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);
  const loc = useLocation();
  const pathname = loc.pathname.replace(/^\/|\/$/g, "");
  const isCustomPathName =
    pathname &&
    !pathname.includes("/") &&
    !NAV_LINKS.some((link) => link.to.toLowerCase() === `/${pathname.toLowerCase()}`) &&
    pathname.toLowerCase() !== "contact";
  const brandName = useBrandName(pathname, loc.search, isCustomPathName);
  const LETTERS = brandName.toUpperCase().split("");

  useEffect(() => {
    if (sessionStorage.getItem("lumiere-loaded")) {
      setShow(false);
      onComplete();
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem("lumiere-loaded", "1");
      setShow(false);
      onComplete();
    }, 3600);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[10000] pointer-events-none"
          initial={{ opacity: 1 }}
        >
          {/* Top half */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-ink"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-ink"
            exit={{ y: "100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          />

          {/* Letters + bar */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="overflow-hidden flex"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {LETTERS.map((l, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    className="block font-serif text-bone text-5xl md:text-7xl tracking-[0.15em]"
                    variants={{ hidden: { y: "110%" }, visible: { y: "0%" } }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  >
                    {l}
                  </motion.span>
                </div>
              ))}
            </motion.div>

            <div className="mt-12 h-px w-64 bg-bone/20 overflow-hidden">
              <motion.div
                className="h-full bg-bone origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.6 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
