const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

router.get("/", async (req, res) => {
  const data = await Activity.find().sort({ createdAt: -1 });
  res.json(data);
});

module.exports = router;