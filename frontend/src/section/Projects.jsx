// src/pages/Projects.jsx
import { SparklesText } from "@/components/magicui/sparkles-text";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { getAllProjects } from "@/store/slices/projectSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Projects = () => {
  const dispatch = useDispatch();
  const { allProjects, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const limitedProjects = allProjects.slice(0, 6);

  return (
    <section
      id="projects"
      className="min-h-screen px-4 sm:px-8 py-28  text-white"
    >
      <div className="text-center mb-16">
        <SparklesText className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white tracking-tight">
          Featured Projects
        </SparklesText>
        <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          A curated selection of impactful projects highlighting my frontend
          development capabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              repeatType: "reverse",
            }}
            className="col-span-full text-center text-lg text-gray-400"
          >
            Loading featured projects...
          </motion.p>
        ) : (
          limitedProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        )}
      </div>

      {!loading && (
        <div className="mt-20 flex justify-center">
          <Link to="/projects">
            <Button className="group px-8 py-6 text-lg font-semibold rounded-full bg-black border border-gray-700 ">
              View All Projects
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Projects;
