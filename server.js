require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/moods", require("./routes/moods"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/journal", require("./routes/journal"));
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/counselors", require("./routes/counselors"));

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`AI Chatbot running at http://localhost:${PORT}`);
});