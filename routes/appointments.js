const router = require("express").Router();
const Appointment = require("../models/Appointment");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { counselor, date, time, reason } = req.body;

    if (!counselor || !date || !time) {
      return res.status(400).json({ message: "Counselor, date and time are required" });
    }

    const appointment = await Appointment.create({
      user: req.user.id,
      counselor,
      date,
      time,
      reason: reason || ""
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Could not request appointment" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Could not load appointments" });
  }
});

module.exports = router;