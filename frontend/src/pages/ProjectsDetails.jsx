// src/pages/ProjectDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { projectsData } from "@/data/Protfolio";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find((p) => String(p.id) === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 space-y-6">
        <SparklesText text="Project Not Found" className="text-4xl font-bold" />
        <p className="text-gray-600 dark:text-gray-300">
          The project you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate("/projects")}>
          ← Go Back to Projects
        </Button>
      </div>
    );
  }

  // Only images are used
  const media = (project.images || []).map((img) => img.url);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % media.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [media.length]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => (prev + 1) % media.length),
    onSwipedRight: () =>
      setCurrentIndex((prev) => (prev - 1 + media.length) % media.length),
    trackMouse: true,
  });

  return (
    <div className="container mx-auto px-4 pt-16 pb-8 max-w-6xl">
      <BoxReveal boxColor="#6366f1">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-indigo-600 hover:underline"
        >
          ← Back to Projects
        </Button>
      </BoxReveal>

      {/* Title and Links */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <SparklesText className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
          {project.name}
        </SparklesText>

        <div className="flex flex-wrap gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default">🌐 GitHub</Button>
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="default">🚀 Live Demo</Button>
            </a>
          )}
        </div>
      </div>

      {/* Media Carousel */}
      {media.length > 0 && (
        <Card className="mb-6 overflow-hidden relative border border-gray-300 dark:border-gray-700 shadow-lg">
          <div
            {...swipeHandlers}
            className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center"
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <img
                src={media[currentIndex]}
                alt={`Screenshot ${currentIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </motion.div>

            <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm z-10">
              {currentIndex + 1}/{media.length}
            </div>
          </div>
        </Card>
      )}

      {/* Thumbnails */}
      {media.length > 1 && (
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {media.map((item, index) => (
            <div
              key={index}
              className={`relative w-20 h-14 cursor-pointer rounded-md overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex
                  ? "border-indigo-500 ring-2 ring-indigo-500 scale-105"
                  : "border-gray-300 dark:border-gray-600 hover:border-indigo-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={item}
                alt={`Thumb ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="md:col-span-2 space-y-8">
          <BoxReveal boxColor="#10b981">
            <h3 className="text-2xl font-semibold mb-4">About the Project</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.longDescription}
            </p>
          </BoxReveal>

          {project.challenges?.length > 0 && (
            <BoxReveal boxColor="#f97316">
              <h3 className="text-2xl font-semibold mb-3">
                Challenges & Solutions
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                {project.challenges.map((item, i) => (
                  <li key={i} className="text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </BoxReveal>
          )}

          {project.learnings?.length > 0 && (
            <BoxReveal boxColor="#22c55e">
              <h3 className="text-2xl font-semibold mb-3">Key Learnings</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                {project.learnings.map((item, i) => (
                  <li key={i} className="text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </BoxReveal>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {project.role && (
            <BoxReveal boxColor="#6b7280">
              <h3 className="text-2xl font-semibold mb-3">My Role</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {project.role}
              </p>
            </BoxReveal>
          )}

          {project.technologies?.length > 0 && (
            <BoxReveal boxColor="#f43f5e">
              <h3 className="text-2xl font-semibold mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm px-3 py-1 hover:bg-indigo-500"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </BoxReveal>
          )}

          <BoxReveal boxColor="#3b82f6">
            <h3 className="text-2xl font-semibold mb-3">Project Details</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <strong>Type:</strong>{" "}
              <Badge className="ml-1 capitalize">{project.type}</Badge>
            </p>
            {project.createdAt && (
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <strong>Completed:</strong>{" "}
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </BoxReveal>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
