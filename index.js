const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const summarizeRoute = require("./routes/summarize");

dotenv.config();

const app = express();

app.use(cors()); // Allows all origins

// ✅ Body parser
app.use(express.json());

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
