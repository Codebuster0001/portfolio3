import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const ProjectCard = ({ project }) => {
  return (
    <Card className="w-[380px] h-[410px] flex flex-col overflow-hidden rounded-xl hover:shadow-2xl transition duration-300 ease-in-out">
      <img
        src={project.images?.[0]?.url}
        alt={project.name}
        className="h-60 w-full object-cover"
      />
      <CardContent className="flex flex-col justify-between flex-1 p-4">
        <CardTitle className="text-lg font-bold mb-2 flex justify-between items-center">
          {project.name}
          <Sparkles className="text-purple-500 h-5 w-5" />
        </CardTitle>

        <p className="text-sm text-gray-600 line-clamp-3">
          {project.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <Link to={`/projects/${project.id}`}>
            <Button
              variant="secondary"
              className="rounded-full text-sm px-4 py-1.5"
            >
              Details
            </Button>
          </Link>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                className="text-blue-600 text-sm px-4 py-1.5"
              >
                Demo ↗
              </Button>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
