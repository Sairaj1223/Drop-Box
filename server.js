const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const uploadDir = path.join(__dirname, "uploads");

// create uploads folder
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// simple memory activity log
global.activityLog = [];

// routes
const fileRoutes = require("./routes/fileRoutes");
app.use("/api/files", fileRoutes);

// activity API
app.get("/api/activity", (req, res) => {
  res.json(global.activityLog.slice(-20).reverse());
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});