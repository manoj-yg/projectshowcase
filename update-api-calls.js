const fs = require("fs");
const path = require("path");

const frontendDir = path.join(__dirname, "frontend/src");

const filesToUpdate = [
  "pages/Home.jsx",
  "pages/Projects.jsx",
  "pages/ProjectDetail.jsx",
  "pages/SharedPortfolio.jsx",
  "components/ProjectForm.jsx",
  "components/EditProjectModal.jsx",
  "components/ShareModal.jsx",
];

filesToUpdate.forEach((file) => {
  const filePath = path.join(frontendDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, "utf8");

    // Replace http://localhost:5000 with empty string
    content = content.replace(/http:\/\/localhost:5000\/api/g, "/api");

    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated: ${file}`);
  }
});

console.log("🎉 All API calls updated to relative paths!");
