const express = require("express");
const router = express.Router();
require("dotenv").config(); // Load environment variables

const { summarizeText } = require("../utils/summarize");
const { translateToUrdu } = require("../utils/translate");
const { createClient } = require("@supabase/supabase-js");
const mongoose = require("mongoose");

// ✅ Connect to MongoDB (do this once only!)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ MongoDB Schema (explicitly use 'blogs' collection)
const FullText = mongoose.model(
  "blogs", // 👈 this ensures it uses the 'blogs' collection
  new mongoose.Schema({
    url: String,
    content: String,
    createdAt: { type: Date, default: Date.now }, // optional timestamp
  })
);

// ✅ Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ✅ POST /api/summarize
router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "Invalid URL." });
    }

    // ⚙️ Fake scraping logic
    const scraped = `This is fake content scraped from ${url}. It has multiple sentences. Here's another one. More content follows.`;

    // 🧠 AI-style summary
    const summary = summarizeText(scraped);

    // 🌐 Translate to Urdu
    const urdu = translateToUrdu(summary);

    // 💾 Save full content in MongoDB
    await FullText.create({ url, content: scraped });

    // 📝 Save summary in Supabase
    const { error } = await supabase
      .from("summaries")
      .insert([{ url, summary, translated: urdu }]);

    if (error) {
      console.error("🔴 Supabase insert error:", error);
      return res
        .status(500)
        .json({ error: "Failed to save summary in Supabase." });
    }

    // ✅ Success
    res.json({ summary, urdu });
  } catch (err) {
    console.error("🔴 BACKEND ERROR:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
