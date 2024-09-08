const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

require('./config/db');
const urlRoutes = require("./routes/urls.route");
const loggingMiddleware = require("./middlewares/logging.middleware");

// Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

app.use(cookieParser());

// Use logging middleware
app.use(loggingMiddleware);

// Basic route
app.get("/", (req, res) => {
  // Check if the user already has a unique identifier cookie
  let userId = req.cookies.userId;

  console.log(userId)

  if (!userId) {
    // Generate a new unique identifier for the user
    userId = `anon_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    
    console.log(userId)
    res.cookie("userId", userId, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    }); // Cookie valid for 30 days
  }

  res.status(200).json({ message: "Welcome to the URL Shortener API" });
});

// Use the URL routes
app.use("/api/url", urlRoutes);

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging
  res.status(500).json({
    message: "An unexpected error occurred",
    error: err.message
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} \nhttp://localhost:${PORT}`);
});
