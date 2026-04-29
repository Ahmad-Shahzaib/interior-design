import { motion } from "framer-motion";
import { ReactNode } from "react";

export const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.main
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
  >
    {children}
  </motion.main>
);
