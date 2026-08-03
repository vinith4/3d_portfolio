import { motion } from "framer-motion";
import { FaDragon } from "react-icons/fa";

const PowerCore = () => {
  return (
    <div className="relative flex items-center justify-center w-[220px] h-[220px]">

      {/* ================= Background Glow ================= */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.8, 0.35],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute w-[220px] h-[220px] rounded-full bg-[#915EFF]/20 blur-[90px]"
      />

      {/* ================= Outer Ring ================= */}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 28,
          ease: "linear",
          repeat: Infinity,
        }}
        className="absolute w-[210px] h-[210px] rounded-full border border-[#915EFF]/30"
      >
        <div className="absolute left-1/2 -top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_#00CEA8]" />
      </motion.div>

      {/* ================= Middle Ring ================= */}

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
        className="absolute w-[170px] h-[170px] rounded-full border border-cyan-400/25"
      >
        <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#915EFF] shadow-[0_0_20px_#915EFF]" />
      </motion.div>

      {/* ================= Inner Ring ================= */}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 12,
          ease: "linear",
          repeat: Infinity,
        }}
        className="absolute w-[135px] h-[135px] rounded-full border border-white/10"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-300" />
      </motion.div>

      {/* ================= Core ================= */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="
          relative
          w-[120px]
          h-[120px]
          rounded-full
          bg-gradient-to-br
          from-[#915EFF]
          via-[#7C4DFF]
          to-[#00CEA8]
          shadow-[0_0_70px_rgba(145,94,255,0.7)]
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >
        {/* Inner Glass */}
        <div className="absolute inset-2 rounded-full bg-[#100d25]/95 backdrop-blur-xl" />

        {/* Rotating Energy */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute inset-0"
        >
          <div className="absolute left-1/2 top-2 -translate-x-1/2 w-2 h-8 rounded-full bg-cyan-400 blur-[1px]" />

          <div className="absolute left-1/2 bottom-2 -translate-x-1/2 w-2 h-8 rounded-full bg-[#915EFF] blur-[1px]" />
        </motion.div>

        {/* Dragon Icon */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="relative z-10 flex flex-col items-center"
        >
          <FaDragon
            size={34}
            className="text-white drop-shadow-[0_0_12px_#915EFF]"
          />

          <h3 className="mt-2 text-white text-xs font-bold tracking-[2px] uppercase">
            Core
          </h3>
        </motion.div>
      </motion.div>

      {/* ================= Orbit Particles ================= */}

      {[...Array(10)].map((_, index) => (
        <motion.div
          key={index}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 10 + index,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0"
        >
          <div
            style={{
              transform: `rotate(${index * 36}deg) translateY(-105px)`,
              transformOrigin: "center",
            }}
            className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_15px_#00CEA8]"
          />
        </motion.div>
      ))}

      {/* ================= Pulse Ring ================= */}

      <motion.div
        animate={{
          scale: [1, 1.6],
          opacity: [0.6, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
        }}
        className="absolute w-[130px] h-[130px] rounded-full border border-[#915EFF]"
      />
    </div>
  );
};

export default PowerCore;