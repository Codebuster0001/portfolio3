// src/pages/Projects.jsx
import React from "react";
import { projectsData } from "@/data/Protfolio.js";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SparklesText } from "@/components/magicui/sparkles-text";

const Projects = () => {
  const limitedProjects = projectsData.slice(0, 6);

  return (
    <section
      id="projects"
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 flex flex-col justify-center items-center"
    >
      {/* Heading */}
      <div className="text-center mb-12">
        <SparklesText className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Featured Projects
        </SparklesText>
      </div>

      {/* Flexbox Cards */}
      <div className="flex flex-wrap justify-center gap-6 w-full">
        {limitedProjects.map((project) => (
          <div
            key={project.id}
            className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] flex justify-center"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-12 flex justify-center">
        <Link to="/projects">
          <Button
            className="px-6 py-3 text-sm sm:text-base md:text-lg rounded-full"
            aria-label="View All Projects"
          >
            View All Projects
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Projects;
