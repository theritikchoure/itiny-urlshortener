const rateLimit = require("express-rate-limit");

// Define a rate limiter for the /shorten route
const urlShortenRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

module.exports = {
  urlShortenRateLimiter,
};
