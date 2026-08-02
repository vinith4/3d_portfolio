import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import { socials } from "../../constants";
import { fadeIn } from "../../utils/motion";
import { styles } from "../../styles";

const Footer = () => {
  return (
    <footer className="relative mt-24 pb-6 overflow-hidden">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#915EFF]/10 blur-[120px]" />

        <div className="absolute left-10 bottom-10 h-40 w-40 rounded-full bg-[#00CEA8]/5 blur-[90px]" />

        <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-[#915EFF]/5 blur-[90px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <motion.div
          variants={fadeIn("up", "tween", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-secondary uppercase tracking-[6px] text-sm">
            Stay Connected
          </p>

        </motion.div>

        {/* Cards */}

        <div className="mt-20 flex flex-wrap justify-center gap-10">
          {socials.map((item, index) => {
            const Icon = item.icon;

            return (
              <Tilt
                key={item.title}
                className="xs:w-[250px] w-full"
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                perspective={1000}
                transitionSpeed={600}
                scale={1.02}
              >
                <motion.a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeIn("up", "spring", index * 0.2, 0.75)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  whileHover={{
                    y: -8,
                  }}
                  className="block"
                >
                  {/* Gradient Border */}{" "}
                  <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
                    <div
                      className="
                      relative
                      bg-tertiary
                      rounded-[20px]
                      py-5
                      px-8
                      min-h-[280px]
                      flex
                      flex-col
                      justify-center
                      items-center
                      overflow-hidden
                      transition-all
                      duration-500
                      group
                      hover:shadow-[0_0_35px_rgba(145,94,255,0.25)]
                      "
                    >
                      {/* Glass Reflection */}
                      <div
                        className="
                        absolute
                        top-0
                        left-0
                        h-24
                        w-full
                        bg-gradient-to-b
                        from-white/5
                        to-transparent
                        opacity-0
                        group-hover:opacity-100
                        transition-all
                        duration-500
                        "
                      />
                      {/* Animated Glow */}
                      <div
                        className="
                        absolute
                        inset-0
                        opacity-0
                        group-hover:opacity-100
                        transition-all
                        duration-500
                        bg-[radial-gradient(circle_at_top,#915EFF22,transparent_70%)]
                        "
                      />
                      {/* Icon */}
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="
                        w-16
                        h-16
                        rounded-2xl
                        bg-gradient-to-br
                        from-[#804DEE]
                        to-[#915EFF]
                        flex
                        items-center
                        justify-center
                        shadow-lg
                        shadow-[#915EFF]/25
                        group-hover:shadow-[#915EFF]/50
                        transition-all
                        duration-500
                        "
                      >
                        <Icon size={30} className="text-white" />
                      </motion.div>
                      {/* Title */}
                      <h3 className="mt-6 text-white text-[20px] font-bold text-center">
                        {item.title}
                      </h3>
                      {/* Subtitle */}
                      <p className="mt-3 text-secondary text-center text-[15px] leading-6">
                        {item.subtitle}
                      </p>
                      {/* Action */}{" "}
                      <motion.div
                        whileHover={{
                          x: 4,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        className="
                        mt-6
                        flex
                        items-center
                        gap-2
                        text-[#915EFF]
                        font-semibold
                        text-[15px]
                        group-hover:text-[#00CEA8]
                        transition-all
                        duration-300
                        "
                      >
                        <span>{item.action}</span>

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </motion.a>
              </Tilt>
            );
          })}
        </div>

        {/* Footer Bottom */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.3,
          }}
          className="mt-14"
        >
          {/* Divider */}
          <div className={`${styles.paddingX}`}>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#915EFF]/40 to-transparent" />
          </div>

          {/* Content */}
          <div
            className={`${styles.paddingX} py-8 flex flex-col md:flex-row items-center justify-between gap-8`}
          >
            {/* Left */}
            <div className="text-center md:text-left">
              <h3 className="text-white text-2xl font-bold">VinithKumar</h3>

              <p className="mt-2 text-secondary text-[15px]">
                Full-Stack Developer • React • TypeScript • Next.js • Three.js
              </p>
            </div>

            {/* Right */}
            <div className="text-center md:text-right">
              <p className="text-secondary text-[15px]">
                © {new Date().getFullYear()} VinithKumar. All Rights Reserved.
              </p>

              <p className="mt-2 text-secondary text-sm">
                Crafted with{" "}
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="inline-block text-red-500"
                >
                  ❤️
                </motion.span>{" "}
                using React, TypeScript, Three.js & Tailwind CSS
              </p>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="flex justify-center pb-4">
            <div className="h-[2px] w-44 rounded-full bg-gradient-to-r from-transparent via-[#915EFF] to-transparent opacity-70" />
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
