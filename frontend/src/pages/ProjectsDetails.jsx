// ✅ ProjectDetails.jsx (Enhanced Design with High Contrast Text)
import { BoxReveal } from "@/components/magicui/box-reveal";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProjectById } from "@/store/slices/projectSlice.js";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleProject: project, loading } = useSelector(
    (state) => state.projects || {}
  );

  useEffect(() => {
    dispatch(getProjectById(id));
  }, [id, dispatch]);

  const media = useMemo(
    () => project?.images?.map((img) => img.url) || [],
    [project]
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!media.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % media.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [media]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => (prev + 1) % media.length),
    onSwipedRight: () =>
      setCurrentIndex((prev) => (prev - 1 + media.length) % media.length),
    trackMouse: true,
  });

  if (loading)
    return (
      <p className="text-center mt-20 text-xl font-semibold animate-pulse text-black dark:text-white">
        Loading Project...
      </p>
    );
  if (!project)
    return (
      <p className="text-center mt-20 text-lg text-red-700 dark:text-red-400">
        Project not found
      </p>
    );

  return (
    <div className="container mx-auto px-4 pt-20 pb-12 max-w-7xl text-black dark:text-white">
      <BoxReveal boxColor="#6366f1">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-indigo-700 hover:underline text-sm"
        >
          ← Back to Projects
        </Button>
      </BoxReveal>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <SparklesText className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-purple-600 dark:text-purple-400">
          {project.name}
        </SparklesText>

        <div className="flex flex-wrap gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-200 flex items-center gap-2"
              >
                <Globe size={18} /> GitHub
              </Button>
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="default"
                className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-md hover:scale-105"
              >
                🚀 Live Demo
              </Button>
            </a>
          )}
        </div>
      </div>

      {media.length > 0 && (
        <Card className="mb-8 overflow-hidden relative border border-gray-300 dark:border-gray-700 shadow-xl rounded-xl">
          <div
            {...swipeHandlers}
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-white dark:bg-gray-900 flex items-center justify-center rounded-xl"
          >
            <motion.img
              key={currentIndex}
              src={media[currentIndex]}
              alt={`Screenshot ${currentIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-contain rounded-xl"
            />
            <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs">
              {currentIndex + 1}/{media.length}
            </div>
          </div>
        </Card>
      )}

      {media.length > 1 && (
        <div className="flex justify-center gap-2 mb-12 overflow-x-auto scrollbar-hide">
          {media.map((item, index) => (
            <div
              key={index}
              className={`w-20 h-14 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex
                  ? "border-indigo-600 ring-2 ring-indigo-600 scale-105"
                  : "border-gray-300 hover:border-indigo-500"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-10">
          <BoxReveal boxColor="#10b981">
            <h3 className="text-2xl font-bold mb-3 text-emerald-600">
              About the Project
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-200">
              {project.longDescription}
            </p>
          </BoxReveal>

          {project.challenges?.length > 0 && (
            <BoxReveal boxColor="#f97316">
              <h3 className="text-2xl font-bold mb-3 text-orange-600">
                Challenges & Solutions
              </h3>
              <ul className="list-disc list-inside space-y-2 text-base text-gray-600 dark:text-gray-200">
                {project.challenges.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </BoxReveal>
          )}

          {project.learnings?.length > 0 && (
            <BoxReveal boxColor="#22c55e">
              <h3 className="text-2xl font-bold mb-3 text-green-600">
                Key Learnings
              </h3>
              <ul className="list-disc list-inside space-y-2 text-base text-gray-600 dark:text-gray-200">
                {project.learnings.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </BoxReveal>
          )}
        </div>

        <div className="space-y-10">
          {project.role && (
            <BoxReveal boxColor="#6b7280">
              <h3 className="text-2xl font-bold mb-3 text-zinc-300">My Role</h3>
              <p className="text-base text-gray-600 dark:text-gray-200">
                {project.role}
              </p>
            </BoxReveal>
          )}

          {project.technologies?.length > 0 && (
            <BoxReveal boxColor="#f43f5e">
              <h3 className="text-2xl font-bold mb-3 text-pink-500">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm px-3 py-1 hover:bg-indigo-600 text-gray-900 dark:text-white"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </BoxReveal>
          )}

          <BoxReveal boxColor="#3b82f6">
            <h3 className="text-2xl font-bold mb-3 text-blue-600">
              Project Details
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-200">
              <strong>Type:</strong>{" "}
              <Badge className="ml-1 capitalize bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-white">
                {project.type}
              </Badge>
            </p>
            {project.createdAt && (
              <p className="text-base text-gray-600 dark:text-gray-200">
                <strong>Completed:</strong>{" "}
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            )}
          </BoxReveal>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
