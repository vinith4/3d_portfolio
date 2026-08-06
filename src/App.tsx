import { lazy } from "react";
import { BrowserRouter } from "react-router-dom";

import DeferredSection from "./components/DeferredSection";

import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";

const StarsCanvas = lazy(() => import("./components/canvas/Star"));
const About = lazy(() => import("./components/about/About"));
const Experience = lazy(() => import("./components/experience/Experience"));
const Tech = lazy(() => import("./components/tech/Tech"));
const Contact = lazy(() => import("./components/contact/Contact"));
const Footer = lazy(() => import("./components/footer/Footer"));

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="relative overflow-hidden">
          <img
            src="/herobg.webp"
            alt=""
            width={1920}
            height={1044}
            fetchPriority="high"
            decoding="async"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-center"
          />
          <Navbar />
          <Hero />
        </div>
        <div className="relative z-0">
          <DeferredSection minHeight="38rem">
            <StarsCanvas />
            <About />
          </DeferredSection>
          <DeferredSection minHeight="64rem">
            <Experience />
          </DeferredSection>
          <DeferredSection minHeight="76rem">
            <Tech />
          </DeferredSection>
          <DeferredSection minHeight="58rem">
            <Contact />
          </DeferredSection>
          <DeferredSection minHeight="8rem">
            <Footer />
          </DeferredSection>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
