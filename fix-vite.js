const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🔧 Fixing Vite installation...");

// Check frontend package.json
const frontendPackagePath = path.join(__dirname, "frontend/package.json");
if (fs.existsSync(frontendPackagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(frontendPackagePath, "utf8"));

  // Ensure vite is in devDependencies
  if (!packageJson.devDependencies || !packageJson.devDependencies.vite) {
    console.log("⚠️  Vite not found in frontend devDependencies");
    console.log("Adding vite...");

    packageJson.devDependencies = packageJson.devDependencies || {};
    packageJson.devDependencies.vite = "^5.0.0";

    fs.writeFileSync(frontendPackagePath, JSON.stringify(packageJson, null, 2));
    console.log("✅ Added vite to frontend package.json");
  } else {
    console.log("✅ Vite already in package.json");
  }
}

// Install dependencies
console.log("📦 Installing frontend dependencies...");
try {
  execSync("npm install --legacy-peer-deps", {
    cwd: path.join(__dirname, "frontend"),
    stdio: "inherit",
  });
  console.log("✅ Frontend dependencies installed");
} catch (error) {
  console.error("❌ Failed to install frontend dependencies:", error.message);
}

// Test build
console.log("🔨 Testing build...");
try {
  execSync("npm run build", {
    cwd: path.join(__dirname, "frontend"),
    stdio: "inherit",
  });
  console.log("✅ Build successful!");
} catch (error) {
  console.error("❌ Build failed:", error.message);
}

console.log("🔧 Fix complete!");
