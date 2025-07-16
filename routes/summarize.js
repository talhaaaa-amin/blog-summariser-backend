const express = require("express");
const router = express.Router();
require("dotenv").config(); // ✅ Load environment variables

const { summarizeText } = require("../utils/summarize");
const { translateToUrdu } = require("../utils/translate");
const { createClient } = require("@supabase/supabase-js");
const mongoose = require("mongoose");

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ✅ MongoDB Schema
const FullText = mongoose.model(
  "FullText",
  new mongoose.Schema({
    url: String,
    content: String,
  })
);

// ✅ Create Supabase client with error check
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("❌ Supabase environment variables are missing.");
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

console.log("✅ Supabase client initialized");

// ✅ POST route for summarizing
router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }

  // Fake scraping logic (static content for now)
  const scraped = `This is some dummy content from ${url}. It has multiple sentences. Here's another one. And more content.`;

  const summary = summarizeText(scraped);
  const urdu = translateToUrdu(summary);

  try {
    // Save full blog in MongoDB
    await FullText.create({ url, content: scraped });

    // Save summary + Urdu in Supabase
    const { error } = await supabase
      .from("summaries")
      .insert([{ url, summary, translated: urdu }]);

    if (error) {
      throw new Error(`Supabase insert error: ${error.message}`);
    }

    // Return both
    res.json({ summary, urdu });
  } catch (err) {
    console.error("❌ Error in summarize route:", err.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
