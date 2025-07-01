import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { SparklesText } from "@/components/magicui/sparkles-text";
import useSectionInView from "@/hooks/useSectionInView";
import { allIcons } from "@/utils/iconList";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query, matches]);
  return matches;
};

const getOrbits = (skills, isMobile) => {
  const orbits = [];
  let index = 0;
  let radius = isMobile ? 80 : 120;
  let count = 4;

  while (index < skills.length) {
    orbits.push({
      id: `orbit-${index}`,
      radius,
      reverse: index % 2 === 0,
      duration: 16 + index * 4,
      skills: skills.slice(index, index + count),
    });
    index += count;
    count += 1;
    radius += isMobile ? 60 : 80;
  }

  return orbits;
};

const Skills = ({ speedFactor = 1 }) => {
  const { ref, inView } = useSectionInView("Skills");
  const [skills, setSkills] = useState([]);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 768px)");
  const iconSize = isMobile ? 30 : isTablet ? 36 : 42;

  const fetchSkills = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/skills/getall"
      );
      const parsed = data.skills
        .map((skill) => ({
          ...skill,
          Icon: allIcons[skill.iconName] || null,
        }))
        .filter((skill) => skill.Icon !== null);
      setSkills(parsed);
    } catch (err) {
      console.error("Failed to fetch skills:", err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const orbits = getOrbits(skills, isMobile);

  return (
    <section
      ref={ref}
      id="skills"
      className="relative z-10 px-4 mt-8 min-h-[calc(100vh-64px)] flex flex-col items-center justify-center overflow-hidden transition-colors duration-300"
    >
      <div className="w-full max-w-6xl mx-auto text-center py-20">
        <SparklesText className="text-4xl md:text-5xl font-bold text-white">
          Skills & Technologies
        </SparklesText>
        <p className="text-gray-400 max-w-2xl mt-4 mx-auto text-md sm:text-base">
          A collection of tools and technologies I use to craft high-quality,
          scalable applications.
        </p>
      </div>

      {/* Orbiting Icons */}
      <div className="relative flex items-center justify-center w-full h-[420px] sm:h-[600px] md:h-[700px] mb-10">
        {orbits.map((orbit, i) => (
          <OrbitingCircles
            key={orbit.id}
            radius={orbit.radius}
            duration={orbit.duration}
            iconSize={iconSize}
            reverse={i % 2 === 0}
            speed={speedFactor}
            className="pointer-events-none"
          >
            {orbit.skills.map((skill, index) => (
              <div
                key={index}
                className="relative group flex text-white flex-col items-center pointer-events-auto"
              >
                <a
                  href={skill.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full transition-transform transform hover:scale-110 border border-white/10 shadow-md backdrop-blur-md ${skill.color}`}
                >
                  <skill.Icon size={iconSize} />
                </a>
                <div className="absolute -top-9 bg-white dark:bg-zinc-900 text-black dark:text-white text-xs font-semibold px-2 py-1 rounded-md shadow-lg opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap text-center z-50">
                  {skill.label}
                </div>
              </div>
            ))}
          </OrbitingCircles>
        ))}
      </div>
    </section>
  );
};

export default Skills;
