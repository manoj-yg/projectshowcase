import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

const SharedPortfolio = () => {
  const { shareId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [projects, setProjects] = useState([]);
  const [shareInfo, setShareInfo] = useState(null);

  useEffect(() => {
    fetchSharedPortfolio();
  }, [shareId]);

  const fetchSharedPortfolio = async () => {
    try {
      const response = await axios.get(`/api/share/${shareId}`);

      if (response.data.success) {
        setProjects(response.data.projects);
        setShareInfo(response.data.share);
      } else {
        setError("Invalid or expired share link");
      }
    } catch (err) {
      console.error("Error fetching shared portfolio:", err);
      setError("Failed to load portfolio. The link may be expired or invalid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
              <h1 className="text-2xl font-bold text-gray-900">DevPortfolio</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Create Your Own →
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Share Info */}
        {shareInfo && (
          <div className="card p-6 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Shared Portfolio
                </h1>
                <p className="text-gray-600">
                  Viewing shared projects • Link created{" "}
                  {new Date(shareInfo.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {projects.length}
                  </div>
                  <div className="text-sm text-gray-500">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {shareInfo.viewCount}
                  </div>
                  <div className="text-sm text-gray-500">Views</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="card p-8 text-center mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{error}</h2>
            <p className="text-gray-600 mb-6">
              This share link may have expired or been deleted.
            </p>
            <Link to="/" className="btn-primary">
              Create Your Own Portfolio
            </Link>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8 animate-pulse"></div>
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
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && projects.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>

            {/* Call to Action */}
            <div className="card p-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Create Your Own Portfolio
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Showcase your projects and share them with potential employers,
                clients, and the community.
              </p>
              <Link
                to="/"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg inline-block transition-colors duration-200"
              >
                Get Started Free
              </Link>
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="card p-12 text-center">
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
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No Projects in This Portfolio
            </h2>
            <p className="text-gray-600 mb-6">
              This portfolio doesn't contain any projects yet.
            </p>
            <Link to="/" className="btn-primary">
              Browse More Portfolios
            </Link>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-2">
            © 2024 DevPortfolio Showcase. Shared via DevPortfolio.
          </p>
          <p className="text-sm text-gray-500">
            This is a shared portfolio view. Links expire after 30 days.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SharedPortfolio;