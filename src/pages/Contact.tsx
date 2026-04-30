import { useState } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { IMG } from "@/lib/data";

const FIELDS = [
  { name: "name", label: "Your name", type: "text" },
  { name: "email", label: "Email address", type: "email" },
  { name: "subject", label: "Project type", type: "text" },
  { name: "message", label: "Tell us about your space", type: "textarea" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <PageTransition>
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen pt-20">
        <div className="relative overflow-hidden">
          <img src={IMG.contact} alt="Studio entry" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-ink/40" />
          <div className="relative z-10 p-8 md:p-16 h-full flex flex-col justify-end">
            <h1 className="font-serif text-bone text-5xl md:text-7xl leading-tight">Let's begin.</h1>
            <div className="mt-12 text-bone/90 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gold">Studio</p>
                <p className="mt-1">12 Rue de Sèvres, 75007 Paris, France</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gold">Contact</p>
                <p className="mt-1">hello@domain.com</p>
                <p>+00 0 00 000 0000</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gold">Hours</p>
                <p className="mt-1">Monday — Friday · 9h — 19h</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-16 flex flex-col justify-center">
          {sent ? (
            <div className="text-center">
              <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto text-gold">
                <motion.circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
                <motion.path d="M30 52 L45 67 L72 38" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.7 }} />
              </svg>
              <h2 className="font-serif text-bone text-4xl mt-6">Thank you.</h2>
              <p className="text-bone/70 mt-3">We'll be in touch within two working days.</p>
            </div>
          ) : (
            <motion.form
              initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-8 max-w-lg w-full"
            >
              <motion.p
                variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                transition={{ duration: 0.6 }}
                className="text-xs uppercase tracking-[0.3em] text-gold"
              >
                New project enquiry
              </motion.p>
              {FIELDS.map((f) => (
                <motion.div
                  key={f.name}
                  variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                  transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
                  className="border-b border-border pb-2"
                >
                  <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-2">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea rows={4} required className="w-full bg-transparent text-bone outline-none resize-none" />
                  ) : (
                    <input type={f.type} required className="w-full bg-transparent text-bone outline-none" />
                  )}
                </motion.div>
              ))}
              <motion.button
                variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                transition={{ duration: 0.6 }}
                type="submit"
                className="px-8 py-4 bg-bone text-ink text-xs uppercase tracking-[0.25em] hover:bg-gold transition-colors duration-500"
              >
                Send enquiry
              </motion.button>
            </motion.form>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
