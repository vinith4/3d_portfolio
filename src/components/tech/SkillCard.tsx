import { motion } from "framer-motion";

interface SkillCardProps {
  name: string;
  icon: string;
  x: number;
  y: number;
}

const SkillCard = ({ name, icon, x, y }: SkillCardProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
      }}
      whileHover={{
        scale: 1.04,
      }}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)",
      }}
      className="absolute group cursor-pointer"
    >
      {/* Glow */}

      <div
        className="
          absolute
          inset-0
          rounded-3xl
          bg-[#915EFF]/20
          blur-2xl
          opacity-0
          transition-all
          duration-300
          group-hover:opacity-100
        "
      />

      {/* Card */}

      <div
        className="
          relative
          w-[118px]
          h-[118px]
          rounded-3xl
          border
          border-white/10
          bg-[#151030]/90
          backdrop-blur-xl
          flex
          flex-col
          items-center
          justify-center
          overflow-hidden
          transition-all
          duration-300
          group-hover:border-[#915EFF]/70
          group-hover:shadow-[0_0_25px_rgba(145,94,255,0.25)]
        "
      >
        {/* Icon */}

        <motion.img
          whileHover={{
            scale: 1.08,
          }}
          src={icon}
          alt={name}
          className="w-12 h-12 object-contain"
        />

        {/* Name */}

        <h3 className="mt-4 px-2 text-center text-white text-[13px] font-semibold leading-4">
          {name}
        </h3>

        {/* Bottom Accent */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-[3px]
            bg-gradient-to-r
            from-[#915EFF]
            to-[#00CEA8]
            scale-x-0
            transition-transform
            duration-300
            group-hover:scale-x-100
          "
        />
      </div>
    </motion.div>
  );
};

export default SkillCard;