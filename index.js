const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const summarizeRoute = require("./routes/summarize");

dotenv.config();

const app = express();

// ✅ Use CORS (restrict in production)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nexium-muhammad-talha-amin-assignment-2.vercel.app",
    ],
    methods: ["POST"],
  })
);

// ✅ Body parser
app.use(express.json());

// 🔍 Log incoming requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Blog Summariser API is running");
});

// ✅ Main API route
app.use("/api/summarize", summarizeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
