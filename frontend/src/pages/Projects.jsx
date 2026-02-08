import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import ShareModal from "../components/ShareModal"; 

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [selectedProjects, setSelectedProjects] = useState([]); 
  const [isShareModalOpen, setIsShareModalOpen] = useState(false); 

  useEffect(() => {
    fetchProjects();
  }, [page]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`/api/projects?page=${page}&limit=6`);
      setProjects(response.data.projects);
      setTotalPages(response.data.totalPages);
      setTotalProjects(response.data.totalProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  // Add project selection handler
  const toggleProjectSelection = (project) => {
    setSelectedProjects((prev) => {
      const isSelected = prev.some((p) => p._id === project._id);
      if (isSelected) {
        return prev.filter((p) => p._id !== project._id);
      } else {
        return [...prev, project];
      }
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center justify-between mt-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  All Projects
                </h1>
                <p className="text-gray-600 mt-2">
                  Showing {projects.length} of {totalProjects} projects
                  {selectedProjects.length > 0 && (
                    <span className="ml-2 text-blue-600 font-medium">
                      • {selectedProjects.length} selected
                    </span>
                  )}
                </p>
              </div>

              {/* Share Selected Button */}
              {selectedProjects.length > 0 && (
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span>Share Selected ({selectedProjects.length})</span>
                </button>
              )}
            </div>
          </div>

          {loading && projects.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <>
              {/* Add selection checkbox to each project */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => {
                  const isSelected = selectedProjects.some(
                    (p) => p._id === project._id,
                  );
                  return (
                    <div key={project._id} className="relative">
                      {/* Selection Checkbox */}
                      <div className="absolute top-4 right-4 z-10">
                        <label className="cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleProjectSelection(project)}
                            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </label>
                      </div>
                      <ProjectCard project={project} />
                    </div>
                  );
                })}
              </div>

              {page < totalPages && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMore}
                    className="btn-primary px-8"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Load More Projects"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Projects Found
              </h3>
              <p className="text-gray-500 mb-6">
                Be the first to add a project!
              </p>
              <Link to="/" className="btn-primary">
                Add Your First Project
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => {
          setIsShareModalOpen(false);
          setSelectedProjects([]); // Clear selection after sharing
        }}
        selectedProjects={selectedProjects}
      />
    </>
  );
};

export default Projects;
