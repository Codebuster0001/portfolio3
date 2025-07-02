import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProjects } from "../store/slices/projectSlice.js";

// Normalize a string
const normalize = (str = "") => str.toLowerCase().replace(/[^a-z0-9]/gi, "");
const tokenize = (str = "") =>
  str
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.replace(/[^a-z0-9]/gi, ""))
    .filter(Boolean);

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.project);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const filteredProjects = projects?.filter((project) => {
    const searchWords = tokenize(search);
    if (searchWords.length === 0) return true;

    const name = normalize(project.name || "");
    const description = normalize(project.longDescription || "");
    const techs = (project.technologies || [])
      .map((tech) => normalize(tech))
      .join(" ");

    return searchWords.every(
      (word) =>
        name.includes(word) ||
        description.includes(word) ||
        techs.includes(word)
    );
  });

  const paginatedProjects = filteredProjects?.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const totalPages = Math.ceil(filteredProjects?.length / projectsPerPage || 1);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title + Quote */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary mb-3">
         🧩 Manage Projects
        </h1>
        <p className="text-muted-foreground text-base italic">
          "Projects are the proof of what you’ve learned and where you’re
          going."
        </p>
      </div>

      {/* Add + Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by name, description, or technology..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:max-w-md"
        />
        <Link
          to="/dashboard/project/addproject"
          className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90"
        >
          + Add Project
        </Link>
      </div>

      {/* Project Cards */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin w-8 h-8 text-primary" />
        </div>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : filteredProjects?.length === 0 ? (
        <p className="text-center text-muted-foreground">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProjects.map((project) => (
            <div
              key={project._id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm hover:shadow-xl transition duration-300 flex flex-col overflow-hidden"
            >
              {project.images?.[0]?.url && (
                <img
                  src={project.images[0].url}
                  alt={project.name}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="flex flex-col justify-between p-5 h-full">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                    {project.name}
                  </h2>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {project.longDescription}
                  </p>

                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 px-2 py-0.5 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <Dialog>
                    <DialogTrigger className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      Live Demo
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{project.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          {project.longDescription}
                        </p>
                        <a
                          href={project.demoUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-500 underline"
                        >
                          Visit Live Demo
                        </a>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Link
                    to={`/dashboard/project/edit/${project._id}`}
                    className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 text-sm rounded-md border ${
                currentPage === idx + 1
                  ? "bg-primary text-white"
                  : "text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
