const router = require("express").Router();
const { GoogleGenAI } = require("@google/genai");
const Chat = require("../models/Chat");
const auth = require("../middleware/auth");

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

router.post("/", auth, async (req, res) => {
  const message = String(req.body.message || "").trim();

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  if (!ai) {
    return res.status(500).json({ message: "Gemini API is not configured" });
  }

  try {
    const prompt = `You are a supportive mental health chatbot for a student project.

Speak naturally and simply, like a calm and caring person.
Listen to the user's concern before giving suggestions.
Do not diagnose mental health conditions.
Do not prescribe medication.
Do not pretend to be a doctor or therapist.
Give small practical steps when appropriate.
If the user describes immediate danger, self-harm, or danger to another person, encourage them to contact a trusted person and appropriate local emergency or professional support immediately.

User:
${message}`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    });

    const reply =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here with you. Tell me a little more.";

    await Chat.create({
      user: req.user.id,
      message,
      response: reply
    });

    res.json({ reply });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ message: "The chatbot could not respond right now" });
  }
});

router.get("/history", auth, async (req, res) => {
  try {
    const history = await Chat.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(30);

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Could not load chat history" });
  }
});

module.exports = router;