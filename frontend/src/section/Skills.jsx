import React from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiNodedotjs,
} from "react-icons/si";
import useSectionInView from "@/hooks/useSectionInView";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { SparklesText } from "@/components/magicui/sparkles-text";

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

const baseIcons = [
  {
    icon: <SiReact />,
    label: "React",
    color: "text-cyan-400",
    link: "https://reactjs.org",
  },
  {
    icon: <SiHtml5 />,
    label: "HTML5",
    color: "text-orange-500",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    icon: <SiCss3 />,
    label: "CSS3",
    color: "text-blue-500",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    icon: <SiNodedotjs />,
    label: "Node.js",
    color: "text-green-500",
    link: "https://nodejs.org",
  },
  {
    icon: <SiMysql />,
    label: "MySQL",
    color: "text-blue-700",
    link: "https://www.mysql.com",
  },
  {
    icon: <SiJavascript />,
    label: "JavaScript",
    color: "text-yellow-400",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    icon: <SiMongodb />,
    label: "MongoDB",
    color: "text-green-700",
    link: "https://www.mongodb.com",
  },
  {
    icon: <SiRedux />,
    label: "Redux",
    color: "text-purple-500",
    link: "https://redux.js.org",
  },
  {
    icon: <SiTailwindcss />,
    label: "TailwindCSS",
    color: "text-cyan-300",
    link: "https://tailwindcss.com",
  },
];

const getOrbits = (icons, isMobile) => {
  let orbits = [];
  let index = 0;
  let radius = isMobile ? 80 : 120;
  let count = 4;

  while (index < icons.length) {
    orbits.push({
      id: `orbit-${index}`,
      radius,
      reverse: index % 2 === 0,
      duration: 16 + index * 4,
      skills: icons.slice(index, index + count),
    });
    index += count;
    count += 1;
    radius += isMobile ? 60 : 80;
  }

  return orbits;
};

const Skills = ({ speedFactor = 1 }) => {
  const { ref, inView } = useSectionInView("Skills");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 768px)");
  const iconSize = isMobile ? 30 : isTablet ? 36 : 42;

  const orbits = getOrbits(baseIcons, isMobile);

  return (
    <section
      ref={ref}
      id="skills"
      className="px-4 min-h-[calc(100vh-64px)] bg-black flex flex-col items-center justify-center overflow-hidden transition-colors duration-300"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <SparklesText className="text-4xl md:text-5xl font-bold text-white">
            Skills
          </SparklesText>
          <p className="text-gray-400 max-w-xl mt-4 text-md sm:text-base">
            Technologies I work with to build modern, scalable, and responsive
            apps.
          </p>
        </motion.div>
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
                className="relative group flex flex-col items-center pointer-events-auto"
              >
                <a
                  href={skill.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full hover:scale-110 transition-transform ${skill.color}`}
                >
                  {React.cloneElement(skill.icon, { size: iconSize })}
                </a>
                {skill.label && (
                  <div className="absolute -top-8 bg-white dark:bg-black text-black dark:text-white text-xs font-medium px-2 py-1 rounded-md shadow-md opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap text-center z-50">
                    {skill.label}
                  </div>
                )}
              </div>
            ))}
          </OrbitingCircles>
        ))}
      </div>
    </section>
  );
};

export default Skills;
