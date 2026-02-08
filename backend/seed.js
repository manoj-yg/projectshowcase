const mongoose = require("mongoose");
const Project = require("./models/Project");
require("dotenv").config();

const sampleProjects = [
  {
    name: "Nodure",
    liveUrl: "https://nodure.example.com",
    description:
      "A modern Node.js framework for building scalable applications",
    techStack: ["REACT", "TAILWIND", "TYPESCRIPT"],
  },
  {
    name: "Nexus Analytics UI",
    liveUrl: "https://nexus-analytics.example.com",
    description:
      "A real-time data visualization platform for monitoring microservices with interactive charts",
    techStack: ["React", "D3.js", "Node.js", "WebSocket"],
  },
  {
    name: "DevCommerce Engine",
    liveUrl: "https://devcommerce.example.com",
    description:
      "A high-performance e-commerce backend built with Next.js 14 and full Stripe integration",
    techStack: ["Next.js 14", "Stripe", "MongoDB", "Tailwind"],
  },
  {
    name: "CodeReview AI",
    liveUrl: "https://codereview-ai.example.com",
    description:
      "An automated code auditing tool that identifies security vulnerabilities using LLMs",
    techStack: ["Python", "OpenAI API", "FastAPI", "PostgreSQL"],
  },
];

async function seedDatabase() {
  try {
    // REMOVED DEPRECATED OPTIONS
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Project.deleteMany({});
    console.log("Cleared existing projects");

    await Project.insertMany(sampleProjects);
    console.log("Added sample projects");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
