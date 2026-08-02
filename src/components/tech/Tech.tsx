import { technologies } from "../../constants";
import SectionWrapper from "../../hoc/SectionWapper";
import BallCanvas from "../canvas/Ball";
import { motion } from "framer-motion";

// eslint-disable-next-line react-refresh/only-export-components
const Tech = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology, index) => (
        <motion.div
          key={technology.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.08,
            duration: 0.5,
          }}
          whileHover={{
            y: -8,
          }}
          className="group flex flex-col items-center"
        >
          {/* <div
            className="
        rounded-2xl
        transition-all
        duration-500
        group-hover:shadow-[0_0_30px_rgba(145,94,255,0.25)]
      "
          > */}
          <div className="w-28 h-28 transition-transform duration-500 group-hover:scale-110">
            <BallCanvas icon={technology.icon} />
            {/* </div> */}
          </div>

          <h3
            className="
        mt-5
        text-secondary
        text-[15px]
        font-semibold
        transition-all
        duration-300
        group-hover:text-white"
          >
            {technology.name}
          </h3>

          {/* Animated Underline */}
          <div
            className="
        mt-2
        h-[2px]
        w-0
        rounded-full
        bg-gradient-to-r
        from-[#915EFF]
        to-[#00CEA8]
        transition-all
        duration-500
        group-hover:w-16
      "
          />
        </motion.div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
