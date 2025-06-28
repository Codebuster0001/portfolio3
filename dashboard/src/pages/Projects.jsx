import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "@/store/slices/projectSlice";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">All Projects</h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white dark:bg-zinc-900 shadow-lg rounded-xl overflow-hidden transition-all hover:shadow-2xl"
            >
              {project.images?.[0]?.url && (
                <img
                  src={project.images[0].url}
                  alt={project.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5 space-y-3">
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {project.longDescription}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies?.slice(0, 4).map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-primary text-white px-2 py-0.5 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4">
                  <Link
                    to={project.demoUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Live Demo
                  </Link>

                  <Link
                    to={`/dashboard/project/edit/${project._id}`}
                    className="text-sm text-zinc-700 dark:text-white hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
