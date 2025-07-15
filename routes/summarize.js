const express = require("express");
const router = express.Router();
const { summarizeText } = require("../utils/summarize");
const { translateToUrdu } = require("../utils/translate");
const { createClient } = require("@supabase/supabase-js");
const mongoose = require("mongoose");

// MongoDB Schema
const FullText = mongoose.model(
  "FullText",
  new mongoose.Schema({
    url: String,
    content: String,
  })
);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

router.post("/", async (req, res) => {
  const { url } = req.body;

  // Fake scraping
  const scraped = `This is some dummy content from ${url}. It has multiple sentences. Here's another one. And more content.`;

  const summary = summarizeText(scraped);
  const urdu = translateToUrdu(summary);

  try {
    // Save full blog in MongoDB
    await FullText.create({ url, content: scraped });

    // Save summary in Supabase
    await supabase
      .from("summaries")
      .insert([{ url, summary, translated: urdu }]);

    res.json({ summary, urdu });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
