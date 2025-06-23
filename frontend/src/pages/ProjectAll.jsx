import React, { useState, useEffect, useMemo } from "react";
import ProjectSearch from "../components/ProjectSearch";
import ProjectCard from "../components/ProjectCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { projectsData } from "../data/Protfolio";

const ProjectAll = () => {
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const sanitizeString = (str) =>
    String(str)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "");

  const handleSearch = (term) => {
    setSearchTerm(sanitizeString(term));
    setCurrentPage(1);
  };

  const handleFilter = (type) => {
    setFilterType(type);
    setCurrentPage(1);
  };

  const filteredAndSortedProjects = useMemo(() => {
    const filtered = projectsData
      .filter((project) =>
        filterType === "all" ? true : project.type === filterType
      )
      .filter((project) => {
        const searchContent = [
          project.id,
          project.name,
          project.description,
          ...(project.technologies || []),
        ]
          .map(sanitizeString)
          .join(" ");
        return searchContent.includes(searchTerm);
      });

    return filtered.sort((a, b) =>
      sortOrder === "latest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );
  }, [filterType, sortOrder, searchTerm]);

  const totalPages = Math.ceil(
    filteredAndSortedProjects.length / projectsPerPage
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const currentProjects = filteredAndSortedProjects.slice(
    indexOfLastProject - projectsPerPage,
    indexOfLastProject
  );

  const getPaginationPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col min-h-screen px-4 max-w-7xl mx-auto dark:bg-gray-950 mt-5 mb-8 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500">
          My Work
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore a collection of my diverse projects, showcasing my skills in
          web and app development. Use the filters and search to find what
          interests you!
        </p>
      </header>

      <main className="flex-1">
        {/* Search */}
        <div className="mb-10 mt-5 w-full flex justify-center">
          <ProjectSearch
            className="w-full max-w-2xl"
            searchTerm={searchTerm}
            onSearch={handleSearch}
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 p-4 sm:p-6">
          <div className="flex flex-wrap justify-center gap-3">
            {["all", "web", "app"].map((type) => (
              <button
                key={type}
                onClick={() => handleFilter(type)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out ${
                  filterType === type
                    ? "bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 border border-transparent dark:border-gray-600"
                }`}
              >
                {type === "all"
                  ? "All Projects"
                  : `${type.toUpperCase()} Projects`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-gray-300 text-md font-medium">
              Sort by:
            </span>
            <Select
              onValueChange={(value) => setSortOrder(value)}
              defaultValue={sortOrder}
            >
              <SelectTrigger className="w-[160px] bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800">
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="flex flex-wrap justify-center items-stretch gap-6">
          {currentProjects.length > 0 ? (
            currentProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)]"
              />
            ))
          ) : (
            <p className="text-center text-xl text-gray-500 dark:text-gray-400 w-full py-6">
              No projects found matching your criteria.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-12">
            <PaginationContent className="flex-wrap justify-center gap-1">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              {getPaginationPages().map((page, index) =>
                page === "..." ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
    </div>
  );
};

export default ProjectAll;
