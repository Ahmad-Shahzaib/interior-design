import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PageTransition } from "@/components/PageTransition";

const NotFound = () => {
  const loc = useLocation();
  useEffect(() => { console.error("404:", loc.pathname); }, [loc]);
  return (
    <PageTransition>
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Error 404</p>
        <h1 className="font-serif text-bone text-7xl md:text-[12rem] leading-none mt-4">Lost.</h1>
        <p className="text-bone/70 mt-6 max-w-md">This page does not exist — perhaps it was never built. Let us walk you home.</p>
        <Link to="/" className="mt-10 px-8 py-4 bg-bone text-ink text-xs uppercase tracking-[0.25em]">Return home</Link>
      </section>
    </PageTransition>
  );
};

export default NotFound;
