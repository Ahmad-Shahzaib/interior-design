import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Cursor } from "./components/Cursor";
import { Loader } from "./components/Loader";
import { Navbar, NAV_LINKS } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { getLenis, useLenis } from "./hooks/useLenis";
import { useBrandName } from "@/hooks/useBrandName";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Services from "./pages/Services";
import Process from "./pages/Process";
import Studio from "./pages/Studio";
import Materials from "./pages/Materials";
import Awards from "./pages/Awards";
import Journal from "./pages/Journal";
import ArticleDetail from "./pages/ArticleDetail";
import Clients from "./pages/Clients";
import Sustainability from "./pages/Sustainability";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const loc = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={loc} key={loc.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/process" element={<Process />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<ArticleDetail />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/:name" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

const TitleManager = () => {
  const loc = useLocation();
  const pathname = loc.pathname.replace(/^\/|\/$/g, "");
  const isCustomPathName =
    pathname &&
    !pathname.includes("/") &&
    !NAV_LINKS.some((link) => link.to.toLowerCase() === `/${pathname.toLowerCase()}`) &&
    pathname.toLowerCase() !== "contact";
  const brandName = useBrandName(pathname, loc.search, isCustomPathName);
  const title = `${brandName.toUpperCase()} INTERIORS`;

  useEffect(() => {
    document.title = title;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    const titleMeta = document.querySelector('meta[name="title"]');
    if (titleMeta) titleMeta.setAttribute("content", title);
  }, [title]);

  return null;
};

const Shell = () => {
  const [ready, setReady] = useState(false);
  useLenis();
  return (
    <div className="dark grain min-h-screen bg-background text-foreground">
      <Loader onComplete={() => setReady(true)} />
      <Cursor />
      <Navbar />
      <TitleManager />
      <ScrollToTop />
      <AnimatedRoutes />
      <Footer />
      {/* ready is used by lenis to ensure layout */}
      <span className="sr-only">{ready ? "" : ""}</span>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
