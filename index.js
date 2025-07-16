const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");
const summarizeRoute = require("./routes/summarize");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://nexium-muhammad-talha-amin-assignment-2.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// In index.js
app.get("/", (req, res) => {
  res.send("✅ Blog Summariser API is running");
});

app.use(express.json());

app.use("/api/summarize", summarizeRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
