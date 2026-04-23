const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads");

// storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// 📤 UPLOAD
router.post("/upload", upload.single("file"), (req, res) => {
  global.activityLog.push({
    file: req.file.originalname,
    action: "UPLOAD",
    time: Date.now()
  });

  res.json({ message: "uploaded" });
});

// 📁 LIST FILES
router.get("/", (req, res) => {
  const files = fs.readdirSync(uploadDir);
  res.json(files.map(name => ({ name })));
});

// ⬇ DOWNLOAD
router.get("/download/:name", (req, res) => {
  const filePath = path.join(uploadDir, req.params.name);
  res.download(filePath);
});

// ❌ DELETE
router.delete("/:name", (req, res) => {
  const filePath = path.join(uploadDir, req.params.name);

  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ error: "delete failed" });

    global.activityLog.push({
      file: req.params.name,
      action: "DELETE",
      time: Date.now()
    });

    res.json({ message: "deleted" });
  });
});

module.exports = router;