const mongoose = require("mongoose");

const portfolioShareSchema = new mongoose.Schema({
  shareId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 30, // 30 days expiration
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  lastViewed: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PortfolioShare", portfolioShareSchema);
