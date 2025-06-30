import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="w-full sm:w-[380px] max-w-sm"
    >
      <Card className="h-[450px] flex flex-col overflow-hidden rounded-2xl shadow-md hover:shadow-2xl  dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition duration-300 ease-in-out">
        <div className="relative h-96 w-full overflow-hidden">
          <img
            src={project.images?.[0]?.url}
            alt={project.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>

        <CardContent className="flex flex-col justify-between flex-1 p-5">
          <CardTitle className="text-xl font-bold mb-2 flex justify-between items-center text-gray-900 dark:text-gray-100">
            <span className="line-clamp-1">{project.name}</span>
            <Sparkles className="text-purple-500 h-5 w-5 shrink-0" />
          </CardTitle>

          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
            {project.longDescription?.substring(0, 130)}...
          </p>

          <div className="flex justify-between items-center mt-6">
            <Link to={`/projects/${project._id}`}>
              <Button
                variant="secondary"
                className="rounded-full text-sm px-5 py-2 hover:scale-105 transition-transform"
              >
                Details
              </Button>
            </Link>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  
                  className="bg-black text-white text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform"
                >
                  🚀 Live Demo
                </Button>
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
