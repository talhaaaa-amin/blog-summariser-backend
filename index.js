const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const summarizeRoute = require("./routes/summarize");

dotenv.config();

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://nexium-muhammad-talha-amin-assignment-2.vercel.app",
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));

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

// ✅ Fallback CORS headers (for edge cases like 204)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // or restrict to your frontend domain
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
