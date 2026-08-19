const router = require("express").Router();

const counselors = [
  {
    id: 1,
    name: "Dr. Aditi Sharma",
    role: "Mental Wellness Counselor",
    experience: "8 years",
    about: "Focuses on stress, study pressure and everyday emotional concerns."
  },
  {
    id: 2,
    name: "Dr. Rahul Mehta",
    role: "Counselor",
    experience: "6 years",
    about: "Works with young adults around confidence, relationships and life changes."
  },
  {
    id: 3,
    name: "Neha Verma",
    role: "Wellness Counselor",
    experience: "5 years",
    about: "Helps people build healthy routines and manage day-to-day stress."
  }
];

router.get("/", (req, res) => {
  res.json(counselors);
});

module.exports = router;