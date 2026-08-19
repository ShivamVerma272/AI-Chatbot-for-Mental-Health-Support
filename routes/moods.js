const router = require("express").Router();
const Mood = require("../models/Mood");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { mood, score, note } = req.body;

    const item = await Mood.create({
      user: req.user.id,
      mood,
      score,
      note: note || ""
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Could not save mood" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(30);

    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: "Could not load moods" });
  }
});

module.exports = router;