const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Get all projects with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Project.countDocuments();

    res.json({
      projects,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProjects: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new project
router.post("/", async (req, res) => {
  try {
    const { name, liveUrl, description, techStack } = req.body;

    const project = new Project({
      name,
      liveUrl,
      description,
      techStack: Array.isArray(techStack)
        ? techStack
        : techStack.split(",").map((item) => item.trim()),
    });

    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update project
router.put("/:id", async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
      techStack: Array.isArray(req.body.techStack)
        ? req.body.techStack
        : req.body.techStack.split(",").map((item) => item.trim()),
    };

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true },
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Delete project
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
