import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

const ProjectSearch = ({ searchTerm, onSearch, className = "" }) => {
  const [localTerm, setLocalTerm] = useState(searchTerm);

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(localTerm);
    }, 300);
    return () => clearTimeout(delay);
  }, [localTerm]);

  return (
    <div className={`relative ${className}`}>
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>
      <Input
        id="project-search"
        type="text"
        placeholder="Search projects..."
        value={localTerm}
        onChange={(e) => setLocalTerm(e.target.value)}
        className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
    </div>
  );
};

export default ProjectSearch;
