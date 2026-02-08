import React, { useState } from "react";
import axios from "axios";

const ProjectForm = ({ onProjectAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    liveUrl: "",
    description: "",
    techStack: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/projects", {
        ...formData,
        techStack: formData.techStack.split(",").map((item) => item.trim()),
      });

      setMessage("Project added successfully!");
      setFormData({
        name: "",
        liveUrl: "",
        description: "",
        techStack: "",
      });

      // Notify parent component
      if (onProjectAdded) {
        onProjectAdded(response.data);
      }
    } catch (error) {
      setMessage("Error adding project. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Project</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded-lg ${message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. AI-Powered Dashboard"
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Live URL
          </label>
          <input
            type="url"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            placeholder="https://my-app.vercel.app"
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly explain what your project solves..."
            className="input-field h-32 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tech Stack (comma separated)
          </label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            placeholder="React, Tailwind, Node.js, etc."
            className="input-field"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Adding Project..." : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
