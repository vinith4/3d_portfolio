import { motion } from "framer-motion";

import type { TechNode } from "./types";

interface MobileTimelineProps {
  technologies: TechNode[];
}

const MobileTimeline = ({ technologies }: MobileTimelineProps) => {
  return (
    <div className="relative mx-auto max-w-md px-5 py-8">

      {/* ================= Dragon Core ================= */}

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative flex flex-col items-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="
            w-24
            h-24
            rounded-full
            bg-gradient-to-br
            from-[#915EFF]
            via-[#7c4dff]
            to-[#00CEA8]
            flex
            items-center
            justify-center
            shadow-[0_0_60px_rgba(145,94,255,0.5)]
          "
        >
          <div className="w-20 h-20 rounded-full bg-[#100d25] flex items-center justify-center">
            <span className="text-3xl">🐉</span>
          </div>
        </motion.div>

        <h2 className="mt-6 text-white text-2xl font-bold">
          Skills
        </h2>

      </motion.div>

      {/* ================= Energy Line ================= */}

      <div className="absolute left-1/2 top-[220px] bottom-0 -translate-x-1/2">

        <motion.div
          animate={{
            backgroundPosition: [
              "0% 0%",
              "0% 100%",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            w-[3px]
            h-full
            rounded-full
            bg-gradient-to-b
            from-[#915EFF]
            via-[#00CEA8]
            to-[#915EFF]
          "
        />
      </div>

      {/* ================= Timeline ================= */}

      <div className="mt-20 space-y-8">

        {technologies.map((tech, index) => {
          const left = index % 2 === 0;

          return (
            <motion.div
              key={tech.name}
              initial={{
                opacity: 0,
                x: left ? -40 : 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.05,
              }}
              className={`flex ${
                left
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              <div className="relative w-[46%]">

                {/* Connector */}

                <div className={`absolute top-10 ${left ? "right-[-32px]" : "left-[-32px]"} flex items-center z-20`}>
                  {left ? (
                    <>
                      <div className="w-8 h-[2px] bg-gradient-to-r from-[#915EFF] to-[#00CEA8]" />

                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="
                          w-3
                          h-3
                          rounded-full
                          bg-[#915EFF]
                          shadow-[0_0_12px_#915EFF]
                          ml-2
                        "
                      />
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="
                          w-3
                          h-3
                          rounded-full
                          bg-[#915EFF]
                          shadow-[0_0_12px_#915EFF]
                          mr-2
                        "
                      />

                      <div className="w-8 h-[2px] bg-gradient-to-r from-[#915EFF] to-[#00CEA8]" />
                    </>
                  )}
                </div>

                {/* Card */}

                <motion.div
                  whileHover={{
                    y: -6,
                    scale: 1.04,
                  }}
                  className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-[#151030]
                    p-5
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:border-[#915EFF]
                    hover:shadow-[0_0_25px_rgba(145,94,255,0.3)]
                    flex
                    flex-col
                    items-center
                    text-center
                  "
                >
                  <motion.img
                    whileHover={{
                      rotate: 12,
                      scale: 1.1,
                    }}
                    src={tech.icon}
                    alt={tech.name}
                    className="w-12 h-12 object-contain mx-auto"
                  />

                  <h3 className="mt-4 text-white font-semibold">
                    {tech.name}
                  </h3>

                </motion.div>

              </div>
            </motion.div>
          );
        })}

      </div>

    </div>
  );
};

export default MobileTimeline;