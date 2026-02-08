const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Project = require("../models/Project");
const PortfolioShare = require("../models/PortfolioShare");

// Create a shareable portfolio link
router.post("/create", async (req, res) => {
  try {
    const { projectIds } = req.body;

    // Get all projects if no specific IDs provided
    let projects;
    if (projectIds && projectIds.length > 0) {
      projects = await Project.find({ _id: { $in: projectIds } });
    } else {
      projects = await Project.find().sort({ createdAt: -1 }).limit(10);
    }

    // Generate unique share ID
    const shareId = uuidv4().slice(0, 8);

    const share = new PortfolioShare({
      shareId,
      projects: projects.map((p) => p._id),
    });

    await share.save();

    res.json({
      success: true,
      shareId,
      shareUrl: `${req.protocol}://${req.get("host")}/api/share/${shareId}`,
      shortUrl: `/share/${shareId}`,
      projects: projects.length,
    });
  } catch (error) {
    console.error("Share creation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create share link",
    });
  }
});

// Get shared portfolio
router.get("/:shareId", async (req, res) => {
  try {
    const { shareId } = req.params;

    const share = await PortfolioShare.findOne({ shareId })
      .populate("projects")
      .exec();

    if (!share) {
      return res.status(404).json({
        success: false,
        message: "Share link not found or expired",
      });
    }

    // Update view count
    share.viewCount += 1;
    share.lastViewed = new Date();
    await share.save();

    res.json({
      success: true,
      share: {
        id: share.shareId,
        createdAt: share.createdAt,
        viewCount: share.viewCount,
        lastViewed: share.lastViewed,
      },
      projects: share.projects,
    });
  } catch (error) {
    console.error("Share retrieval error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve shared portfolio",
    });
  }
});

module.exports = router;
