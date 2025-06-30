import React, { useEffect, useState } from "react";
import axios from "axios";
import { allIcons } from "@/utils/iconList";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { SparklesText } from "@/components/magicui/sparkles-text";
import useSectionInView from "@/hooks/useSectionInView";

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
      const { data } = await axios.get("http://localhost:5000/api/v1/skills/getall");
      // map iconName to actual icon component
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
      className="px-4 min-h-[calc(100vh-64px)] bg-black flex flex-col items-center justify-center overflow-hidden transition-colors duration-300"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center py-20">
        <SparklesText className="text-4xl md:text-5xl font-bold text-white">Skills</SparklesText>
        <p className="text-gray-400 max-w-xl mt-4 text-md sm:text-base">
          Technologies I work with to build modern, scalable, and responsive apps.
        </p>
      </div>

      {/* Orbiting Icons */}
      <div className="relative flex items-center justify-center w-full h-[400px] sm:h-[600px] md:h-[700px]">
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
                className="relative group flex text-pink-600 flex-col items-center pointer-events-auto"
              >
                <a
                  href={skill.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full hover:scale-110 transition-transform ${skill.color}`}
                >
                  <skill.Icon size={iconSize} />
                </a>
                <div className="absolute -top-8 bg-white dark:bg-black text-black dark:text-white text-xs font-medium px-2 py-1 rounded-md shadow-md opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap text-center z-50">
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
