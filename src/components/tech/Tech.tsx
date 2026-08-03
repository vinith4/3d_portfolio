/* eslint-disable react-refresh/only-export-components */

import { motion } from "framer-motion";

import { technologies } from "../../constants";
import SectionWrapper from "../../hoc/SectionWapper";

import DesktopSkillGraph from "./DesktopSkillGraph";
import MobileTimeline from "./MobileTimeline";

const Tech = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background glows removed to show global starfield */}

      {/* Heading */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
        }}
        className="text-center"
      >
        <p className="text-secondary uppercase tracking-[5px] text-sm">
          Technologies
        </p>

        <h2 className="text-white text-5xl font-black mt-4">My Tech Stack</h2>

        <p className="text-secondary mt-6 max-w-3xl mx-auto text-lg leading-8 px-5">
          Technologies I use to build modern, scalable, high-performance web
          applications and enterprise solutions.
        </p>
      </motion.div>

      {/* Desktop */}

      <div className="hidden lg:block mt-24">
        <DesktopSkillGraph technologies={technologies} />
      </div>

      {/* Mobile */}

      <div className="lg:hidden mt-14">
        <MobileTimeline technologies={technologies} />
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "");
