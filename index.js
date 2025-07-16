const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const summarizeRoute = require("./routes/summarize");

dotenv.config();

const app = express();

// ✅ Enable CORS properly
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nexium-muhammad-talha-amin-assignment-2.vercel.app", // ✅ Your frontend on Vercel
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Simple GET to confirm it's running
app.get("/", (req, res) => {
  res.send("✅ Blog Summariser API is running");
});

// ✅ Your summarizer route
app.use("/api/summarize", summarizeRoute);

// ✅ Port setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
