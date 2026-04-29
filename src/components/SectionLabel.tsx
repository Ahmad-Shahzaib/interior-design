import { motion } from "framer-motion";

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
    <motion.span
      initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.65,0,0.35,1] }}
      className="h-px w-10 bg-gold origin-left block"
    />
    <span>{children}</span>
  </div>
);
