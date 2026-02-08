console.log("🧪 Testing build process...");

const { execSync } = require("child_process");
const fs = require("fs");

try {
  // 1. Install frontend deps
  console.log("📦 Installing frontend dependencies...");
  execSync("npm install", { cwd: "frontend", stdio: "inherit" });

  // 2. Build frontend
  console.log("🔨 Building frontend...");
  execSync("npm run build", { cwd: "frontend", stdio: "inherit" });

  // 3. Check if dist folder exists
  const distExists = fs.existsSync("frontend/dist/index.html");
  if (distExists) {
    console.log("✅ Build successful!");
    console.log("📁 dist/index.html exists");
  } else {
    console.log("❌ Build failed: dist folder not created");
  }
} catch (error) {
  console.log("❌ Error:", error.message);
}
