import { useMemo, useState } from "react";
import { FaDragon } from "react-icons/fa";

import SkillCard from "./SkillCard";
import type { TechNode } from "./types";

interface DesktopSkillGraphProps {
  technologies: TechNode[];
}

interface SkillPosition extends TechNode {
  x: number;
  y: number;
}

const DesktopSkillGraph = ({ technologies }: DesktopSkillGraphProps) => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const showDebug = true;

  /**
   * Static positions around the Dragon Core.
   * Add/remove positions here if you change the number of technologies.
   */
  const positions = useMemo(
    () => [
      { x: 0, y: -530 },

      { x: -130, y: -360 },
      { x: 130, y: -360 },

      { x: -300, y: -500 },
      { x: 300, y: -500 },

      { x: -300, y: -280 },
      { x: 300, y: -280 },

      { x: -400, y: 150 },
      { x: 300, y: 150 },

      { x: -480, y: 360 },
      { x: 400, y: 360 },

      { x: 70, y: 300 },

      { x: -530, y: -190 },
      { x: 430, y: -80 },

      { x: -530, y: 0 },
      { x: 430, y: 80 },

      { x: -250, y: 390 },
      { x: 250, y: 390 },

      { x: -80, y: 450 },
      { x: 80, y: 450 },

      { x: -520, y: 0 },
      { x: 520, y: 0 },
    ],
    [],
  );

  const skills: SkillPosition[] = technologies.map((tech, index) => ({
    ...tech,
    ...positions[index],
  }));

  return (
    <div className="flex justify-center">
      <div
        className="
          relative
          w-[1100px]
          h-[1150px]
          xl:scale-100
          lg:scale-[0.82]
          origin-top
        "
      >
        {/* ================= SVG Lines ================= */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1100 950"
        >
          {skills.map((skill) => {
            const x2 = 550 + skill.x;
            const y2 = 475 + skill.y;

            const active = activeSkill === null || activeSkill === skill.name;

            return (
              <g key={skill.name}>
                <line
                  x1={550}
                  y1={475}
                  x2={x2}
                  y2={y2}
                  stroke="#915EFF"
                  strokeWidth={active ? 2.5 : 1.5}
                  opacity={active ? 0.8 : 0.2}
                />
                {showDebug && (
                  <circle cx={x2} cy={y2} r={5} fill="red" opacity={0.9} />
                )}
              </g>
            );
          })}
        </svg>
        {/* ================= Dragon Core ================= */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
          "
        >
          <div
            className="
              relative
              w-40
              h-40
              rounded-full
              bg-gradient-to-br
              from-[#915EFF]
              to-[#00CEA8]
              p-[2px]
            "
          >
            <div
              className="
                w-full
                h-full
                rounded-full
                bg-[#151030]
                flex
                flex-col
                items-center
                justify-center
                shadow-[0_0_50px_rgba(145,94,255,0.35)]
              "
            >
              <FaDragon className="text-[#915EFF]" size={42} />

              <h3 className="mt-3 text-white font-bold text-lg">Skills</h3>

            </div>
          </div>
        </div>{" "}
        {/* ================= Skill Cards ================= */}
        {skills.map((skill) => (
          <div
            key={skill.name}
            onMouseEnter={() => setActiveSkill(skill.name)}
            onMouseLeave={() => setActiveSkill(null)}
          >
            <SkillCard
              name={skill.name}
              icon={skill.icon}
              x={skill.x}
              y={skill.y}
            />
          </div>
        ))}

        {showDebug &&
          skills.map((skill) => (
            <div
              key={skill.name + "-dbg"}
              style={{
                position: "absolute",
                left: `calc(50% + ${skill.x}px)`,
                top: `calc(50% + ${skill.y}px)`,
                transform: "translate(-50%, -50%)",
                width: 10,
                height: 10,
                borderRadius: 5,
                background: "rgba(255,0,0,0.9)",
                pointerEvents: "none",
              }}
            />
          ))}
        {/* ================= Center Glow ================= */}
        {/* <div
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[420px]
            h-[420px]
            rounded-full
            bg-[#915EFF]/10
            blur-[120px]
            -z-10
          "
        /> */}
        {/* ================= Background Stars ================= */}
        {/* <Stars /> */}
      </div>
    </div>
  );
};

export default DesktopSkillGraph;
