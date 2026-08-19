const router = require("express").Router();
const Journal = require("../models/Journal");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const entry = await Journal.create({
      user: req.user.id,
      title,
      content
    });

    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: "Could not save journal entry" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const entries = await Journal.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: "Could not load journal" });
  }
});

module.exports = router;