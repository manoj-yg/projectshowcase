import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  // Default image if no logo provided
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="card hover:shadow-xl transition-all duration-300 h-full">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              {getInitials(project.name)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {project.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Added {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-2 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.slice(0, 3).map((tech, index) => (
            <span key={index} className="tag">
              {tech.toUpperCase()}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="tag">+{project.techStack.length - 3} more</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
          >
            <span>Live Demo</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          {/* Updated View Details button to link to detail page */}
          <Link
            to={`/project/${project._id}`}
            className="btn-secondary text-sm flex items-center space-x-1"
          >
            <span>View Details</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
