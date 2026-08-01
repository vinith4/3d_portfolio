import { motion } from "framer-motion";
import { styles } from "../../styles";
import DragonCanvas from "../canvas/Dragon";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`absolute inset-0 top-[90px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        {/* Left Indicator */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        {/* Hero Content */}
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">Vinithkumar</span>
          </h1>

          <p className={`${styles.heroSubText} mt-4 text-white-100`}>
            A{" "}
            <span className="text-[#915EFF] font-semibold">
              Full-Stack Developer
            </span>
            <br className="sm:block hidden" />
            specializing in React, TypeScript, Next.js,
            <br className="sm:block hidden" />
            Three.js and modern web experiences.
          </p>
        </div>
      </div>

      {/* 3D Dragon */}
      <DragonCanvas />

      {/* Scroll Indicator */}
      <div className="absolute xs:bottom-4 bottom-8 w-full flex justify-center items-center">
        <a
          href="#about"
          className="flex items-center justify-center w-[40px] h-[60px] cursor-pointer"
        >
          <div className="w-[24px] h-[42px] rounded-full border-4 border-secondary flex justify-center items-start p-1">
            <motion.div
              animate={{
                y: [0, 14, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-2 h-2 rounded-full bg-secondary"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
